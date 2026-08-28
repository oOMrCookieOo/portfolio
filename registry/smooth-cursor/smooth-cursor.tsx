'use client';

import { useEffect, useRef, type RefObject } from 'react';

/**
 * A drawn cursor that springs after the pointer, tilts into its direction of
 * travel, squashes with speed, and swaps to a hand over anything clickable. The
 * native cursor is hidden while it runs.
 *
 * Position and angle are both springs, integrated at a fixed 360Hz substep, so
 * the motion is identical at 60Hz and 144Hz. Nothing here touches React state:
 * one requestAnimationFrame loop writes a transform to one node.
 *
 * Never runs on touch or under `prefers-reduced-motion`, and the native cursor is
 * only hidden once the drawn one is actually on screen, so a failure can never
 * leave a page with no pointer at all.
 */

type Scope = 'page' | RefObject<HTMLElement | null>;

export type SmoothCursorProps = {
	/** Hide the native cursor everywhere, or only inside one element. */
	scope?: Scope;
	/** CSS colour for the fill. Defaults follow `prefers-color-scheme`. */
	fill?: string;
	stroke?: string;
	/** Selector that switches the arrow to the hand. */
	clickableSelector?: string;
	/** Higher is snappier. 900 and 55 are the defaults. */
	stiffness?: number;
	damping?: number;
};

const STYLE_ID = 'smooth-cursor-style';
const SUBSTEP = 1 / 360;
const MAX_FRAME = 1 / 30;
const ROTATE_ABOVE_SPEED = 35; // px per second
const SQUASH_DIVISOR = 4200;
const SQUASH_MAX = 0.32;
const ANGLE_STIFFNESS = 300;
const ANGLE_DAMPING = 60;

/*
	Shipped as one injected stylesheet rather than a file you have to import, so
	the component drops into any project with no CSS wiring.
*/
const CSS = `
.smooth-cursor {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
	pointer-events: none;
	opacity: 0;
	transform-origin: 12.5px 2.5px;
	will-change: transform;
	transition: opacity 0.25s;
	--smooth-cursor-fill: #f9f9f8;
	--smooth-cursor-stroke: #1f1f1a;
}
@media (prefers-color-scheme: dark) {
	.smooth-cursor {
		--smooth-cursor-fill: #0e0e0d;
		--smooth-cursor-stroke: #e7e7e2;
	}
}
.dark .smooth-cursor,
[data-theme='dark'] .smooth-cursor {
	--smooth-cursor-fill: #0e0e0d;
	--smooth-cursor-stroke: #e7e7e2;
}
.smooth-cursor svg {
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	transform-origin: 12.5px 2.5px;
	transition: opacity 0.16s, transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
}
.smooth-cursor .smooth-cursor-hand {
	opacity: 0;
	transform: scale(0.72) rotate(-12deg);
}
.smooth-cursor.is-hand .smooth-cursor-arrow {
	opacity: 0;
	transform: scale(0.72) rotate(12deg);
}
.smooth-cursor.is-hand .smooth-cursor-hand {
	opacity: 1;
	transform: scale(1);
}
.smooth-cursor-hidden,
.smooth-cursor-hidden * {
	cursor: none !important;
}
@media (prefers-reduced-motion: reduce) {
	.smooth-cursor {
		display: none;
	}
}
`;

function useInjectedStyle() {
	useEffect(() => {
		if (document.getElementById(STYLE_ID)) return;
		const style = document.createElement('style');
		style.id = STYLE_ID;
		style.textContent = CSS;
		document.head.append(style);
	}, []);
}

export function SmoothCursor({
	scope = 'page',
	fill,
	stroke,
	clickableSelector = 'a, button, [role="button"], input, textarea, select, summary, [data-clickable]',
	stiffness = 900,
	damping = 55,
}: SmoothCursorProps = {}) {
	const root = useRef<HTMLDivElement>(null);
	useInjectedStyle();

	useEffect(() => {
		const node: HTMLDivElement | null = root.current;
		if (!node) return;
		if (matchMedia('(pointer: coarse)').matches) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		// A scoped cursor listens on its element; a page cursor listens on the window.
		const host = scope === 'page' ? null : scope.current;
		if (scope !== 'page' && !host) return;
		const listenOn: Window | HTMLElement = host ?? window;
		const hideOn: HTMLElement = host ?? document.documentElement;

		let targetX = innerWidth / 2;
		let targetY = innerHeight / 2;
		let x = targetX;
		let y = targetY;
		let velocityX = 0;
		let velocityY = 0;
		let angle = 0;
		let angleTarget = 0;
		let angleVelocity = 0;
		let scaleY = 1;
		let seen = false;
		let last = performance.now();
		let frame = 0;

		const show = () => {
			node.style.opacity = '1';
			hideOn.classList.add('smooth-cursor-hidden');
		};
		const hide = () => {
			node.style.opacity = '0';
			hideOn.classList.remove('smooth-cursor-hidden');
		};

		function onMouseMove(event: Event) {
			const mouse = event as MouseEvent;

			/*
				`position: fixed` is only viewport-relative until an ancestor creates a
				containing block (a transform, a filter, or `contain: paint`). Inside one
				— a preview frame, for instance — client coordinates are offset by that
				block's origin, which is why the cursor used to sit outside the frame and
				only looked right when the frame filled the window.

				The node sits at top/left 0, so its box with no transform applied IS that
				origin. Measuring it with our own transform still on would fold the
				rotation and squash back into the answer, which is a feedback loop worth
				tens of pixels; the loop rewrites the transform before the next paint, so
				blanking it here is never visible.
			*/
			const written = node!.style.transform;
			node!.style.transform = 'none';
			const rect = node!.getBoundingClientRect();
			node!.style.transform = written;

			targetX = mouse.clientX - rect.left;
			targetY = mouse.clientY - rect.top;
			if (!seen) {
				seen = true;
				x = targetX;
				y = targetY;
			}
			show();
		}

		const setHand = (el: EventTarget | null) =>
			node.classList.toggle(
				'is-hand',
				Boolean((el as HTMLElement | null)?.closest?.(clickableSelector)),
			);
		const onOver = (event: Event) => setHand((event as PointerEvent).target);
		const onOut = (event: Event) => setHand((event as PointerEvent).relatedTarget);
		const onLeave = () => hide();
		const onEnter = () => seen && show();

		function tick(now: number) {
			const dt = Math.min((now - last) / 1000, MAX_FRAME);
			last = now;

			const steps = Math.max(1, Math.ceil(dt / SUBSTEP));
			const step = dt / steps;

			// Only aim at a new angle while actually moving, so a resting cursor does
			// not spin from pointer jitter.
			if (Math.hypot(velocityX, velocityY) > ROTATE_ABOVE_SPEED) {
				let delta = ((Math.atan2(velocityY, velocityX) * 180) / Math.PI + 90 - angle) % 360;
				if (delta > 180) delta -= 360;
				if (delta < -180) delta += 360;
				angleTarget = angle + delta;
			}

			for (let i = 0; i < steps; i++) {
				velocityX += (stiffness * (targetX - x) - damping * velocityX) * step;
				velocityY += (stiffness * (targetY - y) - damping * velocityY) * step;
				x += velocityX * step;
				y += velocityY * step;

				angleVelocity +=
					(ANGLE_STIFFNESS * (angleTarget - angle) - ANGLE_DAMPING * angleVelocity) * step;
				angle += angleVelocity * step;
			}

			// Speed stretches it along travel and pinches it across.
			const stretch = Math.min(Math.hypot(velocityX, velocityY) / SQUASH_DIVISOR, SQUASH_MAX);
			scaleY += (1 + stretch - scaleY) * (1 - Math.exp(-14 * dt));

			node!.style.transform = `translate3d(${x - 12.5}px, ${y - 2.5}px, 0) rotate(${angle}deg) scale(${1 - 0.42 * stretch}, ${scaleY})`;
			frame = requestAnimationFrame(tick);
		}

		if (scope === 'page') show();
		listenOn.addEventListener('mousemove', onMouseMove);
		listenOn.addEventListener('pointerover', onOver);
		listenOn.addEventListener('pointerout', onOut);
		const leaveTarget: Document | HTMLElement = host ?? document;
		leaveTarget.addEventListener('mouseleave', onLeave);
		leaveTarget.addEventListener('mouseenter', onEnter);
		frame = requestAnimationFrame(tick);

		return () => {
			cancelAnimationFrame(frame);
			listenOn.removeEventListener('mousemove', onMouseMove);
			listenOn.removeEventListener('pointerover', onOver);
			listenOn.removeEventListener('pointerout', onOut);
			leaveTarget.removeEventListener('mouseleave', onLeave);
			leaveTarget.removeEventListener('mouseenter', onEnter);
			hideOn.classList.remove('smooth-cursor-hidden');
		};
	}, [clickableSelector, damping, scope, stiffness]);

	const colors = {
		...(fill ? { ['--smooth-cursor-fill' as string]: fill } : {}),
		...(stroke ? { ['--smooth-cursor-stroke' as string]: stroke } : {}),
	};

	return (
		<div ref={root} className="smooth-cursor" style={colors} aria-hidden>
			<svg
				className="smooth-cursor-arrow"
				xmlns="http://www.w3.org/2000/svg"
				width="25"
				height="27"
				viewBox="0 0 50 54"
				fill="none"
			>
				<path
					d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
					fill="var(--smooth-cursor-fill)"
					stroke="var(--smooth-cursor-stroke)"
					strokeWidth="4.5"
					strokeLinejoin="round"
					strokeLinecap="round"
				/>
			</svg>
			<svg
				className="smooth-cursor-hand"
				xmlns="http://www.w3.org/2000/svg"
				width="27"
				height="27"
				viewBox="0 0 54 54"
				fill="none"
			>
				<path
					d="M20.5 31V10.5C20.5 6.5 23 4 26 4C29 4 31.5 6.5 31.5 10.5V22V15C31.5 11.5 34 9.5 37 9.5C40 9.5 42 12 42 15.5V24V18C42 14.5 44.5 12.5 47.5 12.5C50.5 12.5 51.5 15 51.5 18.5V33C51.5 45 43 52 32 52H28C21.5 52 17 48.5 13 44L4.5 34.5C1.5 31 2 27.5 4.5 25C7 22.5 10.5 23 13 25.5L20.5 33Z"
					fill="var(--smooth-cursor-fill)"
					stroke="var(--smooth-cursor-stroke)"
					strokeWidth="4.5"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
}

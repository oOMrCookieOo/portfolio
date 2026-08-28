'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef, type ReactNode, type RefObject } from 'react';

import { cn } from '@/lib/utils';

/**
 * One continuous vertical rail that draws itself as its content scrolls past, for
 * timelines and step lists. The line is the progress indicator, so nothing else
 * has to be.
 *
 * Implementation note, because the obvious version is wrong: the usual approach
 * animates `pathLength` on an SVG line. That breaks the moment the SVG is
 * stretched to the content's height (`preserveAspectRatio="none"` plus a
 * non-scaling stroke), because `pathLength` is normalised against user-space
 * length and the resulting dash pattern repeats — you get one dash per item
 * instead of one line. A single element scaled on Y has no such problem, costs
 * one composited transform, and stretches to any height without measuring.
 *
 * Under `prefers-reduced-motion` the line is drawn in full: content is never
 * gated behind an animation.
 */
export function ScrollTracedRail({
	children,
	className,
	/** Where tracing starts and ends relative to the viewport. */
	offset = ['start 0.8', 'end 0.5'] as const,
	/** Pulsing head at the top of the rail. */
	head = true,
	/**
	 * Where the rail itself sits. The default spans the whole container; pass an
	 * inset when the content has markers of its own to line up with, e.g.
	 * 'top-[10px] bottom-3' to start on the first dot.
	 */
	railClassName = 'inset-y-0',
	container,
}: {
	children: ReactNode;
	className?: string;
	offset?: readonly [string, string];
	head?: boolean;
	railClassName?: string;
	/**
	 * The scrolling ancestor, when the rail lives inside a scroll container rather
	 * than the page. Without it useScroll watches the window, so a rail inside an
	 * overflow-y-auto panel never moves.
	 */
	container?: RefObject<HTMLElement | null>;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const reduce = useReducedMotion();

	const { scrollYProgress } = useScroll({
		target: ref,
		container,
		// Cast: motion types this as its own union and the tuple is the documented shape.
		offset: offset as never,
	});

	// Reaches full height a little before the section leaves, so the last item is
	// never still waiting for the line.
	const traced = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
	const scaleY = useSpring(traced, { stiffness: 400, damping: 90 });

	return (
		<div ref={ref} className={cn('relative', className)}>
			<div aria-hidden className={cn('pointer-events-none absolute left-0 w-px', railClassName)}>
				{/* The track: where the line has not reached yet. */}
				<div className="absolute inset-0 bg-border" />

				<motion.div
					className="absolute inset-0 origin-top bg-primary"
					style={reduce ? undefined : { scaleY }}
				/>

				{head ? (
					<span className="absolute -top-1 -left-[3.5px] flex size-2">
						<span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
						<span className="relative inline-flex size-2 rounded-full bg-primary" />
					</span>
				) : null}
			</div>

			{children}
		</div>
	);
}

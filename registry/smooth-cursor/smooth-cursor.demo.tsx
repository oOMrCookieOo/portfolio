'use client';

import { useRef } from 'react';

import { SmoothCursor } from './smooth-cursor';

/**
 * Scoped demo: the cursor only takes over inside this panel, so a preview on a
 * page does not steal the pointer from the rest of it. Drop `scope` to run it
 * across the whole document.
 */
export function SmoothCursorDemo() {
	const panel = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={panel}
			className="flex h-full flex-col items-center justify-center gap-6 bg-background p-8 text-center"
		>
			<SmoothCursor scope={panel} />

			<p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
				Move the pointer in here
			</p>
			<p className="max-w-[38ch] text-sm leading-relaxed text-muted-foreground">
				The arrow springs after the pointer and tilts into the direction it is travelling. Cross
				anything clickable and it becomes a hand.
			</p>

			<div className="flex flex-wrap items-center justify-center gap-3">
				<button
					type="button"
					className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
				>
					A button
				</button>
				<a href="#" className="rounded-lg border px-4 py-2 text-sm font-medium">
					A link
				</a>
				<span className="rounded-lg border border-dashed px-4 py-2 text-sm text-muted-foreground">
					Not clickable
				</span>
			</div>

			<p className="font-mono text-[10.5px] text-muted-foreground/70">
				Sits out on touch and under prefers-reduced-motion.
			</p>
		</div>
	);
}

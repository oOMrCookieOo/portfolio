import type { ReactNode } from 'react';

/** Tooltip above the trigger. CSS group-hover only. */
export function Tooltip({ text, children }: { text: string; children: ReactNode }) {
	return (
		// tabIndex plus an accessible name is what makes the label reachable without a
		// mouse: the panel below already reveals on focus-within.
		<div className="group relative inline-flex" tabIndex={0} aria-label={text} role="img">
			{children}
			<div
				role="tooltip"
				className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-4 translate-y-1 -translate-x-1/2 rounded-lg bg-tooltip px-3 py-1.5 text-[12.5px] font-medium whitespace-nowrap text-tooltip-foreground opacity-0 shadow-lg transition-all duration-100 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
			>
				{text}
				{/* The arrow is a CSS triangle, so its colour is a border, not a background. */}
				<div
					aria-hidden
					className="absolute top-full left-1/2 -mt-px size-0 -translate-x-1/2 border-x-6 border-t-6 border-x-transparent border-t-tooltip"
				/>
			</div>
		</div>
	);
}

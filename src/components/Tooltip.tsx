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
				className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-4 translate-y-1 -translate-x-1/2 rounded-lg px-3 py-1.5 text-[12.5px] font-medium whitespace-nowrap opacity-0 transition-all duration-100 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
				style={{
					backgroundColor: 'rgb(30, 30, 32)',
					color: '#f0f0f0',
					boxShadow: '0 4px 6px -1px rgba(0,0,0,0.25), 0 2px 4px -1px rgba(0,0,0,0.15)',
				}}
			>
				{text}
				<div
					aria-hidden
					className="absolute top-full left-1/2 -mt-px -translate-x-1/2"
					style={{
						width: 0,
						height: 0,
						borderLeft: '6px solid transparent',
						borderRight: '6px solid transparent',
						borderTop: '6px solid rgb(30, 30, 32)',
					}}
				/>
			</div>
		</div>
	);
}

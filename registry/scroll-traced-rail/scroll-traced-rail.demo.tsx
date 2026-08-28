'use client';

import { useRef } from 'react';

import { ScrollTracedRail } from './scroll-traced-rail';

const STEPS = [
	{
		when: 'Aug 2025',
		title: 'Rebuild the admin panel',
		body: 'Architecture and UI from scratch, with the old one still serving users.',
	},
	{
		when: 'Mar 2023',
		title: 'Move billing to a service',
		body: 'Payment integration pulled out of the monolith behind one interface.',
	},
	{
		when: 'Aug 2022',
		title: 'Ship the hiring workflows',
		body: 'Candidate side and back office, built on the same permission model.',
	},
	{
		when: '2020',
		title: 'First client platform',
		body: 'Whole stack, database to deploy, on a shared host with no CI.',
	},
];

/**
 * The rail needs scroll room on both sides to be seen doing its job, so the demo
 * scrolls inside itself with filler above and below.
 *
 * `container` is the point of this demo: the rail is inside a scrolling panel, not
 * on the page, so it has to watch that panel. Without it the rail would answer to
 * the page scroll behind the preview and appear stuck.
 */
export function ScrollTracedRailDemo() {
	const scroller = useRef<HTMLDivElement>(null);

	return (
		<div ref={scroller} className="relative h-full overflow-y-auto" data-lenis-prevent>
			<div className="mx-auto max-w-xl px-6 py-12">
				<Filler label="Scroll down" />

				<ScrollTracedRail container={scroller} className="my-16 pl-7">
					<ol className="space-y-12">
						{STEPS.map((step) => (
							<li key={step.title}>
								<p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
									{step.when}
								</p>
								<h3 className="mt-1.5 text-[15px] font-medium tracking-tight">{step.title}</h3>
								<p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
									{step.body}
								</p>
							</li>
						))}
					</ol>
				</ScrollTracedRail>

				<Filler label="Keep going" />
			</div>
		</div>
	);
}

function Filler({ label }: { label: string }) {
	return (
		<div className="space-y-3">
			<p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
				{label}
			</p>
			{[0, 1, 2].map((line) => (
				<p key={line} className="text-[13.5px] leading-[1.8] text-muted-foreground/70">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
			))}
		</div>
	);
}

// Variant N: the record as a datasheet.
import { PlusIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';

import { SocialDock } from '@/components/SocialDock';
import { experiences, profile, projects, stack } from '@/data';

// Every figure is counted from the data.
const figures = [
	{ value: String(new Date().getFullYear() - 2020), label: 'Years shipping' },
	{ value: String(experiences.length), label: 'Teams' },
	{ value: String(projects.length), label: 'Products live' },
	{ value: String(stack.flatMap((group) => group.items).length), label: 'Tools in rotation' },
];

const spec = [
	{ key: 'Role', value: 'Fullstack engineer' },
	{ key: 'Core', value: 'Laravel, Next.js, TypeScript' },
	{ key: 'Depth', value: 'Admin platforms, payments, rewrites' },
	{ key: 'Based', value: profile.location },
	{ key: 'Working', value: 'Remote, Canada and Oman' },
	{ key: 'Status', value: 'Open to remote roles and freelance' },
];

export function DatasheetShell({ children }: { children: ReactNode }) {
	return (
		<div className="mx-auto w-full max-w-3xl px-6 pt-24 lg:px-0">
			<p className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">{profile.name}</p>

			{/* One claim. If it needs a second sentence it was not a claim. */}
			<h1 className="mt-6 max-w-[30ch] text-[clamp(1.9rem,5.5vw,3rem)] leading-[1.1] font-semibold tracking-tight">
				I rebuild the systems a product outgrew, without stopping the product.
			</h1>

			{/* Spec block. Key on the left, value on the right, hairline between rows. */}
			<dl className="mt-12 border-t border-card-border">
				{spec.map((row) => (
					<div
						key={row.key}
						className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-card-border py-3 sm:grid-cols-[10rem_1fr]"
					>
						<dt className="font-mono text-[11px] tracking-[0.14em] text-faint uppercase">
							{row.key}
						</dt>
						<dd className="text-[14px] text-muted-foreground sm:text-[15px]">{row.value}</dd>
					</div>
				))}
			</dl>

			{/* Four counted figures. The only place the accent appears. */}
			<ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
				{figures.map((figure) => (
					<li key={figure.label}>
						<p className="font-mono text-[2.25rem] leading-none text-primary tabular-nums">
							{figure.value}
						</p>
						<p className="mt-2 font-mono text-[10.5px] tracking-[0.14em] text-faint uppercase">
							{figure.label}
						</p>
					</li>
				))}
			</ul>

			{/* The record. Closed by default, because a skim should stay a skim. */}
			<section id="work" className="mt-20 scroll-mt-24">
				<h2 className="section-label mb-4 font-mono">The record</h2>
				<div className="border-t border-card-border">
					{experiences.map((job, position) => (
						<details key={job.company} className="group border-b border-card-border">
							<summary className="flex cursor-pointer list-none items-baseline gap-4 py-4 marker:hidden">
								<span className="font-mono text-[11px] text-faint tabular-nums">
									{String(position + 1).padStart(2, '0')}
								</span>
								<span className="flex-1">
									<span className="text-[15px] font-medium tracking-tight">{job.company}</span>
									<span className="mt-0.5 block text-[13px] text-faint">{job.role}</span>
								</span>
								<span className="font-mono text-[11px] text-faint tabular-nums">{job.period}</span>
								<PlusIcon
									size={14}
									className="mt-1 shrink-0 text-faint transition-transform duration-200 group-open:rotate-45"
								/>
							</summary>
							<div className="pb-5 pl-[2.1rem]">
								<ul className="flex list-[square] flex-col gap-2 pl-4 text-[13.5px] leading-[1.7] text-muted-foreground marker:text-primary/50">
									{job.bullets.map((bullet) => (
										<li key={bullet.slice(0, 20)}>{bullet}</li>
									))}
								</ul>
								<p className="mt-3 font-mono text-[11px] text-faint">{job.tags.join('  /  ')}</p>
							</div>
						</details>
					))}
				</div>
			</section>

			{children}

			<div className="mt-16">
				<SocialDock className="-ml-2" />
			</div>
		</div>
	);
}

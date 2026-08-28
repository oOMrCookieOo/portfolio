'use client';

import { useState } from 'react';
import { DownloadIcon, PlusIcon, SearchIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { AppShell } from './app-shell';
import {
	MOCK_ACTIVITY,
	MOCK_CHROME,
	MOCK_NAV,
	MOCK_PAGES,
	MOCK_USER,
	type MockRow,
	type MockStatus,
} from './app-shell.mock';

/** Pill tone per status. Three tones only, all built from palette tokens so the
 *  demo follows the theme instead of hard coding a red and a green. */
const STATUS: Record<MockStatus, { label: string; tone: string }> = {
	settled: { label: 'Settled', tone: 'border-primary/25 text-primary' },
	active: { label: 'Active', tone: 'border-primary/25 text-primary' },
	pending: { label: 'Pending', tone: 'border-transparent bg-muted text-foreground' },
	draft: { label: 'Draft', tone: 'border-transparent bg-muted text-muted-foreground' },
	overdue: { label: 'Overdue', tone: 'border-border text-muted-foreground' },
	hold: { label: 'On hold', tone: 'border-border text-muted-foreground' },
};

/** Shared pill shape. Kept local so the block needs no badge primitive. */
const PILL =
	'inline-flex w-fit items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] font-medium whitespace-nowrap';

/** The two statuses that need the eye pulled to them get a heavier outline. Built
 *  from `foreground` rather than a red, so it survives all six palettes. */
const LOUD: MockStatus[] = ['overdue', 'hold'];
const LOUD_CLASS = 'border-foreground/25 bg-foreground/[0.06] text-foreground';

const FILTERS = [
	{ key: 'all', label: 'All', statuses: null },
	{ key: 'open', label: 'Open', statuses: ['pending', 'draft', 'active'] as MockStatus[] },
	{ key: 'late', label: 'Needs attention', statuses: LOUD },
];

/*
	One grid template shared by the head row and every body row, which is what keeps
	the columns lined up without a table element. The last column is fixed width so
	the right aligned amounts sit on a common edge.
*/
const GRID = 'grid grid-cols-[4.5rem_minmax(0,1fr)_6rem_4.5rem_6rem] items-center gap-3 px-3';

const fmt = (n: number) => n.toLocaleString('en-US');

/**
 * Standalone demo. Routing is faked with local state, so this runs with no
 * router, no provider and no data layer. The body is a real list screen on
 * purpose: it has to look right at 520px in a docs frame and at full screen.
 */
export function AppShellDemo() {
	const [pathname, setPathname] = useState('/orders');
	const [filter, setFilter] = useState('all');

	/*
		Stands in for your router's Link. The spread has to come before onClick and
		call through to it: the sidebar wraps each item in a tooltip trigger, which
		passes down an onClick of its own, and spreading last silently replaced ours,
		so nav clicks navigated for real instead of moving the fake pathname.
	*/
	const DemoLink = ({
		href,
		children,
		onClick,
		...rest
	}: {
		href: string;
		children?: React.ReactNode;
		className?: string;
		onClick?: React.MouseEventHandler<HTMLAnchorElement>;
	}) => (
		<a
			href={href}
			{...rest}
			onClick={(event) => {
				onClick?.(event);
				event.preventDefault();
				setPathname(href);
			}}
		>
			{children}
		</a>
	);

	const page = MOCK_PAGES[pathname] ?? MOCK_PAGES['/orders'];
	const statuses = (FILTERS.find((f) => f.key === filter) ?? FILTERS[0]).statuses;
	const rows = statuses ? page.rows.filter((row) => statuses.includes(row.status)) : page.rows;

	return (
		<AppShell
			groups={MOCK_NAV}
			pathname={pathname}
			chrome={{ ...MOCK_CHROME, logo: <Mark /> }}
			user={MOCK_USER}
			linkComponent={DemoLink}
		>
			{/*
				`@container` on this wrapper is what makes the layout answer to the frame
				rather than the browser window: inside a 520px docs preview the summary
				column stays away, full screen it appears. Viewport breakpoints cannot
				tell the two apart.
			*/}
			<div className="@container flex min-h-0 flex-1 flex-col gap-3 @[48rem]:gap-4">
				<div className="flex flex-wrap items-end justify-between gap-3">
					<div>
						<h1 className="text-lg font-semibold tracking-tight">{page.title}</h1>
						<p className="mt-1 text-xs text-muted-foreground">{page.hint}</p>
					</div>
					<div className="flex items-center gap-2">
						<Button variant="outline" size="sm" className="h-8 gap-1.5 px-2.5 text-xs">
							<DownloadIcon className="size-3.5" />
							Export
						</Button>
						<Button size="sm" className="h-8 gap-1.5 px-2.5 text-xs">
							<PlusIcon className="size-3.5" />
							{page.action}
						</Button>
					</div>
				</div>

				{/* The note line and the padding are the first things to go when the frame
				    is short: four readable numbers beat four roomy cards. */}
				<div className="grid grid-cols-2 gap-2.5 @[34rem]:grid-cols-4 @[48rem]:gap-3">
					{page.stats.map((stat) => (
						<div
							key={stat.label}
							className="rounded-xl border border-border bg-card p-2.5 @[48rem]:p-3"
						>
							<p className="truncate font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
								{stat.label}
							</p>
							<p className="mt-1 font-mono text-lg tabular-nums @[48rem]:mt-1.5 @[48rem]:text-xl">
								{stat.value}
							</p>
							<p className="mt-0.5 hidden truncate text-[11px] text-muted-foreground @[48rem]:block">
								{stat.note}
							</p>
						</div>
					))}
				</div>

				<div className="flex min-h-0 flex-1 gap-4">
					<section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card">
						<div className="flex shrink-0 items-center gap-2 border-b border-border px-3 py-1.5 @[48rem]:py-2">
							<div className="relative min-w-0 flex-1">
								<SearchIcon className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
								<Input
									placeholder={`Search ${page.title.toLowerCase()}`}
									className="h-7 border-border ps-8 text-xs shadow-none @[48rem]:h-8 md:text-xs"
								/>
							</div>
							<div className="flex shrink-0 items-center gap-1 rounded-lg bg-muted p-0.5">
								{FILTERS.map((option) => (
									<button
										key={option.key}
										type="button"
										onClick={() => setFilter(option.key)}
										className={`rounded-md px-2 py-1 text-[11px] font-medium transition-colors ${
											option.key === filter
												? 'bg-background text-foreground shadow-xs'
												: 'text-muted-foreground hover:text-foreground'
										}`}
									>
										{option.label}
									</button>
								))}
							</div>
						</div>

						<div
							className={`${GRID} shrink-0 border-b border-border bg-muted/40 py-1.5 font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase`}
						>
							{page.columns.map((column, index) => (
								<span key={column} className={index === 4 ? 'text-end' : undefined}>
									{column}
								</span>
							))}
						</div>

						{/* min-h-0 lets this scroll in a short frame instead of growing the card. */}
						<div className="min-h-0 flex-1 overflow-y-auto">
							{rows.map((row, index) => (
								<Row
									key={row.name + row.date}
									row={row}
									reference={`${page.prefix}-${page.firstRef - index}`}
								/>
							))}
						</div>

						{/* Row count and pager are worth 33px only when there is height to spare. */}
						<div className="hidden shrink-0 items-center justify-between border-t border-border px-3 py-2 text-[11px] text-muted-foreground @[48rem]:flex">
							<span className="tabular-nums">
								{rows.length} of {page.rows.length} shown
							</span>
							<span className="flex items-center gap-3">
								<button type="button" className="hover:text-foreground" disabled>
									Previous
								</button>
								<button type="button" className="hover:text-foreground">
									Next
								</button>
							</span>
						</div>
					</section>

					<aside className="hidden w-64 shrink-0 flex-col gap-4 @[62rem]:flex">
						<StatusMix rows={page.rows} />
						<div className="rounded-xl border border-border bg-card p-3">
							<p className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
								Summary
							</p>
							<dl className="mt-2 flex flex-col gap-2">
								{page.totals.map((total) => (
									<div key={total.label} className="flex items-baseline justify-between gap-2">
										<dt className="text-[11.5px] text-muted-foreground">{total.label}</dt>
										<dd className="font-mono text-xs tabular-nums">{total.value}</dd>
									</div>
								))}
							</dl>
						</div>
						<div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card">
							<p className="shrink-0 px-3 pt-3 font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
								Activity
							</p>
							<ul className="min-h-0 flex-1 overflow-y-auto px-3 py-2">
								{MOCK_ACTIVITY.map((entry) => (
									<li key={entry.what} className="py-1.5 text-[11.5px] leading-[1.5]">
										<span className="font-medium">{entry.who}</span>{' '}
										<span className="text-muted-foreground">{entry.what}</span>
										<span className="mt-0.5 block font-mono text-[10px] text-muted-foreground">
											{entry.when} ago
										</span>
									</li>
								))}
							</ul>
						</div>
					</aside>
				</div>
			</div>
		</AppShell>
	);
}

function Row({ row, reference }: { row: MockRow; reference: string }) {
	const status = STATUS[row.status];

	return (
		<div
			className={`${GRID} border-b border-border py-1.5 text-[12.5px] last:border-b-0 hover:bg-muted/50 @[48rem]:py-2`}
		>
			<span className="font-mono text-[11px] text-muted-foreground tabular-nums">{reference}</span>
			{/* meta pushed to the far edge of its own cell, so a wide window reads as two
			    columns instead of one name with a lake of space after it. */}
			<span className="flex min-w-0 items-baseline justify-between gap-3">
				<span className="truncate font-medium">{row.name}</span>
				<span className="shrink-0 text-[11px] text-muted-foreground">{row.meta}</span>
			</span>
			<span className={`${PILL} ${LOUD.includes(row.status) ? LOUD_CLASS : status.tone}`}>
				<span className="size-1.5 rounded-full bg-current" />
				{status.label}
			</span>
			<span className="font-mono text-[11px] text-muted-foreground tabular-nums">{row.date}</span>
			<span className="text-end font-mono tabular-nums">{fmt(row.amount)}</span>
		</div>
	);
}

/** Bars are counted off the rows, so the mix always agrees with the table. */
function StatusMix({ rows }: { rows: readonly MockRow[] }) {
	const counts = rows.reduce<Partial<Record<MockStatus, number>>>((acc, row) => {
		acc[row.status] = (acc[row.status] ?? 0) + 1;
		return acc;
	}, {});
	const entries = (Object.keys(STATUS) as MockStatus[])
		.filter((key) => counts[key])
		.map((key) => ({ key, count: counts[key] ?? 0 }));

	return (
		<div className="rounded-xl border border-border bg-card p-3">
			<p className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground uppercase">
				Status mix
			</p>
			<div className="mt-2 flex flex-col gap-1.5">
				{entries.map((entry) => (
					<div key={entry.key} className="flex items-center gap-2">
						<span className="w-14 shrink-0 text-[11px] text-muted-foreground">
							{STATUS[entry.key].label}
						</span>
						<span className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted">
							<span
								className={`block h-full rounded-full ${
									LOUD.includes(entry.key) ? 'bg-foreground/50' : 'bg-primary/70'
								}`}
								style={{ width: `${(entry.count / rows.length) * 100}%` }}
							/>
						</span>
						<span className="w-4 shrink-0 text-end font-mono text-[11px] tabular-nums">
							{entry.count}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

function Mark() {
	return (
		<span className="flex size-7 items-center justify-center rounded-md bg-primary font-mono text-[11px] font-semibold text-primary-foreground">
			M
		</span>
	);
}

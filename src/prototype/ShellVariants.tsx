/*
	PROTOTYPE, dev builds only. Shell variants change the whole page layout, not
	just the hero, so they take the rest of the page as children.
	The sticky sidebar takes its header from a swappable component, which is how
	G, J, K, L and O differ: same layout, five different identity treatments.
*/
import { ArrowUpRightIcon, MapPinIcon, PulseIcon } from '@phosphor-icons/react';
import type { ComponentType, ReactNode } from 'react';

import { Avatar } from '@/components/Hero';
import { Scrollspy } from '@/components/reui/scrollspy';
import { RoleRotator } from '@/components/RoleRotator';
import { SocialDock } from '@/components/SocialDock';
import { useDocumentRef } from '@/components/useDocumentRef';
import { about, profile, roles } from '@/data';
import type { RailItem } from '@/types';

/** G header: name, role, one line. The plainest of the five. */
export function PlainHeader() {
	return (
		<>
			<h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
			<p className="mt-3 text-lg font-medium">Fullstack engineer</p>
			<p className="mt-4 max-w-xs leading-relaxed text-muted-foreground">{profile.tagline}</p>
		</>
	);
}

/** J header: avatar, rotating role, meta lines. */
export function MetaHeader() {
	return (
		<>
			<div className="flex items-center gap-4">
				<Avatar size="size-14" />
				<div>
					<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{profile.shortName}</h1>
					<div className="mt-0.5 text-sm text-faint">
						<RoleRotator roles={roles} />
					</div>
				</div>
			</div>
			<div className="mt-6 flex flex-col gap-2 text-[13px] text-muted-foreground">
				<span className="inline-flex items-center gap-2">
					<MapPinIcon size={13} className="text-faint" />
					{profile.location}
				</span>
				<span className="inline-flex items-center gap-2">
					<PulseIcon size={13} className="text-primary" />
					Open to remote work
				</span>
			</div>
		</>
	);
}

/** K header: serif italic name, prose, lifted keywords. */
export function ProseHeader() {
	return (
		<>
			<h1 className="font-serif text-2xl tracking-tight italic">{profile.name}</h1>
			<div className="mt-6 flex max-w-xs flex-col gap-3 text-[14px] leading-relaxed text-muted-foreground">
				<p>
					<strong className="font-normal text-foreground">Fullstack engineer</strong> in{' '}
					{profile.location}, working{' '}
					<strong className="font-normal text-foreground">remotely</strong> for teams in Canada and
					Oman.
				</p>
				<p>
					Six years in <strong className="font-normal text-foreground">Laravel</strong> and{' '}
					<strong className="font-normal text-foreground">Next.js</strong>, on admin platforms and
					payment flows.
				</p>
			</div>
		</>
	);
}

/** L header: the editorial treatment. Name at poster scale, facts in a mono stack. */
export function EditorialHeader() {
	return (
		<>
			<h1 className="text-5xl leading-[0.95] font-semibold tracking-tight sm:text-6xl">
				{profile.name.split(' ').map((word) => (
					<span key={word} className="block">
						{word}
					</span>
				))}
			</h1>
			<div className="mt-6 flex flex-col gap-1 font-mono text-[11px] tracking-[0.12em] text-faint uppercase">
				<span>Fullstack engineer</span>
				<span>{profile.location}</span>
				<span>Open to remote work</span>
			</div>
		</>
	);
}

/** O header: description first, name as a small line above it. */
export function AboutFirstHeader() {
	return (
		<>
			<p className="font-mono text-[11px] tracking-[0.18em] text-faint uppercase">{profile.name}</p>
			<div className="mt-5 flex max-w-sm flex-col gap-3.5 text-[15px] leading-[1.75] text-muted-foreground">
				<p className="text-[17px] leading-[1.6] font-medium text-foreground">{profile.tagline}</p>
				{about.map((paragraph) => (
					<p key={paragraph.slice(0, 20)}>{paragraph}</p>
				))}
			</div>
			<div className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[11px] text-faint">
				<span className="inline-flex items-center gap-1.5">
					<MapPinIcon size={12} />
					{profile.location}
				</span>
				<span className="inline-flex items-center gap-1.5">
					<PulseIcon size={12} className="text-primary" />
					Open to remote work
				</span>
			</div>
		</>
	);
}

/** Sticky sidebar layout: identity and rail on the left, content scrolls on the right. */
export function SidebarShell({
	header: Header,
	rail,
	children,
}: {
	header: ComponentType;
	rail: RailItem[];
	children: ReactNode;
}) {
	const docRef = useDocumentRef();

	return (
		<div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 lg:flex-row lg:gap-12">
			<header className="pt-24 lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
				<div className="min-h-0 overflow-y-auto">
					<Header />
					<Scrollspy
						targetRef={docRef}
						offset={120}
						history={false}
						smooth={false}
						className="mt-12 hidden lg:block"
					>
						<nav aria-label="Sections">
							<ul className="space-y-1">
								{rail.map((item) => (
									<li key={item.id}>
										<a
											href={`#${item.id}`}
											data-scrollspy-anchor={item.id}
											className="group flex items-center py-2.5"
										>
											<span className="mr-4 h-px w-8 bg-faint transition-all duration-200 group-hover:w-16 group-hover:bg-foreground group-data-[active=true]:w-16 group-data-[active=true]:bg-foreground" />
											<span className="font-mono text-xs tracking-[0.14em] text-faint uppercase transition-colors group-hover:text-foreground group-data-[active=true]:text-foreground">
												{item.label}
											</span>
										</a>
									</li>
								))}
							</ul>
						</nav>
					</Scrollspy>
				</div>
				<SocialDock className="mt-10 -ml-2 lg:mt-0" />
			</header>

			<main className="pt-6 lg:w-[54%] lg:py-24">{children}</main>
		</div>
	);
}

/** H: prose, then labelled columns of links. */
export function ColumnsShell({
	columns,
	children,
}: {
	columns: { label: string; rows: { name: string; note: string; href?: string }[] }[];
	children: ReactNode;
}) {
	return (
		<div className="mx-auto max-w-2xl px-6 pt-28 md:pt-36">
			<h1 className="text-xl font-medium tracking-tight">{profile.name}</h1>
			<div className="mt-4 space-y-4 leading-[1.8] text-muted-foreground">
				{about.map((paragraph) => (
					<p key={paragraph.slice(0, 20)}>{paragraph}</p>
				))}
			</div>

			<div className="mt-14 grid gap-10 sm:grid-cols-3">
				{columns.map((column) => (
					<div key={column.label}>
						<h2 className="font-mono text-[11px] tracking-[0.14em] text-faint uppercase">
							{column.label}
						</h2>
						<ul className="mt-4 space-y-4">
							{column.rows.map((row) => (
								<li key={row.name}>
									{row.href ? (
										<a
											href={row.href}
											target="_blank"
											rel="noreferrer noopener"
											className="group inline-flex items-center gap-1 text-[14px] font-medium hover:underline hover:underline-offset-4"
										>
											{row.name}
											<ArrowUpRightIcon size={13} className="text-faint" />
										</a>
									) : (
										<span className="text-[14px] font-medium">{row.name}</span>
									)}
									<p className="mt-0.5 text-[13px] leading-snug text-faint">{row.note}</p>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			<div className="mt-16">
				<SocialDock className="-ml-2" />
			</div>
			{children}
		</div>
	);
}

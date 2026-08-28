/*
	PROTOTYPE, dev builds only. Six heroes on the existing home route, ?variant=A..F.
	A ships today. The rest disagree with it about structure, not colour.
	Pick one, fold it into components/Hero.tsx, then delete this folder.
*/
// Only this file renders font-serif, so the face ships in the prototype chunk
// rather than on every visitor's critical path.
import '@fontsource-variable/newsreader';
import { ArrowUpRightIcon, MapPinIcon, PulseIcon } from '@phosphor-icons/react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

import { Avatar, Hero } from '@/components/Hero';
import { RoleRotator } from '@/components/RoleRotator';
import { SocialDock } from '@/components/SocialDock';
import { ButtonLink } from '@/components/ui/button';
import { GitHubActivity } from '@/components/ui/github-activity';
import { brandColor, ICONS } from '@/components/Stack';
import { about, profile, roles, stack } from '@/data';
import { useAccentColor } from '@/hooks/useAccent';

export const variantNames = {
	A: 'avatar, meta grid',
	B: 'editorial, no photo',
	C: 'info panel',
	D: 'commit graph hero',
	E: 'serif, prose',
	F: 'cursor spotlight',
	G: 'plain sticky sidebar',
	H: 'labelled columns',
	I: 'text first',
	J: 'sticky, avatar header',
	K: 'sticky, prose header',
	L: 'sticky, poster header',
	M: 'cover and index',
	N: 'datasheet, my take',
	O: 'sticky, description first',
	P: 'sticky J, description right',
};

// B: the name is the only visual. Facts move to a mono row.
export function VariantB() {
	return (
		<section id="top" className="pt-30 md:pt-36">
			<h1 className="max-w-[18ch] text-5xl leading-[1.03] font-semibold tracking-tight sm:text-6xl md:text-7xl">
				{profile.name}
			</h1>
			<div className="mt-8 border-t border-card-border pt-6">
				<div className="text-[15px] text-faint">
					<RoleRotator roles={roles} />
				</div>
				<p className="mt-5 max-w-[54ch] text-[13.5px] leading-[1.85] font-[450] text-muted-foreground sm:text-[15px]">
					{about[0]}
				</p>
				<div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.08em] text-faint uppercase">
					<span>{profile.location}</span>
					<span>Open to remote work</span>
					<span>{profile.email}</span>
				</div>
				<SocialDock className="mt-6 -ml-2" />
			</div>
		</section>
	);
}

// C: facts in a bordered panel on the left, pitch on the right.
export function VariantC() {
	const primary = stack[0].items
		.slice(0, 3)
		.concat(stack[1].items.slice(0, 2))
		.map((item) => item.name);

	return (
		<section id="top" className="grid gap-6 pt-30 sm:grid-cols-[16rem_1fr] sm:gap-8 md:pt-36">
			<aside className="flex flex-col gap-4 rounded-card border border-card-border bg-card p-5">
				<Avatar size="size-14" />
				<div>
					<p className="text-sm font-semibold">{profile.shortName}</p>
					<p className="mt-0.5 font-mono text-[11px] text-faint">Fullstack engineer</p>
				</div>
				<div className="flex flex-col gap-2 text-[12.5px] text-muted-foreground">
					<span className="inline-flex items-center gap-2">
						<MapPinIcon size={13} className="text-faint" />
						{profile.location}
					</span>
					<span className="inline-flex items-center gap-2">
						<PulseIcon size={13} className="text-primary" />
						Open to remote work
					</span>
				</div>
				<SocialDock className="-ml-2" />
			</aside>
			<div className="flex flex-col gap-5 sm:pt-2">
				<h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
					Six years of shipped products
				</h1>
				<p className="max-w-[50ch] text-[13.5px] leading-[1.85] font-[450] text-muted-foreground sm:text-[15px]">
					{about[0]}
				</p>
				<p className="font-mono text-[11px] text-faint">{primary.join(' / ')}</p>
			</div>
		</section>
	);
}

// D: the contribution graph is the hero visual.
export function VariantD() {
	const login = profile.github.split('/').pop() ?? '';
	const accent = useAccentColor();

	return (
		<section id="top" className="pt-30 md:pt-36">
			<div className="flex items-center gap-4">
				<Avatar />
				<div>
					<h1 className="font-mono text-xl font-medium tracking-tight sm:text-2xl">
						{profile.name}
					</h1>
					<p className="mt-1 font-mono text-xs text-faint">
						{profile.location} / Open to remote work
					</p>
				</div>
			</div>
			<p className="mt-7 max-w-[52ch] text-[13.5px] leading-[1.85] font-[450] text-muted-foreground sm:text-[15px]">
				{profile.tagline}
			</p>
			<div className="no-scrollbar mt-9 -mx-6 overflow-x-auto sm:mx-0 sm:overflow-visible">
				<div className="min-w-[580px] px-6 sm:min-w-0 sm:px-0">
					<GitHubActivity
						username={login}
						accent={accent}
						months={12}
						showMonths
						defaultOpen
						label="Most active repositories"
					/>
				</div>
			</div>
			<div className="mt-8 flex flex-wrap items-center gap-3">
				<ButtonLink href={`mailto:${profile.email}`}>Email me</ButtonLink>
				<ButtonLink variant="ghost" href={profile.github} target="_blank" rel="noreferrer noopener">
					GitHub
					<ArrowUpRightIcon size={15} />
				</ButtonLink>
			</div>
		</section>
	);
}

// E: serif italic name, prose with the load-bearing words lifted.
export function VariantE() {
	return (
		<section id="top" className="max-w-[40rem] pt-30 md:pt-36">
			<h1 className="font-serif text-2xl tracking-tight text-balance italic">{profile.name}</h1>
			<div className="mt-10 flex flex-col gap-4 text-[15px] leading-relaxed text-muted-foreground">
				<p>
					I am a <strong className="font-normal text-foreground">fullstack engineer</strong> based
					in <strong className="font-normal text-foreground">{profile.location}</strong>, working{' '}
					<strong className="font-normal text-foreground">remotely</strong> for teams in Canada and
					Oman.
				</p>
				<p>
					I spend most of my time in{' '}
					<strong className="font-normal text-foreground">Laravel</strong> and{' '}
					<strong className="font-normal text-foreground">Next.js</strong>, on admin platforms,{' '}
					<strong className="font-normal text-foreground">payment flows</strong> and rewrites of
					systems that outgrew their first architecture.
				</p>
				<p>
					Right now I am rebuilding the admin platform at{' '}
					<strong className="font-normal text-foreground">Inex</strong>, on AWS.
				</p>
			</div>
			<div className="mt-10 flex items-center gap-3">
				<Avatar size="size-10" />
				<SocialDock />
			</div>
		</section>
	);
}

// F: variant A plus a spotlight that follows the cursor. Writes a CSS variable
// straight to the node, so React never re-renders on pointer move.
export function VariantF() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		function move(event: PointerEvent) {
			if (event.pointerType !== 'mouse') return;
			const box = node!.getBoundingClientRect();
			node!.style.setProperty('--x', `${event.clientX - box.left}px`);
			node!.style.setProperty('--y', `${event.clientY - box.top}px`);
			node!.style.setProperty('--spot', '1');
		}
		function leave() {
			node!.style.setProperty('--spot', '0');
		}

		node.addEventListener('pointermove', move, { passive: true });
		node.addEventListener('pointerleave', leave);
		return () => {
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
		};
	}, []);

	return (
		<div
			ref={ref}
			className="relative -mx-6 px-6 sm:-mx-8 sm:px-8"
			style={{ '--spot': 0 } as CSSProperties}
		>
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-[var(--spot)] transition-opacity duration-300"
				style={{
					background:
						'radial-gradient(320px circle at var(--x) var(--y), color-mix(in oklab, var(--accent) 12%, transparent), transparent 70%)',
				}}
			/>
			<div className="relative">
				<Hero />
			</div>
		</div>
	);
}

// I: handle as the title, bio with a short and long setting, and a visual
// pinned beside the copy instead of an avatar.
export function VariantI() {
	const [long, setLong] = useState(false);
	const handle = profile.github.split('/').pop() ?? '';

	return (
		<section id="top" className="grid gap-10 pt-28 md:grid-cols-[1fr_14rem] md:pt-36">
			<div>
				<h1 className="text-2xl font-semibold tracking-tight">
					<span className="text-faint">@</span>
					{handle}
				</h1>
				<div className="mt-5 flex items-center gap-1 font-mono text-[11px] tracking-[0.1em] uppercase">
					{(['short', 'long'] as const).map((mode) => {
						const on = (mode === 'long') === long;
						return (
							<button
								key={mode}
								type="button"
								onClick={() => setLong(mode === 'long')}
								className={
									on
										? 'rounded-full bg-muted px-2.5 py-1 text-foreground'
										: 'cursor-pointer rounded-full px-2.5 py-1 text-faint hover:text-foreground'
								}
							>
								{mode}
							</button>
						);
					})}
				</div>
				<div className="mt-5 space-y-4 text-[15px] leading-[1.85] text-muted-foreground">
					<p>{profile.tagline}</p>
					{long ? about.map((p) => <p key={p.slice(0, 18)}>{p}</p>) : null}
				</div>
				<SocialDock className="mt-7 -ml-2" />
			</div>
			<aside className="hidden md:block">
				{/* Visual slot. Drop a file at public/collage.jpg and it shows here. */}
				<div className="aspect-[3/4] w-full overflow-hidden rounded-card border border-card-border bg-gradient-to-b from-primary/10 via-transparent to-transparent">
					<span className="flex h-full items-center justify-center px-4 text-center font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
						Algiers to remote teams
					</span>
				</div>
			</aside>
		</section>
	);
}

// M: the cover page. Name at poster scale, a numbered index of the page below it,
// and the stack running past once as a marquee. Nothing else competes.
const index = [
	{ id: 'stack', label: 'Stack' },
	{ id: 'projects', label: 'Selected work' },
	{ id: 'work', label: 'Experience' },
	{ id: 'background', label: 'Education' },
	{ id: 'contact', label: 'Get in touch' },
];

export function VariantM() {
	const marks = stack.flatMap((group) => group.items);

	return (
		<section id="top" className="pt-28 md:pt-32">
			<p className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">
				{profile.location} / Open to remote work
			</p>
			<h1 className="mt-5 font-serif text-[clamp(2.5rem,11vw,5.5rem)] leading-[0.95] tracking-tight">
				Maali <span className="italic">Mohamed</span>
				<br />
				Islam
			</h1>
			<div className="rule-wipe mt-6 h-px w-full bg-primary" />
			<p className="mt-6 max-w-[46ch] text-[15px] leading-[1.85] text-muted-foreground">
				{profile.tagline}
			</p>

			<ol className="mt-12 border-t border-card-border">
				{index.map((entry, position) => (
					<li key={entry.id} className="border-b border-card-border">
						<a
							href={`#${entry.id}`}
							className="group flex items-baseline gap-4 py-4 transition-colors hover:text-primary"
						>
							<span className="font-mono text-[11px] text-faint tabular-nums">
								{String(position + 1).padStart(2, '0')}
							</span>
							<span className="text-lg font-medium tracking-tight sm:text-xl">{entry.label}</span>
							<span className="ml-auto h-px flex-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
						</a>
					</li>
				))}
			</ol>

			<div className="marquee mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
				<div className="marquee-track flex w-max items-center gap-8">
					{[...marks, ...marks].map((item, position) => {
						const Icon = ICONS[item.icon];
						return Icon ? (
							<Icon
								key={`${item.name}-${position}`}
								color={brandColor(item.icon)}
								className="size-7 shrink-0"
							/>
						) : null;
					})}
				</div>
			</div>

			<div className="mt-12">
				<SocialDock className="-ml-2" />
			</div>
		</section>
	);
}

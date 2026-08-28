import {
	EnvelopeSimpleIcon,
	GithubLogoIcon,
	LinkedinLogoIcon,
	MediumLogoIcon,
} from '@phosphor-icons/react';
import { useRef, useState, type ComponentType } from 'react';

import { profile } from '@/data';
import { cn } from '@/lib/utils';

type Social = {
	label: string;
	href: string;
	Icon: ComponentType<{ size?: number; weight?: 'fill' }>;
	line: string;
	sub: string;
};

const socials: Social[] = [
	{
		label: 'GitHub',
		href: profile.github,
		Icon: GithubLogoIcon,
		line: profile.github.split('/').pop() ?? '',
		sub: 'Most of the public code lives here',
	},
	{
		label: 'LinkedIn',
		href: profile.linkedin,
		Icon: LinkedinLogoIcon,
		line: 'Fullstack engineer at Inex',
		sub: `${profile.location}. Remote.`,
	},
	{
		label: 'Medium',
		href: profile.medium,
		Icon: MediumLogoIcon,
		line: '@isslemcookie',
		sub: 'Notes on Laravel and architecture',
	},
	{
		label: 'Email',
		href: `mailto:${profile.email}`,
		Icon: EnvelopeSimpleIcon,
		line: profile.email,
		sub: 'Usually answered within a day',
	},
];

/** Social row where a card follows the cursor, after colinlienard.com. Mouse only. */
export function SocialDock({ className }: { className?: string }) {
	const [active, setActive] = useState<number>();
	const [left, setLeft] = useState(0);
	const row = useRef<HTMLDivElement>(null);

	function track(index: number, node: HTMLElement) {
		setLeft(node.offsetLeft + node.offsetWidth / 2);
		setActive(index);
	}

	const card = active === undefined ? undefined : socials[active];

	return (
		<div
			ref={row}
			className={cn('relative flex items-center', className)}
			onMouseLeave={() => setActive(undefined)}
		>
			{socials.map((social, index) => (
				<a
					key={social.label}
					href={social.href}
					target={social.href.startsWith('mailto:') ? undefined : '_blank'}
					rel="noreferrer noopener"
					aria-label={social.label}
					className="z-10 p-2 text-faint transition-colors hover:text-foreground"
					onPointerEnter={(event) => {
						if (event.pointerType !== 'mouse') return;
						track(index, event.currentTarget);
					}}
					onFocus={(event) => track(index, event.currentTarget)}
					onBlur={() => setActive(undefined)}
				>
					<social.Icon size={18} />
				</a>
			))}

			{card ? (
				<div
					className="pointer-events-none absolute bottom-[calc(100%+0.75rem)] w-64 -translate-x-1/2 rounded-card border border-card-border bg-background/95 p-3 shadow-xl backdrop-blur-sm transition-[left] duration-300 ease-out"
					style={{ left }}
					role="tooltip"
				>
					<p className="font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
						{card.label}
					</p>
					<p className="mt-1.5 truncate text-[13px] font-medium">{card.line}</p>
					<p className="mt-0.5 text-[12px] leading-snug text-muted-foreground">{card.sub}</p>
				</div>
			) : null}

			{/* Pointer bridge so the card does not flicker between icons. */}
			<div aria-hidden className="absolute inset-0 -top-3" />
		</div>
	);
}

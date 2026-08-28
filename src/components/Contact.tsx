import {
	ArrowUpRightIcon,
	EnvelopeSimpleIcon,
	GithubLogoIcon,
	LinkedinLogoIcon,
	MediumLogoIcon,
} from '@phosphor-icons/react';
import type { ComponentType } from 'react';

import { Reveal, Section } from '@/components/Section';
import { profile } from '@/data';

type Row = {
	label: string;
	value: string;
	href: string;
	Icon: ComponentType<{ size?: number; className?: string }>;
};

const rows: Row[] = [
	{
		label: 'Email',
		value: profile.email,
		href: `mailto:${profile.email}`,
		Icon: EnvelopeSimpleIcon,
	},
	{
		label: 'LinkedIn',
		// Showing a handle invented from the name would not match the real profile URL.
		value: 'LinkedIn profile',
		href: profile.linkedin,
		Icon: LinkedinLogoIcon,
	},
	{
		label: 'GitHub',
		value: profile.github.split('/').pop() ?? '',
		href: profile.github,
		Icon: GithubLogoIcon,
	},
	{
		label: 'Medium',
		value: '@isslemcookie',
		href: profile.medium,
		Icon: MediumLogoIcon,
	},
];

export function Contact() {
	return (
		<Section id="contact" label="Get in touch">
			<Reveal>
				<p className="mb-5 max-w-[46ch] text-[13.5px] leading-[1.85] font-[450] text-muted-foreground sm:text-[15px]">
					Open to remote roles and freelance work. Send me what you are building and I will tell you
					if I am the right fit.
				</p>
				<ul className="divide-y divide-card-border overflow-hidden rounded-card border border-card-border bg-card">
					{rows.map((row) => (
						<li key={row.label}>
							<a
								href={row.href}
								target={row.href.startsWith('mailto:') ? undefined : '_blank'}
								rel="noreferrer noopener"
								className="group flex items-center gap-4 px-5 py-3.5 transition-colors duration-150 hover:bg-muted"
							>
								<row.Icon size={17} className="shrink-0 text-faint" />
								<div className="min-w-0 flex-1">
									<p className="truncate text-xs font-medium sm:text-sm">{row.value}</p>
									<p className="mt-0.5 font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
										{row.label}
									</p>
								</div>
								<ArrowUpRightIcon
									size={15}
									className="shrink-0 text-faint transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
								/>
							</a>
						</li>
					))}
				</ul>
			</Reveal>
		</Section>
	);
}

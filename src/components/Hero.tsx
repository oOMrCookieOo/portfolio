import { EnvelopeSimpleIcon, MapPinIcon, PulseIcon } from '@phosphor-icons/react';
import { useState } from 'react';

import { RoleRotator } from '@/components/RoleRotator';
import { SocialDock } from '@/components/SocialDock';
import { about, profile, roles } from '@/data';

export function Avatar({ size = 'size-15 sm:size-16' }: { size?: string }) {
	const [failed, setFailed] = useState(false);

	if (failed) {
		return (
			<div
				className={`flex shrink-0 items-center justify-center rounded-card border border-card-border bg-muted font-mono text-lg text-faint ${size}`}
			>
				IM
			</div>
		);
	}

	return (
		<img
			src={profile.avatar}
			alt={profile.name}
			width={128}
			height={128}
			decoding="async"
			onError={() => setFailed(true)}
			className={`shrink-0 rounded-card border border-card-border object-cover ${size}`}
		/>
	);
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<div className="space-y-1">
			<div className="font-mono text-[10px] tracking-[0.14em] text-faint uppercase sm:text-[11px]">
				{label}
			</div>
			<div className="flex items-center gap-2 text-[13.5px] font-medium text-muted-foreground sm:text-[15px]">
				{children}
			</div>
		</div>
	);
}

export function Hero() {
	return (
		<section id="top" className="pt-30 md:pt-36">
			<div className="mb-7 flex items-center gap-4">
				<Avatar />
				<div className="min-w-0 flex-1">
					<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-[2rem]">
						{profile.name}
					</h1>
					<div className="mt-0.5 text-sm text-faint sm:text-[15px]">
						<RoleRotator roles={roles} />
					</div>
				</div>
			</div>

			<div className="mt-10 mb-6 flex flex-wrap items-start gap-x-6 gap-y-4 sm:gap-x-8">
				<Meta label="Location">
					<MapPinIcon size={13} className="shrink-0 text-faint" />
					{profile.location}
				</Meta>
				<Meta label="Email">
					<a
						href={`mailto:${profile.email}`}
						className="group flex items-center gap-2 transition-colors hover:text-foreground"
					>
						<EnvelopeSimpleIcon size={13} className="shrink-0 text-faint" />
						<span className="group-hover:underline group-hover:underline-offset-2">
							{profile.email}
						</span>
					</a>
				</Meta>
				<Meta label="Status">
					<PulseIcon size={13} className="shrink-0 text-primary" />
					Open to remote work
				</Meta>
			</div>

			<div className="mb-8 space-y-3">
				{about.map((paragraph) => (
					<p
						key={paragraph.slice(0, 24)}
						className="text-[13.5px] leading-[1.85] font-[450] text-muted-foreground sm:text-[15px]"
					>
						{paragraph}
					</p>
				))}
			</div>

			<SocialDock className="-ml-2" />
		</section>
	);
}

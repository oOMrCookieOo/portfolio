import { EnvelopeSimpleIcon, MapPinIcon, PulseIcon } from '@phosphor-icons/react';

import { Avatar } from '@/components/Hero';
import { Scrollspy } from '@/components/reui/scrollspy';
import { RoleRotator } from '@/components/RoleRotator';
import { SocialDock } from '@/components/SocialDock';
import { useDocumentRef } from '@/components/useDocumentRef';
import { profile, roles } from '@/data';
import type { RailItem } from '@/sections';

export type { RailItem };

/** Sticky identity column with the section rail. */
export function Sidebar({ rail }: { rail: RailItem[] }) {
	const docRef = useDocumentRef();

	return (
		<header className="pt-24 lg:sticky lg:top-0 lg:flex lg:h-[100dvh] lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
			<div data-lenis-prevent className="no-scrollbar min-h-0 overflow-y-auto">
				<div className="flex items-center gap-4">
					<Avatar size="size-14" />
					<div>
						<h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
							{profile.shortName}
						</h1>
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
					<a
						href={`mailto:${profile.email}`}
						className="group inline-flex items-center gap-2 transition-colors hover:text-foreground"
					>
						<EnvelopeSimpleIcon size={13} className="text-faint" />
						<span className="group-hover:underline group-hover:underline-offset-2">
							{profile.email}
						</span>
					</a>
					<span className="inline-flex items-center gap-2">
						<PulseIcon size={13} className="text-primary" />
						Open to remote work
					</span>
				</div>

				<Scrollspy
					targetRef={docRef}
					offset={120}
					history={false}
					handleClicks={false}
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
	);
}

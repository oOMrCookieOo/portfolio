import { ArrowUpRightIcon } from '@phosphor-icons/react';

import { Reveal, Section } from '@/components/Section';
import { blocks, REGISTRY_READY } from '@/registry-index';

/** Home-page pointer at the components page. */
export function ComponentsTeaser() {
	return (
		<Section id="components" label="Components">
			<Reveal>
				<a
					href="/components"
					className="group block rounded-card border border-card-border bg-card p-5 transition-colors hover:border-input"
				>
					<div className="flex items-start justify-between gap-4">
						<p className="max-w-[46ch] text-[13.5px] leading-[1.8] font-[450] text-muted-foreground sm:text-[14.5px]">
							Pieces I kept rebuilding across client work. Each one runs on this site, and they{' '}
							{REGISTRY_READY ? 'are published' : 'are going up'} as a shadcn registry you can
							install with the CLI.
						</p>
						<ArrowUpRightIcon
							size={16}
							className="mt-1 shrink-0 text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
						/>
					</div>
					<ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[11px] text-faint">
						{blocks.map((block) => (
							<li key={block.slug}>{block.name}</li>
						))}
					</ul>
				</a>
			</Reveal>
		</Section>
	);
}

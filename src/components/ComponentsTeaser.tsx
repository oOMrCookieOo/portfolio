import { ArrowUpRightIcon } from '@phosphor-icons/react';

import { Reveal, Section } from '@/components/Section';
import { blocks, REGISTRY_READY } from '@/registry-index';

const copy =
	'Pieces I kept rebuilding across client work, published as a shadcn registry. Install one with the CLI and it lands in your project as code you own.';

const names = (
	<ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[11px] text-faint">
		{blocks.map((block) => (
			<li key={block.slug}>{block.name}</li>
		))}
	</ul>
);

export function ComponentsTeaser() {
	return (
		<Section id="components" label="Components">
			<Reveal>
				{REGISTRY_READY ? (
					<a
						href="/components"
						className="group block rounded-card border border-card-border bg-card p-5 transition-colors hover:border-input"
					>
						<div className="flex items-start justify-between gap-4">
							<p className="max-w-[46ch] text-[13.5px] leading-[1.8] font-[450] text-muted-foreground sm:text-[14.5px]">
								{copy}
							</p>
							<ArrowUpRightIcon
								size={16}
								className="mt-1 shrink-0 text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
							/>
						</div>
						{names}
					</a>
				) : (
					// No link while the registry is unpublished: the install commands would
					// hand out dead URLs.
					<div className="rounded-card border border-card-border bg-card p-5">
						<div className="flex items-start justify-between gap-4">
							<p className="max-w-[46ch] text-[13.5px] leading-[1.8] font-[450] text-muted-foreground sm:text-[14.5px]">
								{copy}
							</p>
							<span className="mt-0.5 shrink-0 rounded-full border border-card-border px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
								Coming soon
							</span>
						</div>
						{names}
					</div>
				)}
			</Reveal>
		</Section>
	);
}

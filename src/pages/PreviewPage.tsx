import { ArrowLeftIcon } from '@phosphor-icons/react';

import { DEMOS } from '@/pages/demos';
import { blocks } from '@/registry-index';

/** One block filling the window. A real route, so it can be opened in a new tab. */
export function PreviewPage({ slug }: { slug: string }) {
	const block = blocks.find((item) => item.slug === slug);
	const Demo = DEMOS[slug as keyof typeof DEMOS];

	if (!block || !Demo) {
		return (
			<div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4">
				<p className="font-mono text-xs text-faint">No block called {slug}</p>
				<a href="/components" className="text-sm underline underline-offset-4">
					Back to components
				</a>
			</div>
		);
	}

	return (
		<div className="flex h-[100dvh] flex-col">
			<div className="flex h-11 shrink-0 items-center gap-4 border-b border-card-border px-4">
				<a
					href="/components"
					className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] text-faint uppercase transition-colors hover:text-foreground"
				>
					<ArrowLeftIcon size={12} />
					Components
				</a>
				<span className="text-sm font-medium">{block.name}</span>
				<span className="ml-auto font-mono text-[10.5px] text-faint">full page preview</span>
			</div>
			{/* contain: paint keeps a block that uses position: fixed inside this frame. */}
			<div
				data-lenis-prevent
				className="relative min-h-0 flex-1 overflow-hidden [&_[data-slot=sidebar-wrapper]]:min-h-full [&>*]:h-full"
				style={{ contain: 'paint', transform: 'translate3d(0,0,0)' }}
			>
				<Demo />
			</div>
		</div>
	);
}

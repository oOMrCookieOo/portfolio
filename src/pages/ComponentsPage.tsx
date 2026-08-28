import {
	ArrowLeftIcon,
	ArrowsOutSimpleIcon,
	CheckIcon,
	CopyIcon,
	MonitorIcon,
} from '@phosphor-icons/react';
import { Suspense, useEffect, useRef, useState } from 'react';

import {
	ExpandableScreen,
	ExpandableScreenContent,
	ExpandableScreenTrigger,
} from '@/components/ui/expandable-screen';

import { Reveal } from '@/components/Section';
import { Button } from '@/components/ui/button';
import { DEMOS } from '@/pages/demos';
import { blocks, REGISTRY_ORIGIN } from '@/registry-index';

function InstallCommand({ slug }: { slug: string }) {
	const command = `npx shadcn@latest add ${REGISTRY_ORIGIN}/r/${slug}.json`;
	const [copied, setCopied] = useState(false);
	const timer = useRef<number>(0);

	useEffect(() => () => clearTimeout(timer.current), []);

	async function copy() {
		clearTimeout(timer.current);
		try {
			await navigator.clipboard.writeText(command);
			setCopied(true);
			timer.current = window.setTimeout(() => setCopied(false), 2000);
		} catch {
			// Clipboard is blocked on insecure origins. The text stays selectable.
		}
	}

	return (
		<div className="flex items-center gap-2 overflow-hidden rounded-card border border-card-border bg-card pl-3">
			<code className="no-scrollbar flex-1 overflow-x-auto py-2.5 font-mono text-[11px] whitespace-nowrap text-muted-foreground sm:text-xs">
				{command}
			</code>
			<Button variant="ghost" size="sm" onClick={copy} aria-live="polite" className="shrink-0">
				{copied ? <CheckIcon size={14} className="text-primary" /> : <CopyIcon size={14} />}
				{copied ? 'Copied' : 'Copy'}
			</Button>
		</div>
	);
}

const previewFallback = (
	<div className="flex h-full items-center justify-center gap-2 text-faint">
		<MonitorIcon size={16} />
		<span className="font-mono text-[11px]">loading preview</span>
	</div>
);

/*
	`contain: paint` and the transform make the frame a containing block, so a block
	using `position: fixed` (the app shell's sidebar does) stays inside the preview
	instead of escaping to the viewport. The min-h override stops shadcn's
	`min-h-svh` from forcing the frame to full screen height.
*/
const FRAME_STYLE = { contain: 'paint', transform: 'translate3d(0,0,0)' } as const;
const FRAME_CLASS =
	'relative overflow-hidden bg-background [&_[data-slot=sidebar-wrapper]]:min-h-full';

export function ComponentsPage() {
	return (
		<div className="mx-auto w-full max-w-5xl px-6 pt-28 pb-24 md:pt-32">
			<Reveal>
				<a
					href="/"
					className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] text-faint uppercase transition-colors hover:text-foreground"
				>
					<ArrowLeftIcon size={12} />
					Back
				</a>
				<h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Components</h1>
				<p className="mt-4 max-w-[58ch] text-[14px] leading-[1.8] text-muted-foreground sm:text-[15px]">
					Pieces I kept rebuilding across client work, pulled out and published as a shadcn
					registry. Install one with the CLI and it lands in your project as code you own. Each
					block is router agnostic and reaches for no session, store or translator, so nothing about
					it is tied to the app it came from.
				</p>
				<div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-faint">
					<span>{blocks.length} blocks</span>
					<span>Tailwind v4</span>
					<span>React 19</span>
					<span>TypeScript</span>
				</div>
			</Reveal>

			<div className="mt-16 flex flex-col gap-20">
				{blocks.map((block, index) => {
					const Demo = DEMOS[block.slug as keyof typeof DEMOS];
					return (
						<Reveal key={block.slug} as="section" delay={index * 60}>
							<div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
								<h2 className="text-xl font-medium tracking-tight">{block.name}</h2>
								<span className="font-mono text-[11px] text-faint">{block.deps.join('  /  ')}</span>
							</div>
							<p className="mt-3 max-w-[62ch] text-[13.5px] leading-[1.8] text-muted-foreground sm:text-[14.5px]">
								{block.blurb}
							</p>

							{/*
								cult-ui's ExpandableScreen morphs the frame itself into a full screen
								panel using a shared layoutId, so the preview grows out of where it
								already was instead of a dialog appearing over it. The trigger unmounts
								while expanded, so the demo is only ever mounted once.
							*/}
							<ExpandableScreen
								layoutId={`preview-${block.slug}`}
								triggerRadius="0.75rem"
								contentRadius="0.75rem"
							>
								<div className="mt-6 flex items-center gap-3">
									<ExpandableScreenTrigger>
										<span className="inline-flex h-9 items-center gap-2 rounded-card border border-input bg-card px-3 text-sm font-medium">
											<ArrowsOutSimpleIcon size={14} />
											Expand
										</span>
									</ExpandableScreenTrigger>
									<a
										href={`/components/${block.slug}`}
										target="_blank"
										rel="noreferrer noopener"
										className="font-mono text-[10.5px] tracking-[0.14em] text-faint uppercase transition-colors hover:text-foreground"
									>
										Open in a tab
									</a>
								</div>

								<div
									data-lenis-prevent
									className={`${FRAME_CLASS} mt-3 h-[520px] rounded-card border border-card-border`}
									style={FRAME_STYLE}
								>
									<Suspense fallback={previewFallback}>
										<div className="h-full overflow-auto [&>*]:h-full">
											{Demo ? <Demo /> : null}
										</div>
									</Suspense>
								</div>

								<ExpandableScreenContent
									className="border border-card-border bg-background"
									closeButtonClassName="top-3 right-3 size-8 border border-card-border bg-background/90 text-foreground backdrop-blur hover:bg-muted"
								>
									<div
									data-lenis-prevent
									className={`${FRAME_CLASS} h-[calc(100svh-1.5rem)] rounded-card`}
										style={FRAME_STYLE}
									>
										<Suspense fallback={previewFallback}>
											<div className="h-full overflow-auto [&>*]:h-full">
												{Demo ? <Demo /> : null}
											</div>
										</Suspense>
									</div>
								</ExpandableScreenContent>
							</ExpandableScreen>

							<div className="mt-4">
								<InstallCommand slug={block.slug} />
							</div>

							{block.notes ? (
								<ul className="mt-5 flex list-[square] flex-col gap-1.5 pl-4 text-[13px] leading-[1.7] text-muted-foreground marker:text-primary/50">
									{block.notes.map((note) => (
										<li key={note.slice(0, 24)}>{note}</li>
									))}
								</ul>
							) : null}
						</Reveal>
					);
				})}
			</div>

			<Reveal className="mt-24 border-t border-card-border pt-8">
				<h2 className="text-base font-medium tracking-tight">Using the registry</h2>
				<p className="mt-3 max-w-[62ch] text-[13.5px] leading-[1.8] text-muted-foreground">
					A shadcn registry is static JSON. The CLI fetches the URL, installs the npm packages the
					item declares, resolves the registry items it depends on, and writes the files using your
					own <code className="font-mono text-[12px]">components.json</code> aliases. Register the
					namespace once and you can install by short name instead of URL.
				</p>
				<pre className="no-scrollbar mt-4 overflow-x-auto rounded-card border border-card-border bg-card p-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
					{`// components.json
"registries": {
  "@isslem": "${REGISTRY_ORIGIN}/r/{name}.json"
}

npx shadcn@latest add @isslem/app-shell`}
				</pre>
			</Reveal>
		</div>
	);
}

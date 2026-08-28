import { lazy, Suspense, useState, type ComponentType, type ReactNode } from 'react';

import { About } from '@/components/About';
import { Background } from '@/components/Background';
import { ComponentsTeaser } from '@/components/ComponentsTeaser';
import { Contact } from '@/components/Contact';
import { Experience } from '@/components/Experience';
import { Footer } from '@/components/Footer';
import { GridBackground } from '@/components/GridBackground';
import { Nav } from '@/components/Nav';
import { PageLayout } from '@/components/PageLayout';
import { Projects } from '@/components/Projects';
import { SmoothCursor } from '../registry/smooth-cursor/smooth-cursor';
import { Stack } from '@/components/Stack';
import { readStoredRing } from '@/hooks/useAccent';
import { REGISTRY_READY } from '@/registry-index';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useRoute } from '@/router';

// The contribution graph pulls in motion and talks to two APIs. It sits below the
// fold, so it loads as its own chunk instead of blocking first paint.
const ComponentsPage = lazy(() =>
	import('@/pages/ComponentsPage').then((m) => ({ default: m.ComponentsPage })),
);

const PreviewPage = lazy(() =>
	import('@/pages/PreviewPage').then((m) => ({ default: m.PreviewPage })),
);

const GithubSection = lazy(() =>
	import('@/components/GithubSection').then((m) => ({ default: m.GithubSection })),
);

export type PageParts = Record<
	| 'about'
	| 'graph'
	| 'stack'
	| 'projects'
	| 'components'
	| 'experience'
	| 'background'
	| 'contact'
	| 'footer',
	ReactNode
>;

/*
	The shipped layout is P. Every other variant still exists behind a toggle:
	dev always shows the switcher, and any build shows it when the URL asks, with
		?prototypes=1   or   ?variant=E
	The prototype tree is a lazy chunk, so a normal visit never downloads it.
*/
const KEYS = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
] as const;
type VariantKey = (typeof KEYS)[number];
const SHIPPED: VariantKey = 'P';

const Prototype = lazy(() => import('@/prototype/PrototypeHeroes')) as ComponentType<{
	variant: VariantKey;
	onPick: (variant: VariantKey) => void;
	parts: PageParts;
	ring: boolean;
	onRingChange: (on: boolean) => void;
}>;

const query = () => new URLSearchParams(location.search);

function prototypesRequested() {
	const params = query();
	return import.meta.env.DEV || params.has('prototypes') || params.has('variant');
}

function readVariant(): VariantKey {
	const value = query().get('variant')?.toUpperCase() as VariantKey;
	return KEYS.includes(value) ? value : SHIPPED;
}

export default function App() {
	useSmoothScroll();
	const route = useRoute();

	const [showPrototypes] = useState(prototypesRequested);
	const [variant, setVariant] = useState<VariantKey>(readVariant);
	const [ring, setRing] = useState(readStoredRing);

	function pick(next: VariantKey) {
		setVariant(next);
		const url = new URL(location.href);
		url.searchParams.set('variant', next);
		history.replaceState(null, '', url);
	}

	// Handed to the prototype so a variant can reorder or drop a section.
	const parts: PageParts = {
		about: <About />,
		graph: (
			<Suspense fallback={<div className="mt-20 h-36" />}>
				<GithubSection />
			</Suspense>
		),
		stack: <Stack />,
		projects: <Projects />,
		components: <ComponentsTeaser />,
		experience: <Experience />,
		background: <Background />,
		contact: <Contact />,
		footer: <Footer />,
	};

	// /components/<slug> shows one block filling the window, with no site chrome.
	// Both component routes fall through to the home page until the registry is
	// published, so a stale link cannot land on install commands that do not work.
	const previewSlug =
		REGISTRY_READY && route.startsWith('/components/') ? route.slice('/components/'.length) : null;

	if (previewSlug) {
		return (
			<Suspense fallback={<div className="h-[100dvh]" />}>
				<PreviewPage slug={previewSlug} />
			</Suspense>
		);
	}

	return (
		<div className="min-h-[100dvh]">
			<GridBackground />
			{ring && <SmoothCursor />}
			<Nav route={route} />
			<div className="relative">
				{REGISTRY_READY && route === '/components' ? (
					<Suspense fallback={<div className="h-[100dvh]" />}>
						<ComponentsPage />
					</Suspense>
				) : showPrototypes ? (
					<Suspense fallback={null}>
						<Prototype
							variant={variant}
							onPick={pick}
							parts={parts}
							ring={ring}
							onRingChange={setRing}
						/>
					</Suspense>
				) : (
					<PageLayout>
						{parts.about}
						{parts.stack}
						{parts.experience}
						{parts.projects}
						{parts.graph}
						{parts.components}
						{parts.background}
						{parts.contact}
						{parts.footer}
					</PageLayout>
				)}
			</div>
		</div>
	);
}

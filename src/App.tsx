import { lazy, Suspense, useState, type ComponentType } from 'react';

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
import { site } from '@/data';
import { readStoredRing } from '@/hooks/useAccent';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { useRoute } from '@/router';
import { VARIANT_KEYS, type PageParts, type VariantKey } from '@/types';

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

/*
	site.variant in data.ts picks the layout. P is the only one that renders from a
	static import; the rest live in the prototype chunk, which is also what the
	switcher browses, with
		?prototypes=1   or   ?variant=E
	So a P site never downloads that chunk, and any other choice does.
*/
const STATIC_VARIANT: VariantKey = 'P';

const Prototype = lazy(() => import('@/prototype/PrototypeHeroes')) as ComponentType<{
	variant: VariantKey;
	onPick: (variant: VariantKey) => void;
	parts: PageParts;
	ring: boolean;
	onRingChange: (on: boolean) => void;
	showSwitcher: boolean;
}>;

const query = () => new URLSearchParams(location.search);

function prototypesRequested() {
	const params = query();
	return import.meta.env.DEV || params.has('prototypes') || params.has('variant');
}

// data.ts picks the layout that ships. The URL only overrides it for a look, and
// it is the only untrusted half, so it is the only half that needs checking:
// site.variant is typed, so a typo there is a compile error.
function readVariant(): VariantKey {
	const asked = query().get('variant')?.toUpperCase() as VariantKey;
	return VARIANT_KEYS.includes(asked) ? asked : site.variant;
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
	const previewSlug = route.startsWith('/components/') ? route.slice('/components/'.length) : null;

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
				{route === '/components' ? (
					<Suspense fallback={<div className="h-[100dvh]" />}>
						<ComponentsPage />
					</Suspense>
				) : showPrototypes || variant !== STATIC_VARIANT ? (
					/*
						Any layout other than P lives in the prototype chunk, so shipping one
						means loading it for everyone. The switcher pill is a separate
						question: it only appears when the URL or a dev build asks for it.
					*/
					<Suspense fallback={<div className="h-[100dvh]" />}>
						<Prototype
							variant={variant}
							onPick={pick}
							parts={parts}
							ring={ring}
							onRingChange={setRing}
							showSwitcher={showPrototypes}
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

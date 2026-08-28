import Lenis from 'lenis';
import { useEffect } from 'react';

/** Lenis smooth scroll. Skipped when the visitor asks for reduced motion. */
export function useSmoothScroll() {
	useEffect(() => {
		const query = matchMedia('(prefers-reduced-motion: reduce)');
		if (query.matches) return;

		const lenis = new Lenis({
			autoRaf: true,
			// Sections carry scroll-mt-24 (96px), which already clears the 64px nav, so
			// Lenis needs no extra offset of its own. Anchor clicks are handed to Lenis
			// because a raw window.scrollTo is overridden on its next frame.
			anchors: true,
			duration: 1,
			wheelMultiplier: 0.9,
		});

		// Published so a component that takes over the viewport can pause it.
		(window as unknown as { lenis?: Lenis }).lenis = lenis;

		// Fall back to native scrolling if the visitor flips the setting mid-session.
		const onPreferenceChange = (event: MediaQueryListEvent) => {
			if (event.matches) lenis.destroy();
		};
		query.addEventListener('change', onPreferenceChange);

		return () => {
			query.removeEventListener('change', onPreferenceChange);
			delete (window as unknown as { lenis?: Lenis }).lenis;
			lenis.destroy();
		};
	}, []);
}

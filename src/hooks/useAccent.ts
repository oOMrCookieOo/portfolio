import { useEffect, useState } from 'react';

/** Palettes pair ground, text, hairlines and one signal colour. Defined in index.css. */
export const PALETTES = [
	{ id: 'graphite', label: 'Graphite and emerald', swatch: ['#18181b', '#34d399'] },
	{ id: 'ink', label: 'Ink and cobalt', swatch: ['#05070d', '#84adff'] },
	{ id: 'slate-amber', label: 'Slate and amber', swatch: ['#0c0a09', '#fdb022'] },
	{ id: 'forest', label: 'Forest and sage', swatch: ['#070d0a', '#8fd0ab'] },
	{ id: 'oxide', label: 'Oxide and brick', swatch: ['#0d0908', '#f08d6e'] },
	{ id: 'mono', label: 'Mono, no accent', swatch: ['#08080a', '#b4b4b4'] },
] as const;

export type PaletteId = (typeof PALETTES)[number]['id'];

function read() {
	return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
}

/** The accent as a colour string, for the places that cannot use a CSS variable. */
export function useAccentColor() {
	const [color, setColor] = useState(read);

	useEffect(() => {
		const observer = new MutationObserver(() => setColor(read()));
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['class', 'data-palette'],
		});
		return () => observer.disconnect();
	}, []);

	return color;
}

/** `graphite` is the palette baked into :root, so it clears the attribute. */
export function setPalette(palette: PaletteId) {
	if (palette === 'graphite') delete document.documentElement.dataset.palette;
	else document.documentElement.dataset.palette = palette;
	// index.html reads this key before paint. Keep the two in step.
	try {
		localStorage.setItem('palette', palette);
	} catch {
		// The palette still applies for this visit.
	}
}

export function readStoredPalette(): PaletteId {
	try {
		const stored = localStorage.getItem('palette') as PaletteId | null;
		if (stored && PALETTES.some((p) => p.id === stored)) return stored;
	} catch {
		// Fall through to the default palette.
	}
	return 'graphite';
}

export function readStoredRing() {
	try {
		return localStorage.getItem('ring') !== 'off';
	} catch {
		return true;
	}
}

export function setRing(on: boolean) {
	try {
		localStorage.setItem('ring', on ? 'on' : 'off');
	} catch {}
}

import type { ReactNode } from 'react';

/**
 * The shapes the content is written in. data.ts holds the values, this holds the
 * types, so the record can be rewritten without reading past a type definition
 * every few hundred lines.
 */

/** icon values are keys of the ICONS map in components/Stack.tsx. */
export type StackGroup = {
	label: string;
	items: { name: string; icon: string }[];
};

export type Experience = {
	company: string;
	role: string;
	period: string;
	place: string;
	bullets: string[];
	tags: string[];
	/** The company site, linked from its name. */
	href?: string;
	/** Screenshot floated when the name is hovered, e.g. '/previews/inex.webp'. */
	preview?: string;
};

export type Project = {
	name: string;
	blurb: string;
	tags: string[];
	/** Live site, when there still is one. */
	href?: string;
	/** Screenshot shown in the hover preview, e.g. '/previews/raaz.webp'. */
	preview?: string;
	/** What you actually did on it. Shown in the open row. */
	role?: string;
};

/** Every section that can appear on a page. The rail is built from these. */
export type SectionId =
	'about' | 'stack' | 'work' | 'projects' | 'github' | 'components' | 'background' | 'contact';

export type RailItem = { id: string; label: string };

/** Every layout key the switcher and ?variant= accept. */
export const VARIANT_KEYS = [
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

export type VariantKey = (typeof VARIANT_KEYS)[number];

/** The rendered sections, handed to a layout so it can order or drop them. */
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

/** A row that can float a screenshot beside the cursor. */
export type PreviewTarget = { key: string; image?: string; label: string };

/** One block published in the shadcn registry, listed on the components page. */
export type RegistryBlock = {
	name: string;
	slug: string;
	blurb: string;
	deps: string[];
	notes?: string[];
};

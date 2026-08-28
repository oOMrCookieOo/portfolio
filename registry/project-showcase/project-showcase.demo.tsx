'use client';

import { ProjectShowcase, type ShowcaseItem } from './project-showcase';

const items: readonly ShowcaseItem[] = [
	{
		title: 'Lumina',
		description: 'Design system generator that reads a brand and emits tokens.',
		meta: '2026',
		href: '#',
	},
	{
		title: 'Flux',
		description: 'Real-time collaboration for creative teams.',
		meta: '2025',
		href: '#',
	},
	{
		title: 'Prism',
		description: 'Palette extraction from any image, in the browser.',
		meta: '2025',
		href: '#',
	},
	{
		title: 'Vertex',
		description: 'A 3D modelling toolkit for the web.',
		meta: '2024',
		href: '#',
	},
];

export function ProjectShowcaseDemo() {
	return (
		<div className="mx-auto w-full max-w-2xl px-6 py-10">
			<ProjectShowcase items={items} />
		</div>
	);
}

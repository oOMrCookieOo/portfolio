import type { ReactNode } from 'react';

import { Sidebar, type RailItem } from '@/components/Sidebar';

// Every section that renders needs a rail entry, or the previous entry stays lit
// while the missing one is on screen.
export const RAIL: RailItem[] = [
	{ id: 'about', label: 'About me' },
	{ id: 'stack', label: 'Tech stack' },
	{ id: 'work', label: 'Experience' },
	{ id: 'projects', label: 'Selected work' },
	{ id: 'github', label: 'Commits' },
	{ id: 'components', label: 'Components' },
	{ id: 'background', label: 'Education' },
	{ id: 'contact', label: 'Get in touch' },
];

/** The shipped layout: sticky identity column on the left, content on the right. */
export function PageLayout({ children }: { children: ReactNode }) {
	return (
		<div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 lg:flex-row lg:gap-12">
			<Sidebar rail={RAIL} />
			<main className="pt-6 lg:w-[54%] lg:py-24">{children}</main>
		</div>
	);
}

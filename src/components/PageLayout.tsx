import type { ReactNode } from 'react';

import { Sidebar } from '@/components/Sidebar';
import { railFor } from '@/sections';

// The order here is the order App renders the sections in.
export const RAIL = railFor([
	'about',
	'stack',
	'work',
	'projects',
	'github',
	'components',
	'background',
	'contact',
]);

/** The shipped layout: sticky identity column on the left, content on the right. */
export function PageLayout({ children }: { children: ReactNode }) {
	return (
		<div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 lg:flex-row lg:gap-12">
			<Sidebar rail={RAIL} />
			<main className="pt-6 lg:w-[54%] lg:py-24">{children}</main>
		</div>
	);
}

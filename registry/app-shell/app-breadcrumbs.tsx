'use client';

import { Fragment } from 'react';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import type { Crumb, LinkComponent, SidebarNavGroup } from './app-shell.types';
import { flattenNav } from './app-shell-active';

/**
 * Derives a trail from the pathname and the nav, so a caller that has nothing to
 * add gets sensible crumbs for free. Segments the nav does not name are title
 * cased, and anything that looks like an id is left alone.
 */
export function trailFromPathname(
	pathname: string,
	groups: readonly SidebarNavGroup[],
	overrides: readonly Crumb[] = [],
): Crumb[] {
	if (overrides.length > 0) return [...overrides];

	const items = flattenNav(groups);
	const segments = pathname.split('/').filter(Boolean);

	return segments.map((segment, index) => {
		const href = '/' + segments.slice(0, index + 1).join('/');
		const named = items.find((item) => item.href === href);
		const isLast = index === segments.length - 1;
		const label =
			named?.label ??
			(/^\d+$/.test(segment)
				? `#${segment}`
				: segment.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase()));
		return isLast ? { label } : { label, href };
	});
}

export function AppBreadcrumbs({
	crumbs,
	linkComponent: Link = 'a',
}: {
	crumbs: readonly Crumb[];
	linkComponent?: LinkComponent;
}) {
	if (crumbs.length === 0) return null;

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{crumbs.map((crumb, index) => (
					<Fragment key={`${crumb.label}-${index}`}>
						{index > 0 && <BreadcrumbSeparator />}
						<BreadcrumbItem>
							{crumb.href ? (
								<BreadcrumbLink asChild>
									<Link href={crumb.href}>{crumb.label}</Link>
								</BreadcrumbLink>
							) : (
								<BreadcrumbPage>{crumb.label}</BreadcrumbPage>
							)}
						</BreadcrumbItem>
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
}

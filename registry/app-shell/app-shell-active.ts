import type { SidebarNavItem } from './app-shell.types';

function itemMatches(pathname: string, item: SidebarNavItem) {
	if (item.activePrefix) {
		return pathname === item.href || pathname.startsWith(`${item.activePrefix}/`);
	}
	return pathname === item.href;
}

/**
 * Longest matching href wins, so a nested item beats the parent it sits under:
 * `/data/clients` must not also light up a `/data` index item.
 */
export function itemIsActive(
	pathname: string,
	item: SidebarNavItem,
	items: readonly SidebarNavItem[],
): boolean {
	if (!itemMatches(pathname, item)) return false;
	return !items.some(
		(other) =>
			other.key !== item.key &&
			other.href.length > item.href.length &&
			itemMatches(pathname, other),
	);
}

/**
 * The key of the one item that should read as current, or null.
 *
 * `against` is the set precedence is resolved over, and defaults to `items`. The
 * sidebar passes the whole nav while searching one group, so a group whose route
 * lost to a nested item in another group correctly lights nothing.
 */
export function activeItemKey(
	pathname: string,
	items: readonly SidebarNavItem[],
	against: readonly SidebarNavItem[] = items,
): string | null {
	return items.find((item) => itemIsActive(pathname, item, against))?.key ?? null;
}

/** Flattens the groups once, for the precedence checks above. */
export function flattenNav(groups: readonly { items: readonly SidebarNavItem[] }[]) {
	return groups.flatMap((group) => group.items);
}

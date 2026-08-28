import type { ElementType, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

export type SidebarNavItem = {
	/** Identity for keys and active tracking. */
	key: string;
	label: string;
	href: string;
	icon: LucideIcon;
	/** Match nested routes too, so `/orders` stays lit on `/orders/1042`. */
	activePrefix?: string;
};

export type SidebarNavGroup = {
	key: string;
	/** Group heading. Omit for a single item that needs no header. */
	label?: string;
	items: readonly SidebarNavItem[];
};

export type Crumb = {
	label: string;
	/** Omit on the last crumb: the page you are on is not a link. */
	href?: string;
};

export type AppShellUser = {
	name: string;
	email: string;
	/** Two letters at most. Shown when there is no avatar image. */
	initials: string;
	avatarUrl?: string;
};

export type AppShellChrome = {
	/** Product name beside the mark. */
	brand: string;
	/** Where the brand links to. */
	brandHref: string;
	/** Any element. A logo, an inline svg, an emoji. */
	logo: ReactNode;
};

export type LinkComponent = ElementType<{
	href: string;
	className?: string;
	children?: ReactNode;
	'aria-current'?: 'page';
}>;

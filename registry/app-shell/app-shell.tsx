'use client';

import type { ReactNode } from 'react';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

import { AppBreadcrumbs, trailFromPathname } from './app-breadcrumbs';
import { AppSidebar } from './app-sidebar';
import type {
	AppShellChrome,
	AppShellUser,
	Crumb,
	LinkComponent,
	SidebarNavGroup,
} from './app-shell.types';

/**
 * Chrome for every signed-in page: collapsible nav rail, inset content panel,
 * a header carrying the sidebar trigger, breadcrumbs and whatever you put on the
 * right.
 *
 * Everything app-specific is a prop or a slot on purpose. The shell never reaches
 * for a router, a translator, a session or a store, which is what makes it
 * portable. Feed it `pathname` and it lights the right nav item; give it
 * `linkComponent` and it uses your router's Link.
 */
export function AppShell({
	children,
	groups,
	pathname,
	chrome,
	user,
	crumbs,
	linkComponent,
	dir = 'ltr',
	headerRight,
	commandMenu,
}: {
	children: ReactNode;
	groups: readonly SidebarNavGroup[];
	pathname: string;
	chrome: AppShellChrome;
	/** Rendered at the end of the header when no `headerRight` is given. */
	user?: AppShellUser;
	/** Supply your own trail. Omitted, it is derived from `pathname` and the nav. */
	crumbs?: readonly Crumb[];
	linkComponent?: LinkComponent;
	dir?: 'ltr' | 'rtl';
	/** Replaces the default user chip. Put a locale switcher, a trial pill, anything. */
	headerRight?: ReactNode;
	/** A command palette, mounted once outside the content panel. */
	commandMenu?: ReactNode;
}) {
	const trail = trailFromPathname(pathname, groups, crumbs);

	return (
		<SidebarProvider className="overflow-hidden bg-sidebar">
			<AppSidebar
				groups={groups}
				pathname={pathname}
				chrome={chrome}
				linkComponent={linkComponent}
				dir={dir}
			/>
			<SidebarInset className="relative min-h-0 min-w-0 overflow-hidden border border-border bg-background shadow-none md:peer-data-[variant=inset]:rounded-2xl">
				<header className="flex h-11 shrink-0 items-center gap-2 border-b px-3">
					<SidebarTrigger className="-ms-1" title="Toggle sidebar" />
					<Separator orientation="vertical" className="me-2 h-4 self-auto" />
					<AppBreadcrumbs crumbs={trail} linkComponent={linkComponent} />
					<div className="ms-auto flex shrink-0 items-center gap-2">
						{headerRight ?? (user ? <UserChip user={user} /> : null)}
					</div>
				</header>
				<div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4">{children}</div>
			</SidebarInset>
			{commandMenu}
		</SidebarProvider>
	);
}

/** Default header chip. Swap the whole thing out with `headerRight`. */
function UserChip({ user }: { user: AppShellUser }) {
	return (
		<div className="flex items-center gap-2">
			<div className="hidden text-right leading-tight sm:block">
				<p className="text-xs font-medium">{user.name}</p>
				<p className="text-[11px] text-muted-foreground">{user.email}</p>
			</div>
			{user.avatarUrl ? (
				<img src={user.avatarUrl} alt={user.name} className="size-7 rounded-full object-cover" />
			) : (
				<span className="flex size-7 items-center justify-center rounded-full bg-secondary text-[11px] font-medium">
					{user.initials}
				</span>
			)}
		</div>
	);
}

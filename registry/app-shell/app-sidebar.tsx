'use client';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

import { activeItemKey, flattenNav, itemIsActive } from './app-shell-active';
import type { AppShellChrome, LinkComponent, SidebarNavGroup } from './app-shell.types';

/**
 * The nav rail. Knows nothing about your router: it takes the current `pathname`
 * and the component to render links with, so it works with Next, React Router,
 * TanStack Router or plain anchors.
 */
export function AppSidebar({
	groups,
	pathname,
	chrome,
	linkComponent: Link = 'a',
	dir = 'ltr',
}: {
	groups: readonly SidebarNavGroup[];
	pathname: string;
	chrome: AppShellChrome;
	linkComponent?: LinkComponent;
	dir?: 'ltr' | 'rtl';
}) {
	const { state } = useSidebar();
	const isIcon = state === 'collapsed';
	const allItems = flattenNav(groups);

	return (
		<Sidebar variant="inset" collapsible="icon" dir={dir} side={dir === 'rtl' ? 'right' : 'left'}>
			<SidebarHeader
				className={cn(
					'flex flex-row items-center',
					// Matches the nav below: SidebarGroup's p-1 plus the buttons' px-2.5.
					isIcon ? 'justify-center px-0 py-3' : 'gap-2 p-1 pt-3 pb-1',
				)}
			>
				<Link
					href={chrome.brandHref}
					className={cn('flex min-w-0 items-center', isIcon ? 'justify-center' : 'gap-2 px-2.5')}
				>
					{chrome.logo}
					{!isIcon ? (
						<span className="truncate font-semibold text-foreground">{chrome.brand}</span>
					) : null}
				</Link>
			</SidebarHeader>

			<SidebarContent className="pt-2">
				{groups.map((group) => (
					<SidebarGroup key={group.key}>
						{group.label ? (
							<SidebarGroupLabel className="h-7 px-2.5 text-[10px] font-semibold tracking-[0.06em] text-muted-foreground uppercase">
								{group.label}
							</SidebarGroupLabel>
						) : null}
						<SidebarMenu>
							{group.items.map((item) => {
								// Precedence is resolved against the whole nav, not just this
								// group, so a group that lost to a nested item lights nothing.
								const active = itemIsActive(pathname, item, allItems);
								const Icon = item.icon;
								return (
									<SidebarMenuItem key={item.key}>
										<SidebarMenuButton asChild isActive={active} tooltip={item.label}>
											<Link href={item.href} aria-current={active ? 'page' : undefined}>
												<Icon className="size-4 shrink-0" aria-hidden="true" />
												<span className="min-w-0 flex-1 truncate group-data-[collapsible=icon]:hidden">
													{item.label}
												</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
						{/* Kept for callers that want to know which item won in this group. */}
						<span hidden data-active-key={activeItemKey(pathname, group.items, allItems) ?? ''} />
					</SidebarGroup>
				))}
			</SidebarContent>
		</Sidebar>
	);
}

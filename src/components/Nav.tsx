import { ThemeToggle } from '@/components/ThemeToggle';

const linkClass =
	'nav-link relative text-sm text-muted-foreground transition-colors hover:text-foreground data-[active=true]:font-medium data-[active=true]:text-foreground';

/** Home and Components. The sections live in the sidebar rail. */
export function Nav({ route }: { route: string }) {
	const onHome = route === '/';

	const links = [
		{ href: onHome ? '#top' : '/', label: 'Home', active: onHome },
		{ href: '/components', label: 'Components', active: !onHome },
	];

	return (
		<nav className="fixed top-0 right-0 left-0 z-50">
			{/* Blur strip that fades out downwards, so the column slides under it cleanly. */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-background [mask-image:linear-gradient(to_bottom,black_82%,transparent)]"
			/>
			<div className="relative mx-auto w-full max-w-6xl px-6">
				<div className="flex h-16 items-center justify-between">
					<ul className="flex items-center gap-5 md:gap-6">
						{links.map((link) => (
							<li key={link.label}>
								<a
									href={link.href}
									className={linkClass}
									data-active={link.active}
									aria-current={link.active ? 'page' : undefined}
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
					<ThemeToggle />
				</div>
			</div>
		</nav>
	);
}

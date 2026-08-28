import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

function readTheme() {
	// Storage access throws outright in some contexts, and this runs during render.
	try {
		const stored = localStorage.getItem('theme');
		if (stored === 'dark' || stored === 'light') return stored;
	} catch {
		// Fall through to the default.
	}
	// Light by default, whatever the system prefers.
	return 'light';
}

export function ThemeToggle() {
	const [theme, setTheme] = useState(readTheme);

	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark');
		try {
			localStorage.setItem('theme', theme);
		} catch {}
	}, [theme]);

	return (
		<button
			type="button"
			aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
			className="group cursor-pointer py-2 text-faint transition-colors hover:text-foreground"
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		>
			<span className="block transition-transform duration-300 ease-out group-hover:-rotate-12">
				{theme === 'dark' ? <SunIcon size={17} /> : <MoonIcon size={17} />}
			</span>
		</button>
	);
}

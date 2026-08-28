import { useEffect, useState, type ComponentProps } from 'react';

/** Reads the pathname, follows back and forward, and pushes state on internal links. */
function currentPath() {
	const path = location.pathname.replace(/\/+$/, '');
	return path === '' ? '/' : path;
}

export function useRoute() {
	const [path, setPath] = useState(currentPath);

	useEffect(() => {
		const sync = () => setPath(currentPath());

		function onClick(event: MouseEvent) {
			if (event.defaultPrevented || event.button !== 0) return;
			if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

			const anchor = (event.target as HTMLElement | null)?.closest('a');
			if (!anchor) return;
			if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;

			const href = anchor.getAttribute('href');
			// Same-page anchors and external links keep their normal behaviour.
			if (!href || !href.startsWith('/') || href.startsWith('//')) return;

			event.preventDefault();
			if (href !== location.pathname) {
				history.pushState(null, '', href);
				scrollTo({ top: 0 });
				setPath(currentPath());
			}
		}

		window.addEventListener('popstate', sync);
		document.addEventListener('click', onClick);
		return () => {
			window.removeEventListener('popstate', sync);
			document.removeEventListener('click', onClick);
		};
	}, []);

	return path;
}

/** A plain anchor. The interceptor above turns it into a client navigation. */
export function Link(props: ComponentProps<'a'>) {
	return <a {...props} />;
}

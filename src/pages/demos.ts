import { lazy } from 'react';

/** Demo per registry block, shared by the components page and the full page route. */
export const DEMOS = {
	'app-shell': lazy(() =>
		import('../../registry/app-shell/app-shell.demo').then((m) => ({ default: m.AppShellDemo })),
	),
	'smooth-cursor': lazy(() =>
		import('../../registry/smooth-cursor/smooth-cursor.demo').then((m) => ({
			default: m.SmoothCursorDemo,
		})),
	),
	'scroll-traced-rail': lazy(() =>
		import('../../registry/scroll-traced-rail/scroll-traced-rail.demo').then((m) => ({
			default: m.ScrollTracedRailDemo,
		})),
	),
	'project-showcase': lazy(() =>
		import('../../registry/project-showcase/project-showcase.demo').then((m) => ({
			default: m.ProjectShowcaseDemo,
		})),
	),
};

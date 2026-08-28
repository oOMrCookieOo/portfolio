import type { RegistryBlock } from '@/types';

/**
 * What the components page lists. Keep in step with registry.json, which is what
 * `npx shadcn build` turns into public/r/*.json.
 */

// The registry is not published yet. The components page, its previews and the
// fullscreen route all stay live; this holds back only the per-block install
// command, the registry explainer's example and the copy that promises both.
// Flip to true once public/r is live.
export const REGISTRY_READY = false;

// Change this to the deployed domain, or the copy buttons hand out a dead URL.
export const REGISTRY_ORIGIN = 'https://isslem.dev';

export const blocks: RegistryBlock[] = [
	{
		name: 'App shell',
		slug: 'app-shell',
		blurb:
			'Collapsible nav rail, inset content panel and a header carrying breadcrumbs. Extracted from a production back office, with every app-specific dependency inverted into a prop or a slot.',
		deps: ['sidebar', 'breadcrumb', 'separator', 'lucide-react'],
		notes: [
			'Takes pathname and linkComponent, so it works with Next, React Router, TanStack Router or plain anchors.',
			'Nav precedence resolves longest href first, so a nested route does not also light its parent.',
			'Breadcrumbs derive from the pathname and the nav, or you pass your own trail.',
			'headerRight and commandMenu are slots: put a locale switcher, a trial pill or a command palette there.',
		],
	},
	{
		name: 'Smooth cursor',
		slug: 'smooth-cursor',
		blurb:
			'A drawn cursor that springs after the pointer, tilts into its direction of travel, squashes with speed, and swaps to a hand over anything clickable. The one running on this site.',
		deps: ['no dependencies'],
		notes: [
			'Position and angle are both springs, integrated at a fixed 360Hz substep, so the motion is identical at 60Hz and 144Hz.',
			'One requestAnimationFrame loop writes one transform. No React state, so pointer movement costs no renders.',
			'scope takes a ref, so it can take over a single panel instead of the whole document.',
			'Ships its own stylesheet, so there is no CSS to wire up. Sits out on touch and under prefers-reduced-motion.',
		],
	},
	{
		name: 'Scroll traced rail',
		slug: 'scroll-traced-rail',
		blurb:
			'A vertical rail that draws itself as its content scrolls past. Used on the Experience timeline of this site.',
		deps: ['motion'],
		notes: [
			'Stretches to any height: the SVG scales with preserveAspectRatio="none" and a non-scaling stroke, so nothing has to be measured.',
			'pathLength runs through a spring, which is what stops the tip stuttering on a trackpad.',
			'Colours come from currentColor and the border token, so it follows the theme and every palette.',
			'Under prefers-reduced-motion the line is drawn in full rather than gated behind scrolling.',
		],
	},
	{
		name: 'Project showcase',
		slug: 'project-showcase',
		blurb:
			'A list of work where hovering a row floats a preview beside the cursor, trailing slightly behind it.',
		deps: ['lucide-react'],
		notes: [
			'One requestAnimationFrame loop writes the transform, so moving the pointer never re-renders React.',
			'The lag is a lerp toward the pointer, which is what makes the preview feel physical.',
			'Keyboard focus opens the preview too, not just hover.',
			'Skipped under prefers-reduced-motion and on touch, where a follow effect makes no sense.',
		],
	},
];

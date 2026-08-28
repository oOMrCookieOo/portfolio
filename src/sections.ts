/**
 * One label per section, and the rail built from whichever sections a layout
 * actually renders. Every layout shows a different subset in a different order,
 * and a rail entry with no section on the page never lights up, so the rail has
 * to be derived from the render list rather than written out beside it.
 */
export type SectionId =
	'about' | 'stack' | 'work' | 'projects' | 'github' | 'components' | 'background' | 'contact';

export type RailItem = { id: string; label: string };

export const SECTION_LABELS: Record<SectionId, string> = {
	about: 'About me',
	stack: 'Tech stack',
	work: 'Experience',
	projects: 'Selected work',
	github: 'Commits',
	components: 'Components',
	background: 'Education',
	contact: 'Get in touch',
};

export function railFor(ids: readonly SectionId[]): RailItem[] {
	return ids.map((id) => ({ id, label: SECTION_LABELS[id] }));
}

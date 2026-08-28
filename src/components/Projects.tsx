import { Reveal, Section } from '@/components/Section';
import { brandColor, ICONS } from '@/components/Stack';
import { projects, type Project } from '@/data';
import {
	ProjectShowcase,
	type ShowcaseItem,
} from '../../registry/project-showcase/project-showcase';

// Tag label to the icon key used in Stack.tsx.
const TAG_ICONS: Record<string, string> = {
	Laravel: 'laravel',
	'Vue.js': 'vue',
	MySQL: 'mysql',
	'Next.js': 'nextjs',
	TypeScript: 'typescript',
	NestJS: 'nestjs',
	'Tailwind CSS': 'tailwind',
	Livewire: 'livewire',
	'AWS Lambda': 'lambda',
	DynamoDB: 'dynamodb',
	PostgreSQL: 'postgres',
};

/** Stack chip with its brand mark, so the open row shows the same marks as the stack section. */
function tagChips(project: Project) {
	return project.tags.map((tag) => {
		const key = TAG_ICONS[tag] ?? '';
		const Icon = ICONS[key];
		return (
			<>
				{Icon ? <Icon color={brandColor(key)} className="size-3.5" /> : null}
				{tag}
			</>
		);
	});
}

/** First sentence of the blurb, for the collapsed row. */
function firstSentence(text: string) {
	const [first, ...rest] = text.split('. ');
	return rest.length > 0 ? first + '.' : first;
}

const items: readonly ShowcaseItem[] = projects.map((project) => ({
	title: project.name,
	description: firstSentence(project.blurb),
	detail: project.blurb,
	href: project.href,
	image: project.preview,
	tags: tagChips(project),
	facts: project.role ? [{ label: 'Role', value: project.role }] : undefined,
}));

export function Projects() {
	return (
		<Section id="projects" label="Selected work">
			<Reveal>
				<ProjectShowcase items={items} label="" />
			</Reveal>
		</Section>
	);
}

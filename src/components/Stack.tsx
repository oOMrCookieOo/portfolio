import {
	SiAlpinedotjs,
	SiCursor,
	SiFigma,
	SiJavascript,
	SiNginx,
	SiNodedotjs,
	SiPostman,
	SiReact,
	SiShadcnui,
	SiDocker,
	SiFastify,
	SiFilament,
	SiGit,
	SiGithub,
	SiGithubactions,
	SiInertia,
	SiLaravel,
	SiLivewire,
	SiMysql,
	SiNestjs,
	SiNextdotjs,
	SiPhp,
	SiPostgresql,
	SiTailwindcss,
	SiTypescript,
	SiVuedotjs,
} from '@icons-pack/react-simple-icons';
import { CloudIcon, DatabaseIcon } from '@phosphor-icons/react';
import type { ComponentType } from 'react';

import { Reveal, Section } from '@/components/Section';
import { Tooltip } from '@/components/Tooltip';
import { stack } from '@/data';

type IconProps = { size?: number; className?: string; color?: string };

// Brand marks come from Simple Icons. AWS pulled its marks from that set, so
// Lambda and DynamoDB fall back to Phosphor glyphs.
export const ICONS: Record<string, ComponentType<IconProps>> = {
	laravel: SiLaravel,
	php: SiPhp,
	nestjs: SiNestjs,
	fastify: SiFastify,
	livewire: SiLivewire,
	filament: SiFilament,
	typescript: SiTypescript,
	nextjs: SiNextdotjs,
	vue: SiVuedotjs,
	inertia: SiInertia,
	tailwind: SiTailwindcss,
	alpine: SiAlpinedotjs,
	postgres: SiPostgresql,
	mysql: SiMysql,
	dynamodb: DatabaseIcon,
	lambda: CloudIcon,
	docker: SiDocker,
	git: SiGit,
	github: SiGithub,
	githubactions: SiGithubactions,
	node: SiNodedotjs,
	javascript: SiJavascript,
	react: SiReact,
	shadcn: SiShadcnui,
	nginx: SiNginx,
	postman: SiPostman,
	figma: SiFigma,
	cursor: SiCursor,
};

// Everything except the two Phosphor fallbacks renders in its own brand colour.
const PHOSPHOR_FALLBACKS = new Set(['dynamodb', 'lambda']);
export const brandColor = (key: string) => (PHOSPHOR_FALLBACKS.has(key) ? undefined : 'default');

const flat = stack.flatMap((group) => group.items);

export function Stack() {
	return (
		<Section id="stack" label="Tech stack">
			<Reveal>
				<div className="flex flex-wrap items-center gap-3 opacity-95 sm:gap-4">
					{flat.map((item) => {
						const Icon = ICONS[item.icon];
						if (!Icon) return null;
						return (
							<Tooltip key={item.name} text={item.name}>
								<Icon
									color={brandColor(item.icon)}
									className="size-5.5 cursor-pointer object-contain transition-transform duration-200 hover:scale-110 sm:size-9"
								/>
							</Tooltip>
						);
					})}
				</div>
			</Reveal>
		</Section>
	);
}

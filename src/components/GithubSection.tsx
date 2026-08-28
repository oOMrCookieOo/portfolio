import { Reveal, Section } from '@/components/Section';
import { GitHubActivity } from '@/components/ui/github-activity';
import { profile } from '@/data';
import { useAccentColor } from '@/hooks/useAccent';

const login = profile.github.split('/').pop() ?? '';

export function GithubSection() {
	// The graph paints its squares in JS, so it needs a colour value, not a variable.
	const accent = useAccentColor();

	return (
		<Section id="github" label="Commits">
			<Reveal>
				{/* Full bleed on phones so a year of squares stays readable. */}
				<div className="no-scrollbar relative -mx-6 overflow-x-auto sm:mx-0 sm:overflow-visible">
					<div className="min-w-[580px] px-6 sm:min-w-0 sm:px-0">
						<GitHubActivity
							username={login}
							accent={accent}
							months={12}
							showMonths
							label="Most active repositories"
						/>
					</div>
				</div>
			</Reveal>
		</Section>
	);
}

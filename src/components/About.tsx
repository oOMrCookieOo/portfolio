import { Reveal, Section } from '@/components/Section';
import { about, profile } from '@/data';

/** The description as its own section, for layouts that put it in the content column. */
export function About() {
	return (
		<Section id="about" label="About" className="mt-0">
			<Reveal>
				<p className="text-[17px] leading-[1.6] font-medium">{profile.tagline}</p>
				<div className="mt-4 flex flex-col gap-3.5 text-[14px] leading-[1.8] text-muted-foreground sm:text-[15px]">
					{about.map((paragraph) => (
						<p key={paragraph.slice(0, 20)}>{paragraph}</p>
					))}
				</div>
			</Reveal>
		</Section>
	);
}

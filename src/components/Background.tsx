import { Reveal, Section } from '@/components/Section';
import { education, practices } from '@/data';

export function Background() {
	return (
		<Section id="background" label="Education">
			<Reveal className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
				<div>
					<h3 className="text-[14px] font-medium tracking-tight sm:text-[15px]">
						{education.degree}
					</h3>
					<p className="mt-0.5 text-[12.5px] text-faint sm:text-[13px]">
						{education.school}. {education.place}.
					</p>
				</div>
				<span className="font-mono text-[11px] font-medium tabular-nums text-faint sm:text-xs">
					{education.period}
				</span>
			</Reveal>
			<Reveal delay={80} className="mt-6 flex flex-wrap gap-x-3 gap-y-1.5">
				{practices.map((item) => (
					<span key={item} className="font-mono text-[11px] text-faint">
						{item}
					</span>
				))}
			</Reveal>
		</Section>
	);
}

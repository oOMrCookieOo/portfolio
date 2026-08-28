import { ArrowUpRightIcon } from '@phosphor-icons/react';

import { FloatingPreview } from '@/components/FloatingPreview';
import { Reveal, Section } from '@/components/Section';
import { ScrollTracedRail } from '../../registry/scroll-traced-rail/scroll-traced-rail';
import { experiences } from '@/data';

const targets = experiences.map((job) => ({
	key: job.company,
	image: job.preview,
	label: job.company,
}));

export function Experience() {
	return (
		<Section id="work" label="Experience">
			<FloatingPreview targets={targets}>
				{/* The rail draws itself as the timeline scrolls past, so progress through the
				    history is the line itself. */}
				{(bind) => (
					<ScrollTracedRail head={false} railClassName="top-[10px] bottom-3">
						<ol className="space-y-10">
							{experiences.map((job, index) => (
								<Reveal as="li" key={job.company} delay={index * 60} className="relative pl-7">
									<span
										aria-hidden
										className={
											index === 0
												? 'absolute top-[7px] -left-[3px] z-10 size-[7px] rounded-full bg-primary ring-4 ring-primary/20'
												: 'absolute top-[7px] -left-[3px] z-10 size-[7px] rounded-full bg-faint ring-4 ring-background'
										}
									/>
									<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2.5 sm:gap-y-1">
										<div className="flex flex-wrap items-baseline gap-2">
											<h3 className="text-[14px] font-medium tracking-tight sm:text-[15px]">
												{job.role}
											</h3>
											<span className="text-faint">·</span>
											{/* The company name is the hover target: it floats a shot of their site. */}
											{job.href ? (
												<a
													href={job.href}
													target="_blank"
													rel="noreferrer noopener"
													className="group inline-flex items-center gap-1 text-[12.5px] font-[450] text-muted-foreground underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current sm:text-[13.5px]"
													{...bind(job.company)}
												>
													{job.company}
													<ArrowUpRightIcon size={11} className="text-faint" />
												</a>
											) : (
												<span
													className="text-[12.5px] font-[450] text-muted-foreground sm:text-[13.5px]"
													{...bind(job.company)}
												>
													{job.company}
												</span>
											)}
										</div>
										<span className="font-mono text-[11px] font-medium tabular-nums whitespace-nowrap text-faint sm:text-xs">
											{job.period}
										</span>
									</div>
									<div className="mt-0.5 text-[12px] text-faint sm:text-[12.5px]">{job.place}</div>
									<ul className="mt-3 space-y-1.5">
										{job.bullets.map((bullet) => (
											<li
												key={bullet.slice(0, 20)}
												className="flex items-start gap-2.5 text-[13px] leading-[1.6] font-[450] text-muted-foreground sm:text-[13.5px]"
											>
												<span
													aria-hidden
													className="mt-[8.5px] size-[3px] shrink-0 rounded-full bg-faint"
												/>
												<span>{bullet}</span>
											</li>
										))}
									</ul>
									<ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
										{job.tags.map((tag) => (
											<li key={tag} className="font-mono text-[11px] text-faint">
												{tag}
											</li>
										))}
									</ul>
								</Reveal>
							))}
						</ol>
					</ScrollTracedRail>
				)}
			</FloatingPreview>
		</Section>
	);
}

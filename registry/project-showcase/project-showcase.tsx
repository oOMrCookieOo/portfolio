'use client';

import { ArrowUpRight, Plus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type ShowcaseItem = {
	title: string;
	description: string;
	/** Right-aligned metadata. A year, a period, a role. */
	meta?: string;
	href?: string;
	/** Shown in the floating preview and, larger, in the open row. */
	image?: string;
	/** Longer copy for the open row. Falls back to `description`. */
	detail?: string;
	/** Rendered as small labels under the copy. Strings, or your own nodes. */
	tags?: readonly ReactNode[];
	/** Short facts shown as a mono row: stack, scale, dates. */
	facts?: readonly { label: string; value: string }[];
};

/*
	Preview and open state share one visual language on purpose: the same radius,
	the same hairline border, the same 16:9 crop from the top. The floating tile
	reads as a small version of what opening the row will show, instead of two
	unrelated treatments.
*/
const SHOT = 'overflow-hidden rounded-xl border border-border bg-secondary';

/**
 * A list of work. Hovering a row floats a small preview beside the cursor;
 * clicking opens that row in place with the full-size shot and the detail.
 *
 * The list keeps its shape either way, so it stays scannable. Rows that are not
 * open dim slightly while one is, which is what makes an open row read as the
 * subject rather than as a row that grew.
 *
 * The floating tile is positioned by one rAF loop writing a transform, so pointer
 * movement never re-renders React and the tile trails slightly behind the cursor.
 * Under `prefers-reduced-motion` the float and the height animation are dropped;
 * on touch the float never appears and clicking still opens the row.
 */
export function ProjectShowcase({
	items,
	label = 'Selected work',
	className,
}: {
	items: readonly ShowcaseItem[];
	label?: string;
	className?: string;
}) {
	const [hovered, setHovered] = useState<number | null>(null);
	const [open, setOpen] = useState<string | null>(null);
	// Whether the floating tile can be shown at all: false on touch and under
	// reduced motion, where nothing positions it.
	const canFloat = useRef(false);
	// Focus highlights the row without summoning the pointer-following tile.
	const [focused, setFocused] = useState<number | null>(null);
	const container = useRef<HTMLDivElement>(null);
	const preview = useRef<HTMLDivElement>(null);
	const target = useRef({ x: 0, y: 0 });
	const reduce = useReducedMotion();

	useEffect(() => {
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		if (matchMedia('(pointer: coarse)').matches) return;
		canFloat.current = true;

		// Nothing hovered means nothing to position, so the loop does not run.
		if (hovered === null) return;

		let x = target.current.x;
		let y = target.current.y;
		let frame = 0;

		const tick = () => {
			x += (target.current.x - x) * 0.15;
			y += (target.current.y - y) * 0.15;
			if (preview.current) {
				preview.current.style.transform = `translate3d(${x + 24}px, ${y - 92}px, 0)`;
			}
			frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [hovered]);

	function onMove(event: MouseEvent<HTMLDivElement>) {
		const box = container.current?.getBoundingClientRect();
		if (!box) return;
		target.current = { x: event.clientX - box.left, y: event.clientY - box.top };
	}

	const active = hovered !== null ? items[hovered] : undefined;
	// Hidden when the row is already open, since the tile would sit on top of the
	// larger shot it duplicates, and whenever nothing positions it.
	const floating = canFloat.current && active && open !== active.title;

	return (
		<div ref={container} onMouseMove={onMove} className={cn('relative', className)}>
			{label ? (
				<h2 className="mb-6 font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
					{label}
				</h2>
			) : null}

			<div
				ref={preview}
				aria-hidden
				className={cn(
					SHOT,
					'pointer-events-none absolute top-0 left-0 z-40 hidden w-[264px] shadow-2xl transition-[opacity,scale] duration-300 ease-out sm:block',
				)}
				style={{ opacity: floating ? 1 : 0, scale: floating ? '1' : '0.9' }}
			>
				<div className="relative aspect-video w-full">
					{items.map((item, index) =>
						item.image ? (
							<img
								key={item.title}
								src={item.image}
								alt=""
								loading="lazy"
								className="absolute inset-0 size-full object-cover object-top transition-all duration-500 ease-out"
								style={{
									opacity: hovered === index ? 1 : 0,
									scale: hovered === index ? '1' : '1.06',
									filter: hovered === index ? 'none' : 'blur(8px)',
								}}
							/>
						) : null,
					)}
					{active && !active.image ? (
						<span className="absolute inset-0 flex items-center justify-center px-4 text-center font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
							{active.title}
						</span>
					) : null}
				</div>
			</div>

			<ul>
				{items.map((item, index) => {
					const on = hovered === index || focused === index;
					const isOpen = open === item.title;
					const dimmed = open !== null && !isOpen;
					return (
						<li
							key={item.title}
							className={cn(
								'border-t border-border transition-opacity duration-300 last:border-b',
								dimmed && 'opacity-45',
							)}
						>
							<button
								type="button"
								aria-expanded={isOpen}
								className="group relative block w-full py-5 text-left"
								onClick={() => setOpen(isOpen ? null : item.title)}
								onMouseEnter={() => setHovered(index)}
								onMouseLeave={() => setHovered(null)}
								onFocus={() => setFocused(index)}
								onBlur={() => setFocused(null)}
							>
								<span
									aria-hidden
									className={cn(
										'absolute inset-0 -mx-4 rounded-lg bg-secondary/50 transition-all duration-300 ease-out',
										on || isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
									)}
								/>
								<span className="relative flex items-start justify-between gap-4">
									<span className="min-w-0 flex-1">
										<span className="relative inline-block text-lg font-medium tracking-tight">
											{item.title}
											<span
												aria-hidden
												className={cn(
													'absolute -bottom-0.5 left-0 h-px bg-foreground transition-all duration-300 ease-out',
													on || isOpen ? 'w-full' : 'w-0',
												)}
											/>
										</span>
										<span
											className={cn(
												'mt-1 block text-sm leading-relaxed transition-colors duration-300 ease-out',
												on ? 'text-foreground/70' : 'text-muted-foreground',
											)}
										>
											{item.description}
										</span>
									</span>
									<span className="flex shrink-0 items-center gap-2.5">
										{item.meta ? (
											<span
												className={cn(
													'font-mono text-xs tabular-nums transition-colors duration-300 ease-out',
													on ? 'text-foreground/60' : 'text-muted-foreground',
												)}
											>
												{item.meta}
											</span>
										) : null}
										<Plus
											className={cn(
												'size-4 text-muted-foreground transition-transform duration-300',
												isOpen && 'rotate-45',
											)}
										/>
									</span>
								</span>
							</button>

							<AnimatePresence initial={false}>
								{isOpen ? (
									<motion.div
										key="detail"
										initial={reduce ? false : { opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: 'auto' }}
										exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
										transition={
											reduce ? { duration: 0 } : { duration: 0.36, ease: [0.22, 1, 0.36, 1] }
										}
										className="overflow-hidden"
									>
										{/* Shot leads, copy sits beside it on desktop and under it on phones. */}
										<div className="grid gap-5 pb-7 lg:grid-cols-[3fr_2fr] lg:gap-6">
											<motion.div
												initial={reduce ? false : { opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
												className={cn(SHOT, 'relative self-start')}
											>
												<div className="relative aspect-video w-full">
													{item.image ? (
														<img
															src={item.image}
															alt={`${item.title} screenshot`}
															loading="lazy"
															className="absolute inset-0 size-full object-cover object-top"
														/>
													) : (
														<span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
															No screenshot
														</span>
													)}
												</div>
											</motion.div>

											<motion.div
												initial={reduce ? false : { opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.4, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
												className="flex min-w-0 flex-col gap-4"
											>
												<p className="text-sm leading-[1.75] text-muted-foreground">
													{item.detail ?? item.description}
												</p>

												{item.facts?.length ? (
													<dl className="flex flex-col gap-1.5 border-t border-border pt-3">
														{item.facts.map((fact) => (
															<div key={fact.label} className="flex items-baseline gap-3">
																<dt className="w-20 shrink-0 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
																	{fact.label}
																</dt>
																<dd className="min-w-0 text-[13px]">{fact.value}</dd>
															</div>
														))}
													</dl>
												) : null}

												{item.tags?.length ? (
													<ul className="flex flex-wrap items-center gap-2">
														{item.tags.map((tag, tagIndex) => (
															<li
																key={tagIndex}
																className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
															>
																{tag}
															</li>
														))}
													</ul>
												) : null}

												{item.href ? (
													<a
														href={item.href}
														target="_blank"
														rel="noreferrer noopener"
														className="mt-auto inline-flex w-fit items-center gap-1.5 text-sm font-medium underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
													>
														Visit site
														<ArrowUpRight className="size-3.5" />
													</a>
												) : null}
											</motion.div>
										</div>
									</motion.div>
								) : null}
							</AnimatePresence>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

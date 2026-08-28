import { useEffect, useRef, useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type PreviewTarget = { key: string; image?: string; label: string };

/** Floats a preview of the hovered row. Rows opt in with the `bind` helper. */
export function FloatingPreview({
	targets,
	children,
	className,
}: {
	targets: readonly PreviewTarget[];
	children: (
		bind: (key: string) => {
			onMouseEnter: () => void;
			onMouseLeave: () => void;
			onFocus: () => void;
			onBlur: () => void;
		},
	) => ReactNode;
	className?: string;
}) {
	const [active, setActive] = useState<string | null>(null);
	const container = useRef<HTMLDivElement>(null);
	const tile = useRef<HTMLDivElement>(null);
	const target = useRef({ x: 0, y: 0 });
	const at = useRef({ x: 0, y: 0 });

	// Runs only while a row is hovered. From mount it kept a frame callback alive
	// for the whole visit, lerping a tile nobody could see.
	useEffect(() => {
		if (!active) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		if (matchMedia('(pointer: coarse)').matches) return;

		// Start from the pointer, so the tile does not slide in from wherever the
		// previous hover left it.
		at.current = { ...target.current };
		let frame = 0;

		const tick = () => {
			at.current.x += (target.current.x - at.current.x) * 0.15;
			at.current.y += (target.current.y - at.current.y) * 0.15;
			const { x, y } = at.current;
			if (tile.current) tile.current.style.transform = `translate3d(${x + 24}px, ${y - 88}px, 0)`;
			frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [active]);

	function onMove(event: React.MouseEvent<HTMLDivElement>) {
		const box = container.current?.getBoundingClientRect();
		if (!box) return;
		target.current = { x: event.clientX - box.left, y: event.clientY - box.top };
	}

	const bind = (key: string) => ({
		onMouseEnter: () => setActive(key),
		onMouseLeave: () => setActive(null),
		onFocus: () => setActive(key),
		onBlur: () => setActive(null),
	});

	const shown = targets.find((item) => item.key === active);

	return (
		<div ref={container} onMouseMove={onMove} className={cn('relative', className)}>
			<div
				ref={tile}
				aria-hidden
				className="pointer-events-none absolute top-0 left-0 z-40 hidden overflow-hidden rounded-card shadow-2xl transition-[opacity,scale] duration-300 ease-out sm:block"
				style={{ opacity: shown ? 1 : 0, scale: shown ? '1' : '0.85' }}
			>
				<div className="relative h-[170px] w-[265px] overflow-hidden rounded-card border border-card-border bg-muted">
					{targets.map((item) =>
						item.image ? (
							<img
								key={item.key}
								src={item.image}
								alt=""
								loading="lazy"
								className="absolute inset-0 size-full object-cover object-top transition-all duration-500 ease-out"
								style={{
									opacity: active === item.key ? 1 : 0,
									scale: active === item.key ? '1' : '1.08',
									filter: active === item.key ? 'none' : 'blur(10px)',
								}}
							/>
						) : null,
					)}
					{shown && !shown.image ? (
						<span className="absolute inset-0 flex items-center justify-center px-4 text-center font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
							{shown.label}
						</span>
					) : null}
				</div>
			</div>
			{children(bind)}
		</div>
	);
}

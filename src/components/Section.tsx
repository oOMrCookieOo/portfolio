import { useEffect, useRef, useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

/** Reveals its children once, on scroll into view. */
export function Reveal({
	children,
	className,
	delay = 0,
	as: Tag = 'div',
}: {
	children: ReactNode;
	className?: string;
	delay?: number;
	as?: 'div' | 'li' | 'section';
}) {
	const ref = useRef<HTMLElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
		);
		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<Tag
			// @ts-expect-error one ref for three possible tags
			ref={ref}
			className={cn('reveal', className)}
			data-visible={visible}
			style={delay ? { transitionDelay: `${delay}ms` } : undefined}
		>
			{children}
		</Tag>
	);
}

/** The small uppercase label that opens every section. */
export function Section({
	id,
	label,
	children,
	className,
}: {
	id: string;
	label: string;
	children: ReactNode;
	className?: string;
}) {
	return (
		<section id={id} className={cn('mt-20 scroll-mt-24', className)}>
			<Reveal>
				<h2 className="section-label mb-4 font-mono">{label}</h2>
			</Reveal>
			{children}
		</section>
	);
}

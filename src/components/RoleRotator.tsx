import { useEffect, useState } from 'react';

/** Cycles the role lines letter by letter. The tallest line reserves the row width. */
export function RoleRotator({ roles, interval = 2600 }: { roles: string[]; interval?: number }) {
	const [index, setIndex] = useState(0);
	const [still] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);

	useEffect(() => {
		if (still) return;
		const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), interval);
		return () => clearInterval(id);
	}, [interval, roles.length, still]);

	const longest = roles.reduce((a, b) => (b.length > a.length ? b : a), '');
	const current = roles[index];

	return (
		<span className="inline-grid align-baseline font-medium">
			<span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
				{longest}
			</span>
			<span key={current} className="col-start-1 row-start-1 whitespace-nowrap">
				{[...current].map((letter, position) => (
					<span
						key={`${current}-${position}`}
						className="inline-block whitespace-pre"
						style={
							still
								? undefined
								: {
										animation: `letter-in 420ms cubic-bezier(0.22,1,0.36,1) ${position * 18}ms both`,
									}
						}
					>
						{letter}
					</span>
				))}
			</span>
			<style>{`@keyframes letter-in{from{filter:blur(6px);opacity:0;transform:translateY(4px)}to{filter:blur(0);opacity:1;transform:none}}`}</style>
		</span>
	);
}

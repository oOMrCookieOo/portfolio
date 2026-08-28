import { CaretLeftIcon, CaretRightIcon, CursorIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import {
	PALETTES,
	readStoredPalette,
	setPalette,
	setRing,
	type PaletteId,
} from '@/hooks/useAccent';

/**
 * PROTOTYPE ONLY. Variant cycling, palette chips and the ring cursor toggle.
 * Deliberately loud so it cannot be mistaken for part of the design.
 */
export function PrototypeSwitcher({
	variants,
	current,
	onChange,
	names,
	ring,
	onRingChange,
}: {
	variants: string[];
	current: string;
	onChange: (variant: string) => void;
	names?: Record<string, string>;
	ring: boolean;
	onRingChange: (on: boolean) => void;
}) {
	const index = Math.max(0, variants.indexOf(current));
	const [palette, setLocalPalette] = useState<PaletteId>(readStoredPalette);

	useEffect(() => {
		setPalette(palette);
	}, [palette]);

	useEffect(() => {
		setRing(ring);
	}, [ring]);

	useEffect(() => {
		function onKey(event: KeyboardEvent) {
			const target = event.target as HTMLElement | null;
			if (target?.matches('input, textarea, [contenteditable]')) return;
			if (event.key === 'ArrowLeft')
				onChange(variants[(index - 1 + variants.length) % variants.length]);
			if (event.key === 'ArrowRight') onChange(variants[(index + 1) % variants.length]);
		}
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [index, onChange, variants]);

	return (
		<div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full bg-zinc-900 px-2 py-1.5 text-white shadow-lg ring-1 ring-white/15">
			<button
				type="button"
				aria-label="Previous variant"
				className="rounded-full p-1.5 hover:bg-white/15"
				onClick={() => onChange(variants[(index - 1 + variants.length) % variants.length])}
			>
				<CaretLeftIcon size={16} />
			</button>
			<span className="px-1 font-mono text-xs whitespace-nowrap">
				{current}
				{names?.[current] ? ` ${names[current]}` : ''}
			</span>
			<button
				type="button"
				aria-label="Next variant"
				className="rounded-full p-1.5 hover:bg-white/15"
				onClick={() => onChange(variants[(index + 1) % variants.length])}
			>
				<CaretRightIcon size={16} />
			</button>

			<span aria-hidden className="mx-1 h-4 w-px bg-white/20" />

			<div className="flex items-center gap-1">
				{PALETTES.map((option) => (
					<button
						key={option.id}
						type="button"
						title={option.label}
						aria-label={option.label}
						aria-pressed={palette === option.id}
						onClick={() => setLocalPalette(option.id)}
						className={
							palette === option.id
								? 'size-4.5 overflow-hidden rounded-full ring-2 ring-white ring-offset-1 ring-offset-zinc-900'
								: 'size-4.5 overflow-hidden rounded-full opacity-60 hover:opacity-100'
						}
						style={{
							background: `linear-gradient(135deg, ${option.swatch[0]} 0 50%, ${option.swatch[1]} 50% 100%)`,
						}}
					/>
				))}
			</div>

			<span aria-hidden className="mx-1 h-4 w-px bg-white/20" />

			<button
				type="button"
				title="Ring cursor"
				aria-label="Ring cursor"
				aria-pressed={ring}
				onClick={() => onRingChange(!ring)}
				className={
					ring
						? 'rounded-full bg-white/20 p-1.5'
						: 'rounded-full p-1.5 text-white/50 hover:bg-white/10'
				}
			>
				<CursorIcon size={15} />
			</button>
		</div>
	);
}

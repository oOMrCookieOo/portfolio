/** Tiled SVG grid on a fixed layer. Stroke is `currentColor`, so it follows the palette. */
export function GridBackground() {
	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-0 -z-10 overflow-hidden text-foreground/[0.055] select-none dark:text-foreground/[0.05]"
		>
			<svg className="absolute size-0">
				<defs>
					<pattern id="grid-pattern" width="70" height="70" patternUnits="userSpaceOnUse">
						<path d="M 70 0 L 0 0 0 70" fill="none" stroke="currentColor" strokeWidth="1" />
					</pattern>
				</defs>
			</svg>
			<svg className="absolute inset-0 size-full">
				<rect width="100%" height="100%" fill="url(#grid-pattern)" />
			</svg>
			{/* Fades the grid out at the edges so it never fights the content. */}
			<div className="absolute inset-0 bg-radial-[at_50%_35%] from-transparent to-background to-75%" />
		</div>
	);
}

/*
	Owns every variant. Dev shows the switcher over them, and site.variant in
	data.ts can ship any one of them:
	- hero swaps that keep the normal single column: A B C D E F I M
	- sticky sidebar shells, same layout with four different headers: G J K L
	- the paco columns shell: H
	- the datasheet, my own take: N
	App hands over the page as `parts`, so a variant can reorder or drop a section.
*/
import type { ComponentType } from 'react';

import { Hero } from '@/components/Hero';
import { PageLayout } from '@/components/PageLayout';
import { experiences, profile, projects } from '@/data';
import { DatasheetShell } from '@/prototype/DatasheetShell';
import {
	VariantB,
	VariantC,
	VariantD,
	VariantE,
	VariantF,
	VariantI,
	VariantM,
	variantNames,
} from '@/prototype/HeroVariants';
import { PrototypeSwitcher } from '@/prototype/PrototypeSwitcher';
import {
	AboutFirstHeader,
	ColumnsShell,
	EditorialHeader,
	MetaHeader,
	PlainHeader,
	ProseHeader,
	SidebarShell,
} from '@/prototype/ShellVariants';
import { railFor } from '@/sections';
import { VARIANT_KEYS, type PageParts, type VariantKey } from '@/types';

const HEROES: Record<string, ComponentType> = {
	A: Hero,
	B: VariantB,
	C: VariantC,
	D: VariantD,
	E: VariantE,
	F: VariantF,
	I: VariantI,
	M: VariantM,
};

// Sticky sidebar variants: one layout, four identity treatments.
const SIDEBAR_HEADERS: Record<string, ComponentType> = {
	G: PlainHeader,
	J: MetaHeader,
	K: ProseHeader,
	L: EditorialHeader,
	O: AboutFirstHeader,
};

// The sections the shells below render, in order, and the rail built from them.
// Keep this in step with the `everything` fragment below: they are two lists of the
// same thing, and railFor only guarantees the labels, not that both were updated.
const EVERYTHING_IDS = ['github', 'stack', 'projects', 'work', 'background', 'contact'] as const;
const EVERYTHING_RAIL = railFor(EVERYTHING_IDS);

// Columns for the paco flavoured shell, built from the same data as everything else.
const columns = [
	{
		label: 'Working',
		rows: experiences.slice(0, 3).map((job) => ({
			name: job.company,
			note: `${job.role}. ${job.period}.`,
		})),
	},
	{
		label: 'Built',
		rows: projects.slice(0, 3).map((project) => ({
			name: project.name,
			note: project.blurb.split('.')[0] + '.',
		})),
	},
	{
		label: 'Elsewhere',
		rows: [
			{ name: 'GitHub', note: 'Most of the public code.', href: profile.github },
			{ name: 'Medium', note: 'Notes on Laravel and architecture.', href: profile.medium },
			{ name: 'LinkedIn', note: 'The formal version.', href: profile.linkedin },
		],
	},
];

export default function PrototypeHeroes({
	variant,
	onPick,
	parts,
	ring,
	onRingChange,
	showSwitcher = true,
}: {
	variant: VariantKey;
	onPick: (variant: VariantKey) => void;
	parts: PageParts;
	ring: boolean;
	onRingChange: (on: boolean) => void;
	/** Off when a variant is what ships, on when the URL or a dev build asks to browse. */
	showSwitcher?: boolean;
}) {
	const switcher = showSwitcher ? (
		<PrototypeSwitcher
			variants={[...VARIANT_KEYS]}
			current={variant}
			onChange={(next) => onPick(next as VariantKey)}
			names={variantNames}
			ring={ring}
			onRingChange={onRingChange}
		/>
	) : null;

	const everything = (
		<>
			{parts.graph}
			{parts.stack}
			{parts.projects}
			{parts.experience}
			{parts.background}
			{parts.contact}
			{parts.footer}
		</>
	);

	// N owns the record itself, so the normal Experience section is dropped and
	// the work comes before the stack.
	if (variant === 'N') {
		return (
			<>
				<DatasheetShell>
					{parts.projects}
					{parts.stack}
					{parts.graph}
					{parts.contact}
					{parts.footer}
				</DatasheetShell>
				{switcher}
			</>
		);
	}

	// P is what ships, so it renders the real layout rather than a copy of it.
	if (variant === 'P') {
		return (
			<>
				<PageLayout>
					{parts.about}
					{parts.stack}
					{parts.experience}
					{parts.projects}
					{parts.graph}
					{parts.components}
					{parts.background}
					{parts.contact}
					{parts.footer}
				</PageLayout>
				{switcher}
			</>
		);
	}

	const SidebarHeader = SIDEBAR_HEADERS[variant];
	if (SidebarHeader) {
		return (
			<>
				<SidebarShell header={SidebarHeader} rail={EVERYTHING_RAIL}>
					{everything}
				</SidebarShell>
				{switcher}
			</>
		);
	}

	if (variant === 'H') {
		return (
			<>
				<ColumnsShell columns={columns}>{everything}</ColumnsShell>
				{switcher}
			</>
		);
	}

	const HeroVariant = HEROES[variant] ?? Hero;
	return (
		<>
			<div className="mx-auto w-full max-w-3xl px-6 lg:px-0">
				<HeroVariant />
				{everything}
			</div>
			{switcher}
		</>
	);
}

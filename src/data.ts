// Everything editable lives here. Sections read from this file only.

export const profile = {
	name: 'Maali Mohamed Islam',
	shortName: 'Maali Mohamed Islam',
	role: 'Fullstack engineer',
	// One sentence, and short enough to hold one line in the content column.
	tagline: 'I take over complicated systems and make them boring again.',
	location: 'Algiers, Algeria',
	availability: 'Remote',
	avatar: '/me.webp',
	email: 'isslem_maali@yahoo.fr',
	phone: '+213 675 40 09 53',
	github: 'https://github.com/oOMrCookieOo',
	linkedin: 'https://www.linkedin.com/in/maali-mouhamed-isslem-6023391a2',
	medium: 'https://medium.com/@isslemcookie',
} as const;

export const about = [
	'Fullstack engineer with six years shipping across recruitment, fuel retail, fintech and local marketplaces, from admin platforms and payment integrations to products the public actually uses. I own the arc from architecture to release: data models, APIs, third party integrations, and the deploys that carry them.',
];

// icon values are keys of the ICONS map in components/Stack.tsx.
export type StackGroup = {
	label: string;
	items: { name: string; icon: string }[];
};

export const stack: StackGroup[] = [
	{
		label: 'Backend',
		items: [
			{ name: 'Laravel', icon: 'laravel' },
			{ name: 'PHP', icon: 'php' },
			{ name: 'NestJS', icon: 'nestjs' },
			{ name: 'Fastify', icon: 'fastify' },
			{ name: 'Node.js', icon: 'node' },
			{ name: 'Livewire', icon: 'livewire' },
			{ name: 'Filament', icon: 'filament' },
		],
	},
	{
		label: 'Frontend',
		items: [
			{ name: 'TypeScript', icon: 'typescript' },
			{ name: 'JavaScript', icon: 'javascript' },
			{ name: 'React', icon: 'react' },
			{ name: 'shadcn/ui', icon: 'shadcn' },
			{ name: 'Next.js', icon: 'nextjs' },
			{ name: 'Vue.js', icon: 'vue' },
			{ name: 'Inertia', icon: 'inertia' },
			{ name: 'Tailwind CSS', icon: 'tailwind' },
			{ name: 'Alpine.js', icon: 'alpine' },
		],
	},
	{
		label: 'Data, cloud and tooling',
		items: [
			{ name: 'PostgreSQL', icon: 'postgres' },
			{ name: 'MySQL', icon: 'mysql' },
			{ name: 'DynamoDB', icon: 'dynamodb' },
			{ name: 'AWS Lambda', icon: 'lambda' },
			{ name: 'Docker', icon: 'docker' },
			{ name: 'GitHub Actions', icon: 'githubactions' },
			{ name: 'Git', icon: 'git' },
			{ name: 'GitHub', icon: 'github' },
			{ name: 'Nginx', icon: 'nginx' },
			{ name: 'Postman', icon: 'postman' },
			{ name: 'Figma', icon: 'figma' },
			{ name: 'Cursor', icon: 'cursor' },
		],
	},
];

export type Experience = {
	company: string;
	role: string;
	period: string;
	place: string;
	bullets: string[];
	tags: string[];
	/** The company site, linked from its name. */
	href?: string;
	/** Screenshot floated when the name is hovered, e.g. '/previews/inex.webp'. */
	preview?: string;
};

export const experiences: Experience[] = [
	{
		company: 'Inex',
		href: 'https://inex.ca',
		preview: '/previews/inex.webp',
		role: 'Fullstack engineer',
		place: 'Quebec, Canada. Remote.',
		period: 'Aug 2025 to now',
		bullets: [
			'Rebuilding the client facing app end to end. I designed the flows and the screens myself, then built them.',
			'Moving it off the legacy stack onto Next.js and TypeScript, screen by screen, with a component library the whole app shares instead of one off markup.',
			'Replaced the admin panel and the architecture under it, taking ownership of the core codebase as the rewrite went.',
			'Moved the backend onto Fastify and AWS serverless services, and own the architecture decisions that come with it.',
			'The rewrite ships alongside the running product, so every migration lands without a maintenance window.',
		],
		tags: ['Next.js', 'TypeScript', 'Fastify', 'AWS Lambda', 'DynamoDB'],
	},
	{
		company: 'Foxcode',
		href: 'https://foxcod.com',
		preview: '/previews/foxcode.webp',
		role: 'Fullstack engineer and web team lead',
		place: 'Muscat, Oman. Remote.',
		period: 'Mar 2023 to Aug 2025',
		bullets: [
			'Worked across the client portfolio: OOMCO, Raaz, Rise, Intajee, Tamluk and Shabik.',
			'The clients were national names, Oman Oil Marketing Company, Omantel and Omran Group, so the work carried the release standards that come with them.',
			'Integrated the Thawani payment API and put secure online payments into several of those products.',
			'Built the backends and the admin panels the mobile apps ran on, and the APIs between them.',
			'Led the web team through the rebranding of a beauty centre reservations app, splitting the work across the team and reviewing it through to release.',
			'Built the Foxcode site from scratch and owned it after launch, tuning the SEO and the page performance: metadata and semantic structure, image and font loading, Core Web Vitals.',
			'Moved backend services onto NestJS and applied Clean Architecture to separate the concerns the old structure had blurred.',
		],
		tags: ['Laravel', 'Next.js', 'NestJS', 'Tailwind CSS'],
	},
	{
		company: 'Candidli',
		role: 'Fullstack engineer',
		place: 'Algiers, Algeria. Onsite and remote.',
		period: 'Aug 2022 to Mar 2023',
		bullets: [
			'Built core parts of the leading recruitment platform in Algeria, from candidate flows to the hiring workflows.',
			'Built the admin and business workflows in Filament and Livewire, the operational core the platform runs on.',
			'Wired in third party AI services for CV parsing, document scanning and the automation those workflows needed.',
			'That was my first production work with OpenAI, in 2022, pulling structured data out of CVs and scanned documents before the tooling around language models existed.',
		],
		tags: ['Laravel', 'Vue.js', 'Livewire', 'OpenAI', 'MySQL'],
	},
	{
		company: 'Freelance',
		role: 'Fullstack developer',
		place: 'Algiers, Algeria. Onsite.',
		period: '2020 to 2022',
		bullets: [
			'Shipped deals marketplaces, booking platforms and health apps for local merchants and product studios: Offerlik, OneDz, AlignerSteps, Calowries, OxyVac and Atlas GO.',
			'Handled every layer on most of them, from the database and APIs through to deployment.',
			'OxyVac went out during the pandemic, coordinating COVID-19 vaccination booking and oxygen support while both were still being handled locally.',
		],
		tags: ['Laravel', 'Vue.js', 'MySQL'],
	},
];

export type Project = {
	name: string;
	blurb: string;
	tags: string[];
	/** Live site, when there still is one. */
	href?: string;
	/** Screenshot shown in the hover preview, e.g. '/previews/raaz.webp'. */
	preview?: string;
	/** What you actually did on it. Shown in the open row. */
	role?: string;
};

export const projects: Project[] = [
	{
		name: 'Inex',
		role: 'Flows, screens and the services under them',
		blurb:
			'Shipping platform for Canadian businesses: one lane and parcel form, live quotes pulled from every connected carrier, then booking and tracking in the same flow. I am rebuilding the client facing portal end to end, and I designed the flows and the screens before building them.',
		tags: ['Next.js', 'TypeScript', 'Fastify', 'AWS Lambda', 'DynamoDB'],
		preview: '/previews/inex-portal.webp',
	},
	{
		name: 'Foxcode',
		href: 'https://foxcod.com/',
		role: 'Built the site from scratch',
		blurb:
			'Site for the Muscat product studio I worked at, covering the service lines and the client work behind them. I built it from scratch, from the pages and the content model through to the deploy.',
		tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
		preview: '/previews/foxcode.webp',
	},
	{
		name: 'OOMCO',
		role: 'Backend, admin panel and APIs',
		blurb:
			'Fuel and retail platform for Oman Oil Marketing Company, covering an e-wallet, loyalty, NFC payments at the pump and station services. At Foxcode I built the backend, the admin panel and the APIs the mobile app runs on.',
		tags: ['Laravel', 'NestJS', 'MySQL'],
		preview: '/previews/oomco.webp',
	},
	{
		name: 'Raaz',
		role: 'Backend, admin panel and APIs',
		blurb:
			'Personal finance app covering bank aggregation, transaction categorisation and spending insights. My side of it was the backend services, the admin panel and the APIs the app consumes.',
		tags: ['Laravel', 'NestJS', 'PostgreSQL'],
		preview: '/previews/raaz.webp',
	},
	{
		name: 'Intajee',
		href: 'https://intajee.om/',
		role: 'Full stack, database to deploy',
		blurb:
			'In country value platform for Omran Group, connecting Omani suppliers and SMEs to the hotels and resorts that buy from them. At Foxcode I built the supplier onboarding, the catalogue and the procurement side the group runs on.',
		tags: ['Laravel', 'Next.js', 'MySQL'],
		preview: '/previews/intajee.webp',
	},
	{
		name: 'Shabik',
		href: 'https://shabik.com/',
		role: 'Full stack, database to deploy',
		blurb:
			'Booking platform for tour guides, event organisers and experience providers, selling trips, events and tickets from one dashboard. At Foxcode I built the branded booking pages, the online payments and the APIs behind them.',
		tags: ['NestJS', 'Next.js', 'PostgreSQL'],
		preview: '/previews/shabik.webp',
	},
	{
		name: 'Rise',
		role: 'Full stack, database to deploy',
		blurb:
			'OKR platform for Omantel, where teams set objectives and track alignment and achievement across departments. At Foxcode I built it end to end, from the data model to the dashboards leadership reads.',
		tags: ['NestJS', 'Next.js', 'PostgreSQL'],
		preview: '/previews/rise.webp',
	},
	{
		name: 'Tamluk',
		href: 'https://tamluk.om/en',
		role: 'Full stack, database to deploy',
		blurb:
			'Real estate crowdfunding platform in Oman, licensed by the Financial Services Authority and Sharia compliant. At Foxcode I built the investor and developer sides: onboarding, the project listings, the share subscriptions and the returns each portfolio tracks.',
		tags: ['Next.js', 'NestJS', 'PostgreSQL', 'Docker'],
		preview: '/previews/tamluk.webp',
	},
	{
		name: 'Offerlik',
		href: 'https://offerlik.com/customer-landing',
		role: 'Full stack, database to deploy',
		blurb:
			'Local deals marketplace connecting shoppers with nearby merchants. Merchants publish curated daily promotions, from plain discounts to buy-one-get-one offers.',
		tags: ['Laravel', 'MySQL'],
		preview: '/previews/offerlik.webp',
	},
	{
		name: 'AlignerSteps',
		href: 'https://alignersteps.com/en',
		role: 'Full stack, database to deploy',
		blurb:
			'Clear aligner platform for a German provider, tracking teeth alignment stage by stage. Patients log wear time and progress selfies, and the dentist portal follows each case through treatment.',
		tags: ['Laravel', 'Vue.js'],
		preview: '/previews/alignersteps.webp',
	},
	{
		name: 'Calowries',
		href: 'https://calowries.com/',
		role: 'Full stack, database to deploy',
		blurb:
			'Nutrition platform built around a body assessment that turns into a personalised meal plan. Certified nutritionists write and adjust the plans, and subscribers track macros and weekly progress against their goals.',
		tags: ['Laravel', 'Vue.js'],
		preview: '/previews/calowries.webp',
	},
];

export const education = {
	school: 'University of Abdelhamid Mehri, Constantine 2',
	degree: 'Master of Computer Science, Networks and Distributed Systems',
	period: '2016 to 2022',
	place: 'Constantine, Algeria',
};

export const practices = [
	'Domain Driven Design',
	'Clean Architecture',
	'Serverless architecture on AWS',
	'Infrastructure as code',
	'CI and CD pipelines',
	'Docker based deployments',
	'Agile and Scrum',
	'REST APIs',
	'Third party API integrations',
];

// Cycled by the hero role rotator. Keep each line under about 30 characters,
// the widest one reserves the row width so it never reflows.
export const roles = [
	'Fullstack engineer',
	'Laravel and NestJS backends',
	'Admin panels and payment flows',
	'APIs the mobile apps run on',
	'Rewrites without the downtime',
	'Serverless on AWS Lambda',
];

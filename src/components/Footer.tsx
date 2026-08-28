import { profile } from '@/data';

export function Footer() {
	return (
		<footer className="mt-24 flex flex-wrap items-center justify-between gap-3 border-t border-card-border py-8 font-mono text-[11px] text-faint">
			<span>
				{profile.name}. {new Date().getFullYear()}.
			</span>
			<a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="hover:text-foreground">
				{profile.phone}
			</a>
		</footer>
	);
}

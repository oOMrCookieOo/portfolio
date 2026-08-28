import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

// shadcn/ui button, retuned to this project: 12px radius, palette primary, 1px push on :active.
const buttonVariants = cva(
	"inline-flex shrink-0 items-center justify-center gap-2 rounded-card text-sm font-medium whitespace-nowrap transition-[color,background-color,border-color,transform] duration-200 outline-none active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
				outline: 'border border-input bg-card hover:bg-muted',
				ghost: 'hover:bg-muted',
			},
			size: {
				default: 'h-10 px-4',
				sm: 'h-9 px-3',
				icon: 'size-10',
			},
		},
		defaultVariants: { variant: 'primary', size: 'default' },
	},
);

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
	return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

type ButtonLinkProps = ComponentProps<'a'> & VariantProps<typeof buttonVariants>;

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
	return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };

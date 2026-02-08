import { type HTMLMotionProps, motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { forwardRef } from 'react';

interface CardProps extends HTMLMotionProps<"div"> {
    variant?: 'default' | 'highlighted' | 'pricing';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
    className,
    children,
    variant = 'default',
    ...props
}, ref) => {
    return (
        <motion.div
            ref={ref}
            className={cn(
                "relative overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md",
                variant === 'default' && "border-border",
                variant === 'highlighted' && "border-brand-primary ring-2 ring-brand-primary/20",
                variant === 'pricing' && "border-border flex flex-col",
                className
            )}
            {...props}
        >
            {children as React.ReactNode}
        </motion.div>
    );
});

Card.displayName = "Card";

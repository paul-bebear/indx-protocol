import { type HTMLMotionProps, motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { forwardRef } from 'react';

interface CardProps extends HTMLMotionProps<"div"> {
    gradient?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, children, gradient = false, ...props }, ref) => {
    return (
        <motion.div
            ref={ref}
            className={cn(
                "relative overflow-hidden rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm shadow-xl",
                gradient && "before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-brand-cyan/5 before:to-transparent",
                className
            )}
            {...props}
        >
            {children as React.ReactNode}

            {/* Inner Highlight Border */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none" />
        </motion.div>
    );
});

Card.displayName = "Card";

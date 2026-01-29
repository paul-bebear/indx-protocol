import { useState, useEffect } from 'react';

interface UseScrollPastHeroOptions {
    heroId?: string;
    threshold?: number;
}

/**
 * Custom hook to detect when user has scrolled past the hero section.
 * Uses IntersectionObserver for efficient scroll detection.
 * 
 * @param options - Configuration options
 * @param options.heroId - ID of the hero element to observe (default: "hero")
 * @param options.threshold - Intersection threshold (default: 0.1)
 * @returns Boolean indicating if user has scrolled past the hero
 */
export function useScrollPastHero({
    heroId = 'hero',
    threshold = 0.1
}: UseScrollPastHeroOptions = {}): boolean {
    const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);

    useEffect(() => {
        const heroElement = document.getElementById(heroId);

        // If no hero element exists, default to showing CTA
        if (!heroElement) {
            setHasScrolledPastHero(true);
            return;
        }

        // Use IntersectionObserver for efficient scroll detection
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // When hero is not intersecting (out of view), show CTA
                    // When hero is intersecting (in view), hide CTA
                    setHasScrolledPastHero(!entry.isIntersecting);
                });
            },
            {
                threshold,
                rootMargin: '0px',
            }
        );

        observer.observe(heroElement);

        // Cleanup observer on unmount
        return () => {
            observer.disconnect();
        };
    }, [heroId, threshold]);

    return hasScrolledPastHero;
}

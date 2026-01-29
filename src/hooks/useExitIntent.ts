import { useState, useEffect, useCallback, useRef } from 'react';

interface UseExitIntentOptions {
    isEnabled: boolean;
    inactivityTimeout?: number; // in milliseconds
}

export function useExitIntent({
    isEnabled,
    inactivityTimeout = 60000 // 60 seconds default
}: UseExitIntentOptions) {
    const [showModal, setShowModal] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const inactivityTimerRef = useRef<number | null>(null);
    const lastActivityRef = useRef<number>(Date.now());

    // Reset activity timer
    const resetActivityTimer = useCallback(() => {
        lastActivityRef.current = Date.now();
    }, []);

    // Handle mouse leaving viewport
    const handleMouseLeave = useCallback((e: MouseEvent) => {
        // Trigger if cursor leaves from the top (exit intent)
        // Increased sensitivity to 10px from 0
        if (e.clientY <= 10 && isEnabled && !hasTriggered) {
            setShowModal(true);
            setHasTriggered(true);
        }
    }, [isEnabled, hasTriggered]);

    // Close modal
    const closeModal = useCallback(() => {
        setShowModal(false);
    }, []);

    // Reset triggers (e.g., when scan result changes)
    const resetTriggers = useCallback(() => {
        setHasTriggered(false);
        setShowModal(false);
        lastActivityRef.current = Date.now();
    }, []);

    // Setup viewport exit listener
    useEffect(() => {
        if (!isEnabled) return;

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isEnabled, handleMouseLeave]);

    // Setup inactivity timer
    useEffect(() => {
        if (!isEnabled || hasTriggered) return;

        // Activity events to track
        const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];

        const handleActivity = () => {
            resetActivityTimer();
        };

        // Add activity listeners
        activityEvents.forEach(event => {
            document.addEventListener(event, handleActivity);
        });

        // Check for inactivity periodically
        inactivityTimerRef.current = window.setInterval(() => {
            const timeSinceLastActivity = Date.now() - lastActivityRef.current;
            if (timeSinceLastActivity >= inactivityTimeout && !hasTriggered) {
                setShowModal(true);
                setHasTriggered(true);
            }
        }, 1000);

        return () => {
            activityEvents.forEach(event => {
                document.removeEventListener(event, handleActivity);
            });
            if (inactivityTimerRef.current) {
                clearInterval(inactivityTimerRef.current);
            }
        };
    }, [isEnabled, hasTriggered, inactivityTimeout, resetActivityTimer]);

    return {
        showModal,
        closeModal,
        resetTriggers,
    };
}

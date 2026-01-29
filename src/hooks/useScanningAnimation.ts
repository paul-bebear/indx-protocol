import { useState, useEffect, useRef } from 'react';

export function useScanningAnimation(
    status: 'idle' | 'initiating' | 'scanning' | 'complete' | 'verified',
    steps: string[],
    logs: string[],
    onComplete: () => void,
    duration: number = 60000 // 60 seconds default
) {
    const [stepIndex, setStepIndex] = useState(0);
    const [visibleLogCount, setVisibleLogCount] = useState(0);

    // Store onComplete in a ref to avoid triggering effect re-runs
    const onCompleteRef = useRef(onComplete);
    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        let isMounted = true;
        let stepInterval: number | undefined;
        let logInterval: number | undefined;

        if (status === 'scanning') {
            // Reset for new scan
            setStepIndex(0);
            setVisibleLogCount(0);

            // Calculate intervals based on duration
            // Divide duration by number of steps
            const stepDuration = duration / steps.length;
            // Divide duration by number of logs (approximate, make it slightly faster to ensure all logs show)
            const logDuration = duration / (logs.length + 5);

            // Step Interval
            stepInterval = window.setInterval(() => {
                setStepIndex(prev => {
                    if (prev >= steps.length - 1) {
                        return prev; // Stay on last step until timeout
                    }
                    return prev + 1;
                });
            }, stepDuration);

            // Logs Interval
            logInterval = window.setInterval(() => {
                if (isMounted) {
                    setVisibleLogCount(prev => (prev < logs.length ? prev + 1 : prev));
                }
            }, logDuration);

            // Master timeout
            setTimeout(() => {
                if (isMounted) {
                    onCompleteRef.current();
                }
            }, duration);
        }

        return () => {
            isMounted = false;
            if (stepInterval) clearInterval(stepInterval);
            if (logInterval) clearInterval(logInterval);
        };
    }, [status, steps.length, logs.length, duration]);

    return { stepIndex, visibleLogCount };
}

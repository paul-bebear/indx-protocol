import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface AuditTimerBubbleProps {
    isVisible: boolean;
    duration: number; // in milliseconds
}

export function AuditTimerBubble({ isVisible, duration }: AuditTimerBubbleProps) {
    const [timeLeft, setTimeLeft] = useState(duration / 1000);

    useEffect(() => {
        if (!isVisible) {
            setTimeLeft(duration / 1000);
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) return 0;
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isVisible, duration]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex items-center gap-4"
                >
                    <div className="bg-black/80 backdrop-blur-md border border-brand-cyan/30 rounded-full px-5 py-3 shadow-[0_0_20px_rgba(0,229,229,0.2)] flex items-center gap-3">
                        <div className="relative w-5 h-5 flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <Loader2 className="w-5 h-5 text-brand-cyan" />
                            </motion.div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-wider">
                                System Value Analysis
                            </span>
                            <span className="text-sm font-mono text-white font-bold">
                                {Math.ceil(timeLeft)}s remaining
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

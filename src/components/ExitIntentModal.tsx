import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, Calendar, AlertCircle } from 'lucide-react';

interface ExitIntentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSecureNode: () => void;
}

export function ExitIntentModal({ isOpen, onClose, onSecureNode }: ExitIntentModalProps) {
    const handleSecureNode = () => {
        onSecureNode();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                    >
                        <div className="relative w-full max-w-md bg-white rounded-2xl p-8 shadow-2xl border border-border">
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-text-muted hover:text-text transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Header */}
                            <div className="text-center mb-6">
                                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-brand-accent/10 flex items-center justify-center">
                                    <Clock className="w-7 h-7 text-brand-accent" />
                                </div>
                                <h2 className="text-xl font-bold text-text mb-2">
                                    Don't Miss Out on AI Customers
                                </h2>
                                <p className="text-text-muted text-sm">
                                    Your audit is ready. See what you're missing.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-background-muted rounded-xl">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-brand-accent">$3,000</p>
                                    <p className="text-xs text-text-muted">Avg. monthly loss</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-brand-accent">5 Days</p>
                                    <p className="text-xs text-text-muted">To fix everything</p>
                                </div>
                            </div>

                            {/* Warning */}
                            <div className="flex items-start gap-3 p-4 bg-warning/10 rounded-lg mb-6">
                                <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                                <p className="text-sm text-text">
                                    Every day you wait, more customers ask AI for restaurant recommendations—and find your competitors instead.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleSecureNode}
                                    className="w-full h-12 rounded-lg bg-brand-accent text-white font-semibold hover:bg-brand-accent-hover transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Calendar className="w-4 h-4" />
                                    Schedule Your Free Call
                                </button>

                                <button
                                    onClick={onClose}
                                    className="w-full text-center text-text-muted text-sm hover:text-text transition-colors"
                                >
                                    I'll check back later
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

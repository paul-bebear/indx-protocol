import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { Card } from './Card';
import { cn } from '../lib/utils';

interface LeadCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialUrl: string;
}

export function LeadCaptureModal({ isOpen, onClose, initialUrl }: LeadCaptureModalProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        url: initialUrl,
        email: '',
        concern: 'Discovery'
    });

    // Reset state when modal closes
    // Reset state logic
    useEffect(() => {
        if (isOpen) {
            // Reset immediately on open and sync URL
            setIsSubmitted(false);
            setIsLoading(false);
            setFormData(prev => ({ ...prev, url: initialUrl }));
        } else {
            // Optional: delayed reset on close (cleanup) if needed, 
            // but immediate reset on open handles the "re-open quickly" case better.
            const timer = setTimeout(() => {
                setIsSubmitted(false);
                setIsLoading(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, initialUrl]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="pointer-events-auto w-full max-w-md"
                        >
                            <Card className={cn("p-6 border-brand-cyan/20 shadow-[0_0_50px_rgba(0,255,255,0.15)]", isSubmitted ? "border-emerald-500/30" : "")}>

                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className={cn("text-lg font-bold tracking-tight uppercase", isSubmitted ? "text-emerald-400" : "text-white")}>
                                        {isSubmitted ? "Audit Request Received" : "Request Deep Trace Audit"}
                                    </h3>
                                    <button
                                        onClick={onClose}
                                        className="p-1 rounded-md text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                {/* Content */}
                                <AnimatePresence mode="wait">
                                    {isSubmitted ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex flex-col items-center text-center py-6 gap-4"
                                        >
                                            <div className="w-full bg-black/80 border border-emerald-500/20 p-4 rounded-md font-mono text-xs text-left">
                                                <p className="text-emerald-500 mb-2">{'>'} INITIATING_HANDSHAKE_PROTOCOL...</p>
                                                <p className="text-emerald-500 mb-2">{'>'} TARGET: {formData.url}</p>
                                                <p className="text-emerald-500 mb-2">{'>'} CONTACT: {formData.email}</p>
                                                <p className="text-white mt-4 animate-pulse">
                                                    HANDSHAKE INITIATED. Our engineering team has been notified.
                                                </p>
                                            </div>

                                            <button
                                                onClick={onClose}
                                                className="mt-4 px-6 py-2 bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-900/50 transition-colors text-sm font-medium uppercase tracking-wider"
                                            >
                                                [ Close Terminal ]
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            onSubmit={handleSubmit}
                                            className="flex flex-col gap-4"
                                        >
                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400 uppercase tracking-wider font-mono">Target URL</label>
                                                <input
                                                    type="text"
                                                    value={formData.url}
                                                    onChange={e => setFormData({ ...formData, url: e.target.value })}
                                                    className="w-full h-10 bg-black/40 border border-white/10 rounded px-3 text-white focus:border-brand-cyan/50 focus:outline-none transition-colors"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400 uppercase tracking-wider font-mono">Work Email</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="engineer@company.com"
                                                    className="w-full h-10 bg-black/40 border border-white/10 rounded px-3 text-white focus:border-brand-cyan/50 focus:outline-none transition-colors"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400 uppercase tracking-wider font-mono">Primary Concern</label>
                                                <div className="relative">
                                                    <select
                                                        value={formData.concern}
                                                        onChange={e => setFormData({ ...formData, concern: e.target.value })}
                                                        className="w-full h-10 bg-black/40 border border-white/10 rounded px-3 text-white focus:border-brand-cyan/50 focus:outline-none appearance-none transition-colors"
                                                    >
                                                        <option value="Discovery">Agent Discovery & Indexing</option>
                                                        <option value="Checkout">Autonomous Checkout Friction</option>
                                                        <option value="Accuracy">Hallucination / Data Accuracy</option>
                                                    </select>
                                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                        <ArrowRight size={14} className="rotate-90" />
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="mt-2 h-12 w-full bg-brand-cyan hover:bg-brand-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold uppercase tracking-wide rounded transition-all shadow-[0_0_15px_rgba(0,255,255,0.3)] hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] flex items-center justify-center gap-2"
                                            >
                                                {isLoading ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                        <span>Initiating Handshake...</span>
                                                    </>
                                                ) : (
                                                    <span>[ Schedule Audit Handshake ]</span>
                                                )}
                                            </button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>

                            </Card>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

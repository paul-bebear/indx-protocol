import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

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
                        className="fixed inset-0 z-[100] bg-black/85"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                    >
                        <motion.div
                            className="relative w-full max-w-lg bg-[#0A0A0A] border-2 border-[#FF4500] rounded-xl p-8 shadow-[0_0_60px_rgba(255,69,0,0.3)]"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 1, 0.7, 1, 0.9, 1],
                            }}
                            transition={{
                                duration: 0.4,
                                times: [0, 0.2, 0.3, 0.5, 0.7, 1],
                            }}
                        >
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Glitch overlay effect */}
                            <motion.div
                                className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 0.3, 0, 0.2, 0] }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FF4500]/20 via-transparent to-[#FF4500]/20 animate-pulse" />
                            </motion.div>

                            {/* Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <motion.div
                                    animate={{
                                        opacity: [1, 0.5, 1],
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="w-10 h-10 rounded-full bg-[#FF4500]/20 border border-[#FF4500]/40 flex items-center justify-center"
                                >
                                    <AlertTriangle className="w-5 h-5 text-[#FF4500]" />
                                </motion.div>
                                <div className="flex-1">
                                    <p className="text-[#FF4500] font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 rounded-full bg-[#FF4500] animate-pulse" />
                                        Security Alert
                                    </p>
                                    <h2 className="text-white font-bold text-lg font-mono tracking-wide">
                                        HANDSHAKE INCOMPLETE
                                    </h2>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="space-y-4 mb-8">
                                <p className="text-gray-200 leading-relaxed">
                                    Your domain is currently broadcasting a <span className="text-[#FF4500] font-medium">legacy signal</span>.
                                    Unverified sites are vulnerable to <span className="text-[#FF4500]">Agent-Spoofing</span> and discovery blacklisting.
                                </p>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Do not leave your node in an <span className="text-[#FF4500]">'Unsecured'</span> state.
                                    Finalize your 3rd-party verification to lock in your identity on the Global Ledger.
                                </p>
                            </div>

                            {/* Warning Stats */}
                            <div className="grid grid-cols-2 gap-3 mb-8 p-4 rounded-lg bg-black/60 border border-[#FF4500]/20">
                                <div className="text-center">
                                    <p className="text-[#FF4500] font-mono text-xl font-bold">EXPOSED</p>
                                    <p className="text-gray-500 text-xs font-mono uppercase">Current Status</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[#FF4500] font-mono text-xl font-bold">HIGH</p>
                                    <p className="text-gray-500 text-xs font-mono uppercase">Spoof Risk</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-4">
                                {/* Primary Button */}
                                <button
                                    onClick={handleSecureNode}
                                    className="w-full h-14 rounded-lg bg-[#FF4500] text-white font-bold font-mono tracking-wider text-base hover:bg-orange-600 transition-all shadow-[0_0_30px_rgba(255,69,0,0.4)] hover:shadow-[0_0_50px_rgba(255,69,0,0.6)] active:scale-[0.98] cursor-pointer"
                                >
                                    [ SECURE MY NODE NOW ]
                                </button>

                                {/* Secondary Link */}
                                <button
                                    onClick={onClose}
                                    className="w-full text-center text-gray-500 text-sm hover:text-gray-300 transition-colors cursor-pointer"
                                >
                                    I understand the risk, continue to exit →
                                </button>
                            </div>

                            {/* Scanlines effect */}
                            <motion.div
                                className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.03 }}
                            >
                                <div
                                    className="w-full h-full"
                                    style={{
                                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

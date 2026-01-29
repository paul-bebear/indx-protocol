import { motion } from 'framer-motion';
import { Search, Database, Lock, CheckCircle, ArrowRight } from 'lucide-react';

export function DiscoveryFlow() {
    const steps = [
        { icon: Search, label: 'Agent Query', desc: 'AI Requisition' },
        { icon: Database, label: 'INDX Discovery', desc: 'Protocol Match' },
        { icon: Lock, label: 'UCP Handshake', desc: 'Auth & Verify' },
        { icon: CheckCircle, label: 'Transaction', desc: 'Settlement' },
    ];

    return (
        <div className="w-full py-8 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[600px] px-4">
                {steps.map((step, i) => (
                    <div key={i} className="flex items-center">
                        {/* Step Node */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.3, duration: 0.6, ease: "easeOut" }}
                            className="flex flex-col items-center gap-3 relative group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shadow-[0_0_15px_rgba(0,255,255,0.1)] group-hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-all">
                                <step.icon size={20} />
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-bold text-white uppercase tracking-wider">{step.label}</p>
                                <p className="text-[10px] text-gray-500 font-mono mt-1">{step.desc}</p>
                            </div>
                        </motion.div>

                        {/* Connector */}
                        {i < steps.length - 1 && (
                            <motion.div
                                initial={{ opacity: 0, scaleX: 0 }}
                                whileInView={{ opacity: 1, scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: (i * 0.3) + 0.2, duration: 0.6, ease: "easeOut" }}
                                className="flex-1 px-4 flex items-center justify-center text-gray-600"
                            >
                                <ArrowRight size={16} />
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Shield } from 'lucide-react';

interface FinalCTAProps {
    onCTAClick?: () => void;
}

export function FinalCTA({ onCTAClick }: FinalCTAProps) {
    return (
        <section className="py-24 md:py-32 px-6 bg-gradient-to-b from-background to-brand-primary/5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center"
            >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-brand-accent/10 flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-brand-accent" />
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-text">
                    Don't Let ChatGPT Send{' '}
                    <span className="text-brand-accent">Customers</span>{' '}
                    to Your Competitors
                </h2>

                <p className="text-lg text-text-muted mb-10 max-w-xl mx-auto">
                    Get your free AI visibility check and see exactly how much revenue 
                    you're missing. Takes under 5 minutes.
                </p>

                <motion.button
                    onClick={() => onCTAClick?.()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group px-10 py-4 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg font-semibold text-lg inline-flex items-center gap-3 shadow-lg hover:shadow-xl transition-all"
                >
                    Get My Free Check
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-text-muted">
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-brand-primary" />
                        <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-primary" />
                        <span>Takes under 5 minutes</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

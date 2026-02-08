import { motion } from 'framer-motion';
import { PageWrapper } from '../components/PageWrapper';
import { ComparisonSection } from '../components/ComparisonSection';
import { FinalCTA } from '../components/FinalCTA';
import { useState } from 'react';
import { LeadCaptureModal } from '../components/LeadCaptureModal';

export function Comparison() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <PageWrapper className="flex flex-col items-center relative w-full pt-24">
            <section className="section-padding bg-white w-full">
                <div className="container-max">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text">
                            Why Choose Indexable?
                        </h1>
                        <p className="text-lg text-text-muted max-w-2xl mx-auto">
                            See how we compare to content generation tools and DIY approaches.
                        </p>
                    </motion.div>
                </div>
            </section>

            <ComparisonSection />

            <FinalCTA onCTAClick={() => setIsModalOpen(true)} />

            <LeadCaptureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialUrl=""
            />
        </PageWrapper>
    );
}

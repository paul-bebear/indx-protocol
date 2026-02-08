import { motion } from 'framer-motion';
import { PageWrapper } from '../components/PageWrapper';
import { Check, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { LeadCaptureModal } from '../components/LeadCaptureModal';

export function Results() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <PageWrapper className="flex flex-col items-center relative w-full pt-20">
            {/* Hero */}
            <section className="section-padding bg-gradient-to-b from-white to-gray-50 w-full">
                <div className="container-max">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-text">
                            Real Results from Real Businesses
                        </h1>
                        <p className="text-lg text-text-muted max-w-2xl mx-auto">
                            See what AI assistants see before and after optimization
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Before/After Comparison */}
            <section className="section-padding bg-white w-full">
                <div className="container-max">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Before */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -top-3 left-4 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-xs font-medium text-red-600 flex items-center gap-1.5 z-10">
                                <X size={12} />
                                Before Indexable
                            </div>
                            <div className="p-6 rounded-2xl border border-red-200 bg-red-50/50">
                                <div className="flex items-center gap-2 mb-4 text-text-muted">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                    <span className="ml-2 text-xs font-mono">what-ai-sees.json</span>
                                </div>
                                <pre className="font-mono text-sm text-text-muted overflow-x-auto">
                                    {`{
  "business": null,
  "name": "[Unable to parse]",
  "address": null,
  "hours": "[Error: PDF not readable]",
  "menu": "[Error: Image-based]",
  "reviews": null,
  "booking": "[No structured data]"
}`}
                                </pre>
                                <div className="mt-4 p-3 bg-red-100 rounded-lg border border-red-200">
                                    <p className="text-sm text-red-700 font-medium">
                                        ❌ AI Response: "I couldn't find information about this business."
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* After */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="relative"
                        >
                            <div className="absolute -top-3 left-4 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-600 flex items-center gap-1.5 z-10">
                                <Check size={12} />
                                After Indexable
                            </div>
                            <div className="p-6 rounded-2xl border border-green-200 bg-green-50/50">
                                <div className="flex items-center gap-2 mb-4 text-text-muted">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                    <span className="ml-2 text-xs font-mono">what-ai-sees.json</span>
                                </div>
                                <pre className="font-mono text-sm text-green-700 overflow-x-auto">
                                    {`{
  "@type": "Restaurant",
  "name": "Rossi's Trattoria",
  "address": "123 Main St, NYC",
  "hours": "Tue-Sun 5PM-10PM",
  "menu": "[42 items indexed]",
  "reviews": "4.8★ (847 reviews)",
  "booking": "OpenTable integrated"
}`}
                                </pre>
                                <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
                                    <p className="text-sm text-green-700 font-medium">
                                        ✅ AI Response: "Rossi's Trattoria is highly rated! They're open tonight."
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Be Our First Case Study */}
            <section className="section-padding bg-gray-50 w-full">
                <div className="container-max">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="card-highlighted max-w-2xl mx-auto text-center"
                    >
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-brand-primary text-white text-xs font-medium rounded-full">
                            Founding Cohort
                        </span>
                        <h3 className="text-2xl font-bold mb-3 text-text">Be Our First Case Study</h3>
                        <p className="text-text-muted mb-6">
                            We're onboarding our first cohort of restaurants and e-commerce businesses.
                            Join now to get priority pricing and be featured on this page.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn-primary mx-auto gap-2"
                        >
                            Get Your Free Audit
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            </section>

            <LeadCaptureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialUrl=""
            />
        </PageWrapper>
    );
}

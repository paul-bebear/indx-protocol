import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export function BeforeAfterSection() {
    return (
        <section className="py-24 md:py-32 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text">
                        See the{' '}
                        <span className="text-brand-primary">
                            Difference
                        </span>
                    </h2>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        What AI assistants see before and after optimization
                    </p>
                </motion.div>

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
                                    ✅ AI Response: "Rossi's Trattoria is highly rated! They're open tonight and have a table at 7pm."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

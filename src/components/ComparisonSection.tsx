import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';
import { cn } from '../lib/utils';

const comparisons = [
    {
        feature: "Time to Results",
        indexable: "5 days",
        contentTools: "3-6 months",
        diy: "40+ hours",
    },
    {
        feature: "Technical Implementation",
        indexable: "Done for you",
        contentTools: "You do it",
        diy: "You do it",
    },
    {
        feature: "AI Readiness (ChatGPT, Alexa)",
        indexable: true,
        contentTools: false,
        diy: "Maybe",
    },
    {
        feature: "Structured Data Setup",
        indexable: true,
        contentTools: false,
        diy: false,
    },
    {
        feature: "Menu/Product Optimization",
        indexable: true,
        contentTools: false,
        diy: false,
    },
    {
        feature: "Results Guarantee",
        indexable: true,
        contentTools: false,
        diy: false,
    },
    {
        feature: "Monthly Cost",
        indexable: "$0 (one-time)",
        contentTools: "$80/mo forever",
        diy: "$0 (your time)",
    },
];

export function ComparisonSection() {
    return (
        <section className="section-padding bg-gray-50">
            <div className="container-max">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-text">
                        Indexable vs. Content Tools
                    </h2>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Content tools write blog posts. We make AI able to read your website.
                        They're complementary—but fix your foundation first.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="overflow-x-auto"
                >
                    <table className="w-full bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                        <thead>
                            <tr className="bg-gray-50 border-b border-border">
                                <th className="text-left p-4 font-semibold text-text">Feature</th>
                                <th className="text-center p-4 font-semibold text-brand-primary bg-brand-primary/5">
                                    Indexable.Pro
                                    <span className="block text-xs font-normal text-text-muted mt-1">
                                        AI Readiness Service
                                    </span>
                                </th>
                                <th className="text-center p-4 font-semibold text-text-muted">
                                    Content Tools
                                    <span className="block text-xs font-normal text-text-muted mt-1">
                                        Blog Generators ($80/mo)
                                    </span>
                                </th>
                                <th className="text-center p-4 font-semibold text-text-muted">
                                    DIY
                                    <span className="block text-xs font-normal text-text-muted mt-1">
                                        Do It Yourself
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisons.map((row, idx) => (
                                <tr key={row.feature} className={idx !== comparisons.length - 1 ? "border-b border-border" : ""}>
                                    <td className="p-4 font-medium text-text">{row.feature}</td>
                                    <td className="p-4 text-center bg-brand-primary/5">
                                        {renderValue(row.indexable, true)}
                                    </td>
                                    <td className="p-4 text-center">
                                        {renderValue(row.contentTools)}
                                    </td>
                                    <td className="p-4 text-center">
                                        {renderValue(row.diy)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-8 text-center"
                >
                    <p className="text-sm text-text-muted">
                        <span className="font-medium text-text">Pro tip:</span> Many businesses use both.
                        Content tools write articles, Indexable ensures AI can read them.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

function renderValue(value: string | boolean, highlight = false) {
    if (typeof value === 'boolean') {
        return value ? (
            <Check className={cn("w-5 h-5 mx-auto", highlight ? "text-brand-primary" : "text-success")} />
        ) : (
            <X className="w-5 h-5 mx-auto text-danger" />
        );
    }
    if (value === "Maybe") {
        return <Minus className="w-5 h-5 mx-auto text-warning" />;
    }
    return <span className={cn("font-medium", highlight ? "text-brand-primary" : "text-text")}>{value}</span>;
}

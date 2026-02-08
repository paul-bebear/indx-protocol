import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "Isn't this just SEO?",
        answer: "No. Traditional SEO helps you rank on Google search results. AI readiness helps ChatGPT, Siri, and Alexa understand your restaurant. These AI assistants don't browse websites like humans—they need special formatting to read your menu, hours, and location. Without it, they simply skip you and recommend your competitor.",
    },
    {
        question: "How long does this take?",
        answer: "Our standard setup takes 5 business days. We'll audit your site on day one, implement the fixes over the next 3 days, and test everything by day five. Most restaurants start seeing improvements in AI recommendations within the first week.",
    },
    {
        question: "What if I'm on Squarespace/Wix/WordPress?",
        answer: "We work with all website platforms. Squarespace and Wix are actually easier for us—we can add the necessary formatting quickly. WordPress takes a bit longer but is very doable. You don't need to change your website platform at all.",
    },
    {
        question: "Can I do this myself?",
        answer: "Technically yes, but it requires technical knowledge and about 40 hours of work. You'd need to learn about structured data, schema markup, and AI assistant requirements—and these change frequently. We handle it all in less than a week and guarantee it works.",
    },
    {
        question: "What happens if AI standards change?",
        answer: "That's exactly why we offer ongoing support. When ChatGPT, Google, or Apple update how they read restaurant websites, we update your site automatically. You're always ahead of the curve without lifting a finger.",
    },
    {
        question: "How much business am I really losing?",
        answer: "For a typical restaurant serving 50-100 customers per day, we estimate $2,000-5,000 per month in lost revenue from AI-invisible status. That's customers asking Siri for 'Italian restaurants near me' and never hearing your name. We show you the exact math in your free audit.",
    },
    {
        question: "Will this affect how my website looks?",
        answer: "Not at all. Everything we do happens 'behind the scenes' in the code. Your website will look exactly the same to human visitors—same photos, same design, same experience. We just make it readable for AI assistants.",
    },
    {
        question: "Do you work with bars and cafes too?",
        answer: "Absolutely! While we say 'restaurant,' we work with all hospitality businesses—bars, cafes, bakeries, food trucks, catering companies, and even some retail stores. If customers use voice search to find businesses like yours, we can help.",
    },
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="section-padding bg-background">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                        <HelpCircle className="w-6 h-6 text-brand-primary" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text">
                        Frequently Asked{' '}
                        <span className="text-brand-accent">
                            Questions
                        </span>
                    </h2>
                    <p className="text-lg text-text-muted">
                        Everything you need to know about AI visibility for restaurants
                    </p>
                </motion.div>

                <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className={index !== faqs.length - 1 ? "border-b border-border" : ""}
                        >
                            <button
                                onClick={() => toggleItem(index)}
                                className={`
                                    w-full py-5 px-6 flex items-center justify-between text-left 
                                    transition-colors duration-200 group hover:bg-background-muted
                                    ${openIndex === index ? 'bg-background-muted' : ''}
                                `}
                            >
                                <span className={`text-base font-medium pr-8 ${openIndex === index ? 'text-brand-accent' : 'text-text'}`}>
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown
                                        className={`w-5 h-5 transition-colors duration-200 ${openIndex === index ? 'text-brand-accent' : 'text-text-muted'}`}
                                    />
                                </motion.div>
                            </button>

                            <AnimatePresence initial={false}>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <p className="px-6 pb-5 text-text-muted leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Still have questions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-8 text-center"
                >
                    <p className="text-text-muted">
                        Still have questions?{' '}
                        <a href="mailto:hello@indexable.pro" className="text-brand-accent font-medium hover:underline">
                            Email us at hello@indexable.pro
                        </a>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

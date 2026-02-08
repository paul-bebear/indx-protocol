import { motion } from 'framer-motion';
import { PageWrapper } from '../components/PageWrapper';
import { Shield, FileText, CreditCard, Brain, MessageSquare, Fingerprint, Zap, CheckCircle, Globe, Users } from 'lucide-react';

export function WhyIndx() {
    return (
        <PageWrapper className="py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto px-6"
            >
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <span className="text-brand-cyan font-mono text-xs uppercase tracking-widest">
                        [ WHY INDX? ]
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
                        Your Essential Trust Layer for the Autonomous Economy
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        In the rapidly evolving world of AI agents, determining which websites are truly ready
                        for autonomous interaction is a complex challenge. This is where the INDX Protocol becomes indispensable.
                    </p>
                </div>

                {/* The Problem Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Globe className="w-6 h-6 text-red-400" />
                        The Fragmented Web: A Challenge for AI Agents
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Imagine an AI agent trying to complete a task, like booking travel or researching a product.
                        It encounters countless websites, each with different standards for:
                    </p>

                    <div className="grid gap-4">
                        {[
                            { icon: Shield, label: 'Identity & Ownership', desc: 'Is this website truly who it claims to be, or is it a sophisticated spoof?', check: 'DNSSEC, VMC' },
                            { icon: FileText, label: 'Permissions & Policies', desc: 'What can the agent legally and ethically do with the site\'s data?', check: 'User Consent Policy (UCP)' },
                            { icon: Zap, label: 'Capabilities', desc: 'Does the site offer APIs for booking, purchasing, or searching?', check: 'well-known/services' },
                            { icon: CreditCard, label: 'Payment & Commerce', desc: 'Can the agent engage in secure, autonomous transactions?', check: 'Agent Payments Protocol (AP2)' },
                            { icon: Brain, label: 'Context & Data', desc: 'How can the agent understand the site\'s content and structured data?', check: 'Model Context Protocol (MCP)' },
                            { icon: MessageSquare, label: 'Dialogue', desc: 'How can the agent communicate directly with services or other agents?', check: 'Agent2Agent (A2A)' },
                        ].map((item, i) => (
                            <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-start gap-4">
                                <item.icon className="w-5 h-5 text-brand-cyan mt-1 flex-shrink-0" />
                                <div>
                                    <h3 className="text-white font-semibold mb-1">{item.label}</h3>
                                    <p className="text-gray-400 text-sm mb-2">{item.desc}</p>
                                    <span className="text-xs font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-1 rounded">
                                        Checked by: {item.check}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Problem Callout - Make it POP */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-red-500/20 via-orange-500/15 to-red-500/20 border border-red-500/40 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(239,68,68,0.1)_0%,_transparent_70%)]" />
                        <div className="relative flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                                <span className="text-2xl">⚠️</span>
                            </div>
                            <div>
                                <p className="text-lg font-semibold text-white mb-2">
                                    The Problem: A Dozen Checks, Zero Efficiency
                                </p>
                                <p className="text-gray-300">
                                    Currently, an AI agent would need to perform <strong className="text-red-400">a dozen different, complex checks</strong> across
                                    various standards and protocols. This leads to <strong className="text-orange-400">inefficiency</strong>,
                                    <strong className="text-orange-400"> potential errors</strong>, and a fundamental <strong className="text-red-400">lack of trust</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Solution Section */}
                <section className="mb-16 p-8 bg-gradient-to-b from-brand-cyan/10 to-transparent border border-brand-cyan/20 rounded-xl">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Fingerprint className="w-6 h-6 text-brand-cyan" />
                        The INDX Protocol: Your Registry of Registries
                    </h2>
                    <p className="text-gray-300 mb-6 text-lg">
                        The INDX Protocol cuts through this complexity. We are not creating new verification standards;
                        instead, we are building the <strong className="text-brand-cyan">essential aggregation layer</strong> that
                        combines existing, trusted protocols into a single, comprehensive "Agent Readiness Score."
                    </p>
                    <div className="p-4 bg-black/40 border border-brand-cyan/30 rounded-lg">
                        <p className="text-brand-cyan font-mono text-sm">
                            💡 We are the "Michelin Guide" for the Agentic Web. Just as a Michelin star tells you a restaurant
                            is exceptional without inspecting its kitchen, the INDX Protocol provides a unified, trusted rating
                            for a website's AI readiness.
                        </p>
                    </div>
                </section>

                {/* How We Work Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6">How We Work</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: 'Consolidation', desc: 'We perform a multi-point audit, checking for DNSSEC, BIMI, UCP, AP2, MCP, A2A, and ai-manifest.json.' },
                            { title: 'Verification', desc: 'We synthesize these disparate signals into a single, transparent Audit Score.' },
                            { title: 'Transparency', desc: 'Our public registry provides a clear "Protocol Stack" for each audited domain.' },
                            { title: 'Trust', desc: 'By validating adherence to the full suite of protocols, we provide unparalleled confidence.' },
                        ].map((item, i) => (
                            <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-lg">
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                                    <h3 className="text-white font-semibold">{item.title}</h3>
                                </div>
                                <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Why INDX is Necessary Section */}
                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <Users className="w-6 h-6 text-brand-cyan" />
                        Why INDX is Necessary
                    </h2>
                    <div className="space-y-6">
                        <div className="p-5 border-l-4 border-brand-cyan bg-white/5 rounded-r-lg">
                            <h3 className="text-white font-semibold mb-2">For AI Agents</h3>
                            <p className="text-gray-400 text-sm">
                                Streamlines discovery, reduces risk, and ensures reliable interactions with web services.
                                Agents can trust a single score instead of performing exhaustive checks.
                            </p>
                        </div>
                        <div className="p-5 border-l-4 border-emerald-400 bg-white/5 rounded-r-lg">
                            <h3 className="text-white font-semibold mb-2">For Website Owners</h3>
                            <p className="text-gray-400 text-sm">
                                Provides a clear roadmap to becoming "Agent-Ready," offering a verified badge of trust
                                that attracts autonomous traffic and commerce.
                            </p>
                        </div>
                        <div className="p-5 border-l-4 border-purple-400 bg-white/5 rounded-r-lg">
                            <h3 className="text-white font-semibold mb-2">For the AI Ecosystem</h3>
                            <p className="text-gray-400 text-sm">
                                Establishes a foundational layer of trust and standardization, accelerating the
                                development of the autonomous web.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Closing Statement */}
                <div className="text-center p-8 bg-gradient-to-r from-brand-cyan/10 via-purple-500/10 to-brand-cyan/10 border border-white/10 rounded-xl">
                    <p className="text-xl text-white font-semibold mb-4">
                        The future of the internet is autonomous.
                    </p>
                    <p className="text-gray-400">
                        The INDX Protocol is building the trust infrastructure to make it secure, efficient, and universally understood.
                    </p>
                </div>
            </motion.div>
        </PageWrapper>
    );
}

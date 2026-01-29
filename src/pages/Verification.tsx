import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Check, ArrowRight, Lock, Zap } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { useNavigate } from 'react-router-dom';

export function Verification() {
    const navigate = useNavigate();

    const handleRegisterNode = () => {
        navigate('/');
        setTimeout(() => {
            const scannerInput = document.querySelector('input[placeholder*="brand URL"]');
            if (scannerInput) {
                scannerInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                (scannerInput as HTMLInputElement).focus();
                scannerInput.classList.add('animate-pulse-cyan');
                setTimeout(() => {
                    scannerInput.classList.remove('animate-pulse-cyan');
                }, 2000);
            }
        }, 500);
    };

    return (
        <PageWrapper className="py-16">
            <div className="max-w-4xl mx-auto px-6">

                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                        <Shield className="w-4 h-4 text-brand-cyan" />
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                            Security Protocol
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        3rd-Party <span className="text-brand-cyan">Verification</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Protecting your brand from the emerging threat landscape of agentic exploitation.
                    </p>
                </motion.div>

                {/* SECTION 1: The Fearmonger */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-20"
                >
                    <div className="p-8 rounded-xl bg-[#0A0A0A] border border-[#FF4500]/30 shadow-[0_0_40px_rgba(255,69,0,0.1)]">

                        {/* Warning Badge */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-[#FF4500]/20 border border-[#FF4500]/40 flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-[#FF4500]" />
                            </div>
                            <span className="text-[#FF4500] font-mono text-xs uppercase tracking-wider">
                                Threat Advisory
                            </span>
                        </div>

                        {/* Headline */}
                        <h2 className="text-3xl font-bold text-white mb-6">
                            THE RISE OF THE <span className="text-[#FF4500]">AGENT-TRAP</span>
                        </h2>

                        {/* Copy */}
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            Malicious actors are now deploying <span className="text-[#FF4500] font-medium">'Ghost Manifests'</span>—fake UCP files designed to trick autonomous agents into unauthorized transactions or data leaks.
                        </p>
                        <p className="text-gray-400 leading-relaxed">
                            Without 3rd-party verification, your brand is a target for <span className="text-[#FF4500]">Agent-Spoofing</span>.
                        </p>

                        {/* Threat Stats */}
                        <div className="mt-8 grid grid-cols-3 gap-4">
                            <div className="p-4 rounded-lg bg-black/60 border border-[#FF4500]/20">
                                <p className="text-[#FF4500] font-mono text-2xl font-bold">847%</p>
                                <p className="text-gray-500 text-xs font-mono uppercase mt-1">Increase in Agent Attacks</p>
                            </div>
                            <div className="p-4 rounded-lg bg-black/60 border border-[#FF4500]/20">
                                <p className="text-[#FF4500] font-mono text-2xl font-bold">$2.3M</p>
                                <p className="text-gray-500 text-xs font-mono uppercase mt-1">Avg. Breach Cost</p>
                            </div>
                            <div className="p-4 rounded-lg bg-black/60 border border-[#FF4500]/20">
                                <p className="text-[#FF4500] font-mono text-2xl font-bold">72hrs</p>
                                <p className="text-gray-500 text-xs font-mono uppercase mt-1">Avg. Detection Time</p>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* SECTION 2: The Solution */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-20"
                >
                    <div className="p-8 rounded-xl bg-[#0A0A0A] border border-brand-cyan/30 shadow-[0_0_40px_rgba(0,229,229,0.1)]">

                        {/* Verified Badge */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center">
                                <Check className="w-5 h-5 text-brand-cyan" />
                            </div>
                            <span className="text-brand-cyan font-mono text-xs uppercase tracking-wider">
                                The Solution
                            </span>
                        </div>

                        {/* Headline */}
                        <h2 className="text-3xl font-bold text-white mb-6">
                            THE <span className="text-brand-cyan">INDX</span> TRUST LAYER
                        </h2>

                        {/* Copy */}
                        <p className="text-gray-300 text-lg leading-relaxed mb-6">
                            We act as the <span className="text-brand-cyan font-medium">3rd-party validator</span>. When an agent finds your node, it cross-references the <span className="font-mono text-brand-cyan">{'{ INDX }'}</span> Global Registry to ensure the handshake is authentic, encrypted, and authorized.
                        </p>

                        {/* Benefits */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <div className="p-4 rounded-lg bg-black/60 border border-brand-cyan/20 flex items-start gap-3">
                                <Shield className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-white font-medium text-sm">Authenticated</p>
                                    <p className="text-gray-500 text-xs mt-1">Verified handshake origin</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-lg bg-black/60 border border-brand-cyan/20 flex items-start gap-3">
                                <Lock className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-white font-medium text-sm">Encrypted</p>
                                    <p className="text-gray-500 text-xs mt-1">End-to-end protection</p>
                                </div>
                            </div>
                            <div className="p-4 rounded-lg bg-black/60 border border-brand-cyan/20 flex items-start gap-3">
                                <Zap className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-white font-medium text-sm">Authorized</p>
                                    <p className="text-gray-500 text-xs mt-1">Permission-gated access</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* SECTION 3: Technical Integration */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-20"
                >
                    <div className="p-8 rounded-xl bg-[#0A0A0A] border border-white/10">

                        {/* Section Header */}
                        <div className="mb-10">
                            <span className="text-brand-cyan font-mono text-xs uppercase tracking-widest">
                                [ 02: THE HANDSHAKE PROTOCOL ]
                            </span>
                            <h2 className="text-2xl font-bold text-white mt-3">
                                Technical Integration
                            </h2>
                        </div>

                        {/* 3-Step Workflow */}
                        <div className="relative">
                            {/* Circuit Board Lines - Vertical Connector */}
                            <div className="absolute left-[28px] top-[60px] bottom-[60px] w-px bg-gradient-to-b from-brand-cyan/40 via-brand-cyan/20 to-brand-cyan/40 hidden md:block" />

                            <div className="space-y-8">
                                {/* Step 01 */}
                                <div className="flex gap-6">
                                    <div className="flex flex-col items-center">
                                        <div className="w-14 h-14 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center font-mono text-brand-cyan font-bold text-lg">
                                            01
                                        </div>
                                        {/* Horizontal circuit line */}
                                        <div className="flex-1 w-px bg-gradient-to-b from-brand-cyan/30 to-transparent md:hidden" />
                                    </div>
                                    <div className="flex-1 pt-2">
                                        <h3 className="text-white font-bold font-mono text-lg mb-2">
                                            Data Audit
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            We interface with your existing Product APIs (Shopify, Custom ERP, or PIM) to map your inventory logic for machine consumption.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 02 */}
                                <div className="flex gap-6">
                                    <div className="flex flex-col items-center">
                                        <div className="w-14 h-14 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center font-mono text-brand-cyan font-bold text-lg">
                                            02
                                        </div>
                                    </div>
                                    <div className="flex-1 pt-2">
                                        <h3 className="text-white font-bold font-mono text-lg mb-2">
                                            Manifest Generation
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            Our lab generates a custom, cryptographically signed <span className="text-brand-cyan font-mono">ucp.json</span> file that translates your brand rules into Agent-readable instructions.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 03 */}
                                <div className="flex gap-6">
                                    <div className="flex flex-col items-center">
                                        <div className="w-14 h-14 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center font-mono text-brand-cyan font-bold text-lg">
                                            03
                                        </div>
                                    </div>
                                    <div className="flex-1 pt-2">
                                        <h3 className="text-white font-bold font-mono text-lg mb-2">
                                            Simple Deployment
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            Zero-risk implementation. Your team simply hosts the manifest at your root directory and adds a single discovery tag to your header.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Developer Safety Box */}
                        <div className="mt-10 p-6 rounded-lg bg-emerald-500/5 border border-emerald-500/30">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <h4 className="text-emerald-400 font-mono text-sm font-bold mb-2 uppercase tracking-wider">
                                        Developer Safety
                                    </h4>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        No database write-access required. <span className="text-white font-mono">{'{ INDX }'}</span> acts as a read-only translation layer, ensuring your core security remains untouched while enabling Agentic commerce.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* SECTION 3: The Diagram */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mb-20"
                >
                    <h3 className="text-center text-gray-400 font-mono text-xs uppercase tracking-wider mb-8">
                        How the Trust Layer Works
                    </h3>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-8 rounded-xl bg-[#0A0A0A] border border-white/10">

                        {/* Agent Node */}
                        <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-black/60 border border-white/20 min-w-[140px]">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                <span className="text-2xl">🤖</span>
                            </div>
                            <span className="text-white font-mono text-sm font-medium">AI AGENT</span>
                            <span className="text-gray-600 text-xs font-mono">Operator / GPT</span>
                        </div>

                        {/* Arrow 1 */}
                        <div className="flex flex-col items-center gap-1">
                            <ArrowRight className="w-8 h-8 text-gray-600 hidden md:block" />
                            <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent md:hidden" />
                            <span className="text-gray-600 font-mono text-[10px] uppercase">Request</span>
                        </div>

                        {/* INDX Registry (The Shield) */}
                        <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-brand-cyan/10 border-2 border-brand-cyan/40 shadow-[0_0_30px_rgba(0,229,229,0.2)] min-w-[180px]">
                            <div className="w-14 h-14 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center">
                                <Shield className="w-7 h-7 text-brand-cyan" />
                            </div>
                            <span className="text-brand-cyan font-mono text-sm font-bold">INDX REGISTRY</span>
                            <span className="text-white/80 text-xs font-mono text-center">The Shield</span>
                            <div className="flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400 text-[10px] font-mono uppercase">Verified</span>
                            </div>
                        </div>

                        {/* Arrow 2 */}
                        <div className="flex flex-col items-center gap-1">
                            <ArrowRight className="w-8 h-8 text-brand-cyan hidden md:block" />
                            <div className="w-px h-8 bg-gradient-to-b from-brand-cyan to-transparent md:hidden" />
                            <span className="text-brand-cyan font-mono text-[10px] uppercase">Secure</span>
                        </div>

                        {/* Your Website */}
                        <div className="flex flex-col items-center gap-2 p-6 rounded-lg bg-black/60 border border-brand-cyan/20 min-w-[140px]">
                            <div className="w-12 h-12 rounded-full bg-brand-cyan/10 flex items-center justify-center">
                                <span className="text-2xl">🌐</span>
                            </div>
                            <span className="text-white font-mono text-sm font-medium">YOUR SITE</span>
                            <span className="text-brand-cyan text-xs font-mono">Node #41</span>
                        </div>
                    </div>

                    {/* Diagram Caption */}
                    <p className="text-center text-gray-600 text-xs font-mono mt-4">
                        Agents verify your manifest through INDX before initiating any transaction.
                    </p>
                </motion.section>

                {/* CTA Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                >
                    <div className="p-8 rounded-xl bg-gradient-to-b from-brand-cyan/5 to-transparent border border-brand-cyan/20">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Protect Your Brand Today
                        </h3>
                        <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                            Join the Global Registry and become a verified node in the trusted agentic economy.
                        </p>
                        <button
                            onClick={handleRegisterNode}
                            className="h-14 px-10 rounded-lg bg-brand-cyan text-black font-bold font-mono tracking-wider text-lg hover:bg-cyan-200 transition-all shadow-[0_0_30px_rgba(0,229,229,0.4)] hover:shadow-[0_0_50px_rgba(0,229,229,0.6)] active:scale-95 cursor-pointer"
                        >
                            [ REGISTER YOUR NODE ]
                        </button>
                    </div>
                </motion.section>
            </div>
        </PageWrapper>
    );
}

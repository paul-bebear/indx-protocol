import { motion } from 'framer-motion';

export function ProtocolHero() {
    return (
        <section id="hero" className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-6 pt-20 pb-32 select-none">

            {/* Central Visual Complex */}
            <div className="relative z-10 flex items-center justify-center gap-12 sm:gap-24 mb-16 w-full">

                {/* Face Node (Left) */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative group shrink-0"
                >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-gray-700 flex items-center justify-center overflow-hidden shadow-2xl relative z-20">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                        <div className="absolute inset-0 bg-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Connector Line Left -> Center */}
                    <svg className="absolute top-1/2 left-full w-12 sm:w-24 h-[2px] overflow-visible z-10 pointer-events-none">
                        {/* Base Line */}
                        <line x1="0" y1="0" x2="100%" y2="0" stroke="#374151" strokeWidth="1" strokeDasharray="4 4" />

                        {/* Travelling Packets (Incoming) */}
                        <motion.circle
                            r="2" fill="#00FFFF"
                            initial={{ cx: "0%", cy: 0, opacity: 0 }}
                            animate={{ cx: "100%", opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                        />
                        <motion.circle
                            r="2" fill="#00FFFF"
                            initial={{ cx: "0%", cy: 0, opacity: 0 }}
                            animate={{ cx: "100%", opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                        />
                    </svg>
                </motion.div>

                {/* Core Protocol Text (Center) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative z-30 flex flex-col items-center"
                >
                    <div className="text-5xl sm:text-7xl font-bold tracking-tighter text-white flex gap-2 items-center">
                        <span className="text-gray-700 font-mono font-light">[</span>
                        <motion.span
                            animate={{ textShadow: ["0 0 0px #00FFFF", "0 0 15px rgba(0,255,255,0.3)", "0 0 0px #00FFFF"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="text-white relative"
                        >
                            INDX
                            {/* Inner Pulse Ring */}
                            <div className="absolute inset-0 bg-brand-cyan/20 blur-2xl opacity-20 animate-pulse-slow rounded-full" />
                        </motion.span>
                        <span className="text-gray-700 font-mono font-light">]</span>
                    </div>
                </motion.div>

                {/* Website Node (Right) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative group shrink-0"
                >
                    {/* Connector Line Center -> Right */}
                    <svg className="absolute top-1/2 right-full w-12 sm:w-24 h-[2px] overflow-visible z-10 pointer-events-none">
                        {/* Base Line */}
                        <line x1="0" y1="0" x2="100%" y2="0" stroke="#374151" strokeWidth="1" strokeDasharray="4 4" />

                        {/* Travelling Packets (Outgoing) */}
                        <motion.circle
                            r="2" fill="#00FFFF"
                            initial={{ cx: "0%", cy: 0, opacity: 0 }}
                            animate={{ cx: "100%", opacity: [0, 1, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                        />
                    </svg>

                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-gray-700 flex items-center justify-center overflow-hidden shadow-2xl relative z-20">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-300">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <line x1="3" y1="9" x2="21" y2="9" />
                            <line x1="9" y1="21" x2="9" y2="9" />
                        </svg>
                        <div className="absolute inset-0 bg-brand-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </motion.div>
            </div>

            {/* Primary Copy & CTAs */}
            <div className="text-center w-full max-w-2xl mx-auto space-y-8">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-2xl sm:text-3xl text-white font-bold leading-tight tracking-tight"
                >
                    IS YOUR BRAND <span className="text-brand-cyan">AGENT-READY</span>? GET TESTED.
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-base sm:text-lg text-gray-400 font-medium leading-relaxed max-w-xl mx-auto"
                >
                    <span className="text-red-400 font-mono">98%</span> of websites fail the Agentic Discovery Test. Our lab identifies the handshake errors blocking AI agents from indexing your brand.
                </motion.p>
            </div>

            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-cyan/5 blur-[100px] rounded-full pointer-events-none -z-10" />

        </section>
    );
}

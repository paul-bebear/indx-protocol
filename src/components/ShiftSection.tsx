export function ShiftSection() {
    return (
        <section id="education" className="w-full max-w-3xl mx-auto px-6 py-12">
            <div className="mb-12">
                <span className="text-brand-cyan font-mono text-xs uppercase tracking-widest">
                    [ 02: THE SHIFT ]
                </span>
            </div>

            <div className="space-y-12">
                {/* The Legacy Web */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                        The Legacy Web
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                        Built for human attention. Optimized for clicks, scrolls, and dwell time.
                        Every meta tag, every headline, every pixel was designed to capture a
                        human eye. This infrastructure served its purpose—but the audience has changed.
                    </p>
                </div>

                {/* The Agentic Shift */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                        The Agentic Shift
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                        LLM-powered agents don't "see" your UI. They can't parse your hero image
                        or appreciate your brand colors. They query structured data, verify
                        permissions, and establish trust through cryptographic handshakes.
                        If your infrastructure doesn't speak their language, you don't exist.
                    </p>
                </div>

                {/* The Solution */}
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                        The Solution
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                        The Universal Content Protocol (UCP) is the translation layer between
                        your brand and the autonomous economy. It declares your capabilities,
                        defines access rules, and provides verifiable identity—making your
                        infrastructure discoverable, trustworthy, and actionable by any agent.
                    </p>
                </div>
            </div>
        </section>
    );
}

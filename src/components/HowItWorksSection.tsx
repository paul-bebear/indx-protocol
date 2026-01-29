import { Play } from 'lucide-react';

const INFO_CARDS = [
    {
        label: 'THE PROBLEM',
        tag: 'ANALYSIS',
        text: "98% of sites are 'machine-invisible'.",
    },
    {
        label: 'THE ANNOUNCEMENT',
        tag: 'MARKET SHIFT',
        text: "OpenAI & Google have moved to 'Operator' mode.",
    },
    {
        label: 'THE FUTURE',
        tag: 'DIRECTIVE',
        text: 'Websites must evolve into Verifiable Nodes.',
    },
];

export function HowItWorksSection() {
    return (
        <section id="how-it-works" className="w-full max-w-5xl mx-auto px-6 py-12">
            {/* Section Header */}
            <div className="mb-8">
                <span className="text-brand-cyan font-mono text-xs uppercase tracking-widest">
                    [ 01: THE EDUCATION ]
                </span>
                <span className="text-gray-500 font-mono text-xs uppercase tracking-widest ml-4">
                    // UNDERSTANDING THE SHIFT
                </span>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Video Placeholder */}
                <div className="flex flex-col">
                    <div className="relative aspect-video rounded-lg border border-brand-cyan/30 bg-black/80 overflow-hidden shadow-[0_0_30px_rgba(0,229,229,0.1)] flex items-center justify-center group cursor-pointer hover:border-brand-cyan/50 transition-colors">
                        {/* Play Button */}
                        <div className="w-16 h-16 rounded-full bg-brand-cyan/20 border-2 border-brand-cyan flex items-center justify-center group-hover:bg-brand-cyan/30 transition-all">
                            <Play className="w-6 h-6 text-brand-cyan ml-1" fill="currentColor" />
                        </div>

                        {/* Timestamp */}
                        <span className="absolute bottom-3 right-3 text-gray-400 font-mono text-sm bg-black/60 px-2 py-1 rounded">
                            02:14
                        </span>
                    </div>

                    {/* Video Description */}
                    <p className="mt-4 text-center text-gray-400 text-sm font-mono">
                        Watch our 2-minute masterclass on why legacy SEO is failing the Agentic Economy.
                    </p>
                </div>

                {/* Right: Info Cards */}
                <div className="flex flex-col gap-4">
                    {INFO_CARDS.map((card) => (
                        <div
                            key={card.label}
                            className="p-4 rounded-lg border border-white/10 bg-black/40"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-brand-cyan font-mono text-xs font-bold uppercase">
                                    {card.label}
                                </span>
                                <span className="text-gray-600 font-mono text-xs uppercase">
                                    | {card.tag}
                                </span>
                            </div>
                            <p className="text-gray-300 text-sm">
                                {card.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

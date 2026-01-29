import { Play } from 'lucide-react';

const KEY_POINTS = [
    {
        label: 'THE PROBLEM',
        text: "98% of sites are 'machine-invisible'.",
        sublabel: 'ANALYSIS'
    },
    {
        label: 'THE ANNOUNCEMENT',
        text: "OpenAI & Google have moved to 'Operator' mode.",
        sublabel: 'MARKET SHIFT'
    },
    {
        label: 'THE FUTURE',
        text: 'Websites must evolve into Verifiable Nodes.',
        sublabel: 'DIRECTIVE'
    }
];

export function EducationSection() {
    return (
        <section id="learn" className="w-full bg-[#0A0A0A] py-20">
            <div className="max-w-6xl mx-auto px-6">

                {/* Section Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-brand-cyan font-mono text-sm">[ 01: THE EDUCATION ]</span>
                        <span className="text-gray-600 font-mono text-sm">//</span>
                        <span className="text-gray-500 font-mono text-sm uppercase tracking-wider">Understanding the Shift</span>
                    </div>
                    <div className="w-16 h-px bg-brand-cyan/30" />
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Video Container */}
                    <div className="space-y-4">
                        <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-black/60 backdrop-blur-md group cursor-pointer hover:border-brand-cyan/30 transition-colors">
                            {/* Frosted Glass Placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-900/80" />

                            {/* Grid Pattern Overlay */}
                            <div className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: 'linear-gradient(rgba(0,229,229,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,229,0.1) 1px, transparent 1px)',
                                    backgroundSize: '20px 20px'
                                }}
                            />

                            {/* Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center group-hover:bg-brand-cyan/20 group-hover:border-brand-cyan/50 transition-all group-hover:scale-110">
                                    <Play className="w-8 h-8 text-brand-cyan ml-1" fill="currentColor" />
                                </div>
                            </div>

                            {/* Duration Badge */}
                            <div className="absolute bottom-4 right-4 px-2 py-1 rounded bg-black/60 border border-white/10 font-mono text-xs text-gray-400">
                                02:14
                            </div>
                        </div>

                        {/* Video Subtext */}
                        <p className="text-gray-500 text-sm font-mono text-center">
                            Watch our 2-minute masterclass on why legacy SEO is failing the Agentic Economy.
                        </p>
                    </div>

                    {/* Key Points Cards */}
                    <div className="space-y-4">
                        {KEY_POINTS.map((point, index) => (
                            <div
                                key={index}
                                className="p-5 rounded-lg bg-black/40 border border-white/10 hover:border-brand-cyan/20 transition-colors"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-brand-cyan font-mono text-xs uppercase tracking-wider">{point.label}</span>
                                    <span className="text-gray-700 font-mono text-xs">|</span>
                                    <span className="text-gray-600 font-mono text-xs uppercase tracking-wider">{point.sublabel}</span>
                                </div>
                                <p className="text-white font-mono text-sm leading-relaxed">
                                    {point.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

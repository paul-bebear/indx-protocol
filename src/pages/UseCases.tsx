import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../components/PageWrapper';

const USE_CASES = [
    {
        id: '01',
        category: 'Autonomous Commerce',
        headline: 'Zero-Click Fulfillment',
        copy: 'Enable AI Agents to browse inventory, verify sizes, and execute secure checkouts on behalf of the user—no human interface required.',
        image: '/use-case-commerce.png',
    },
    {
        id: '02',
        category: 'Intelligent Scheduling',
        headline: 'Agentic Appointment Booking',
        copy: 'Your UCP manifest exposes booking logic directly to agents, allowing for seamless service scheduling and VIP fitting reservations.',
        image: '/use-case-scheduling.png',
    },
    {
        id: '03',
        category: 'Personalized Curation',
        headline: 'Hyper-Niche Discovery',
        copy: 'When an agent is tasked with \'Finding the best red lipstick for cool undertones,\' your UCP data ensures your product is the one that fits the logic.',
        image: '/use-case-curation.png',
    },
];

export function UseCases() {
    const navigate = useNavigate();

    const handleTalkToExpert = () => {
        navigate('/');
        setTimeout(() => {
            const emailInput = document.querySelector('input[placeholder="engineer@company.com"]');
            if (emailInput) {
                emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                (emailInput as HTMLInputElement).focus();
            } else {
                const scannerInput = document.querySelector('input[placeholder*="brand URL"]');
                if (scannerInput) {
                    scannerInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    (scannerInput as HTMLInputElement).focus();
                }
            }
        }, 500);
    };

    return (
        <PageWrapper className="py-16">
            <div className="max-w-5xl mx-auto px-6">

                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-brand-cyan font-mono text-xs uppercase tracking-widest">
                        // AGENTIC CAPABILITIES
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-4">
                        Use Cases
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        How brands are leveraging UCP to unlock autonomous commerce.
                    </p>
                </motion.div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {USE_CASES.map((useCase, index) => (
                        <motion.div
                            key={useCase.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * (index + 1) }}
                            className="p-6 rounded-xl bg-[#0A0A0A] border border-white/10 hover:border-brand-cyan/30 transition-colors"
                        >
                            {/* Card Number */}
                            <span className="text-brand-cyan font-mono text-xs uppercase tracking-widest">
                                [ {useCase.id} ]
                            </span>

                            {/* Image */}
                            <div className="my-6 rounded-lg border border-brand-cyan/30 overflow-hidden shadow-[0_0_20px_rgba(0,229,229,0.15)]">
                                <img
                                    src={useCase.image}
                                    alt={useCase.headline}
                                    className="w-full h-40 object-cover"
                                />
                            </div>

                            {/* Category */}
                            <p className="text-gray-500 font-mono text-xs uppercase tracking-wider mb-2">
                                {useCase.category}
                            </p>

                            {/* Headline */}
                            <h3 className="text-xl font-bold text-white mb-3">
                                {useCase.headline}
                            </h3>

                            {/* Copy */}
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {useCase.copy}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Closer CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-center p-10 rounded-xl bg-gradient-to-b from-brand-cyan/5 to-transparent border border-brand-cyan/20"
                >
                    <p className="text-xl text-gray-300 mb-6">
                        What could your brand do if it could talk to the machines?
                    </p>
                    <button
                        onClick={handleTalkToExpert}
                        className="h-14 px-10 rounded-lg bg-brand-cyan text-black font-bold font-mono tracking-wider hover:bg-cyan-200 transition-all shadow-[0_0_30px_rgba(0,229,229,0.4)] hover:shadow-[0_0_50px_rgba(0,229,229,0.6)] active:scale-95 cursor-pointer"
                    >
                        [ Talk to an Expert ]
                    </button>
                </motion.div>
            </div>
        </PageWrapper>
    );
}

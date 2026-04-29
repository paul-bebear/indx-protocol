import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, MapPin, Building2, UtensilsCrossed, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

interface AiSimulationProps {
    onOpenModal: () => void;
}

type Step = 'city' | 'district' | 'venue' | 'desire' | 'simulation' | 'reflection1' | 'reflection2' | 'cta';

interface SelectionState {
    city: string;
    district: string;
    venue: string;
    desire: string;
    aiEngine: string;
}

const CITIES = ['Paris', 'Milan'];

const DISTRICTS: Record<string, string[]> = {
    Paris: ['Le Marais', 'Montmartre', 'Saint-Germain', '11th Arrondissement', 'Bastille'],
    Milan: ['Navigli', 'Brera', 'Isola', 'Porta Romana', 'Centro Storico']
};

const VENUES = ['Restaurant', 'Bar', 'Nightclub', 'Bistro', 'Cafe'];

const DESIRES = ['Pasta', 'Pizza', 'Cocktails', 'Natural Wine', 'Aperitivo', 'Fine Dining', 'Quick Bite'];

export function AiSimulation({ onOpenModal }: AiSimulationProps) {
    const [step, setStep] = useState<Step>('city');
    const [selections, setSelections] = useState<SelectionState>({
        city: '',
        district: '',
        venue: '',
        desire: '',
        aiEngine: 'ChatGPT'
    });
    const [typedText, setTypedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const navigate = useNavigate();

    const handleSelection = (key: keyof SelectionState, value: string, nextStep: Step) => {
        setSelections(prev => ({ ...prev, [key]: value }));
        setStep(nextStep);
    };

    const aiPrompt = `My friends and I are looking to get some ${selections.desire.toLowerCase()} at a ${selections.venue.toLowerCase()} in ${selections.district}, ${selections.city} tonight. Where should we go?`;

    // Generic responses depending on the selected engine could be added, 
    // but for simplicity, we use one robust generic response that demonstrates the problem.
    const aiResponse = `Here are 3 great options for ${selections.desire.toLowerCase()} at a ${selections.venue.toLowerCase()} in ${selections.district}, ${selections.city} tonight:

1. **[Competitor A]** - Highly rated for their ${selections.desire.toLowerCase()}. People mention the great atmosphere. (Rating: 4.8/5)
2. **[Competitor B]** - A trendy spot that perfectly matches your vibe. They have excellent reviews for their recent menu updates. (Rating: 4.6/5)
3. **[Competitor C]** - A classic choice in the area, very popular with locals looking for ${selections.desire.toLowerCase()}. (Rating: 4.7/5)

Would you like me to check their availability or make a reservation for you?`;

    useEffect(() => {
        if (step === 'simulation') {
            setIsTyping(true);
            setTypedText('');

            // Simulate network delay before typing starts
            const startTyping = setTimeout(() => {
                let i = 0;
                const typingInterval = setInterval(() => {
                    if (i < aiResponse.length) {
                        setTypedText(prev => prev + aiResponse.charAt(i));
                        i++;
                    } else {
                        clearInterval(typingInterval);
                        setIsTyping(false);
                        // Wait a moment after typing finishes before moving to reflection
                        setTimeout(() => setStep('reflection1'), 3000);
                    }
                }, 30); // Typing speed

                return () => clearInterval(typingInterval);
            }, 1500);

            return () => clearTimeout(startTyping);
        }
    }, [step, aiResponse]);

    const renderStepContent = () => {
        switch (step) {
            case 'city':
                return (
                    <SelectionStep
                        title="Let's run a live discovery test."
                        subtitle="Choose your city."
                        options={CITIES}
                        icon={<MapPin className="w-5 h-5" />}
                        onSelect={(val) => handleSelection('city', val, 'district')}
                    />
                );
            case 'district':
                return (
                    <SelectionStep
                        title={`Where in ${selections.city}?`}
                        subtitle="Select your neighborhood or district."
                        options={DISTRICTS[selections.city] || []}
                        icon={<MapPin className="w-5 h-5" />}
                        onSelect={(val) => handleSelection('district', val, 'venue')}
                        onBack={() => setStep('city')}
                    />
                );
            case 'venue':
                return (
                    <SelectionStep
                        title="What type of venue are you?"
                        subtitle="Select the category that best fits your business."
                        options={VENUES}
                        icon={<Building2 className="w-5 h-5" />}
                        onSelect={(val) => handleSelection('venue', val, 'desire')}
                        onBack={() => setStep('district')}
                    />
                );
            case 'desire':
                return (
                    <SelectionStep
                        title="What is your guest craving?"
                        subtitle="Select what they are searching for tonight."
                        options={DESIRES}
                        icon={<UtensilsCrossed className="w-5 h-5" />}
                        onSelect={(val) => handleSelection('desire', val, 'simulation')}
                        onBack={() => setStep('venue')}
                    />
                );
            case 'simulation':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl mx-auto space-y-6"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-serif font-bold text-carbon mb-2">
                                Asking {selections.aiEngine}...
                            </h2>
                            <p className="text-gray-500">Simulating a real guest query in real-time.</p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-clay flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-brand-red/10 flex items-center justify-center shrink-0">
                                <span className="text-brand-red font-bold text-sm">You</span>
                            </div>
                            <p className="text-carbon mt-1">{aiPrompt}</p>
                        </div>

                        <div className="bg-stone-50 rounded-2xl p-6 border border-clay flex gap-4 min-h-[200px]">
                            <div className="w-8 h-8 rounded-full bg-carbon flex items-center justify-center shrink-0">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                {isTyping && typedText.length === 0 ? (
                                    <div className="flex space-x-2 mt-2">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    </div>
                                ) : (
                                    <div className="prose prose-sm max-w-none text-carbon whitespace-pre-wrap">
                                        {typedText}
                                        {isTyping && <span className="inline-block w-2 h-4 ml-1 bg-carbon animate-pulse" />}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                );
            case 'reflection1':
                return (
                    <ReflectionStep
                        title="Did you see your venue listed?"
                        subtitle="AI engines only recommend venues with structured, real-time data."
                        options={[
                            { label: 'Yes, I was there', value: 'yes', type: 'secondary' },
                            { label: 'No, I was invisible', value: 'no', type: 'primary' }
                        ]}
                        onSelect={() => setStep('reflection2')}
                    />
                );
            case 'reflection2':
                return (
                    <ReflectionStep
                        title="Would you like to be the #1 recommendation next time?"
                        subtitle="We structure your data so AI engines prioritize your venue."
                        options={[
                            { label: 'Yes, make me visible', value: 'yes', type: 'primary' },
                            { label: 'No, I have enough guests', value: 'no', type: 'secondary' }
                        ]}
                        onSelect={() => setStep('cta')}
                    />
                );
            case 'cta':
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-xl mx-auto text-center space-y-8 p-8 bg-white rounded-3xl border border-clay shadow-xl"
                    >
                        <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Bot className="w-8 h-8 text-brand-red" />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-carbon">
                            Stop losing guests to the <span className="text-brand-red">Invisible Gap</span>.
                        </h2>
                        <p className="text-lg text-gray-600">
                            Your future guests aren't Googling anymore. They are asking AI.
                            Let's get your venue's data structured, indexed, and recommended.
                        </p>
                        <div className="pt-4 space-y-4">
                            <button
                                onClick={onOpenModal}
                                className="w-full bg-brand-red text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                            >
                                Book Your Strategy Call <ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => navigate('/')}
                                className="w-full text-carbon hover:text-brand-red font-medium transition-colors"
                            >
                                Return to homepage
                            </button>
                        </div>
                    </motion.div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-paper flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-3xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderStepContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

// Subcomponents

function SelectionStep({
    title,
    subtitle,
    options,
    icon,
    onSelect,
    onBack
}: {
    title: string;
    subtitle: string;
    options: string[];
    icon: React.ReactNode;
    onSelect: (val: string) => void;
    onBack?: () => void;
}) {
    return (
        <div className="text-center space-y-8">
            <div className="space-y-3 mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-carbon">
                    {title}
                </h2>
                <p className="text-xl text-gray-500">
                    {subtitle}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => onSelect(opt)}
                        className="group flex flex-col items-center justify-center p-6 bg-white border border-clay rounded-2xl hover:border-brand-red hover:shadow-md transition-all cursor-pointer"
                    >
                        <div className="w-12 h-12 rounded-full bg-stone-50 flex items-center justify-center mb-4 group-hover:bg-brand-red/10 transition-colors text-carbon group-hover:text-brand-red">
                            {icon}
                        </div>
                        <span className="font-semibold text-lg text-carbon group-hover:text-brand-red transition-colors">
                            {opt}
                        </span>
                    </button>
                ))}
            </div>

            {onBack && (
                <button
                    onClick={onBack}
                    className="mt-8 text-gray-400 hover:text-carbon transition-colors"
                >
                    ← Back
                </button>
            )}
        </div>
    );
}

function ReflectionStep({
    title,
    subtitle,
    options,
    onSelect
}: {
    title: string;
    subtitle: string;
    options: { label: string; value: string; type: 'primary' | 'secondary' }[];
    onSelect: (val: string) => void;
}) {
    return (
        <div className="w-full max-w-xl mx-auto text-center space-y-8 p-8 bg-white rounded-3xl border border-clay shadow-sm">
            <div className="space-y-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-carbon">
                    {title}
                </h2>
                <p className="text-lg text-gray-500">
                    {subtitle}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {options.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => onSelect(opt.value)}
                        className={cn(
                            "px-8 py-4 rounded-xl font-bold transition-all w-full sm:w-auto",
                            opt.type === 'primary'
                                ? "bg-brand-red text-white hover:bg-red-700"
                                : "bg-white text-carbon border-2 border-clay hover:border-carbon"
                        )}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

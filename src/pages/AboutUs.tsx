import { useRef } from 'react';
import { Flame, Wine, BellRing, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '../i18n';

const roleIcons = [Flame, Wine, BellRing];

const archivePhotos = [
    { src: '/about/bartender.png', label: 'Flaming Drinks at the Bar' },
    { src: '/about/cellar.png', label: 'Breaking Down Crates in the Paris Cellar' },
    { src: '/about/kitchen-line.png', label: 'Two Cooks Working the Wok' },
    { src: '/about/kitchen-torch.png', label: 'Chef with the Blowtorch' },
];

interface AboutUsProps {
    onOpenModal?: () => void;
}

export function AboutUs({ onOpenModal }: AboutUsProps) {
    const { t } = useI18n();
    const sliderRef = useRef<HTMLDivElement>(null);

    const scrollSlider = (amount: number) => {
        sliderRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col w-full">
            {/* Hero */}
            <section className="py-24 md:py-32 border-b border-clay">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 italic">
                        {t.about.heroHeadline}
                    </h1>
                    <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        {t.about.heroSubtext}
                    </p>
                </div>
            </section>

            {/* The "Every Role" Philosophy — Battle Tested */}
            <section className="py-24 bg-carbon text-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-red mb-4 block">
                                {t.about.rolesLabel}
                            </span>
                            <h2 className="text-4xl font-serif font-bold mb-8">
                                {t.about.rolesTitle}
                                <span className="text-brand-red">{t.about.rolesTitleHighlight}</span>
                            </h2>
                            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                                {t.about.rolesSubtext}
                            </p>

                            <div className="space-y-8">
                                {t.about.roles.map((role, i) => {
                                    const Icon = roleIcons[i];
                                    return (
                                        <div key={i} className="flex items-start space-x-5">
                                            <div className="w-12 h-12 rounded-xl border border-brand-red/30 flex items-center justify-center flex-shrink-0 text-brand-red bg-brand-red/5">
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">{role.label}</h4>
                                                <p className="text-sm text-gray-400">{role.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Founder Quote Card */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-red rounded-3xl blur-[80px] opacity-10" />
                            <div className="bg-white/5 backdrop-blur-sm p-12 rounded-3xl border border-white/10 text-center relative z-10">
                                <Quote className="w-10 h-10 text-brand-red mx-auto mb-6" />
                                <p className="text-2xl font-serif italic mb-8 leading-relaxed">
                                    {t.about.founderQuote}
                                </p>
                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">
                                    {t.about.founderLabel}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Global Resume Map */}
            <section className="py-24 bg-paper border-b border-clay">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16 text-center">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
                            {t.about.mapLabel}
                        </span>
                        <h2 className="text-3xl font-serif font-bold mt-4">{t.about.mapTitle}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {t.about.locations.map((loc, i) => (
                            <div
                                key={i}
                                className="p-8 bg-white border border-clay rounded-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-red"
                            >
                                <h3 className="font-bold text-xl mb-1">{loc.city}</h3>
                                <p className="text-[10px] text-brand-red font-bold uppercase mb-4 tracking-widest">{loc.role}</p>
                                <p className="text-sm text-gray-500 leading-relaxed">{loc.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Archive Slider */}
            <section className="py-24 bg-paper">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                {t.about.archiveLabel}
                            </span>
                            <h3 className="text-3xl font-serif font-bold mt-2 italic">
                                {t.about.archiveTitle}
                            </h3>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => scrollSlider(-400)}
                                className="w-12 h-12 rounded-full border border-clay flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scrollSlider(400)}
                                className="w-12 h-12 rounded-full border border-clay flex items-center justify-center hover:bg-white transition-colors cursor-pointer"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={sliderRef}
                        className="flex space-x-6 overflow-x-auto pb-12 snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {archivePhotos.map((photo, i) => (
                            <div
                                key={i}
                                className="snap-center flex-shrink-0 w-[85%] max-w-[450px] rounded-3xl aspect-[4/5] relative overflow-hidden group border border-clay shadow-sm"
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.label}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-carbon/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                <span className="absolute bottom-4 left-4 text-white text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    {photo.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Call to Trust */}
            <section className="py-24 bg-paper">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-serif font-bold mb-6 italic">{t.about.ctaHeadline}</h2>
                    <p className="text-gray-500 mb-10 leading-relaxed">{t.about.ctaSubtext}</p>
                    <div className="flex justify-center">
                        <button
                            onClick={onOpenModal}
                            className="bg-brand-red text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-red-600 transition-all cursor-pointer"
                        >
                            {t.about.ctaButton}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

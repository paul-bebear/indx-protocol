import { Bot, Video, Mic, Gem, BellRing } from 'lucide-react';
import { useI18n } from '../i18n';

const icons = [Bot, Video, Mic, Gem, BellRing];

export function DiscoveryPathsSection() {
    const { t } = useI18n();

    return (
        <section id="discovery" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl font-serif font-bold mb-6 italic">{t.discovery.title}</h2>
                    <p className="text-gray-500 text-lg">{t.discovery.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {t.discovery.paths.map((path, i) => {
                        const Icon = icons[i];
                        return (
                            <div
                                key={i}
                                className="p-8 border border-clay rounded-3xl hover:border-brand-red transition-all group"
                            >
                                <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center text-brand-red mb-6 group-hover:bg-brand-red group-hover:text-white transition-all">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-lg mb-2">{path.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">{path.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

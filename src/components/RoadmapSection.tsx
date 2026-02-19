import { useI18n } from '../i18n';

const borderColors = ['border-brand-red', 'border-brand-amber', 'border-carbon'];
const numbers = ['01', '02', '03'];

export function RoadmapSection() {
    const { t } = useI18n();

    return (
        <section id="roadmap" className="py-24 bg-white border-t border-clay">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-serif font-bold text-center mb-20">{t.roadmap.title}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {t.roadmap.phases.map((phase, i) => (
                        <div key={i} className="relative">
                            <div className="text-8xl font-serif font-bold text-stone-100 absolute -top-10 -left-4 -z-10 select-none">
                                {numbers[i]}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{phase.title}</h3>
                            <p className="text-gray-500 text-sm mb-6 leading-relaxed">{phase.description}</p>
                            <div className={`bg-stone-50 p-4 rounded-xl border-l-4 ${borderColors[i]}`}>
                                <p className="text-xs font-bold text-carbon">{phase.outcomeLabel}</p>
                                <p className="text-xs text-gray-500 italic">{phase.outcome}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

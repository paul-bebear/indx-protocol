import { useI18n } from '../i18n';

export function InvisibleGapSection() {
    const { t } = useI18n();
    const invisibleItems = t.invisibleGap.invisibleItems.split('\n');
    const indexableItems = t.invisibleGap.indexableItems.split('\n');

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-carbon text-white p-10 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl select-none">👻</div>
                    <div className="max-w-2xl relative z-10">
                        <h3 className="text-3xl font-serif font-bold mb-4">{t.invisibleGap.title}</h3>
                        <p className="text-lg text-gray-400 mb-6">
                            {t.invisibleGap.subtitle} <strong>{t.invisibleGap.subtitleBold}</strong>.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="border-l-2 border-brand-red pl-4">
                                <span className="text-xs font-bold uppercase tracking-widest text-brand-red">{t.invisibleGap.invisibleLabel}</span>
                                <p className="text-sm mt-1">
                                    {invisibleItems.map((item, i) => (
                                        <span key={i}>{item}{i < invisibleItems.length - 1 && <br />}</span>
                                    ))}
                                </p>
                            </div>
                            <div className="border-l-2 border-green-500 pl-4">
                                <span className="text-xs font-bold uppercase tracking-widest text-green-500">{t.invisibleGap.indexableLabel}</span>
                                <p className="text-sm mt-1">
                                    {indexableItems.map((item, i) => (
                                        <span key={i}>{item}{i < indexableItems.length - 1 && <br />}</span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

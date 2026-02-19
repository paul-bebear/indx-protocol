import { useState } from 'react';
import { useI18n } from '../i18n';

interface AuditCTASectionProps {
    onSubmit?: (url: string) => void;
}

export function AuditCTASection({ onSubmit }: AuditCTASectionProps) {
    const [url, setUrl] = useState('');
    const { t } = useI18n();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(url);
    };

    return (
        <section id="audit" className="py-32 bg-brand-red relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">
                    {t.cta.headline}
                </h2>
                <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
                    {t.cta.subtitle}
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-2 rounded-full flex flex-col md:flex-row shadow-2xl max-w-lg mx-auto overflow-hidden"
                >
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder={t.cta.placeholder}
                        className="flex-grow px-6 py-4 text-carbon focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="bg-carbon text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-black transition-all cursor-pointer"
                    >
                        {t.cta.button}
                    </button>
                </form>

                <p className="mt-8 text-white/60 text-xs font-medium uppercase tracking-widest italic">
                    {t.cta.tagline}
                </p>
            </div>

            {/* Overlays */}
            <div className="absolute inset-0 bg-black opacity-10 pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-[100px]" />
        </section>
    );
}

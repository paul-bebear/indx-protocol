import { NavLink } from 'react-router-dom';
import { useI18n } from '../i18n';

export function Footer() {
    const { t } = useI18n();

    return (
        <footer className="bg-carbon text-white py-20">
            <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-serif italic mb-6">{t.footer.quote}</h2>
                <p className="text-sm uppercase tracking-widest text-brand-red font-bold mb-10">{t.footer.missionLabel}</p>
                <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                    <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
                    <NavLink to="/about" className="text-gray-400 hover:text-brand-red transition-colors uppercase tracking-widest font-bold">
                        {t.footer.missionLabel}
                    </NavLink>
                    <p>{t.footer.tagline}</p>
                </div>
            </div>
        </footer>
    );
}

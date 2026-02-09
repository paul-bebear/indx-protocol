import { useNavigate, useLocation } from 'react-router-dom';

export function Footer() {
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (sectionId: string) => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                element?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="py-12 px-6 border-t border-border bg-background-muted">
            <div className="container-max">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-serif font-semibold text-brand-primary">Indexable</span>
                        <span className="text-xs text-text-muted font-medium bg-white px-2 py-0.5 rounded-full border border-border">Pro</span>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-text-muted">
                        <button onClick={() => scrollToSection('how-it-works')} className="hover:text-text transition-colors">
                            How It Works
                        </button>
                        <button onClick={() => scrollToSection('pricing')} className="hover:text-text transition-colors">
                            Pricing
                        </button>
                        <a href="mailto:paul@indexable.pro" className="hover:text-text transition-colors">Contact</a>
                    </div>

                    <p className="text-sm text-text-muted">
                        © {new Date().getFullYear()} Indexable.Pro
                    </p>
                </div>
            </div>
        </footer>
    );
}

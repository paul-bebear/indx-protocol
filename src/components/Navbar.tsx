import { useState, useEffect } from 'react';
import { NavLink as RouterNavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { cn } from '../lib/utils';
import { useI18n, localeLabels, type Locale } from '../i18n';

interface NavbarProps {
    onOpenModal?: () => void;
}

const locales: Locale[] = ['en', 'fr', 'it'];

export function Navbar({ onOpenModal }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { locale, setLocale, t } = useI18n();

    const navLinks = [
        { label: t.nav.the5Paths, sectionId: 'discovery' },
        { label: t.nav.operations, sectionId: 'ops' },
        { label: t.nav.roadmap, sectionId: 'roadmap' },
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Close language dropdown on outside click
    useEffect(() => {
        if (!langOpen) return;
        const handleClick = () => setLangOpen(false);
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [langOpen]);

    const handleCTAClick = () => {
        setIsOpen(false);
        onOpenModal?.();
    };

    const scrollToSection = (sectionId: string) => {
        setIsOpen(false);

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
        <>
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-6 lg:px-8 transition-all duration-200",
                scrolled
                    ? "bg-paper/90 backdrop-blur-md border-b border-clay shadow-sm"
                    : "bg-paper"
            )}>
                {/* Logo */}
                <div className="flex items-center gap-2 z-50">
                    <div className="w-10 h-10 bg-carbon flex items-center justify-center rounded-lg">
                        <span className="text-white font-bold text-xl">I</span>
                    </div>
                    <RouterNavLink to="/" className="text-2xl font-serif font-bold tracking-tight text-carbon hover:opacity-80 transition-opacity">
                        Indexable<span className="text-brand-red">.pro</span>
                    </RouterNavLink>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.sectionId}
                            onClick={() => scrollToSection(link.sectionId)}
                            className="nav-link-style cursor-pointer"
                        >
                            {link.label}
                        </button>
                    ))}
                    <RouterNavLink
                        to="/about"
                        className={({ isActive }) => cn(
                            "font-serif italic text-sm border-b-2 pb-0.5 transition-all cursor-pointer",
                            isActive
                                ? "text-brand-red border-brand-red"
                                : "text-brand-red/70 border-transparent hover:border-brand-red hover:text-brand-red"
                        )}
                    >
                        {t.nav.ourStory}
                    </RouterNavLink>
                </div>

                {/* CTA + Language Switcher */}
                <div className="flex items-center gap-3">
                    {/* Language Switcher */}
                    <div className="relative">
                        <button
                            onClick={(e) => { e.stopPropagation(); setLangOpen(!langOpen); }}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-clay text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-carbon hover:border-carbon transition-all cursor-pointer"
                        >
                            <Globe className="w-3.5 h-3.5" />
                            {localeLabels[locale]}
                        </button>
                        {langOpen && (
                            <div className="absolute right-0 top-full mt-2 bg-white border border-clay rounded-xl shadow-lg overflow-hidden min-w-[80px]">
                                {locales.map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => { setLocale(l); setLangOpen(false); }}
                                        className={cn(
                                            "w-full px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-left transition-colors cursor-pointer",
                                            l === locale
                                                ? "bg-brand-red/10 text-brand-red"
                                                : "text-gray-500 hover:bg-stone-50 hover:text-carbon"
                                        )}
                                    >
                                        {localeLabels[l]}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleCTAClick}
                        className="hidden md:flex bg-carbon text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-red transition-all items-center justify-center cursor-pointer"
                    >
                        {t.nav.ctaButton}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-500 hover:text-carbon transition-colors z-50 focus:outline-none cursor-pointer"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-paper pt-24 px-6 md:hidden shadow-xl"
                    >
                        <div className="flex flex-col gap-6 text-lg font-medium">
                            {navLinks.map((link) => (
                                <button
                                    key={link.sectionId}
                                    onClick={() => scrollToSection(link.sectionId)}
                                    className="py-2 border-b border-clay text-left text-gray-500 hover:text-brand-red cursor-pointer"
                                >
                                    {link.label}
                                </button>
                            ))}

                            <RouterNavLink
                                to="/about"
                                onClick={() => setIsOpen(false)}
                                className="py-2 border-b border-clay text-left text-brand-red font-serif italic hover:opacity-80 cursor-pointer"
                            >
                                {t.nav.ourStory} →
                            </RouterNavLink>

                            {/* Mobile Language Selector */}
                            <div className="flex gap-2 py-2">
                                {locales.map((l) => (
                                    <button
                                        key={l}
                                        onClick={() => setLocale(l)}
                                        className={cn(
                                            "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer transition-all",
                                            l === locale
                                                ? "bg-brand-red text-white"
                                                : "bg-clay text-gray-500 hover:bg-carbon hover:text-white"
                                        )}
                                    >
                                        {localeLabels[l]}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={handleCTAClick}
                                className="mt-4 bg-carbon text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-red transition-all cursor-pointer"
                            >
                                {t.nav.ctaButton}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

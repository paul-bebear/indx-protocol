import { useState, useEffect } from 'react';
import { NavLink as RouterNavLink, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
    onOpenModal?: () => void;
}

export function Navbar({ onOpenModal }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

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
                "fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-8 transition-all duration-200",
                scrolled ? "bg-white/95 backdrop-blur-sm border-b border-border shadow-sm" : "bg-white"
            )}>
                {/* Logo */}
                <div className="flex items-center gap-2 z-50">
                    <RouterNavLink to="/" className="text-xl font-bold text-brand-primary hover:opacity-80 transition-opacity">
                        Indexable
                    </RouterNavLink>
                    <span className="text-xs text-text-muted font-medium bg-gray-100 px-2 py-0.5 rounded-full">Pro</span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <button
                        onClick={() => scrollToSection('how-it-works')}
                        className="text-sm font-medium transition-colors duration-200 hover:text-brand-primary text-text-muted"
                    >
                        How It Works
                    </button>
                    <button
                        onClick={() => scrollToSection('pricing')}
                        className="text-sm font-medium transition-colors duration-200 hover:text-brand-primary text-text-muted"
                    >
                        Pricing
                    </button>
                </div>

                {/* CTA Button */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleCTAClick}
                        className="hidden md:flex h-10 px-6 rounded-lg bg-brand-accent text-white font-medium text-sm hover:bg-brand-accent-hover transition-all items-center justify-center shadow-sm hover:shadow-md"
                    >
                        Free Visibility Check
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-text-muted hover:text-text transition-colors z-50 focus:outline-none"
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
                        className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden shadow-xl"
                    >
                        <div className="flex flex-col gap-6 text-lg font-medium">
                            <button
                                onClick={() => scrollToSection('how-it-works')}
                                className="py-2 border-b border-border text-left text-text-muted hover:text-brand-primary"
                            >
                                How It Works
                            </button>
                            <button
                                onClick={() => scrollToSection('pricing')}
                                className="py-2 border-b border-border text-left text-text-muted hover:text-brand-primary"
                            >
                                Pricing
                            </button>

                            <button
                                onClick={handleCTAClick}
                                className="mt-4 h-12 px-8 rounded-lg bg-brand-accent text-white font-semibold text-sm hover:bg-brand-accent-hover transition-all flex items-center justify-center"
                            >
                                Free Visibility Check
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

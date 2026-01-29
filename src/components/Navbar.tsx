import { useState, useEffect } from 'react';
import type { ComponentProps } from 'react';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useScrollPastHero } from '../hooks/useScrollPastHero';

interface NavLinkProps extends ComponentProps<typeof RouterNavLink> {
    children: React.ReactNode;
}

function NavLink({ children, className, ...props }: NavLinkProps) {
    return (
        <RouterNavLink
            className={({ isActive }) => cn(
                "text-sm font-medium transition-colors duration-200 hover:text-brand-cyan",
                isActive ? "text-brand-cyan" : "text-gray-400",
                className
            )}
            {...props}
        >
            {children}
        </RouterNavLink>
    );
}

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const hasScrolledPastHero = useScrollPastHero();

    // Dynamic engineer count based on time of day
    const getEngineerCount = () => {
        const hour = new Date().getHours();
        // 9 AM - 6 PM: 3-5 engineers
        if (hour >= 9 && hour < 18) {
            return Math.floor(Math.random() * 3) + 3; // 3-5
        }
        // After hours: 1-2 engineers
        return Math.floor(Math.random() * 2) + 1; // 1-2
    };

    const [engineerCount] = useState(getEngineerCount);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Handle Talk to an Expert click
    const handleTalkToExpert = (e: React.MouseEvent) => {
        e.preventDefault();

        // Check if scan has been run by looking for email input in scanner end-state
        const emailInput = document.querySelector('input[placeholder="engineer@company.com"]');

        if (emailInput) {
            // Scan has been run, scroll to email input
            emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            (emailInput as HTMLInputElement).focus();
        } else {
            // No scan yet, scroll to scanner input and highlight
            const scannerInput = document.querySelector('input[placeholder*="brand URL"]');
            if (scannerInput) {
                scannerInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                (scannerInput as HTMLInputElement).focus();
                // Add pulse animation
                scannerInput.classList.add('animate-pulse-cyan');
                setTimeout(() => {
                    scannerInput.classList.remove('animate-pulse-cyan');
                }, 2000);
            }
        }
    };

    return (
        <>
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 h-[60px] border-b border-white/10 bg-black/80 backdrop-blur-md flex items-center justify-between px-6 lg:px-8",
                hasScrolledPastHero && "site-header--with-cta"
            )}>
                <div className="flex items-center gap-2 z-50">
                    <RouterNavLink to="/" className="font-mono text-brand-cyan font-semibold tracking-wider hover:opacity-80 transition-opacity">
                        [ INDX ]
                    </RouterNavLink>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLink to="/">Protocol</NavLink>
                    <NavLink to="/use-cases">Use Cases</NavLink>
                    <NavLink to="/verification">Security</NavLink>
                </div>

                <div className="flex items-center gap-4">
                    {/* Talk to an Expert CTA - appears after scrolling past hero */}
                    <button
                        onClick={handleTalkToExpert}
                        className="header-cta hidden md:flex items-center justify-center h-10 rounded-full bg-brand-cyan text-black font-semibold text-sm hover:bg-cyan-200 transition-all shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] active:scale-95 whitespace-nowrap cursor-pointer"
                        aria-label="Talk to an Expert"
                    >
                        Talk to an Expert
                    </button>

                    {/* Lab Status Widget */}
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                        <span className="text-emerald-400">LAB STATUS: <span className="text-white">ACTIVE</span></span>
                        <span className="text-gray-600">|</span>
                        <span className="text-gray-400">UPTIME: <span className="text-emerald-400">99.98%</span></span>
                        <span className="text-gray-600">|</span>
                        <span className="text-gray-400">ENGINEERS: <span className="text-white">{engineerCount}</span></span>
                    </div>

                    {/* Status Indicator */}
                    <div className="hidden md:block lg:hidden h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(0,255,255,0.5)] animate-pulse-slow"></div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gray-400 hover:text-white transition-colors z-50 focus:outline-none"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6 text-xl font-medium">
                            <NavLink to="/" onClick={() => setIsOpen(false)} className="py-2 border-b border-white/10">Protocol</NavLink>
                            <NavLink to="/use-cases" onClick={() => setIsOpen(false)} className="py-2 border-b border-white/10">Use Cases</NavLink>
                            <NavLink to="/verification" onClick={() => setIsOpen(false)} className="py-2 border-b border-white/10">Security</NavLink>

                            {/* Mobile CTA - always visible in mobile menu */}
                            <a
                                href="/contact"
                                className="mt-4 h-12 px-8 rounded-full bg-brand-cyan text-black font-semibold text-sm hover:bg-cyan-200 transition-all shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] active:scale-95 flex items-center justify-center"
                                onClick={() => setIsOpen(false)}
                            >
                                Talk to an Expert
                            </a>
                        </div>

                        <div className="mt-12 p-4 rounded bg-white/5 border border-white/10">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(0,255,255,0.5)] animate-pulse-slow"></div>
                                <span className="text-sm font-mono text-brand-cyan">SYSTEM OPERATIONAL</span>
                            </div>
                            <p className="text-xs text-gray-500">v0.9.4-beta</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

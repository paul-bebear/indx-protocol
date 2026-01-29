import { Link } from 'react-router-dom';

// Monochrome X (Twitter) icon
function XIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

// Monochrome LinkedIn icon
function LinkedInIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

const FOOTER_LINKS = {
    protocol: [
        { label: 'Ledger', href: '/ledger' },
        { label: 'Manifesto', href: '/#diagnosis' },
        { label: 'Status', href: '/status' },
    ],
    lab: [
        { label: 'Get Tested', href: '/#scanner' },
        { label: 'Technical Audit', href: '/test' },
        { label: 'Deployment', href: '/#prescription' },
    ],
    legal: [
        { label: 'Terms of Handshake', href: '/terms' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Node Agreement', href: '/node-agreement' },
    ],
};

export function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-black/60 backdrop-blur-md mt-20">
            <div className="max-w-6xl mx-auto px-6 py-16">

                {/* 4-Column Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">

                    {/* Protocol Column */}
                    <div>
                        <h4 className="text-brand-cyan font-mono text-xs uppercase tracking-wider mb-4">
                            Protocol
                        </h4>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.protocol.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-400 text-sm hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Lab Column */}
                    <div>
                        <h4 className="text-brand-cyan font-mono text-xs uppercase tracking-wider mb-4">
                            Lab
                        </h4>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.lab.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-400 text-sm hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div>
                        <h4 className="text-brand-cyan font-mono text-xs uppercase tracking-wider mb-4">
                            Legal
                        </h4>
                        <ul className="space-y-3">
                            {FOOTER_LINKS.legal.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-400 text-sm hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Column */}
                    <div>
                        <h4 className="text-brand-cyan font-mono text-xs uppercase tracking-wider mb-4">
                            Social
                        </h4>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="X (Twitter)"
                            >
                                <XIcon className="w-5 h-5" />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label="LinkedIn"
                            >
                                <LinkedInIcon className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-brand-cyan font-semibold text-sm">[ INDX ]</span>
                        <span className="text-gray-600 text-xs font-mono">// Unified Context Protocol</span>
                    </div>
                    <p className="text-gray-600 text-xs font-mono">
                        © {new Date().getFullYear()} Indexable.Pro — Node #41 // UCP_VERIFIED
                    </p>
                </div>
            </div>
        </footer>
    );
}

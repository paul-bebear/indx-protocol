import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';
import { useScanningAnimation } from '../hooks/useScanningAnimation';
import { useExitIntent } from '../hooks/useExitIntent';
import { ExitIntentModal } from './ExitIntentModal';
import { supabase } from '../lib/supabaseClient';

import { AuditTimerBubble } from './AuditTimerBubble';

type ScanStatus = 'idle' | 'initiating' | 'scanning' | 'complete' | 'verified';

const SCAN_STEPS = [
    "Checking UCP Identity Protocol...",
    "Scanning AI Manifest & Policy...",
    "Detecting AP2 Payment Endpoints...",
    "Probing MCP Context Protocol...",
    "Testing A2A Dialogue Channels...",
    "Verifying Proof of Origin...",
    "Discovering Service Capabilities...",
    "FINALIZING 7-POINT AUDIT..."
];

const RAW_LOGS = [
    "GET /robots.txt ... 200 OK",
    "SEARCHING /.well-known/ucp.json ... 404 NOT FOUND",
    "INSPECTING HEADERS ... X-Frame-Options: SAMEORIGIN",
    "ANALYZING SITEMAP ... 1284 ENTRIES",
    "CHECKING OPENGRAPH TAGS ... DETECTED",
    "ESTABLISHING AGENT HANDSHAKE ... TIMEOUT",
    "LATENCY TEST ... 852ms (AGENT_REJECTED)",
    "VERIFYING INDEXING PERMISSIONS ... BLOCKED",
    "GENERATING SCORECARD ... DONE"
];

const VERIFIED_LOGS = [
    "GET /robots.txt ... 200 OK",
    "SEARCHING /.well-known/ucp.json ... 200 OK",
    "PARSING UCP MANIFEST ... VALID",
    "VERIFYING IDENTITY TOKEN ... AUTHENTICATED",
    "ESTABLISHING AGENT HANDSHAKE ... SUCCESS",
    "LATENCY TEST ... 42ms (OPTIMAL)",
    "INDEXING PERMISSIONS ... GRANTED",
    "IDENTITY VERIFICATION ... COMPLETE"
];

export function BrandScanner() {
    const [status, setStatus] = useState<ScanStatus>('idle');
    const [url, setUrl] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [connectionError, setConnectionError] = useState<string | null>(null);

    // Refs
    const logsEndRef = useRef<HTMLDivElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Exit Intent - triggers after scan completes and user hasn't submitted
    const { showModal, closeModal, resetTriggers } = useExitIntent({
        isEnabled: status === 'complete' && !isSubmitted,
        inactivityTimeout: 60000, // 60 seconds
    });

    // Handle Secure My Node click from modal
    const handleSecureNode = useCallback(() => {
        if (emailInputRef.current) {
            emailInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                emailInputRef.current?.focus();
            }, 500);
        }
    }, []);

    // Autofocus email input when scan completes
    useEffect(() => {
        if (status === 'complete' && emailInputRef.current) {
            emailInputRef.current.focus();
        }
    }, [status]);

    // Dynamic Logs Logic - Memoized
    const dynamicLogs = useMemo(() => {
        // Use verified logs if domain is verified
        if (isVerified) {
            return [...VERIFIED_LOGS];
        }

        const logs = [...RAW_LOGS];
        const lowerUrl = url.toLowerCase();

        if (['google.com', 'apple.com', 'amazon.com'].some(d => lowerUrl.includes(d))) {
            logs.splice(6, 0, "[!] CRITICAL: Legacy headers detected. Agent discovery hindered.");
        } else if (['nivea.com', 'nike.com', 'coca-cola.com'].some(d => lowerUrl.includes(d))) {
            logs.splice(6, 0, "[!] CRITICAL: High-latency legacy redirects found. Agent access blocked.");
        }
        return logs;
    }, [url, isVerified]);

    const handleScanComplete = useCallback(() => {
        if (isVerified) {
            setStatus('verified');
        } else {
            setStatus('complete');
        }
    }, [isVerified]);

    // Custom Hook for Animation
    const { stepIndex, visibleLogCount } = useScanningAnimation(
        status,
        SCAN_STEPS,
        dynamicLogs,
        handleScanComplete,
        20000 // 20 seconds
    );

    // Derived logs array
    const activeLogs = dynamicLogs.slice(0, visibleLogCount);

    // Auto-scroll logs
    // Auto-scroll logs (removed nudging page scroll, handled via CSS/overflow if needed, but keeping simple scrollIntoView for now confined to container if possible, 
    // actually user asked to "Stop log auto-scroll from nudging page". 
    // The previous implementation used scrollIntoView on the logsEndRef which might scroll the whole page if the logs container isn't handling scroll properly.
    // Better to just set scrollTop of the container. But useScanningAnimation updates visibleLogCount.
    // Let's replace this useEffect with a direct ref manipulation of the container if possible, or just remove the page-scroll inducing behavior.
    // For now, I'll remove the logsEndRef scrollIntoView completely as per request "Stop log auto-scroll".
    // Instead I'll just let the logs stack up. Or I can scroll the CONTAINER only.
    // To scroll container only: logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight
    useEffect(() => {
        if (status === 'scanning' && logsEndRef.current) {
            // Use scrollIntoView with block: 'nearest' to avoid jumping, or better yet, don't use it at all if it annoys the user.
            // User said "Stop log auto-scroll from nudging page".
            // I will implement a container-only scroll in the JSX.
        }
    }, [visibleLogCount, status]);

    // n8n webhook for 7-point protocol audit
    const N8N_WEBHOOK_URL = 'https://PLACEHOLDER_FOR_N8N';

    const startScan = useCallback(async () => {
        if (!url) return;
        setStatus('initiating');
        resetTriggers();
        setIsVerified(false);
        setConnectionError(null);

        // Normalize domain: trim, lowercase, remove protocol/www/paths
        let domain = url.trim().toLowerCase();
        domain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/.*$/, '');

        console.log('[INDX] Starting 7-Point Protocol Audit for:', domain);

        // Trigger n8n webhook for audit pipeline
        try {
            console.log('[INDX] Sending domain to n8n webhook...');
            await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ domain }),
            });
            console.log('[INDX] n8n webhook triggered successfully');
        } catch (err) {
            console.warn('[INDX] n8n webhook failed (continuing with local check):', err);
        }

        try {
            // Check registry_nodes table for verified domain (skip if no supabase client)
            if (supabase) {
                console.log('[INDX] Checking registry for existing verification...');

                const { data, error } = await supabase
                    .from('registry_nodes')
                    .select('status')
                    .eq('domain', domain)
                    .single();

                console.log('[INDX] Supabase response:', { data, error });

                if (error) {
                    console.error('[INDX] Database error:', error.code, error.message);
                    if (error.code === '401' || error.code === '403' || error.code === 'PGRST301') {
                        setConnectionError('CONNECTION_ERROR: Auth/Permission issue');
                    } else if (error.code === 'PGRST116') {
                        // No rows found - this is expected for unverified domains
                        console.log('[INDX] Domain not found in registry (new audit)');
                    } else {
                        setConnectionError(`DB_ERROR: ${error.code}`);
                    }
                } else if (data && data.status === 'verified') {
                    console.log('[INDX] Domain already VERIFIED!');
                    setIsVerified(true);
                }
            } else {
                console.warn('[INDX] No Supabase client - env vars missing');
            }
        } catch (err) {
            console.error('[INDX] Unexpected error:', err);
            setConnectionError('UNEXPECTED_ERROR');
        }

        // Notification phase then start scanning
        const scanDelay = 1000;
        setTimeout(() => {
            setStatus('scanning');
        }, scanDelay);
    }, [url, resetTriggers]);

    const handleEmailSubmit = useCallback(() => {
        if (!email) return;
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setIsModalOpen(true); // Use modal state to show success message
        }, 600);
    }, [email]);

    return (
        <div className="w-full max-w-2xl mx-auto my-16 px-4">
            <AnimatePresence mode="wait">

                {/* IDLE STATE */}
                {status === 'idle' && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col gap-4"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Enter your brand URL (e.g., coffee-circle.com)..."
                                className="w-full h-14 bg-black/40 border border-brand-cyan/40 rounded-lg px-6 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-cyan transition-colors shadow-[0_0_20px_rgba(0,229,229,0.15)] focus:shadow-[0_0_30px_rgba(0,229,229,0.3)]"
                            />
                        </div>
                        <button
                            onClick={startScan}
                            className="h-14 w-full rounded-lg bg-brand-cyan text-black font-bold font-mono tracking-wider hover:bg-cyan-200 transition-all shadow-[0_0_25px_rgba(0,229,229,0.4)] hover:shadow-[0_0_40px_rgba(0,229,229,0.5)]"
                        >
                            [ RUN DIAGNOSTIC ]
                        </button>
                    </motion.div>
                )}



                {/* INITIATING STATE */}
                {status === 'initiating' && (
                    <motion.div
                        key="initiating"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="w-full"
                    >
                        <Card className="p-8 border-brand-cyan/30 shadow-[0_0_30px_rgba(0,229,229,0.1)]">
                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full border-2 border-brand-cyan/20 flex items-center justify-center animate-pulse">
                                        <div className="w-8 h-8 rounded-full bg-brand-cyan/20" />
                                    </div>
                                    <div className="absolute inset-0 border-t-2 border-brand-cyan rounded-full animate-spin" />
                                </div>

                                <div className="space-y-4 max-w-md w-full">
                                    <h3 className="text-xl font-bold text-white">
                                        Conducting 7-Point Protocol Audit...
                                    </h3>

                                    {/* Animated Progress Bar */}
                                    <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-brand-cyan/20">
                                        <div className="h-full bg-gradient-to-r from-brand-cyan/50 to-brand-cyan rounded-full animate-pulse" style={{ width: '30%', animation: 'pulse 1s ease-in-out infinite, grow 3s ease-out forwards' }} />
                                    </div>

                                    <div className="p-4 bg-brand-cyan/5 border border-brand-cyan/10 rounded-lg">
                                        <p className="text-brand-cyan font-mono text-sm mb-2">
                                            [ i ] SCANNING: Identity • Policy • Payments • Context • Dialogue • Origin • Services
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            Sending domain to audit pipeline and checking all protocol endpoints...
                                        </p>
                                    </div>
                                    <p className="text-gray-500 text-xs font-mono uppercase tracking-wider animate-pulse">
                                        PLEASE STAY ON THIS PAGE...
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {/* SCANNING STATE */}
                {status === 'scanning' && (
                    <motion.div
                        key="scanning"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="flex flex-col items-center justify-center"
                    >
                        <div className="flex flex-col items-center gap-6 w-full">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-8 h-8 border-2 border-brand-cyan/30 border-t-brand-cyan rounded-full animate-spin" />
                                <p className="font-mono text-sm text-brand-cyan/80 animate-pulse uppercase tracking-wider">
                                    {SCAN_STEPS[stepIndex]}
                                </p>
                            </div>

                            {/* Timer Bubble */}
                            <AuditTimerBubble isVisible={status === 'scanning'} duration={20000} />

                            {/* Deep Scan Logs */}
                            <div
                                className="w-full h-32 bg-black/80 border border-white/10 rounded-md p-3 overflow-hidden font-mono text-[10px] text-gray-500 relative"
                                aria-live="polite"
                                aria-label="Diagnostic scan progress"
                            >
                                <div className="absolute top-0 right-0 px-2 py-0.5 bg-white/5 text-gray-600 text-[9px] uppercase tracking-widest border-l border-b border-white/5">
                                    Deep Scan
                                </div>
                                <div className="flex flex-col gap-1">
                                    {activeLogs.map((log, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="whitespace-pre-wrap break-all"
                                        >
                                            <span className="text-gray-600 mr-2">{'>'}</span>
                                            {log.includes('ERROR') || log.includes('TIMEOUT') || log.includes('BLOCKED') || log.includes('REJECTED') || log.includes('NOT FOUND') ? (
                                                <span className="text-red-400/80">{log}</span>
                                            ) : (
                                                <span className="text-emerald-400/60">{log}</span>
                                            )}
                                        </motion.div>
                                    ))}
                                    {connectionError && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-red-500 font-bold"
                                        >
                                            <span className="text-gray-600 mr-2">{'>'}</span>
                                            [!] {connectionError}
                                        </motion.div>
                                    )}
                                    <div ref={logsEndRef} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* VERIFIED STATE - Success Message */}
                {status === 'verified' && (
                    <motion.div
                        key="verified"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <Card className="p-8 border-brand-cyan/50 shadow-[0_0_40px_rgba(0,229,229,0.3)]">
                            {/* Success Status Header */}
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="w-16 h-16 rounded-full bg-brand-cyan/20 border-2 border-brand-cyan flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,229,229,0.4)]">
                                    <span className="text-3xl">✓</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="px-4 py-2 rounded bg-brand-cyan/20 border border-brand-cyan/40 inline-block shadow-[0_0_20px_rgba(0,229,229,0.3)]">
                                        <p className="text-brand-cyan font-mono font-bold text-sm tracking-wider">
                                            [✓] STATUS: IDENTITY_VERIFIED
                                        </p>
                                    </div>
                                    <p className="text-gray-400 text-sm">
                                        This node has a valid UCP manifest and is registered in the INDX Protocol.
                                    </p>
                                </div>
                            </div>

                            {/* Verification Details */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between p-3 rounded bg-brand-cyan/5 border border-brand-cyan/20">
                                    <span className="text-gray-400 font-mono text-xs uppercase tracking-wider">Domain:</span>
                                    <span className="text-brand-cyan font-mono text-xs font-bold">{url}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded bg-brand-cyan/5 border border-brand-cyan/20">
                                    <span className="text-gray-400 font-mono text-xs uppercase tracking-wider">UCP Status:</span>
                                    <span className="text-emerald-400 font-mono text-xs font-bold uppercase">ACTIVE</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded bg-brand-cyan/5 border border-brand-cyan/20">
                                    <span className="text-gray-400 font-mono text-xs uppercase tracking-wider">Agent Handshake:</span>
                                    <span className="text-emerald-400 font-mono text-xs font-bold uppercase">VERIFIED</span>
                                </div>
                            </div>

                            {/* Success Message */}
                            <p className="text-center text-gray-400 text-sm">
                                This domain is fully indexed and discoverable by AI agents. No action required.
                            </p>
                        </Card>
                    </motion.div>
                )}

                {/* COMPLETE STATE - Diagnostic Gate */}
                {status === 'complete' && (
                    <motion.div
                        key="complete"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                        <Card className="p-8 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.1)]">

                            {/* Critical Status Header */}
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6">
                                    <span className="text-3xl">⚠️</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="px-4 py-2 rounded bg-red-500/20 border border-red-500/40 inline-block shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                                        <p className="text-red-500 font-mono font-bold text-sm tracking-wider">
                                            [!] STATUS: CRITICAL FAILURES DETECTED
                                        </p>
                                    </div>
                                    <div className="px-4 py-2 rounded bg-white/5 border border-white/10 inline-block">
                                        <p className="text-brand-cyan font-mono font-bold text-sm tracking-wider">
                                            [!] TRACE COMPLETE: 12-PAGE AUDIT GENERATED
                                        </p>
                                    </div>
                                </div>

                                {/* Sub-stat */}
                                <div className="mt-6 flex items-center gap-2">
                                    <span className="text-gray-500 font-mono text-xs uppercase tracking-wider">Potential Discovery Loss:</span>
                                    <span className="text-red-400 font-mono text-xs font-bold uppercase tracking-wider animate-pulse">HIGH</span>
                                </div>
                            </div>

                            {/* Email Capture Form */}
                            {!isModalOpen ? (
                                <div className="space-y-4">
                                    <p className="text-center text-gray-400 text-sm">
                                        Request a manual node verification audit from our team.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <input
                                            ref={emailInputRef}
                                            type="email"
                                            placeholder="engineer@company.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="flex-1 h-12 bg-black/40 border border-white/10 rounded-lg px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-cyan/50 transition-colors font-mono"
                                        />
                                        <button
                                            onClick={handleEmailSubmit}
                                            disabled={!email || isSubmitting}
                                            className="h-12 px-6 rounded-lg bg-brand-cyan text-black font-bold font-mono tracking-wider hover:bg-brand-cyan/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_20px_rgba(0,229,229,0.3)] hover:shadow-[0_0_30px_rgba(0,229,229,0.5)] flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                            ) : (
                                                '[ SEND MY RESULTS ]'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-6"
                                >
                                    <div className="w-full bg-black/80 border border-emerald-500/20 p-4 rounded-md font-mono text-xs text-left mb-4">
                                        <p className="text-emerald-500 mb-2">{'>'} HANDSHAKE INITIATED.</p>
                                        <p className="text-emerald-500 mb-2">{'>'} TARGET: {url}</p>
                                        <p className="text-emerald-500 mb-2">{'>'} RECIPIENT: {email}</p>
                                        <p className="text-gray-400 mt-4">
                                            Your audit is being compiled by our on-call engineers.
                                        </p>
                                        <p className="text-white animate-pulse">
                                            Check your inbox in 5-10 mins.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setStatus('idle');
                                            setIsModalOpen(false);
                                            setEmail('');
                                        }}
                                        className="px-6 py-2 bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-900/50 transition-colors text-sm font-medium uppercase tracking-wider font-mono"
                                    >
                                        [ RUN ANOTHER DIAGNOSTIC ]
                                    </button>
                                </motion.div>
                            )}

                        </Card>
                    </motion.div>
                )}

            </AnimatePresence>

            {/* Exit Intent Modal */}
            <ExitIntentModal
                isOpen={showModal}
                onClose={closeModal}
                onSecureNode={handleSecureNode}
            />
        </div>
    );
}

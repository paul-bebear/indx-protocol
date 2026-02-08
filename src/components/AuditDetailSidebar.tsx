import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ProtocolStackIcons } from './ProtocolStackIcons';
import type { RegistryNode } from '../types/audit';

interface AuditDetailSidebarProps {
    node: RegistryNode | null;
    isOpen: boolean;
    onClose: () => void;
}

export function AuditDetailSidebar({ node, isOpen, onClose }: AuditDetailSidebarProps) {
    if (!node) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-950 border-l border-white/10 z-50 overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-gray-950/95 backdrop-blur-sm border-b border-white/10 p-6 flex items-center justify-between">
                            <div>
                                <h2 className="text-white font-bold text-lg">{node.domain}</h2>
                                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mt-1">
                                    Audit Details
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Audit Score */}
                            <div className="text-center p-6 bg-gradient-to-b from-brand-cyan/10 to-transparent border border-brand-cyan/20 rounded-xl">
                                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">
                                    Audit Score
                                </p>
                                <p className="text-5xl font-bold text-brand-cyan">
                                    {node.audit_score}
                                    <span className="text-xl text-gray-500">/100</span>
                                </p>
                            </div>

                            {/* Protocol Stack */}
                            <div>
                                <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-4">
                                    Protocol Stack
                                </p>
                                <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                                    <ProtocolStackIcons flags={node} size="md" />

                                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
                                        <div className={`flex items-center gap-2 ${node.has_ucp ? 'text-emerald-400' : 'text-gray-600'}`}>
                                            <span className={`w-2 h-2 rounded-full ${node.has_ucp ? 'bg-emerald-400' : 'bg-gray-600'}`} />
                                            UCP Identity
                                        </div>
                                        <div className={`flex items-center gap-2 ${node.has_ai_manifest ? 'text-emerald-400' : 'text-gray-600'}`}>
                                            <span className={`w-2 h-2 rounded-full ${node.has_ai_manifest ? 'bg-emerald-400' : 'bg-gray-600'}`} />
                                            AI Manifest
                                        </div>
                                        <div className={`flex items-center gap-2 ${node.has_ap2 ? 'text-emerald-400' : 'text-gray-600'}`}>
                                            <span className={`w-2 h-2 rounded-full ${node.has_ap2 ? 'bg-emerald-400' : 'bg-gray-600'}`} />
                                            AP2 Payments
                                        </div>
                                        <div className={`flex items-center gap-2 ${node.has_mcp ? 'text-emerald-400' : 'text-gray-600'}`}>
                                            <span className={`w-2 h-2 rounded-full ${node.has_mcp ? 'bg-emerald-400' : 'bg-gray-600'}`} />
                                            MCP Context
                                        </div>
                                        <div className={`flex items-center gap-2 ${node.has_a2a ? 'text-emerald-400' : 'text-gray-600'}`}>
                                            <span className={`w-2 h-2 rounded-full ${node.has_a2a ? 'bg-emerald-400' : 'bg-gray-600'}`} />
                                            A2A Dialogue
                                        </div>
                                        <div className={`flex items-center gap-2 ${node.has_poh ? 'text-emerald-400' : 'text-gray-600'}`}>
                                            <span className={`w-2 h-2 rounded-full ${node.has_poh ? 'bg-emerald-400' : 'bg-gray-600'}`} />
                                            Proof of Origin
                                        </div>
                                        <div className={`flex items-center gap-2 ${node.has_services ? 'text-emerald-400' : 'text-gray-600'}`}>
                                            <span className={`w-2 h-2 rounded-full ${node.has_services ? 'bg-emerald-400' : 'bg-gray-600'}`} />
                                            Services
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Last Audited */}
                            {node.last_audited && (
                                <div>
                                    <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">
                                        Last Audited
                                    </p>
                                    <p className="text-white font-mono text-sm">
                                        {new Date(node.last_audited).toLocaleString()}
                                    </p>
                                </div>
                            )}

                            {/* Raw Audit Details */}
                            {node.audit_details && (
                                <div>
                                    <p className="text-gray-400 text-xs font-mono uppercase tracking-wider mb-2">
                                        Raw Audit Data
                                    </p>
                                    <pre className="bg-black/60 border border-white/10 rounded-lg p-4 overflow-x-auto text-xs font-mono text-gray-400">
                                        {JSON.stringify(node.audit_details, null, 2)}
                                    </pre>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

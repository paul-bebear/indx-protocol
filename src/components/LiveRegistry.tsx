import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, RefreshCw } from 'lucide-react';
import { Card } from './Card';
import { ProtocolStackIcons } from './ProtocolStackIcons';
import { AuditDetailSidebar } from './AuditDetailSidebar';
import { supabase } from '../lib/supabaseClient';
import type { RegistryNode } from '../types/audit';

interface LiveRegistryProps {
    limit?: number;
    showViewAll?: boolean;
}

export function LiveRegistry({ limit = 5, showViewAll = true }: LiveRegistryProps) {
    const [nodes, setNodes] = useState<RegistryNode[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedNode, setSelectedNode] = useState<RegistryNode | null>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const fetchNodes = async () => {
        if (!supabase) {
            console.warn('[LiveRegistry] No Supabase client');
            setLoading(false);
            return;
        }

        setLoading(true);
        const { data, error } = await supabase
            .from('registry_nodes')
            .select('*')
            .eq('status', 'verified')
            .order('audit_score', { ascending: false })
            .limit(limit);

        if (error) {
            console.error('[LiveRegistry] Fetch error:', error);
        } else {
            setNodes(data as RegistryNode[]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchNodes();
    }, [limit]);

    const handleRowClick = (node: RegistryNode) => {
        setSelectedNode(node);
        setSidebarOpen(true);
    };

    const getRankBadge = (index: number) => {
        if (index === 0) return <span className="text-yellow-400">🥇</span>;
        if (index === 1) return <span className="text-gray-300">🥈</span>;
        if (index === 2) return <span className="text-amber-600">🥉</span>;
        return <span className="text-gray-500 font-mono text-xs">#{index + 1}</span>;
    };

    return (
        <div className="w-full">
            <div className="mb-6 flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-brand-cyan" />
                    <h3 className="text-sm font-medium text-gray-400 font-mono uppercase tracking-wider">
                        Top Verified Nodes
                    </h3>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={fetchNodes}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="Refresh"
                    >
                        <RefreshCw className={`w-4 h-4 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                    {showViewAll && (
                        <Link to="/ledger" className="text-xs text-brand-cyan hover:text-cyan-300 transition-colors">
                            View Full Registry &rarr;
                        </Link>
                    )}
                </div>
            </div>

            <Card className="w-full !bg-transparent !border-0 !shadow-none !backdrop-blur-none">
                <div className="w-full overflow-hidden rounded-lg border border-white/10 bg-black/40 backdrop-blur-md">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/10 text-gray-500 font-mono text-xs uppercase tracking-wider">
                                <th className="px-4 py-4 font-normal w-12">Rank</th>
                                <th className="px-4 py-4 font-normal">Domain</th>
                                <th className="px-4 py-4 font-normal text-center">Protocol Stack</th>
                                <th className="px-4 py-4 font-normal text-right">Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300 font-mono text-xs relative">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        <div className="flex items-center justify-center gap-2">
                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                            Loading registry...
                                        </div>
                                    </td>
                                </tr>
                            ) : nodes.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                        No verified nodes found
                                    </td>
                                </tr>
                            ) : (
                                <AnimatePresence mode="popLayout" initial={false}>
                                    {nodes.map((node, index) => (
                                        <motion.tr
                                            layout
                                            key={node.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            onClick={() => handleRowClick(node)}
                                            className="group hover:bg-white/[0.04] transition-colors cursor-pointer"
                                        >
                                            <td className="px-4 py-4 text-center">
                                                {getRankBadge(index)}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className="font-medium text-white group-hover:text-brand-cyan transition-colors">
                                                    {node.domain}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex justify-center">
                                                    <ProtocolStackIcons flags={node} size="sm" />
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-right">
                                                <span className={`font-bold ${node.audit_score >= 80 ? 'text-emerald-400' :
                                                        node.audit_score >= 50 ? 'text-yellow-400' :
                                                            'text-red-400'
                                                    }`}>
                                                    {node.audit_score}
                                                </span>
                                                <span className="text-gray-600">/100</span>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="mt-4 text-center">
                <p className="text-xs text-gray-600 font-mono">
                    Displaying top {nodes.length} verified nodes by audit score
                </p>
            </div>

            <AuditDetailSidebar
                node={selectedNode}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
        </div>
    );
}

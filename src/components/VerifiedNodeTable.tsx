import { motion } from 'framer-motion';

import { Check, Loader2 } from 'lucide-react';
import { Card } from './Card';
import type { LedgerItem } from '../types';

interface VerifiedNodeTableProps {
    items: LedgerItem[];
}

export function VerifiedNodeTable({ items }: VerifiedNodeTableProps) {
    return (
        <Card className="p-0 overflow-hidden border-white/20 bg-black/60 shadow-2xl">
            <div className="w-full overflow-x-auto">
                <table className="w-full text-left font-mono text-sm">
                    <thead>
                        <tr className="border-b border-white/10 bg-white/5 uppercase tracking-widest text-[10px] text-gray-500">
                            <th className="py-4 px-6 font-medium">Entity</th>
                            <th className="py-4 px-6 font-medium">Protocol</th>
                            <th className="py-4 px-6 font-medium">Status</th>
                            <th className="py-4 px-6 font-medium text-right">Last Discovery</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-12 text-center text-gray-500 italic">
                                    No nodes found matching your query.
                                </td>
                            </tr>
                        ) : (
                            items.map((item, i) => (
                                <motion.tr
                                    key={item.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className="group hover:bg-white/[0.02] transition-colors"
                                >
                                    {/* Entity */}
                                    <td className="py-4 px-6">
                                        <div className="font-bold text-white group-hover:text-brand-cyan transition-colors">
                                            {item.entity}
                                        </div>
                                    </td>

                                    {/* Protocol */}
                                    <td className="py-4 px-6 text-gray-500">
                                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">
                                            {item.protocol}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="py-4 px-6">
                                        {item.status === 'Synced' ? (
                                            <div className="flex items-center gap-2 text-emerald-400">
                                                <div className="p-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                                                    <Check size={10} strokeWidth={3} />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-wider">Verified</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-brand-cyan">
                                                <Loader2 size={12} className="animate-spin" />
                                                <span className="text-xs font-bold uppercase tracking-wider animate-pulse">
                                                    {item.status}...
                                                </span>
                                            </div>
                                        )}
                                    </td>

                                    {/* Last Discovery */}
                                    <td className="py-4 px-6 text-right text-gray-500">
                                        {item.lastDiscovery}
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}

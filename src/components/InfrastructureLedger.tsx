import { useMemo } from 'react';
import { Card } from './Card';
import { motion, AnimatePresence } from 'framer-motion';

import { BadgeCheck } from 'lucide-react';
import type { LedgerItem } from '../types';

// High-tier placeholder brands
const MOCK_DATA: LedgerItem[] = [
    { id: '1', entity: 'Nike.Node', status: 'Synced', latency: '14ms' },
    { id: '2', entity: 'BlackRock.Index', status: 'Synced', latency: '12ms' },
    { id: '3', entity: 'Tesla.Agent', status: 'Synced', latency: '18ms' },
    { id: '4', entity: 'OpenAI.Operator', status: 'Synced', latency: '8ms' },
    { id: '5', entity: 'Apple.Intell', status: 'Synced', latency: '11ms' },
    { id: '6', entity: 'Microsoft.Copilot', status: 'Synced', latency: '15ms' },
    { id: '7', entity: 'Anthropic.Claude', status: 'Verifying', latency: '24ms' },
    { id: '8', entity: 'Meta.Llama', status: 'Synced', latency: '19ms' },
    { id: '9', entity: 'Stripe.Pay', status: 'Synced', latency: '22ms' },
    { id: '10', entity: 'Shopify.Store', status: 'Pending', latency: '45ms' },
];

// Network load levels
const LOAD_LEVELS = ['Low', 'Medium', 'High'] as const;

function getRandomLatency(): string {
    return `${Math.floor(Math.random() * (48 - 12 + 1)) + 12}ms`;
}

function getRandomLoad(): typeof LOAD_LEVELS[number] {
    return LOAD_LEVELS[Math.floor(Math.random() * LOAD_LEVELS.length)];
}

function StatusBadge({ status }: { status: string }) {
    if (status === 'Synced' || status === 'Verified') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)] uppercase tracking-wide">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                Synced
            </span>
        );
    }
    if (status === 'Pending') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 uppercase tracking-wide">
                <span className="w-1 h-1 rounded-full bg-yellow-400" />
                Pending
            </span>
        );
    }
    return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-gray-400 border border-white/10 uppercase tracking-wide">
            {status}
        </span>
    );
}

function LoadBadge({ load }: { load: string }) {
    if (load === 'Low') {
        return <span className="text-emerald-400">Low</span>;
    }
    if (load === 'Medium') {
        return <span className="text-yellow-400">Medium</span>;
    }
    return <span className="text-red-400">High</span>;
}

interface InfrastructureLedgerProps {
    items?: LedgerItem[];
    title?: string;
    limit?: number;
    showViewAll?: boolean;
}

export function InfrastructureLedger({
    items = MOCK_DATA,
    title = 'Protocol Ledger',
    limit,
    showViewAll = true
}: InfrastructureLedgerProps) {
    // Randomize latency and load on each render (page load)
    const displayItems = useMemo(() => {
        const sliced = limit ? items.slice(0, limit) : items;
        return sliced.map(item => ({
            ...item,
            latency: getRandomLatency(),
            load: getRandomLoad()
        }));
    }, [items, limit]);

    return (
        <div className="w-full">
            <div className="mb-6 flex items-center justify-between px-2">
                <h3 className="text-sm font-medium text-gray-400 font-mono uppercase tracking-wider">{title}</h3>
                {showViewAll && (
                    <span className="text-xs text-brand-cyan cursor-pointer hover:text-cyan-300 transition-colors">
                        View Full Registry &rarr;
                    </span>
                )}
            </div>

            <Card className="w-full !bg-transparent !border-0 !shadow-none !backdrop-blur-none">
                <div className="w-full overflow-hidden rounded-lg border border-white/10 bg-black/40 backdrop-blur-md">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="border-b border-white/10 text-gray-500 font-mono text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-normal">Network Entity</th>
                                <th className="px-6 py-4 font-normal">UCP Status</th>
                                <th className="px-6 py-4 font-normal text-center">Network Load</th>
                                <th className="px-6 py-4 font-normal text-right">Protocol Latency</th>
                                <th className="px-6 py-4 font-normal text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300 font-mono text-xs relative">
                            <AnimatePresence mode="popLayout" initial={false}>
                                {displayItems.map((row) => (
                                    <motion.tr
                                        layout
                                        key={row.id}
                                        initial={{ opacity: 0, x: -20, backgroundColor: "rgba(0, 255, 255, 0.1)" }}
                                        animate={{ opacity: 1, x: 0, backgroundColor: "transparent" }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                        className="group hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-white group-hover:text-brand-cyan transition-colors">
                                                    {row.entity}
                                                </span>
                                                <BadgeCheck className="w-4 h-4 text-brand-cyan" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={row.status} />
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <LoadBadge load={(row as any).load} />
                                        </td>
                                        <td className="px-6 py-4 text-right text-gray-500">
                                            {row.latency}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-gray-500 cursor-not-allowed underline decoration-dotted underline-offset-4">
                                                View Manifest
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))
                                }
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </Card>

            <div className="mt-4 text-center">
                <p className="text-xs text-gray-600 font-mono">
                    Displaying {displayItems.length} of {items.length} active nodes
                </p>
            </div>
        </div>
    );
}

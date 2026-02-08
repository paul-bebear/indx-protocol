import { Shield, FileText, CreditCard, Brain, MessageSquare, Fingerprint, Zap } from 'lucide-react';
import type { ProtocolFlags } from '../types/audit';

const ICON_MAP = {
    has_ucp: Shield,
    has_ai_manifest: FileText,
    has_ap2: CreditCard,
    has_mcp: Brain,
    has_a2a: MessageSquare,
    has_poh: Fingerprint,
    has_services: Zap,
} as const;

const LABELS = {
    has_ucp: 'Identity',
    has_ai_manifest: 'Policy',
    has_ap2: 'Payments',
    has_mcp: 'Context',
    has_a2a: 'Dialogue',
    has_poh: 'Origin',
    has_services: 'Services',
} as const;

interface ProtocolStackIconsProps {
    flags: ProtocolFlags;
    size?: 'sm' | 'md';
}

export function ProtocolStackIcons({ flags, size = 'md' }: ProtocolStackIconsProps) {
    const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    const gap = size === 'sm' ? 'gap-1' : 'gap-2';

    return (
        <div className={`flex items-center ${gap}`}>
            {(Object.keys(ICON_MAP) as (keyof typeof ICON_MAP)[]).map((key) => {
                const Icon = ICON_MAP[key];
                const isActive = flags[key];
                const label = LABELS[key];

                return (
                    <div
                        key={key}
                        className="relative group"
                        title={`${label}: ${isActive ? 'Active' : 'Inactive'}`}
                    >
                        <Icon
                            className={`${iconSize} transition-colors ${isActive
                                    ? 'text-emerald-400 drop-shadow-[0_0_4px_rgba(52,211,153,0.5)]'
                                    : 'text-gray-600'
                                }`}
                        />
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 border border-white/10 rounded text-[10px] font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                            {label}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

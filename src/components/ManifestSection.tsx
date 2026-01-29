import { useState, useEffect } from 'react';

const UCP_SCHEMA = `{
  "protocol_version": "UCP/2.0",
  "agent_access_rules": {
    "allow": ["discovery", "read", "negotiate"],
    "deny": ["write", "delete"],
    "rate_limit": "1000/hour"
  },
  "verified_identity_token": "idx_8f92a1c0...b3e7",
  "data_provenance": {
    "source": "primary",
    "last_verified": "2026-01-28T00:00:00Z",
    "attestation_chain": ["indx.registry.node"]
  }
}`;

export function ManifestSection() {
    const [refreshTime, setRefreshTime] = useState(2);

    // Simulate live sync refresh timer
    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshTime(prev => prev >= 8 ? 1 : prev + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="manifest" className="w-full max-w-3xl mx-auto px-6 py-12">
            <div className="mb-8">
                <span className="text-brand-cyan font-mono text-xs uppercase tracking-widest">
                    [ 03: TECH SPEC ]
                </span>
                <h2 className="text-3xl font-bold text-white mt-2">
                    The UCP Manifest
                </h2>
                <p className="text-gray-400 mt-4 max-w-xl">
                    The Universal Content Protocol defines how AI agents discover, authenticate, and interact with your infrastructure.
                </p>
            </div>

            {/* Terminal Window */}
            <div className="relative rounded-lg border border-white/10 bg-black/80 overflow-hidden shadow-2xl">
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs font-mono text-gray-500">
                        /.well-known/ucp.json
                    </span>
                    <div className="w-16" /> {/* Spacer for balance */}
                </div>

                {/* Code Content */}
                <div className="p-6">
                    {/* Sync Status Indicator */}
                    <div className="mb-4 font-mono text-xs">
                        <span className="text-emerald-400">[ STATUS: LIVE_SYNC_ACTIVE ]</span>
                        <span className="text-gray-600"> // LAST_REFRESH: </span>
                        <span className="text-emerald-400">{refreshTime}s ago</span>
                    </div>

                    <pre className="text-sm font-mono text-gray-300 overflow-x-auto">
                        <code>{UCP_SCHEMA}</code>
                    </pre>
                </div>
            </div>

            {/* API Hooks Footer Note */}
            <p className="mt-6 text-center text-gray-500 text-xs font-mono">
                INDX Protocol supports native API hooks for <span className="text-gray-400">Shopify</span>, <span className="text-gray-400">Magento</span>, and <span className="text-gray-400">Custom ERPs</span> for real-time inventory synchronization.
            </p>
        </section>
    );
}

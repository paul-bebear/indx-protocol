// Protocol flags for 7-point audit
export interface ProtocolFlags {
    has_ucp: boolean;        // Universal Content Protocol
    has_ai_manifest: boolean; // AI Manifest
    has_ap2: boolean;        // Agent Payment Protocol
    has_mcp: boolean;        // Model Context Protocol
    has_a2a: boolean;        // Agent-to-Agent
    has_poh: boolean;        // Proof of Human/Origin
    has_services: boolean;   // Capability Discovery
}

// Audit details stored as JSONB
export interface AuditDetails {
    protocols_detected: string[];
    latency_ms?: number;
    handshake_status?: string;
    discovery_score?: number;
    raw_results?: Record<string, unknown>;
}

// Full registry node from Supabase
export interface RegistryNode extends ProtocolFlags {
    id: string;
    domain: string;
    status: 'verified' | 'pending' | 'failed';
    audit_score: number;
    last_audited: string | null;
    audit_details: AuditDetails | null;
    created_at?: string;
}

// Protocol icon definitions for UI
export const PROTOCOL_ICONS = [
    { key: 'has_ucp', label: 'Identity', icon: 'Shield' },
    { key: 'has_ai_manifest', label: 'Policy', icon: 'FileText' },
    { key: 'has_ap2', label: 'Payments', icon: 'CreditCard' },
    { key: 'has_mcp', label: 'Context', icon: 'Brain' },
    { key: 'has_a2a', label: 'Dialogue', icon: 'MessageSquare' },
    { key: 'has_poh', label: 'Origin', icon: 'Fingerprint' },
    { key: 'has_services', label: 'Services', icon: 'Zap' },
] as const;

export type ProtocolKey = keyof ProtocolFlags;

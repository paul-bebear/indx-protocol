/**
 * Shared type definitions for the application.
 */

export type LedgerStatus = 'Synced' | 'Pending' | 'Indexing' | 'Verifying';

export interface LedgerItem {
    id: string;
    entity: string;
    status: LedgerStatus;
    latency?: string;
    protocol?: string;
    lastDiscovery?: string;
}

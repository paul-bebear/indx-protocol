import { PageWrapper } from '../components/PageWrapper';
import { LiveRegistry } from '../components/LiveRegistry';

export function Ledger() {
    return (
        <PageWrapper className="py-24">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="text-brand-cyan font-mono text-xs uppercase tracking-widest">
                        [ LIVE REGISTRY ]
                    </span>
                    <h1 className="text-4xl font-bold text-white mt-4 mb-4">
                        Protocol Leaderboard
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Real-time view of verified nodes in the INDX Protocol registry,
                        ranked by their 7-point audit score.
                    </p>
                </div>

                {/* Live Registry - Full View */}
                <LiveRegistry limit={20} showViewAll={false} />
            </div>
        </PageWrapper>
    );
}

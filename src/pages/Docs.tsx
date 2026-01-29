import { PageWrapper } from '../components/PageWrapper';
import { Card } from '../components/Card';
import { CodeBlock } from '../components/CodeBlock';
import { DiscoveryFlow } from '../components/DiscoveryFlow';


const DEEP_MANIFEST_JSON = `{
  "protocol": "UCP/1.4",
  "identity": {
    "org_id": "idx_8f92a1c0...",
    "verification_level": "gold"
  },
  "capabilities": {
    "autonomous_checkout": true,
    "inventory_sync": "realtime",
    "dynamic_pricing": {
      "enabled": true,
      "max_variance": "15%"
    }
  },
  "permissions": {
    "audit_allow": ["*"],
    "transaction_allow": ["verified_agents_only"]
  },
  "ttl": 3600,
  "endpoints": {
      "handshake": "/.well-known/ucp/handshake",
      "inventory": "/.well-known/ucp/sync"
  }
}`;

const SIDEBAR_LINKS = [
    { id: 'manifesto', label: '01. The Diagnosis', desc: 'Legacy SEO Pathology' },
    { id: 'manifest', label: '02. The Prescription', desc: 'Structuring ucp.json' },
    { id: 'handshake', label: '03. The Treatment', desc: 'Discovery Protocol' },
];

export function Docs() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <PageWrapper className="w-full max-w-7xl mx-auto pt-20 px-6">

            {/* Header */}
            <div className="mb-12 border-b border-white/10 pb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">The Science of Agentic Discovery</h1>
                        <p className="text-gray-400">Understanding the pathology of legacy SEO and the UCP cure.</p>
                    </div>
                    <div className="font-mono text-xs text-brand-cyan/60 tracking-widest uppercase">
                        RESEARCH_VERSION: 2026.1.4 // CLASSIFICATION: URGENT
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 relative">

                {/* Sidebar Navigation */}
                <div className="hidden lg:block w-64 shrink-0">
                    <div className="sticky top-24 flex flex-col gap-2">
                        {SIDEBAR_LINKS.map((link) => (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className="group flex flex-col items-start p-3 rounded-lg hover:bg-white/5 transition-all text-left border border-transparent hover:border-white/5"
                            >
                                <span className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
                                    {link.label}
                                </span>
                                <span className="text-xs text-gray-600 group-hover:text-gray-500 font-mono mt-1">
                                    {link.desc}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-16 pb-24">

                    {/* 01. Manifesto */}
                    <section id="manifesto" className="scroll-mt-24">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-brand-cyan font-mono text-sm">01</span>
                            <h2 className="text-2xl font-bold text-white">The Diagnosis</h2>
                        </div>

                        {/* Warning Box */}
                        <div className="mb-6 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                            <p className="text-red-400 font-mono text-sm font-bold mb-2">[!] CRITICAL FINDING:</p>
                            <p className="text-red-300 text-sm">Legacy SEO infrastructure is terminally infected. The symptoms are clear: static meta tags, human-readable-only content, and zero agent-to-server handshake protocols.</p>
                        </div>

                        <div className="prose prose-invert prose-lg max-w-none text-gray-400">
                            <p className="text-lg leading-relaxed text-gray-300 mb-6">
                                <strong className="text-white">The web is dying.</strong> Not from lack of traffic, but from an inability to communicate with the new dominant species: <span className="text-brand-cyan">AI Agents</span>.
                            </p>
                            <p className="mb-4">
                                Google's Gemini, OpenAI's Operator, Anthropic's Claude—these aren't just chatbots. They are autonomous shopping agents, research assistants, and negotiation bots. They don't read your blog posts. They <em>query your infrastructure</em>.
                            </p>
                            <p className="mb-4">
                                <strong className="text-white">The problem:</strong> Your website speaks HTML. Agents speak JSON-RPC. Without a translation layer, your brand is <span className="text-red-400 font-mono">INVISIBLE</span> to the agentic economy.
                            </p>
                            <p>
                                <strong className="text-brand-cyan">The cure:</strong> The Universal Content Protocol (UCP). A structured, machine-verifiable manifest that declares your capabilities, permissions, and handshake endpoints. Without it, you're not indexed. You don't exist.
                            </p>
                        </div>
                    </section>

                    {/* 02. The Manifest */}
                    <section id="manifest" className="scroll-mt-24">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-brand-cyan font-mono text-sm">02</span>
                            <h2 className="text-2xl font-bold text-white">The Manifest</h2>
                        </div>
                        <div className="prose prose-invert prose-sm max-w-none text-gray-400 mb-6">
                            <p>
                                The core of the protocol is the <code>ucp.json</code> file, hosted at <code>/.well-known/ucp.json</code>.
                                This file declares your node's identity, capabilities, and operational rules (TTL, permissions).
                            </p>
                        </div>
                        <CodeBlock
                            code={DEEP_MANIFEST_JSON}
                            filename="ucp.json"
                        />
                    </section>

                    {/* 03. The Handshake */}
                    <section id="handshake" className="scroll-mt-24">
                        <div className="flex items-center gap-2 mb-6">
                            <span className="text-brand-cyan font-mono text-sm">03</span>
                            <h2 className="text-2xl font-bold text-white">The Handshake</h2>
                        </div>
                        <div className="prose prose-invert prose-sm max-w-none text-gray-400 mb-8">
                            <p>
                                The transaction lifecycle is automated and cryptographically verified. From the initial agent query to the final settlement, INDX ensures trust at every hop.
                            </p>
                        </div>

                        <Card className="p-8 border-brand-cyan/10">
                            <DiscoveryFlow />
                        </Card>
                    </section>

                </div>
            </div>
        </PageWrapper>
    );
}

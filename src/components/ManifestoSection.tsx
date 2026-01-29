import { Card } from './Card';
import { CodeBlock } from './CodeBlock';
import { DiscoveryFlow } from './DiscoveryFlow';

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

export function ManifestoSection() {
    return (
        <section id="manifesto-section" className="w-full max-w-4xl mx-auto px-6 py-16">

            {/* Section Header */}
            <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">The Science of Agentic Discovery</h2>
                <p className="text-gray-400 text-sm">Understanding the pathology of legacy SEO and the UCP cure.</p>
            </div>

            <div className="space-y-16">

                {/* 01. The Diagnosis */}
                <section id="diagnosis" className="scroll-mt-24">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-brand-cyan font-mono text-sm">01</span>
                        <h3 className="text-xl font-bold text-white">The Diagnosis</h3>
                    </div>

                    {/* Warning Box */}
                    <div className="mb-6 p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                        <p className="text-red-400 font-mono text-sm font-bold mb-2">[!] CRITICAL FINDING:</p>
                        <p className="text-red-300 text-sm">Legacy SEO infrastructure is terminally infected. The symptoms are clear: static meta tags, human-readable-only content, and zero agent-to-server handshake protocols.</p>
                    </div>

                    <div className="prose prose-invert prose-sm max-w-none text-gray-400">
                        <p className="leading-relaxed text-gray-300 mb-4">
                            <strong className="text-white">The web is dying.</strong> Not from lack of traffic, but from an inability to communicate with the new dominant species: <span className="text-brand-cyan">AI Agents</span>.
                        </p>
                        <p className="mb-4">
                            Google's Gemini, OpenAI's Operator, Anthropic's Claude—these aren't just chatbots. They are autonomous shopping agents, research assistants, and negotiation bots. They don't read your blog posts. They <em>query your infrastructure</em>.
                        </p>
                        <p>
                            <strong className="text-brand-cyan">The cure:</strong> The Universal Content Protocol (UCP). A structured, machine-verifiable manifest that declares your capabilities, permissions, and handshake endpoints.
                        </p>
                    </div>
                </section>

                {/* 02. The Prescription */}
                <section id="prescription" className="scroll-mt-24">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-brand-cyan font-mono text-sm">02</span>
                        <h3 className="text-xl font-bold text-white">The Prescription</h3>
                    </div>
                    <div className="prose prose-invert prose-sm max-w-none text-gray-400 mb-6">
                        <p>
                            The core of the protocol is the <code>ucp.json</code> file, hosted at <code>/.well-known/ucp.json</code>.
                            This file declares your node's identity, capabilities, and operational rules.
                        </p>
                    </div>
                    <CodeBlock
                        code={DEEP_MANIFEST_JSON}
                        filename="ucp.json"
                    />
                </section>

                {/* 03. The Treatment */}
                <section id="treatment" className="scroll-mt-24">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-brand-cyan font-mono text-sm">03</span>
                        <h3 className="text-xl font-bold text-white">The Treatment</h3>
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
        </section>
    );
}

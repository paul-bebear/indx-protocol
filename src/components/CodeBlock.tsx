import { useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';

interface CodeBlockProps {
    code: string;
    filename?: string;
}

export function CodeBlock({ code, filename = 'example.json' }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="rounded-lg overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm my-4">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20" />
                    </div>
                    <span className="text-xs text-gray-400 font-mono ml-2">{filename}</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-xs"
                    >
                        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors text-xs"
                    >
                        <Download size={14} />
                        <span>Template</span>
                    </button>
                </div>
            </div>

            {/* Code */}
            <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono leading-relaxed text-gray-300">
                    <code className="language-json">
                        {code.split('\n').map((line, i) => (
                            <div key={i} className="table-row">
                                <span className="table-cell select-none text-gray-700 text-right pr-4 w-8">{i + 1}</span>
                                <span className="table-cell">{line}</span>
                            </div>
                        ))}
                    </code>
                </pre>
            </div>
        </div>
    );
}

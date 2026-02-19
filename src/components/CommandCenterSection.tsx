import { useI18n } from '../i18n';

export function CommandCenterSection() {
    const { t } = useI18n();
    const legacyTerminalLines = t.dbPop.legacyTerminal.split('\n');
    const legacyChatLines = t.dbPop.legacyChat.split('\n');

    return (
        <section className="py-24 bg-paper">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-serif font-bold mb-4 italic">{t.dbPop.title}</h2>
                    <p className="text-gray-500 italic">{t.dbPop.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-clay">
                    {/* Side A: The Past */}
                    <div className="bg-gray-100 p-10">
                        <div className="flex items-center space-x-2 mb-8">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <span className="text-xs font-bold uppercase text-gray-400">{t.dbPop.legacyLabel}</span>
                        </div>
                        <div className="space-y-4 opacity-60 pointer-events-none">
                            <div className="bg-white p-4 border border-gray-300 rounded shadow-sm text-xs font-mono">
                                {legacyTerminalLines.map((line, i) => (
                                    <span key={i}>{line}{i < legacyTerminalLines.length - 1 && <br />}</span>
                                ))}
                            </div>
                            <div className="bg-white p-4 border border-gray-300 rounded shadow-sm text-xs text-gray-500">
                                {legacyChatLines.map((line, i) => (
                                    <span key={i}>{line}{i < legacyChatLines.length - 1 && <br />}</span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-20 p-4 border-2 border-dashed border-gray-400 text-center rounded">
                            <p className="text-sm text-gray-400 italic">{t.dbPop.legacyResult}</p>
                        </div>
                    </div>

                    {/* Side B: The Future (Indexable) */}
                    <div className="p-10 text-white relative" style={{ background: 'linear-gradient(135deg, #121212 0%, #1f2937 100%)' }}>
                        <div className="absolute inset-0 bg-brand-amber opacity-5 pointer-events-none" />
                        <div className="flex items-center space-x-2 mb-8">
                            <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                            <span className="text-xs font-bold uppercase text-brand-amber">{t.dbPop.modernLabel}</span>
                        </div>

                        {/* Chat Simulation */}
                        <div className="space-y-6 relative z-10">
                            <div className="flex justify-end">
                                <div className="bg-white/10 p-3 rounded-t-lg rounded-bl-lg text-sm max-w-[80%] border border-white/20">
                                    {t.dbPop.chatQ1}
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <div className="bg-brand-amber p-3 rounded-t-lg rounded-br-lg text-sm max-w-[80%] text-carbon font-bold">
                                    {t.dbPop.chatA1}
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <div className="bg-white/10 p-3 rounded-t-lg rounded-bl-lg text-sm max-w-[80%] border border-white/20">
                                    {t.dbPop.chatQ2}
                                </div>
                            </div>
                        </div>

                        <div className="mt-20 flex justify-center">
                            <div className="bg-white text-carbon px-6 py-4 rounded-xl shadow-lg transform rotate-2">
                                <p className="text-xs font-bold uppercase text-gray-400 mb-1">{t.dbPop.impactLabel}</p>
                                <p className="text-2xl font-bold">{t.dbPop.impactValue}</p>
                                <p className="text-xs text-gray-500">{t.dbPop.impactSub}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

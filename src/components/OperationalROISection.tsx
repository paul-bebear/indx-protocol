import { useState, useMemo } from 'react';
import { Calculator, PiggyBank } from 'lucide-react';
import { useI18n } from '../i18n';

export function OperationalROISection() {
    const [locations, setLocations] = useState(3);
    const [salary, setSalary] = useState(55000);
    const { t } = useI18n();

    const savings = useMemo(() => {
        const rate = salary / 2080;
        return Math.round(14 * 52 * rate * locations);
    }, [locations, salary]);

    return (
        <section id="ops" className="py-24 bg-carbon text-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Left: Copy + Stats */}
                    <div>
                        <h2 className="text-4xl font-serif font-bold mb-8">
                            {t.ops.headlinePre}<span className="text-brand-red">{t.ops.headlineHighlight}</span>{t.ops.headlinePost}
                        </h2>
                        <p className="text-gray-400 text-lg mb-10">
                            {t.ops.subtextP1}
                            <br /><br />
                            {t.ops.subtextP2}
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <p className="text-3xl font-bold text-brand-red mb-1">{t.ops.stat1Value}</p>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">{t.ops.stat1Label}</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <p className="text-3xl font-bold text-brand-amber mb-1">{t.ops.stat2Value}</p>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">{t.ops.stat2Label}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Calculator */}
                    <div className="bg-white text-carbon p-10 rounded-3xl shadow-2xl">
                        <h3 className="font-bold text-xl mb-6 flex items-center">
                            <Calculator className="w-5 h-5 mr-3 text-brand-red" />
                            {t.ops.calcTitle}
                        </h3>
                        <div className="space-y-8">
                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">
                                    {t.ops.locationsLabel}
                                </label>
                                <input
                                    type="range"
                                    min={1}
                                    max={10}
                                    value={locations}
                                    onChange={(e) => setLocations(Number(e.target.value))}
                                    className="w-full h-2 bg-clay rounded-lg appearance-none cursor-pointer accent-brand-red"
                                />
                                <p className="text-right font-bold text-brand-red mt-2">
                                    {locations} {locations > 1 ? t.ops.locationPlural : t.ops.locationSingular}
                                </p>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 mb-3 uppercase tracking-widest">
                                    {t.ops.salaryLabel}
                                </label>
                                <select
                                    value={salary}
                                    onChange={(e) => setSalary(Number(e.target.value))}
                                    className="w-full bg-stone-50 border border-clay p-3 rounded-xl font-bold focus:outline-none focus:ring-2 ring-brand-red/20"
                                >
                                    <option value={45000}>{t.ops.salaryOption1}</option>
                                    <option value={55000}>{t.ops.salaryOption2}</option>
                                    <option value={75000}>{t.ops.salaryOption3}</option>
                                </select>
                            </div>

                            <div className="pt-6 border-t border-clay flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">{t.ops.savingsLabel}</p>
                                    <p className="text-4xl font-black text-carbon">
                                        €{savings.toLocaleString()}
                                    </p>
                                </div>
                                <PiggyBank className="w-10 h-10 text-brand-amber opacity-20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background glow */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-brand-red rounded-full blur-[120px] opacity-10" />
        </section>
    );
}

import { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
} from 'chart.js';
import { Zap, MapPin } from 'lucide-react';
import { useI18n } from '../i18n';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface NewHeroProps {
    onGetAudit?: () => void;
}

export function NewHero({ onGetAudit }: NewHeroProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { t } = useI18n();

    useEffect(() => {
        sectionRef.current?.classList.add('animate-slide');
    }, []);

    const chartData = {
        labels: [t.hero.chartLabel1, t.hero.chartLabel2],
        datasets: [
            {
                data: [42, 58],
                backgroundColor: ['#E5E7EB', '#EF4444'],
                borderRadius: 8,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        scales: {
            y: { display: false, beginAtZero: true, max: 100 },
            x: {
                grid: { display: false },
                ticks: { font: { weight: 'bold' as const, size: 10 } },
            },
        },
    };

    const scrollToOps = () => {
        document.getElementById('ops')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero-gradient py-20 md:py-32 border-b border-clay overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Column  */}
                <div ref={sectionRef} className="lg:col-span-7">
                    <div className="inline-flex items-center space-x-2 bg-brand-red/10 text-brand-red px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                        <Zap className="w-3 h-3" />
                        <span>{t.hero.badge}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
                        {t.hero.headlinePre}<span className="text-brand-red">{t.hero.headlineHighlight}</span>{t.hero.headlinePost}
                    </h1>

                    <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl">
                        {t.hero.subtext}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={onGetAudit}
                            className="bg-brand-red text-white text-center px-8 py-5 rounded-full font-bold uppercase tracking-widest hover:shadow-2xl hover:scale-105 transition-all text-sm cursor-pointer"
                        >
                            {t.hero.ctaPrimary}
                        </button>
                        <button
                            onClick={scrollToOps}
                            className="bg-white border border-clay text-carbon text-center px-8 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-clay transition-all text-sm cursor-pointer"
                        >
                            {t.hero.ctaSecondary}
                        </button>
                    </div>

                    <p className="mt-6 text-xs text-gray-400 font-medium">
                        <MapPin className="w-3 h-3 inline mr-1" />
                        {t.hero.trusted}
                    </p>
                </div>

                {/* Right Column — Chart Card */}
                <div className="lg:col-span-5 relative">
                    <div className="glass-card p-8 rounded-3xl shadow-2xl relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs">{t.hero.chartTitle}</h3>
                            <span className="text-brand-red font-bold text-xs">{t.hero.chartStat}</span>
                        </div>
                        <div className="relative w-full max-w-[600px] mx-auto h-[320px]">
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                        <div className="mt-8 p-4 bg-carbon text-white rounded-2xl flex items-center justify-between">
                            <div>
                                <p className="text-[10px] uppercase text-gray-400">{t.hero.revenueLabel}</p>
                                <p className="text-xl font-bold">
                                    €4,250 <span className="text-brand-red text-xs font-normal">{t.hero.revenueEstLoss}</span>
                                </p>
                            </div>
                            <svg className="w-7 h-7 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-amber rounded-full blur-3xl opacity-20" />
                </div>
            </div>
        </section>
    );
}

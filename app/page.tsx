"use client";

import React from 'react';
import {
    ArrowRight,
    ShieldCheck,
    Lock,
    Globe,
    FileCheck,
    Quote,
    Activity,
    UploadCloud,
    Unlock,
    PlayCircle,
    TrendingUp,
    Zap,
    ChevronRight
} from 'lucide-react';

// --- COMPONENTS ---

const DataUnlockLogo = () => (
    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3.5">
            <path d="M7 6v8a5 5 0 0 0 10 0V6" />
            <line x1="12" y1="14" x2="12" y2="19" className="text-pink-600" />
        </svg>
    </div>
);

const HOW_IT_WORKS = [
    {
        step: "01",
        title: "LOAD YOUR DATA",
        detail: "Drop or send us your raw data – CSVs from survey tools, tickets, notes, whatever data you already have but currently cannot action.",
        icon: UploadCloud,
    },
    {
        step: "02",
        title: "TELL US WHAT YOU WANT TO KNOW",
        detail: "Pick your revenue goal: Reduce churn & stop losing customers • Spot upsell & retention wins • Decide what features to build next • Uncover competition threats.",
        icon: Unlock,
    },
    {
        step: "03",
        title: "ACT – EXECUTE",
        detail: "We give you the Strategy: Top revenue drivers with € impact estimates • Clear, prioritized steps to execute • Exact moves to reduce churn, build winning features, spot upsell opportunities.",
        icon: PlayCircle,
    }
];

const COMPLIANCE_ITEMS = [
    { icon: ShieldCheck, title: "GDPR Compliant", detail: "✓ GDPR Compliant – No training on your data. Fully anonymized." },
    { icon: Lock, title: "Processed in EU", detail: "✓ Processed in EU – Analysis stays in GDPR infrastructure." },
    { icon: Globe, title: "Global Delivery", detail: "✓ Processing secure in EU, strategy delivered worldwide." },
    { icon: FileCheck, title: "Enterprise Security", detail: "✓ AES 256 encryption – At rest and in transit. ✓ SOC 2 Type II Ready." }
];

export default function App() {
    return (
        <div className="bg-[#FAFAFA] font-sans selection:bg-pink-100 selection:text-pink-900 text-gray-900 overflow-x-hidden min-h-screen">
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 p-4 md:p-6 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-lg md:text-xl font-black tracking-tighter flex items-center gap-2">
                        <DataUnlockLogo />
                        DATAUNLOCK
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                        <button 
                            onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-black text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold hover:bg-gray-800 transition-all flex items-center gap-2"
                        >
                            Get Pilot Access <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-28 sm:pt-36 md:pt-48 pb-16 md:pb-32 px-6 max-w-7xl mx-auto">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center mb-4 text-[10px] font-black bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full uppercase tracking-widest gap-2">
                        <Activity className="w-3 h-3 animate-pulse" />
                        Now Accepting Pilot Partners
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-6 md:mb-10">
                        UNLOCK<br/>
                        <span className="text-pink-600">REVENUE</span><br/>
                        IN YOUR DATA.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mb-8 md:mb-12 leading-relaxed">
                        Your data is trapped in spreadsheets. Weeks of analysis. Delayed decisions. We give you the exact steps to unlock revenue - fast and secure.
                    </p>
                    <button 
                        onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full sm:w-auto px-8 md:px-10 py-5 md:py-6 bg-black text-white rounded-2xl font-black text-xl md:text-2xl hover:scale-105 transition-all shadow-2xl shadow-gray-200"
                    >
                        Start Your Pilot
                    </button>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 md:py-24 px-6 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 md:mb-16">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-600 mb-3">THE ENGINE</p>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter">HOW WE UNLOCK.</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {HOW_IT_WORKS.map((item, i) => (
                            <div key={i}>
                                <div className="text-5xl md:text-7xl font-black text-gray-50 mb-3 md:mb-4">{item.step}</div>
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-pink-50 flex items-center justify-center mb-5 md:mb-6">
                                    <item.icon className="w-6 h-6 md:w-7 md:h-7 text-pink-600" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Case: Zeus Scooters */}
            <section className="py-20 md:py-24 px-6 bg-black text-white overflow-hidden relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 md:gap-16 items-center">
                        <div className="lg:w-1/2">
                            <div className="flex items-center gap-3 mb-6 md:mb-8">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-pink-500 bg-pink-500/10 px-3 md:px-4 py-2 rounded-full">Case Study</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500">Zeus Scooters</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 md:mb-10 leading-[1] md:leading-[0.9]">
                                MICRO-MOBILITY IMPACT. <span className="text-pink-500">CHURN REDUCTION</span> FOR 150K USERS.
                            </h2>
                            
                            <div className="relative p-6 md:p-12 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] mb-8 md:mb-12">
                                <Quote className="absolute top-4 md:top-6 right-6 md:right-8 w-8 h-8 md:w-12 md:h-12 text-pink-500/20" />
                                <p className="text-2xl md:text-3xl font-bold leading-tight mb-6 md:mb-8">
                                    "You've given me a step-by-step guide to reduce churn."
                                </p>
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-600 rounded-full flex items-center justify-center font-black text-sm md:text-base shrink-0">CK</div>
                                    <div>
                                        <div className="font-black text-base md:text-lg">Chris Kemp</div>
                                        <div className="text-gray-500 text-[10px] md:text-sm font-bold uppercase tracking-widest">Deputy CEO, Zeus Scooters</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                            <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between hover:bg-white/10 transition-all min-h-[240px]">
                                <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-pink-500 mb-8 md:mb-12" />
                                <div>
                                    <div className="text-4xl md:text-5xl font-black mb-2">€900K</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Revenue Recovery</div>
                                </div>
                            </div>
                            <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between hover:bg-white/10 transition-all md:col-span-2 min-h-[240px]">
                                <div className="flex justify-between items-start">
                                    <Zap className="w-8 h-8 md:w-10 md:h-10 text-pink-500 mb-8 md:mb-12" />
                                    <div className="text-right">
                                        <div className="text-4xl md:text-5xl font-black leading-none">&lt;7</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-1">Days</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xl md:text-2xl font-black mb-1">Execution Speed</div>
                                    <div className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">From data to actionable strategy</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] -z-10" />
            </section>

            {/* Compliance Section */}
            <section className="py-20 md:py-32 px-6 bg-gray-50 border-y border-gray-100 overflow-hidden relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-10 mb-12 md:mb-20">
                        <div className="max-w-2xl">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-600 mb-3">Trust & Compliance</p>
                            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-4">BUILT FOR TRUST.</h2>
                            <p className="text-lg md:text-2xl text-gray-500 font-bold uppercase tracking-widest">Security by design, compliance by nature.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {COMPLIANCE_ITEMS.map((item, i) => (
                            <div key={i} className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm transition-all hover:shadow-md">
                                <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center mb-6 shrink-0">
                                    <item.icon className="w-5 h-5 text-pink-600" />
                                </div>
                                <h3 className="text-lg md:text-2xl font-black mb-1 tracking-tight">{item.title}</h3>
                                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-100 rounded-full blur-[100px] opacity-20 -z-10" />
            </section>

            {/* Final CTA */}
            <section id="final-cta" className="py-20 md:py-48 px-6 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-5xl sm:text-6xl md:text-[9rem] font-black mb-12 md:mb-16 tracking-tighter leading-[0.9] md:leading-[0.85]">
                        READY TO<br/><span className="text-pink-600">UNLOCK REVENUE?</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
                        We have a limited number of pilot partnerships available.
                    </p>
                    <a
                        href="mailto:damien@dataunlock.ai?subject=DataUnlock Pilot Inquiry"
                        className="inline-flex items-center justify-center w-full max-w-2xl py-8 md:py-10 text-2xl md:text-4xl font-black rounded-[2rem] md:rounded-[3rem] bg-black text-white hover:scale-[1.02] shadow-2xl transition-all"
                    >
                        Get Pilot Access <ChevronRight className="ml-2 md:ml-4 w-6 h-6 md:w-10 md:h-10 shrink-0" />
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 md:py-16 bg-white px-8 border-t border-gray-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-lg md:text-xl font-black tracking-tighter flex items-center gap-2">
                        <DataUnlockLogo />
                        DATAUNLOCK
                    </div>
                    <div className="text-[9px] md:text-[10px] font-black text-gray-300 uppercase tracking-widest text-center">
                        © 2026 DATAUNLOCK. SECURE FEEDBACK INTELLIGENCE. PROCESSED IN THE EU.
                    </div>
                </div>
            </footer>
        </div>
    );
}
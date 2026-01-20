"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ArrowRight,
    Zap,
    FileText,
    TrendingUp,
    ShieldCheck,
    Lock,
    Globe,
    FileCheck,
    X,
    Fingerprint,
    Workflow,
    Activity
} from 'lucide-react';

// Bypassing strict TS motion props for the build
const MotionDiv = motion.div as any;
const MotionSection = motion.section as any;

const THEME = {
    pink: "#db2777",
    pinkGlow: "rgba(219, 39, 119, 0.15)",
    glass: "rgba(255, 255, 255, 0.7)",
    border: "rgba(0, 0, 0, 0.05)"
};

const HOW_IT_WORKS = [
    {
        step: "01",
        title: "INGEST",
        detail: "Plug in raw, messy data. CSVs, tickets, or direct API streams. We anonymize instantly.",
        icon: FileText,
    },
    {
        step: "02",
        title: "DECODE",
        detail: "Our mapping engine identifies the exact friction points costing you revenue.",
        icon: Fingerprint,
    },
    {
        step: "03",
        title: "EXECUTE",
        detail: "Get a prioritized action plan. No fluff, just the steps to scale.",
        icon: Workflow,
    }
];

const DataUnlockLogo = () => (
    <div className="relative group">
        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M7 6v8a5 5 0 0 0 10 0V6" />
                <line x1="12" y1="14" x2="12" y2="19" className="text-pink-500" />
            </svg>
        </div>
    </div>
);

export default function App() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-[#0A0A0A] text-white font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden min-h-screen">
            {/* Nav */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 ${scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <DataUnlockLogo />
                        <span className="text-xl font-black tracking-tighter uppercase">DATAUNLOCK</span>
                    </div>
                    <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        <a href="#process" className="hover:text-pink-500 transition-colors">Process</a>
                        <a href="#security" className="hover:text-pink-500 transition-colors">Security</a>
                    </div>
                    <a href="mailto:damien@dataunlock.ai" className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all active:scale-95">
                        Get Pilot Access
                    </a>
                </div>
            </nav>

            {/* Hero */}
            <MotionSection 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative pt-40 pb-20 md:pt-64 md:pb-40 px-6"
            >
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-pink-600/10 blur-[120px] rounded-full pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative">
                    <MotionDiv
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <div className="mb-8 inline-flex items-center gap-2 text-[10px] font-black bg-white/5 border border-white/10 px-4 py-2 rounded-full uppercase tracking-[0.3em]">
                            <Activity className="w-3 h-3 text-pink-500" /> Now Accepting Pilot Partners
                        </div>
                        <h1 className="text-[12vw] md:text-[9vw] font-black leading-[0.85] tracking-tighter mb-12">
                            TURN RAW <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 italic">FEEDBACK</span> <br/>
                            INTO <span className="text-pink-500">CAPITAL.</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-gray-400 font-medium max-w-2xl mb-12 leading-relaxed">
                            Stop guessing. We map your customer feedback directly to revenue growth opportunities using enterprise-grade intelligence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="mailto:damien@dataunlock.ai" className="px-10 py-6 bg-pink-600 text-white rounded-2xl font-black text-xl hover:bg-pink-500 transition-all shadow-2xl shadow-pink-500/20 text-center">
                                Start Your Pilot
                            </a>
                            <div className="px-10 py-6 bg-white/5 border border-white/10 rounded-2xl font-black text-xl text-center">
                                GDPR Ready
                            </div>
                        </div>
                    </MotionDiv>
                </div>
            </MotionSection>

            {/* The Process - Grid Style */}
            <section id="process" className="py-32 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                        <div>
                            <p className="text-pink-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Workflow</p>
                            <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic leading-none">THE ENGINE.</h2>
                        </div>
                        <p className="text-gray-500 max-w-sm text-lg font-medium">
                            Our proprietary mapping process eliminates noise and highlights the signals that drive retention.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 border border-white/5 rounded-[2rem] overflow-hidden">
                        {HOW_IT_WORKS.map((item, i) => (
                            <div key={i} className="bg-[#0A0A0A] p-12 hover:bg-white/[0.02] transition-colors group">
                                <div className="text-pink-500/30 text-8xl font-black mb-8 group-hover:text-pink-500 transition-colors duration-500">{item.step}</div>
                                <h3 className="text-3xl font-black mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-lg">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Security Banner */}
            <section id="security" className="py-20 bg-pink-600">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-white">
                        DATA SOVEREIGNTY <br/> IS NON-NEGOTIABLE.
                    </h2>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="flex flex-col gap-2">
                            <ShieldCheck className="w-8 h-8 text-white" />
                            <span className="text-xs font-black uppercase tracking-widest text-pink-200">GDPR Compliant</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Lock className="w-8 h-8 text-white" />
                            <span className="text-xs font-black uppercase tracking-widest text-pink-200">AES-256 Encrypted</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
                    <div>
                        <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                            <DataUnlockLogo />
                            <span className="text-xl font-black tracking-tighter uppercase">DATAUNLOCK</span>
                        </div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest max-w-xs leading-loose">
                            © 2026 DATAUNLOCK. SECURE FEEDBACK INTELLIGENCE. PROCESSED IN THE EU.
                        </p>
                    </div>
                    <div className="flex gap-4">
                         <a href="mailto:damien@dataunlock.ai" className="p-4 bg-white/5 rounded-full hover:bg-white/10 transition-all border border-white/10">
                            <ArrowRight className="w-6 h-6" />
                         </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
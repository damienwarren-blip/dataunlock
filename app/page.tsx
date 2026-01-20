"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    ShieldCheck,
    Lock,
    Globe,
    FileCheck,
    Quote,
    Activity,
    Mail,
    X,
    UploadCloud,
    Unlock,
    PlayCircle,
    TrendingUp,
    Zap
} from 'lucide-react';

/**
 * DataUnlock App - Production Fix
 * 1. Explicitly typed scrollTo param.
 * 2. Removed ALL className props from motion components to satisfy strict TS/Turbopack rules.
 * 3. Layout is handled by standard divs; motion components are used as clean wrappers.
 */

interface WorkItem {
    step: string;
    title: string;
    icon: any;
    detail: string;
}

const HOW_IT_WORKS: WorkItem[] = [
    {
        step: "01",
        title: "LOAD",
        icon: UploadCloud,
        detail: "Plug in raw data—CSVs, tickets, or API streams.",
    },
    {
        step: "02",
        title: "UNLOCK",
        icon: Unlock,
        detail: "Our mapping identifies the exact friction points costing you revenue.",
    },
    {
        step: "03",
        title: "ACT",
        icon: PlayCircle,
        detail: "Get a prioritized action plan. The exact steps to execute.",
    }
];

const COMPLIANCE_ITEMS = [
    { 
        icon: ShieldCheck, 
        title: "GDPR Compliant", 
        detail: "✓ GDPR Compliant – No training on your data. Fully anonymized." 
    },
    { 
        icon: Lock, 
        title: "Processed in EU", 
        detail: "✓ Processed in EU – Analysis stays in GDPR infrastructure." 
    },
    { 
        icon: Globe, 
        title: "Global Delivery", 
        detail: "✓ Processing secure in EU, strategy delivered worldwide." 
    },
    { 
        icon: FileCheck, 
        title: "Enterprise Security", 
        detail: "✓ AES 256 encryption – At rest and in transit. ✓ SOC 2 Type II Ready." 
    }
];

const DataUnlockLogo = () => (
    <div className="relative group cursor-pointer">
        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center transition-transform group-hover:rotate-6">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3.5">
                <path d="M7 6v8a5 5 0 0 0 10 0V6" />
                <line x1="12" y1="14" x2="12" y2="19" className="text-pink-600" />
            </svg>
        </div>
    </div>
);

export default function App() {
    const [scrolled, setScrolled] = useState(false);
    const [showPrivacy, setShowPrivacy] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-white text-black font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden min-h-screen">
            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-black/5' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
                    <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                        <DataUnlockLogo />
                        <span className="text-xl font-black tracking-tighter uppercase whitespace-nowrap">DATAUNLOCK</span>
                    </div>
                    
                    <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                        <button onClick={() => scrollTo('process')} className="hover:text-pink-500 transition-colors cursor-pointer">Process</button>
                        <button onClick={() => scrollTo('security')} className="hover:text-pink-500 transition-colors cursor-pointer">Security</button>
                    </div>

                    <a href="mailto:damien@dataunlock.ai" className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-pink-600 transition-all active:scale-95 flex items-center gap-2">
                        <span className="hidden sm:inline">Get Pilot Access</span>
                        <Mail className="w-4 h-4 sm:hidden md:inline" />
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-40 pb-20 md:pt-64 md:pb-40 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* No className on motion.div above - content is inside standard div */}
                        <div>
                            <div className="mb-8 inline-flex items-center gap-2 text-[10px] font-black bg-black/5 border border-black/10 px-4 py-2 rounded-full uppercase tracking-[0.3em]">
                                <Activity className="w-3 h-3 text-pink-500 animate-pulse" /> 
                                Now Accepting Pilot Partners
                            </div>
                            
                            <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter mb-12 uppercase">
                                UNLOCK <br/>
                                <span className="text-pink-500 italic">REVENUE</span> <br/>
                                IN YOUR DATA.
                            </h1>

                            <p className="text-lg md:text-2xl text-gray-500 font-medium max-w-2xl mb-12 leading-relaxed italic">
                                Your data is trapped in spreadsheets. Weeks of analysis. Delayed decisions. 
                                <span className="text-black block not-italic font-bold mt-2">We give you the exact steps to unlock revenue in your data—fast and secure.</span>
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="mailto:damien@dataunlock.ai" className="px-10 py-6 bg-pink-600 text-white rounded-2xl font-black text-xl hover:bg-black transition-all shadow-xl shadow-pink-500/20 text-center inline-flex items-center justify-center gap-3">
                                    Start Your Pilot <ArrowRight className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* The Engine Section */}
            <section id="process" className="py-32 px-6 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-24">
                        <p className="text-pink-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4">THE ENGINE</p>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic leading-none mb-8 uppercase">HOW WE UNLOCK.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {HOW_IT_WORKS.map((item, i) => (
                            <div key={i} className="relative p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 transition-all hover:bg-white hover:border-pink-500 hover:shadow-2xl hover:shadow-pink-500/5 group min-h-[350px] flex flex-col justify-between overflow-hidden">
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    {/* Standard div handles all styles now */}
                                    <div className="h-full w-full flex flex-col justify-between">
                                        <div className="text-8xl font-black text-black/5 absolute top-4 right-8 group-hover:text-pink-500/10 transition-colors pointer-events-none">
                                            {item.step}
                                        </div>
                                        <div>
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100 group-hover:border-pink-500/30 transition-colors">
                                                <item.icon className="w-7 h-7 text-pink-600" />
                                            </div>
                                            <h3 className="text-4xl font-black mb-6 italic text-pink-600 uppercase tracking-tighter">
                                                {item.title}
                                            </h3>
                                            <p className="text-xl leading-relaxed text-gray-500 font-medium">
                                                {item.detail}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Study Section */}
            <section className="py-32 px-6 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 bg-pink-500/10 px-4 py-2 rounded-full border border-pink-500/20">Case Study</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Zeus Scooters</span>
                            </div>
                            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9] uppercase">
                                MICRO-MOBILITY IMPACT. <br/>
                                <span className="text-pink-500 italic">CHURN REDUCTION</span> FOR 150K USERS.
                            </h2>
                            
                            <div className="relative p-12 bg-gray-50 border border-gray-100 rounded-[3rem]">
                                <Quote className="absolute top-6 right-8 w-12 h-12 text-pink-500/20" />
                                <p className="text-3xl font-bold leading-tight mb-8 italic">
                                    "You've given me a step-by-step guide to reduce churn. The impact was immediate."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center font-black text-white">CK</div>
                                    <div>
                                        <div className="font-black text-lg">Chris Kemp</div>
                                        <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Deputy CEO, Zeus Scooters</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                            <div className="p-10 bg-gray-50 border border-gray-100 rounded-[2.5rem] flex flex-col justify-between hover:bg-pink-50/50 transition-all group">
                                <TrendingUp className="w-10 h-10 text-pink-500 mb-12" />
                                <div>
                                    <div className="text-6xl font-black mb-2 tracking-tighter">€900K</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Revenue Recovery</div>
                                </div>
                            </div>
                            <div className="p-10 bg-gray-50 border border-gray-100 rounded-[2.5rem] flex flex-col justify-between hover:bg-pink-50/50 transition-all group">
                                <Zap className="w-10 h-10 text-black mb-12" />
                                <div>
                                    <div className="text-6xl font-black mb-2 tracking-tighter">&lt;7D</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Execution Speed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security Section */}
            <section id="security" className="py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-2xl mb-20">
                        <p className="text-pink-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Trust & Compliance</p>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic leading-none mb-8 uppercase">BUILT FOR TRUST.</h2>
                        <p className="text-xl font-bold uppercase tracking-widest text-gray-400">Enterprise grade security as standard.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {COMPLIANCE_ITEMS.map((item, i) => (
                            <div key={i} className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 transition-all hover:border-pink-500/20 hover:bg-white shadow-sm">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                                    <item.icon className="w-6 h-6 text-pink-600" />
                                </div>
                                <h3 className="text-2xl font-black mb-3 tracking-tight uppercase tracking-tighter">{item.title}</h3>
                                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gray-900 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-pink-500"></div>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 italic uppercase text-white">READY TO UNLOCK?</h2>
                        <p className="text-xl text-gray-400 font-medium mb-12 max-w-2xl mx-auto">
                            Stop guessing. Start knowing. Join our pilot program and turn your data into a growth engine.
                        </p>
                        <div className="flex justify-center">
                             <a href="mailto:damien@dataunlock.ai" className="px-12 py-6 bg-pink-600 text-white rounded-2xl font-black text-xl hover:bg-white hover:text-black transition-all flex items-center gap-3">
                                <Mail className="w-6 h-6" /> Get Pilot Access
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                        <div>
                            <div className="flex items-center gap-3 mb-6 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                                <DataUnlockLogo />
                                <span className="text-xl font-black tracking-tighter uppercase">DATAUNLOCK</span>
                            </div>
                            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest max-w-xs leading-loose">
                                © 2026 DATAUNLOCK. <br/> SECURE FEEDBACK INTELLIGENCE. <br/> PROCESSED IN THE EU.
                            </p>
                        </div>
                        <div className="max-w-md">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black mb-4">Privacy & Data</h4>
                            <p className="text-gray-400 text-xs leading-relaxed font-medium mb-4">
                                We are committed to sovereignty. No training on user data. All processing in EU jurisdiction.
                            </p>
                            <button 
                                onClick={() => setShowPrivacy(true)}
                                className="text-[10px] font-black uppercase tracking-widest text-pink-600 hover:text-pink-500 transition-colors border-b border-pink-600/30 cursor-pointer"
                            >
                                View Privacy Policy
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Privacy Policy Modal */}
            <AnimatePresence>
                {showPrivacy && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPrivacy(false)}
                        >
                             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                        </motion.div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        >
                            <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-2 bg-pink-500" />
                                <button 
                                    onClick={() => setShowPrivacy(false)}
                                    className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors cursor-pointer"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                                
                                <div className="mb-8">
                                    <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center mb-6">
                                        <ShieldCheck className="w-6 h-6 text-pink-600" />
                                    </div>
                                    <h3 className="text-3xl font-black italic tracking-tighter mb-4 uppercase">PRIVACY POLICY</h3>
                                    <div className="space-y-4 text-sm text-gray-500 font-medium leading-relaxed">
                                        <p>
                                            <span className="text-black font-bold">Zero-Training Policy:</span> We never use your proprietary data to train public AI models.
                                        </p>
                                        <p>
                                            <span className="text-black font-bold">Full Anonymization:</span> PII is stripped at the ingestion layer before analysis begins.
                                        </p>
                                        <p>
                                            <span className="text-black font-bold">EU Sovereignty:</span> All data processing is strictly performed on infrastructure located within the EU.
                                        </p>
                                    </div>
                                </div>
                                
                                <button 
                                    onClick={() => setShowPrivacy(false)}
                                    className="w-full py-4 bg-black text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-pink-600 transition-colors cursor-pointer"
                                >
                                    Close Policy
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
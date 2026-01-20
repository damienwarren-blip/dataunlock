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
    Quote,
    Database,
    Bot,
    ClipboardList,
    Activity,
    Mail,
    X,
    UploadCloud,
    Key,
    PlayCircle
} from 'lucide-react';

// Bypassing strict TS motion props for the build
const MotionDiv = motion.div as any;
const MotionSection = motion.section as any;

const HOW_IT_WORKS = [
    {
        step: "01",
        title: "LOAD",
        detail: "Plug in raw, messy data. CSVs, tickets, or direct API streams. We anonymize instantly.",
        icon: UploadCloud,
    },
    {
        step: "02",
        title: "UNLOCK",
        detail: "Our mapping engine identifies the exact friction points costing you revenue.",
        icon: Key,
    },
    {
        step: "03",
        title: "ACT",
        detail: "Get a prioritized action plan. No fluff, just the steps to scale.",
        icon: PlayCircle,
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
    <div className="relative group">
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

    return (
        <div className="bg-white text-black font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden min-h-screen">
            {/* Nav */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-black/5 text-black' : 'bg-transparent text-black'}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
                    <div className="flex items-center gap-3 shrink-0">
                        <DataUnlockLogo />
                        <span className="text-xl font-black tracking-tighter uppercase whitespace-nowrap">DATAUNLOCK</span>
                    </div>
                    <div className="hidden md:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                        <a href="#process" className="hover:text-pink-500 transition-colors">Process</a>
                        <a href="#integration" className="hover:text-pink-500 transition-colors">Integration</a>
                        <a href="#security" className="hover:text-pink-500 transition-colors">Security</a>
                    </div>
                    <a href="mailto:damien@dataunlock.ai" className="bg-black text-white p-2.5 md:px-6 md:py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all active:scale-95 shrink-0">
                        <span className="hidden md:inline">Get Pilot Access</span>
                        <Mail className="w-5 h-5 md:hidden" />
                    </a>
                </div>
            </nav>

            {/* Hero */}
            <MotionSection className="relative pt-40 pb-20 md:pt-64 md:pb-40 px-6 bg-white text-black">
                <div className="max-w-7xl mx-auto relative">
                    <div className="max-w-4xl">
                        <MotionDiv
                            initial={{ x: -40, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <div className="mb-8 inline-flex items-center gap-2 text-[10px] font-black bg-black/5 border border-black/10 px-4 py-2 rounded-full uppercase tracking-[0.3em]">
                                <Activity className="w-3 h-3 text-pink-500" /> Now Accepting Pilot Partners
                            </div>
                            <h1 className="text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter mb-12 text-black">
                                UNLOCK <br/>
                                <span className="text-pink-500 italic">REVENUE</span> <br/>
                                IN YOUR DATA.
                            </h1>
                            <p className="text-lg md:text-2xl text-gray-500 font-medium max-w-xl mb-12 leading-relaxed italic">
                                Your customer data is trapped in spreadsheets. Weeks of analysis. Delayed decisions. <span className="text-black">We unlock the strategy so you can act fast.</span>
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="mailto:damien@dataunlock.ai" className="px-10 py-6 bg-pink-600 text-white rounded-2xl font-black text-xl hover:bg-pink-50 transition-all shadow-2xl shadow-pink-500/20 text-center">
                                    Start Your Pilot
                                </a>
                            </div>
                        </MotionDiv>
                    </div>
                </div>
            </MotionSection>

            {/* How we unlock */}
            <section id="process" className="py-32 px-6 bg-white text-black border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
                        <div>
                            <p className="text-pink-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Workflow</p>
                            <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic leading-none uppercase">HOW WE UNLOCK.</h2>
                        </div>
                        <p className="text-gray-500 max-w-sm text-lg font-medium">
                            Proprietary mapping that eliminates noise and targets the signals that scale revenue.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-[2rem] overflow-hidden">
                        {HOW_IT_WORKS.map((item, i) => (
                            <div key={i} className="bg-white p-8 md:p-12 hover:bg-gray-50 transition-colors group">
                                <div className="flex justify-between items-start mb-6 md:mb-8">
                                    <div className="text-pink-500/20 text-6xl md:text-8xl font-black group-hover:text-pink-500 transition-colors duration-500 leading-none">{item.step}</div>
                                    <item.icon className="w-12 h-12 text-black/10 group-hover:text-pink-500 transition-colors duration-500" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-base md:text-lg">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Integration Section */}
            <section id="integration" className="py-32 px-6 bg-white text-black border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-24">
                        <p className="text-pink-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Architecture</p>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic leading-none mb-8 uppercase">FLEXIBLE INTEGRATION</h2>
                        <p className="text-xl font-bold uppercase tracking-widest text-gray-400">Modular design built to work for you.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col justify-between group hover:border-pink-500/20 transition-all">
                            <div>
                                <div className="text-[10px] font-black text-pink-600 bg-pink-100 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-8">Fastest</div>
                                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6">
                                    <ClipboardList className="text-white w-7 h-7" />
                                </div>
                                <h3 className="text-3xl font-black mb-4 italic">Manual Load</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    Instantly process CSVs, surveys, and tickets. No cleanup needed. Get your strategy in minutes.
                                </p>
                            </div>
                        </div>

                        <div className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col justify-between group hover:border-pink-500/20 transition-all">
                            <div>
                                <div className="text-[10px] font-black text-pink-600 bg-pink-100 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-8">Seamless</div>
                                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6">
                                    <Database className="text-white w-7 h-7" />
                                </div>
                                <h3 className="text-3xl font-black mb-4 italic">API Access</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    Connect directly to your warehouse, CRM, or support platform for real-time intelligence.
                                </p>
                            </div>
                        </div>

                        <div className="p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col justify-between group hover:border-pink-500/20 transition-all">
                            <div>
                                <div className="text-[10px] font-black text-pink-600 bg-pink-100 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-8">Active</div>
                                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6">
                                    <Bot className="text-white w-7 h-7" />
                                </div>
                                <h3 className="text-3xl font-black mb-4 italic">Chat Deploy</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">
                                    Launch multilingual AI chatbots that feed real-time customer feedback into our engine.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Case Study */}
            <section className="py-32 px-6 bg-white text-black overflow-hidden relative border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 bg-pink-500/10 px-4 py-2 rounded-full border border-pink-500/20">Case Study</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Zeus Scooters</span>
                            </div>
                            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9]">
                                MICRO-MOBILITY <br/> IMPACT. <span className="text-pink-500 italic">CHURN REDUCTION</span> FOR 150K USERS.
                            </h2>
                            
                            <div className="relative p-12 bg-gray-50 border border-gray-100 rounded-[3rem] mb-12">
                                <Quote className="absolute top-6 right-8 w-12 h-12 text-pink-500/20" />
                                <p className="text-3xl font-bold leading-tight mb-8 italic">
                                    "You've given me a step-by-step guide to reduce churn."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center font-black text-white">CK</div>
                                    <div>
                                        <div className="font-black text-lg">Chris Kemp</div>
                                        <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Deputy CEO, Zeus Scooters</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                            <div className="p-10 bg-gray-50 border border-gray-100 rounded-[2.5rem] flex flex-col justify-between hover:bg-gray-100 transition-all group">
                                <TrendingUp className="w-10 h-10 text-pink-500 mb-12" />
                                <div>
                                    <div className="text-6xl font-black mb-2">€900K</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Revenue Recovery</div>
                                </div>
                            </div>
                            <div className="p-10 bg-gray-50 border border-gray-100 rounded-[2.5rem] flex flex-col justify-between hover:bg-gray-100 transition-all group">
                                <Zap className="w-10 h-10 text-black mb-12" />
                                <div>
                                    <div className="text-6xl font-black mb-2">&lt;7D</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Execution Speed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust / Security */}
            <section id="security" className="py-32 px-6 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-2xl mb-20">
                        <p className="text-pink-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Trust & Compliance</p>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter italic leading-none mb-8 uppercase">BUILT FOR TRUST.</h2>
                        <p className="text-xl font-bold uppercase tracking-widest text-gray-400">Security by design, compliance by nature.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {COMPLIANCE_ITEMS.map((item, i) => (
                            <div key={i} className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 transition-all hover:border-pink-500/20 hover:bg-white shadow-sm">
                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                                    <item.icon className="w-6 h-6 text-pink-600" />
                                </div>
                                <h3 className="text-2xl font-black mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 px-6 bg-white text-black">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gray-50 rounded-[4rem] p-12 md:p-24 border border-gray-100 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-pink-500"></div>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 italic uppercase">READY TO UNLOCK REVENUE?</h2>
                        <p className="text-xl text-gray-500 font-medium mb-12 max-w-2xl mx-auto">
                            Stop guessing. Start knowing. Join our pilot program and turn your data into a growth engine.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                             <a href="mailto:damien@dataunlock.ai" className="px-12 py-6 bg-black text-white rounded-2xl font-black text-xl hover:bg-pink-500 transition-all flex items-center justify-center gap-3">
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
                            <div className="flex items-center gap-3 mb-6">
                                <DataUnlockLogo />
                                <span className="text-xl font-black tracking-tighter uppercase text-black">DATAUNLOCK</span>
                            </div>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest max-w-xs leading-loose">
                                © 2026 DATAUNLOCK. SECURE FEEDBACK INTELLIGENCE. PROCESSED IN THE EU.
                            </p>
                        </div>
                        <div className="max-w-md">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black mb-4">Privacy & Data</h4>
                            <p className="text-gray-400 text-xs leading-relaxed font-medium mb-4">
                                DataUnlock is committed to your privacy. We do not sell your data. All analysis is performed on anonymized datasets.
                            </p>
                            <button 
                                onClick={() => setShowPrivacy(true)}
                                className="text-[10px] font-black uppercase tracking-widest text-pink-600 hover:text-pink-500 transition-colors border-b border-pink-600/30"
                            >
                                View Privacy Policy
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-end gap-8 pt-8 border-t border-gray-50">
                         <a href="mailto:damien@dataunlock.ai" className="text-gray-400 hover:text-pink-500 transition-colors">
                            <ArrowRight className="w-6 h-6" />
                         </a>
                    </div>
                </div>
            </footer>

            {/* Privacy Policy Modal */}
            <AnimatePresence>
                {showPrivacy && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
                        <MotionDiv
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPrivacy(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <MotionDiv
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 shadow-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-pink-500" />
                            <button 
                                onClick={() => setShowPrivacy(false)}
                                className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors"
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
                                        <span className="text-black font-bold">Zero-Training Policy:</span> We never use your proprietary data to train public AI models. Your business intelligence stays your business.
                                    </p>
                                    <p>
                                        <span className="text-black font-bold">Full Anonymization:</span> Our ingestion engine strips PII (Personally Identifiable Information) before analysis begins.
                                    </p>
                                    <p>
                                        <span className="text-black font-bold">EU Sovereignty:</span> All data processing is strictly performed on infrastructure located within the EU, ensuring compliance with global GDPR standards.
                                    </p>
                                    <p>
                                        <span className="text-black font-bold">Encryption:</span> Data is protected by AES-256 encryption at rest and TLS 1.3 in transit.
                                    </p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => setShowPrivacy(false)}
                                className="w-full py-4 bg-black text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-pink-600 transition-colors"
                            >
                                Close Policy
                            </button>
                        </MotionDiv>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
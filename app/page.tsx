"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    MessageSquare,
    ChevronRight,
    ArrowRight,
    Send,
    ClipboardList,
    Zap,
    FileText,
    Mic,
    TrendingUp,
    ShieldCheck,
    Lock,
    Globe,
    FileCheck,
    Quote,
    Upload,
    Target,
    BarChart3,
    X,
    FileJson,
    Files,
    ArrowRightLeft
} from 'lucide-react';

// --- THEME CONSTANTS ---
const THEME: { [key: string]: string } = {
    pink: "bg-pink-600",
    pinkLight: "bg-pink-50",
    pinkText: "text-pink-600",
    purple: "bg-purple-500",
    purpleLight: "bg-purple-50",
    purpleText: "text-purple-600",
    cyan: "bg-cyan-500",
    cyanLight: "bg-cyan-50",
    cyanText: "text-cyan-600",
    rose: "bg-rose-500",
    roseLight: "bg-rose-50",
    roseText: "text-rose-600",
    darkText: "text-gray-900"
};

const HOW_IT_WORKS = [
    {
        step: "01",
        title: "LOAD YOUR DATA",
        detail: "Drop or send us your raw data – CSVs from survey tools, tickets, notes, whatever data you already have but currently cannot action.",
        icon: Upload,
        color: "pink"
    },
    {
        step: "02",
        title: "TELL US WHAT YOU WANT TO KNOW",
        detail: "Pick your revenue goal: Reduce churn & stop losing customers • Spot upsell & retention wins • Decide what features to build next • Uncover competition threats.",
        icon: Target,
        color: "purple"
    },
    {
        step: "03",
        title: "ACT – EXECUTE",
        detail: "We give you the Strategy: Top revenue drivers with € impact estimates • Clear, prioritized steps to execute • Exact moves to reduce churn, build winning features, spot upsell opportunities.",
        icon: BarChart3,
        color: "cyan"
    }
];

const COMPLIANCE_ITEMS = [
    { icon: ShieldCheck, title: "GDPR Compliant", detail: "✓ GDPR Compliant – No training on your data. Fully anonymized." },
    { icon: Globe, title: "Processed in EU", detail: "✓ Processed in EU – Analysis stays in GDPR infrastructure." },
    { icon: Send, title: "Global Delivery", detail: "✓ Processing secure in EU, strategy delivered worldwide." },
    { icon: Lock, title: "Enterprise Security", detail: "✓ AES 256 encryption – At rest and in transit. ✓ SOC 2 Type II Ready." }
];

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PrivacyModal = ({ isOpen, onClose }: PrivacyModalProps) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div 
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
            />
            <motion.div 
                {...({
                    initial: { opacity: 0, scale: 0.95, y: 20 },
                    animate: { opacity: 1, scale: 1, y: 0 },
                    className: "relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl p-6 md:p-12 text-sm md:text-base leading-relaxed text-gray-700"
                } as any)}
            >
                <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                </button>
                
                <div className="space-y-8 prose prose-pink max-w-none">
                    <header className="border-b border-gray-100 pb-8">
                        <h1 className="text-3xl md:text-4xl font-black text-black mb-4">DataUnlock Privacy Policy</h1>
                        <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <span>Version: 1.0</span>
                            <span>Last Updated: January 14, 2026</span>
                            <span>Effective Date: January 14, 2026</span>
                        </div>
                    </header>

                    <section>
                        <h2 className="text-xl font-black text-black uppercase tracking-tight mb-4">1. INTRODUCTION</h2>
                        <p>DataUnlock ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you participate in our pilot program and use our platform.</p>
                        <div className="bg-gray-50 p-6 rounded-2xl mt-4">
                            <h3 className="font-bold text-black mb-2 uppercase text-sm">What DataUnlock Does</h3>
                            <p className="text-sm">DataUnlock is an AI-powered feedback intelligence platform that transforms raw survey data into structured insights and executive-ready recommendations.</p>
                        </div>
                    </section>
                    <footer className="pt-8 border-t border-gray-100 text-xs text-gray-400 text-center">
                        <p>Questions about this policy? Contact <strong>privacy@dataunlock.com</strong></p>
                    </footer>
                </div>
            </motion.div>
        </div>
    );
};

const HeroGraphic = () => (
    <div className="relative w-full max-w-lg mx-auto lg:mx-0 mt-8 lg:mt-0 px-4 md:px-0">
        <motion.div 
            {...({
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8 },
                className: "flex items-center justify-between bg-white border border-gray-100 rounded-[3rem] p-8 md:p-14 shadow-2xl shadow-gray-200/50 relative overflow-hidden"
            } as any)}
        >
            {/* Messy Side - Darkened for better contrast */}
            <div className="flex flex-col items-center gap-3">
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <Files className="w-12 h-12 md:w-16 md:h-16 text-gray-400" />
                    {/* Subtle noise animation */}
                    <motion.div 
                        {...({
                            animate: { opacity: [0.4, 0.8, 0.4] },
                            transition: { repeat: Infinity, duration: 3 },
                            className: "absolute inset-0 flex items-center justify-center"
                        } as any)}
                    >
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full absolute top-2 left-2" />
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-full absolute bottom-4 right-2" />
                    </motion.div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Messy Data</span>
            </div>

            {/* Transition Path */}
            <div className="flex-1 px-4 md:px-10">
                <div className="h-0.5 w-full bg-gray-50 relative">
                    <motion.div 
                        {...({
                            animate: { left: ["-20%", "120%"], opacity: [0, 1, 0] },
                            transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                            className: "absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-pink-500 rounded-full blur-xl"
                        } as any)}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Zap className="w-5 h-5 text-pink-500 fill-pink-500" />
                    </div>
                </div>
            </div>

            {/* Strategy Side - Vibrant/Glow */}
            <div className="flex flex-col items-center gap-3">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="relative w-16 h-16 md:w-20 md:h-20 bg-pink-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-pink-300/50 group"
                >
                    <FileCheck className="w-10 h-10 md:w-12 md:h-12 text-white" />
                    <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute -inset-4 bg-pink-500/20 rounded-full blur-2xl -z-10"
                    />
                </motion.div>
                <span className="text-[10px] font-black uppercase tracking-widest text-pink-600">Strategy</span>
            </div>
        </motion.div>
    </div>
);

export default function App() {
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

    const handleEmailClick = () => {
        window.location.href = "mailto:damien@dataunlock.ai?subject=DataUnlock Inquiry";
    };

    return (
        <div className="bg-[#FAFAFA] font-sans selection:bg-pink-100 selection:text-pink-900 text-gray-900 overflow-x-hidden">
            <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />

            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 p-4 md:p-6 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-lg md:text-xl font-black tracking-tighter flex items-center gap-2">
                        <div className="w-7 h-7 md:w-8 md:h-8 bg-black rounded-lg flex items-center justify-center">
                            <MessageSquare className="text-white w-3.5 h-3.5 md:w-4 md:h-4" />
                        </div>
                        DATAUNLOCK
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                        <span className="hidden sm:block text-[9px] md:text-[10px] font-black bg-pink-100 text-pink-600 px-3 py-1 rounded-full uppercase tracking-widest">Private Beta</span>
                        <button 
                            onClick={handleEmailClick}
                            className="bg-black text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold hover:bg-gray-800 transition-all flex items-center gap-2"
                        >
                            Contact <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-28 sm:pt-36 md:pt-48 pb-16 md:pb-32 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-block mb-4 text-[10px] font-black bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full uppercase tracking-widest">Private Beta</div>
                        <h1 className="text-5xl sm:text-6xl md:text-[7rem] font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-6 md:mb-10 text-center lg:text-left">
                            DATA TO<br/>
                            <span className="text-pink-600">STRATEGY.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mb-8 md:mb-12 leading-relaxed mx-auto lg:mx-0 text-center lg:text-left">
                            You have customer feedback, survey responses, support tickets sitting in spreadsheets. We turn them into clear strategic priorities with revenue impact... <span className="text-black font-bold">Fast and Secure.</span>
                        </p>
                    </motion.div>
                    
                    <HeroGraphic />
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 md:py-24 px-6 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-12 md:mb-20">How it works</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {HOW_IT_WORKS.map((item, i) => (
                            <div key={i}>
                                <div className="text-5xl md:text-7xl font-black text-gray-50 mb-3 md:mb-4">{item.step}</div>
                                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${THEME[item.color + 'Light']} flex items-center justify-center mb-5 md:mb-6`}>
                                    <item.icon className={`w-6 h-6 md:w-7 md:h-7 ${THEME[item.color + 'Text']}`} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 tracking-tight uppercase">{item.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Case: Zeus Scooters */}
            <section className="py-20 md:py-24 px-6 bg-black text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 md:gap-16 items-center">
                        <div className="lg:w-1/2">
                            <div className="flex items-center gap-3 mb-6 md:mb-8">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-pink-500 bg-pink-500/10 px-3 md:px-4 py-2 rounded-full">Success Case</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500">Zeus Scooters</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 md:mb-10 leading-[1] md:leading-[0.9]">
                                Reducing <span className="text-pink-500">Churn</span> across Europe.
                            </h2>
                            
                            <div className="relative p-6 md:p-12 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] mb-8 md:mb-12">
                                <Quote className="absolute top-4 md:top-6 right-6 md:right-8 w-8 h-8 md:w-12 md:h-12 text-pink-500/20" />
                                <p className="text-2xl md:text-3xl font-bold leading-tight mb-6 md:mb-8">
                                    "You've given me a step-by-step guide to reduce churn."
                                </p>
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-600 rounded-full flex items-center justify-center font-black text-sm md:text-base">CK</div>
                                    <div>
                                        <div className="font-black text-base md:text-lg">Chris Kemp</div>
                                        <div className="text-gray-500 text-[10px] md:text-sm font-bold uppercase tracking-widest">Deputy CEO, Zeus Scooters</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                            <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between hover:bg-white/10 transition-all">
                                <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-pink-500 mb-8 md:mb-12" />
                                <div>
                                    <div className="text-4xl md:text-5xl font-black mb-2">€900K</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Annual Projected<br/>Revenue Recovery</div>
                                </div>
                            </div>
                            <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between hover:bg-white/10 transition-all">
                                <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-cyan-500 mb-8 md:mb-12" />
                                <div>
                                    <div className="text-4xl md:text-5xl font-black mb-2">10K</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Customers Targeted<br/>for Win-Back Q1</div>
                                </div>
                            </div>
                            <div className="p-8 md:p-10 bg-pink-600 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between md:col-span-2">
                                <div className="flex justify-between items-start">
                                    <Zap className="w-8 h-8 md:w-10 md:h-10 text-white mb-8 md:mb-12" />
                                    <div className="text-right">
                                        <div className="text-4xl md:text-5xl font-black leading-none">&lt;7</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mt-1">Days</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xl md:text-2xl font-black mb-1">Strategy Delivered</div>
                                    <div className="text-[10px] md:text-xs font-bold opacity-80 uppercase tracking-widest">Full roadmap to European market retention</div>
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
                        <div className="max-w-2xl text-center lg:text-left">
                            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-4">Trust & Compliance.</h2>
                            <p className="text-lg md:text-2xl text-gray-500 font-bold uppercase tracking-widest leading-tight">BUILT FOR TRUST.<br/><span className="text-sm font-bold opacity-60">Security by design, compliance by nature.</span></p>
                        </div>
                        <button 
                            onClick={() => setIsPrivacyOpen(true)}
                            className="flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-pink-600 border-b-2 border-pink-100 pb-1 hover:border-pink-600 transition-all w-fit mx-auto lg:mx-0"
                        >
                            Privacy Statement <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {COMPLIANCE_ITEMS.map((item, i) => (
                            <div key={i} className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm transition-all hover:shadow-md">
                                <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center mb-6">
                                    <item.icon className="w-5 h-5 text-pink-600" />
                                </div>
                                <h3 className="text-lg md:text-xl font-black mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-[11px] md:text-xs font-medium text-gray-500 leading-relaxed">{item.detail}</p>
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
                        READY TO <br/><span className="text-pink-600">UNLOCK.</span>
                    </h2>
                    <button
                        onClick={handleEmailClick}
                        className="inline-flex items-center justify-center w-full max-w-2xl py-8 md:py-10 text-2xl md:text-4xl font-black rounded-[2rem] md:rounded-[3rem] bg-black text-white hover:scale-[1.02] shadow-2xl transition-all"
                    >
                        Contact Us <ChevronRight className="ml-2 md:ml-4 w-6 h-6 md:w-10 md:h-10" />
                    </button>
                    <p className="mt-8 md:mt-12 text-[10px] md:text-sm font-black text-gray-400 uppercase tracking-widest">Limited slots available for Q1 2026</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 md:py-16 bg-white px-8 border-t border-gray-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-lg md:text-xl font-black tracking-tighter flex items-center gap-2">
                        <div className="w-7 h-7 md:w-8 md:h-8 bg-black rounded-lg flex items-center justify-center">
                            <MessageSquare className="text-white w-3.5 h-3.5 md:w-4 md:h-4" />
                        </div>
                        DATAUNLOCK
                    </div>
                    <div className="text-[9px] md:text-[10px] font-black text-gray-300 uppercase tracking-widest italic text-center">© 2026 ALL RIGHTS RESERVED</div>
                </div>
            </footer>
        </div>
    );
}
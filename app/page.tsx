"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
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
    Database,
    Bot,
    Monitor
} from 'lucide-react';

// --- THEME CONSTANTS ---
const THEME: Record<string, string> = {
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
        title: "Load",
        detail: "Load Raw Data. Instantly process your CSVs, surveys, and support tickets. No cleanup, no reformatting — we extract the raw customer voice immediately.",
        link: "See our data governance policy",
        icon: FileText,
        color: "pink"
    },
    {
        step: "02",
        title: "Unlock",
        detail: "Strategic Mapping. Unlock the revenue hidden in your data. Build a clear strategy showing exactly what moves the needle — replacing weeks of manual analysis.",
        link: "See example report",
        icon: Zap,
        color: "purple"
    },
    {
        step: "03",
        title: "Impact",
        detail: "Direct Revenue Impact. Execute with the confidence that comes from a data-led strategy. Turn customer feedback into tangible improvements that scale revenue.",
        link: "See case study",
        icon: TrendingUp,
        color: "cyan"
    }
];

const COMPLIANCE_ITEMS = [
    { icon: ShieldCheck, title: "GDPR Compliant", detail: "Data processed within EU." },
    { icon: FileCheck, title: "SOC 2 Type II Ready", detail: "Strict auditing procedures." },
    { icon: Lock, title: "Privacy by Design", detail: "Encryption at rest and transit." },
    { icon: Globe, title: "Global Compliance", detail: "Process locally, strategy securely." }
];

const StrategyReportGraphic = () => {
    return (
        <div className="relative w-full h-[600px] sm:h-[750px] md:h-[850px] flex items-center justify-center scale-100 transition-transform duration-500">
            <motion.div 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-20 w-[320px] sm:w-[400px] md:w-[520px] aspect-[16/10] bg-white rounded-[2.5rem] md:rounded-[4rem] border-[10px] md:border-[16px] border-gray-900 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)] overflow-hidden"
            >
                {/* Screen Content */}
                <div className="w-full h-full flex flex-col bg-[#fdfdfd]">
                    {/* Top Bar */}
                    <div className="h-8 md:h-12 border-b border-gray-100 flex items-center justify-between px-4 md:px-7 bg-white shrink-0">
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-4 h-4 md:w-6 md:h-6 rounded bg-gray-900 flex items-center justify-center">
                                <Zap className="w-2 h-2 md:w-3 h-3 text-white" />
                            </div>
                            <div className="text-[9px] md:text-sm font-black tracking-tight">Revenue Dashboard</div>
                        </div>
                        <div className="flex gap-1.5 md:gap-2">
                            <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-gray-200" />
                            <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-gray-200" />
                            <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-gray-200" />
                        </div>
                    </div>

                    {/* Dashboard Content */}
                    <div className="flex-1 p-4 md:p-6 space-y-3 md:space-y-5">
                        <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                            <div className="bg-cyan-50 text-cyan-600 text-[8px] md:text-[9px] font-black px-3 md:px-4 py-1 md:py-1.5 rounded-full inline-block">
                                CRITICAL FINDING
                            </div>
                            <h3 className="text-sm md:text-base font-black text-black mt-2 md:mt-3 leading-tight">Churn risk identified in Enterprise</h3>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-2 md:gap-4">
                            <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
                                <div className="p-3 md:p-4 rounded-lg bg-gray-50 border border-gray-100">
                                    <div className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase mb-1 md:mb-2 tracking-widest">Cause</div>
                                    <p className="text-[8px] md:text-[9px] text-gray-600 font-medium leading-snug">Integrations stalling expansion</p>
                                </div>
                            </motion.div>
                            <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
                                <div className="p-3 md:p-4 rounded-lg bg-pink-50 border border-pink-100">
                                    <div className="text-[8px] md:text-[9px] font-bold text-pink-400 uppercase mb-1 md:mb-2 tracking-widest">Status</div>
                                    <p className="text-[8px] md:text-[9px] text-pink-600 font-bold">Strategy unlocked</p>
                                </div>
                            </motion.div>
                        </div>

                        <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
                            <div className="space-y-1.5 md:space-y-2">
                                <div className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase tracking-widest">Actions</div>
                                <div className="flex items-center gap-2 md:gap-3 p-2 md:p-3 bg-white border border-gray-100 rounded-lg md:rounded-xl">
                                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-cyan-600 flex items-center justify-center text-[7px] md:text-[8px] text-white font-bold flex-shrink-0">1</div>
                                    <div className="text-[8px] md:text-[9px] font-semibold text-black truncate">Deploy Sync beta to DACH</div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}>
                            <div className="p-3 md:p-4 bg-gray-900 rounded-lg md:rounded-xl text-white">
                                <div className="text-[8px] md:text-[9px] font-bold text-gray-400 uppercase mb-2 md:mb-3 tracking-widest">Impact</div>
                                <div className="text-2xl md:text-3xl font-black">+€84k</div>
                                <div className="text-[7px] md:text-[8px] font-bold text-green-400 uppercase mt-1">Monthly Uplift</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Monitor Stand */}
            <div className="absolute top-[calc(50%+180px)] sm:top-[calc(50%+230px)] md:top-[calc(50%+280px)] left-1/2 -translate-x-1/2 w-28 sm:w-40 md:w-56 h-2.5 md:h-4 bg-gray-800 rounded-t-lg z-10" />
            <div className="absolute top-[calc(50%+182px)] sm:top-[calc(50%+232px)] md:top-[calc(50%+282px)] left-1/2 -translate-x-1/2 w-20 sm:w-28 md:w-40 h-20 sm:h-28 md:h-32 bg-gray-900 -z-10" />

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[700px] h-[300px] md:h-[500px] bg-pink-500/10 rounded-full blur-[80px] md:blur-[120px] -z-20" />
        </div>
    );
};

export default function App() {
    return (
        <div className="bg-[#FAFAFA] font-sans selection:bg-pink-100 selection:text-pink-900 text-gray-900 overflow-x-hidden">
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 px-4 md:px-6 py-4 md:py-6 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-lg md:text-xl font-black tracking-tighter flex items-center gap-2">
                        <div className="w-7 h-7 md:w-8 md:h-8 bg-black rounded-lg flex items-center justify-center">
                            <FileText className="text-white w-3.5 h-3.5 md:w-4 md:h-4" />
                        </div>
                        DATAUNLOCK
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                        <span className="hidden sm:block text-[9px] md:text-[10px] font-black bg-pink-100 text-pink-600 px-3 py-1 rounded-full uppercase tracking-widest">Early Access</span>
                        <button 
                            onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-black text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold hover:bg-gray-800 transition-all flex items-center gap-2"
                        >
                            Pilot <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-28 sm:pt-36 md:pt-48 pb-16 md:pb-32 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-block mb-4 text-[10px] font-black bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full uppercase tracking-widest">Early Access</div>
                        <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-6 md:mb-10">
                            Unlock the revenue <br/>
                            <span className="text-pink-600">in your data.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-xl mb-8 md:mb-12 leading-relaxed">
                            Customer data matters. We extract raw intelligence and turn it into high-impact strategy.
                        </p>
                        <button 
                            onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full sm:w-auto px-8 md:px-10 py-5 md:py-6 bg-black text-white rounded-2xl font-black text-xl md:text-2xl hover:scale-105 transition-all shadow-2xl shadow-gray-200"
                        >
                            Join as Pilot
                        </button>
                    </motion.div>
                    <StrategyReportGraphic />
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
                                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base mb-4">{item.detail}</p>
                                <a href="#" className="text-pink-600 text-xs md:text-sm font-bold hover:text-pink-700 transition-colors inline-flex items-center gap-1">
                                    {item.link} <ChevronRight className="w-3 h-3" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Flexible Integration */}
            <section className="py-20 md:py-24 px-6 bg-[#FAFAFA]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 md:mb-16">
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-4">Flexible Integration</h2>
                        <p className="text-lg md:text-xl text-gray-400 font-bold uppercase tracking-widest">Designed to be modular for you.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="p-8 md:p-10 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm h-full flex flex-col">
                                <div className="text-[9px] font-black text-pink-600 bg-pink-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-6">Fastest</div>
                                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${THEME.pinkLight} flex items-center justify-center mb-6`}>
                                    <ClipboardList className={`w-6 h-6 md:w-7 md:h-7 ${THEME.pinkText}`} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">Manual Load</h3>
                                <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base">Instantly process CSVs, surveys, and tickets. Get your strategy in minutes.</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="p-8 md:p-10 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm h-full flex flex-col">
                                <div className="text-[9px] font-black text-purple-600 bg-purple-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-6">Enterprise</div>
                                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${THEME.purpleLight} flex items-center justify-center mb-6`}>
                                    <Database className={`w-6 h-6 md:w-7 md:h-7 ${THEME.purpleText}`} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">API Integration</h3>
                                <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base">Connect to your data warehouse, CRM, or support platform. Real-time processing.</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="p-8 md:p-10 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm h-full flex flex-col">
                                <div className="text-[9px] font-black text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-6">Active</div>
                                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${THEME.cyanLight} flex items-center justify-center mb-6`}>
                                    <Bot className={`w-6 h-6 md:w-7 md:h-7 ${THEME.cyanText}`} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4">Deploy Chatbots</h3>
                                <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base">Launch multilingual AI chatbots that collect feedback in real-time and feed into our engine.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Success Case */}
            <section className="py-20 md:py-24 px-6 bg-black text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 md:gap-16 items-start lg:items-center">
                        <div className="lg:w-1/2">
                            <div className="flex items-center gap-3 mb-6 md:mb-8">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-pink-500 bg-pink-500/10 px-3 md:px-4 py-2 rounded-full">Success Case</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500">Zeus Scooters</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-8 md:mb-10 leading-[1] md:leading-[0.9]">
                                Reducing <span className="text-pink-500">Churn</span> across Europe.
                            </h2>
                            
                            <div className="relative p-6 md:p-10 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] mb-8 md:mb-12">
                                <Quote className="absolute top-4 md:top-6 right-6 md:right-8 w-8 h-8 md:w-10 md:h-10 text-pink-500/20" />
                                <p className="text-lg sm:text-xl md:text-2xl font-bold leading-tight mb-6 md:mb-8">
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
                                <Zap className="w-8 h-8 md:w-10 md:h-10 text-cyan-500 mb-8 md:mb-12" />
                                <div>
                                    <div className="text-4xl md:text-5xl font-black mb-2">&lt;7d</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Strategy<br/>Delivered</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] -z-10" />
            </section>

            {/* Compliance Section */}
            <section className="py-20 md:py-32 px-6 bg-gray-50 border-y border-gray-100 overflow-hidden relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-10 mb-12 md:mb-20">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-4">Compliance.</h2>
                            <p className="text-lg md:text-2xl text-gray-500 font-bold uppercase tracking-widest">Built-in by design.</p>
                        </div>
                        <button className="flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-pink-600 border-b-2 border-pink-100 pb-1 hover:border-pink-600 transition-all w-fit">
                            Full Security Report <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {COMPLIANCE_ITEMS.map((item, i) => (
                            <div key={i} className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm transition-all hover:shadow-md">
                                <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center mb-6">
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
                        Let's unlock <br/><span className="text-pink-600">your revenue.</span>
                    </h2>
                    <a
                        href="mailto:hello@dataunlock.io?subject=DataUnlock Early Access Inquiry"
                        className="inline-flex items-center justify-center w-full max-w-2xl py-8 md:py-10 text-2xl md:text-4xl font-black rounded-[2rem] md:rounded-[3rem] bg-black text-white hover:scale-[1.02] shadow-2xl transition-all"
                    >
                        Contact Us <ChevronRight className="ml-2 md:ml-4 w-6 h-6 md:w-10 md:h-10" />
                    </a>
                    <p className="mt-8 md:mt-12 text-[10px] md:text-sm font-black text-gray-400 uppercase tracking-widest">Limited slots available for 2026</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 md:py-16 bg-white px-8 border-t border-gray-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-lg md:text-xl font-black tracking-tighter flex items-center gap-2">
                        <div className="w-7 h-7 md:w-8 md:h-8 bg-black rounded-lg flex items-center justify-center">
                            <FileText className="text-white w-3.5 h-3.5 md:w-4 md:h-4" />
                        </div>
                        DATAUNLOCK
                    </div>
                    <div className="text-[9px] md:text-[10px] font-black text-gray-300 uppercase tracking-widest italic text-center">© 2026 ALL RIGHTS RESERVED</div>
                </div>
            </footer>
        </div>
    );
}
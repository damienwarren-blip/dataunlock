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
const THEME = {
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
        detail: "Load Raw Data. Instantly process your CSVs, surveys, and support tickets. No cleanup, no reformatting — we extract the raw customer voice immediately. You stay in control. Your data stays private.",
        link: "See our data governance policy",
        icon: FileText,
        color: "pink"
    },
    {
        step: "02",
        title: "Unlock",
        detail: "Strategic Mapping. This is where we unlock the revenue hidden in your data. We build a clear strategy showing exactly what moves the needle — replacing weeks of manual analysis with instant, revenue-focused priorities.",
        link: "See example report",
        icon: Zap,
        color: "purple"
    },
    {
        step: "03",
        title: "Impact",
        detail: "Direct Revenue Impact. Execute with the confidence that comes from a data-led strategy. Turn customer feedback into tangible improvements that build trust and scale your revenue.",
        link: "See case study",
        icon: TrendingUp,
        color: "cyan"
    }
];

const COMPLIANCE_ITEMS = [
    { icon: ShieldCheck, title: "GDPR Compliant", detail: "Data processed within EU." },
    { icon: FileCheck, title: "SOC 2 Type II Ready", detail: "Strict auditing procedures." },
    { icon: Lock, title: "Privacy by Design Architecture", detail: "Encryption at rest and transit." },
    { icon: Globe, title: "Survey Globally → Strategy Home", detail: "Process customer data where they live. Send strategy back compliant." }
];

const StrategyReportGraphic = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center py-6 sm:py-12">
            {/* Desktop Monitor Frame */}
            <motion.div 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-20 w-full aspect-[16/10] bg-white rounded-xl sm:rounded-2xl border-[6px] sm:border-[12px] border-gray-900 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] overflow-hidden font-sans"
            >
                {/* Screen Content */}
                <div className="w-full h-full flex flex-col bg-[#fdfdfd] overflow-y-auto sm:overflow-hidden">
                    {/* Top Bar */}
                    <div className="h-8 sm:h-14 border-b border-gray-100 flex items-center justify-between px-3 sm:px-6 bg-white shrink-0">
                        <div className="flex items-center gap-1.5 sm:gap-3">
                            <div className="w-4 h-4 sm:w-8 sm:h-8 rounded sm:rounded-lg bg-gray-900 flex items-center justify-center">
                                <Zap className="w-2.5 h-2.5 sm:w-4 h-4 text-white" />
                            </div>
                            <div className="text-[10px] sm:text-sm font-black tracking-tight truncate">Revenue Strategy Dashboard</div>
                        </div>
                        <div className="flex gap-1 sm:gap-2">
                            <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-gray-200" />
                            <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-gray-200" />
                            <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-gray-200" />
                        </div>
                    </div>

                    {/* Dashboard Layout */}
                    <div className="flex-1 p-3 sm:p-6 grid grid-cols-12 gap-3 sm:gap-6">
                        {/* Sidebar/Main Content */}
                        <div className="col-span-12 sm:col-span-8 space-y-3 sm:space-y-6">
                            <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                                <div className="bg-cyan-50 text-cyan-600 text-[8px] sm:text-[10px] font-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase inline-block mb-1 sm:mb-3">
                                    Critical Finding
                                </div>
                                <h2 className="text-base sm:text-3xl font-black text-black leading-tight">Churn risk identified in Enterprise Tier</h2>
                            </motion.div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                                <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }} className="p-2 sm:p-5 rounded-lg sm:rounded-2xl bg-gray-50 border border-gray-100">
                                    <div className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase mb-0.5 sm:mb-2">Primary Cause</div>
                                    <p className="text-[10px] sm:text-sm text-gray-600 font-medium leading-relaxed">
                                        Integrations complexity is stalling 40% of post-onboarding expansion.
                                    </p>
                                </motion.div>
                                <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="hidden sm:block p-5 rounded-2xl bg-pink-50 border border-pink-100">
                                    <div className="text-[10px] font-bold text-pink-400 uppercase mb-2">Action Status</div>
                                    <p className="text-sm text-pink-600 font-bold leading-relaxed italic">
                                        Strategy unlocked instantly.
                                    </p>
                                </motion.div>
                            </div>

                            <div className="space-y-1.5 sm:space-y-3">
                                <div className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase">Recommended Actions</div>
                                <div className="space-y-1 sm:space-y-2">
                                    <motion.div initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.9 }} className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-3 bg-white border border-gray-100 rounded-lg sm:rounded-xl">
                                        <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-cyan-600 flex items-center justify-center text-[8px] sm:text-[10px] text-white font-bold shrink-0">1</div>
                                        <div className="text-[10px] sm:text-sm font-semibold text-black truncate">Deploy "One-Click Sync" beta to DACH.</div>
                                    </motion.div>
                                    <motion.div initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.1 }} className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-3 bg-white border border-gray-100 rounded-lg sm:rounded-xl opacity-50">
                                        <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-cyan-100 flex items-center justify-center text-[8px] sm:text-[10px] text-cyan-600 font-bold shrink-0">2</div>
                                        <div className="text-[10px] sm:text-sm font-semibold text-gray-500 truncate">Prioritize API docs for Segment.</div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Side Stats */}
                        <div className="col-span-12 sm:col-span-4 space-y-3 sm:space-y-6">
                            <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.3 }} className="p-3 sm:p-6 bg-gray-900 rounded-lg sm:rounded-2xl text-white h-full flex flex-col justify-between">
                                <div>
                                    <div className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase mb-1 sm:mb-4">Projected Impact</div>
                                    <div className="text-xl sm:text-5xl font-black text-white">+€84k</div>
                                    <div className="mt-0.5 sm:mt-2 text-[8px] sm:text-xs font-bold text-green-400">Monthly Revenue Uplift</div>
                                </div>
                                <div className="hidden sm:block space-y-4">
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }} 
                                            animate={{ width: "75%" }} 
                                            transition={{ delay: 1.5, duration: 1 }}
                                            className="h-full bg-pink-500" 
                                        />
                                    </div>
                                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">Confidence Score: 94%</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Monitor Stand */}
            <div className="absolute top-[calc(50%+45px)] sm:top-[calc(50%+150px)] lg:top-[calc(50%+180px)] left-1/2 -translate-x-1/2 w-20 sm:w-48 h-2 sm:h-4 bg-gray-800 rounded-t-lg sm:rounded-t-xl z-10" />
            <div className="absolute top-[calc(50%+47px)] sm:top-[calc(50%+154px)] lg:top-[calc(50%+184px)] left-1/2 -translate-x-1/2 w-12 sm:w-32 h-12 sm:h-24 bg-gray-900 -z-10" />

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[400px] bg-pink-500/10 rounded-full blur-[60px] sm:blur-[100px] -z-20" />
        </div>
    );
};

export default function App() {
    return (
        <div className="bg-[#FAFAFA] font-sans selection:bg-pink-100 selection:text-pink-900 text-gray-900 overflow-x-hidden">
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 px-4 sm:px-6 py-4 sm:py-6 bg-white/70 backdrop-blur-2xl border-b border-gray-100 transition-all">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-lg sm:text-xl font-black tracking-tighter flex items-center gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center">
                            <FileText className="text-white w-3.5 h-3.5 sm:w-4 h-4" />
                        </div>
                        DATAUNLOCK
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <span className="hidden md:block text-[10px] font-black bg-pink-100 text-pink-600 px-3 py-1 rounded-full uppercase tracking-widest">Early access beta</span>
                        <button 
                            onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-black text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-black/5"
                        >
                            Pilot Partner <ArrowRight className="w-3.5 h-3.5 sm:w-4 h-4" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 sm:pt-48 pb-20 sm:pb-32 px-4 sm:px-6 max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="lg:w-1/2">
                        <div className="inline-block mb-6 text-[10px] font-black bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full uppercase tracking-widest">Early access for pilot partners</div>
                        <h1 className="text-[clamp(3.5rem,10vw,9rem)] font-black mb-8 sm:mb-16 tracking-tighter leading-[0.85]">
                            Unlock the revenue <br/><span className="text-pink-600 italic">in your data.</span>
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-500 font-medium max-w-xl mb-10 sm:mb-12 leading-relaxed italic">
                            Your customer data matters. But it's trapped in spreadsheets and survey tools. Weeks of analysis. Delayed decisions. We unlock the strategy enabling you to act.... <span className="text-pink-600 italic font-bold">Fast, Secure Intelligence.</span>
                        </p>
                        <button 
                            onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
                            className="w-full sm:w-auto px-8 sm:px-10 py-5 sm:py-6 bg-black text-white rounded-xl sm:rounded-2xl font-black text-xl sm:text-2xl hover:bg-pink-600 transition-all active:scale-[0.98] shadow-2xl shadow-gray-200"
                        >
                            Join as Pilot Partner
                        </button>
                    </motion.div>
                    <div className="lg:w-1/2 w-full">
                        <StrategyReportGraphic />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 sm:py-32 px-4 sm:px-6 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-16 sm:mb-20 italic">The Process. How we unlock.</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
                        {HOW_IT_WORKS.map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="text-5xl sm:text-6xl font-black text-gray-100 mb-4">{item.step}</div>
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${THEME[item.color + 'Light']} flex items-center justify-center mb-6`}>
                                    <item.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${THEME[item.color + 'Text']}`} />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black mb-3 sm:mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-sm sm:text-base text-gray-500 font-medium leading-relaxed mb-4">{item.detail}</p>
                                <a href="#" className="text-pink-600 text-sm font-bold hover:underline transition-all inline-flex items-center gap-1">
                                    {item.link} <ChevronRight className="w-3 h-3" />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Flexible Integration */}
            <section className="py-20 sm:py-32 px-4 sm:px-6 bg-[#FAFAFA]">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 sm:mb-24">
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 italic">Flexible Integration</h2>
                        <p className="text-lg sm:text-2xl text-gray-400 font-bold uppercase tracking-widest">Designed to be modular - we make it work for you.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="p-8 sm:p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm"
                        >
                            <div className="text-[10px] font-black text-pink-600 bg-pink-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-8">Fastest to value</div>
                            <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center mb-6">
                                <ClipboardList className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black mb-4">Manual Load</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                Instantly process your CSVs, surveys, and support tickets. No cleanup, no reformatting — Get your strategy in minutes.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="p-8 sm:p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm"
                        >
                            <div className="text-[10px] font-black text-purple-600 bg-purple-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-8">Enterprise ready</div>
                            <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center mb-6">
                                <Database className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black mb-4">API Integration</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                Connect directly to your data warehouse, CRM, or support platform. Real-time feedback processing. Fully documented.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="p-8 sm:p-10 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm"
                        >
                            <div className="text-[10px] font-black text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-8">Active listening</div>
                            <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center mb-6">
                                <Bot className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black mb-4">Deploy Chatbots</h3>
                            <p className="text-gray-500 font-medium leading-relaxed">
                                Launch multilingual AI chatbots that collect feedback in real-time and feed directly into our engine.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Success Case */}
            <section className="py-20 sm:py-32 px-4 sm:px-6 bg-black text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                        <div className="lg:w-1/2">
                            <div className="flex items-center gap-3 mb-6 sm:mb-8">
                                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-pink-500 bg-pink-500/10 px-4 py-2 rounded-full border border-pink-500/20">Case Study</span>
                                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Zeus Scooters</span>
                            </div>
                            <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-8 sm:mb-10 leading-[0.95] sm:leading-[0.9]">
                                Micro-Mobility Impact. <span className="text-pink-500 italic">Reducing churn</span> for 150k users.
                            </h2>
                            
                            <div className="relative p-8 sm:p-12 bg-white/5 border border-white/10 rounded-[2.5rem] sm:rounded-[3rem] mb-0 lg:mb-12">
                                <Quote className="absolute top-6 right-8 w-10 h-10 sm:w-12 sm:h-12 text-pink-500/20" />
                                <p className="text-xl sm:text-3xl font-bold leading-tight mb-8">
                                    "You've given me a step-by-step guide to reduce churn."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-600 rounded-full flex items-center justify-center font-black text-sm sm:text-base">CK</div>
                                    <div>
                                        <div className="font-black text-base sm:text-lg">Chris Kemp</div>
                                        <div className="text-gray-500 text-[10px] sm:text-sm font-bold uppercase tracking-widest leading-none">Deputy CEO, Zeus Scooters</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
                            <div className="p-8 sm:p-10 bg-white/5 border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] flex flex-col justify-between hover:bg-white/10 transition-all group">
                                <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500 mb-10 sm:mb-12 group-hover:scale-110 transition-transform" />
                                <div>
                                    <div className="text-4xl sm:text-5xl font-black mb-2">€900K</div>
                                    <div className="text-[9px] sm:text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Revenue Recovery</div>
                                </div>
                            </div>
                            <div className="p-8 sm:p-10 bg-white/5 border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] flex flex-col justify-between hover:bg-white/10 transition-all group">
                                <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-500 mb-10 sm:mb-12 group-hover:scale-110 transition-transform" />
                                <div>
                                    <div className="text-4xl sm:text-5xl font-black mb-2">&lt;7d</div>
                                    <div className="text-[9px] sm:text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Execution Speed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Compliance */}
            <section className="py-20 sm:py-32 px-4 sm:px-6 bg-gray-50 border-y border-gray-100 overflow-hidden relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 sm:mb-20">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-4 italic">Built for Trust.</h2>
                            <p className="text-base sm:text-xl text-gray-400 font-bold uppercase tracking-widest">Compliance by design.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {COMPLIANCE_ITEMS.map((item, i) => (
                            <div key={i} className="bg-white p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-200 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                                <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center mb-6">
                                    <item.icon className="w-5 h-5 text-pink-600" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black mb-1 tracking-tight">{item.title}</h3>
                                <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section id="final-cta" className="py-24 sm:py-48 px-4 sm:px-6 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-[clamp(3rem,8vw,8rem)] font-black mb-10 sm:mb-16 tracking-tighter leading-[0.85]">
                        Unlock the revenue <br/><span className="text-pink-600 italic">in your data.</span>
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed italic">
                        We're looking to partner with forward-thinking teams to help shape the future of DataUnlock. Let's talk about what would work for you.
                    </p>
                    <a
                        href="https://DataUnlock.io"
                        className="inline-flex items-center justify-center w-full max-w-2xl py-8 sm:py-10 text-2xl sm:text-4xl font-black rounded-[2.5rem] sm:rounded-[3rem] bg-black text-white hover:bg-pink-600 transition-all active:scale-[0.98] shadow-2xl shadow-black/10 group"
                    >
                        Join as Pilot Partner <ChevronRight className="ml-3 sm:ml-4 w-8 h-8 sm:w-10 sm:h-10 group-hover:translate-x-2 transition-transform" />
                    </a>
                    <p className="mt-12 text-[10px] sm:text-sm font-black text-gray-400 uppercase tracking-[0.4em]">DataUnlock.io</p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 sm:py-16 bg-white px-4 sm:px-8 border-t border-gray-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-lg sm:text-xl font-black tracking-tighter flex items-center gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center">
                            <FileText className="text-white w-3.5 h-3.5 sm:w-4 h-4" />
                        </div>
                        DATAUNLOCK
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-black text-gray-300 uppercase tracking-widest italic text-center">Privacy | Ethics © 2026 DataUnlock Operations.</div>
                </div>
            </footer>
        </div>
    );
}
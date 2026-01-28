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
    ArrowRightLeft,
    Database,
    Search,
    BrainCircuit,
    Lightbulb,
    Map
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
        title: "Understand Your Challenge",
        detail: "High CAC eating margins. Customers leaving. You don't know why. **We define the real problem.**",
        icon: Search,
        color: "pink"
    },
    {
        step: "02",
        title: "Analyze Your Data",
        detail: "We process your customer feedback, support tickets, churn records – **fast, secure, your data stays yours.**",
        icon: BrainCircuit,
        color: "purple"
    },
    {
        step: "03",
        title: "Identify the Drivers of Revenue",
        detail: "What's actually causing churn – **data-led, no guesswork.**",
        icon: Lightbulb,
        color: "cyan"
    },
    {
        step: "04",
        title: "Deliver a Roadmap to Impact",
        detail: "Here's what to fix, in priority order. **So you can act fast.**",
        icon: Map,
        color: "rose"
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
    
    const MotionDiv = motion.div as any;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <div 
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
            />
            <MotionDiv 
                className="relative bg-white w-full max-w-4xl h-full max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl p-6 md:p-12 text-sm md:text-base leading-relaxed text-gray-700"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
            >
                <button onClick={onClose} className="fixed md:absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-md hover:bg-gray-100 rounded-full transition-colors z-[110]">
                    <X className="w-6 h-6" />
                </button>
                
                <div className="space-y-10 prose prose-pink max-w-none">
                    <header className="border-b border-gray-100 pb-8">
                        <h1 className="text-3xl md:text-4xl font-black text-black mb-4">DataUnlock Privacy Policy</h1>
                        <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <span>Version: 1.0</span>
                            <span>Last Updated: January 14, 2026</span>
                            <span>Effective Date: January 14, 2026</span>
                        </div>
                    </header>

                    <section className="space-y-4">
                        <h2 className="text-xl font-black text-black uppercase tracking-tight">1. INTRODUCTION</h2>
                        <p>DataUnlock ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you participate in our pilot program and use our platform.</p>
                        
                        <div className="bg-gray-50 p-6 rounded-2xl">
                            <h3 className="font-bold text-black mb-2 uppercase text-sm italic">What DataUnlock Does</h3>
                            <p className="text-sm">DataUnlock is an AI-powered feedback intelligence platform that transforms raw survey data into structured insights and executive-ready recommendations. The system:</p>
                            <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
                                <li>Ingests structured survey or feedback data (CSV or Excel files)</li>
                                <li>Automatically detects question types (numeric, categorical, binary, or text/open-ended)</li>
                                <li>Applies appropriate analysis strategies: statistical analysis for numeric/categorical data, semantic clustering for text responses</li>
                                <li>Optionally uses large language models (LLMs) to generate human-readable insights, summaries, root cause analyses, and recommended actions</li>
                                <li>Produces executive-ready reports and structured JSON output</li>
                            </ul>
                        </div>
                        
                        <div className="bg-pink-50/50 p-6 rounded-2xl border border-pink-100">
                            <h3 className="font-bold text-pink-900 mb-2 uppercase text-sm">Company Details</h3>
                            <p className="text-sm">DataUnlock is based in Ireland and is committed to operating in compliance with GDPR and EU data protection standards.</p>
                        </div>
                        <p className="italic text-sm text-gray-500">Please read this carefully. By accessing DataUnlock, you acknowledge you have read and understood this Privacy Policy and our Pilot Consent Form.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-black text-black uppercase tracking-tight">2. WHO WE ARE & YOUR ROLE</h2>
                        <p>DataUnlock processes data on your behalf as a <strong>Data Processor</strong>. You (the pilot partner organization) are the <strong>Data Controller</strong>, responsible for:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Ensuring lawful collection of survey/feedback data from your respondents/customers</li>
                            <li>Obtaining necessary consents from individuals whose data you provide</li>
                            <li>Complying with data protection laws in your jurisdiction</li>
                            <li>Validating our analysis and insights before making business decisions</li>
                        </ul>
                        
                        <div className="border-l-4 border-gray-200 pl-4 py-2 mt-4">
                            <h3 className="font-bold text-black text-sm uppercase mb-2">Support for Organizations Without Dedicated Legal Resources</h3>
                            <p className="text-sm">If your organization does not have a dedicated Data Protection Officer (DPO) or legal team, we recommend:</p>
                            <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
                                <li>Consulting with your local data protection authority for guidance</li>
                                <li>Engaging external legal counsel if needed</li>
                                <li>Reaching out to us at <strong>privacy@dataunlock.com</strong> for clarification</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-black text-black uppercase tracking-tight">3. WHAT DATA WE COLLECT ABOUT YOU</h2>
                        <h3 className="font-black text-sm uppercase text-gray-400">3.1 Organizational Data</h3>
                        <p>Organization name, type, industry, primary use case, contact details, and billing information.</p>
                        
                        <h3 className="font-black text-sm uppercase text-gray-400">3.2 Platform Usage Data</h3>
                        <p>We collect metadata including login info (IP, browser), API activity, file upload metadata (size, format), and system performance metrics.</p>
                        
                        <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                            <h3 className="font-bold text-red-900 mb-2 uppercase text-sm">What we DO NOT log:</h3>
                            <ul className="text-sm text-red-800 list-disc pl-5 space-y-1">
                                <li>Actual contents of your uploaded files (CSV/Excel data)</li>
                                <li>Raw survey responses or customer feedback</li>
                                <li>Sensitive credentials (these are hashed)</li>
                                <li>Full request/response bodies</li>
                            </ul>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-black text-black uppercase tracking-tight">4. LEGAL BASIS FOR COLLECTING YOUR DATA</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Contract:</strong> Fulfilling our pilot program agreement</li>
                            <li><strong>Legitimate Interest:</strong> Improving security and optimizing performance</li>
                            <li><strong>Legal Obligation:</strong> Complying with EU (GDPR) and UK jurisdictions</li>
                            <li><strong>Consent:</strong> Where you explicitly opt in (marketing, case studies)</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-black text-black uppercase tracking-tight">5. HOW WE USE YOUR DATA</h2>
                        <p>We use data to deliver the service (ingestion, analysis, LLM processing), improve the product (algorithm refinement), maintain security, and support operations.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-black text-black uppercase tracking-tight">6. DATA SHARING & SUB-PROCESSORS</h2>
                        <p>We do <strong>not</strong> share your data with third parties except trusted vendors required for infrastructure (AWS, Azure, Sentry, Auth0). All data is hosted in EU regions by default.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-black text-black uppercase tracking-tight">7. DATA RETENTION & DELETION</h2>
                        <p>Login logs are kept for 180 days, API logs for 90 days. You may request deletion at any time via <strong>privacy@dataunlock.com</strong>. Deletion is usually completed within 30 days.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-black text-black uppercase tracking-tight">8. DATA SECURITY</h2>
                        <p>We employ TLS 1.3+ for transit, AES-256 for rest, and strict RBAC/MFA access controls. Disaster recovery RTO is 4 hours, RPO is 1 hour.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-black text-black uppercase tracking-tight">10. DATA BREACHES</h2>
                        <p>In the event of a breach, we will notify you within 72 hours and provide a full forensic report within 5 business days.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-black text-black uppercase tracking-tight">11. YOUR PRIVACY RIGHTS</h2>
                        <p>Under GDPR, you have the right to access, rectify, erase, restrict, and port your data. Contact us at <strong>privacy@dataunlock.com</strong> to exercise these rights.</p>
                    </section>

                    <footer className="pt-8 border-t border-gray-100 text-xs text-gray-400 text-center space-y-2">
                        <p>Questions? Contact <strong>privacy@dataunlock.com</strong></p>
                        <p>Data Protection Commission (Ireland) | 21 Fitzwilliam Square South, Dublin 2</p>
                    </footer>
                </div>
            </MotionDiv>
        </div>
    );
};

export default function App() {
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

    const handleEmailClick = () => {
        window.location.href = "mailto:damien@dataunlock.ai?subject=DataUnlock Inquiry";
    };

    const MotionDiv = motion.div as any;

    return (
        <div className="bg-[#FAFAFA] font-sans selection:bg-pink-100 selection:text-pink-900 text-gray-900 overflow-x-hidden">
            <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />

            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 p-4 md:p-6 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-lg md:text-xl font-black tracking-tighter flex items-center gap-2">
                        <div className="w-7 h-7 md:w-8 md:h-8 bg-pink-600 rounded-lg flex items-center justify-center">
                            <Database className="text-white w-3.5 h-3.5 md:w-4 md:h-4" />
                        </div>
                        DATAUNLOCK.AI
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                        <span className="hidden sm:block text-[9px] md:text-[10px] font-black bg-pink-100 text-pink-600 px-3 py-1 rounded-full uppercase tracking-widest">Private Beta</span>
                        <button 
                            onClick={handleEmailClick}
                            className="bg-black text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold hover:bg-gray-800 transition-all flex items-center gap-2"
                        >
                            Inquire <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 sm:pt-40 md:pt-56 pb-20 md:pb-32 px-6 max-w-7xl mx-auto">
                <div className="max-w-5xl">
                    <MotionDiv 
                        className="text-left"
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block mb-6 text-[10px] font-black bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full uppercase tracking-widest">Feedback Intelligence</div>
                        <h1 className="text-6xl sm:text-7xl md:text-[8rem] font-black tracking-tighter leading-[0.9] md:leading-[0.8] mb-12">
                            Unlock your<br/>
                            <span className="text-pink-600">customer data.</span>
                        </h1>
                        
                        <div className="max-w-3xl space-y-8">
                           <p className="text-2xl md:text-4xl font-black tracking-tight leading-tight text-gray-900">
                               Get the Churn Playbook - <br/>
                               <span className="text-pink-600">Accurate. Secure. Fast.</span>
                           </p>

                           <div className="flex flex-wrap items-center gap-x-8 gap-y-2 pt-4">
                               <div className="flex items-center gap-2">
                                   <div className="w-2 h-2 rounded-full bg-pink-600" />
                                   <span className="text-xs md:text-sm font-black uppercase tracking-widest text-gray-400">Accurate</span>
                               </div>
                               <div className="flex items-center gap-2">
                                   <div className="w-2 h-2 rounded-full bg-pink-600" />
                                   <span className="text-xs md:text-sm font-black uppercase tracking-widest text-gray-400">Secure</span>
                               </div>
                               <div className="flex items-center gap-2">
                                   <div className="w-2 h-2 rounded-full bg-pink-600" />
                                   <span className="text-xs md:text-sm font-black uppercase tracking-widest text-gray-400">Fast</span>
                               </div>
                           </div>
                        </div>
                    </MotionDiv>
                </div>
            </section>

            {/* Churn Playbook */}
            <section className="py-20 md:py-32 px-6 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-16 md:mb-24">The Churn Playbook</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                        {HOW_IT_WORKS.map((item, i) => (
                            <div key={i} className="group relative">
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="relative">
                                        <div className="text-7xl md:text-9xl font-black text-black/5 leading-none transition-colors duration-500 group-hover:text-pink-600/10 italic">
                                            {item.step}
                                        </div>
                                        <div className={`absolute -right-4 -bottom-2 w-12 h-12 md:w-14 md:h-14 rounded-xl ${THEME[item.color + 'Light']} flex items-center justify-center shadow-lg shadow-black/5 border border-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                                            <item.icon className={`w-6 h-6 md:w-7 md:h-7 ${THEME[item.color + 'Text']}`} />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase border-l-4 border-pink-600 pl-4 h-16 flex items-center leading-tight">{item.title}</h3>
                                    <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base">
                                        {item.detail.split('**').map((part, index) => 
                                            index % 2 === 1 ? <strong key={index} className="text-black font-black">{part}</strong> : part
                                        )}
                                    </p>
                                </div>
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
                            <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between hover:bg-white/10 transition-all text-center md:text-left">
                                <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-pink-500 mb-8 md:mb-12 mx-auto md:mx-0" />
                                <div>
                                    <div className="text-4xl md:text-5xl font-black mb-2">€900K</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Annual Projected<br/>Revenue Recovery</div>
                                </div>
                            </div>
                            <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between hover:bg-white/10 transition-all text-center md:text-left">
                                <MessageSquare className="w-8 h-8 md:w-10 md:h-10 text-cyan-500 mb-8 md:mb-12 mx-auto md:mx-0" />
                                <div>
                                    <div className="text-4xl md:text-5xl font-black mb-2">10K</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Customers Targeted<br/>for Win-Back Q1</div>
                                </div>
                            </div>
                            <div className="p-8 md:p-10 bg-pink-600 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between md:col-span-2 text-center md:text-left">
                                <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
                                    <Zap className="w-8 h-8 md:w-10 md:h-10 text-white mb-8 md:mb-12" />
                                    <div className="text-center md:text-right">
                                        <div className="text-4xl md:text-6xl font-black leading-none">&lt;7</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mt-1">Days</div>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <div className="text-xl md:text-3xl font-black mb-1">Strategy Delivered</div>
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
                        <div className="w-7 h-7 md:w-8 md:h-8 bg-pink-600 rounded-lg flex items-center justify-center">
                            <Database className="text-white w-3.5 h-3.5 md:w-4 md:h-4" />
                        </div>
                        DATAUNLOCK.AI
                    </div>
                    <div className="flex gap-6 items-center">
                        <button 
                            onClick={() => setIsPrivacyOpen(true)}
                            className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-black transition-colors"
                        >
                            Privacy Statement
                        </button>
                        <div className="text-[9px] md:text-[10px] font-black text-gray-300 uppercase tracking-widest">© 2026 DATAUNLOCK.AI</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
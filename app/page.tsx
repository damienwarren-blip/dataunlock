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
    X
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
            {/* Fix: Casting props to any to resolve the TypeScript 'className' error in strict environments */}
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
                            <p className="text-sm">DataUnlock is an AI-powered feedback intelligence platform that transforms raw survey data into structured insights and executive-ready recommendations. The system ingests structured survey data, applies analysis strategies (statistical and semantic clustering), and optionally uses LLMs to generate insights.</p>
                        </div>
                        <div className="mt-4">
                            <h3 className="font-bold text-black mb-2 uppercase text-sm">Company Details</h3>
                            <p className="text-sm">DataUnlock is based in Ireland and is committed to operating in compliance with GDPR and EU data protection standards.</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-black uppercase tracking-tight mb-4">2. WHO WE ARE & YOUR ROLE</h2>
                        <p>DataUnlock processes data on your behalf as a <strong>Data Processor</strong>. You (the pilot partner organization) are the <strong>Data Controller</strong>, responsible for ensuring lawful collection of survey data and obtaining necessary consents.</p>
                        <div className="border-l-4 border-pink-500 pl-4 mt-4 italic text-sm">
                            If your organization does not have a dedicated DPO or legal team, we recommend consulting with your local data protection authority or reaching out to us at privacy@dataunlock.com.
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-black uppercase tracking-tight mb-4">3. WHAT DATA WE COLLECT</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-bold text-black text-sm mb-2 uppercase">3.1 Organizational Data</h3>
                                <p className="text-sm">Contact name, email, industry, organization type, and primary use case.</p>
                            </div>
                            <div>
                                <h3 className="font-bold text-black text-sm mb-2 uppercase">3.2 Platform Usage Data</h3>
                                <p className="text-sm">Metadata including login timestamps, API activity, file upload metadata (size, type), and system performance metrics.</p>
                            </div>
                        </div>
                        <div className="bg-pink-50 p-6 rounded-2xl mt-6 border border-pink-100">
                            <h3 className="font-bold text-pink-700 mb-2 uppercase text-xs">What we DO NOT log:</h3>
                            <ul className="grid md:grid-cols-2 gap-2 text-xs font-medium text-pink-900 list-disc pl-4">
                                <li>Actual contents of uploaded files</li>
                                <li>Raw survey responses</li>
                                <li>Individual respondent answers</li>
                                <li>Plaintext passwords/keys</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-black uppercase tracking-tight mb-4">4. LEGAL BASIS</h2>
                        <p>We process data based on <strong>Contract</strong> (pilot agreement), <strong>Legitimate Interest</strong> (security/optimization), <strong>Legal Obligation</strong> (GDPR/EU Law), and <strong>Consent</strong>.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-black uppercase tracking-tight mb-4">5. HOW WE USE YOUR DATA</h2>
                        <ul className="space-y-2 list-disc pl-4 text-sm">
                            <li><strong>Deliver Service:</strong> Ingest files, detect types, apply clustering, and generate reports.</li>
                            <li><strong>Improve Product:</strong> Aggregate anonymized insights to refine algorithms.</li>
                            <li><strong>Security:</strong> Monitor for abuse and conduct audits.</li>
                            <li><strong>Support:</strong> Troubleshoot and send critical security updates.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-black uppercase tracking-tight mb-4">6. DATA SHARING & SUB-PROCESSORS</h2>
                        <p className="mb-4">We do NOT share your data except with trusted infrastructure providers (Sub-Processors) listed below:</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="p-2 border">Vendor</th>
                                        <th className="p-2 border">Purpose</th>
                                        <th className="p-2 border">Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td className="p-2 border font-bold">AWS</td><td className="p-2 border">Cloud Hosting</td><td className="p-2 border">EU (Ireland/Frankfurt)</td></tr>
                                    <tr><td className="p-2 border font-bold">Azure</td><td className="p-2 border">Alternative Hosting</td><td className="p-2 border">EU / US</td></tr>
                                    <tr><td className="p-2 border font-bold">Sentry</td><td className="p-2 border">Error Tracking</td><td className="p-2 border">EU-hosted</td></tr>
                                    <tr><td className="p-2 border font-bold">Auth0</td><td className="p-2 border">Authentication</td><td className="p-2 border">EU-compliant</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-black uppercase tracking-tight mb-4">7. RETENTION & DELETION</h2>
                        <p className="text-sm">Uploaded data is deleted automatically after 6 months. Login logs are kept for 180 days. You may request deletion at any time via privacy@dataunlock.com.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-black uppercase tracking-tight mb-4">8. DATA SECURITY</h2>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="p-4 bg-gray-50 rounded-xl"><strong>Encryption:</strong> TLS 1.3 in transit, AES-256 at rest.</div>
                            <div className="p-4 bg-gray-50 rounded-xl"><strong>Access:</strong> Role-based access (RBAC) and MFA.</div>
                            <div className="p-4 bg-gray-50 rounded-xl"><strong>Network:</strong> Firewalls, DDoS protection, and VPN.</div>
                            <div className="p-4 bg-gray-50 rounded-xl"><strong>Recovery:</strong> Daily encrypted backups with 1hr RPO.</div>
                        </div>
                    </section>

                    <footer className="pt-8 border-t border-gray-100 text-xs text-gray-400">
                        <p>Questions about this policy? Contact <strong>privacy@dataunlock.com</strong></p>
                        <p className="mt-2">Regulatory Contact: Data Protection Commission (Ireland), 21 Fitzwilliam Square South, Dublin 2.</p>
                    </footer>
                </div>
            </motion.div>
        </div>
    );
};

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
            <section className="pt-28 sm:pt-36 md:pt-48 pb-16 md:pb-32 px-6 max-w-7xl mx-auto text-center lg:text-left">
                <div className="max-w-4xl">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-block mb-4 text-[10px] font-black bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full uppercase tracking-widest">Private Beta</div>
                        <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-6 md:mb-10">
                            DATA TO<br/>
                            <span className="text-pink-600">STRATEGY.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mb-8 md:mb-12 leading-relaxed mx-auto lg:mx-0">
                            You have customer feedback, survey responses, support tickets sitting in spreadsheets. We turn them into clear strategic priorities with revenue impact... <span className="text-black font-bold">Fast and Secure.</span>
                        </p>
                        <button 
                            onClick={handleEmailClick}
                            className="w-full sm:w-auto px-8 md:px-10 py-5 md:py-6 bg-black text-white rounded-2xl font-black text-xl md:text-2xl hover:scale-105 transition-all shadow-2xl shadow-gray-200"
                        >
                            Reserve Q1 Slot
                        </button>
                    </motion.div>
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
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] -z-10" />
            </section>

            {/* Compliance Section */}
            <section className="py-20 md:py-32 px-6 bg-gray-50 border-y border-gray-100 overflow-hidden relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-10 mb-12 md:mb-20">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-4">Trust & Compliance.</h2>
                            <p className="text-lg md:text-2xl text-gray-500 font-bold uppercase tracking-widest leading-tight">BUILT FOR TRUST.<br/><span className="text-sm font-bold opacity-60">Security by design, compliance by nature.</span></p>
                        </div>
                        <button 
                            onClick={() => setIsPrivacyOpen(true)}
                            className="flex items-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-pink-600 border-b-2 border-pink-100 pb-1 hover:border-pink-600 transition-all w-fit"
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
"use client";
import React, { useState } from 'react';
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
    ExternalLink
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
} as const;

type ThemeKey = keyof typeof THEME;

interface HowItWorksItem {
    step: string;
    title: string;
    detail: string;
    icon: any;
    color: string;
}

const HOW_IT_WORKS: HowItWorksItem[] = [
    {
        step: "01",
        title: "Load",
        detail: "Load Raw Data. Process CSVs, surveys, tickets, or feedback instantly. No cleanup needed. Fully anonymous. GDPR-safe. You control your data.",
        icon: FileText,
        color: "pink"
    },
    {
        step: "02",
        title: "Unlock",
        detail: "Strategic Mapping. We turn raw responses into clear next steps. No charts. No word clouds. Just your data-led strategy.",
        icon: Zap,
        color: "purple"
    },
    {
        step: "03",
        title: "Impact",
        detail: "Drive Revenue. Execute with confidence. Turn feedback into customer wins, lower churn, higher revenue. Real results.",
        icon: TrendingUp,
        color: "cyan"
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
        detail: "✓ AES 256 encryption – At rest and in transit. ✓ SOC 2 Type II Ready – Built for your compliance team." 
    }
];

const DataUnlockLogo = () => (
    <div className="relative w-8 h-8 flex-shrink-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-black rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 6v8a5 5 0 0 0 10 0V6" />
                <line x1="12" y1="14" x2="12" y2="19" className="text-pink-500" />
            </svg>
        </div>
    </div>
);

// --- PROPS INTERFACE FOR TYPESCRIPT ---
interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'summary' | 'full'>('summary');
    
    if (!isOpen) return null;
    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[1.5rem] md:rounded-[2rem] shadow-2xl relative flex flex-col"
                >
                    <div className="px-6 py-6 md:px-16 md:pt-12 border-b border-gray-100 flex flex-col gap-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1 md:mb-2 text-black">Privacy & Data Governance</h1>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Version 1.0 • Effective Jan 14, 2026</p>
                            </div>
                            <button 
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors border border-gray-100"
                            >
                                <X className="w-5 h-5 text-black" />
                            </button>
                        </div>
                        
                        <div className="flex gap-6 md:gap-8">
                            <button 
                                onClick={() => setActiveTab('summary')}
                                className={`pb-4 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'summary' ? 'border-pink-600 text-pink-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                            >
                                Summary
                            </button>
                            <button 
                                onClick={() => setActiveTab('full')}
                                className={`pb-4 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'full' ? 'border-pink-600 text-pink-600' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                            >
                                Full Policy
                            </button>
                        </div>
                    </div>

                    <div className="p-6 md:p-16 overflow-y-auto flex-1 text-gray-800">
                        {activeTab === 'summary' ? (
                            <div className="space-y-8 md:space-y-12">
                                <section>
                                    <h2 className="text-lg md:text-xl font-black mb-3 md:mb-4 uppercase tracking-tight text-black text-left">Data Control</h2>
                                    <p className="text-base md:text-lg font-medium text-gray-600 leading-relaxed text-left">You remain the Data Controller. DataUnlock acts strictly as a Processor. You have total control over your data, including the right to delete any information at any time.</p>
                                </section>
                                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                                    <div className="p-5 md:p-6 bg-pink-50 rounded-2xl border border-pink-100 text-left">
                                        <h3 className="font-black text-pink-900 mb-3 text-[10px] uppercase tracking-widest flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4" /> Security Standards
                                        </h3>
                                        <ul className="text-xs md:text-sm text-pink-800 space-y-2 font-medium">
                                            <li>• AES-256 Encryption at rest & in transit</li>
                                            <li>• Data hosted in EU (Ireland/Frankfurt)</li>
                                            <li>• TLS 1.3+ communication protocols</li>
                                            <li>• RBAC & strict production access controls</li>
                                        </ul>
                                    </div>
                                    <div className="p-5 md:p-6 bg-gray-50 rounded-2xl border border-gray-100 text-left">
                                        <h3 className="font-black text-gray-900 mb-3 text-[10px] uppercase tracking-widest flex items-center gap-2">
                                            <Lock className="w-4 h-4" /> Processing Scope
                                        </h3>
                                        <ul className="text-xs md:text-sm text-gray-600 space-y-2 font-medium">
                                            <li>• No LLM training on raw customer data</li>
                                            <li>• Automatic question type detection</li>
                                            <li>• Semantic clustering for open-ended text</li>
                                            <li>• Human-readable insight generation</li>
                                        </ul>
                                    </div>
                                </section>
                            </div>
                        ) : (
                            <div className="space-y-10 text-xs md:text-sm leading-relaxed pb-20 whitespace-pre-wrap text-left">
                                <div className="mb-8 border-b border-gray-100 pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    DataUnlock Privacy Policy Version: 1.0 Last Updated: January 14, 2026
                                </div>
                                <section>
                                    <h2 className="text-lg md:text-xl font-black mb-4 uppercase tracking-tight text-black">1. INTRODUCTION</h2>
                                    <p className="text-gray-600">DataUnlock is an AI-powered feedback intelligence platform that transforms raw survey data into structured insights. This policy outlines our commitment to your data privacy.</p>
                                </section>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default function App() {
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

    return (
        <div className="bg-[#FAFAFA] font-sans selection:bg-pink-100 selection:text-pink-900 text-gray-900 overflow-x-hidden min-h-screen">
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 px-4 md:px-6 py-4 md:py-6 bg-white/70 backdrop-blur-2xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
                    <div className="text-base md:text-xl font-black tracking-tighter flex items-center gap-2 md:gap-3 group cursor-pointer truncate">
                        <DataUnlockLogo />
                        <span className="truncate">DATAUNLOCK</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden lg:block text-[9px] font-black bg-pink-100 text-pink-600 px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap">Early access beta</span>
                        <a
                            href="mailto:damien@dataunlock.ai"
                            className="bg-black text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[11px] md:text-sm font-bold hover:bg-gray-800 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-black/5 whitespace-nowrap"
                        >
                            Pilot Partner <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-32 md:pt-56 pb-20 md:pb-40 px-4 md:px-6 max-w-7xl mx-auto text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="inline-block mb-6 md:mb-8 text-[9px] md:text-[10px] font-black bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full uppercase tracking-widest">
                        Early access for pilot partners
                    </div>
                    <h1 className="text-[3rem] sm:text-[4rem] md:text-[6rem] lg:text-[9rem] font-black mb-8 md:mb-12 tracking-tighter leading-[0.9] sm:leading-[0.85]">
                        Unlock the revenue <br/><span className="text-pink-600 italic">in your data.</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed italic px-4">
                        Your raw data holds revenue drivers. We unlock them—fast and secure.
                    </p>
                    <div className="px-4">
                        <a
                            href="mailto:damien@dataunlock.ai"
                            className="w-full md:w-auto px-8 md:px-14 py-5 md:py-7 bg-black text-white rounded-xl md:rounded-2xl font-black text-lg md:text-2xl hover:bg-pink-600 transition-all active:scale-[0.98] shadow-2xl shadow-gray-200 inline-block"
                        >
                            Join as Pilot Partner
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* How It Works */}
            <section className="py-20 md:py-32 px-4 md:px-6 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-12 md:mb-20 italic px-2">The Process. How we unlock.</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 px-2">
                        {HOW_IT_WORKS.map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col"
                            >
                                <div className="text-4xl md:text-6xl font-black text-gray-100 mb-2 md:mb-4">{item.step}</div>
                                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${THEME[(item.color + 'Light') as ThemeKey]} flex items-center justify-center mb-6`}>
                                    <item.icon className={`w-6 h-6 md:w-7 md:h-7 ${THEME[(item.color + 'Text') as ThemeKey]}`} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black mb-2 md:mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">{item.detail}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Compliance */}
            <section className="py-20 md:py-32 px-4 md:px-6 bg-gray-50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="max-w-2xl mb-12 md:mb-20 px-2">
                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-4 italic">Built for Trust.</h2>
                        <p className="text-xs md:text-xl text-gray-400 font-bold uppercase tracking-widest">Compliance by design.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-2">
                        {COMPLIANCE_ITEMS.map((item, i) => (
                            <div key={i} className="bg-white p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm transition-all hover:shadow-xl">
                                <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center mb-6">
                                    <item.icon className="w-5 h-5 text-pink-600" />
                                </div>
                                <h3 className="text-lg md:text-2xl font-black mb-2 tracking-tight">{item.title}</h3>
                                <p className="text-[9px] md:text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 md:py-48 px-4 md:px-6 bg-white">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-[2.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] font-black mb-10 md:mb-16 tracking-tighter leading-[0.9] sm:leading-[0.85]">
                        Unlock the revenue <br/><span className="text-pink-600 italic">in your data.</span>
                    </h2>
                    <div className="px-4">
                        <a
                            href="mailto:damien@dataunlock.ai"
                            className="inline-flex items-center justify-center w-full max-w-2xl py-6 md:py-10 text-xl md:text-4xl font-black rounded-[2rem] md:rounded-[3rem] bg-black text-white hover:bg-pink-600 transition-all active:scale-[0.98] shadow-2xl group"
                        >
                            Join as Pilot Partner <ChevronRight className="ml-2 md:ml-4 w-6 h-6 md:w-10 md:h-10 group-hover:translate-x-2 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 md:py-24 bg-white px-4 md:px-8 border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                        <div className="text-lg md:text-xl font-black tracking-tighter flex items-center gap-3">
                            <DataUnlockLogo />
                            DATAUNLOCK
                        </div>
                        <div className="flex-1 max-w-xl md:text-right">
                            <p className="text-[10px] md:text-sm font-bold text-gray-400 leading-relaxed mb-4">
                                DataUnlock processes survey data securely, encrypted at rest and in transit.
                            </p>
                            <button 
                                onClick={() => setIsPrivacyOpen(true)}
                                className="inline-flex items-center gap-2 px-6 py-2 bg-gray-50 hover:bg-pink-50 border border-gray-100 hover:border-pink-100 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-pink-600 transition-all shadow-sm group"
                            >
                                Read full Privacy Policy <ExternalLink className="w-3 h-3 group-hover:rotate-45 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        </div>
    );
}
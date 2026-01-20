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
        detail: "Load Raw Data. Process CSVs, surveys, tickets, or feedback instantly. No cleanup needed. Fully anonymous. GDPR-safe.",
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
        detail: "Drive Revenue. Execute with confidence. Turn feedback into customer wins, lower churn, higher revenue.",
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
        detail: "✓ AES 256 encryption. SOC 2 Type II controls implemented." 
    }
];

const DataUnlockLogo = () => (
    <div className="relative w-7 h-7 md:w-8 md:h-8 flex-shrink-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-black rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 6v8a5 5 0 0 0 10 0V6" />
                <line x1="12" y1="14" x2="12" y2="19" className="text-pink-500" />
            </svg>
        </div>
    </div>
);

interface PrivacyModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'summary' | 'full'>('summary');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);
    
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        className="w-full max-w-5xl h-[92vh] sm:h-auto max-h-[90vh] flex flex-col bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-pink-500/10"
                    >
                        {/* Modal Header */}
                        <div className="px-6 py-6 md:px-16 md:pt-12 border-b border-gray-100 flex flex-col gap-6 bg-white shrink-0">
                            <div className="flex justify-between items-start gap-4">
                                <div className="text-left">
                                    <h1 className="text-xl md:text-3xl font-black tracking-tight mb-1 text-black leading-tight">Privacy & Governance</h1>
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest text-left">Version 1.0 • Jan 2026</p>
                                </div>
                                <button 
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors border border-gray-100 shrink-0"
                                >
                                    <X className="w-5 h-5 text-black" />
                                </button>
                            </div>
                            
                            <div className="flex gap-6 md:gap-8">
                                <button 
                                    onClick={() => setActiveTab('summary')}
                                    className={`pb-3 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'summary' ? 'border-pink-600 text-pink-600' : 'border-transparent text-gray-400'}`}
                                >
                                    Summary
                                </button>
                                <button 
                                    onClick={() => setActiveTab('full')}
                                    className={`pb-3 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all border-b-2 ${activeTab === 'full' ? 'border-pink-600 text-pink-600' : 'border-transparent text-gray-400'}`}
                                >
                                    Full Policy
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 md:p-16 overflow-y-auto flex-1 text-gray-800 bg-white">
                            {activeTab === 'summary' ? (
                                <div className="space-y-8 md:space-y-12">
                                    <section>
                                        <h2 className="text-lg md:text-xl font-black mb-3 uppercase tracking-tight text-black text-left">Data Control</h2>
                                        <p className="text-sm md:text-lg font-medium text-gray-600 leading-relaxed text-left italic">
                                            "You remain the Data Controller. DataUnlock acts strictly as a Processor."
                                        </p>
                                        <p className="text-sm md:text-lg font-medium text-gray-500 leading-relaxed text-left mt-4">
                                            You have total control over your data, including the right to delete any information at any time. We don't "own" your insights; you do.
                                        </p>
                                    </section>
                                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 pb-8">
                                        <div className="p-5 md:p-6 bg-pink-50 rounded-2xl border border-pink-100 text-left">
                                            <h3 className="font-black text-pink-900 mb-3 text-[10px] uppercase tracking-widest flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4" /> Infrastructure
                                            </h3>
                                            <ul className="text-xs md:text-sm text-pink-800 space-y-2 font-medium">
                                                <li>• AES-256 Encryption everywhere</li>
                                                <li>• Hosted on EU-native infrastructure</li>
                                                <li>• Zero-knowledge processing options</li>
                                                <li>• SOC2 Type II controls implemented</li>
                                            </ul>
                                        </div>
                                        <div className="p-5 md:p-6 bg-gray-50 rounded-2xl border border-gray-100 text-left">
                                            <h3 className="font-black text-gray-900 mb-3 text-[10px] uppercase tracking-widest flex items-center gap-2">
                                                <Lock className="w-4 h-4" /> AI Ethics
                                            </h3>
                                            <ul className="text-xs md:text-sm text-gray-600 space-y-2 font-medium">
                                                <li>• No LLM training on customer data</li>
                                                <li>• Deterministic analysis pipelines</li>
                                                <li>• Anonymization at the edge</li>
                                                <li>• Transparent data lineage</li>
                                            </ul>
                                        </div>
                                    </section>
                                </div>
                            ) : (
                                <div className="space-y-8 text-xs md:text-sm leading-relaxed pb-20 text-left">
                                    <div className="p-4 bg-gray-50 rounded-xl font-mono text-[10px] text-gray-400">
                                        DOCUMENT_REF: DU_PRIVACY_JAN_26_V1
                                    </div>
                                    <p className="text-gray-600 font-medium">
                                        DataUnlock provides enterprise-grade feedback intelligence. This section covers our full legal commitment to data sovereignty, GDPR Article 28 compliance, and technical safeguard specifications.
                                    </p>
                                    <p className="text-gray-400 italic">
                                        [Full legal documentation for pilot partners is available upon request during onboarding.]
                                    </p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default function App() {
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

    return (
        <div className="bg-[#FAFAFA] font-sans selection:bg-pink-100 selection:text-pink-900 text-gray-900 overflow-x-hidden min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 px-4 md:px-6 py-4 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-base md:text-xl font-black tracking-tighter flex items-center gap-2 md:gap-3">
                        <DataUnlockLogo />
                        <span className="tracking-tighter uppercase">DATAUNLOCK</span>
                    </div>
                    <a
                        href="mailto:damien@dataunlock.ai"
                        className="bg-black text-white px-5 py-2 md:py-2.5 rounded-full text-[11px] md:text-sm font-bold hover:bg-pink-600 transition-all active:scale-95 flex items-center gap-2"
                    >
                        Pilot Partner <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-16 md:pt-56 md:pb-40 px-5 md:px-6 max-w-7xl mx-auto text-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center"
                >
                    <div className="mb-6 inline-flex items-center gap-2 text-[9px] md:text-[10px] font-black bg-pink-50 text-pink-600 px-4 py-1.5 rounded-full uppercase tracking-widest border border-pink-100">
                        <Zap className="w-3 h-3" /> Pilot Partners Only
                    </div>
                    <h1 className="text-[2.5rem] sm:text-[4rem] md:text-[6.5rem] lg:text-[8rem] font-black mb-6 md:mb-12 tracking-tighter leading-[0.9] md:leading-[0.85] max-w-full">
                        Unlock the <br className="hidden sm:block" /> revenue <br/>
                        <span className="text-pink-600 italic">in your data.</span>
                    </h1>
                    <p className="text-base sm:text-lg md:text-2xl text-gray-500 font-medium max-w-xl mx-auto mb-10 md:mb-14 leading-relaxed px-2">
                        Your raw data holds hidden revenue drivers. We unlock them—instantly and securely.
                    </p>
                    <a
                        href="mailto:damien@dataunlock.ai"
                        className="w-full sm:w-auto px-8 md:px-14 py-5 md:py-7 bg-black text-white rounded-2xl font-black text-lg md:text-2xl hover:bg-pink-600 transition-all active:scale-95 shadow-2xl shadow-pink-500/10"
                    >
                        Join the Pilot
                    </a>
                </motion.div>
            </section>

            {/* How It Works */}
            <section className="py-20 md:py-32 px-5 md:px-6 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 md:mb-20 text-left">
                        <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-2 italic">The Process.</h2>
                        <p className="text-[10px] md:text-sm font-black text-gray-400 uppercase tracking-widest text-left">Efficiency Redefined.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
                        {HOW_IT_WORKS.map((item, i) => (
                            <div key={i} className="flex flex-col text-left">
                                <div className="text-4xl md:text-6xl font-black text-gray-100 mb-2">{item.step}</div>
                                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl ${THEME[(item.color + 'Light') as ThemeKey]} flex items-center justify-center mb-6`}>
                                    <item.icon className={`w-6 h-6 md:w-8 md:h-8 ${THEME[(item.color + 'Text') as ThemeKey]}`} />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Compliance Section */}
            <section className="py-20 md:py-32 px-5 md:px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 md:mb-20 text-left">
                        <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-2 italic text-left">Built for Trust.</h2>
                        <p className="text-[10px] md:text-sm font-black text-gray-400 uppercase tracking-widest text-left">Enterprise Ready.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {COMPLIANCE_ITEMS.map((item, i) => (
                            <div key={i} className="bg-white p-7 md:p-8 rounded-2xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
                                <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center mb-5">
                                    <item.icon className="w-5 h-5 text-pink-600" />
                                </div>
                                <h3 className="text-lg md:text-xl font-black mb-2 tracking-tight text-left">{item.title}</h3>
                                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed text-left">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 md:py-48 px-5 md:px-6 bg-white text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-[2.5rem] md:text-[6rem] font-black mb-12 tracking-tighter leading-[0.95]">
                        Ready to <br/><span className="text-pink-600 italic">unlock?</span>
                    </h2>
                    <a
                        href="mailto:damien@dataunlock.ai"
                        className="inline-flex items-center justify-center w-full sm:w-auto py-6 md:py-8 px-8 md:px-12 text-xl md:text-3xl font-black rounded-2xl md:rounded-[3rem] bg-black text-white hover:bg-pink-600 transition-all group shadow-xl shadow-pink-500/10"
                    >
                        Join Pilot <ChevronRight className="ml-2 w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform shrink-0" />
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 md:py-24 bg-white px-5 border-t border-gray-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="text-base md:text-xl font-black tracking-tighter flex items-center gap-3">
                        <DataUnlockLogo />
                        DATAUNLOCK
                    </div>
                    <div className="flex flex-col md:items-end gap-4 max-w-sm">
                        <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest md:text-right">
                            DataUnlock secures feedback. EU Based infrastructure.
                        </p>
                        <button 
                            onClick={() => setIsPrivacyOpen(true)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-pink-600 hover:bg-pink-50 transition-all w-fit shadow-sm"
                        >
                            Privacy & Ethics <ExternalLink className="w-3 h-3" />
                        </button>
                    </div>
                </div>
            </footer>

            <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        </div>
    );
}
"use client";

import React, { useState } from 'react';
import {
    ArrowRight,
    ShieldCheck,
    Lock,
    Globe,
    FileCheck,
    Quote,
    Activity,
    UploadCloud,
    Unlock,
    PlayCircle,
    TrendingUp,
    Zap,
    ChevronRight,
    X,
    Mail,
    Scale,
    ShieldAlert,
    Info,
    Database,
    Clock,
    UserCheck,
    Shield
} from 'lucide-react';

// --- PRIVACY POLICY COMPONENT ---

const PrivacyModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">Privacy Policy</h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Version 1.0 • Effective: Jan 14, 2026</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 md:p-10 text-gray-700 leading-relaxed space-y-8 font-medium scroll-smooth">
                    {/* Header Info */}
                    <div className="space-y-1 border-b border-gray-100 pb-6">
                        <p className="font-black text-black text-lg uppercase">DataUnlock Privacy Policy</p>
                        <p className="text-sm">Version: 1.0</p>
                        <p className="text-sm">Last Updated: January 14, 2026</p>
                        <p className="text-sm">Effective Date: January 14, 2026</p>
                    </div>

                    <section>
                        <h3 className="text-black font-black text-xl mb-4 uppercase tracking-tight flex items-center gap-2">
                            <Info className="w-5 h-5 text-pink-600" /> INTRODUCTION
                        </h3>
                        <p className="mb-4">DataUnlock ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you participate in our pilot program and use our platform.</p>
                        
                        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 space-y-4 mb-4">
                            <p className="font-bold text-black">What DataUnlock Does</p>
                            <p className="text-sm leading-relaxed">DataUnlock is an AI-powered feedback intelligence platform that transforms raw survey data into structured insights and executive-ready recommendations. The system:</p>
                            <ul className="text-sm space-y-2 list-disc pl-5 text-gray-600">
                                <li>Ingests structured survey or feedback data (CSV or Excel files)</li>
                                <li>Automatically detects question types (numeric, categorical, binary, or text/open-ended)</li>
                                <li>Applies appropriate analysis strategies: statistical analysis for numeric/categorical data, semantic clustering for text responses</li>
                                <li>Optionally uses large language models (LLMs) to generate human-readable insights, summaries, root cause analyses, and recommended actions</li>
                                <li>Produces executive-ready reports and structured JSON output</li>
                            </ul>
                            <p className="font-bold text-black pt-2">Company Details</p>
                            <p className="text-sm">DataUnlock is based in Ireland and is committed to operating in compliance with GDPR and EU data protection standards.</p>
                        </div>
                        <p className="text-sm italic font-bold text-gray-900 border-l-4 border-pink-500 pl-4">Please read this carefully. By accessing DataUnlock, you acknowledge you have read and understood this Privacy Policy and our Pilot Consent Form.</p>
                    </section>

                    <section>
                        <h3 className="text-black font-black text-lg mb-4 uppercase tracking-tight">1. WHO WE ARE & YOUR ROLE</h3>
                        <p className="mb-4">DataUnlock processes data on your behalf as a <strong>Data Processor</strong>. You (the pilot partner organization) are the <strong>Data Controller</strong>, responsible for:</p>
                        <ul className="space-y-2 list-disc pl-5 mb-4 text-sm">
                            <li>Ensuring lawful collection of survey/feedback data from your respondents/customers</li>
                            <li>Obtaining necessary consents from individuals whose data you provide</li>
                            <li>Complying with data protection laws in your jurisdiction</li>
                            <li>Validating our analysis and insights before making business decisions</li>
                        </ul>
                        <div className="bg-pink-50/50 p-5 rounded-2xl border border-pink-100">
                            <p className="text-sm font-black text-pink-900 mb-2">Support for Organizations Without Dedicated Legal/Compliance Resources</p>
                            <p className="text-sm text-pink-800 mb-3">If your organization does not have a dedicated Data Protection Officer (DPO) or legal team, we recommend:</p>
                            <ul className="text-xs space-y-1 list-disc pl-5 text-pink-800 mb-3">
                                <li>Consulting with your local data protection authority for guidance on compliance requirements</li>
                                <li>Engaging external legal counsel if needed to ensure compliance with applicable laws</li>
                                <li>Reaching out to us at <strong>privacy@dataunlock.com</strong> for clarification on your responsibilities as a Data Controller</li>
                            </ul>
                            <p className="text-xs text-pink-900 font-bold">If you have questions about your responsibilities as a Controller, consult your DPO, legal team, or contact us.</p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-black font-black text-lg mb-4 uppercase tracking-tight">2. WHAT DATA WE COLLECT ABOUT YOU</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-black text-sm text-black uppercase mb-2">2.1 Organizational Data</h4>
                                <p className="text-sm">When you enroll in the pilot, we collect: Organization name & type, Contact name, email, phone, Industry & primary use case, and Billing/payment information (if applicable).</p>
                            </div>
                            <div>
                                <h4 className="font-black text-sm text-black uppercase mb-2">2.2 Platform Usage Data</h4>
                                <p className="text-sm mb-3">When you use DataUnlock, we automatically collect login information (IP, browser), API activity, file upload metadata (filenames, sizes), report generation details, and system performance metrics.</p>
                                <div className="p-6 bg-gray-900 rounded-2xl text-[11px] font-bold space-y-2 text-gray-400">
                                    <p className="text-pink-500 uppercase text-[12px] mb-1">What we DO NOT log:</p>
                                    <p className="flex items-start gap-2"><span>❌</span> The actual contents of your uploaded files (CSV/Excel data)</p>
                                    <p className="flex items-start gap-2"><span>❌</span> Raw survey responses or customer feedback</p>
                                    <p className="flex items-start gap-2"><span>❌</span> Individual respondent answers or open-text responses</p>
                                    <p className="flex items-start gap-2"><span>❌</span> Sensitive credentials (passwords, API keys—these are hashed)</p>
                                    <p className="flex items-start gap-2"><span>❌</span> Full request/response bodies (only metadata)</p>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-black text-sm text-black uppercase mb-2">2.3 Communications</h4>
                                <p className="text-sm">Support requests (email/tickets), product feedback, and meeting notes (with explicit consent).</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-black font-black text-lg mb-4 uppercase tracking-tight">3. LEGAL BASIS FOR COLLECTING YOUR DATA</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="p-4 bg-white border border-gray-100 rounded-xl">
                                <span className="font-black text-black">CONTRACT</span>
                                <p className="mt-1">Fulfilling our pilot program agreement with you.</p>
                            </div>
                            <div className="p-4 bg-white border border-gray-100 rounded-xl">
                                <span className="font-black text-black">LEGITIMATE INTEREST</span>
                                <p className="mt-1">Improving security, detecting fraud, and optimizing platform performance.</p>
                            </div>
                            <div className="p-4 bg-white border border-gray-100 rounded-xl">
                                <span className="font-black text-black">LEGAL OBLIGATION</span>
                                <p className="mt-1">Complying with applicable laws and regulations in the EU (GDPR) and UK jurisdictions.</p>
                            </div>
                            <div className="p-4 bg-white border border-gray-100 rounded-xl">
                                <span className="font-black text-black">CONSENT</span>
                                <p className="mt-1">Where you explicitly opt in (marketing, case studies, research).</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-black font-black text-lg mb-4 uppercase tracking-tight">4. HOW WE USE YOUR DATA</h3>
                        <div className="space-y-4 text-sm">
                            <p><strong>To Deliver the Service:</strong> Platform access, file parsing, question type detection, statistical analysis, semantic clustering, report generation, and technical support.</p>
                            <p><strong>To Improve the Product:</strong> Aggregate anonymized insights to improve analysis engines (embeddings, prompt strategies) and identify product gaps.</p>
                            <p><strong>To Maintain Security:</strong> Access monitoring, fraud prevention, audits, and meeting regulatory requirements (SOC 2, ISO 27001).</p>
                            <p><strong>With Your Permission Only:</strong> Anonymized case studies, testimonials, and feature announcements.</p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-black font-black text-lg mb-4 uppercase tracking-tight">5. DATA SHARING & SUB-PROCESSORS</h3>
                        <p className="text-sm mb-4">We do NOT share your data with third parties except trusted vendors for infrastructure. All sub-processors are contractually bound.</p>
                        <div className="overflow-hidden border border-gray-100 rounded-2xl mb-4">
                            <table className="w-full text-left text-[11px]">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="p-3 font-black">Vendor</th>
                                        <th className="p-3 font-black">Purpose</th>
                                        <th className="p-3 font-black">Location</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-50">
                                        <td className="p-3 font-bold">AWS</td>
                                        <td className="p-3">Cloud hosting & S3 storage</td>
                                        <td className="p-3">EU (Ireland/Frankfurt) Default</td>
                                    </tr>
                                    <tr className="border-b border-gray-50">
                                        <td className="p-3 font-bold">Microsoft Azure</td>
                                        <td className="p-3">Alternative hosting</td>
                                        <td className="p-3">EU & US regions</td>
                                    </tr>
                                    <tr className="border-b border-gray-50">
                                        <td className="p-3 font-bold">Sentry</td>
                                        <td className="p-3">Error tracking & monitoring</td>
                                        <td className="p-3">EU-hosted</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 font-bold">Auth0</td>
                                        <td className="p-3">Identity management</td>
                                        <td className="p-3">EU-compliant infrastructure</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-sm font-bold text-black mb-2">Data Residency & Regional Hosting</p>
                        <p className="text-xs mb-4">By default, pilot data is hosted in EU regions. Transfers to US regions are subject to Standard Contractual Clauses (SCCs). We notify you of any new sub-processors with 30 days' notice.</p>
                    </section>

                    <section>
                        <h3 className="text-black font-black text-lg mb-4 uppercase tracking-tight">6. DATA RETENTION & DELETION</h3>
                        <div className="overflow-hidden border border-gray-100 rounded-2xl mb-4">
                            <table className="w-full text-left text-[11px]">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="p-3 font-black">Data Type</th>
                                        <th className="p-3 font-black">Retention Period</th>
                                        <th className="p-3 font-black">Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-50">
                                        <td className="p-3 font-bold">Org Profile</td>
                                        <td className="p-3">Pilot + 1 year</td>
                                        <td className="p-3">Contractual reference</td>
                                    </tr>
                                    <tr className="border-b border-gray-50">
                                        <td className="p-3 font-bold">Login Logs</td>
                                        <td className="p-3">180 days</td>
                                        <td className="p-3">Security & compliance</td>
                                    </tr>
                                    <tr className="border-b border-gray-50">
                                        <td className="p-3 font-bold">Upload Metadata</td>
                                        <td className="p-3">6 months from end</td>
                                        <td className="p-3">Audit trail</td>
                                    </tr>
                                    <tr>
                                        <td className="p-3 font-bold">Security Logs</td>
                                        <td className="p-3">1 year</td>
                                        <td className="p-3">Compliance/Investigation</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-sm mb-4">You may request deletion at any time via <strong>privacy@dataunlock.com</strong>. We will delete data within 30 days, except where legally required for retention (legal defense, public interest, or court orders).</p>
                    </section>

                    <section>
                        <h3 className="text-black font-black text-lg mb-4 uppercase tracking-tight">7. DATA SECURITY</h3>
                        <div className="space-y-4 text-sm">
                            <p><strong>Technical Measures:</strong> TLS 1.3+ in transit, AES-256 at rest, encrypted database volumes, JWT token authentication, and role-based access control (RBAC).</p>
                            <p><strong>Network Security:</strong> Firewalls, DDoS protection, VPN access for staff, and quarterly disaster recovery testing (RTO: 4 hours, RPO: 1 hour).</p>
                            <p><strong>Organizational Security:</strong> Annual staff training, background checks for production staff, and mandatory security assessments for all sub-processors.</p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-black font-black text-lg mb-4 uppercase tracking-tight">8. DATA LOGGING</h3>
                        <p className="text-sm mb-3">We maintain structured logs for authentication, API/File activity, and system errors. We explicitly <strong>do not log</strong> file contents, raw responses, or respondent answers.</p>
                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-xs flex items-center justify-between">
                            <span className="font-bold">Right to Access Logs</span>
                            <span className="text-pink-600 font-black">Machine-readable JSON/CSV within 30 days</span>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-black font-black text-lg mb-4 uppercase tracking-tight">9. DATA BREACHES</h3>
                        <p className="text-sm mb-4">If compromised due to our negligence, we notify you within <strong>72 hours</strong>. We support your response by assisting with regulatory notifications and provide a comprehensive forensic incident report within 5 business days.</p>
                    </section>

                    <section>
                        <h3 className="text-black font-black text-lg mb-4 uppercase tracking-tight">10. YOUR PRIVACY RIGHTS</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {['Access', 'Rectification', 'Erasure', 'Restriction', 'Portability', 'Objection'].map((right) => (
                                <div key={right} className="p-3 bg-white border border-gray-100 rounded-xl text-center">
                                    <span className="text-[10px] font-black uppercase text-pink-600 mb-1 block">Right to</span>
                                    <span className="text-sm font-black">{right}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs mt-4 text-center text-gray-400">Timeline for all requests: 30 days via privacy@dataunlock.com</p>
                    </section>

                    <section>
                        <h3 className="text-black font-black text-lg mb-4 uppercase tracking-tight">11. CONSENT FOR DATA PROCESSING</h3>
                        <div className="bg-gray-900 p-6 rounded-[2rem] text-white">
                            <p className="text-xs font-black uppercase tracking-widest text-pink-500 mb-4">By enrolling, you confirm:</p>
                            <ul className="space-y-3 text-[11px] font-bold">
                                <li className="flex gap-2"><span>☑️</span> You have read this Privacy Policy</li>
                                <li className="flex gap-2"><span>☑️</span> You have authority to provide data on behalf of your organization</li>
                                <li className="flex gap-2"><span>☑️</span> Survey data has been lawfully collected with appropriate consent</li>
                                <li className="flex gap-2"><span>☑️</span> Respondent data has been anonymized/pseudonymized where required</li>
                                <li className="flex gap-2"><span>☑️</span> You understand this is a beta/validation pilot</li>
                                <li className="flex gap-2"><span>☑️</span> You consent to our use of sub-processors listed in Section 5</li>
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-black font-black text-lg mb-4 uppercase tracking-tight">12. COMPLAINTS & CONTACT</h3>
                        <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl flex flex-col md:flex-row gap-8 items-start">
                            <div className="space-y-2 flex-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">DPO Contact</p>
                                <div className="flex items-center gap-2 text-black font-bold text-sm">
                                    <Mail className="w-4 h-4 text-pink-600" />
                                    privacy@dataunlock.com
                                </div>
                            </div>
                            <div className="space-y-2 flex-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Irish Regulator</p>
                                <p className="text-[11px] font-bold leading-tight">Data Protection Commission (Ireland)<br/>Dublin 2 • +353 (0)761 108 800</p>
                            </div>
                        </div>
                    </section>

                    <div className="text-center pt-10 border-t border-gray-50 space-y-2">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Questions? Contact privacy@dataunlock.com</p>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Updated: January 14, 2026 | Version: 1.0</p>
                    </div>
                </div>
                <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
                    <button onClick={onClose} className="px-10 py-4 bg-black text-white rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg">
                        I Acknowledge
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENTS ---

const DataUnlockLogo = () => (
    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shrink-0">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3.5">
            <path d="M7 6v8a5 5 0 0 0 10 0V6" />
            <line x1="12" y1="14" x2="12" y2="19" className="text-pink-600" />
        </svg>
    </div>
);

const HOW_IT_WORKS = [
    {
        step: "01",
        title: "LOAD YOUR DATA",
        detail: "Drop or send us your raw data – CSVs from survey tools, tickets, notes, whatever data you already have but currently cannot action.",
        icon: UploadCloud,
    },
    {
        step: "02",
        title: "TELL US WHAT YOU WANT TO KNOW",
        detail: "Pick your revenue goal: Reduce churn & stop losing customers • Spot upsell & retention wins • Decide what features to build next • Uncover competition threats.",
        icon: Unlock,
    },
    {
        step: "03",
        title: "ACT – EXECUTE",
        detail: "We give you the Strategy: Top revenue drivers with € impact estimates • Clear, prioritized steps to execute • Exact moves to reduce churn, build winning features, spot upsell opportunities.",
        icon: PlayCircle,
    }
];

const COMPLIANCE_ITEMS = [
    { icon: ShieldCheck, title: "GDPR Compliant", detail: "✓ GDPR Compliant – No training on your data. Fully anonymized." },
    { icon: Lock, title: "Processed in EU", detail: "✓ Processed in EU – Analysis stays in GDPR infrastructure." },
    { icon: Globe, title: "Global Delivery", detail: "✓ Processing secure in EU, strategy delivered worldwide." },
    { icon: FileCheck, title: "Enterprise Security", detail: "✓ AES 256 encryption – At rest and in transit. ✓ SOC 2 Type II Ready." }
];

export default function App() {
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

    return (
        <div className="bg-[#FAFAFA] font-sans selection:bg-pink-100 selection:text-pink-900 text-gray-900 overflow-x-hidden min-h-screen">
            <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
            
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 p-4 md:p-6 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-lg md:text-xl font-black tracking-tighter flex items-center gap-2">
                        <DataUnlockLogo />
                        DATAUNLOCK
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                        <button 
                            onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-black text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold hover:bg-gray-800 transition-all flex items-center gap-2"
                        >
                            Get Pilot Access <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="pt-28 sm:pt-36 md:pt-48 pb-16 md:pb-32 px-6 max-w-7xl mx-auto">
                <div className="max-w-4xl">
                    <div className="inline-flex items-center mb-4 text-[10px] font-black bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full uppercase tracking-widest gap-2">
                        <Activity className="w-3 h-3 animate-pulse" />
                        Now Accepting Pilot Partners
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.9] md:leading-[0.85] mb-6 md:mb-10">
                        UNLOCK<br/>
                        <span className="text-pink-600">REVENUE</span><br/>
                        IN YOUR DATA.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mb-8 md:mb-12 leading-relaxed">
                        Your data is trapped in spreadsheets. Weeks of analysis. Delayed decisions. We give you the exact steps to unlock revenue - fast and secure.
                    </p>
                    <button 
                        onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
                        className="w-full sm:w-auto px-8 md:px-10 py-5 md:py-6 bg-black text-white rounded-2xl font-black text-xl md:text-2xl hover:scale-105 transition-all shadow-2xl shadow-gray-200"
                    >
                        Start Your Pilot
                    </button>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 md:py-24 px-6 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12 md:mb-16">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-600 mb-3">THE ENGINE</p>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter">HOW WE UNLOCK.</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {HOW_IT_WORKS.map((item, i) => (
                            <div key={i}>
                                <div className="text-5xl md:text-7xl font-black text-gray-50 mb-3 md:mb-4">{item.step}</div>
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-pink-50 flex items-center justify-center mb-5 md:mb-6">
                                    <item.icon className="w-6 h-6 md:w-7 md:h-7 text-pink-600" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black mb-3 md:mb-4 tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base">{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Case: Zeus Scooters */}
            <section className="py-20 md:py-24 px-6 bg-black text-white overflow-hidden relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-12 md:gap-16 items-center">
                        <div className="lg:w-1/2">
                            <div className="flex items-center gap-3 mb-6 md:mb-8">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-pink-500 bg-pink-500/10 px-3 md:px-4 py-2 rounded-full">Case Study</span>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-500">Zeus Scooters</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 md:mb-10 leading-[1] md:leading-[0.9]">
                                MICRO-MOBILITY IMPACT. <span className="text-pink-500">CHURN REDUCTION</span> FOR 150K USERS.
                            </h2>
                            
                            <div className="relative p-6 md:p-12 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] mb-8 md:mb-12">
                                <Quote className="absolute top-4 md:top-6 right-6 md:right-8 w-8 h-8 md:w-12 md:h-12 text-pink-500/20" />
                                <p className="text-2xl md:text-3xl font-bold leading-tight mb-6 md:mb-8">
                                    "You've given me a step-by-step guide to reduce churn."
                                </p>
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-600 rounded-full flex items-center justify-center font-black text-sm md:text-base shrink-0">CK</div>
                                    <div>
                                        <div className="font-black text-base md:text-lg">Chris Kemp</div>
                                        <div className="text-gray-500 text-[10px] md:text-sm font-bold uppercase tracking-widest">Deputy CEO, Zeus Scooters</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
                            <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between hover:bg-white/10 transition-all min-h-[240px]">
                                <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-pink-500 mb-8 md:mb-12" />
                                <div>
                                    <div className="text-4xl md:text-5xl font-black mb-2">€900K</div>
                                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Revenue Recovery</div>
                                </div>
                            </div>
                            <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between hover:bg-white/10 transition-all md:col-span-2 min-h-[240px]">
                                <div className="flex justify-between items-start">
                                    <Zap className="w-8 h-8 md:w-10 md:h-10 text-pink-500 mb-8 md:mb-12" />
                                    <div className="text-right">
                                        <div className="text-4xl md:text-5xl font-black leading-none">&lt;7</div>
                                        <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-1">Days</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xl md:text-2xl font-black mb-1">Execution Speed</div>
                                    <div className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">From data to actionable strategy</div>
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
                        <div className="max-w-2xl">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-600 mb-3">Trust & Compliance</p>
                            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-4">BUILT FOR TRUST.</h2>
                            <p className="text-lg md:text-2xl text-gray-500 font-bold uppercase tracking-widest">Security by design, compliance by nature.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {COMPLIANCE_ITEMS.map((item, i) => (
                            <div key={i} className="bg-white p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border border-gray-200 shadow-sm transition-all hover:shadow-md">
                                <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center mb-6 shrink-0">
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
                        READY TO<br/><span className="text-pink-600">UNLOCK REVENUE?</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
                        We have a limited number of pilot partnerships available.
                    </p>
                    <a
                        href="mailto:damien@dataunlock.ai?subject=DataUnlock Pilot Inquiry"
                        className="inline-flex items-center justify-center w-full max-w-2xl py-8 md:py-10 text-2xl md:text-4xl font-black rounded-[2rem] md:rounded-[3rem] bg-black text-white hover:scale-[1.02] shadow-2xl transition-all"
                    >
                        Get Pilot Access <ChevronRight className="ml-2 md:ml-4 w-6 h-6 md:w-10 md:h-10 shrink-0" />
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 md:py-16 bg-white px-8 border-t border-gray-100">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                    <div className="text-lg md:text-xl font-black tracking-tighter flex items-center gap-2">
                        <DataUnlockLogo />
                        DATAUNLOCK
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-300">
                        <div className="mb-2">
                            © 2026 DATAUNLOCK. SECURE FEEDBACK INTELLIGENCE. PROCESSED IN THE EU.
                        </div>
                        <div className="flex items-center gap-4">
                            <button 
                                onClick={() => setIsPrivacyOpen(true)}
                                className="text-pink-600 hover:text-pink-700 transition-colors"
                            >
                                Privacy Policy
                            </button>
                            <span className="text-gray-200">|</span>
                            <span>Version 1.0</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
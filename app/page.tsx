"use client";

import React, { useState, useEffect } from 'react';
import { 
  Database,
  ArrowUpRight,
  ShieldAlert,
  UserCheck,
  Search,
  ShieldCheck,
  Scale,
  Activity
} from 'lucide-react';

/**
 * THE SHIELD INDEX STYLE COMPONENTS
 * Adding types to satisfy strict TypeScript requirements in Next.js build
 */
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <div 
    className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both"
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

const LineSeparator = () => (
  <div className="w-full h-[1px] bg-black/5 dark:bg-white/10" />
);

const SectionLabel = ({ text, light = false }: { text: string, light?: boolean }) => (
  <div className="flex items-center gap-3 mb-12">
    <div className={`w-2 h-2 rounded-full ${light ? 'bg-white' : 'bg-black'}`} />
    <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${light ? 'text-white/50' : 'text-black/50'}`}>{text}</span>
  </div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCtaClick = () => { 
    if (typeof window !== 'undefined') {
      window.location.href = "mailto:damien@dataunlock.ai?subject=DataUnlock Conversation"; 
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-black selection:text-white">
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-black/5 h-16' : 'bg-transparent h-24'}`}>
        <div className="max-w-7xl mx-auto px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5" strokeWidth={2.5} />
            <span className="font-bold text-lg tracking-tighter uppercase">DataUnlock</span>
          </div>
          <div className="flex items-center gap-12">
            <div className="hidden md:flex gap-8 text-[11px] font-bold uppercase tracking-widest text-black/40">
              <a href="#how-it-works" className="hover:text-black transition-colors">How it works</a>
              <a href="#compliance" className="hover:text-black transition-colors">Compliance</a>
              <a href="#case" className="hover:text-black transition-colors">Case Study</a>
            </div>
            <button onClick={handleCtaClick} className="text-[11px] font-black uppercase tracking-widest border-b-2 border-black pb-0.5 hover:text-black/60 hover:border-black/60 transition-all">
              Start a Conversation
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-60 pb-48 px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-black/10 rounded-full mb-10">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest">EU AI Act Aligned · Human-in-the-Loop by Design</span>
              </div>
              <h1 className="text-6xl md:text-[100px] font-medium tracking-tighter leading-[0.9] mb-12">
                AI you can trust at the point of <span className="italic font-serif">decision</span>.
              </h1>

              <p className="text-xl md:text-2xl text-black/50 leading-relaxed max-w-3xl mb-16 font-light">
                We enable scaling companies turn operational data into strategy they can trust.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center">
                <button 
                  onClick={handleCtaClick} 
                  className="group relative bg-black text-white px-10 py-5 overflow-hidden transition-all hover:pr-14"
                >
                  <div className="relative z-10 flex flex-col items-start gap-1">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                      Start a Conversation <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <LineSeparator />

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-32 px-8 bg-[#F5F5F7] overflow-hidden border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <SectionLabel text="How DataUnlock Works" />
          
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-black/5 -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {/* Step 01 */}
              <div className="bg-white p-8 border border-black/[0.03] shadow-sm">
                <div className="w-10 h-10 rounded-full bg-black/5 border border-black/5 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-4 h-4 text-black" />
                </div>
                <span className="text-[10px] font-mono text-black/40 mb-2 block tracking-widest">01 — PRIVATE PROCESSING</span>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Your data stays yours</h4>
                <p className="text-xs text-black/70 leading-relaxed font-light">Everything is processed locally. Raw data never leaves your environment. Only an anonymised summary moves.</p>
              </div>

              {/* Step 02 */}
              <div className="bg-white p-8 border border-black/[0.03] shadow-sm">
                <div className="w-10 h-10 rounded-full bg-black/5 border border-black/5 flex items-center justify-center mb-6">
                  <Search className="w-4 h-4 text-black" />
                </div>
                <span className="text-[10px] font-mono text-black/40 mb-2 block tracking-widest">02 — ANALYSIS</span>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-4">The engine finds the patterns</h4>
                <p className="text-xs text-black/70 leading-relaxed font-light">Relationships. Signals. Behavioural drivers. Surfaced through deterministic analysis before any LLM sees your data.</p>
              </div>

              {/* Step 03 */}
              <div className="bg-white p-8 border border-black/[0.03] shadow-sm">
                <div className="w-10 h-10 rounded-full bg-black/5 border border-black/5 flex items-center justify-center mb-6">
                  <ShieldAlert className="w-4 h-4 text-black" />
                </div>
                <span className="text-[10px] font-mono text-black/40 mb-2 block tracking-widest">03 — VERIFICATION</span>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Independently Proven</h4>
                <p className="text-xs text-black/70 leading-relaxed font-light">An independent model scores every claim against the summary. Every recommendation traceable. Only supported claims reach you.</p>
              </div>

              {/* Step 04 */}
              <div className="bg-white p-8 border border-black/[0.03] shadow-sm">
                <div className="w-10 h-10 rounded-full bg-black/5 border border-black/5 flex items-center justify-center mb-6">
                  <UserCheck className="w-4 h-4 text-black" />
                </div>
                <span className="text-[10px] font-mono text-black/40 mb-2 block tracking-widest">04 — OVERSIGHT</span>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-4">The human makes the call</h4>
                <p className="text-xs text-black/70 leading-relaxed font-light">No decision moves without a qualified human reviewing and signing off. The audit trail is yours. The authority is yours.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE BY DESIGN SECTION */}
      <section id="compliance" className="py-32 px-8 bg-white overflow-hidden border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <SectionLabel text="Compliance by Design" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-12 leading-[1.1]">
                Governance is a <br/><span className="italic font-serif">design choice</span>.
              </h2>
              <div className="space-y-12">
                <p className="text-xl text-black/50 leading-relaxed max-w-xl">
                  The EU AI Act set a framework for trustworthy AI. Logging. Transparency. Human oversight.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-medium tracking-tighter">35%</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed text-black/40 border-l border-black/10 pl-4">
                      of founders have<br/>never heard of it.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-medium tracking-tighter text-black/90">36%</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed text-black/40 border-l border-black/10 pl-4">
                      don't know how it<br/>will affect them.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-end lg:pl-12 border-l border-black/5">
              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <div className="mt-1"><Scale className="w-5 h-5 text-black" /></div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest mb-2">Framework Ready</h4>
                    <p className="text-xs text-black/50 leading-relaxed font-light">Direct alignment with Article 13 (Transparency) and Article 14 (Human Oversight) requirements.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="mt-1"><Activity className="w-5 h-5 text-black" /></div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest mb-2">Automated Logging</h4>
                    <p className="text-xs text-black/50 leading-relaxed font-light">Immutable recording of system performance and decision-making pathways.</p>
                  </div>
                </div>
                <div className="pt-8 border-t border-black/5">
                  <p className="text-black font-medium italic font-serif text-2xl leading-snug mb-4">
                    "We didn't treat it as compliance. We treated it as the standard."
                  </p>
                  <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-black/30">Source — Scale Ireland State of Start-ups Survey, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY SECTION */}
      <section id="case" className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionLabel text="Case Study" />
          <h2 className="text-5xl md:text-[80px] font-medium tracking-tighter leading-[0.9] mb-24 max-w-4xl">
            €900k recovered. <br/>Zero data exposure.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/5 border-y border-black/5 mb-24">
            <div className="py-16 pr-8">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-black/30 mb-8 block">Recovery Metric</div>
              <div className="text-6xl font-medium tracking-tighter mb-4">€900,000</div>
              <p className="text-black/50 text-xs font-light leading-relaxed uppercase tracking-widest">Incremental revenue identified through automated gap analysis.</p>
            </div>
            <div className="py-16 px-8 border-l border-black/5">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-black/30 mb-8 block">Security Metric</div>
              <div className="text-6xl font-medium tracking-tighter mb-4">0.00%</div>
              <p className="text-black/50 text-xs font-light leading-relaxed uppercase tracking-widest">Personally Identifiable Information (PII) moved to processing layer.</p>
            </div>
            <div className="py-16 pl-8 border-l border-black/5">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-black/30 mb-8 block">Velocity Metric</div>
              <div className="text-6xl font-medium tracking-tighter mb-4">7 Days</div>
              <p className="text-black/50 text-xs font-light leading-relaxed uppercase tracking-widest">Time elapsed from system deployment to actionable decision sign-off.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 p-12 bg-[#F5F5F7] rounded-sm">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-white border border-black/5 flex items-center justify-center font-serif italic text-xl text-black">CK</div>
              <div>
                <p className="text-lg font-medium leading-tight">"Step-by-step roadmap to growth."</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mt-2">Chris Kemp · Deputy CEO, Zeus Scooters</p>
              </div>
            </div>
            <button onClick={handleCtaClick} className="group relative bg-black text-white px-8 py-5 overflow-hidden transition-all text-[11px] font-bold uppercase tracking-widest">
              <span className="relative z-10">Start a Conversation</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 px-8 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
            <div className="max-w-sm">
              <div className="flex items-center gap-2 mb-8">
                <Database className="w-5 h-5" />
                <span className="font-bold text-lg tracking-tighter uppercase">DataUnlock</span>
              </div>
              <div className="text-sm text-black/40 leading-relaxed font-light space-y-2">
                <p>AI you can trust.</p>
                <p>With the human at the centre.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 block text-black/30">System</h5>
                <a href="#how-it-works" className="text-sm block hover:text-black/60 transition-colors text-left">How it works</a>
                <a href="#compliance" className="text-sm block hover:text-black/60 transition-colors text-left">Compliance</a>
              </div>
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-8 block text-black/30">Engagement</h5>
                <button onClick={handleCtaClick} className="text-sm block hover:text-black/60 transition-colors text-left">Start a Conversation</button>
                <button onClick={handleCtaClick} className="text-sm block hover:text-black/60 transition-colors text-left">Private Beta</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-black/5 text-[10px] font-bold uppercase tracking-widest text-black/20">
            <span>© {new Date().getFullYear()} DataUnlock · Human-Centred AI Analytics</span>
            <div className="flex gap-8">
              <button onClick={handleCtaClick} className="hover:text-black transition-colors">Security Audit</button>
              <button onClick={handleCtaClick} className="hover:text-black transition-colors">DPA</button>
            </div>
          </div>
        </div>
      </footer>

      {/* GLOBAL STYLES FOR ANIMATIONS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in-from-bottom {
          from { transform: translateY(1rem); }
          to { transform: translateY(0); }
        }
        .animate-in {
          animation-duration: 700ms;
          animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }
        .fade-in {
          animation-name: fade-in;
        }
        .slide-in-from-bottom-4 {
          animation-name: slide-in-from-bottom;
        }
        .fill-mode-both {
          animation-fill-mode: both;
        }
      `}} />
    </div>
  );
}
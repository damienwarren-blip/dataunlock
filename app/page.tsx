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
  Activity,
  Menu,
  X
} from 'lucide-react';

/**
 * THE SHIELD INDEX STYLE COMPONENTS
 * Optimized for responsive behavior and strict TypeScript
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
  <div className="flex items-center gap-3 mb-8 md:mb-12">
    <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${light ? 'bg-white' : 'bg-black'}`} />
    <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] ${light ? 'text-white/50' : 'text-black/50'}`}>{text}</span>
  </div>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="min-h-screen bg-white text-[#111] font-sans selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* NAVIGATION */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || mobileMenuOpen ? 'bg-white/90 backdrop-blur-xl border-b border-black/5 h-16 md:h-20' : 'bg-transparent h-20 md:h-28'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-2 z-50">
            <Database className="w-5 h-5" strokeWidth={2.5} />
            <span className="font-bold text-base md:text-lg tracking-tighter uppercase">DataUnlock</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-12">
            <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-black/40">
              <a href="#how-it-works" className="hover:text-black transition-colors">How it works</a>
              <a href="#compliance" className="hover:text-black transition-colors">Compliance</a>
              <a href="#case" className="hover:text-black transition-colors">Case Study</a>
            </div>
            <button onClick={handleCtaClick} className="text-[11px] font-black uppercase tracking-widest border-b-2 border-black pb-0.5 hover:text-black/60 hover:border-black/60 transition-all">
              Start a Conversation
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <div className={`lg:hidden fixed inset-0 bg-white transition-transform duration-500 ease-in-out ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="flex flex-col items-center justify-center h-full gap-10 px-8 text-center">
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium tracking-tight">How it works</a>
            <a href="#compliance" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium tracking-tight">Compliance</a>
            <a href="#case" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium tracking-tight">Case Study</a>
            <button onClick={() => { handleCtaClick(); setMobileMenuOpen(false); }} className="mt-4 bg-black text-white w-full py-5 text-[11px] font-bold uppercase tracking-widest">
              Start a Conversation
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-40 md:pt-60 pb-24 md:pb-48 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="max-w-5xl">
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 border border-black/10 rounded-full mb-8 md:mb-10">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest leading-none">
                  AI you can trust. With the human at the centre.
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[100px] font-medium tracking-tighter leading-[0.95] md:leading-[0.9] mb-8 md:mb-12">
                AI you can trust at the point of <span className="italic font-serif">decision</span>.
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-black/50 leading-relaxed max-w-3xl mb-12 md:mb-16 font-light">
                Upload your operational data. Get a prioritised action plan — every insight independently proven, every decision human approved.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-start sm:items-center">
                <button 
                  onClick={handleCtaClick} 
                  className="w-full sm:w-auto group relative bg-black text-white px-8 md:px-10 py-5 overflow-hidden transition-all hover:pr-14"
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                      Start a Conversation
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
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
      <section id="how-it-works" className="py-24 md:py-32 px-6 md:px-8 bg-[#F5F5F7] overflow-hidden border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <SectionLabel text="How DataUnlock Works" />
          
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-black/5 -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
              {/* Steps */}
              {[
                { 
                  icon: <ShieldCheck className="w-4 h-4 text-black" />, 
                  tag: "01 — PRIVATE PROCESSING", 
                  title: "Your data stays yours", 
                  desc: "Everything is processed locally. Raw data never leaves your environment. Only an anonymised summary moves." 
                },
                { 
                  icon: <Search className="w-4 h-4 text-black" />, 
                  tag: "02 — ANALYSIS", 
                  title: "The engine finds the patterns", 
                  desc: "Relationships. Signals. Behavioural drivers. Surfaced through deterministic analysis before any LLM sees your data." 
                },
                { 
                  icon: <ShieldAlert className="w-4 h-4 text-black" />, 
                  tag: "03 — VERIFICATION", 
                  title: "Independently Proven", 
                  desc: "An independent model scores every claim against the summary. Every recommendation traceable. Only supported claims reach you." 
                },
                { 
                  icon: <UserCheck className="w-4 h-4 text-black" />, 
                  tag: "04 — OVERSIGHT", 
                  title: "The human makes the call", 
                  desc: "No decision moves without a qualified human reviewing and signing off. The audit trail is yours. The authority is yours." 
                }
              ].map((step, idx) => (
                <div key={idx} className="bg-white p-8 border border-black/[0.03] shadow-sm flex flex-col h-full">
                  <div className="w-10 h-10 rounded-full bg-black/5 border border-black/5 flex items-center justify-center mb-6">
                    {step.icon}
                  </div>
                  <span className="text-[9px] md:text-[10px] font-mono text-black/40 mb-2 block tracking-widest uppercase">{step.tag}</span>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-4">{step.title}</h4>
                  <p className="text-xs text-black/70 leading-relaxed font-light mt-auto">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE BY DESIGN SECTION */}
      <section id="compliance" className="py-24 md:py-32 px-6 md:px-8 bg-white overflow-hidden border-b border-black/5">
        <div className="max-w-7xl mx-auto">
          <SectionLabel text="Compliance by Design" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8 md:mb-12 leading-[1.1]">
                Governance is a <br/><span className="italic font-serif">design choice</span>.
              </h2>
              <div className="space-y-12">
                <p className="text-lg md:text-xl text-black/50 leading-relaxed max-w-xl font-light">
                  The EU AI Act set a framework for trustworthy AI. Logging. Transparency. Human oversight.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-12">
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl md:text-6xl font-medium tracking-tighter">35%</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed text-black/40 border-l border-black/10 pl-4">
                      of founders have<br className="hidden sm:block" />never heard of it.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl md:text-6xl font-medium tracking-tighter text-black/90">36%</span>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed text-black/40 border-l border-black/10 pl-4">
                      don't know how it<br className="hidden sm:block" />will affect them.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-end lg:pl-12 border-t lg:border-t-0 lg:border-l border-black/5 pt-12 lg:pt-0">
              <div className="space-y-8 md:space-y-10">
                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0"><Scale className="w-5 h-5 text-black" /></div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest mb-2">Framework Ready</h4>
                    <p className="text-xs text-black/50 leading-relaxed font-light">Direct alignment with Article 13 (Transparency) and Article 14 (Human Oversight) requirements.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0"><Activity className="w-5 h-5 text-black" /></div>
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-widest mb-2">Automated Logging</h4>
                    <p className="text-xs text-black/50 leading-relaxed font-light">Immutable recording of system performance and decision-making pathways.</p>
                  </div>
                </div>
                <div className="pt-8 border-t border-black/5">
                  <p className="text-black font-medium italic font-serif text-xl md:text-2xl leading-snug mb-4">
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
      <section id="case" className="py-24 md:py-32 px-6 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionLabel text="Case Study" />
          <h2 className="text-4xl md:text-6xl lg:text-[80px] font-medium tracking-tighter leading-[1] md:leading-[0.9] mb-16 md:mb-24 max-w-4xl">
            €900k recovered. <br className="hidden sm:block" />Zero data exposure.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/5 border-y border-black/5 mb-16 md:mb-24">
            <div className="py-12 md:py-16 pr-0 md:pr-8">
              <div className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-black/30 mb-6 md:mb-8 block">Recovery Metric</div>
              <div className="text-5xl md:text-6xl font-medium tracking-tighter mb-4">€900,000</div>
              <p className="text-black/50 text-[10px] md:text-xs font-light leading-relaxed uppercase tracking-widest">Incremental revenue identified through automated gap analysis.</p>
            </div>
            <div className="py-12 md:py-16 px-0 md:px-8 md:border-l border-black/5">
              <div className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-black/30 mb-6 md:mb-8 block">Security Metric</div>
              <div className="text-5xl md:text-6xl font-medium tracking-tighter mb-4">0.00%</div>
              <p className="text-black/50 text-[10px] md:text-xs font-light leading-relaxed uppercase tracking-widest">Personally Identifiable Information (PII) moved to processing layer.</p>
            </div>
            <div className="py-12 md:py-16 pl-0 md:pl-8 md:border-l border-black/5">
              <div className="text-[10px] md:text-sm font-bold uppercase tracking-[0.2em] text-black/30 mb-6 md:mb-8 block">Velocity Metric</div>
              <div className="text-5xl md:text-6xl font-medium tracking-tighter mb-4">7 Days</div>
              <p className="text-black/50 text-[10px] md:text-xs font-light leading-relaxed uppercase tracking-widest">Time elapsed from system deployment to actionable decision sign-off.</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 p-8 md:p-12 bg-[#F5F5F7] rounded-sm">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6">
              <div className="w-16 h-16 flex-shrink-0 rounded-full bg-white border border-black/5 flex items-center justify-center font-serif italic text-xl text-black">CK</div>
              <div>
                <p className="text-lg md:text-xl font-medium leading-tight">"Step-by-step roadmap to growth."</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mt-2">Chris Kemp · Deputy CEO, Zeus Scooters</p>
              </div>
            </div>
            <button onClick={handleCtaClick} className="w-full sm:w-auto group relative bg-black text-white px-8 py-5 overflow-hidden transition-all text-[11px] font-bold uppercase tracking-widest">
              <span className="relative z-10">Start a Conversation</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 md:py-24 px-6 md:px-8 border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 md:gap-16 mb-16 md:mb-24">
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
            <div className="grid grid-cols-2 md:grid-cols-2 gap-12 md:gap-24">
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 block text-black/30">System</h5>
                <a href="#how-it-works" className="text-sm block hover:text-black/60 transition-colors">How it works</a>
                <a href="#compliance" className="text-sm block hover:text-black/60 transition-colors">Compliance</a>
              </div>
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6 block text-black/30">Engagement</h5>
                <button onClick={handleCtaClick} className="text-sm block hover:text-black/60 transition-colors text-left">Conversation</button>
                <button onClick={handleCtaClick} className="text-sm block hover:text-black/60 transition-colors text-left">Private Beta</button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-black/5 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-black/20 text-center md:text-left">
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
        html {
          scroll-behavior: smooth;
        }
      `}} />
    </div>
  );
}
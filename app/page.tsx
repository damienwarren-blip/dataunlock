"use client";

import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Lock, 
  Menu, 
  X, 
  Globe,
  Database,
  TrendingUp,
} from 'lucide-react';

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <div 
    className="animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both"
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

const Badge = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${className}`}>
    {children}
  </span>
);

const SectionHeading = ({ number, title, subtitle }: { number: number; title: string; subtitle: string }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-indigo-600 font-mono font-bold tracking-tighter text-sm">/ 0{number}</span>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
    </div>
    <p className="text-gray-500 max-w-md leading-relaxed">{subtitle}</p>
  </div>
);

/* ── STEP 01: SVG BAR CHART ── */
function MockCharts() {
  const cats = [
    { label: "Subscriptions", pct: 68, col: "bg-indigo-600" },
    { label: "One-off",       pct: 21, col: "bg-indigo-300" },
    { label: "Add-ons",       pct: 11, col: "bg-indigo-100" },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Revenue</p>
          <p className="text-sm font-bold text-gray-900">Performance Trend</p>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
          <TrendingUp className="w-3 h-3" /> +18.4%
        </span>
      </div>
      <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <rect x="10"  y="76" width="36" height="44" rx="4" fill="#E0E7FF"/>
        <rect x="62"  y="58" width="36" height="62" rx="4" fill="#E0E7FF"/>
        <rect x="114" y="68" width="36" height="52" rx="4" fill="#E0E7FF"/>
        <rect x="166" y="34" width="36" height="86" rx="4" fill="#E0E7FF"/>
        <rect x="218" y="48" width="36" height="72" rx="4" fill="#E0E7FF"/>
        <rect x="270" y="10" width="36" height="110" rx="4" fill="#4F46E5"/>
        <text x="28"  y="116" textAnchor="middle" fontSize="9" fill="#9CA3AF" fontFamily="Inter,sans-serif">J</text>
        <text x="80"  y="116" textAnchor="middle" fontSize="9" fill="#9CA3AF" fontFamily="Inter,sans-serif">F</text>
        <text x="132" y="116" textAnchor="middle" fontSize="9" fill="#9CA3AF" fontFamily="Inter,sans-serif">M</text>
        <text x="184" y="116" textAnchor="middle" fontSize="9" fill="#9CA3AF" fontFamily="Inter,sans-serif">A</text>
        <text x="236" y="116" textAnchor="middle" fontSize="9" fill="#9CA3AF" fontFamily="Inter,sans-serif">M</text>
        <text x="288" y="116" textAnchor="middle" fontSize="9" fill="#4F46E5" fontFamily="Inter,sans-serif" fontWeight="600">J</text>
      </svg>
      <div className="pt-3 border-t border-gray-100 space-y-2">
        {cats.map(({ label, pct, col }, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <p className="text-[10px] text-gray-500 w-24 shrink-0">{label}</p>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full ${col} rounded-full`} style={{ width: `${pct}%` }} />
            </div>
            <p className="text-[10px] font-bold text-gray-600 w-7 text-right">{pct}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── STEP 02: AI SIGNALS ── */
function Panel02() {
  const signals = [
    { label: "Churn concentration",  risk: "High",   color: "text-rose-700",    bg: "bg-rose-50",    border: "border-rose-200"    },
    { label: "Win-back opportunity",  risk: "Medium", color: "text-amber-700",   bg: "bg-amber-50",   border: "border-amber-200"   },
    { label: "Loyalty cohort",        risk: "Low",    color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
  ];
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">AI signal scan</span>
      </div>
      {signals.map(({ label, risk, color, bg, border }, i) => (
        <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-0 bg-white">
          <span className="text-sm text-gray-700">{label}</span>
          <span className={`text-[11px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full border ${color} ${bg} ${border}`}>{risk}</span>
        </div>
      ))}
      <div className="px-6 py-4 bg-violet-50 border-t border-violet-100">
        <p className="text-[11px] text-violet-700 font-medium">Raw data never transmitted · anonymised summaries only</p>
      </div>
    </div>
  );
}

/* ── STEP 03: PRIVACY RECEIPT ── */
function Panel03() {
  const rows = [
    { label: "File loaded",   val: "23,486 rows", highlight: ""               },
    { label: "PII redacted",  val: "100%",        highlight: ""               },
    { label: "Raw data sent", val: "0 KB",        highlight: "text-emerald-600" },
    { label: "Summary sent",  val: "1.2 KB",      highlight: ""               },
    { label: "Compliance",    val: "EU AI Act · GDPR Art. 25", highlight: "text-gray-400" },
  ];
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Privacy receipt</span>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">✓ Verified</span>
      </div>
      {rows.map(({ label, val, highlight }, i) => (
        <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-0 bg-white">
          <span className="text-sm text-gray-500">{label}</span>
          <span className={`text-sm font-semibold ${highlight || "text-gray-900"}`}>{val}</span>
        </div>
      ))}
    </div>
  );
}

/* ── STEP 04: ROADMAP ── */
function Panel04() {
  const phases = [
    { phase: "Phase 1", days: "Days 1–30",  title: "Win-back Campaign",  active: true  },
    { phase: "Phase 2", days: "Days 31–60", title: "Pricing Adjustment", active: false },
    { phase: "Phase 3", days: "Days 61–90", title: "Loyalty Programme",  active: false },
  ];
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">90-day roadmap</span>
      </div>
      {phases.map(({ phase, days, title, active }, i) => (
        <div key={i} className={`flex items-center justify-between px-6 py-4 border-b border-gray-100 last:border-0 ${active ? "bg-indigo-50" : "bg-white"}`}>
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full shrink-0 ${active ? "bg-indigo-600" : "bg-gray-300"}`} />
            <div>
              <p className={`text-sm font-semibold ${active ? "text-indigo-900" : "text-gray-500"}`}>{title}</p>
              <p className="text-[11px] text-gray-400">{phase} · {days}</p>
            </div>
          </div>
          {active && <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-full shrink-0">Active</span>}
        </div>
      ))}
    </div>
  );
}

/* ── MAIN ── */
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const contactEmail = "mailto:damien@dataunlock.ai";
  const handleCtaClick = () => { window.location.href = contactEmail; };

  return (
    <div className="min-h-screen bg-[#FAFAFB] text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Database className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">DataUnlock</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={handleCtaClick}
              className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200">
              Get in Touch
            </button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col items-center text-center">
              <Badge className="bg-indigo-50 border-indigo-100 text-indigo-700 mb-6">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                Privacy-First · Zero Data Risk
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 max-w-4xl leading-[1.1]">
                AI insights<br />
                <span className="text-indigo-600">you can trust.</span>
              </h1>
              <p className="text-xl text-gray-500 mb-10 max-w-2xl leading-relaxed">
                We enable scaling companies to turn operational data into actionable decisions.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button onClick={handleCtaClick}
                  className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 group">
                  Get in Touch
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-sm font-medium text-gray-400">No data leaves your device</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4-STEP PROCESS */}
      <section className="py-24 px-6 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto space-y-20">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn delay={100}>
              <SectionHeading
                number={1}
                title="See Your Business Clearly"
                subtitle="Drop in any spreadsheet or export and instantly see what's actually going on — clean charts, real trends, no jargon. It's your data, just finally readable."
              />
            </FadeIn>
            <FadeIn delay={200}><MockCharts /></FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn delay={100}>
              <SectionHeading
                number={2}
                title="Understand What It Means"
                subtitle="Standard AI tools hallucinate, expose sensitive data, and produce outputs organisations can't trust or act on. DataUnlock fixes that. Every insight traces back to your data — no guesswork, fully auditable, EU AI Act ready."
              />
            </FadeIn>
            <FadeIn delay={200}><Panel02 /></FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn delay={100}>
              <SectionHeading
                number={3}
                title="Know Your Data Stayed Safe"
                subtitle="Every analysis generates a plain-English receipt showing exactly what was looked at and what was sent. Nothing hidden. Nothing assumed. Show it to your team, your board, or your auditor."
              />
            </FadeIn>
            <FadeIn delay={200}><Panel03 /></FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn delay={100}>
              <SectionHeading
                number={4}
                title="Walk Away With a Plan"
                subtitle="You get a clear, prioritised 90-day roadmap — not a report full of charts nobody acts on. Every recommendation connects back to your own data, so you can stand behind every decision."
              />
            </FadeIn>
            <FadeIn delay={200}><Panel04 /></FadeIn>
          </div>

        </div>
      </section>

      {/* ZEUS CASE STUDY */}
      <section className="py-24 md:py-32 px-6 bg-black text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full">Success Case</span>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">Zeus Scooters</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.95]">
                Reducing <span className="text-indigo-500">Churn</span><br/>across Europe.
              </h2>
              <div className="p-7 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-xl md:text-2xl font-semibold leading-snug mb-6">
                  &quot;You&apos;ve given me a step-by-step guide to reduce churn.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center font-black text-xs shrink-0">CK</div>
                  <div>
                    <div className="font-black text-sm">Chris Kemp</div>
                    <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Deputy CEO, Zeus Scooters</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-3 w-full">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between hover:bg-white/8 transition-all">
                <TrendingUp className="w-6 h-6 text-indigo-400 mb-6" />
                <div>
                  <div className="text-3xl md:text-4xl font-black mb-1.5">€900K</div>
                  <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Annual Projected<br/>Revenue Recovery</div>
                </div>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between hover:bg-white/8 transition-all">
                <Globe className="w-6 h-6 text-indigo-300 mb-6" />
                <div>
                  <div className="text-3xl md:text-4xl font-black mb-1.5">10K</div>
                  <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Customers Targeted<br/>for Win-Back Q1</div>
                </div>
              </div>
              <div className="col-span-2 p-6 bg-indigo-600 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="text-xl md:text-2xl font-black mb-1">Strategy Delivered</div>
                  <div className="text-[9px] font-bold opacity-75 uppercase tracking-widest">Full roadmap · European retention</div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="text-5xl md:text-6xl font-black leading-none">&lt;7</div>
                  <div className="text-[9px] font-black uppercase tracking-widest opacity-80 mt-1">Days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex p-3 bg-indigo-600 rounded-2xl text-white mb-8 shadow-lg shadow-indigo-200">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to unlock your own data?</h2>
            <p className="text-xl text-gray-500 mb-10">
              Join the scaling companies using DataUnlock to drive strategy without risking their most sensitive operational assets.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={handleCtaClick}
                className="w-full sm:w-auto bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl shadow-gray-200">
                Talk to Strategy Lead
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
              <Database className="text-white w-3.5 h-3.5" />
            </div>
            <span className="font-bold tracking-tight">DataUnlock</span>
          </div>
          <div className="text-sm text-gray-400">© 2026 DataUnlock. Built for high-trust governance.</div>
        </div>
      </footer>

    </div>
  );
}
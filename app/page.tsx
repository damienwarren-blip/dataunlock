"use client";

import React, { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Lock, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X, 
  Globe,
  Database,
  TrendingUp,
  TrendingDown,
  BrainCircuit,
  FileCheck,
  Map
} from 'lucide-react';

const FadeIn = ({ children, delay = 0 }) => (
  <div 
    className="animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both"
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${className}`}>
    {children}
  </span>
);

const SectionHeading = ({ number, title, subtitle }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-indigo-600 font-mono font-bold tracking-tighter text-sm">/ 0{number}</span>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
    </div>
    <p className="text-gray-500 max-w-md">{subtitle}</p>
  </div>
);

const MockupContainer = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 ${className}`}>
    {children}
  </div>
);

/* ── STEP 01 MOCKUP: clean mini dashboard ── */
function MockCharts() {
  const months = ["J","F","M","A","M","J"];
  const vals   = [38, 52, 44, 67, 58, 81];
  const max    = Math.max(...vals);
  const cats   = [
    { label:"Subscriptions", pct:68, col:"bg-indigo-600" },
    { label:"One-off",       pct:21, col:"bg-indigo-300" },
    { label:"Add-ons",       pct:11, col:"bg-indigo-100" },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-5">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Revenue</p>
          <p className="text-sm font-bold text-gray-900">Performance Trend</p>
        </div>
        <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
          <TrendingUp className="w-3 h-3" /> +18.4%
        </span>
      </div>
      {/* bars */}
      <div className="flex items-end gap-1.5 h-20">
        {vals.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full rounded-md ${i === vals.length-1 ? "bg-indigo-600" : "bg-indigo-100"}`}
              style={{ height: `${(v / max) * 100}%` }}
            />
            <span className="text-[8px] text-gray-400 font-medium">{months[i]}</span>
          </div>
        ))}
      </div>
      {/* category breakdown */}
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

/* ── STEP 02 MOCKUP: AI signals ── */
function MockAI() {
  const signals = [
    { label:"Churn concentration",  score:84, risk:"High",   tc:"text-rose-700",   bg:"bg-rose-50",   bdr:"border-rose-200",   bar:"bg-rose-500"    },
    { label:"Win-back opportunity",  score:71, risk:"Medium", tc:"text-amber-700",  bg:"bg-amber-50",  bdr:"border-amber-200",  bar:"bg-amber-400"   },
    { label:"Pricing sensitivity",   score:56, risk:"Medium", tc:"text-amber-700",  bg:"bg-amber-50",  bdr:"border-amber-200",  bar:"bg-amber-400"   },
    { label:"Loyalty cohort strength",score:32, risk:"Low",  tc:"text-emerald-700",bg:"bg-emerald-50",bdr:"border-emerald-200", bar:"bg-emerald-500" },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-violet-600" />
          <p className="text-sm font-bold text-gray-900">AI-Identified Signals</p>
        </div>
        <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
          0 raw rows sent
        </span>
      </div>
      {signals.map(({ label, score, risk, tc, bg, bdr, bar }, i) => (
        <div key={i} className="space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-gray-700">{label}</p>
            <span className={`text-[8.5px] font-black uppercase tracking-wide px-1.5 py-0.5 rounded border ${tc} ${bg} ${bdr}`}>
              {risk}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full ${bar} rounded-full`} style={{ width: `${score}%` }} />
            </div>
            <span className="text-[10px] font-bold text-gray-400 w-6 text-right">{score}</span>
          </div>
        </div>
      ))}
      <div className="mt-2 pt-3 border-t border-gray-100 flex items-start gap-2 bg-violet-50 rounded-xl px-3 py-2.5">
        <ShieldCheck className="w-3.5 h-3.5 text-violet-600 shrink-0 mt-0.5" />
        <p className="text-[9.5px] text-violet-800 font-medium leading-snug">
          Only anonymised cluster summaries transmitted. No personal data sent.
        </p>
      </div>
    </div>
  );
}

/* ── STEP 03 MOCKUP: privacy receipt ── */
function MockReceipt() {
  const rows = [
    { label:"File loaded",    val:"23,486 rows", tc:"text-gray-600",    bg:"bg-gray-50",    bdr:"border-gray-200",    icon:CheckCircle2 },
    { label:"Rows analysed",  val:"23,486 rows", tc:"text-gray-600",    bg:"bg-gray-50",    bdr:"border-gray-200",    icon:CheckCircle2 },
    { label:"PII redacted",   val:"100% masked", tc:"text-amber-700",   bg:"bg-amber-50",   bdr:"border-amber-200",   icon:CheckCircle2 },
    { label:"Raw data sent",  val:"0 KB",        tc:"text-emerald-700", bg:"bg-emerald-50", bdr:"border-emerald-200", icon:CheckCircle2 },
    { label:"Summary sent",   val:"1.2 KB",      tc:"text-indigo-700",  bg:"bg-indigo-50",  bdr:"border-indigo-200",  icon:CheckCircle2 },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      {/* receipt header */}
      <div className="flex items-center gap-2.5 mb-4 pb-4 border-b border-gray-100">
        <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
          <FileCheck className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900 leading-none">Privacy Receipt</p>
          <p className="text-[9px] text-gray-400 font-medium mt-0.5">Auto-generated · Immutable audit trail</p>
        </div>
        <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">✓ Verified</span>
      </div>
      <div className="space-y-1.5 mb-4">
        {rows.map(({ label, val, tc, bg, bdr, icon: Icon }, i) => (
          <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg border ${bg} ${bdr}`}>
            <div className="flex items-center gap-2">
              <Icon className={`w-3 h-3 ${tc}`} />
              <p className={`text-[10.5px] font-semibold ${tc}`}>{label}</p>
            </div>
            <p className={`text-[10.5px] font-black ${tc}`}>{val}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2">
        <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
        <p className="text-[9px] text-indigo-800 font-semibold">EU AI Act compliant · GDPR Article 25</p>
      </div>
    </div>
  );
}

/* ── STEP 04 MOCKUP: roadmap timeline ── */
function MockRoadmap() {
  const phases = [
    {
      phase:"Phase 1", days:"Days 1–30", col:"indigo",
      title:"Win-back Campaign",
      tasks:["Segment 10K at-risk users","Deploy email sequence","A/B test incentives"],
      active:true,
    },
    {
      phase:"Phase 2", days:"Days 31–60", col:"violet",
      title:"Pricing Adjustment",
      tasks:["Review tier sensitivity","Pilot new pricing"],
      active:false,
    },
    {
      phase:"Phase 3", days:"Days 61–90", col:"emerald",
      title:"Loyalty Programme",
      tasks:["Launch retention cohort","Measure NPS delta"],
      active:false,
    },
  ];
  const colMap = {
    indigo:  { badge:"text-indigo-700 bg-indigo-50 border-indigo-200",  dot:"bg-indigo-600", card:"bg-indigo-50 border-indigo-200"  },
    violet:  { badge:"text-violet-700 bg-violet-50 border-violet-200",  dot:"bg-violet-400", card:"bg-gray-50  border-gray-200"     },
    emerald: { badge:"text-emerald-700 bg-emerald-50 border-emerald-200",dot:"bg-emerald-400",card:"bg-gray-50  border-gray-200"     },
  };
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Map className="w-4 h-4 text-indigo-600" />
          <p className="text-sm font-bold text-gray-900">90-Day Roadmap</p>
        </div>
        <span className="text-[9px] font-black text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-full">
          3 phases
        </span>
      </div>
      <div className="relative space-y-2 pl-5">
        {/* vertical line */}
        <div className="absolute left-1.5 top-2 bottom-2 w-px bg-gray-200" />
        {phases.map(({ phase, days, col, title, tasks, active }, i) => {
          const c = colMap[col];
          return (
            <div key={i} className="relative">
              {/* dot */}
              <div className={`absolute -left-3.5 top-3 w-3 h-3 rounded-full border-2 border-white shadow-sm ${c.dot}`} />
              <div className={`rounded-xl border p-3 ${c.card} ${active?"shadow-sm":""}`}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${c.badge}`}>
                      {phase}
                    </span>
                    <p className={`text-[11px] font-bold ${active?"text-gray-900":"text-gray-500"}`}>{title}</p>
                  </div>
                  <p className="text-[9px] text-gray-400 font-medium shrink-0">{days}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tasks.map((t, j) => (
                    <span key={j} className="text-[8.5px] text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
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

      {/* Navigation — unchanged */}
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

      {/* Hero — unchanged */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col items-center text-center">
              <Badge className="bg-indigo-50 border-indigo-100 text-indigo-700 mb-6">
                <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                Privacy-First Audit Readiness
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 max-w-4xl leading-[1.1]">
                Strategic Roadmaps.<br />
                <span className="text-indigo-600">Zero Data Risk.</span>
              </h1>
              <p className="text-xl text-gray-500 mb-10 max-w-2xl leading-relaxed">
                We enable scaling companies turn operational data into actionable decisions using transparent AI—so leaders get answers they can trust.
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

      {/* 4-Step Process — narrative unchanged, mockups replaced */}
      <section className="py-24 px-6 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto space-y-24">

          {/* 01 Clear Visuals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <FadeIn delay={100}>
              <SectionHeading
                number={1}
                title="Clear Visuals"
                subtitle="We transform your messy spreadsheets into simple, beautiful charts that tell the real story of your business."
              />
            </FadeIn>
            <FadeIn delay={200}>
              <MockCharts />
            </FadeIn>
          </div>

          {/* 02 Smart Guidance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <FadeIn delay={100}>
              <SectionHeading
                number={2}
                title="Smart Guidance"
                subtitle="Our private AI spots hidden patterns and suggests exactly where to focus next, without ever reading your private customer details."
              />
              <ul className="space-y-4 mt-6">
                {[
                  "Find where you're losing money automatically",
                  "See how you compare to industry leaders",
                  "Test new ideas before you invest"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={200}>
              <MockAI />
            </FadeIn>
          </div>

          {/* 03 Privacy Proof */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <FadeIn delay={100}>
              <SectionHeading
                number={3}
                title="Privacy Proof"
                subtitle="Get a verified record showing your data stayed on your own device. Perfect for showing your team and partners you take security seriously."
              />
            </FadeIn>
            <FadeIn delay={200}>
              <MockReceipt />
            </FadeIn>
          </div>

          {/* 04 Your Action Plan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <FadeIn delay={100}>
              <SectionHeading
                number={4}
                title="Your Action Plan"
                subtitle="Information is only useful if you use it. We give you a simple, step-by-step checklist to hit your goals over the next three months."
              />
            </FadeIn>
            <FadeIn delay={200}>
              <MockRoadmap />
            </FadeIn>
          </div>

        </div>
      </section>

      {/* Success Case — original black version */}
      <section className="py-24 md:py-32 px-6 bg-black text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 md:gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-full">Success Case</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Zeus Scooters</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 md:mb-10 leading-[1] md:leading-[0.9]">
                Reducing <span className="text-indigo-500">Churn</span> across Europe.
              </h2>
              <div className="relative p-6 md:p-12 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] mb-8 md:mb-12">
                <p className="text-2xl md:text-3xl font-bold leading-tight mb-6 md:mb-8">
                  "You've given me a step-by-step guide to reduce churn."
                </p>
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-indigo-600 rounded-full flex items-center justify-center font-black text-sm md:text-base">CK</div>
                  <div>
                    <div className="font-black text-base md:text-lg">Chris Kemp</div>
                    <div className="text-gray-500 text-[10px] md:text-sm font-bold uppercase tracking-widest">Deputy CEO, Zeus Scooters</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full">
              <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between hover:bg-white/10 transition-all">
                <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-indigo-400 mb-8 md:mb-12" />
                <div>
                  <div className="text-4xl md:text-5xl font-black mb-2">€900K</div>
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Annual Projected<br/>Revenue Recovery</div>
                </div>
              </div>
              <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between hover:bg-white/10 transition-all">
                <Globe className="w-8 h-8 md:w-10 md:h-10 text-indigo-300 mb-8 md:mb-12" />
                <div>
                  <div className="text-4xl md:text-5xl font-black mb-2">10K</div>
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Customers Targeted<br/>for Win-Back Q1</div>
                </div>
              </div>
              <div className="p-8 md:p-10 bg-indigo-600 rounded-[2rem] md:rounded-[2.5rem] flex flex-col justify-between md:col-span-2">
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
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      </section>

      {/* Final CTA — unchanged */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex p-3 bg-indigo-600 rounded-2xl text-white mb-8 shadow-lg shadow-indigo-200">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to unlock your own data?</h2>
            <p className="text-xl text-gray-500 mb-10">
              Join the many high-growth companies using DataUnlock to drive strategy without risking their most sensitive operational assets.
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

      {/* Footer — unchanged */}
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
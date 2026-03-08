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
  Database
} from 'lucide-react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0 }) => (
  <div 
    className="animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both"
    style={{ animationDelay: `${delay}ms` }}
  >
    {children}
  </div>
);

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${className}`}>
    {children}
  </span>
);

interface SectionHeadingProps {
  number: number;
  title: string;
  subtitle: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ number, title, subtitle }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-indigo-600 font-mono font-bold tracking-tighter text-sm">/ 0{number}</span>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">{title}</h2>
    </div>
    <p className="text-gray-500 max-w-md">{subtitle}</p>
  </div>
);

interface MockupContainerProps {
  children: React.ReactNode;
  className?: string;
}

const MockupContainer: React.FC<MockupContainerProps> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden p-6 ${className}`}>
    {children}
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const contactEmail = "mailto:damien@dataunlock.ai";

  const handleCtaClick = () => {
    window.location.href = contactEmail;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB] text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Database className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">DataUnlock</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Privacy', 'Cases'].map((item) => (
              <a key={item} href="#" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
                {item}
              </a>
            ))}
            <button 
              onClick={handleCtaClick}
              className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-200"
            >
              Get in Touch
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
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
                <button 
                  onClick={handleCtaClick}
                  className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 group"
                >
                  Get in Touch
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex flex-col items-start sm:items-center">
                  <span className="text-sm font-medium text-gray-400">No data leaves your device • Free preview</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Simplified Stacked 4-Step Process */}
      <section className="py-24 px-6 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto space-y-24">
          
          {/* 01 Simple Visuals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <FadeIn delay={100}>
              <SectionHeading 
                number={1} 
                title="Clear Visuals" 
                subtitle="We transform your messy spreadsheets into simple, beautiful charts that tell the real story of your business."
              />
            </FadeIn>
            <FadeIn delay={200}>
              <MockupContainer className="bg-indigo-50/20 border-indigo-100 p-8 h-full min-h-[240px] flex flex-col justify-between">
                <div className="flex items-end gap-3 h-32 mb-4">
                  {[30, 60, 40, 85, 55, 75, 45, 95, 60, 80].map((h, i) => (
                    <div key={i} className="flex-1 bg-indigo-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Badge className="bg-white text-indigo-600 border-indigo-100">Live Dashboard</Badge>
                </div>
              </MockupContainer>
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
              <ul className="space-y-4">
                {[
                  "Find where you're losing money automatically",
                  "See how you compare to industry leaders",
                  "Test new ideas before you invest"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    {text}
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={200}>
              <MockupContainer className="bg-violet-50/20 border-violet-100 h-full min-h-[240px] flex flex-col justify-center">
                <div className="p-4 bg-white rounded-xl border border-violet-100 shadow-sm mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-4 h-4 text-violet-600" />
                    <span className="text-sm font-bold">Smart Alert: Growth Opportunity</span>
                    <Badge className="ml-auto bg-emerald-50 text-emerald-700 border-emerald-100 text-[10px]">Active</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-gray-400">
                      <span>SECURE LOCAL ANALYSIS</span>
                      <span>100%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-500 w-full"></div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center justify-center gap-2">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    Private & Secure
                  </span>
                </div>
              </MockupContainer>
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
              <div className="flex gap-4 h-full min-h-[240px]">
                <div className="flex-1 p-8 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-center">
                  <div className="text-4xl font-bold mb-1 tracking-tight">23,486</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Points Analyzed</div>
                </div>
                <div className="flex-1 p-8 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col justify-center">
                  <div className="text-4xl font-bold text-emerald-700 mb-1 tracking-tight">0</div>
                  <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Leaked Details</div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* 04 90-Day Roadmap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <FadeIn delay={100}>
              <SectionHeading 
                number={4} 
                title="Your Action Plan" 
                subtitle="Information is only useful if you use it. We give you a simple, step-by-step checklist to hit your goals over the next three months."
              />
            </FadeIn>
            <FadeIn delay={200}>
              <MockupContainer className="p-8 h-full min-h-[240px]">
                <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
                  {[
                    { phase: "Phase 1", title: "Organize & Cleanup", days: "Month 1", active: false },
                    { phase: "Phase 2", title: "Accelerate Growth", days: "Month 2", active: true },
                    { phase: "Phase 3", title: "Full Automation", days: "Month 3", active: false }
                  ].map((step, i) => (
                    <div key={i} className="pl-8 relative">
                      <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-sm ${step.active ? 'bg-indigo-600 animate-pulse' : 'bg-gray-200'}`}></div>
                      <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mb-1">{step.phase} • {step.days}</div>
                      <div className="text-md font-bold text-gray-900">{step.title}</div>
                    </div>
                  ))}
                </div>
              </MockupContainer>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Success Case */}
      <section className="py-24 px-6 bg-indigo-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white p-12 rounded-[2rem] border border-indigo-100 shadow-xl shadow-indigo-100/10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-2xl">Zeus Scooters</span>
                </div>
                <blockquote className="text-3xl font-medium tracking-tight text-gray-900 mb-8 leading-tight italic">
                  "You've given me a step-by-step guide to reduce churn."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="font-bold">Chris Kemp</div>
                    <div className="text-sm text-gray-500">CEO & Founder, Zeus Scooters</div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 gap-6">
                {[
                  { label: "Recovery Found", val: "€900K" },
                  { label: "Active Customers", val: "10K+" },
                  { label: "Delivery Speed", val: "<7 Days" }
                ].map((stat, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="text-4xl font-bold text-gray-900 mb-1">{stat.val}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
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
              <button 
                onClick={handleCtaClick}
                className="w-full sm:w-auto bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl shadow-gray-200"
              >
                Start Free Preview
              </button>
              <button 
                onClick={handleCtaClick}
                className="w-full sm:w-auto bg-white border border-gray-200 text-gray-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all"
              >
                Talk to Strategy Lead
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
              <Database className="text-white w-3.5 h-3.5" />
            </div>
            <span className="font-bold tracking-tight">DataUnlock</span>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Security Audit</a>
          </div>
          <div className="text-sm text-gray-400">
            © 2026 DataUnlock. Built for high-trust governance.
          </div>
        </div>
      </footer>
    </div>
  );
}
"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function CaseStudyPage() {
  const [strategyAgreed, setStrategyAgreed] = useState(false);
  // Updated ctaLink and replaced references to "QuickChat" with "DataUnlock"
  const ctaLink = "mailto:info@dataunlock.io?subject=I want to hear my people&body=Hey DataUnlock team – let's talk about how DataUnlock can help us really listen.%0A%0ATeam size: %0ACurrent challenge: ";

  return (
    <div className="bg-[#FAFAFA] font-sans min-h-screen text-gray-900 overflow-x-hidden">
      {/* Navbar, matching main page vibe */}
      <nav className="fixed top-0 w-full z-50 px-4 sm:px-6 py-4 sm:py-6 bg-white/70 backdrop-blur-2xl border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-lg sm:text-xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white w-3.5 h-3.5 sm:w-4 h-4">D</span>
            </div>
            DATAUNLOCK
          </div>
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="bg-black text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold hover:bg-pink-600 transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-black/5"
          >
              Book Demo
          </button>
        </div>
      </nav>

      <div className="pt-32 max-w-7xl mx-auto">
        {/* HEADER & BACK BUTTON */}
        <a href="/" className="text-pink-600 hover:text-pink-400 font-bold mb-12 block transition duration-300 ease-in-out">
          ← Back to Homepage
        </a>

        {/* HERO & METRICS */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
          <p className="text-xl text-cyan-600 font-bold mb-4 tracking-wider">
            ZEUS SCOOTERS • CUSTOMER CHURN
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-pink-600 to-cyan-600 bg-clip-text text-transparent leading-tight">
            How DataUnlock Unlocked 3X Churn Insights for Zeus Scooters.
          </h1>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 p-6 border-y border-gray-200 bg-white rounded-xl shadow-sm">
            <div className="text-center py-4">
              <div className="text-4xl md:text-7xl font-extrabold text-pink-600">€900K</div>
              <p className="text-gray-600 text-sm md:text-base mt-2 font-medium">annual projected revenue recovery</p>
            </div>
            <div className="text-center py-4">
              <div className="text-4xl md:text-7xl font-extrabold text-purple-600">10K</div>
              <p className="text-gray-600 text-sm md:text-base mt-2 font-medium">customers targeted for win-back Q1</p>
            </div>
            <div className="text-center py-4">
              <div className="text-4xl md:text-7xl font-extrabold text-cyan-600">{'<7'}</div>
              <p className="text-gray-600 text-sm md:text-base mt-2 font-medium">Strategy delivered in days</p>
            </div>
          </div>
        </motion.div>

        {/* THE CHALLENGE */}
        <section className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-pink-600">
            The Challenge: The Cost of Silent Churn
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            Zeus Scooters was battling a critical customer retention crisis. Their reliance on traditional email surveys yielded a <strong>sub-1% engagement rate</strong>, providing only shallow, multiple-choice data. This meant they were unable to determine the true 'why' behind their escalating churn—a problem costing them <strong>significant annual revenue</strong>. To solve this, <strong>the Irish management team needed a culturally appropriate, German-speaking, high-engagement method</strong> to truly listen to their massive German user base: 150,000 customers across 30 cities.
          </p>
        </section>

        {/* THE APPROACH & OUTCOME */}
        <section className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-pink-600">
            The Solution: Video at Scale
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            DataUnlock implemented a <strong>high-impact, interactive video campaign</strong>, strategically distributed across email, in-app, and social channels. This personalized, mobile-first approach, delivered entirely in German, was specifically engineered to mirror the casual, high-speed brand experience of Zeus Scooters. The result was immediate: DataUnlock achieved a <strong>3X higher participation rate</strong> than traditional surveys and, crucially, delivered the <strong>rich, qualitative 'why'</strong> necessary to understand and solve their retention problems.
          </p>

          <div className="mt-12 p-8 bg-white rounded-xl border border-pink-200 shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-pink-600">Key Results:</h3>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 pl-4 font-medium">
              <li>
                <strong>Rapid Strategy:</strong> Full strategic blueprint delivered in less than seven days from campaign launch.
              </li>
              <li>
                <strong>Financial Impact:</strong> €900K annual projected revenue recovery, achieved at only 30% of the cost of new customer acquisition.
              </li>
              <li>
                <strong>Win-Back Goal:</strong> Targeted initiatives to win back 10,000 high-value customers in the next quarter by directly addressing specific churn reasons.
              </li>
              <li>
                <strong>Root Cause Action:</strong> Identified and prioritized the top 3 operational friction points for immediate resolution across all 30 German cities.
              </li>
            </ul>
          </div>
        </section>

        {/* QUOTE & CONCLUSION */}
        <section className="mt-20 py-16 bg-gradient-to-r from-pink-50 to-cyan-50 rounded-xl border border-pink-200">
          <figure className="max-w-4xl mx-auto px-8 text-center">
            <blockquote className="text-4xl italic font-semibold leading-snug text-gray-900">
              "You've given me a <strong>step-by-step guide to reduce churn</strong>. We went from guessing to knowing exactly which button to press to fix our problem."
            </blockquote>
            <figcaption className="mt-8 text-2xl font-bold text-pink-600">
              — Chris Kemp / Deputy CEO, Zeus Scooters
            </figcaption>
          </figure>
        </section>

        {/* FINAL CTA */}
        <div className="text-center mt-20 pb-20">
          <div className="max-w-lg mx-auto space-y-6">
            {/* Disclosure Checkbox */}
            <div className="flex items-start justify-center text-sm text-gray-700">
              <div className="p-4 border border-pink-300 rounded-lg bg-gray-50 w-full mx-auto shadow-md">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 text-pink-500 bg-white border-2 border-pink-500 rounded focus:ring-pink-500 checked:bg-pink-600 checked:border-transparent appearance-none transition duration-150 ease-in-out" 
                    required 
                    checked={strategyAgreed}
                    onChange={() => setStrategyAgreed(!strategyAgreed)}
                  />
                  <span>
                    By checking, you agree to the temporary capture of your name and email address for scheduling purposes.
                  </span>
                </label>
              </div>
            </div>

            {/* Button */}
            <a href={strategyAgreed ? ctaLink : "#"}>
              <div className={`flex items-center justify-center w-full px-12 py-5 text-xl font-bold rounded-full shadow-2xl transition-all duration-300 ease-in-out
                ${strategyAgreed
                  ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-pink-500/50 cursor-pointer" 
                  : "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none"
                }`}>
                <motion.div
                  whileHover={strategyAgreed ? { scale: 1.03, y: -1 } : { scale: 1.0 }}
                  whileTap={strategyAgreed ? { scale: 0.98 } : { scale: 1.0 }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 } as any}
                  onClick={(e: any) => { !strategyAgreed && e.preventDefault(); }}
                >
                  Book Your Strategy Call &rarr;
                </motion.div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Footer for vibe consistency */}
      <footer className="py-12 sm:py-16 bg-white px-4 sm:px-8 border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-lg sm:text-xl font-black tracking-tighter flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white w-3.5 h-3.5 sm:w-4 h-4">D</span>
            </div>
            DATAUNLOCK
          </div>
          <div className="text-[9px] sm:text-[10px] font-black text-gray-300 uppercase tracking-widest italic text-center">Privacy | Ethics © 2026 DataUnlock Operations.</div>
        </div>
      </footer>
    </div>
  );
}
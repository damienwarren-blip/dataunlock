"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { CLIENT_REGISTRY, GOAL_TEMPLATES } from '@/src/lib/clientRegistry';
import { Lock, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';

/**
 * 1. FIX: Define the Props Interface for the ChurnTool.
 * This tells TypeScript exactly what data the component expects.
 */
interface ChurnToolProps {
  clientConfig: any;
  goalTemplate: {
    label: string;
    aiPersona: string;
    focus: string;
    primaryMetric: string;
  };
}

// Extract valid keys from your registry for type-safe lookups
type GoalType = keyof typeof GOAL_TEMPLATES;

/**
 * 2. FIX: Pass <ChurnToolProps> to the dynamic loader.
 * This prevents the "IntrinsicAttributes" error during Vercel build.
 */
const ChurnTool = dynamic<ChurnToolProps>(() => import('@/components/ChurnTool'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Initializing Secure Compute...
        </p>
      </div>
    </div>
  )
});

export default function ClientPortalPage() {
  const params = useParams();
  const id = params.id as string;
  const config = CLIENT_REGISTRY[id];

  const [passkey, setPasskey] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  if (!config) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-500/10 p-4 rounded-full mb-6">
          <ShieldAlert className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">404: Portal Not Found</h1>
      </div>
    );
  }

  const handleUnlock = async () => {
    setIsVerifying(true);
    setError("");

    // Simulate security handshake
    await new Promise(resolve => setTimeout(resolve, 600));

    if (passkey === config.passkey) {
      setIsUnlocked(true);
    } else {
      setError("Access Denied: Invalid Security Key");
      setIsVerifying(false);
    }
  };

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full animate-in fade-in zoom-in duration-500">
          <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl overflow-hidden relative">
            <div className={`absolute top-0 left-0 w-full h-2 bg-indigo-600`} />
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
                <Lock className="w-8 h-8 text-slate-400" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
                {config.name}
              </h1>
              <p className="text-slate-500 text-sm mb-8 font-medium">
                Secure Data Insights Portal
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="password"
                  placeholder="Enter Access Key"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleUnlock()}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-center tracking-[0.3em] font-mono"
                  autoFocus
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs text-center font-bold animate-bounce">
                  {error}
                </p>
              )}

              <button 
                onClick={handleUnlock}
                disabled={isVerifying || !passkey}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-50 group"
              >
                {isVerifying ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Unlock Environment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            <p className="mt-8 text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              100% On-Device Analysis • Secure Tenant
            </p>
          </div>
        </div>
      </div>
    );
  }

  /**
   * 3. FIX: Use a type-safe lookup.
   * Casting config.goalType as GoalType prevents the "any" index error.
   */
  const goalKey = (config.goalType as GoalType) || "revenue-recovery";
  const clientTemplate = GOAL_TEMPLATES[goalKey];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ChurnTool clientConfig={config} goalTemplate={clientTemplate} />
    </div>
  );
}
"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { CLIENT_REGISTRY, GOAL_TEMPLATES } from '@/src/lib/clientRegistry';
import { Lock, ShieldAlert, ArrowRight, Loader2 } from 'lucide-react';

// 1. Define exactly what props ChurnTool expects
interface ChurnToolProps {
  clientConfig: any;
  goalTemplate: {
    label: string;
    aiPersona: string;
    focus: string;
    primaryMetric: string;
  };
}

type GoalType = keyof typeof GOAL_TEMPLATES;

// 2. Pass the interface to the dynamic loader
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
  // ... rest of your code stays the same ...
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
    if (passkey === config.passkey) {
      setIsUnlocked(true);
    } else {
      setError("Access Denied");
      setIsVerifying(false);
    }
  };

  if (!isUnlocked) {
     // ... your existing Unlock UI ...
     return <div>Unlock UI...</div> 
  }

  const goalKey = (config.goalType as GoalType) || "revenue-recovery";
  const clientTemplate = GOAL_TEMPLATES[goalKey];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ChurnTool clientConfig={config} goalTemplate={clientTemplate} />
    </div>
  );
}
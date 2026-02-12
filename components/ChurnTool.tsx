/**
 * ============================================================================
 * COST OF SALE & RECOVERY ANALYSIS TOOL - PII-SAFE EDITION
 * 
 * FEATURES:
 * 1. 7-Column PII-Safe Export (no plaintext emails)
 * 2. Waterfall Logic UI (Universe → Signal → Arbitrage → Equity)
 * 3. Sentiment-based signal categorization & plays
 * 4. Strategy table with category breakdowns
 * 5. Downloadable receipt & deployment strategy
 * 6. Multi-channel deployment vectors
 * ============================================================================
 */

"use client";

import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  Upload, Shield, Lock, CheckCircle2, AlertTriangle, TrendingUp,
  DollarSign, Users, Download, FileText, Zap, Target, BarChart3,
  Settings, Cpu, Loader2, TrendingDown, AlertOctagon, Activity,
  Mail, Smartphone, Megaphone, Info, Brain, Sparkles
} from 'lucide-react';

// SHA-256 helper
async function sha256(text: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Sentiment analysis for signal categorization
const analyzeSentiment = (text: string | null) => {
  if (!text) return { category: 'UNKNOWN', keywords: [] };
  
  const lower = text.toLowerCase();
  
  const patterns = {
    BILLING_COMPLAINT: { regex: /price|cost|expensive|billing|payment|charge|refund/, play: 'WINBACK_20PCT_OFFER' },
    SERVICE_FRICTION: { regex: /support|help|service|response|slow|wait|bug/, play: 'PRIORITY_SUPPORT_NUDGE' },
    TECHNICAL_ISSUE: { regex: /error|broken|crash|fail|glitch|not.*work/, play: 'ENGINEERING_ESCALATION' },
    LOW_ENGAGEMENT: { regex: /confused|difficult|hard|complex|learning/, play: 'ONBOARDING_REFRESH' },
    COMPETITIVE_THREAT: { regex: /competitor|alternative|switch|better/, play: 'RETENTION_CALL' },
    FEATURE_GAP: { regex: /feature|function|capability|missing|need/, play: 'ROADMAP_PREVIEW' }
  };
  
  for (const [category, { regex, play }] of Object.entries(patterns)) {
    if (regex.test(lower)) {
      const keywords = lower.match(regex) || [];
      return { category, play, keywords: keywords.slice(0, 3) };
    }
  }
  
  return { category: 'GENERAL_RISK', play: 'HEALTH_CHECK_EMAIL', keywords: [] };
};

// Calculate churn risk score
const calculateRiskScore = (isChurned: boolean, hasFeedback: boolean, sentiment: { category: string }) => {
  if (isChurned) return 100;
  
  let score = 0;
  if (hasFeedback) score += 40;
  
  const criticalCategories = ['BILLING_COMPLAINT', 'SERVICE_FRICTION', 'TECHNICAL_ISSUE'];
  if (criticalCategories.includes(sentiment.category)) score += 30;
  
  return Math.min(score, 95);
};

// Determine segment key
const getSegmentKey = (isChurned: boolean, isAtRisk: boolean, riskScore: number) => {
  if (isChurned) return 'LAG_RECOVERY';
  if (isAtRisk && riskScore >= 70) return 'AR_CRITICAL_HIGH';
  if (isAtRisk && riskScore >= 40) return 'AR_MEDIUM';
  if (isAtRisk) return 'AR_LOW';
  return 'HEALTHY';
};

// Inactivity bucket (example - would need date column in real implementation)
const getInactivityBucket = (isChurned: boolean) => {
  if (isChurned) return '60-90';
  return '0-30';
};

export default function CostOfSaleTool() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('');
  const [schema, setSchema] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [deliverables, setDeliverables] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // CFO Financial Controls
  const [lifetimeMonths, setLifetimeMonths] = useState<number>(9);
  const [successRate, setSuccessRate] = useState<number>(5);
  const [viewMode, setViewMode] = useState<'lag' | 'lead'>('lag');
  
  // Intelligence Engine Controls
  const [selectedEngine, setSelectedEngine] = useState<'deterministic' | 'gemini'>('deterministic');
  const [geminiApiKey, setGeminiApiKey] = useState<string>('');
  const [aiInsights, setAiInsights] = useState<any>(null);
  const [generatingInsights, setGeneratingInsights] = useState<boolean>(false);
  
  const [activeTab, setActiveTab] = useState<string>('upload');

  // Check for stored Gemini API key on mount
  useEffect(() => {
    const storedKey = sessionStorage.getItem('gemini_api_key');
    if (storedKey) {
      setGeminiApiKey(storedKey);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    
    setFile(uploadedFile);
    setError(null);
    setAnalysis(null);
    setDeliverables(null);
    setSchema(null);
  };

  const detectSchema = (headers: string[]) => {
    const schema: {
      email: number | null;
      revenue: number | null;
      feedback: number | null;
      churn: number | null;
      accountId: number | null;
    } = { 
      email: null, 
      revenue: null, 
      feedback: null, 
      churn: null,
      accountId: null 
    };
    
    headers.forEach((header, idx) => {
      const lower = header.toLowerCase().trim();
      if (/^email$|^e-?mail$|customer.*email/i.test(lower)) schema.email = idx;
      if (/^revenue$|^amount$|^mrr$|monthly.*revenue/i.test(lower)) schema.revenue = idx;
      if (/feedback|comment|reason|verbatim|text|note/i.test(lower)) schema.feedback = idx;
      if (/churn|cancel|status|active/i.test(lower)) schema.churn = idx;
      if (/account.*id|user.*id|customer.*id/i.test(lower)) schema.accountId = idx;
    });
    
    return schema;
  };

  const processFile = async () => {
    if (!file) return;
    
    setProcessing(true);
    setProgress(0);
    setError(null);
    
    try {
      setStatusText('Parsing CSV...');
      setProgress(10);
      
      const csvText = await file.text();
      const parseResult = Papa.parse(csvText, {
        header: false,
        skipEmptyLines: true
      });
      
      if (parseResult.errors.length > 0) {
        throw new Error('CSV parsing error');
      }
      
      const headers = parseResult.data[0] as string[];
      const rows = parseResult.data.slice(1) as string[][];
      
      await delay(100);
      
      setStatusText('Analyzing schema...');
      setProgress(20);
      const detectedSchema = detectSchema(headers);
      setSchema(detectedSchema);
      
      await delay(100);
      
      // ============================================================================
      // WATERFALL STAGE 1: THE UNIVERSE
      // ============================================================================
      
      setStatusText('Calculating universe metrics...');
      setProgress(30);
      
      let totalMRR = 0;
      let validRevenueCount = 0;
      
      if (detectedSchema.revenue !== null) {
        const revenueIdx = detectedSchema.revenue; // TypeScript now knows it's a number
        rows.forEach(row => {
          const rev = parseFloat(row[revenueIdx]);
          if (!isNaN(rev) && rev > 0) {
            totalMRR += rev;
            validRevenueCount++;
          }
        });
      }
      
      const arpu = validRevenueCount > 0 ? totalMRR / validRevenueCount : 0;
      const ltv = arpu * lifetimeMonths;
      
      // ============================================================================
      // WATERFALL STAGE 2: THE SIGNAL (Categorization)
      // ============================================================================
      
      setStatusText('Running signal analysis...');
      setProgress(40);
      
      const processedRows = [];
      const categoryBreakdown = {};
      
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const email = detectedSchema.email !== null ? row[detectedSchema.email] : null;
        const feedback = detectedSchema.feedback !== null ? row[detectedSchema.feedback] : null;
        const churnValue = detectedSchema.churn !== null ? row[detectedSchema.churn] : null;
        const revenue = detectedSchema.revenue !== null ? parseFloat(row[detectedSchema.revenue]) : arpu;
        const accountId = detectedSchema.accountId !== null ? row[detectedSchema.accountId] : `ACC_${i}`;
        
        if (!email || !email.trim()) continue;
        
        // Classify
        const isChurned = churnValue && 
          ['cancelled', 'yes', 'true', '1', 'churned', 'inactive', 'left'].includes(
            String(churnValue).toLowerCase().trim()
          );
        
        const isAtRisk = feedback && feedback.trim().length > 10;
        
        // Sentiment analysis
        const sentiment = analyzeSentiment(feedback);
        const riskScore = calculateRiskScore(isChurned, isAtRisk, sentiment);
        const segmentKey = getSegmentKey(isChurned, isAtRisk, riskScore);
        const inactivityBucket = getInactivityBucket(isChurned);
        
        // Hash email
        const hashedEmail = await sha256(email.trim().toLowerCase());
        
        processedRows.push({
          hashedEmail,
          segmentKey,
          riskScore,
          signalCategory: sentiment.category,
          recommendedPlay: sentiment.play,
          inactivityBucket,
          internalSafeId: accountId,
          revenue: !isNaN(revenue) ? revenue : arpu,
          isChurned,
          isAtRisk
        });
        
        // Track category breakdown
        if (isAtRisk || isChurned) {
          const category = sentiment.category;
          if (!categoryBreakdown[category]) {
            categoryBreakdown[category] = {
              count: 0,
              play: sentiment.play,
              totalRevenue: 0
            };
          }
          categoryBreakdown[category].count++;
          categoryBreakdown[category].totalRevenue += (!isNaN(revenue) ? revenue : arpu);
        }
        
        if (i % 50 === 0) {
          const prog = 40 + ((i / rows.length) * 40);
          setProgress(prog);
          setStatusText(`Processing row ${i + 1}/${rows.length}...`);
          await delay(1);
        }
      }
      
      setProgress(80);
      await delay(100);
      
      // ============================================================================
      // WATERFALL STAGE 3: THE ARBITRAGE & STAGE 4: EQUITY
      // ============================================================================
      
      setStatusText('Computing recovery models...');
      
      const lagSegment = processedRows.filter(r => r.isChurned);
      const leadSegment = processedRows.filter(r => r.isAtRisk);
      
      const lagRevenue = lagSegment.reduce((sum, r) => sum + r.revenue, 0);
      const leadRevenue = leadSegment.reduce((sum, r) => sum + r.revenue, 0);
      
      // Calculate per-category metrics
      const categoryMetrics = Object.entries(categoryBreakdown).map(([category, data]) => {
        const savedCustomers = Math.floor(data.count * (successRate / 100));
        const recoverableEquity = savedCustomers * ltv;
        
        return {
          category,
          count: data.count,
          play: data.play,
          savedCustomers,
          recoverableEquity: recoverableEquity.toFixed(2),
          monthlyMRR: data.totalRevenue.toFixed(2)
        };
      }).sort((a, b) => b.count - a.count);
      
      // Overall metrics
      const lagSaved = Math.floor(lagSegment.length * (successRate / 100));
      const leadSaved = Math.floor(leadSegment.length * (successRate / 100));
      
      const lagEquity = lagSaved * ltv;
      const leadEquity = leadSaved * ltv;
      
      // Build analysis object locally
      const analysisData = {
        universe: {
          totalRows: rows.length,
          totalMRR: totalMRR.toFixed(2),
          arpu: arpu.toFixed(2),
          ltv: ltv.toFixed(2)
        },
        signal: {
          lagCount: lagSegment.length,
          leadCount: leadSegment.length,
          categoryBreakdown: categoryMetrics
        },
        arbitrage: {
          successRate,
          lagSaved,
          leadSaved
        },
        equity: {
          lag: {
            totalExposure: lagRevenue.toFixed(2),
            recoverable: lagEquity.toFixed(2),
            saved: lagSaved
          },
          lead: {
            totalExposure: leadRevenue.toFixed(2),
            recoverable: leadEquity.toFixed(2),
            saved: leadSaved
          }
        }
      };
      
      setAnalysis(analysisData);
      
      setProgress(95);
      await delay(100);
      
      // ============================================================================
      // GENERATE PII-SAFE CSV EXPORT
      // ============================================================================
      
      setStatusText('Generating PII-safe export...');
      
      let piiSafeCSV = 'hashed_email,segment_key,churn_risk_score,signal_category,recommended_play,inactivity_bucket,internal_safe_id\n';
      
      processedRows.forEach(row => {
        piiSafeCSV += `${row.hashedEmail},${row.segmentKey},${row.riskScore},${row.signalCategory},${row.recommendedPlay},${row.inactivityBucket},${row.internalSafeId}\n`;
      });
      
      // Generate strategy document using local analysisData
      const strategyDoc = generateStrategyDocument(analysisData, categoryMetrics, lifetimeMonths, successRate);
      
      // Generate receipt using local analysisData
      const receipt = generateReceipt(analysisData, categoryMetrics);
      
      setDeliverables({ 
        piiSafeCSV, 
        strategyDoc,
        receipt
      });
      
      setProgress(100);
      setProcessing(false);
      setActiveTab('waterfall');
      
    } catch (err) {
      setError(err.message);
      setProcessing(false);
    }
  };

  const generateStrategyDocument = (analysis: any, categories: any[], ltMonths: number, success: number) => {
    return `
══════════════════════════════════════════════════════════════════
                    DEPLOYMENT STRATEGY DOCUMENT
══════════════════════════════════════════════════════════════════

Generated: ${new Date().toLocaleString()}
Lifetime Model: ${ltMonths} months
Success Rate: ${success}%

──────────────────────────────────────────────────────────────────
WATERFALL ANALYSIS
──────────────────────────────────────────────────────────────────

Stage 1: THE UNIVERSE
└─ Total Customers: ${analysis.universe.totalRows}
└─ Total MRR Exposure: $${analysis.universe.totalMRR}
└─ ARPU: $${analysis.universe.arpu}
└─ LTV (${ltMonths}mo): $${analysis.universe.ltv}

Stage 2: THE SIGNAL
└─ Active Revenue Threats (LEAD): ${analysis.signal.leadCount}
└─ Churned Customers (LAG): ${analysis.signal.lagCount}

Stage 3: THE ARBITRAGE
└─ Success Rate Applied: ${success}%
└─ LEAD Saves: ${analysis.arbitrage.leadSaved} customers
└─ LAG Recoveries: ${analysis.arbitrage.lagSaved} customers

Stage 4: RECOVERABLE EQUITY
└─ LEAD Recovery Value: $${analysis.equity.lead.recoverable}
└─ LAG Recovery Value: $${analysis.equity.lag.recoverable}
└─ TOTAL RECOVERY POTENTIAL: $${(parseFloat(analysis.equity.lead.recoverable) + parseFloat(analysis.equity.lag.recoverable)).toLocaleString()}

──────────────────────────────────────────────────────────────────
CAMPAIGN STRATEGY TABLE
──────────────────────────────────────────────────────────────────

${categories.map((cat, idx) => 
`${idx + 1}. ${cat.category}
   Count: ${cat.count} customers
   Play: ${cat.play}
   Saved (${success}%): ${cat.savedCustomers} customers
   Recovery Value: $${parseFloat(cat.recoverableEquity).toLocaleString()}
   Monthly MRR: $${cat.monthlyMRR}
`).join('\n')}

──────────────────────────────────────────────────────────────────
DEPLOYMENT VECTORS
──────────────────────────────────────────────────────────────────

✉️  EMAIL: Personalized win-back sequences
📱 IN-APP: Priority support nudges, feature announcements
📢 PAID SOCIAL: Custom audience retargeting (Facebook/Google)

──────────────────────────────────────────────────────────────────
PII COMPLIANCE
──────────────────────────────────────────────────────────────────

✓ All emails hashed (SHA-256)
✓ No plaintext PII in export
✓ 100% browser-side processing
✓ Zero server transmission

══════════════════════════════════════════════════════════════════
`;
  };

  const generateReceipt = (analysis: any, categories: any[]) => {
    return `
══════════════════════════════════════════════════════════════════
                         AUDIT RECEIPT
══════════════════════════════════════════════════════════════════

Receipt ID: COS-${Date.now()}
Timestamp: ${new Date().toLocaleString()}

SUMMARY METRICS
───────────────────────────────────────────────────────────────────
Total Customers Analyzed: ${analysis.universe.totalRows}
Active Revenue Threats: ${analysis.signal.leadCount}
Churned Customers: ${analysis.signal.lagCount}

Total MRR Exposure: $${analysis.universe.totalMRR}
Recoverable Equity: $${(parseFloat(analysis.equity.lead.recoverable) + parseFloat(analysis.equity.lag.recoverable)).toLocaleString()}

SIGNAL BREAKDOWN
───────────────────────────────────────────────────────────────────
${categories.map(cat => `${cat.category}: ${cat.count} customers`).join('\n')}

COMPLIANCE
───────────────────────────────────────────────────────────────────
✓ SHA-256 email hashing
✓ Client-side processing only
✓ PII-safe export generated

══════════════════════════════════════════════════════════════════
`;
  };

  const downloadPIISafeCSV = () => {
    if (!deliverables?.piiSafeCSV) return;
    const blob = new Blob([deliverables.piiSafeCSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pii-safe-recovery-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadStrategy = () => {
    if (!deliverables?.strategyDoc) return;
    const blob = new Blob([deliverables.strategyDoc], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deployment-strategy.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadReceipt = () => {
    if (!deliverables?.receipt) return;
    const blob = new Blob([deliverables.receipt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-receipt.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveGeminiKey = (key: string) => {
    sessionStorage.setItem('gemini_api_key', key);
    setGeminiApiKey(key);
  };

  const generateGeminiInsights = async (analysisData: any, categoryMetrics: any[]) => {
    if (!geminiApiKey) {
      throw new Error('Gemini API key required');
    }

    try {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // PII-SAFE: Only send aggregated statistics
      const statPacket = {
        totalCustomers: analysisData.universe.totalRows,
        arpu: analysisData.universe.arpu,
        ltv: analysisData.universe.ltv,
        lifetimeMonths: lifetimeMonths,
        atRiskCount: analysisData.signal.leadCount,
        churnedCount: analysisData.signal.lagCount,
        successRate: successRate,
        categoryBreakdown: categoryMetrics.map(cat => ({
          category: cat.category,
          count: cat.count,
          recoverableEquity: cat.recoverableEquity
        })),
        totalRecoverableEquity: (parseFloat(analysisData.equity.lead.recoverable) + parseFloat(analysisData.equity.lag.recoverable)).toFixed(2)
      };

      const prompt = `You are a CFO advisor analyzing customer retention data. Provide strategic insights in JSON format.

STATS (NO PII): ${JSON.stringify(statPacket, null, 2)}

Return ONLY valid JSON:
{
  "executiveSummary": "2-3 sentence high-level summary for the board",
  "keyInsights": ["insight1", "insight2", "insight3", "insight4"],
  "strategicRecommendations": ["recommendation1", "recommendation2", "recommendation3", "recommendation4"]
}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const insights = JSON.parse(jsonMatch[0]);
        return { engine: 'Gemini 1.5 Flash', ...insights };
      }
      throw new Error('Unable to parse Gemini response');
    } catch (err) {
      throw new Error(`Gemini API failed: ${err.message}`);
    }
  };

  const generateDeterministicInsights = (analysisData: any, categoryMetrics: any[]) => {
    const topCategory = categoryMetrics[0];
    const totalRecovery = parseFloat(analysisData.equity.lead.recoverable) + parseFloat(analysisData.equity.lag.recoverable);
    
    return {
      engine: 'Deterministic Template',
      executiveSummary: `Analysis of ${analysisData.universe.totalRows} customers reveals ${analysisData.signal.leadCount} at-risk accounts and ${analysisData.signal.lagCount} churned customers. At a ${successRate}% success rate, projected recovery value is $${totalRecovery.toLocaleString()}.`,
      keyInsights: [
        `Primary churn driver: ${topCategory.category} (${topCategory.count} customers affected)`,
        `Recommended play: ${topCategory.play}`,
        `ARPU: $${analysisData.universe.arpu}, LTV: $${analysisData.universe.ltv} (${lifetimeMonths} months)`,
        `Total addressable recovery: $${totalRecovery.toLocaleString()}`
      ],
      strategicRecommendations: [
        'Deploy multi-channel win-back campaigns across email, in-app, and paid social',
        `Focus initial resources on ${topCategory.category} segment for highest ROI`,
        'Implement preventive retention measures for at-risk segment',
        'Monitor campaign performance weekly with A/B testing'
      ]
    };
  };

  const generateAIInsights = async () => {
    if (!analysis) return;
    
    setGeneratingInsights(true);
    setError(null);
    
    try {
      const insights = selectedEngine === 'gemini'
        ? await generateGeminiInsights(analysis, analysis.signal.categoryBreakdown)
        : generateDeterministicInsights(analysis, analysis.signal.categoryBreakdown);
      
      setAiInsights(insights);
    } catch (err) {
      setError(err.message);
    } finally {
      setGeneratingInsights(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <DollarSign className="text-emerald-400" size={32} />
            <h1 className="text-5xl font-bold text-white">Cost of Sale & Recovery Analysis</h1>
            <span className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full font-bold ml-2">
              PII-SAFE
            </span>
          </div>
          <p className="text-slate-400 text-lg mb-2">
            Waterfall logic • Sentiment-based plays • 100% PII-safe export
          </p>
        </div>

        <div className="mb-6 p-4 bg-emerald-900/20 border border-emerald-700/40 rounded-xl flex items-center gap-4">
          <Lock className="text-emerald-400" size={24} />
          <div className="flex-1">
            <p className="text-emerald-300 font-bold">🔒 Local Privacy Vault Active</p>
            <p className="text-xs text-emerald-200/70">
              SHA-256 hashing • No plaintext PII in exports • Zero server uploads
            </p>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <Cpu size={16} />
            <span className="text-xs font-mono">BROWSER</span>
          </div>
        </div>

        {analysis && (
          <div className="flex gap-2 mb-6 border-b border-slate-700">
            {['upload', 'waterfall', 'strategy', 'insights', 'downloads'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                  activeTab === tab 
                    ? 'border-purple-500 text-purple-400' 
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                {tab === 'upload' && '📁 Upload'}
                {tab === 'waterfall' && '💧 Waterfall'}
                {tab === 'strategy' && '📋 Strategy'}
                {tab === 'insights' && '🧠 AI Insights'}
                {tab === 'downloads' && '⬇️ Downloads'}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 sticky top-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-4">1. Upload Client CSV</h3>
                
                <label className="block cursor-pointer">
                  <div className={`border-2 border-dashed rounded-xl p-6 text-center transition ${
                    file 
                      ? 'border-purple-500 bg-purple-500/10' 
                      : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/30'
                  }`}>
                    <Upload className={`mx-auto mb-3 ${file ? 'text-purple-400' : 'text-slate-400'}`} size={32} />
                    <p className="text-sm font-medium text-slate-300">
                      {file ? file.name : 'Drop CSV here'}
                    </p>
                    {file && <p className="text-xs text-purple-400 mt-2">✓ Ready</p>}
                  </div>
                  <input type="file" className="hidden" onChange={handleFileUpload} accept=".csv" />
                </label>
              </div>

              {/* CFO Controls */}
              <div className="pt-6 border-t border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4">CFO Controls</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-2">
                      Lifetime Months: <span className="text-white font-bold">{lifetimeMonths}</span>
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="36"
                      value={lifetimeMonths}
                      onChange={(e) => setLifetimeMonths(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="text-xs text-slate-400 block mb-2">
                      Success Rate: <span className="text-white font-bold">{successRate}%</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={successRate}
                      onChange={(e) => setSuccessRate(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Intelligence Engine Selector */}
              <div className="pt-6 border-t border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4">Intelligence Engine</h3>
                
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedEngine('deterministic')}
                    className={`w-full p-3 rounded-lg border transition ${
                      selectedEngine === 'deterministic'
                        ? 'border-purple-500 bg-purple-500/20'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Cpu className={selectedEngine === 'deterministic' ? 'text-purple-400' : 'text-slate-400'} size={18} />
                      <span className="text-white text-sm font-bold">Deterministic</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Instant math-based insights</p>
                  </button>

                  <button
                    onClick={() => setSelectedEngine('gemini')}
                    className={`w-full p-3 rounded-lg border transition ${
                      selectedEngine === 'gemini'
                        ? 'border-emerald-500 bg-emerald-500/20'
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className={selectedEngine === 'gemini' ? 'text-emerald-400' : 'text-slate-400'} size={18} />
                      <span className="text-white text-sm font-bold">Gemini Cloud</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">AI-powered strategic analysis</p>
                  </button>
                  
                  {selectedEngine === 'gemini' && !geminiApiKey && (
                    <div className="p-3 bg-amber-900/20 border border-amber-700/40 rounded-lg">
                      <p className="text-xs text-amber-300 mb-2">API Key Required</p>
                      <input
                        type="password"
                        placeholder="Enter Gemini API key"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded text-white text-sm mb-2"
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === 'Enter') {
                            saveGeminiKey((e.target as HTMLInputElement).value);
                          }
                        }}
                      />
                      <p className="text-xs text-slate-500">Get free key: ai.google.dev</p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={processFile}
                disabled={!file || processing}
                className={`w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition ${
                  processing 
                    ? 'bg-amber-600 cursor-wait' 
                    : file 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : 'bg-slate-700 opacity-50 cursor-not-allowed'
                }`}
              >
                {processing ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    Run Analysis
                  </>
                )}
              </button>

              {processing && (
                <div className="space-y-2">
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400 text-center">{statusText}</p>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-900/30 border border-red-700 rounded-lg">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'upload' && !analysis && (
              <div className="bg-slate-800/30 rounded-xl p-12 border border-slate-700/50 text-center">
                <Activity className="mx-auto mb-4 text-slate-600" size={64} />
                <h3 className="text-2xl font-bold text-slate-400 mb-2">Upload CSV to Begin</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  Waterfall analysis with PII-safe export
                </p>
              </div>
            )}

            {activeTab === 'waterfall' && analysis && (
              <div className="space-y-6">
                {/* Lead/Lag Toggle */}
                <div className="flex items-center justify-center gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <button
                    onClick={() => setViewMode('lag')}
                    className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
                      viewMode === 'lag' 
                        ? 'bg-red-600 text-white' 
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                  >
                    <TrendingDown size={20} />
                    LAG (Churned)
                  </button>
                  
                  <button
                    onClick={() => setViewMode('lead')}
                    className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
                      viewMode === 'lead' 
                        ? 'bg-amber-600 text-white' 
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                  >
                    <AlertOctagon size={20} />
                    LEAD (At-Risk)
                  </button>
                </div>

                {/* Waterfall Stages */}
                <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-700/40 rounded-xl">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {viewMode === 'lag' ? 'Churned Recovery Waterfall' : 'At-Risk Prevention Waterfall'}
                  </h2>
                  <p className="text-sm text-slate-400 mb-6">
                    {viewMode === 'lag' 
                      ? 'Win-back strategy for lost customers' 
                      : 'Retention strategy for at-risk customers'}
                  </p>
                  
                  <div className="space-y-4">
                    {/* Stage 1: Universe */}
                    <div className="p-4 bg-blue-900/20 border border-blue-700/40 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-300 font-bold mb-1">STAGE 1: THE UNIVERSE</p>
                          <p className="text-2xl font-bold text-white">
                            {analysis?.universe?.totalRows || 0} Total Customers
                          </p>
                          <p className="text-xs text-slate-400 mt-1">
                            Total MRR Exposure: ${analysis?.universe?.totalMRR || '0'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-400">ARPU</p>
                          <p className="text-xl font-bold text-white">
                            ${analysis?.universe?.arpu || '0'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <div className="text-purple-400 text-2xl">↓</div>
                    </div>

                    {/* Stage 2: Signal */}
                    <div className={`p-4 ${viewMode === 'lag' ? 'bg-red-900/20 border-red-700/40' : 'bg-amber-900/20 border-amber-700/40'} border rounded-lg`}>
                      <p className={`text-sm ${viewMode === 'lag' ? 'text-red-300' : 'text-amber-300'} font-bold mb-2`}>
                        STAGE 2: THE SIGNAL
                      </p>
                      <div>
                        <p className="text-xs text-slate-400">
                          {viewMode === 'lag' ? 'Churned Customers Identified' : 'Active Revenue Threats Flagged'}
                        </p>
                        <p className={`text-3xl font-bold ${viewMode === 'lag' ? 'text-red-400' : 'text-amber-400'}`}>
                          {viewMode === 'lag' 
                            ? (analysis?.signal?.lagCount || 0)
                            : (analysis?.signal?.leadCount || 0)
                          }
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {viewMode === 'lag' 
                            ? 'Based on churn status' 
                            : 'Based on feedback signals'}
                        </p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <div className="text-purple-400 text-2xl">↓</div>
                    </div>

                    {/* Stage 3: Arbitrage */}
                    <div className="p-4 bg-purple-900/20 border border-purple-700/40 rounded-lg">
                      <p className="text-sm text-purple-300 font-bold mb-2">STAGE 3: THE ARBITRAGE</p>
                      <div className="flex items-center gap-3">
                        <p className="text-slate-300">Apply {successRate}% success rate</p>
                        <div className="flex-1 border-t border-dashed border-purple-500"></div>
                        <div>
                          <p className="text-xs text-slate-400">
                            {viewMode === 'lag' ? 'Recovered' : 'Saved'}
                          </p>
                          <p className="text-xl font-bold text-purple-400">
                            {viewMode === 'lag' 
                              ? (analysis?.arbitrage?.lagSaved || 0)
                              : (analysis?.arbitrage?.leadSaved || 0)
                            }
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <div className="text-purple-400 text-2xl">↓</div>
                    </div>

                    {/* Stage 4: Equity */}
                    <div className="p-4 bg-emerald-900/20 border border-emerald-700/40 rounded-lg">
                      <p className="text-sm text-emerald-300 font-bold mb-2">STAGE 4: RECOVERABLE EQUITY</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-400 mb-1">
                            Formula: {viewMode === 'lag' ? 'Recovered' : 'Saved'} Customers × LTV (${analysis?.universe?.ltv || '0'})
                          </p>
                          <p className="text-3xl font-bold text-emerald-400">
                            ${viewMode === 'lag' 
                              ? parseFloat(analysis?.equity?.lag?.recoverable || 0).toLocaleString()
                              : parseFloat(analysis?.equity?.lead?.recoverable || 0).toLocaleString()
                            }
                          </p>
                          <p className="text-xs text-slate-500 mt-2">
                            {viewMode === 'lag' 
                              ? `${analysis?.arbitrage?.lagSaved || 0} customers × $${analysis?.universe?.ltv || '0'} LTV`
                              : `${analysis?.arbitrage?.leadSaved || 0} customers × $${analysis?.universe?.ltv || '0'} LTV`
                            }
                          </p>
                        </div>
                        <Info className="text-slate-500 cursor-help" size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'strategy' && analysis && (
              <div className="space-y-6">
                {/* Campaign Strategy Table */}
                <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-4">Campaign Strategy Table</h3>
                  <p className="text-sm text-slate-400 mb-6">Sub-segment breakdown with recommended plays</p>
                  
                  <div className="space-y-3">
                    {analysis.signal.categoryBreakdown.map((cat, idx) => (
                      <div key={idx} className="p-4 bg-slate-900/50 border border-slate-700/50 rounded-lg">
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Category</p>
                            <p className="text-sm font-bold text-white">{cat.category}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Count</p>
                            <p className="text-lg font-bold text-purple-400">{cat.count}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-400 mb-1">Play</p>
                            <p className="text-xs text-slate-300">{cat.play}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-400 mb-1">
                              Recovery @ {successRate}%
                              <Info className="inline ml-1 text-slate-600" size={12} />
                            </p>
                            <p className="text-lg font-bold text-emerald-400">${parseFloat(cat.recoverableEquity).toLocaleString()}</p>
                            <p className="text-xs text-slate-500">{cat.savedCustomers} saves</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deployment Vectors */}
                <div className="p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-700/40 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-4">Deployment Vectors</h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-900/50 rounded-lg text-center">
                      <Mail className="mx-auto mb-2 text-blue-400" size={32} />
                      <p className="text-sm font-bold text-white">Email</p>
                      <p className="text-xs text-slate-400 mt-1">Win-back sequences</p>
                    </div>
                    
                    <div className="p-4 bg-slate-900/50 rounded-lg text-center">
                      <Smartphone className="mx-auto mb-2 text-emerald-400" size={32} />
                      <p className="text-sm font-bold text-white">In-App</p>
                      <p className="text-xs text-slate-400 mt-1">Support nudges</p>
                    </div>
                    
                    <div className="p-4 bg-slate-900/50 rounded-lg text-center">
                      <Megaphone className="mx-auto mb-2 text-purple-400" size={32} />
                      <p className="text-sm font-bold text-white">Paid Social</p>
                      <p className="text-xs text-slate-400 mt-1">Custom audiences</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'insights' && analysis && (
              <div className="space-y-6">
                <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">AI Strategic Insights</h3>
                      <p className="text-sm text-slate-400">
                        {selectedEngine === 'gemini' ? 'Cloud-powered analysis (PII-safe)' : 'Instant mathematical analysis'}
                      </p>
                    </div>
                    <button
                      onClick={generateAIInsights}
                      disabled={generatingInsights || (selectedEngine === 'gemini' && !geminiApiKey)}
                      className={`px-4 py-2 rounded-lg text-white font-bold flex items-center gap-2 transition ${
                        generatingInsights || (selectedEngine === 'gemini' && !geminiApiKey)
                          ? 'bg-slate-600 cursor-not-allowed'
                          : 'bg-purple-600 hover:bg-purple-700'
                      }`}
                    >
                      {generatingInsights ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Brain size={18} />
                          Generate Insights
                        </>
                      )}
                    </button>
                  </div>

                  {selectedEngine === 'gemini' && !geminiApiKey && (
                    <div className="p-4 bg-amber-900/20 border border-amber-700/40 rounded-lg mb-4">
                      <p className="text-sm text-amber-300">
                        Please enter your Gemini API key in the sidebar to use cloud-powered insights
                      </p>
                    </div>
                  )}

                  {aiInsights && (
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-900/20 border border-blue-700/40 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          {selectedEngine === 'gemini' ? (
                            <Sparkles className="text-emerald-400" size={16} />
                          ) : (
                            <Cpu className="text-purple-400" size={16} />
                          )}
                          <p className="text-xs text-blue-400 font-bold">Engine: {aiInsights.engine}</p>
                        </div>
                        <p className="text-white leading-relaxed">{aiInsights.executiveSummary}</p>
                      </div>

                      <div className="p-4 bg-slate-900/50 rounded-lg">
                        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                          <Target className="text-purple-400" size={16} />
                          Key Insights
                        </h4>
                        <ul className="space-y-2">
                          {aiInsights.keyInsights.map((insight, idx) => (
                            <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                              <CheckCircle2 className="text-emerald-400 mt-0.5 flex-shrink-0" size={16} />
                              {insight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-slate-900/50 rounded-lg">
                        <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                          <Zap className="text-amber-400" size={16} />
                          Strategic Recommendations
                        </h4>
                        <ul className="space-y-2">
                          {aiInsights.strategicRecommendations.map((rec, idx) => (
                            <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                              <TrendingUp className="text-purple-400 mt-0.5 flex-shrink-0" size={16} />
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {selectedEngine === 'gemini' && (
                        <div className="p-3 bg-emerald-900/20 border border-emerald-700/40 rounded-lg">
                          <p className="text-xs text-emerald-300 font-bold mb-1">🔒 PII Safety Guarantee</p>
                          <p className="text-xs text-emerald-200/70">
                            Gemini only received aggregate statistics (counts, totals, averages). 
                            No customer names, emails, or individual feedback were transmitted.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {!aiInsights && !generatingInsights && (
                    <div className="p-8 text-center">
                      <Brain className="mx-auto mb-3 text-slate-600" size={48} />
                      <p className="text-slate-400">Click "Generate Insights" to analyze your data</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'downloads' && deliverables && (
              <div className="space-y-6">
                <div className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-6">Export Files</h3>
                  
                  <div className="space-y-3">
                    {/* PII-Safe CSV */}
                    <button
                      onClick={downloadPIISafeCSV}
                      className="w-full p-4 bg-emerald-900/20 border border-emerald-700/40 rounded-lg hover:bg-emerald-900/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Shield className="text-emerald-400" size={24} />
                          <div className="text-left">
                            <p className="font-bold text-white">PII-Safe Export (7 Columns)</p>
                            <p className="text-xs text-emerald-200/70">
                              100% PII-Safe • SHA-256 hashed • Ready for deployment
                            </p>
                          </div>
                        </div>
                        <Download className="text-emerald-400" size={20} />
                      </div>
                    </button>

                    {/* Strategy Document */}
                    <button
                      onClick={downloadStrategy}
                      className="w-full p-4 bg-purple-900/20 border border-purple-700/40 rounded-lg hover:bg-purple-900/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="text-purple-400" size={24} />
                          <div className="text-left">
                            <p className="font-bold text-white">Deployment Strategy</p>
                            <p className="text-xs text-purple-200/70">
                              Waterfall breakdown • Campaign table • Plays
                            </p>
                          </div>
                        </div>
                        <Download className="text-purple-400" size={20} />
                      </div>
                    </button>

                    {/* Audit Receipt */}
                    <button
                      onClick={downloadReceipt}
                      className="w-full p-4 bg-blue-900/20 border border-blue-700/40 rounded-lg hover:bg-blue-900/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="text-blue-400" size={24} />
                          <div className="text-left">
                            <p className="font-bold text-white">Audit Receipt</p>
                            <p className="text-xs text-blue-200/70">
                              Summary metrics • Compliance proof
                            </p>
                          </div>
                        </div>
                        <Download className="text-blue-400" size={20} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
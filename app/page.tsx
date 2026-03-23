<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DataUnlock — AI insights you can trust</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
  body { font-family: 'Inter', sans-serif; }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  .fade-in { animation: fadeInUp 0.9s cubic-bezier(0.16,1,0.3,1) both; }
  .d1{animation-delay:100ms}.d2{animation-delay:220ms}.d3{animation-delay:340ms}.d4{animation-delay:460ms}
</style>
</head>
<body class="bg-[#FAFAFB] text-gray-900 antialiased">

<!-- NAV -->
<nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur border-b border-gray-100">
  <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <!-- ORIGINAL LOGO: database icon, indigo rounded square -->
      <div class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>
      </div>
      <span class="font-bold text-xl tracking-tight">DataUnlock</span>
    </div>
    <button class="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold">Get in Touch</button>
  </div>
</nav>

<!-- HERO -->
<section class="pt-40 pb-24 px-6">
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-col items-center text-center">
      <span class="fade-in d1 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-indigo-50 border-indigo-100 text-indigo-700 mb-6">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1L2 4v3c0 3.3 2.2 6.4 4 7.1 1.8-.7 4-3.8 4-7.1V4L6 1z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>
        Privacy-First · Zero Data Risk
      </span>
      <h1 class="fade-in d2 text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 max-w-4xl leading-[1.1]">
        AI insights<br/><span class="text-indigo-600">you can trust.</span>
      </h1>
      <p class="fade-in d3 text-xl text-gray-500 mb-10 max-w-2xl leading-relaxed">
        We enable scaling companies to turn operational data into actionable decisions.
      </p>
      <div class="fade-in d4 flex flex-col sm:flex-row items-center gap-4">
        <button class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-2 shadow-xl shadow-indigo-100">
          Get in Touch
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M4 9h10M10 5l4 4-4 4" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <span class="text-sm font-medium text-gray-400">No data leaves your device</span>
      </div>
    </div>
  </div>
</section>

<!-- 4 STEPS -->
<section class="py-24 px-6 bg-white border-y border-gray-100">
  <div class="max-w-5xl mx-auto space-y-20">

    <!-- 01 — BAR CHART -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div>
        <div class="flex items-center gap-3 mb-2"><span class="text-indigo-600 font-mono font-bold tracking-tighter text-sm">/ 01</span><h2 class="text-2xl font-bold tracking-tight text-gray-900">See Your Business Clearly</h2></div>
        <p class="text-gray-500 max-w-md leading-relaxed">Drop in any spreadsheet or export and instantly see what's actually going on — clean charts, real trends, no jargon. It's your data, just finally readable.</p>
      </div>
      <div class="rounded-2xl border border-gray-200 overflow-hidden bg-white">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Revenue</p>
            <p class="text-sm font-bold text-gray-900">Performance Trend</p>
          </div>
          <span class="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">↑ +18.4%</span>
        </div>
        <div class="px-6 pt-5 pb-4">
          <!-- BAR CHART SVG -->
          <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" class="w-full">
            <!-- bars -->
            <rect x="10"  y="76" width="36" height="44" rx="4" fill="#E0E7FF"/>
            <rect x="62"  y="58" width="36" height="62" rx="4" fill="#E0E7FF"/>
            <rect x="114" y="68" width="36" height="52" rx="4" fill="#E0E7FF"/>
            <rect x="166" y="34" width="36" height="86" rx="4" fill="#E0E7FF"/>
            <rect x="218" y="48" width="36" height="72" rx="4" fill="#E0E7FF"/>
            <rect x="270" y="10" width="36" height="110" rx="4" fill="#4F46E5"/>
            <!-- month labels -->
            <text x="28"  y="116" text-anchor="middle" font-size="9" fill="#9CA3AF" font-family="Inter,sans-serif">J</text>
            <text x="80"  y="116" text-anchor="middle" font-size="9" fill="#9CA3AF" font-family="Inter,sans-serif">F</text>
            <text x="132" y="116" text-anchor="middle" font-size="9" fill="#9CA3AF" font-family="Inter,sans-serif">M</text>
            <text x="184" y="116" text-anchor="middle" font-size="9" fill="#9CA3AF" font-family="Inter,sans-serif">A</text>
            <text x="236" y="116" text-anchor="middle" font-size="9" fill="#9CA3AF" font-family="Inter,sans-serif">M</text>
            <text x="288" y="116" text-anchor="middle" font-size="9" fill="#4F46E5" font-family="Inter,sans-serif" font-weight="600">J</text>
          </svg>
          <!-- category breakdown -->
          <div class="mt-4 pt-4 border-t border-gray-100 space-y-2">
            <div class="flex items-center gap-2.5"><p class="text-[10px] text-gray-500 w-24 shrink-0">Subscriptions</p><div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden"><div class="h-full bg-indigo-600 rounded-full" style="width:68%"></div></div><p class="text-[10px] font-bold text-gray-600 w-7 text-right">68%</p></div>
            <div class="flex items-center gap-2.5"><p class="text-[10px] text-gray-500 w-24 shrink-0">One-off</p><div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden"><div class="h-full bg-indigo-300 rounded-full" style="width:21%"></div></div><p class="text-[10px] font-bold text-gray-600 w-7 text-right">21%</p></div>
            <div class="flex items-center gap-2.5"><p class="text-[10px] text-gray-500 w-24 shrink-0">Add-ons</p><div class="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden"><div class="h-full bg-indigo-100 rounded-full" style="width:11%"></div></div><p class="text-[10px] font-bold text-gray-600 w-7 text-right">11%</p></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 02 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div>
        <div class="flex items-center gap-3 mb-2"><span class="text-indigo-600 font-mono font-bold tracking-tighter text-sm">/ 02</span><h2 class="text-2xl font-bold tracking-tight text-gray-900">Understand What It Means</h2></div>
        <p class="text-gray-500 max-w-md leading-relaxed">Standard AI tools hallucinate, expose sensitive data, and produce outputs organisations can't trust or act on. DataUnlock fixes that. Every insight traces back to your data — no guesswork, fully auditable, EU AI Act ready.</p>
      </div>
      <div class="rounded-2xl border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50"><span class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">AI signal scan</span></div>
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white"><span class="text-sm text-gray-700">Churn concentration</span><span class="text-[11px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full border text-rose-700 bg-rose-50 border-rose-200">High</span></div>
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white"><span class="text-sm text-gray-700">Win-back opportunity</span><span class="text-[11px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full border text-amber-700 bg-amber-50 border-amber-200">Medium</span></div>
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white"><span class="text-sm text-gray-700">Loyalty cohort</span><span class="text-[11px] font-black uppercase tracking-wide px-2.5 py-1 rounded-full border text-emerald-700 bg-emerald-50 border-emerald-200">Low</span></div>
        <div class="px-6 py-4 bg-violet-50 border-t border-violet-100"><p class="text-[11px] text-violet-700 font-medium">Raw data never transmitted · anonymised summaries only</p></div>
      </div>
    </div>

    <!-- 03 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div>
        <div class="flex items-center gap-3 mb-2"><span class="text-indigo-600 font-mono font-bold tracking-tighter text-sm">/ 03</span><h2 class="text-2xl font-bold tracking-tight text-gray-900">Know Your Data Stayed Safe</h2></div>
        <p class="text-gray-500 max-w-md leading-relaxed">Every analysis generates a plain-English receipt showing exactly what was looked at and what was sent. Nothing hidden. Nothing assumed. Show it to your team, your board, or your auditor.</p>
      </div>
      <div class="rounded-2xl border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
          <span class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Privacy receipt</span>
          <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">✓ Verified</span>
        </div>
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white"><span class="text-sm text-gray-500">File loaded</span><span class="text-sm font-semibold text-gray-900">23,486 rows</span></div>
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white"><span class="text-sm text-gray-500">PII redacted</span><span class="text-sm font-semibold text-gray-900">100%</span></div>
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white"><span class="text-sm text-gray-500">Raw data sent</span><span class="text-sm font-semibold text-emerald-600">0 KB</span></div>
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white"><span class="text-sm text-gray-500">Summary sent</span><span class="text-sm font-semibold text-gray-900">1.2 KB</span></div>
        <div class="flex items-center justify-between px-6 py-4 bg-white"><span class="text-sm text-gray-500">Compliance</span><span class="text-sm font-semibold text-gray-400">EU AI Act · GDPR Art. 25</span></div>
      </div>
    </div>

    <!-- 04 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div>
        <div class="flex items-center gap-3 mb-2"><span class="text-indigo-600 font-mono font-bold tracking-tighter text-sm">/ 04</span><h2 class="text-2xl font-bold tracking-tight text-gray-900">Walk Away With a Plan</h2></div>
        <p class="text-gray-500 max-w-md leading-relaxed">You get a clear, prioritised 90-day roadmap — not a report full of charts nobody acts on. Every recommendation connects back to your own data, so you can stand behind every decision.</p>
      </div>
      <div class="rounded-2xl border border-gray-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50"><span class="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">90-day roadmap</span></div>
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-indigo-50">
          <div class="flex items-center gap-3"><div class="w-2 h-2 rounded-full bg-indigo-600 shrink-0"></div><div><p class="text-sm font-semibold text-indigo-900">Win-back Campaign</p><p class="text-[11px] text-gray-400">Phase 1 · Days 1–30</p></div></div>
          <span class="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-full shrink-0">Active</span>
        </div>
        <div class="flex items-center px-6 py-4 border-b border-gray-100 bg-white gap-3"><div class="w-2 h-2 rounded-full bg-gray-300 shrink-0"></div><div><p class="text-sm font-semibold text-gray-500">Pricing Adjustment</p><p class="text-[11px] text-gray-400">Phase 2 · Days 31–60</p></div></div>
        <div class="flex items-center px-6 py-4 bg-white gap-3"><div class="w-2 h-2 rounded-full bg-gray-300 shrink-0"></div><div><p class="text-sm font-semibold text-gray-500">Loyalty Programme</p><p class="text-[11px] text-gray-400">Phase 3 · Days 61–90</p></div></div>
      </div>
    </div>

  </div>
</section>

<!-- ZEUS -->
<section class="py-24 px-6 bg-black text-white relative overflow-hidden">
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
      <div class="lg:w-1/2">
        <div class="flex items-center gap-3 mb-8">
          <span class="text-[9px] font-black uppercase tracking-[0.25em] text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full">Success Case</span>
          <span class="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600">Zeus Scooters</span>
        </div>
        <h2 class="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.95]">Reducing <span class="text-indigo-500">Churn</span><br/>across Europe.</h2>
        <div class="p-7 bg-white/5 border border-white/10 rounded-2xl">
          <p class="text-xl md:text-2xl font-semibold leading-snug mb-6">"You've given me a step-by-step guide to reduce churn."</p>
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-indigo-600 rounded-full flex items-center justify-center font-black text-xs shrink-0">CK</div>
            <div><div class="font-black text-sm">Chris Kemp</div><div class="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Deputy CEO, Zeus Scooters</div></div>
          </div>
        </div>
      </div>
      <div class="lg:w-1/2 grid grid-cols-2 gap-3 w-full">
        <div class="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between"><div class="text-2xl mb-6">↑</div><div><div class="text-3xl md:text-4xl font-black mb-1.5">€900K</div><div class="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Annual Projected<br/>Revenue Recovery</div></div></div>
        <div class="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col justify-between"><div class="text-2xl mb-6">◎</div><div><div class="text-3xl md:text-4xl font-black mb-1.5">10K</div><div class="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-relaxed">Customers Targeted<br/>for Win-Back Q1</div></div></div>
        <div class="col-span-2 p-6 bg-indigo-600 rounded-2xl flex items-center justify-between"><div><div class="text-xl md:text-2xl font-black mb-1">Strategy Delivered</div><div class="text-[9px] font-bold opacity-75 uppercase tracking-widest">Full roadmap · European retention</div></div><div class="text-right shrink-0 ml-4"><div class="text-5xl md:text-6xl font-black leading-none">&lt;7</div><div class="text-[9px] font-black uppercase tracking-widest opacity-80 mt-1">Days</div></div></div>
      </div>
    </div>
  </div>
  <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
</section>

<!-- CTA -->
<section class="py-32 px-6">
  <div class="max-w-4xl mx-auto text-center">
    <div class="inline-flex p-3 bg-indigo-600 rounded-2xl text-white mb-8 shadow-lg shadow-indigo-200">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    </div>
    <h2 class="text-4xl md:text-5xl font-bold tracking-tight mb-6">Ready to unlock your own data?</h2>
    <p class="text-xl text-gray-500 mb-10">Join the scaling companies using DataUnlock to drive strategy without risking their most sensitive operational assets.</p>
    <button class="bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-gray-200">Talk to Strategy Lead</button>
  </div>
</section>

<!-- FOOTER -->
<footer class="py-12 px-6 border-t border-gray-100 bg-white">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
    <div class="flex items-center gap-2">
      <div class="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>
      </div>
      <span class="font-bold tracking-tight">DataUnlock</span>
    </div>
    <div class="text-sm text-gray-400">© 2026 DataUnlock. Built for high-trust governance.</div>
  </div>
</footer>

</body>
</html>
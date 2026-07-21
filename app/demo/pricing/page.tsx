'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Building2,
  TrendingUp,
  AlertTriangle,
  Store,
  ChevronDown,
  ChevronRight,
  Filter,
  Layers,
  Target,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// --- DATA TYPES & TYPESCRIPT INTERFACES ---
export interface Product {
  barcode: string;
  name: string;
  category: string;
  brand: string;
  size: string;
  standardCost: number;
}

export interface StoreSale {
  storeId: string;
  storeName: string;
  format: 'Convenience' | 'Supermarket' | 'Forecourt';
  region: string;
  quantitySold: number;
  unitPrice: number;
}

// --- MOCK IRISH FMCG DATASET ---
const IRISH_PRODUCTS: Product[] = [
  { barcode: '501010000001', name: "Barry's Tea Gold Blend 80s", category: 'Tea & Coffee', brand: "Barry's", size: '250g', standardCost: 2.80 },
  { barcode: '501010000002', name: 'Tayto Cheese & Onion 6-Pack', category: 'Snacks & Crisps', brand: 'Tayto', size: '150g', standardCost: 1.95 },
  { barcode: '501010000003', name: 'Avonmore Fresh Milk 2L', category: 'Dairy & Chilled', brand: 'Avonmore', size: '2L', standardCost: 1.60 },
  { barcode: '501010000004', name: 'Kerrygold Salted Butter 450g', category: 'Dairy & Chilled', brand: 'Kerrygold', size: '450g', standardCost: 2.90 },
  { barcode: '501010000005', name: "Brennan's Family Pan 800g", category: 'Bakery', brand: "Brennan's", size: '800g', standardCost: 1.20 },
  { barcode: '501010000006', name: 'Guinness Draught 4x440ml Can', category: 'BWS', brand: 'Guinness', size: '1.76L', standardCost: 5.50 },
  { barcode: '501010000007', name: 'Denny Gold Medal Sausages 227g', category: 'Meat & Poultry', brand: 'Denny', size: '227g', standardCost: 1.75 },
  { barcode: '501010000008', name: 'Cadbury Dairy Milk 110g', category: 'Confectionery', brand: 'Cadbury', size: '110g', standardCost: 1.10 },
  { barcode: '501010000009', name: 'Ballygowan Still Water 1.5L', category: 'Soft Drinks', brand: 'Ballygowan', size: '1.5L', standardCost: 0.65 },
  { barcode: '501010000010', name: 'Club Orange 2L Bottle', category: 'Soft Drinks', brand: 'Club', size: '2L', standardCost: 1.50 },
];

const STORE_FORMATS = ['All Formats', 'Convenience', 'Supermarket', 'Forecourt'] as const;

// Generate realistic store sales data across 47 Irish stores
const generateStoreSalesData = (products: Product[]): { sales: Record<string, StoreSale[]>; stores: { id: string; name: string }[] } => {
  const sales: Record<string, StoreSale[]> = {};
  const storeListMaster: { id: string; name: string }[] = [];

  for (let i = 1; i <= 47; i++) {
    const region = i <= 18 ? 'Dublin' : i <= 32 ? 'Rest of Leinster' : 'Munster/Connacht';
    storeListMaster.push({ id: `IE-ST-${1000 + i}`, name: `Store #${1000 + i} (${region})` });
  }
  
  products.forEach((product) => {
    const storeList: StoreSale[] = [];

    for (let i = 1; i <= 47; i++) {
      const format: 'Convenience' | 'Supermarket' | 'Forecourt' = 
        i % 3 === 0 ? 'Convenience' : i % 5 === 0 ? 'Forecourt' : 'Supermarket';
      
      const region = i <= 18 ? 'Dublin' : i <= 32 ? 'Rest of Leinster' : 'Munster/Connacht';
      
      const baseMarkup = format === 'Forecourt' ? 1.45 : format === 'Convenience' ? 1.35 : 1.25;
      const randomVariance = 0.85 + Math.random() * 0.35;
      const unitPrice = parseFloat((product.standardCost * baseMarkup * randomVariance).toFixed(2));
      const quantitySold = Math.floor(Math.random() * 450) + 50;

      storeList.push({
        storeId: `IE-ST-${1000 + i}`,
        storeName: `Store #${1000 + i} (${region})`,
        format,
        region,
        quantitySold,
        unitPrice,
      });
    }

    sales[product.barcode] = storeList;
  });

  return { sales, stores: storeListMaster };
};

const MOCK_DATA = generateStoreSalesData(IRISH_PRODUCTS);
const MOCK_SALES_DATA = MOCK_DATA.sales;
const STORE_LIST = MOCK_DATA.stores;

export default function PricingIntelligenceSuite() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All Formats');
  const [targetStoreId, setTargetStoreId] = useState<string>('IE-ST-1004'); // Default Store
  const [activeTab, setActiveTab] = useState<'overpriced' | 'underpriced'>('underpriced');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // --- TARGET STORE VS COHORT WAP ENGINE ---
  const analysisData = useMemo(() => {
    return IRISH_PRODUCTS.map((product) => {
      let sales = MOCK_SALES_DATA[product.barcode] || [];

      if (selectedFormat !== 'All Formats') {
        sales = sales.filter((s) => s.format === selectedFormat);
      }

      const totalVolume = sales.reduce((sum, s) => sum + s.quantitySold, 0);
      const totalRevenue = sales.reduce((sum, s) => sum + s.unitPrice * s.quantitySold, 0);
      const weightedAveragePrice = totalVolume > 0 ? totalRevenue / totalVolume : 0;

      const prices = sales.map((s) => s.unitPrice);
      const minPrice = prices.length ? Math.min(...prices) : 0;
      const maxPrice = prices.length ? Math.max(...prices) : 0;
      const pricingSpreadPct = minPrice > 0 ? ((maxPrice - minPrice) / minPrice) * 100 : 0;

      // Target Store specific metrics
      const targetStoreData = sales.find((s) => s.storeId === targetStoreId);
      const targetPrice = targetStoreData ? targetStoreData.unitPrice : 0;
      const targetQty = targetStoreData ? targetStoreData.quantitySold : 0;
      const priceGap = targetPrice - weightedAveragePrice; // Positive = Overpriced, Negative = Underpriced

      // Precise Business Opportunity: (Cohort WAP - My Price) * My Qty
      const targetRevenueGain =
        targetPrice < weightedAveragePrice && targetPrice > 0
          ? (weightedAveragePrice - targetPrice) * targetQty
          : 0;

      return {
        product,
        totalVolume,
        weightedAveragePrice,
        minPrice,
        maxPrice,
        pricingSpreadPct,
        targetPrice,
        targetQty,
        priceGap,
        targetRevenueGain,
      };
    });
  }, [selectedFormat, targetStoreId]);

  // Filtered dataset based on search & category
  const filteredAnalysis = useMemo(() => {
    return analysisData.filter((item) => {
      const matchesSearch =
        item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product.barcode.includes(searchTerm) ||
        item.product.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [analysisData, searchTerm, selectedCategory]);

  // Split into Overpriced vs Underpriced Cohorts relative to Target Store
  const overpricedItems = useMemo(() => {
    return [...filteredAnalysis]
      .filter((i) => i.priceGap > 0)
      .sort((a, b) => b.priceGap - a.priceGap);
  }, [filteredAnalysis]);

  const underpricedItems = useMemo(() => {
    return [...filteredAnalysis]
      .filter((i) => i.targetRevenueGain > 0)
      .sort((a, b) => b.targetRevenueGain - a.targetRevenueGain);
  }, [filteredAnalysis]);

  // High-level Executive KPIs for Target Store
  const totalStoreOpportunity = useMemo(() => {
    return analysisData.reduce((sum, i) => sum + i.targetRevenueGain, 0);
  }, [analysisData]);

  // Breakdown Donut Chart Data (Target Store Pricing Posture)
  const pricePostureData = useMemo(() => {
    let under = 0;
    let aligned = 0;
    let over = 0;

    analysisData.forEach((item) => {
      if (item.priceGap < -0.05) under++;
      else if (item.priceGap > 0.05) over++;
      else aligned++;
    });

    return [
      { name: 'Underpriced (Opportunity)', value: under, color: '#10B981' },
      { name: 'Cohort Aligned', value: aligned, color: '#3B82F6' },
      { name: 'Overpriced (Risk)', value: over, color: '#F43F5E' },
    ];
  }, [analysisData]);

  const categories = ['All', ...Array.from(new Set(IRISH_PRODUCTS.map((p) => p.category)))];
  const selectedStoreObj = STORE_LIST.find((s) => s.id === targetStoreId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2">
              ARES Enterprise Intelligence
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Retail Pricing & Margin Matrix
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Quantity-Weighted Average Price (WAP) cohort benchmarking relative to target location.
            </p>
          </div>

          {/* TARGET STORE SELECTOR CONTROL */}
          <div className="flex items-center gap-3">
            <div className="bg-white p-2.5 rounded-2xl border border-emerald-300 shadow-sm flex items-center gap-3 ring-2 ring-emerald-500/10">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Selected Target Store
                </label>
                <select
                  value={targetStoreId}
                  onChange={(e) => setTargetStoreId(e.target.value)}
                  className="bg-transparent text-sm font-bold text-slate-800 focus:outline-none cursor-pointer"
                >
                  {STORE_LIST.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* TOP EXECUTIVE KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  Store Opportunity Gain
                </p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-2">
                  €{totalStoreOpportunity.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
              </div>
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Re-alignment of {selectedStoreObj?.name} to WAP</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Top Opportunity SKU</p>
                <h3 className="text-lg font-bold text-slate-900 mt-2 truncate max-w-[180px]">
                  {underpricedItems[0]?.product.name || 'N/A'}
                </h3>
              </div>
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Layers className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-3">
              +€{underpricedItems[0]?.targetRevenueGain.toFixed(2) || '0.00'} potential lift
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Price Variance</p>
                <h3 className="text-2xl font-bold text-amber-600 mt-2">
                  {(
                    analysisData.reduce((acc, i) => acc + i.pricingSpreadPct, 0) / (analysisData.length || 1)
                  ).toFixed(1)}
                  %
                </h3>
              </div>
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <AlertTriangle className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Cohort spread across 47 locations</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Cohort Format</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{selectedFormat}</h3>
              </div>
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Filtered store grouping</p>
          </div>
        </div>

        {/* PRICING POSTURE BREAKDOWN (VISUAL DONUT CHART) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-base font-bold text-slate-900">
              Pricing Posture: {selectedStoreObj?.name}
            </h3>
            <p className="text-xs text-slate-500 max-w-md">
              Positioning of items at this location relative to the 47-store Quantity-Weighted Average Price (WAP).
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-28 h-28">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pricePostureData}
                    innerRadius={25}
                    outerRadius={42}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pricePostureData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-xs">
              {pricePostureData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="font-medium text-slate-700">{item.name}:</span>
                  <span className="font-bold text-slate-900">{item.value} SKUs</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CONTROLS & FILTER BAR */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search FMCG product, barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {STORE_FORMATS.map((fmt) => (
                <option key={fmt} value={fmt}>
                  {fmt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TAB MATRIX & TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex border-b border-slate-200 bg-slate-50/50 p-2 gap-2">
            <button
              onClick={() => setActiveTab('underpriced')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'underpriced'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Top 10 Revenue Opportunities ({underpricedItems.length})
            </button>
            <button
              onClick={() => setActiveTab('overpriced')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'overpriced'
                  ? 'bg-white text-rose-700 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Overpriced Risks ({overpricedItems.length})
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Product / SKU</th>
                  <th className="py-3.5 px-4 text-right">Target Price (€)</th>
                  <th className="py-3.5 px-4 text-right">Cohort WAP (€)</th>
                  <th className="py-3.5 px-4 text-right">Price Gap (€)</th>
                  <th className="py-3.5 px-4 text-right">Target Store Sales</th>
                  <th className="py-3.5 px-4 text-right">Opportunity (€)</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(activeTab === 'underpriced' ? underpricedItems : overpricedItems).map((row) => {
                  const isExpanded = expandedRow === row.product.barcode;
                  return (
                    <React.Fragment key={row.product.barcode}>
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-slate-900">
                          <div>{row.product.name}</div>
                          <div className="text-xs text-slate-400">{row.product.barcode}</div>
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                          €{row.targetPrice.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4 text-right font-semibold text-slate-500">
                          €{row.weightedAveragePrice.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                              row.priceGap < 0
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-rose-50 text-rose-700'
                            }`}
                          >
                            {row.priceGap < 0 ? '' : '+'}€{row.priceGap.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right text-slate-700 font-medium">
                          {row.targetQty} units
                        </td>
                        <td className="py-3.5 px-4 text-right font-extrabold text-emerald-600">
                          €{row.targetRevenueGain.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => setExpandedRow(isExpanded ? null : row.product.barcode)}
                            className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                          >
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </button>
                        </td>
                      </tr>

                      {/* DRILLDOWN STORE COMPARISON ROW */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={7} className="bg-slate-50/60 p-6 border-y border-slate-200">
                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-slate-900 text-sm">
                                  Cohort Pricing Distribution across 47 Stores: {row.product.name}
                                </h4>
                                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                                  Target Store WAP Gap: €{Math.abs(row.priceGap).toFixed(2)}
                                </span>
                              </div>
                              
                              <div className="h-48 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={MOCK_SALES_DATA[row.product.barcode] || []}>
                                    <XAxis dataKey="storeId" tick={{ fontSize: 10 }} />
                                    <YAxis tick={{ fontSize: 10 }} unit="€" />
                                    <Tooltip formatter={(val: number) => [`€${val.toFixed(2)}`, 'Unit Price']} />
                                    <Bar dataKey="unitPrice" radius={[4, 4, 0, 0]}>
                                      {(MOCK_SALES_DATA[row.product.barcode] || []).map((entry) => (
                                        <Cell
                                          key={entry.storeId}
                                          fill={entry.storeId === targetStoreId ? '#10B981' : '#CBD5E1'}
                                        />
                                      ))}
                                    </Bar>
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
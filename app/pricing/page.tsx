'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Building2,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Euro,
  Store,
  ChevronDown,
  ChevronRight,
  Filter,
  Layers,
} from 'lucide-react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
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

export interface ProductPricingAnalysis {
  product: Product;
  totalVolume: number;
  weightedAveragePrice: number; // WAP across all stores
  minPrice: number;
  maxPrice: number;
  pricingSpreadPct: number;
  storesAboveWapCount: number;
  storesBelowWapCount: number;
  potentialRevenueGain: number; // Opportunity if priced at cohort WAP
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
const generateStoreSalesData = (products: Product[]): Record<string, StoreSale[]> => {
  const sales: Record<string, StoreSale[]> = {};
  
  products.forEach((product) => {
    const storeList: StoreSale[] = [];
    const storeCount = 47;

    for (let i = 1; i <= storeCount; i++) {
      const format: 'Convenience' | 'Supermarket' | 'Forecourt' = 
        i % 3 === 0 ? 'Convenience' : i % 5 === 0 ? 'Forecourt' : 'Supermarket';
      
      const region = i <= 18 ? 'Dublin' : i <= 32 ? 'Rest of Leinster' : 'Munster/Connacht';
      
      // Base pricing variations
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

  return sales;
};

const MOCK_SALES_DATA = generateStoreSalesData(IRISH_PRODUCTS);

export default function PricingIntelligenceSuite() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All Formats');
  const [activeTab, setActiveTab] = useState<'overpriced' | 'underpriced'>('overpriced');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // --- WAP & COHORT PRICING ENGINE ---
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

      const storesAboveWapCount = sales.filter((s) => s.unitPrice > weightedAveragePrice).length;
      const storesBelowWapCount = sales.filter((s) => s.unitPrice < weightedAveragePrice).length;

      // Potential gain if underpriced stores are realigned to cohort WAP
      const potentialRevenueGain = sales.reduce((acc, s) => {
        if (s.unitPrice < weightedAveragePrice) {
          return acc + (weightedAveragePrice - s.unitPrice) * s.quantitySold;
        }
        return acc;
      }, 0);

      return {
        product,
        totalVolume,
        weightedAveragePrice,
        minPrice,
        maxPrice,
        pricingSpreadPct,
        storesAboveWapCount,
        storesBelowWapCount,
        potentialRevenueGain,
      };
    });
  }, [selectedFormat]);

  // Filtered dataset based on user controls
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

  // Split into Overpriced vs Underpriced Cohorts
  const overpricedItems = useMemo(() => {
    return [...filteredAnalysis].sort((a, b) => b.storesAboveWapCount - a.storesAboveWapCount);
  }, [filteredAnalysis]);

  const underpricedItems = useMemo(() => {
    return [...filteredAnalysis].sort((a, b) => b.potentialRevenueGain - a.potentialRevenueGain);
  }, [filteredAnalysis]);

  // High-level Executive KPIs
  const totalOpportunityGain = useMemo(() => {
    return analysisData.reduce((sum, i) => sum + i.potentialRevenueGain, 0);
  }, [analysisData]);

  const categories = ['All', ...Array.from(new Set(IRISH_PRODUCTS.map((p) => p.category)))];

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
              Quantity-Weighted Average Price (WAP) cohort analysis across 47 store locations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
              <Store className="w-5 h-5 text-slate-400" />
              <div className="text-xs">
                <span className="text-slate-400 block font-medium">Active Cohort</span>
                <span className="font-semibold text-slate-800">47 Stores (Ireland)</span>
              </div>
            </div>
          </div>
        </div>

        {/* TOP EXECUTIVE KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Identified Margin Opportunity</p>
                <h3 className="text-2xl font-bold text-emerald-600 mt-2">
                  €{totalOpportunityGain.toLocaleString('en-IE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
              </div>
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Re-alignment of underpriced items to WAP</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">SKUs Analyzed</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{analysisData.length} SKUs</h3>
              </div>
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Layers className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Across 10 core retail categories</p>
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
            <p className="text-xs text-slate-400 mt-3">Max-to-min price spread within cohort</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Format Filter</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-2">{selectedFormat}</h3>
              </div>
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-3">Store structural grouping</p>
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
            {/* Category Filter */}
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

            {/* Store Format Filter */}
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
          {/* Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50/50 p-2 gap-2">
            <button
              onClick={() => setActiveTab('overpriced')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'overpriced'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Overpriced Gaps (Risk)
            </button>
            <button
              onClick={() => setActiveTab('underpriced')}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'underpriced'
                  ? 'bg-white text-emerald-700 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Underpriced Opportunities (Gain)
            </button>
          </div>

          {/* Table View */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Product / SKU</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-right">Weighted Avg (€)</th>
                  <th className="py-3.5 px-4 text-right">Min Price (€)</th>
                  <th className="py-3.5 px-4 text-right">Max Price (€)</th>
                  <th className="py-3.5 px-4 text-center">Spread</th>
                  <th className="py-3.5 px-4 text-right">Opp. Gain (€)</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(activeTab === 'overpriced' ? overpricedItems : underpricedItems).map((row) => {
                  const isExpanded = expandedRow === row.product.barcode;
                  return (
                    <React.Fragment key={row.product.barcode}>
                      <tr className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-slate-900">
                          <div>{row.product.name}</div>
                          <div className="text-xs text-slate-400">{row.product.barcode}</div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">{row.product.category}</td>
                        <td className="py-3.5 px-4 text-right font-semibold text-slate-800">
                          €{row.weightedAveragePrice.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4 text-right text-emerald-600">
                          €{row.minPrice.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4 text-right text-rose-600">
                          €{row.maxPrice.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700">
                            +{row.pricingSpreadPct.toFixed(0)}%
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-emerald-600">
                          €{row.potentialRevenueGain.toFixed(2)}
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

                      {/* EXPANDED DRILLDOWN ROW */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={8} className="bg-slate-50/60 p-6 border-y border-slate-200">
                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                              <h4 className="font-semibold text-slate-900 text-sm">
                                Store-Level Distribution: {row.product.name}
                              </h4>
                              
                              <div className="h-48 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={MOCK_SALES_DATA[row.product.barcode] || []}>
                                    <XAxis dataKey="storeId" tick={{ fontSize: 10 }} />
                                    <YAxis tick={{ fontSize: 10 }} unit="€" />
                                    <Tooltip formatter={(val: number) => [`€${val.toFixed(2)}`, 'Unit Price']} />
                                    <Bar dataKey="unitPrice" fill="#10B981" radius={[4, 4, 0, 0]} />
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
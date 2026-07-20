"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Database,
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  UserCheck,
  AlertTriangle,
  Search,
  Sliders,
  DollarSign,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle,
  HelpCircle,
  Plus,
  RefreshCw
} from 'lucide-react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  AreaChart,
  Area,
  CartesianGrid,
  Cell
} from 'recharts';

// ---------------------------------------------------------------------------
// SEEDED PSEUDO-RANDOM — stable across renders
// ---------------------------------------------------------------------------
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
type Geography = 'North' | 'South' | 'East' | 'West';
type Format = 'Express' | 'Superstore' | 'Gas Station';

interface Store {
  id: string;
  name: string;
  geography: Geography;
  format: Format;
}

interface Product {
  barcode: string;
  name: string;
  category: string;
  basePrice: number;
  marginRate: number;
}

interface Sale {
  storeId: string;
  barcode: string;
  price: number;
  qty: number;
  isPromo: boolean;
}

interface Anomaly {
  name: string;
  refundRate: number;
  voidRate: number;
  cancellations: number;
  score: number;
}

interface Cashier {
  name: string;
  salesPerHour: number;
  avgBasket: number;
  itemsPerBasket: number;
}

// ---------------------------------------------------------------------------
// STATIC SEED DATA
// ---------------------------------------------------------------------------
const GEOGRAPHIES: Geography[] = ['North', 'South', 'East', 'West'];
const FORMATS: Format[] = ['Express', 'Superstore', 'Gas Station'];

const PRODUCTS_RAW: { name: string; category: string; minP: number; maxP: number; margin: number }[] = [
  { name: 'Organic Bananas 1kg', category: 'Produce', minP: 1.2, maxP: 3.5, margin: 0.42 },
  { name: 'Fuji Apples Bag 2kg', category: 'Produce', minP: 2.0, maxP: 5.0, margin: 0.39 },
  { name: 'English Cucumbers', category: 'Produce', minP: 0.8, maxP: 2.5, margin: 0.40 },
  { name: 'Roma Tomatoes 1kg', category: 'Produce', minP: 1.5, maxP: 4.0, margin: 0.37 },
  { name: 'Baby Spinach 250g', category: 'Produce', minP: 2.2, maxP: 4.5, margin: 0.44 },
  { name: 'Premium Cola 12-Pack', category: 'Beverages', minP: 5.5, maxP: 14.0, margin: 0.30 },
  { name: 'Energy Drink 250ml', category: 'Beverages', minP: 1.2, maxP: 3.5, margin: 0.34 },
  { name: 'Sparkling Water 6-Pack', category: 'Beverages', minP: 2.0, maxP: 5.5, margin: 0.27 },
  { name: 'Organic OJ 1.5L', category: 'Beverages', minP: 3.5, maxP: 7.5, margin: 0.31 },
  { name: 'Craft IPA Beer 6-Pack', category: 'Beverages', minP: 8.0, maxP: 15.0, margin: 0.28 },
  { name: 'Whole Wheat Sourdough', category: 'Bakery', minP: 2.5, maxP: 5.5, margin: 0.50 },
  { name: 'Butter Croissants 4-Pack', category: 'Bakery', minP: 2.0, maxP: 4.5, margin: 0.52 },
  { name: 'Chocolate Chip Muffins', category: 'Bakery', minP: 2.5, maxP: 5.0, margin: 0.48 },
  { name: 'Brioche Burger Buns 8ct', category: 'Bakery', minP: 2.0, maxP: 4.0, margin: 0.46 },
  { name: 'ARES Whole Milk 1L', category: 'Dairy', minP: 1.2, maxP: 2.8, margin: 0.18 },
  { name: 'Greek Yogurt Plain 1kg', category: 'Dairy', minP: 3.0, maxP: 7.0, margin: 0.22 },
  { name: 'Salted Butter 250g', category: 'Dairy', minP: 2.5, maxP: 5.5, margin: 0.19 },
  { name: 'Cheddar Cheese Block 400g', category: 'Dairy', minP: 4.0, maxP: 9.0, margin: 0.21 },
  { name: 'Organic Large Eggs 12ct', category: 'Dairy', minP: 3.5, maxP: 7.5, margin: 0.20 },
  { name: 'Kettle Cooked Sea Salt Chips', category: 'Snacks', minP: 1.5, maxP: 5.0, margin: 0.38 },
  { name: 'Roasted Salted Almonds 200g', category: 'Snacks', minP: 3.5, maxP: 8.0, margin: 0.41 },
  { name: 'Organic Fruit Strips 5-Pack', category: 'Snacks', minP: 2.5, maxP: 5.5, margin: 0.43 },
  { name: 'White Cheddar Popcorn', category: 'Snacks', minP: 1.5, maxP: 4.0, margin: 0.36 },
  { name: 'Gummy Bears Party Pack', category: 'Snacks', minP: 2.0, maxP: 5.0, margin: 0.39 },
  { name: 'Extra Virgin Olive Oil 750ml', category: 'Pantry', minP: 6.0, maxP: 18.0, margin: 0.25 },
  { name: 'Organic Quinoa 1kg', category: 'Pantry', minP: 4.5, maxP: 10.0, margin: 0.28 },
  { name: 'Marinara Pasta Sauce 680ml', category: 'Pantry', minP: 2.5, maxP: 6.0, margin: 0.29 },
  { name: 'Basmati Rice 5kg', category: 'Pantry', minP: 8.0, maxP: 18.0, margin: 0.22 },
  { name: 'Premium Ground Coffee 340g', category: 'Pantry', minP: 8.0, maxP: 22.0, margin: 0.34 },
  { name: 'Fresh Ribeye Steak 400g', category: 'Meat', minP: 12.0, maxP: 28.0, margin: 0.18 },
  { name: 'Free-Range Chicken Breasts', category: 'Meat', minP: 6.0, maxP: 14.0, margin: 0.20 },
  { name: 'Lean Ground Beef 93% 500g', category: 'Meat', minP: 7.0, maxP: 15.0, margin: 0.17 },
  { name: 'Smoked Bacon Pack 400g', category: 'Meat', minP: 4.5, maxP: 10.0, margin: 0.16 },
  { name: 'Atlantic Salmon Fillet 300g', category: 'Meat', minP: 8.0, maxP: 20.0, margin: 0.22 },
  { name: 'USB-C Fast Charger 65W', category: 'Electronics', minP: 12.0, maxP: 40.0, margin: 0.14 },
  { name: 'Bluetooth Earbuds Pro', category: 'Electronics', minP: 25.0, maxP: 80.0, margin: 0.16 },
  { name: 'AAA Batteries 12-Pack', category: 'Electronics', minP: 5.0, maxP: 12.0, margin: 0.17 },
  { name: 'Portable Power Bank 10000mAh', category: 'Electronics', minP: 18.0, maxP: 55.0, margin: 0.12 },
  { name: 'Phone Screen Protector', category: 'Electronics', minP: 8.0, maxP: 22.0, margin: 0.13 },
];

const STAFF_NAMES = [
  'Liam Miller', 'Noah Davis', 'Oliver Rodriguez', 'Elijah Wilson',
  'James Thomas', 'William Anderson', 'Sophia Garcia', 'Mia Martinez',
  'Charlotte Jackson', 'Amelia Lee', 'Harper White', 'Evelyn Brown',
];

// ---------------------------------------------------------------------------
// DATA GENERATION
// ---------------------------------------------------------------------------

function generateProducts(): Product[] {
  return PRODUCTS_RAW.map((p, i) => ({
    barcode: `880123456${(i + 1).toString().padStart(3, '0')}`,
    name: p.name,
    category: p.category,
    basePrice: p.minP + sr(i * 31 + 7) * (p.maxP - p.minP),
    marginRate: p.margin,
  }));
}

function generateStores(): Store[] {
  const list: Store[] = [];
  for (let i = 1; i <= 47; i++) {
    list.push({
      id: `store-${i}`,
      name: `ARES ${FORMATS[Math.floor(sr(i * 47) * FORMATS.length)]} #${i}`,
      geography: GEOGRAPHIES[Math.floor(sr(i * 13 + 3) * GEOGRAPHIES.length)],
      format: FORMATS[Math.floor(sr(i * 47) * FORMATS.length)],
    });
  }
  return list;
}

function generateSales(
  stores: Store[],
  products: Product[],
  injected: Record<string, Record<string, { price: number; qty: number }>>
): Record<string, Record<string, Sale>> {
  const map: Record<string, Record<string, Sale>> = {};
  stores.forEach((store, si) => {
    map[store.id] = {};
    products.forEach((product, pi) => {
      const inj = injected[store.id]?.[product.barcode];
      if (inj) {
        map[store.id][product.barcode] = {
          storeId: store.id, barcode: product.barcode,
          price: inj.price, qty: inj.qty, isPromo: false,
        };
        return;
      }

      const seed = si * 1000 + pi;
      const stocks = sr(seed + 1) > 0.16;
      if (!stocks) {
        map[store.id][product.barcode] = { storeId: store.id, barcode: product.barcode, price: 0, qty: 0, isPromo: false };
        return;
      }

      const isPromo = sr(seed + 5) < 0.11;
      const priceDev = -0.12 + sr(seed + 2) * 0.24;
      let price = product.basePrice * (1 + priceDev) * (isPromo ? 0.82 : 1);

      let baseQty = 100;
      if (['Produce', 'Beverages', 'Bakery'].includes(product.category)) baseQty = 180;
      else if (['Snacks', 'Dairy'].includes(product.category)) baseQty = 140;
      else if (product.category === 'Pantry') baseQty = 80;
      else if (product.category === 'Meat') baseQty = 55;
      else if (product.category === 'Electronics') baseQty = 12;

      const fmtMult = store.format === 'Superstore' ? 2.2 : store.format === 'Gas Station' ? 0.35 : 1.0;
      const elast = Math.max(0.4, 2.0 - price / product.basePrice);
      let qty = Math.round(baseQty * fmtMult * elast * (0.75 + sr(seed + 9) * 0.5));
      if (isPromo) qty = Math.round(qty * 1.85);

      map[store.id][product.barcode] = {
        storeId: store.id, barcode: product.barcode,
        price: parseFloat(price.toFixed(2)), qty: Math.max(qty, 1), isPromo,
      };
    });
  });
  return map;
}

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------
export default function PricingPage() {
  const [mounted, setMounted] = useState(false);

  // --- Nav state ---
  const [storeId, setStoreId] = useState('store-1');
  const [period, setPeriod] = useState('1 Week');
  const [geoFilter, setGeoFilter] = useState('All');
  const [fmtFilter, setFmtFilter] = useState('All');

  // --- Matrix state ---
  const [tab, setTab] = useState<'over' | 'under'>('over');
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');

  // --- Sections ---
  const [panels, setPanels] = useState({ theft: false, cashier: false, staff: false, promo: true });
  const togglePanel = (k: keyof typeof panels) => setPanels(p => ({ ...p, [k]: !p[k] }));

  // --- Simulated stock ---
  const [injected, setInjected] = useState<Record<string, Record<string, { price: number; qty: number }>>>({});

  // --- Detail overlay ---
  const [detail, setDetail] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  // Stable generated data
  const products = useMemo(() => generateProducts(), []);
  const stores = useMemo(() => generateStores(), []);
  const salesMap = useMemo(() => generateSales(stores, products, injected), [stores, products, injected]);

  const filteredStores = useMemo(() =>
    stores.filter(s =>
      (geoFilter === 'All' || s.geography === geoFilter) &&
      (fmtFilter === 'All' || s.format === fmtFilter)
    ), [stores, geoFilter, fmtFilter]);

  useEffect(() => {
    if (filteredStores.length && !filteredStores.some(s => s.id === storeId)) {
      setStoreId(filteredStores[0].id);
    }
  }, [filteredStores, storeId]);

  const activeStore = useMemo(() => stores.find(s => s.id === storeId) ?? stores[0], [stores, storeId]);
  const peers = useMemo(() =>
    stores.filter(s => s.id !== activeStore.id && s.geography === activeStore.geography && s.format === activeStore.format),
    [stores, activeStore]);

  // Cohort benchmarks
  const cohort = useMemo(() => {
    const out: Record<string, { wap: number; peerQtyTotal: number; peerQtyAvg: number; storeCount: number; minP: number; maxP: number }> = {};
    products.forEach(prod => {
      let sumPQ = 0; let sumQ = 0; let count = 0; let mn = Infinity; let mx = -Infinity;
      peers.forEach(peer => {
        const s = salesMap[peer.id]?.[prod.barcode];
        if (s && s.qty > 0 && !s.isPromo) {
          sumPQ += s.price * s.qty; sumQ += s.qty; count++;
          if (s.price < mn) mn = s.price;
          if (s.price > mx) mx = s.price;
        }
      });
      out[prod.barcode] = {
        wap: sumQ > 0 ? sumPQ / sumQ : prod.basePrice,
        peerQtyTotal: sumQ,
        peerQtyAvg: count > 0 ? Math.round(sumQ / count) : 0,
        storeCount: count,
        minP: mn === Infinity ? prod.basePrice : mn,
        maxP: mx === -Infinity ? prod.basePrice : mx,
      };
    });
    return out;
  }, [peers, products, salesMap]);

  // Opportunity matrix
  const matrix = useMemo(() => {
    const over: {
      product: Product; myPrice: number; myQty: number; cp: number; cqAvg: number;
      diffPct: number; peerQtyTotal: number; opp: number;
    }[] = [];
    const under: typeof over = [];
    const missed: { product: Product; cp: number; cqTotal: number; cqAvg: number; estRev: number; estMargin: number }[] = [];
    let overTotal = 0; let underTotal = 0; let activeBarcodes = 0;

    products.forEach(prod => {
      const my = salesMap[activeStore.id]?.[prod.barcode];
      const c = cohort[prod.barcode];
      if (!c) return;
      const hasSales = my && my.qty > 0;
      if (hasSales) {
        activeBarcodes++;
        const diff = my.price - c.wap;
        const diffPct = c.wap > 0 ? (diff / c.wap) * 100 : 0;
        const row = {
          product: prod, myPrice: my.price, myQty: my.qty,
          cp: c.wap, cqAvg: c.peerQtyAvg, diffPct,
          peerQtyTotal: c.peerQtyTotal, opp: 0,
        };
        if (diff > 0) {
          row.opp = diff * c.peerQtyTotal;
          overTotal += row.opp;
          over.push(row);
        } else if (diff < 0) {
          row.opp = Math.abs(diff) * my.qty;
          underTotal += row.opp;
          under.push(row);
        }
      } else if (c.peerQtyTotal > 0) {
        const estRev = c.peerQtyAvg * c.wap;
        missed.push({ product: prod, cp: c.wap, cqTotal: c.peerQtyTotal, cqAvg: c.peerQtyAvg, estRev, estMargin: estRev * prod.marginRate });
      }
    });

    over.sort((a, b) => b.opp - a.opp);
    under.sort((a, b) => b.opp - a.opp);
    missed.sort((a, b) => b.estMargin - a.estMargin);

    return { over, under, missed, overTotal, underTotal, activeBarcodes };
  }, [products, activeStore, salesMap, cohort]);

  // Filtered rows
  const cats = useMemo(() => [...new Set(products.map(p => p.category))].sort(), [products]);
  const filtered = useMemo(() => {
    const src = tab === 'over' ? matrix.over : matrix.under;
    return src.filter(r =>
      (catFilter === 'All' || r.product.category === catFilter) &&
      (r.product.name.toLowerCase().includes(search.toLowerCase()) || r.product.barcode.includes(search))
    );
  }, [tab, matrix, catFilter, search]);

  // Scatter data
  const scatter = useMemo(() =>
    [...matrix.over.map(r => ({
      x: parseFloat(r.diffPct.toFixed(1)),
      y: parseFloat((r.cqAvg > 0 ? ((r.myQty - r.cqAvg) / r.cqAvg) * 100 : 0).toFixed(1)),
      name: r.product.name, category: r.product.category, opp: r.opp, type: 'over' as const,
    })),
    ...matrix.under.map(r => ({
      x: parseFloat(r.diffPct.toFixed(1)),
      y: parseFloat((r.cqAvg > 0 ? ((r.myQty - r.cqAvg) / r.cqAvg) * 100 : 0).toFixed(1)),
      name: r.product.name, category: r.product.category, opp: r.opp, type: 'under' as const,
    }))],
    [matrix]);

  // Cashier data (stable per store)
  const anomalies = useMemo((): Anomaly[] => {
    const si = parseInt(activeStore.id.split('-')[1]);
    return STAFF_NAMES.map((name, i) => {
      const s = si * 100 + i;
      const ref = 0.5 + sr(s) * 9.5;
      const vd = 1.0 + sr(s + 1) * 14;
      const can = Math.floor(sr(s + 2) * 8);
      const score = Math.min(100, Math.round(ref * 4 + vd * 3 + can * 8));
      return { name, refundRate: parseFloat(ref.toFixed(1)), voidRate: parseFloat(vd.toFixed(1)), cancellations: can, score };
    }).sort((a, b) => b.score - a.score);
  }, [activeStore]);

  const cashiers = useMemo((): Cashier[] => {
    const si = parseInt(activeStore.id.split('-')[1]);
    return STAFF_NAMES.map((name, i) => {
      const s = si * 200 + i;
      return {
        name,
        salesPerHour: Math.round(450 + sr(s) * 550),
        avgBasket: Math.round(25 + sr(s + 1) * 75),
        itemsPerBasket: parseFloat((3.5 + sr(s + 2) * 9.5).toFixed(1)),
      };
    }).sort((a, b) => b.salesPerHour - a.salesPerHour);
  }, [activeStore]);

  const staffing = useMemo(() => {
    const si = parseInt(activeStore.id.split('-')[1]);
    const cap = activeStore.format === 'Superstore' ? 300 : activeStore.format === 'Gas Station' ? 60 : 150;
    return Array.from({ length: 15 }, (_, i) => {
      const h = i + 8;
      const s = si * 300 + h;
      const isLunch = h >= 11 && h <= 13;
      const isDinner = h >= 17 && h <= 19;
      const txFactor = isLunch ? 0.85 + sr(s) * 0.15 : isDinner ? 0.9 + sr(s) * 0.1 : 0.35 + sr(s) * 0.35;
      const staffFactor = isLunch ? 0.8 : isDinner ? 0.85 : 0.45;
      const jitter = -0.15 + sr(s + 1) * 0.3;
      return {
        time: `${h.toString().padStart(2, '0')}:00`,
        transactions: Math.round(cap * txFactor),
        capacity: Math.max(20, Math.round(cap * (staffFactor + jitter))),
      };
    });
  }, [activeStore]);

  // Detail product info
  const detailProduct = useMemo(() => {
    if (!detail) return null;
    const prod = products.find(p => p.barcode === detail);
    const c = cohort[detail];
    const my = salesMap[activeStore.id]?.[detail];
    return prod && c ? { prod, c, my } : null;
  }, [detail, products, cohort, salesMap, activeStore]);

  const stockItem = (barcode: string, price: number, avgQty: number) =>
    setInjected(prev => ({
      ...prev,
      [activeStore.id]: { ...(prev[activeStore.id] ?? {}), [barcode]: { price, qty: Math.max(10, Math.round(avgQty * 0.8)) } },
    }));

  const unstockItem = (barcode: string) =>
    setInjected(prev => {
      const copy = { ...(prev[activeStore.id] ?? {}) };
      delete copy[barcode];
      return { ...prev, [activeStore.id]: copy };
    });

  // -------------------------------------------------------------------------
  // RENDER HELPERS
  // -------------------------------------------------------------------------
  const badge = (txt: string, color: 'rose' | 'emerald' | 'amber' | 'slate') => {
    const cls = {
      rose: 'bg-rose-950/40 border-rose-900/30 text-rose-400',
      emerald: 'bg-emerald-950/40 border-emerald-900/30 text-emerald-400',
      amber: 'bg-amber-950/40 border-amber-900/30 text-amber-400',
      slate: 'bg-slate-900 border-slate-800 text-slate-400',
    }[color];
    return <span className={`px-2 py-0.5 rounded text-[9px] font-bold border font-sans ${cls}`}>{txt}</span>;
  };

  // -------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 overflow-x-hidden font-sans selection:bg-emerald-500 selection:text-[#090D16]">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[15%] left-[18%] w-96 h-96 rounded-full bg-emerald-500/4 blur-[140px]" />
        <div className="absolute top-[55%] right-[8%] w-[450px] h-[450px] rounded-full bg-blue-500/4 blur-[160px]" />
      </div>

      {/* ================================================================
          NAVIGATION
      ================================================================ */}
      <nav className="sticky top-0 z-40 h-16 md:h-[68px] bg-[#090D16]/85 backdrop-blur-md border-b border-slate-800/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-wrap md:flex-nowrap items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <Database className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-sm font-black tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                ARES Data Analytics
              </div>
              <div className="text-[9px] font-bold text-emerald-400/80 font-mono tracking-widest uppercase -mt-0.5">
                Retail Intelligence Suite
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2.5 justify-end">
            {/* Region */}
            <label className="flex items-center gap-1.5 bg-slate-900/70 border border-slate-800 px-2.5 py-1.5 rounded-md cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Region</span>
              <select value={geoFilter} onChange={e => setGeoFilter(e.target.value)}
                className="bg-transparent text-[11px] font-bold text-slate-300 focus:outline-none cursor-pointer">
                <option value="All">All</option>
                {GEOGRAPHIES.map(g => <option key={g} value={g} className="bg-slate-900">{g}</option>)}
              </select>
            </label>

            {/* Format */}
            <label className="flex items-center gap-1.5 bg-slate-900/70 border border-slate-800 px-2.5 py-1.5 rounded-md cursor-pointer">
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Format</span>
              <select value={fmtFilter} onChange={e => setFmtFilter(e.target.value)}
                className="bg-transparent text-[11px] font-bold text-slate-300 focus:outline-none cursor-pointer">
                <option value="All">All</option>
                {FORMATS.map(f => <option key={f} value={f} className="bg-slate-900">{f}</option>)}
              </select>
            </label>

            {/* Store */}
            <label className="flex items-center gap-1.5 bg-slate-900 border border-emerald-900/50 px-2.5 py-1.5 rounded-md cursor-pointer shadow-sm shadow-emerald-950/20">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono">Store</span>
              <select value={storeId} onChange={e => setStoreId(e.target.value)}
                className="bg-transparent text-[11px] font-bold text-white focus:outline-none cursor-pointer max-w-[160px]">
                {filteredStores.map(s => <option key={s.id} value={s.id} className="bg-slate-900">{s.name}</option>)}
              </select>
            </label>

            {/* Period */}
            <select value={period} onChange={e => setPeriod(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300 rounded-md px-3 py-1.5 focus:outline-none cursor-pointer">
              <option>1 Week</option>
              <option>1 Month</option>
              <option>3 Months</option>
            </select>

            {/* Refresh badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-950/30 border border-emerald-900/30 rounded-md text-[10px] text-emerald-400 font-mono font-bold">
              <RefreshCw className="w-3 h-3" />
              30 min ago
            </div>
          </div>
        </div>
      </nav>

      {/* ================================================================
          MAIN
      ================================================================ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* STORE BANNER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 border border-slate-800 p-5 rounded-xl backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl md:text-2xl font-bold text-white">{activeStore.name}</h1>
              <span className="px-2 py-0.5 bg-slate-800 text-[10px] text-slate-400 font-mono rounded border border-slate-700">{activeStore.id}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Profile:{' '}
              <span className="text-white font-semibold">{activeStore.geography}</span> Region ·{' '}
              <span className="text-white font-semibold">{activeStore.format}</span> Format · Benchmarked vs {peers.length} peer stores (matched profile)
            </p>
          </div>
          <div className="flex gap-8 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-8 flex-shrink-0">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 font-mono tracking-wider block">Cohort Size</span>
              <span className="text-2xl font-mono font-bold text-white mt-0.5 block">{peers.length} Stores</span>
              <span className="text-[9px] text-slate-500 mt-0.5 block">in Same Profile / 47 Total</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 font-mono tracking-wider block">Active Barcodes</span>
              <span className="text-2xl font-mono font-bold text-white mt-0.5 block">{matrix.activeBarcodes} / {products.length}</span>
              <span className="text-[9px] text-slate-500 mt-0.5 block">Stocked with Sales</span>
            </div>
          </div>
        </div>

        {/* ---- KPI CARDS ---- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: 'Overpriced Revenue Gap', value: `$${matrix.overTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
              sub: `${matrix.over.length} overpriced barcodes`, icon: <TrendingUp className="w-4 h-4" />,
              accent: 'rose',
            },
            {
              label: 'Margin Left On Table', value: `$${matrix.underTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}`,
              sub: `${matrix.under.length} underpriced barcodes`, icon: <TrendingDown className="w-4 h-4" />,
              accent: 'emerald',
            },
            {
              label: 'Benchmark Cohort', value: `${peers.length} Stores`,
              sub: `${activeStore.geography} · ${activeStore.format}`, icon: <Sliders className="w-4 h-4" />,
              accent: 'slate',
            },
            {
              label: 'Active Barcodes Analyzed', value: `${matrix.activeBarcodes}`,
              sub: `${((matrix.activeBarcodes / products.length) * 100).toFixed(0)}% assortment coverage`, icon: <ShoppingBag className="w-4 h-4" />,
              accent: 'slate',
            },
          ].map(kpi => {
            const accentMap: Record<string, string> = {
              rose: 'hover:border-rose-900/60 hover:shadow-rose-950/10',
              emerald: 'hover:border-emerald-900/60 hover:shadow-emerald-950/10',
              slate: 'hover:border-slate-700',
            };
            const iconMap: Record<string, string> = {
              rose: 'bg-rose-950/40 border-rose-900/30 text-rose-400',
              emerald: 'bg-emerald-950/40 border-emerald-900/30 text-emerald-400',
              slate: 'bg-slate-850 border-slate-800 text-slate-400',
            };
            const valMap: Record<string, string> = {
              rose: 'text-rose-500',
              emerald: 'text-emerald-400',
              slate: 'text-white',
            };
            return (
              <div key={kpi.label} className={`bg-slate-900/60 backdrop-blur-md border border-slate-800 p-5 rounded-xl transition-all hover:shadow-lg ${accentMap[kpi.accent]}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider block">{kpi.label}</span>
                    <span className={`text-2xl font-mono font-bold block mt-1.5 ${valMap[kpi.accent]}`}>{kpi.value}</span>
                  </div>
                  <div className={`p-2 border rounded-lg ${iconMap[kpi.accent]}`}>{kpi.icon}</div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500">{kpi.sub}</div>
              </div>
            );
          })}
        </div>

        {/* ---- MATRIX + SCATTER ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Matrix — 8 cols */}
          <div className="lg:col-span-8 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 bg-slate-950/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-white">Pricing Opportunity Matrix</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Products diverging from peer quantity-weighted average. Click any row for details.</p>
                </div>
                <div className="flex p-0.5 bg-slate-950 border border-slate-850 rounded-lg w-fit">
                  <button onClick={() => setTab('over')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all ${tab === 'over' ? 'bg-rose-950/40 text-rose-400 border border-rose-900/30' : 'text-slate-400 hover:text-slate-200'}`}>
                    Overpriced ({matrix.over.length})
                  </button>
                  <button onClick={() => setTab('under')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-md transition-all ${tab === 'under' ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/30' : 'text-slate-400 hover:text-slate-200'}`}>
                    Underpriced ({matrix.under.length})
                  </button>
                </div>
              </div>

              {/* Filter row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-800/80">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
                  <input
                    type="text" placeholder="Search name or barcode…" value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-850 text-xs text-white rounded-md pl-8 pr-3 py-2 focus:outline-none focus:border-slate-700 placeholder-slate-600"
                  />
                </div>
                <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-850 text-xs text-slate-300 rounded-md px-3 py-2 focus:outline-none cursor-pointer">
                  <option value="All">All Categories</option>
                  {cats.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="text-[10px] text-slate-500 font-mono flex items-center justify-end">
                  {filtered.length} results
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-1 min-h-[360px]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase font-mono bg-slate-950/20">
                    <th className="p-4">Product / Barcode</th>
                    <th className="p-4">Cat.</th>
                    <th className="p-4 text-right">My Price</th>
                    <th className="p-4 text-right">Cohort WAP</th>
                    <th className="p-4 text-center">Var %</th>
                    <th className="p-4 text-center">My Qty / Cohort Avg</th>
                    <th className="p-4 text-right">Opportunity ($)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850/50">
                  {filtered.slice(0, 10).map(r => (
                    <tr key={r.product.barcode}
                      onClick={() => setDetail(r.product.barcode)}
                      className="hover:bg-slate-900/30 cursor-pointer text-xs transition-colors group">
                      <td className="p-4">
                        <div className="font-semibold text-slate-200 group-hover:text-white transition-colors leading-tight">{r.product.name}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">{r.product.barcode}</div>
                      </td>
                      <td className="p-4">
                        <span className="px-1.5 py-0.5 bg-slate-950 text-[9px] text-slate-400 border border-slate-800 rounded">{r.product.category}</span>
                      </td>
                      <td className="p-4 text-right font-mono text-slate-200">${r.myPrice.toFixed(2)}</td>
                      <td className="p-4 text-right font-mono text-slate-400">${r.cp.toFixed(2)}</td>
                      <td className="p-4 text-center font-mono font-bold">
                        <span className={tab === 'over' ? 'text-rose-400' : 'text-emerald-400'}>
                          {tab === 'over' ? '+' : ''}{r.diffPct.toFixed(1)}%
                        </span>
                      </td>
                      <td className="p-4 text-center font-mono text-slate-400">
                        <span className="text-slate-200">{r.myQty}</span>
                        <span className="text-slate-600 mx-0.5">/</span>
                        <span>{r.cqAvg}</span>
                      </td>
                      <td className={`p-4 text-right font-mono font-bold ${tab === 'over' ? 'text-rose-400' : 'text-emerald-400'}`}>
                        +${r.opp.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={7} className="text-center py-16 text-slate-500 font-mono text-xs">No products match your filters.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/20 flex flex-col sm:flex-row justify-between items-center gap-2">
              <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Weighted by peer volume · Promo sales excluded
              </span>
              <span className="text-xs text-slate-400">
                Total {tab === 'over' ? 'Overpriced Gap' : 'Recoverable Margin'}:{' '}
                <span className={`ml-1 font-mono font-black text-sm ${tab === 'over' ? 'text-rose-400' : 'text-emerald-400'}`}>
                  ${(tab === 'over' ? matrix.overTotal : matrix.underTotal).toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </span>
              </span>
            </div>
          </div>

          {/* Scatter — 4 cols */}
          <div className="lg:col-span-4 bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl p-5 flex flex-col gap-5">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Price vs Volume Variance
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Bubble size = dollar opportunity.</p>
            </div>

            <div className="h-[300px]">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 16, right: 16, bottom: 16, left: -12 }}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="x" name="Price Var" unit="%" stroke="#64748b" fontSize={10} domain={[-22, 22]} />
                    <YAxis type="number" dataKey="y" name="Qty Var" unit="%" stroke="#64748b" fontSize={10} />
                    <ZAxis type="number" dataKey="opp" range={[40, 500]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3', stroke: '#334155' }}
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-950 border border-slate-800 p-3 rounded shadow-2xl max-w-[190px]">
                            <p className="text-xs font-bold text-white leading-tight">{d.name}</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">{d.category}</p>
                            <div className="mt-2 pt-1.5 border-t border-slate-800 space-y-1 text-[10px] font-mono">
                              <div className="flex justify-between gap-3">
                                <span className="text-slate-400">Price Var:</span>
                                <span className={d.type === 'over' ? 'text-rose-400' : 'text-emerald-400'}>{d.x > 0 ? `+${d.x}` : d.x}%</span>
                              </div>
                              <div className="flex justify-between gap-3">
                                <span className="text-slate-400">Qty Var:</span>
                                <span className={d.y >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{d.y >= 0 ? `+${d.y}` : d.y}%</span>
                              </div>
                              <div className="flex justify-between gap-3 font-bold text-white pt-1 border-t border-slate-800">
                                <span>Opportunity:</span>
                                <span>${Math.round(d.opp).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        );
                      }} />
                    <Scatter data={scatter}>
                      {scatter.map((e, i) => <Cell key={i} fill={e.type === 'over' ? '#f43f5e' : '#10b981'} fillOpacity={0.85} />)}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono animate-pulse">Loading chart…</div>
              )}
            </div>

            <div className="bg-slate-950/50 p-4 border border-slate-850 rounded-lg space-y-2.5">
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 flex-shrink-0" />Overpriced vs Peer Average
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0" />Underpriced vs Peer Average
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed pt-2 border-t border-slate-850">
                Bottom-right quadrant (high price gap, low qty variance) signals highest-risk overpriced items with elastic demand.
              </p>
            </div>
          </div>
        </div>

        {/* ---- MODULE 2: MISSED SALES ---- */}
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-slate-800 bg-slate-950/30">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              Assortment Gap: Missed Sales Opportunities (Top 10)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Products generating zero sales at this store, but with strong margin performance across your peer cohort.{' '}
              Click <span className="text-emerald-400 font-bold">Simulate Stocking</span> to model the revenue impact instantly.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-bold text-slate-500 uppercase font-mono bg-slate-950/20">
                  <th className="p-4">Barcode</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-right">Cohort Total Qty</th>
                  <th className="p-4 text-right">Cohort Avg Qty</th>
                  <th className="p-4 text-right">Cohort Avg Price</th>
                  <th className="p-4 text-right">Margin Rate</th>
                  <th className="p-4 text-right">Est. Revenue</th>
                  <th className="p-4 text-right">Est. Gross Margin</th>
                  <th className="p-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/50 text-xs">
                {matrix.missed.slice(0, 10).map(m => (
                  <tr key={m.product.barcode} className="hover:bg-slate-900/20 transition-colors">
                    <td className="p-4 font-mono text-slate-500 text-[10px]">{m.product.barcode}</td>
                    <td className="p-4">
                      <button onClick={() => setDetail(m.product.barcode)}
                        className="font-semibold text-slate-200 hover:text-emerald-400 text-left transition-colors">
                        {m.product.name}
                      </button>
                    </td>
                    <td className="p-4">{badge(m.product.category, 'slate')}</td>
                    <td className="p-4 text-right font-mono text-slate-400">{m.cqTotal}</td>
                    <td className="p-4 text-right font-mono text-slate-300">{m.cqAvg}</td>
                    <td className="p-4 text-right font-mono text-slate-400">${m.cp.toFixed(2)}</td>
                    <td className="p-4 text-right font-mono text-slate-400">{(m.product.marginRate * 100).toFixed(0)}%</td>
                    <td className="p-4 text-right font-mono text-slate-300">${m.estRev.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                    <td className="p-4 text-right font-mono font-bold text-emerald-400">${m.estMargin.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => stockItem(m.product.barcode, m.cp, m.cqAvg)}
                        className="px-2.5 py-1.5 bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-400 border border-emerald-900/30 hover:border-emerald-600/50 rounded text-[10px] font-bold transition-all inline-flex items-center gap-1.5">
                        <Plus className="w-3 h-3" />Simulate
                      </button>
                    </td>
                  </tr>
                ))}
                {matrix.missed.length === 0 && (
                  <tr><td colSpan={10} className="py-16 text-center text-slate-500 font-mono text-xs">No assortment gaps detected — excellent coverage!</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-800 bg-slate-950/20 text-[10px] text-slate-500 font-mono flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
            Estimated Gross Margin = Cohort Avg Qty × Cohort Weighted Avg Price × Product Margin Rate
          </div>
        </div>

        {/* ================================================================
            EXECUTIVE PREVIEW SECTIONS (COLLAPSIBLE)
        ================================================================ */}
        <div className="space-y-3">
          <h3 className="text-[10px] uppercase font-bold text-slate-500 font-mono tracking-widest pt-2">Executive Intelligence Previews</h3>

          {/* --- THEFT & SHRINKAGE --- */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl overflow-hidden">
            <button onClick={() => togglePanel('theft')}
              className="w-full px-5 py-4 flex justify-between items-center hover:bg-slate-900/20 transition-all text-left">
              <div className="flex items-center gap-3 min-w-0">
                <AlertTriangle className="w-4.5 h-4.5 text-rose-500 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">Cashier Anomaly Scorecard · Theft & Shrinkage</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">High refund rates, voids, and post-payment cancellations per cashier.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                {badge(`${anomalies.filter(a => a.score > 75).length} High Risk`, 'rose')}
                {panels.theft ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {panels.theft && (
              <div className="border-t border-slate-800 bg-slate-950/20 p-5 animate-in slide-in-from-top-2 duration-150">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase font-mono font-bold">
                        <th className="pb-3">Cashier</th>
                        <th className="pb-3 text-right">Refund Rate %</th>
                        <th className="pb-3 text-right">Void Rate %</th>
                        <th className="pb-3 text-right">Post-Pmt Cancels</th>
                        <th className="pb-3 text-center">Risk Level</th>
                        <th className="pb-3 text-right">Score / 100</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850/50">
                      {anomalies.map(a => (
                        <tr key={a.name} className="hover:bg-slate-900/10">
                          <td className="py-2.5 font-semibold text-slate-300">{a.name}</td>
                          <td className="py-2.5 text-right font-mono text-slate-400">{a.refundRate}%</td>
                          <td className="py-2.5 text-right font-mono text-slate-400">{a.voidRate}%</td>
                          <td className="py-2.5 text-right font-mono text-slate-400">{a.cancellations}</td>
                          <td className="py-2.5 text-center">
                            {badge(a.score > 75 ? 'High Alert' : a.score > 40 ? 'Moderate' : 'Standard', a.score > 75 ? 'rose' : a.score > 40 ? 'amber' : 'emerald')}
                          </td>
                          <td className={`py-2.5 text-right font-mono font-black ${a.score > 75 ? 'text-rose-400' : a.score > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {a.score}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-slate-400 mt-4 pt-4 border-t border-slate-850 leading-relaxed bg-slate-950/40 p-3 rounded">
                  <span className="text-white font-bold">System Note:</span> Anomaly scores exceeding 75 trigger automated real-time POS audit flags. Scores combine refund frequency (4×), void rate (3×), and post-payment cancellations (8×) — cancellations carry the highest weight as they represent the strongest theft signal.
                </p>
              </div>
            )}
          </div>

          {/* --- CASHIER PERFORMANCE --- */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl overflow-hidden">
            <button onClick={() => togglePanel('cashier')}
              className="w-full px-5 py-4 flex justify-between items-center hover:bg-slate-900/20 transition-all text-left">
              <div className="flex items-center gap-3 min-w-0">
                <UserCheck className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">Cashier Performance & Throughput Matrix</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">POS checkout velocity, basket value, and efficiency metrics per cashier.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                {badge(`Leader: ${cashiers[0]?.name?.split(' ')[0]}`, 'emerald')}
                {panels.cashier ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {panels.cashier && (
              <div className="border-t border-slate-800 bg-slate-950/20 p-5 animate-in slide-in-from-top-2 duration-150">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-[10px] text-slate-500 uppercase font-mono font-bold">
                        <th className="pb-3">Staff Member</th>
                        <th className="pb-3 text-right">Throughput ($/hr)</th>
                        <th className="pb-3 text-right">Avg Basket ($)</th>
                        <th className="pb-3 text-right">Items / Basket</th>
                        <th className="pb-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850/50">
                      {cashiers.map((c, i) => (
                        <tr key={c.name} className="hover:bg-slate-900/10">
                          <td className="py-2.5 font-semibold text-slate-300">{c.name}</td>
                          <td className="py-2.5 text-right font-mono text-slate-200">${c.salesPerHour}/hr</td>
                          <td className="py-2.5 text-right font-mono text-slate-300">${c.avgBasket}</td>
                          <td className="py-2.5 text-right font-mono text-slate-400">{c.itemsPerBasket}</td>
                          <td className="py-2.5 text-center">{badge(i < 3 ? 'Top Performer' : 'Active', i < 3 ? 'emerald' : 'slate')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* --- STAFFING OPTIMIZATION --- */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl overflow-hidden">
            <button onClick={() => togglePanel('staff')}
              className="w-full px-5 py-4 flex justify-between items-center hover:bg-slate-900/20 transition-all text-left">
              <div className="flex items-center gap-3 min-w-0">
                <Sliders className="w-4.5 h-4.5 text-blue-400 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">Hourly Staffing vs Checkout Capacity Pattern</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Match staffed cashier lane capacity to transaction volume demands by hour.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                {badge('Peak Mismatch Detected', 'amber')}
                {panels.staff ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {panels.staff && (
              <div className="border-t border-slate-800 bg-slate-950/20 p-5 animate-in slide-in-from-top-2 duration-150 space-y-4">
                <p className="text-xs text-slate-400">Green area = hourly transaction volume · Blue dashed line = staffed checkout lane capacity.</p>
                <div className="h-[240px]">
                  {mounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={staffing} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                        <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                        <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                        <YAxis stroke="#64748b" fontSize={10} />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', fontSize: 11 }}
                          labelStyle={{ color: '#fff', fontWeight: 700 }}
                        />
                        <defs>
                          <linearGradient id="txGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="transactions" name="Transaction Volume (tx/hr)" stroke="#10b981" strokeWidth={2} fill="url(#txGrad)" />
                        <Area type="monotone" dataKey="capacity" name="Staffing Capacity (tx/hr)" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono">Loading chart…</div>
                  )}
                </div>
                <div className="bg-slate-950/60 p-4 border border-slate-850 rounded text-xs text-slate-400 leading-relaxed">
                  <span className="text-white font-bold">Staffing Recommendation:</span> Understaffing peaks detected at 12:00 and 18:00 where transaction volumes exceed lane capacity by &gt;15%. Shift reallocations from the 14:00 lull period would eliminate queuing friction without increasing total labour cost.
                </div>
              </div>
            )}
          </div>

          {/* --- PROMO EFFECTIVENESS --- */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl overflow-hidden">
            <button onClick={() => togglePanel('promo')}
              className="w-full px-5 py-4 flex justify-between items-center hover:bg-slate-900/20 transition-all text-left">
              <div className="flex items-center gap-3 min-w-0">
                <TrendingUp className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">Promotion Effectiveness Engine & Campaign Verdict</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">Verify whether promo campaigns drove volume uplift and defended gross margin.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                <span className="px-2.5 py-0.5 bg-rose-950/50 border border-rose-900/40 text-[9px] font-black rounded text-rose-400 tracking-wide uppercase">DO NOT REPEAT</span>
                {panels.promo ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            {panels.promo && (
              <div className="border-t border-slate-800 bg-slate-950/20 p-5 animate-in slide-in-from-top-2 duration-150 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-950 p-5 border border-slate-850 rounded-lg text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold font-mono tracking-widest block">Quantity Uplift</span>
                    <span className="text-3xl font-mono font-black text-emerald-400 block mt-1.5">+34.0%</span>
                    <span className="text-[9px] text-slate-500 block mt-1">vs. non-promo baseline period</span>
                  </div>
                  <div className="bg-slate-950 p-5 border border-slate-850 rounded-lg text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-bold font-mono tracking-widest block">Gross Profit Impact</span>
                    <span className="text-3xl font-mono font-black text-rose-400 block mt-1.5">-9.0%</span>
                    <span className="text-[9px] text-slate-500 block mt-1">vs. non-promo gross profit dollars</span>
                  </div>
                  <div className="bg-slate-950 p-5 border border-slate-850 rounded-lg flex flex-col items-center justify-center text-center gap-2">
                    <span className="text-[10px] text-slate-500 uppercase font-bold font-mono tracking-widest">AI Verdict</span>
                    <span className="px-3 py-1.5 bg-rose-950/60 border border-rose-900 text-rose-400 text-xs font-black uppercase rounded tracking-wider">DO NOT REPEAT</span>
                    <span className="text-[9px] text-slate-500">Margin erosion exceeded volume gain</span>
                  </div>
                </div>

                <div className="bg-slate-950/60 p-4 border border-slate-850 rounded text-xs text-slate-400 space-y-2 leading-relaxed">
                  <span className="text-white font-bold block">Audit Engine Assessment — Campaign: &quot;Summer Soda Splash&quot;</span>
                  <p>The 18% flat discount applied during the promo period expanded unit volumes by 34%, however the blended gross margin rate contracted such that total profit dollars declined 9% versus the equivalent non-promotional trading window. The campaign did not achieve breakeven on margin terms.</p>
                  <p className="text-emerald-400 font-semibold">Recommendation: Switch to a &quot;Buy 2 Get 1 at 30% Off&quot; bundled mechanic to lock in higher basket sizes and defend category margin rate.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-16 py-10 border-t border-slate-800 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-slate-500 font-mono">
          <span>© 2026 ARES Retail Intelligence Suite · DataUnlock AI</span>
          <div className="flex gap-4 items-center">
            <span className="px-2 py-0.5 border border-slate-800 rounded bg-slate-900 text-slate-400">PROTOTYPE ENGINE v1.5.0</span>
            <span>47 stores · {products.length} SKUs · {period} Window</span>
          </div>
        </div>
      </footer>

      {/* ================================================================
          PRODUCT DETAIL OVERLAY
      ================================================================ */}
      {detailProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex justify-between items-start gap-3">
              <div>
                {badge(detailProduct.prod.category, 'emerald')}
                <h3 className="text-lg font-bold text-white mt-2.5 leading-tight">{detailProduct.prod.name}</h3>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">GTIN: {detailProduct.prod.barcode}</p>
              </div>
              <button onClick={() => setDetail(null)} className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-colors flex-shrink-0 text-lg leading-none">✕</button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950 p-4 border border-slate-800 rounded-lg">
                  <span className="text-[10px] text-slate-500 uppercase font-bold font-mono tracking-wider block">My Store Price</span>
                  <span className="text-2xl font-mono font-bold text-white block mt-1">
                    {detailProduct.my && detailProduct.my.qty > 0 ? `$${detailProduct.my.price.toFixed(2)}` : 'N/A — Not Stocked'}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    Qty: {detailProduct.my?.qty ?? 0} units
                  </span>
                </div>
                <div className="bg-slate-950 p-4 border border-slate-800 rounded-lg">
                  <span className="text-[10px] text-slate-500 uppercase font-bold font-mono tracking-wider block">Cohort Weighted Avg</span>
                  <span className="text-2xl font-mono font-bold text-emerald-400 block mt-1">${detailProduct.c.wap.toFixed(2)}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Cohort Avg Qty: {detailProduct.c.peerQtyAvg}</span>
                </div>
              </div>

              {/* Price range bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>Cohort Price Range</span>
                  <span className="font-mono text-white">${detailProduct.c.minP.toFixed(2)} – ${detailProduct.c.maxP.toFixed(2)}</span>
                </div>
                <div className="h-2.5 bg-slate-950 rounded-full relative overflow-visible border border-slate-800">
                  <div
                    className="absolute top-0 left-0 h-full bg-emerald-900/40 rounded-full"
                    style={{ width: '100%' }}
                  />
                  {/* WAP marker */}
                  {detailProduct.c.maxP > detailProduct.c.minP && (
                    <div
                      className="absolute w-0.5 h-4 -top-0.75 bg-emerald-400 rounded-full"
                      style={{ left: `${((detailProduct.c.wap - detailProduct.c.minP) / (detailProduct.c.maxP - detailProduct.c.minP)) * 100}%` }}
                    />
                  )}
                  {/* My price marker */}
                  {detailProduct.my && detailProduct.my.qty > 0 && detailProduct.c.maxP > detailProduct.c.minP && (
                    <div
                      className="absolute w-2 h-4 -top-0.75 bg-rose-500 rounded-sm border border-rose-300/20"
                      style={{ left: `calc(${Math.max(0, Math.min(100, ((detailProduct.my.price - detailProduct.c.minP) / (detailProduct.c.maxP - detailProduct.c.minP)) * 100))}% - 4px)` }}
                    />
                  )}
                </div>
                <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                  <span>Min ${detailProduct.c.minP.toFixed(2)}</span>
                  <span className="text-emerald-400">WAP ${detailProduct.c.wap.toFixed(2)}</span>
                  <span>Max ${detailProduct.c.maxP.toFixed(2)}</span>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-slate-950/80 p-4 border border-slate-850 rounded-lg">
                <span className="text-xs font-bold text-white block mb-1.5">AI Recommendation</span>
                {detailProduct.my && detailProduct.my.qty > 0 ? (
                  detailProduct.my.price > detailProduct.c.wap ? (
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Overpriced by <span className="text-rose-400 font-bold">+{((detailProduct.my.price - detailProduct.c.wap) / detailProduct.c.wap * 100).toFixed(1)}%</span>.
                      Aligning to cohort WAP of <span className="text-emerald-400 font-bold">${detailProduct.c.wap.toFixed(2)}</span> could unlock <span className="text-emerald-400 font-bold">${((detailProduct.my.price - detailProduct.c.wap) * detailProduct.c.peerQtyTotal).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span> in recoverable revenue from volume expansion.
                    </p>
                  ) : (
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Priced below peer average by <span className="text-emerald-400 font-bold">{((detailProduct.c.wap - detailProduct.my.price) / detailProduct.c.wap * 100).toFixed(1)}%</span>.
                      Increasing to <span className="text-emerald-400 font-bold">${detailProduct.c.wap.toFixed(2)}</span> captures an estimated <span className="text-emerald-400 font-bold">${((detailProduct.c.wap - detailProduct.my.price) * detailProduct.my.qty).toLocaleString('en-US', { maximumFractionDigits: 0 })}</span> in additional gross margin.
                    </p>
                  )
                ) : (
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Not currently stocked. Peer cohort stores sell <span className="text-white font-bold">{detailProduct.c.peerQtyAvg} units</span> at <span className="text-emerald-400 font-bold">${detailProduct.c.wap.toFixed(2)}</span>. Estimated margin opportunity: <span className="text-emerald-400 font-bold">${(detailProduct.c.peerQtyAvg * detailProduct.c.wap * detailProduct.prod.marginRate).toFixed(0)}</span>.
                  </p>
                )}
              </div>

              {/* Actions */}
              {(!detailProduct.my || detailProduct.my.qty === 0) && (
                <button
                  onClick={() => { stockItem(detailProduct.prod.barcode, detailProduct.c.wap, detailProduct.c.peerQtyAvg); setDetail(null); }}
                  className="w-full py-2.5 bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-400 border border-emerald-900/30 hover:border-emerald-600/50 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2">
                  <Plus className="w-3.5 h-3.5" />Simulate Stocking at ${detailProduct.c.wap.toFixed(2)}
                </button>
              )}
              {detailProduct.my && detailProduct.my.qty > 0 && injected[activeStore.id]?.[detailProduct.prod.barcode] && (
                <button
                  onClick={() => { unstockItem(detailProduct.prod.barcode); setDetail(null); }}
                  className="w-full py-2.5 bg-rose-950/30 hover:bg-rose-950/50 text-rose-300 border border-rose-900/30 rounded-lg text-xs font-bold transition-all">
                  Reset Simulation
                </button>
              )}
            </div>

            <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex justify-end">
              <button onClick={() => setDetail(null)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-md text-xs font-bold transition-colors">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

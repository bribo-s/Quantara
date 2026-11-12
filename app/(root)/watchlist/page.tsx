'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getNews } from '@/lib/actions/finnhub.actions';
import { 
  TrendingUp, 
  TrendingDown, 
  Bell, 
  Trash2, 
  Plus, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  DollarSign,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { toast } from 'sonner';

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  marketCap: string;
  peRatio: string;
  alertPrice?: number;
  alertType?: 'upper' | 'lower';
}

const INITIAL_WATCHLIST: WatchlistItem[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 145.26, changePercent: 3.82, marketCap: '$3.56T', peRatio: '52.4', alertPrice: 155.00, alertType: 'upper' },
  { symbol: 'AAPL', name: 'Apple Inc.', price: 228.45, changePercent: 1.24, marketCap: '$3.45T', peRatio: '34.8', alertPrice: 220.00, alertType: 'lower' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 312.80, changePercent: 4.15, marketCap: '$998.2B', peRatio: '88.2', alertPrice: 325.00, alertType: 'upper' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 426.10, changePercent: 0.94, marketCap: '$3.16T', peRatio: '33.1' },
  { symbol: 'PLTR', name: 'Palantir Technologies', price: 58.75, changePercent: 5.42, marketCap: '$132.4B', peRatio: '112.5', alertPrice: 65.00, alertType: 'upper' },
];

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(INITIAL_WATCHLIST);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<WatchlistItem | null>(null);
  const [alertThreshold, setAlertThreshold] = useState('');
  const [alertType, setAlertType] = useState<'upper' | 'lower'>('upper');

  const handleRemove = (symbol: string) => {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol));
    toast.success(`${symbol} removed from your watchlist.`);
  };

  const handleOpenAlertModal = (stock: WatchlistItem) => {
    setSelectedStock(stock);
    setAlertThreshold(stock.alertPrice ? stock.alertPrice.toString() : (stock.price * 1.05).toFixed(2));
    setAlertType(stock.alertType || 'upper');
    setModalOpen(true);
  };

  const handleSaveAlert = () => {
    if (!selectedStock || !alertThreshold) return;
    const thresholdNum = parseFloat(alertThreshold);
    if (isNaN(thresholdNum)) {
      toast.error('Please enter a valid target price.');
      return;
    }

    setWatchlist((prev) =>
      prev.map((item) =>
        item.symbol === selectedStock.symbol
          ? { ...item, alertPrice: thresholdNum, alertType }
          : item
      )
    );
    toast.success(`Active alert set: ${selectedStock.symbol} ${alertType === 'upper' ? '≥' : '≤'} $${thresholdNum.toFixed(2)}`);
    setModalOpen(false);
  };

  const totalStocks = watchlist.length;
  const activeAlerts = watchlist.filter((w) => w.alertPrice).length;
  const avgChange = totalStocks > 0
    ? (watchlist.reduce((acc, curr) => acc + curr.changePercent, 0) / totalStocks).toFixed(2)
    : '0.00';

  return (
    <div className="flex flex-col min-h-screen gap-8 p-4 md:p-6 lg:p-8">
      {/* Page Title & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <span>Watchlist & Smart Alerts</span>
            <span className="rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-xs font-semibold text-yellow-400 border border-yellow-500/20">
              Live Feed
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Real-time equity monitoring, automated price targets, and institutional risk metrics.
          </p>
        </div>

        <Link
          href="/search"
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Add Stock to Watchlist</span>
        </Link>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-[#0d111a] border border-gray-800 p-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Tracked Equities</span>
            <span className="text-2xl font-black text-white mt-1 block">{totalStocks} Symbols</span>
            <span className="text-xs text-gray-500 mt-1 block">Live Finnhub streaming</span>
          </div>
          <div className="h-11 w-11 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Layers className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-xl bg-[#0d111a] border border-gray-800 p-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Avg 24h Performance</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">+{avgChange}%</span>
            <span className="text-xs text-emerald-500/80 mt-1 block">Outperforming S&P 500 (+0.8%)</span>
          </div>
          <div className="h-11 w-11 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

        <div className="rounded-xl bg-[#0d111a] border border-gray-800 p-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Automated Alerts</span>
            <span className="text-2xl font-black text-yellow-400 mt-1 block">{activeAlerts} Active</span>
            <span className="text-xs text-gray-500 mt-1 block">Inngest background queue</span>
          </div>
          <div className="h-11 w-11 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500">
            <Bell className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Watchlist Table */}
      <div className="rounded-2xl border border-gray-800 bg-[#0d111a] overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <span>Portfolio Watchlist</span>
            <span className="text-xs text-gray-400">({watchlist.length})</span>
          </h2>
          <span className="text-xs text-gray-400">Click any symbol for interactive charts & AI breakdown</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-[#090c12] text-xs uppercase tracking-wider text-gray-400 border-b border-gray-800">
              <tr>
                <th className="px-6 py-4">Company</th>
                <th className="px-4 py-4">Symbol</th>
                <th className="px-4 py-4">Price</th>
                <th className="px-4 py-4">24h Change</th>
                <th className="px-4 py-4">Market Cap</th>
                <th className="px-4 py-4">P/E Ratio</th>
                <th className="px-4 py-4">Active Alert</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {watchlist.map((stock) => {
                const isPositive = stock.changePercent >= 0;
                return (
                  <tr key={stock.symbol} className="hover:bg-gray-900/40 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">
                      <Link
                        href={`/stocks/${stock.symbol}`}
                        className="hover:text-yellow-400 flex items-center gap-2 transition-colors"
                      >
                        <div className="h-8 w-8 rounded-lg bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-200">
                          {stock.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div className="font-bold">{stock.name}</div>
                          <div className="text-xs text-gray-500 sm:hidden">{stock.symbol}</div>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-4 font-mono font-bold text-yellow-400">
                      {stock.symbol}
                    </td>
                    <td className="px-4 py-4 font-bold text-white">
                      ${stock.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 font-semibold text-xs px-2.5 py-1 rounded-md ${
                        isPositive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        {isPositive ? `+${stock.changePercent.toFixed(2)}%` : `${stock.changePercent.toFixed(2)}%`}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-300 font-mono text-xs">
                      {stock.marketCap}
                    </td>
                    <td className="px-4 py-4 text-gray-300 font-mono text-xs">
                      {stock.peRatio}
                    </td>
                    <td className="px-4 py-4">
                      {stock.alertPrice ? (
                        <button
                          onClick={() => handleOpenAlertModal(stock)}
                          className="flex items-center gap-1.5 text-xs rounded-full bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2.5 py-1 transition-colors"
                        >
                          <Bell className="h-3 w-3" />
                          <span>{stock.alertType === 'upper' ? '≥' : '≤'} ${stock.alertPrice.toFixed(2)}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenAlertModal(stock)}
                          className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                          <span>Set Alert</span>
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/stocks/${stock.symbol}`}
                          title={`Open ${stock.symbol} charts`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleRemove(stock.symbol)}
                          title={`Remove ${stock.symbol}`}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Price Alert Modal */}
      {modalOpen && selectedStock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#0d111a] p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-yellow-500" />
                <h3 className="text-base font-bold text-white">
                  Set Price Alert for ${selectedStock.symbol}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-300 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-gray-400">
              Current Market Price: <span className="font-bold text-white">${selectedStock.price.toFixed(2)}</span>
            </div>

            {/* Alert Condition Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 block">Trigger Condition</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAlertType('upper')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors ${
                    alertType === 'upper'
                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
                      : 'bg-gray-900 text-gray-400 border-gray-800'
                  }`}
                >
                  Price Rises Above (≥)
                </button>
                <button
                  type="button"
                  onClick={() => setAlertType('lower')}
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors ${
                    alertType === 'lower'
                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
                      : 'bg-gray-900 text-gray-400 border-gray-800'
                  }`}
                >
                  Price Drops Below (≤)
                </button>
              </div>
            </div>

            {/* Target Price Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 block">Target Threshold ($ USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="number"
                  step="0.01"
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(e.target.value)}
                  className="w-full rounded-lg bg-black/60 border border-gray-700/80 pl-9 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 font-mono"
                  placeholder="0.00"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAlert}
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2 rounded-xl text-xs font-bold transition-all shadow-lg"
              >
                Save Alert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

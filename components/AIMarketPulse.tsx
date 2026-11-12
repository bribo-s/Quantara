'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, TrendingUp, Cpu, Gauge, ArrowUpRight } from 'lucide-react';

export default function AIMarketPulse() {
  const trendingTickers = [
    { symbol: 'NVDA', name: 'NVIDIA', change: '+3.8%' },
    { symbol: 'PLTR', name: 'Palantir', change: '+5.2%' },
    { symbol: 'AAPL', name: 'Apple', change: '+1.4%' },
    { symbol: 'TSLA', name: 'Tesla', change: '+2.9%' },
    { symbol: 'MSFT', name: 'Microsoft', change: '+1.1%' },
  ];

  return (
    <div className="w-full rounded-2xl border border-gray-800 bg-gradient-to-r from-[#0d111a] via-[#0f1422] to-[#0a0d14] p-5 md:p-6 shadow-2xl space-y-4">
      {/* Top row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/30">
            <Sparkles className="h-4 w-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">Quantara AI™ Market Pulse</h2>
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live AI Analysis
              </span>
            </div>
            <p className="text-xs text-gray-400">Real-time macro equity sentiment, catalyst tracking & sector rotation</p>
          </div>
        </div>

        {/* Macro Badges */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 rounded-lg bg-gray-900/90 px-3 py-1.5 border border-gray-800 text-xs">
            <Gauge className="h-3.5 w-3.5 text-yellow-400" />
            <span className="text-gray-400">Sentiment:</span>
            <span className="font-bold text-emerald-400">Greed (74/100)</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 rounded-lg bg-gray-900/90 px-3 py-1.5 border border-gray-800 text-xs">
            <Cpu className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-gray-400">Leading:</span>
            <span className="font-bold text-white">AI Semiconductors</span>
          </div>
        </div>
      </div>

      {/* AI Narrative */}
      <div className="rounded-xl bg-black/40 p-3.5 border border-gray-800/80 text-xs md:text-sm text-gray-300 leading-relaxed">
        <span className="font-semibold text-yellow-400 mr-1.5">AI Synthesis:</span>
        Equity markets demonstrate bullish momentum driven by accelerating enterprise AI hyperscaler capital expenditures and resilient consumer metrics. Megacap technology and semiconductor balance sheets continue to command high institutional inflows amid favorable yield curve stability.
      </div>

      {/* Quick Access Trending Tickers */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs text-gray-400 font-medium mr-1">High AI Interest:</span>
        {trendingTickers.map((t) => (
          <Link
            key={t.symbol}
            href={`/stocks/${t.symbol}`}
            className="flex items-center gap-1.5 rounded-lg bg-gray-900/80 hover:bg-yellow-500/10 hover:border-yellow-500/40 px-2.5 py-1 text-xs text-gray-300 hover:text-yellow-400 border border-gray-800 transition-all duration-200"
          >
            <span className="font-bold text-white">{t.symbol}</span>
            <span className="text-emerald-400 text-[11px] font-semibold">{t.change}</span>
            <ArrowUpRight className="h-3 w-3 text-gray-500" />
          </Link>
        ))}
      </div>
    </div>
  );
}

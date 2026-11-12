'use client';

import React, { useState } from 'react';
import { type AIInsightData, askStockAI } from '@/lib/actions/ai.actions';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2, Send, Bot, ShieldAlert, Target } from 'lucide-react';

interface AIStockInsightsProps {
  insights: AIInsightData;
}

export default function AIStockInsights({ insights }: AIStockInsightsProps) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ q: string; a: string }>>([]);

  const handleAsk = async (presetPrompt?: string) => {
    const q = presetPrompt || question;
    if (!q.trim() || loading) return;

    setLoading(true);
    try {
      const answer = await askStockAI(insights.symbol, q);
      setChatHistory((prev) => [...prev, { q, a: answer }]);
      if (!presetPrompt) setQuestion('');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getRecBadgeColor = (rec: AIInsightData['recommendation']) => {
    switch (rec) {
      case 'STRONG BUY':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'BUY':
        return 'bg-green-500/20 text-green-400 border-green-500/40';
      case 'HOLD':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
      case 'SELL':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
    }
  };

  return (
    <div className="rounded-xl border border-gray-800 bg-[#0d111a] p-6 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500 ring-1 ring-yellow-500/30">
            <Sparkles className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">Signalist AI™ Intelligence</h3>
              <span className="rounded-full bg-yellow-500/10 px-2.5 py-0.5 text-xs font-semibold text-yellow-400 border border-yellow-500/20">
                {insights.modelUsed}
              </span>
            </div>
            <p className="text-xs text-gray-400">Institutional-grade synthesis & sentiment analytics for {insights.symbol}</p>
          </div>
        </div>

        {/* Target Price */}
        <div className="flex items-center gap-2 rounded-lg bg-gray-900/80 px-3.5 py-1.5 border border-gray-800">
          <Target className="h-4 w-4 text-emerald-400" />
          <span className="text-xs text-gray-400">12M Target:</span>
          <span className="text-sm font-bold text-white">{insights.targetPrice}</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-lg bg-gray-900/60 p-3 border border-gray-800/60">
          <span className="text-xs text-gray-400 block mb-1">Recommendation</span>
          <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold border ${getRecBadgeColor(insights.recommendation)}`}>
            {insights.recommendation}
          </span>
        </div>

        <div className="rounded-lg bg-gray-900/60 p-3 border border-gray-800/60">
          <span className="text-xs text-gray-400 block mb-1">AI Confidence</span>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-white">{insights.confidenceScore}%</span>
            <div className="h-1.5 flex-1 rounded-full bg-gray-800 overflow-hidden">
              <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${insights.confidenceScore}%` }} />
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-900/60 p-3 border border-gray-800/60">
          <span className="text-xs text-gray-400 block mb-1">Sentiment Score</span>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-emerald-400">{insights.sentimentScore}/100</span>
            <span className="text-xs text-gray-400">({insights.sentiment})</span>
          </div>
        </div>

        <div className="rounded-lg bg-gray-900/60 p-3 border border-gray-800/60">
          <span className="text-xs text-gray-400 block mb-1">Risk Assessment</span>
          <span className="text-sm font-semibold text-gray-200 flex items-center gap-1.5">
            <ShieldAlert className="h-4 w-4 text-yellow-500" />
            {insights.riskLevel} Risk
          </span>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="rounded-lg bg-gradient-to-r from-gray-900/90 to-gray-900/40 p-4 border border-gray-800/80">
        <h4 className="text-xs font-bold uppercase tracking-wider text-yellow-500 mb-2">Executive Summary</h4>
        <p className="text-sm text-gray-300 leading-relaxed">{insights.summary}</p>
      </div>

      {/* Bull vs Bear Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bull Case */}
        <div className="rounded-lg bg-emerald-950/15 p-4 border border-emerald-900/30 space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
            <TrendingUp className="h-4 w-4" />
            <span>Bullish Growth Catalysts</span>
          </div>
          <ul className="space-y-2">
            {insights.bullCase.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-gray-300 leading-relaxed">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bear Case */}
        <div className="rounded-lg bg-rose-950/15 p-4 border border-rose-900/30 space-y-2.5">
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
            <AlertTriangle className="h-4 w-4" />
            <span>Key Downside Risks</span>
          </div>
          <ul className="space-y-2">
            {insights.bearCase.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-gray-300 leading-relaxed">
                <AlertTriangle className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive AI Chat */}
      <div className="rounded-lg bg-gray-900/80 p-4 border border-gray-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
          <Bot className="h-4 w-4 text-yellow-500" />
          <span>Ask Signalist AI about ${insights.symbol}</span>
        </div>

        {/* Suggested Quick Prompts */}
        <div className="flex flex-wrap gap-2">
          {['What are the biggest risks?', 'Explain upcoming catalysts', 'Is current valuation stretched?'].map((p, i) => (
            <button
              key={i}
              onClick={() => handleAsk(p)}
              disabled={loading}
              className="text-xs bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 px-3 py-1 rounded-full transition-colors border border-gray-700/60"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Q&A Stream */}
        {chatHistory.length > 0 && (
          <div className="space-y-3 pt-2 max-h-60 overflow-y-auto">
            {chatHistory.map((item, index) => (
              <div key={index} className="space-y-1.5 text-xs">
                <div className="font-semibold text-yellow-400 flex items-center gap-1.5">
                  <span>Q:</span> {item.q}
                </div>
                <div className="rounded-md bg-[#0a0d14] p-3 text-gray-300 border border-gray-800/80 leading-relaxed">
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Input Form */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
            placeholder={`Ask a custom question about ${insights.symbol}...`}
            className="flex-1 bg-black/50 border border-gray-700/80 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500"
          />
          <button
            onClick={() => handleAsk()}
            disabled={loading || !question.trim()}
            className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-black px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            {loading ? (
              <span className="inline-block animate-spin">⟳</span>
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            <span>Ask</span>
          </button>
        </div>
      </div>
    </div>
  );
}

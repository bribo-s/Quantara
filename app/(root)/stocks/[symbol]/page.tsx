import TradingViewWidget from "@/components/TradingViewWidget";
import WatchlistButton from "@/components/WatchlistButton";
import AIStockInsights from "@/components/AIStockInsights";
import { getStockAIInsights } from "@/lib/actions/ai.actions";
import {
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
} from "@/lib/constants";

export default async function StockDetails({ params }: StockDetailsPageProps) {
  const { symbol } = await params;
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  // Fetch AI Insights in parallel
  const aiInsights = await getStockAIInsights(symbol);

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6 lg:p-8 gap-8">
      {/* Top Banner / AI Section */}
      <AIStockInsights insights={aiInsights} />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Left column - Live Charts */}
        <div className="flex flex-col gap-6">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}symbol-info.js`}
            config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
            height={170}
          />

          <TradingViewWidget
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
            className="custom-chart"
            height={600}
          />

          <TradingViewWidget
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={BASELINE_WIDGET_CONFIG(symbol)}
            className="custom-chart"
            height={600}
          />
        </div>

        {/* Right column - Technicals & Fundamentals */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between bg-[#0d111a] p-4 rounded-xl border border-gray-800">
            <div>
              <span className="text-xs text-gray-400 block">Symbol Tracking</span>
              <span className="text-sm font-bold text-white">{symbol.toUpperCase()}</span>
            </div>
            <WatchlistButton symbol={symbol.toUpperCase()} company={symbol.toUpperCase()} isInWatchlist={false} />
          </div>

          <TradingViewWidget
            scriptUrl={`${scriptUrl}technical-analysis.js`}
            config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
            height={400}
          />

          <TradingViewWidget
            scriptUrl={`${scriptUrl}company-profile.js`}
            config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
            height={440}
          />

          <TradingViewWidget
            scriptUrl={`${scriptUrl}financials.js`}
            config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
            height={464}
          />
        </div>
      </section>
    </div>
  );
}

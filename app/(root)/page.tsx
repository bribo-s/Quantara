import TradingViewWidget from "@/components/TradingViewWidget";
import AIMarketPulse from "@/components/AIMarketPulse";
import {
    HEATMAP_WIDGET_CONFIG,
    MARKET_DATA_WIDGET_CONFIG,
    MARKET_OVERVIEW_WIDGET_CONFIG,
    TOP_STORIES_WIDGET_CONFIG
} from "@/lib/constants";

const Home = () => {
    const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

    return (
        <div className="flex flex-col min-h-screen gap-8">
          {/* AI Market Pulse Header Banner */}
          <AIMarketPulse />

          <section className="grid w-full gap-8 grid-cols-1 xl:grid-cols-3">
              <div className="xl:col-span-1">
                  <TradingViewWidget
                    title="Market Overview"
                    scriptUrl={`${scriptUrl}market-overview.js`}
                    config={MARKET_OVERVIEW_WIDGET_CONFIG}
                    className="custom-chart"
                    height={600}
                  />
              </div>
              <div className="xl:col-span-2">
                  <TradingViewWidget
                      title="Stock Heatmap"
                      scriptUrl={`${scriptUrl}stock-heatmap.js`}
                      config={HEATMAP_WIDGET_CONFIG}
                      height={600}
                  />
              </div>
          </section>

          <section className="grid w-full gap-8 grid-cols-1 xl:grid-cols-3">
              <div className="h-full xl:col-span-1">
                  <TradingViewWidget
                      scriptUrl={`${scriptUrl}timeline.js`}
                      config={TOP_STORIES_WIDGET_CONFIG}
                      height={600}
                  />
              </div>
              <div className="h-full xl:col-span-2">
                  <TradingViewWidget
                      scriptUrl={`${scriptUrl}market-quotes.js`}
                      config={MARKET_DATA_WIDGET_CONFIG}
                      height={600}
                  />
              </div>
          </section>
        </div>
    )
}

export default Home;

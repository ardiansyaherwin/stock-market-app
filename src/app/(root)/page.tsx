import { TradingViewWidget } from "@/components/molecules/trading-view-widget";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";

const SCRIPT_BASE_URL =
  "https://s3.tradingview.com/external-embedding/embed-widget";

const Home = () => {
  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid w-full gap-8 home-section">
        <div className="md:col-span-1">
          <TradingViewWidget
            title="Market Overview"
            scriptUrl={`${SCRIPT_BASE_URL}-market-overview.js`}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            className="custom-chart"
            height={600}
          />
        </div>

        <div className="xl:col-span-2">
          <TradingViewWidget
            title="Stock Heatmap"
            scriptUrl={`${SCRIPT_BASE_URL}-stock-heatmap.js`}
            config={HEATMAP_WIDGET_CONFIG}
            className="custom-chart"
            height={600}
          />
        </div>
      </section>

      <section className="grid w-full gap-8 home-section">
        <div className="h-full col-span-1">
          <TradingViewWidget
            scriptUrl={`${SCRIPT_BASE_URL}-timeline.js`}
            config={TOP_STORIES_WIDGET_CONFIG}
            height={600}
          />
        </div>

        <div className="h-full xl:col-span-2">
          <TradingViewWidget
            scriptUrl={`${SCRIPT_BASE_URL}-market-quotes.js`}
            config={MARKET_DATA_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;

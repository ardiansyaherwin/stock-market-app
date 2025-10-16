import {
  TradingViewChardId,
  TradingViewWidget,
} from "@/components/molecules/trading-view-widget";
import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
} from "@/lib/constants";

const Home = () => {
  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid w-full gap-8 home-section">
        <div className="md:col-span-1">
          <TradingViewWidget
            title="Market Overview"
            chartId={TradingViewChardId.MARKET_OVERVIEW}
            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            className="custom-chart"
            height={600}
          />
        </div>

        <div className="xl:col-span-2">
          <TradingViewWidget
            title="Stock Heatmap"
            chartId={TradingViewChardId.STOCK_HEATMAP}
            config={HEATMAP_WIDGET_CONFIG}
            className="custom-chart"
            height={600}
          />
        </div>
      </section>

      <section className="grid w-full gap-8 home-section">
        <div className="h-full col-span-1">
          <TradingViewWidget
            chartId={TradingViewChardId.TIMELINE}
            config={TOP_STORIES_WIDGET_CONFIG}
            height={600}
          />
        </div>

        <div className="h-full xl:col-span-2">
          <TradingViewWidget
            chartId={TradingViewChardId.MARKET_QUOTES}
            config={MARKET_DATA_WIDGET_CONFIG}
            height={600}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;

"use client";
import { memo } from "react";
import { useTradingViewWidget } from "@/hooks/use-trading-view-widget";
import type { TradingViewChartIdEnum } from "@/lib/enum";
import { cn } from "@/lib/utils";

interface TradingViewWidgetProps {
  title?: string;
  chartId: TradingViewChartIdEnum;
  config: Record<string, unknown>;
  height?: number;
  className?: string;
}

const TradingViewWidget = memo(
  ({ title, chartId, config, height, className }: TradingViewWidgetProps) => {
    const containerRef = useTradingViewWidget(chartId, config, height);

    return (
      <>
        <div className="w-full">
          {title && (
            <h3 className="font-semibold text-2xl text-gray-100 mb-5">
              {title}
            </h3>
          )}
        </div>
        <div
          className={cn("tradingview-widget-container", className)}
          ref={containerRef}
        >
          <div
            className="tradingview-widget-container__widget"
            style={{ height, width: "100%" }}
          />
        </div>
      </>
    );
  },
);

export { TradingViewWidget };

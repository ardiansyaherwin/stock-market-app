"use client";

import { useEffect, useMemo, useRef } from "react";

const SCRIPT_BASE_URL =
  "https://s3.tradingview.com/external-embedding/embed-widget";

const useTradingViewWidget = (
  chartId: string,
  config: Record<string, unknown>,
  height = 600,
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Create a stable identifier for the config object to prevent infinite re-renders
  const configString = useMemo(() => {
    return JSON.stringify(config);
  }, [config]);

  useEffect(() => {
    // if not exist or dataset already loaded, do nothing.
    if (!containerRef.current || containerRef.current.dataset.loaded) return;

    containerRef.current.innerHTML = `<div class="tradingview-widget-container__widget" style="width: 100%; height: ${height}px"></div>`;

    const script = document.createElement("script");
    script.src = `${SCRIPT_BASE_URL}-${chartId}.js`;
    script.async = true;
    script.innerHTML = configString;

    containerRef.current.appendChild(script);
    containerRef.current.dataset.loaded = "true";

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        delete containerRef.current.dataset.loaded;
      }
    };
  }, [chartId, configString, height]);

  return containerRef;
};

export { useTradingViewWidget };

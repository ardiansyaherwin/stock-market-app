"use client";

import { useEffect, useMemo, useRef } from "react";

const useTradingViewWidget = (
  scriptUrl: string,
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
    script.src = scriptUrl;
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
  }, [scriptUrl, configString, height]);

  return containerRef;
};

export { useTradingViewWidget };

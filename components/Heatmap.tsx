import Script from "next/script";

// Session-recording / heatmap telemetry. Renders nothing until
// NEXT_PUBLIC_HEATMAP_ID is set (same gating discipline as GoogleAnalytics +
// Metricool), so local/preview builds without the id stay clean.
//
// Provider defaults to Microsoft Clarity. Set NEXT_PUBLIC_HEATMAP_PROVIDER to
// "hotjar" to emit the Hotjar bootstrap instead. The id is the Clarity project
// id (e.g. "abcdef1234") or the Hotjar site id (numeric).
const HEATMAP_ID = process.env.NEXT_PUBLIC_HEATMAP_ID?.trim();
const HEATMAP_PROVIDER = (
  process.env.NEXT_PUBLIC_HEATMAP_PROVIDER?.trim() || "clarity"
).toLowerCase();

export type HeatmapProvider = "clarity" | "hotjar";

export function buildClarityInlineScript(id: string) {
  return `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", ${JSON.stringify(id)});
          `;
}

export function buildHotjarInlineScript(id: string) {
  return `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${JSON.stringify(id)},hjsv:6};
              a=o.getElementsByTagName("head")[0];
              r=o.createElement("script");r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
          `;
}

export function buildHeatmapInlineScript(id: string, provider: string) {
  return provider === "hotjar"
    ? buildHotjarInlineScript(id)
    : buildClarityInlineScript(id);
}

export function Heatmap() {
  if (!HEATMAP_ID) {
    return null;
  }

  return (
    <Script
      id="heatmap-telemetry"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: buildHeatmapInlineScript(HEATMAP_ID, HEATMAP_PROVIDER),
      }}
    />
  );
}

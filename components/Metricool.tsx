import Script from "next/script";

// Metricool site tracking. Renders nothing until NEXT_PUBLIC_METRICOOL_HASH is
// set (same gating discipline as GoogleAnalytics), so local/preview builds
// without the hash stay clean. The hash is the per-brand tracker id from the
// Metricool "Brand > Connect web" panel.
const METRICOOL_HASH = process.env.NEXT_PUBLIC_METRICOOL_HASH?.trim();

export function buildMetricoolInlineScript(hash: string) {
  return `
            function loadScript(a){var b=document.getElementsByTagName("head")[0],c=document.createElement("script");c.type="text/javascript",c.src="https://tracker.metricool.com/resources/be.js",c.onreadystatechange=a,c.onload=a,b.appendChild(c)}
            loadScript(function(){beTracker.t({hash:${JSON.stringify(hash)}})});
          `;
}

export function Metricool() {
  if (!METRICOOL_HASH) {
    return null;
  }

  return (
    <Script
      id="metricool-tracker"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: buildMetricoolInlineScript(METRICOOL_HASH),
      }}
    />
  );
}

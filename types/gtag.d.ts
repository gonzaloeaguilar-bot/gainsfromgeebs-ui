// GA4's gtag() is injected at runtime by the analytics snippet, so TypeScript
// has no knowledge of it. Declaring it here keeps call sites honest — a plain
// `window.gtag(...)` type-checks — instead of forcing an `as any` cast at every
// analytics call, which is what previously broke the production build.

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "js" | "set" | "consent",
      targetIdOrEventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export {};

export function trackEvent(eventName: string, properties: Record<string, unknown> = {}) {
  if (import.meta.env.VITE_ENABLE_ANALYTICS !== "true") {
    return;
  }

  console.info("[analytics]", eventName, properties);
}

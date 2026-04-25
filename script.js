const UMAMI_WEBSITE_ID = "6d3c10f0-3ed1-4762-87a9-aad7e6c91e49";

const IS_PRODUCTION_SITE =
  window.location.protocol === "https:" &&
  window.location.hostname === "nooneart.github.io" &&
  (window.location.pathname === "/links" ||
    window.location.pathname.startsWith("/links/"));

function initUmamiAnalytics(websiteId) {
  if (!websiteId) return;

  const script = document.createElement("script");
  script.defer = true;
  script.src = "https://cloud.umami.is/script.js";
  script.dataset.websiteId = websiteId;
  script.dataset.domains = "nooneart.github.io";
  script.dataset.doNotTrack = "true";
  document.head.appendChild(script);
}

function trackEvent(eventName, params = {}) {
  if (!window.umami || typeof window.umami.track !== "function") return;

  window.umami.track(eventName, params);
}

function initLinkTracking() {
  document.querySelectorAll("[data-analytics-event]").forEach((element) => {
    element.addEventListener("click", () => {
      trackEvent(element.dataset.analyticsEvent, {
        link_name: element.dataset.analyticsName || element.textContent.trim(),
        link_url: element.href || "",
        link_location: element.dataset.analyticsLocation || "",
      });
    });
  });
}

if (IS_PRODUCTION_SITE) {
  initUmamiAnalytics(UMAMI_WEBSITE_ID.trim());
  initLinkTracking();
}

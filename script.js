const SITE_CONFIG = {
  seo: {
    title: "NoOne - Links",
    description: "3D character artist focused on stylized characters.\nCreating fanart and original characters in Blender.",
    image: "assets/avatar.png",
    url: ""
  },
  analytics: {
    measurementId: ""
  },
  profile: {
    name: "NoOne3D",
    subtitle: "3D Artist",
    bio: "3D character artist focused on stylized characters.\nCreating fanart and original characters in Blender.",
    avatarUrl: "assets/avatar.png",
    avatarFallback: "N"
  },
  links: [
    {
      title: "X",
      description: "Posts and updates",
      url: "https://x.com/NoOne3DArt",
      iconSrc: "assets/icons/x-mark.svg",
      iconAlt: "X icon"
    },
    {
      title: "Pixiv",
      description: "Illustrations and art uploads",
      url: "https://www.pixiv.net/en/users/121886393",
      iconSrc: "assets/icons/pixiv-mark.svg",
      iconAlt: "Pixiv icon"
    },
    {
      title: "Patreon",
      description: "Support and exclusive posts",
      url: "https://patreon.com/NoOne3D",
      iconSrc: "assets/icons/patreon-mark.svg",
      iconAlt: "Patreon icon"
    },
    {
      title: "ArtStation",
      description: "Coming soon",
      url: "#",
      iconSrc: "assets/icons/artstation-mark.svg",
      iconAlt: "ArtStation icon",
      disabled: true
    }
  ],
  socials: [
    {
      label: "X",
      url: "https://x.com/NoOne3DArt",
      iconSrc: "assets/icons/x-mark.svg",
      iconAlt: "X icon"
    },
    {
      label: "Pixiv",
      url: "https://www.pixiv.net/en/users/121886393",
      iconSrc: "assets/icons/pixiv-mark.svg",
      iconAlt: "Pixiv icon"
    },
    {
      label: "Patreon",
      url: "https://patreon.com/NoOne3D",
      iconSrc: "assets/icons/patreon-mark.svg",
      iconAlt: "Patreon icon"
    }
  ],
  footerText: "Powered by art and code"
};

function initGoogleAnalytics(measurementId) {
  if (!measurementId) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId);
}

function setSeo() {
  const seo = SITE_CONFIG.seo || {};
  const title = seo.title || "Links";
  const description = seo.description || "";
  const image = seo.image || SITE_CONFIG.profile.avatarUrl || "";
  const url = seo.url || window.location.href;

  document.title = title;

  const metaDescription = document.querySelector('meta[name="description"]');
  setMetaContent('meta[name="description"]', description);
  setMetaContent('meta[property="og:title"]', title);
  setMetaContent('meta[property="og:description"]', description);
  setMetaContent('meta[property="og:image"]', image);
  setMetaContent('meta[property="og:url"]', url);
  setMetaContent('meta[name="twitter:title"]', title);
  setMetaContent('meta[name="twitter:description"]', description);
  setMetaContent('meta[name="twitter:image"]', image);
}

function setMetaContent(selector, content) {
  const element = document.querySelector(selector);
  if (element && content) {
    element.setAttribute("content", content);
  }
}

function renderProfile() {
  document.getElementById("name").textContent = SITE_CONFIG.profile.name || "";
  document.getElementById("subtitle").textContent = SITE_CONFIG.profile.subtitle || "";
  document.getElementById("bio").textContent = SITE_CONFIG.profile.bio || "";
  document.getElementById("footerText").textContent = SITE_CONFIG.footerText || "";

  const avatarMount = document.getElementById("avatarMount");
  avatarMount.innerHTML = "";

  if (SITE_CONFIG.profile.avatarUrl) {
    const img = document.createElement("img");
    img.className = "avatar";
    img.src = SITE_CONFIG.profile.avatarUrl;
    img.alt = SITE_CONFIG.profile.name || "Avatar";
    avatarMount.appendChild(img);
    return;
  }

  const fallback = document.createElement("div");
  fallback.className = "avatar-fallback";
  fallback.textContent = SITE_CONFIG.profile.avatarFallback || "?";
  avatarMount.appendChild(fallback);
}

function buildLinkCard(link) {
  const isDisabled = Boolean(link.disabled);
  const element = document.createElement(isDisabled ? "div" : "a");
  element.className = `link-btn${isDisabled ? " is-disabled" : ""}`;

  if (!isDisabled) {
    element.href = link.url || "#";

    const isExternal = typeof link.url === "string" && /^(https?:)?\/\//.test(link.url);
    element.target = isExternal ? "_blank" : "_self";
    element.rel = isExternal ? "noopener noreferrer" : "";
  } else {
    element.setAttribute("aria-disabled", "true");
  }

  element.innerHTML = `
    <div class="link-left">
      <div class="link-icon">
        ${buildIconMarkup(link.iconSrc, link.iconAlt, link.title)}
      </div>
      <div class="link-text">
        <p class="link-title">${link.title || ""}</p>
        <p class="link-desc">${link.description || ""}</p>
      </div>
    </div>
  `;

  return element;
}

function buildIconMarkup(iconSrc, iconAlt, fallbackLabel) {
  if (iconSrc) {
    const altText = escapeHtml(iconAlt || fallbackLabel || "Logo");
    return `<img class="brand-icon" src="${iconSrc}" alt="${altText}" />`;
  }

  return `<span class="brand-fallback">${escapeHtml(fallbackLabel || "*")}</span>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderLinks() {
  const root = document.getElementById("links");
  root.innerHTML = "";

  for (const link of SITE_CONFIG.links) {
    root.appendChild(buildLinkCard(link));
  }
}

function renderSocials() {
  const root = document.getElementById("socials");
  root.innerHTML = "";

  if (!SITE_CONFIG.socials.length) {
    root.hidden = true;
    return;
  }

  root.hidden = false;

  for (const social of SITE_CONFIG.socials) {
    const a = document.createElement("a");
    a.className = "social";
    a.href = social.url || "#";

    const isExternal = typeof social.url === "string" && /^(https?:)?\/\//.test(social.url);
    a.target = isExternal ? "_blank" : "_self";
    a.rel = isExternal ? "noopener noreferrer" : "";
    a.setAttribute("aria-label", social.label || "Social link");
    a.title = social.label || "";
    a.innerHTML = buildIconMarkup(social.iconSrc, social.iconAlt, social.label);

    root.appendChild(a);
  }
}

function initSite() {
  setSeo();
  renderProfile();
  renderLinks();
  renderSocials();
  initGoogleAnalytics(SITE_CONFIG.analytics.measurementId.trim());
}

initSite();

const pendingEmailKey = "portfolioBlogPendingEmail";
const pendingNameKey = "portfolioBlogPendingName";
const sessionStartedAtKey = "portfolioStorySessionStartedAt";
const sessionMaxAgeMs = 7 * 24 * 60 * 60 * 1000;

export function savePendingBlogIdentity(name: string, email: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(pendingEmailKey, email);
  window.localStorage.setItem(pendingNameKey, name);
}

export function getPendingBlogIdentity() {
  if (typeof window === "undefined") {
    return { name: "", email: "" };
  }

  return {
    name: window.localStorage.getItem(pendingNameKey) ?? "",
    email: window.localStorage.getItem(pendingEmailKey) ?? "",
  };
}

export function clearPendingBlogIdentity() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(pendingEmailKey);
  window.localStorage.removeItem(pendingNameKey);
}

export function markStorySessionStarted() {
  window.localStorage.setItem(sessionStartedAtKey, String(Date.now()));
}

export function ensureStorySessionStarted() {
  if (typeof window === "undefined") {
    return;
  }

  if (!window.localStorage.getItem(sessionStartedAtKey)) {
    markStorySessionStarted();
  }
}

export function clearStorySession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(sessionStartedAtKey);
}

export function isStorySessionExpired() {
  if (typeof window === "undefined") {
    return false;
  }

  const startedAt = Number(window.localStorage.getItem(sessionStartedAtKey));
  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return false;
  }

  return Date.now() - startedAt > sessionMaxAgeMs;
}

"use client";

import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { firebaseApp } from "@/config/firebase";

let analyticsPromise: Promise<Analytics | null> | null = null;

export function getFirebaseAnalytics() {
  if (!firebaseApp?.options.measurementId) {
    return Promise.resolve(null);
  }

  const app = firebaseApp;
  analyticsPromise ??= isSupported()
    .then((supported) => (supported ? getAnalytics(app) : null))
    .catch(() => null);

  return analyticsPromise;
}

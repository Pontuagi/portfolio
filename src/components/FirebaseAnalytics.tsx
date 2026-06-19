"use client";

import { useEffect } from "react";
import { getFirebaseAnalytics } from "@/services/analytics/firebaseAnalytics";

export function FirebaseAnalytics() {
  useEffect(() => {
    void getFirebaseAnalytics();
  }, []);

  return null;
}

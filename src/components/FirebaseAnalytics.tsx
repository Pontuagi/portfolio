"use client";

import { useEffect } from "react";
import { getFirebaseAnalytics } from "@/lib/firebaseAnalytics";

export function FirebaseAnalytics() {
  useEffect(() => {
    void getFirebaseAnalytics();
  }, []);

  return null;
}

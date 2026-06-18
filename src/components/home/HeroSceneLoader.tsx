"use client";

import dynamic from "next/dynamic";
import { Hero3DFallback } from "@/components/home/Hero3DFallback";

const HeroScene = dynamic(() => import("@/components/home/HeroScene"), {
  ssr: false,
  loading: () => <Hero3DFallback />,
});

export function HeroSceneLoader() {
  return <HeroScene />;
}

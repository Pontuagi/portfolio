import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Kipkoech Benedict | Full-Stack Software Engineer",
  description:
    "A story-driven portfolio for Kipkoech Benedict, a full-stack software engineer building web, mobile, and backend systems.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <FirebaseAnalytics />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

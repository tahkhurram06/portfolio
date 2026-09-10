import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import HexGridBackground from "../components/BackGround/HexGridBackground";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { themeInitScript } from "../lib/themeScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-nine-rouge-86.vercel.app"),

  title: {
    default: "Taha Khurram — Full Stack Developer",
    template: "%s | Taha Khurram",
  },
  description:
    "Portfolio of Taha Khurram, a full-stack developer based in Karachi crafting scalable, pixel-perfect web experiences with React, Next.js, and TypeScript.",
  keywords: [
    "Taha Khurram",
    "Full Stack Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer Karachi",
    "Portfolio",
  ],
  authors: [{ name: "Taha Khurram" }],
  creator: "Taha Khurram",
  openGraph: {
    title: "Taha Khurram — Full Stack Developer",
    description:
      "Portfolio of Taha Khurram, a full-stack developer based in Karachi crafting scalable, pixel-perfect web experiences.",
    siteName: "Taha Khurram",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taha Khurram — Full Stack Developer",
    description:
      "Portfolio of Taha Khurram, a full-stack developer based in Karachi crafting scalable, pixel-perfect web experiences.",
  },
};

// React 19 + Next.js 16.2+ emit a false-positive dev warning for any
// inline <script> rendered via next/script's beforeInteractive
// strategy ("Encountered a script tag while rendering React
// component..."). The script still runs correctly during SSR — this
// is purely a noisy console/overlay message in development, tracked
// upstream (e.g. pacocoursey/next-themes#385, shadcn-ui/ui#10104).
// Filtering it here keeps the dev overlay useful for real errors.
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes(
        "Encountered a script tag while rendering React component",
      )
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-full flex flex-col">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <HexGridBackground />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

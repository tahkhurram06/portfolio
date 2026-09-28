import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import HexGridBackground from "../components/BackGround/HexGridBackground";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import PageLoader from "../components/PageLoader/PageLoader";
import DevConsoleFilter from "../components/DevConsoleFilter/DevConsoleFilter";
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
  metadataBase: new URL("https://taha-khurram.vercel.app"),

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-full flex flex-col">
        <DevConsoleFilter />
        <PageLoader />
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
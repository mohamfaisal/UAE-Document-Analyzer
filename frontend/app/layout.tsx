"use client";

import React, { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Force Next.js to wait until the page is fully mounted on your actual browser 
  // before running any DOM structural alignment checks
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body 
        className="min-h-full flex flex-col bg-[#020617]" 
        suppressHydrationWarning={true}
      >
        {mounted ? children : (
          // Clean, ultra-premium matching background fallback while loading to avoid layout flickering
          <div className="min-h-screen bg-[#020617] w-full" />
        )}
      </body>
    </html>
  );
}
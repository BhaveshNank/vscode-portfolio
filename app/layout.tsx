import type { Metadata } from "next";
import "./globals.css";
import "./mobile.css";
import { Analytics } from "@vercel/analytics/react";
import MobileWarning from "./components/MobileWarning";

export const metadata: Metadata = {
  title: "Bhavesh Nankani | Portfolio",
  description: "Full-Stack Software Engineer - Interactive VS Code themed portfolio showcasing projects and experience",
  icons: {
    icon: '/vs-code-logo.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-vscode-bg font-sans">
        <MobileWarning />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

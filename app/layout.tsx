import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Codex + Claude Code — Setup Guide",
  description: "How to install and use the Codex plugin for Claude Code on a remote Coder environment.",
  openGraph: {
    title: "Codex + Claude Code — Setup Guide",
    description: "How to install and use the Codex plugin for Claude Code on a remote Coder environment.",
    images: [{ url: "/share-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Codex + Claude Code — Setup Guide",
    description: "How to install and use the Codex plugin for Claude Code on a remote Coder environment.",
    images: ["/share-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

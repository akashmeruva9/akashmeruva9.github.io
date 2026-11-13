import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { resume } from "@/content/site";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

const title = `${resume.name} · ${resume.role}`;
const description = `${resume.name} — ${resume.role} at ${resume.company}. ${resume.summary}`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Akash Meruva",
    "Software Development Engineer",
    "Autodesk",
    "Agentic AI",
    "LangGraph",
    "Multi-agent systems",
    "SAOMA",
    "StoreboxAI",
    "DNSQ",
  ],
  authors: [{ name: resume.name }],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: resume.name,
    url: "https://akashmeruva.in",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${sans.variable} ${mono.variable} font-sans bg-[#0a0a0c] text-[#f4f4f5] antialiased selection:bg-neutral-800 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}

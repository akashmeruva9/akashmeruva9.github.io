import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

const title = `${site.name} · ${site.role}`;
const description =
  "Software Development Engineer at Autodesk building autonomous multi-agent systems — self-remediating infrastructure, agentic DNS operations, and manifest-driven platforms.";

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
  ],
  authors: [{ name: site.name }],
  openGraph: { title, description, type: "website", siteName: site.name },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Gates the scroll-reveal styles: without JS nothing is ever hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
      </head>
      <body className={`${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}

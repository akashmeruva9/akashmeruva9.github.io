// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE. Everything the site renders comes from here.
// ─────────────────────────────────────────────────────────────

// basePath is not applied to plain <a href> / <img src>, only to next/link and
// next/image — so files served straight out of public/ need it prefixed here.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const site = {
  name: "Akash Meruva",
  handle: "akash.meruva",
  role: "Software Development Engineer",
  company: "Autodesk",
  location: "Bangalore, India",
  status: "Building AI agents at Autodesk",
  email: "akash.meruva2003@gmail.com",
  resumeUrl: `${base}/Akash_Meruva_Resume.pdf`,
  socials: [
    { label: "GitHub", href: "https://github.com/akashmeruva9" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/akash-meruva-ab1420222",
    },
    { label: "Email", href: "mailto:akash.meruva2003@gmail.com" },
  ],
} as const;

type HeroFragment = { text: string; accent?: boolean };

// The hero headline. `accent` is the coral-highlighted tail.
export const hero: {
  lines: string[];
  accent: string;
  body: HeroFragment[];
} = {
  lines: ["I build agents that", "run production,"],
  accent: "not demos.",
  // Fragments marked `accent: true` render in the highlight color.
  body: [
    { text: "I ship " },
    { text: "autonomous systems", accent: true },
    {
      text: " that own real operational surface — servers that heal themselves, DNS that answers in Slack, ",
    },
    { text: "multi-agent runtimes", accent: true },
    {
      text: " that replace dashboards. If it has to hold up at enterprise scale, ",
    },
    { text: "I'll own it end to end", accent: true },
    { text: "." },
  ],
};

export type Project = {
  title: string;
  blurb: string;
  detail: string;
  stack: string[];
  year: string;
  status?: string;
  href?: string;
  repo?: string;
  // Fake browser-chrome label + the mono lines rendered inside the card preview.
  window: string;
  preview: string[];
};

export const projects: Project[] = [
  {
    title: "SAOMA",
    blurb: "Servers that maintain and heal themselves",
    detail:
      "An autonomous AI workflow maintaining and self-remediating 15+ servers behind Storebox, Autodesk's desktop build lifecycle and management platform. Saves $20,400/year and 75 engineer-hours a month.",
    stack: ["Python", "LangGraph", "AWS"],
    year: "2025",
    status: "In production at Autodesk",
    window: "saoma · self-remediation",
    preview: [
      "▸ health sweep     15 hosts",
      "▸ anomaly          disk 94%",
      "▸ remediate        auto ✓",
      "$20,400/yr · 75 hrs/mo",
    ],
  },
  {
    title: "StoreboxAI",
    blurb: "10 agents answering Filer questions in Slack",
    detail:
      "A hierarchical multi-agent chat agent — 10 specialised agents coordinating in Slack for real-time Filer insights and health monitoring. Cut daily monitoring from 6 hours to 1.",
    stack: ["LangGraph", "Slack", "RAG"],
    year: "2025",
    status: "In production at Autodesk",
    window: "storebox-ai · slack",
    preview: [
      "@storebox filer health?",
      "├─ router → 3 agents",
      "├─ metrics · logs · docs",
      "6 hrs → 1 hr daily",
    ],
  },
  {
    title: "DNSQ",
    blurb: "DNS operations as a conversation",
    detail:
      "An AI agent for DNS operations using 13 tools and RAG, served in Slack and a web portal. Scalable CRUD across 50,000+ records in 920+ zones; 75% faster request processing.",
    stack: ["GPT-5.5", "ChromaDB", "AWS"],
    year: "2025",
    status: "Enterprise scale",
    window: "dnsq · 920 zones",
    preview: [
      "> add CNAME app.corp →",
      "  13 tools · RAG lookup",
      "  50,000+ records",
      "75% faster · $20,000/yr",
    ],
  },
  {
    title: "Sahayak & UCXP",
    blurb: "Onboard a business with a JSON manifest",
    detail:
      "A manifest-driven platform where businesses onboard via JSON and are instantly served across chat, voice, WhatsApp, web and Android with zero custom code. LangGraph runtime on Sarvam AI (STT, LLM, TTS, translation).",
    stack: ["LangGraph", "Sarvam AI", "Next.js"],
    year: "2026",
    status: "2nd place · Sarvam Epoch Buildathon'26",
    repo: "https://github.com/akashmeruva9",
    window: "ucxp · manifest.json",
    preview: [
      '{ "business": "kirana",',
      '  "channels": ["voice",',
      '   "whatsapp", "web"] }',
      "→ live in 0 lines of code",
    ],
  },
];

export const services = [
  {
    title: "Agentic AI systems",
    detail:
      "Multi-agent architectures with LangGraph and LangChain — routing, tool use, RAG, guardrails, agent security, and the observability to prove they work.",
  },
  {
    title: "Cloud & backend",
    detail:
      "AWS Lambda, CloudFormation, DynamoDB, API Gateway and WebSockets. Systems that stay boring under enterprise load.",
  },
  {
    title: "Evaluation & observability",
    detail:
      "Agentic testing and evaluation frameworks surfacing CSAT, accuracy, cost savings and human hours saved — so agents are measured, not assumed.",
  },
  {
    title: "Multiplatform apps",
    detail:
      "Kotlin, Jetpack Compose and Compose Multiplatform. Mentored GSoC contributors shipping biometric auth across Android, iOS, macOS, Windows and Linux.",
  },
] as const;

export type Job = {
  company: string;
  title: string;
  period: string;
  place: string;
  summary: string;
};

export const experience: Job[] = [
  {
    company: "Autodesk",
    title: "Software Development Engineer",
    period: "Jul 2025 — Present",
    place: "Bangalore · Remote",
    summary:
      "Own SAOMA, StoreboxAI and the agentic testing frameworks behind them. Built the observability and business dashboards that surface CSAT, accuracy and cost savings across all three systems.",
  },
  {
    company: "Autodesk",
    title: "Software Development Engineer Intern",
    period: "Jan 2025 — Jun 2025",
    place: "Bangalore · On-site",
    summary:
      "Built DNSQ, an AI agent for DNS operations across 13 tools and RAG, delivering CRUD over 50,000+ records in 920+ zones and cutting request processing time by 75%.",
  },
  {
    company: "Google Summer of Code",
    title: "Mentor",
    period: "Mar 2025 — Aug 2025",
    place: "Remote",
    summary:
      "Mentored contributors building biometric and face-based authentication across Android, iOS, macOS, Windows and Linux for the Mifos Passcode Library, a Compose Multiplatform library.",
  },
];

export const achievements = [
  {
    label: "2nd place",
    detail: "Sarvam AI Epoch Buildathon'26 — 220+ teams, 3,000+ builders",
  },
  {
    label: "Winner",
    detail: "Smart India Hackathon 2024, national level (PS-1747)",
  },
  { label: "5+ wins", detail: "Sarvam Buildathon'24, Coindcx Unfold'23, IndianOil Hackathon'23" },
  {
    label: "Published",
    detail: "IEEE paper — real-time object detection with AI/ML",
  },
  {
    label: "Competitive",
    detail: "Codeforces Specialist 1434 · CodeChef 3★ 1601 · LeetCode 1644",
  },
];

export const skillGroups = [
  { label: "Languages", items: ["C", "C++", "Python", "Kotlin"] },
  {
    label: "Agentic AI",
    items: [
      "LangGraph",
      "LangChain",
      "RAG",
      "Guardrails",
      "Agent Security",
      "AI Observability",
    ],
  },
  {
    label: "Cloud",
    items: [
      "AWS Lambda",
      "CloudFormation",
      "DynamoDB",
      "API Gateway",
      "Docker",
      "WebSockets",
    ],
  },
  {
    label: "Mobile",
    items: ["Jetpack Compose", "Compose Multiplatform", "MVVM"],
  },
] as const;

export const education = {
  degree: "B.Tech, Computer Science (AI & ML)",
  school: "SRM University, AP",
  period: "2021 — 2025",
  grade: "8.54 / 10",
} as const;

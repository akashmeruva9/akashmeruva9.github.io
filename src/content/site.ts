export type Achievement = {
  text: string;
  url?: string;
};

export type SkillCategory = {
  category: string;
  items: string[];
};

export type Project = {
  title: string;
  links: { label: string; url: string }[];
  points: string[];
};

export type Job = {
  logo?: "autodesk" | "gsoc";
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
};

// Exact representation of Akash Meruva's Resume
export const resume = {
  name: "Akash Meruva",
  role: "Software Development Engineer",
  company: "Autodesk",
  location: "Bangalore, Karnataka, India",
  summary:
    "Software Development Engineer at Autodesk specializing in Agentic AI, Autonomous Multi-Agent Systems, and Cloud Infrastructure.",
  contact: {
    email: "akash.meruva2003@gmail.com",
    github: {
      username: "akashmeruva9",
      url: "https://github.com/akashmeruva9",
    },
    linkedin: {
      username: "akash-meruva-ab1420222",
      url: "https://www.linkedin.com/in/akash-meruva-ab1420222",
    },
  },

  experience: [
    {
      logo: "autodesk",
      role: "SDE-1",
      company: "Autodesk",
      period: "07/2025 – present",
      location: "Remote – Bangalore, Karnataka, India",
      points: [
        "Built SAOMA, an AI workflow that autonomously maintains and self-remediates 15+ servers behind Storebox, Autodesk’s desktop build lifecycle and management platform, saving $20,400 /year and 75 hours/month.",
        "Designed and developed StoreboxAI, a Hierarchical Multi-Agent Chat Agent of 10 agents in Slack for real-time Filer insights and health monitoring, cutting daily monitoring from 6 to 1 hour and saving $25,200 /year.",
        "Built observability, business dashboards, and agentic testing & evaluation frameworks for DNSQ, StoreboxAI, and SAOMA, surfacing CSAT, Accuracy, cost savings, and human hours saved.",
      ],
    },
    {
      logo: "autodesk",
      role: "SDE Intern",
      company: "Autodesk",
      period: "01/2025 – 06/2025",
      location: "On-Site – Bangalore, Karnataka, India",
      points: [
        "Built DNSQ, an AI agent for DNS operations using 13 tools and RAG (GPT-5.5, ChromaDB, AWS) in Slack and a DNS web portal, cutting request processing time by 75% and saving $20,000/year.",
        "Solely owned and built DNSQ end-to-end, serving 500–1000 sessions/month with scalable CRUD across 50,000+ resource records in 920+ DNS zones at enterprise scale across Autodesk.",
      ],
    },
    {
      logo: "gsoc",
      role: "Mentor",
      company: "Google Summer Of Code",
      period: "03/2025 – 08/2025",
      location: "Remote",
      points: [
        "Mentored GSOC contributors building biometric and face-based authentication across Android, iOS, macOS, Windows, and Linux for the Mifos Passcode Library, a Compose Multiplatform library.",
      ],
    },
  ] as Job[],

  projects: [
    {
      title: "OpenLens",
      links: [
        {
          label: "Pitch Video",
          url: "https://drive.google.com/file/d/1ieTQUYxL5JFkO9oQh3_xmPvbID1A4tJ3/view?usp=sharing",
        },
        {
          label: "Github",
          url: "https://github.com/akashmeruva9/open-lens",
        },
        {
          label: "Live",
          url: "https://openlens-web-948923830185.us-central1.run.app/",
        },
      ],
      points: [
        "Built OpenLens, an AI media house that turns each story into a reviewed Claim & Evidence Ledger and ships it across web, mobile, narrated videos, and channel posts for YouTube, X, Instagram, Facebook, and WhatsApp.",
        "Architected a Gemini agent pipeline (claims, corroboration, research, QA, scripts) and a video factory (Gemini TTS, Veo, FFmpeg) on GCP (Cloud Run, Firestore, Vertex AI) with Next.js and Expo apps.",
      ],
    },
    {
      title: "Sahayak Agent & UCXP Protocol",
      links: [
        {
          label: "Pitch Video",
          url: "https://drive.google.com/file/d/1wYmC7KAdk6p2E8STL1A-TuyYvlAwnPb0/view?usp=sharing",
        },
        {
          label: "Github",
          url: "https://github.com/akashmeruva9/sahayak-ucxp-sarvam",
        },
        {
          label: "Live",
          url: "https://sahayak-ucxp.vercel.app",
        },
      ],
      points: [
        "Built Sahayak Agent and the UCXP Protocol, a manifest-driven platform where businesses onboard via JSON manifests and are served across chat, voice, WhatsApp, web, and Android with zero custom code.",
        "Architected a LangGraph-based UCXP Runtime on Sarvam AI (STT, LLM, TTS, translation), deployed on Railway/Vercel with Shopify and Sarvam Samvaad voice support.",
      ],
    },
  ] as Project[],

  achievements: [
    {
      text: "2nd Place at Sarvam AI Epoch Buildathon’26 (220+ teams, 3000+ builders) winning a prize of Rs. 1 lakh.",
    },
    {
      text: "Winner in the National Smart India Hackathon 2024 for PS - 1747 securing a prize of 1 lakh rupees.",
      url: "https://sih.gov.in/sih2024/sih2024-grand-finale-result",
    },
    {
      text: "Winner in 5+ hackathons: Sarvam Buildathon’26, SIH’24, Coindcx Unfold’23, IndianOil Hackathon’23, etc.",
      url: "https://devfolio.co/projects/webverse-86e9",
    },
  ] as Achievement[],


  skills: [
    {
      category: "Languages",
      items: ["C", "C++", "Python"],
    },
    {
      category: "Agentic AI",
      items: [
        "LangGraph",
        "LangChain",
        "RAG",
        "Guardrails",
        "ADLC",
        "Agent Security",
        "Prompt Engineering",
        "AI Observability",
      ],
    },
    {
      category: "AI Tools",
      items: ["Claude Code", "Cursor", "Crew AI", "Retool"],
    },
    {
      category: "Cloud",
      items: [
        "AWS Lambda",
        "CloudFormation",
        "DynamoDB",
        "Docker",
        "API Gateway",
        "WebSockets",
      ],
    },
  ] as SkillCategory[],
};

export const site = resume;

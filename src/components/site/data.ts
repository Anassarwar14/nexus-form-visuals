export const PROFILE = {
  name: "Mohammad Anas",
  role: "Full Stack AI Engineer",
  email: "anassarwar14@gmail.com",
  phone: "+92 336 3884230",
  github: "https://github.com/Anassarwar14",
  linkedin: "https://linkedin.com/in/anassarwar14",
  location: "Karachi, Pakistan",
};

export const EXPERIENCE = [
  {
    company: "Alira",
    place: "Australia",
    role: "Software Engineer (Contract)",
    period: "Feb 2026 — Mar 2026",
    index: "01",
    bullets: [
      "Architected a chat-first AI workflow assistant on Next.js & TypeScript where teams build, schedule and automate multi-step flows in natural language, wiring 10+ external services (Google, Microsoft, CRM) through Pipedream MCP for dynamic tool discovery.",
      "Engineered an end-to-end LLM tool-calling pipeline with the Vercel AI SDK — argument sanitization, schema-aware handling, loop detection, context windowing and prompt caching to cut inference cost and latency.",
      "Built persistent user memory and a compliance-first layer with per-flow approval modes and a draft/edit/approve/send pattern so no sensitive operation runs without human review.",
      "Implemented Stripe monetization with credit-usage tracking, plan lifecycle webhooks and an $80/mo Pro tier.",
    ],
    stack: ["Next.js", "TypeScript", "Vercel AI SDK", "Pipedream MCP", "Stripe"],
  },
  {
    company: "Zaytune",
    place: "United States",
    role: "Software Engineer (Contract)",
    period: "Nov 2025 — Mar 2026",
    index: "02",
    bullets: [
      "Customized and deployed a branded multi-provider AI chat platform (LibreChat) on Docker supporting 12+ model providers — OpenAI, Anthropic, Google, AWS Bedrock, Mistral, Ollama, DeepSeek — across React, Node/Express and MongoDB.",
      "Engineered an automatic chat mode router with distinct routing logic for instant, reasoning and vision-attachment workflows, improving model selection accuracy across diverse inputs.",
      "Integrated FLUX-based image generation via Together AI, extending the platform beyond text-only interaction.",
      "Contributed to a product vision centered on balanced, bias-aware AI responses for underrepresented communities.",
    ],
    stack: ["React", "Node/Express", "MongoDB", "Docker", "Together AI"],
  },
  {
    company: "10Pearls",
    place: "Karachi",
    role: "Software Engineering Intern",
    period: "Sep 2025 — Nov 2025",
    index: "03",
    bullets: [
      "Architected Orris, a Notion-inspired notes platform on Next.js & React with hierarchical folders, rich text editing, drag-and-drop reordering, Supabase Storage uploads and JWT auth.",
      "Built real-time search with keyword filtering and priority-based pinning, responsive across devices via optimized component architecture and state management.",
      "Held code quality through PR-driven cycles, SonarQube CI integration and RESTful API standards, shipping to production on Render.",
    ],
    stack: ["Next.js", "Supabase", "JWT", "SonarQube", "Render"],
  },
];

export const PROJECTS = [
  {
    name: "WealthFlow",
    tag: "AI Financial Advisor · Final Year Project",
    year: "2026",
    href: "https://github.com/Anassarwar14/Final-Year-Project",
    blurb:
      "An AI financial advisor delivering personalized investment guidance with real-time SSE streaming and persistent chat sessions, grounded in a finance RAG pipeline.",
    detail: [
      "Document chunking, embedding generation and pgvector similarity search grounding advice in portfolio context, risk appetite and investment horizon.",
      "Multi-module dashboard: virtual trading simulator, live market quotes, P&L tracking and a financial learning hub.",
    ],
    stack: ["RAG", "pgvector", "SSE", "Next.js"],
  },
  {
    name: "Chat Nest AI",
    tag: "AI Characters Platform",
    year: "2025",
    href: "https://github.com/Anassarwar14/Chat-Nest-AI",
    blurb:
      "A platform for creating and talking to custom AI characters, built on Next.js and TypeScript with Pinecone vector search and Stripe subscriptions.",
    detail: [
      "Character memory backed by Pinecone vector search for continuity across conversations.",
      "Subscription billing and gated model access through Stripe.",
    ],
    stack: ["Next.js", "Pinecone", "Stripe", "Shadcn/UI"],
  },
  {
    name: "Settle Down",
    tag: "Real Estate Platform",
    year: "2025",
    href: "https://github.com/Anassarwar14/Settle-Down",
    blurb:
      "A full-stack real estate marketplace on the MERN stack with JWT auth, Google OAuth via Firebase and advanced property filtering APIs.",
    detail: [
      "Listing management with image uploads and owner dashboards.",
      "Query-driven search APIs with composable filters and sorting.",
    ],
    stack: ["MongoDB", "Express", "React", "Firebase"],
  },
];

export const SKILLS = [
  {
    label: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux", "Jest", "Shadcn/UI"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "JWT", "Redis", "Stripe", "Firebase", "SonarQube"],
  },
  {
    label: "Data & Cloud",
    items: ["PostgreSQL", "Supabase", "MongoDB", "MySQL", "Prisma", "AWS", "Docker", "Terraform"],
  },
  {
    label: "AI & LLMs",
    items: ["LangChain", "RAG Pipelines", "Pinecone", "Cohere", "Together", "GroqCloud", "Vector Search"],
  },
];

export const MARQUEE = [
  "RAG PIPELINES",
  "AGENTIC WORKFLOWS",
  "TYPESCRIPT",
  "DESIGN ENGINEERING",
  "LLM TOOL CALLING",
  "REACT",
  "POSTGRES + PGVECTOR",
  "SHIPPING FAST",
];

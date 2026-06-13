// Portfolio data for Rohit Mudili — sourced from resume (2026) + github.com/RohitMudili

export const personalInfo = {
  name: "Rohit Mudili",
  title: "AI Engineer · Agentic Systems · LLM / RAG / Voice",
  tagline:
    "Building intelligent systems that bridge AI innovation with real-world automation",
  email: "rohitmudili5@gmail.com",
  phone: "+91 8919878337",
  location: "Bengaluru, India",
  linkedin: "https://www.linkedin.com/in/rohit-mudili",
  github: "https://github.com/RohitMudili",
  bio: "I'm an AI engineer building agentic systems — autonomous multi-agent frameworks, RAG architectures, and real-time voice agents. I'm currently at Plum Benefits building a multi-agentic support system on LangGraph, and a CSE graduate from IIIT Nagpur. I care about the unglamorous parts — latency, recovery, retrieval quality, autonomous decision-making — because that's where AI either works or doesn't.",
};

export const highlights = [
  { icon: "Briefcase", text: "AI Engineer @ Plum Benefits — agentic support systems" },
  { icon: "GraduationCap", text: "B.Tech CSE, IIIT Nagpur — Graduated" },
  { icon: "Trophy", text: "Top 5 · Stellar Analytics, IIT BHU (400+ entrants)" },
  { icon: "Rocket", text: "Top 100 · Amazon ML Challenge (1000+ teams)" },
];

// Headline metrics — every figure is sourced directly from the resume.
export const metrics = [
  { value: 90, suffix: "%", label: "Workflow reuse", note: "similarity detection" },
  { value: 600, prefix: "<", suffix: "ms", label: "Voice-agent latency", note: "6 live business agents" },
  { value: 1000, suffix: "+", label: "Docs in RAG index", note: "LlamaIndex · FAISS" },
  { value: 60, suffix: "%", label: "AI search visibility ↑", note: "11 scoring algorithms" },
];

export const skills = [
  {
    category: "Languages",
    items: [
      { name: "Python", level: 92 },
      { name: "TypeScript", level: 80 },
      { name: "C/C++", level: 72 },
      { name: "SQL (Postgres)", level: 78 },
      { name: "JavaScript", level: 70 },
      { name: "HTML/CSS", level: 65 },
    ],
  },
  {
    category: "Agentic & LLM",
    items: [
      { name: "LangGraph", level: 90 },
      { name: "LangChain", level: 88 },
      { name: "LangSmith", level: 82 },
      { name: "CrewAI", level: 85 },
      { name: "N8N", level: 80 },
    ],
  },
  {
    category: "Backend & Infra",
    items: [
      { name: "FastAPI", level: 90 },
      { name: "Node.js", level: 80 },
      { name: "Flask", level: 82 },
      { name: "Docker", level: 80 },
      { name: "Kubernetes", level: 70 },
      { name: "GCP", level: 74 },
      { name: "Redis", level: 75 },
    ],
  },
  {
    category: "ML & Data",
    items: [
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 80 },
      { name: "Scikit-learn", level: 88 },
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 85 },
    ],
  },
  {
    category: "Retrieval & Stores",
    items: [
      { name: "Neo4j", level: 82 },
      { name: "Pinecone", level: 84 },
      { name: "FAISS", level: 85 },
      { name: "PostgreSQL", level: 78 },
    ],
  },
];

export const experiences = [
  {
    id: 1,
    company: "Plum Benefits",
    role: "AI Engineer Intern",
    duration: "Dec 2025 – Present",
    location: "Bengaluru — On-site",
    current: true,
    achievements: [
      "Developing an AI-powered multi-agentic central support system using LangGraph and LangSmith — enabling complex actions like booking management, rescheduling, and automated refund initiation.",
      "Architected a skills-based agent framework capable of autonomous decision-making across cross-functional APIs, moving beyond retrieval-based Q&A to real task execution.",
      "Collaborated with business leadership and cross-functional teams to map complex API workflows into agentic skills, ensuring seamless integration with enterprise systems.",
    ],
    techStack: ["Python", "LangGraph", "LangSmith", "GCP", "Redis", "Kubernetes", "Node.js", "TypeScript"],
  },
  {
    id: 2,
    company: "Es Magico AI Experiences",
    role: "AI Engineer Intern",
    duration: "Jun 2025 – Nov 2025",
    location: "Mumbai — On-site",
    achievements: [
      "Developed an AI-powered browser automation system using Python, TypeScript, and LLM models, achieving 90% workflow reuse through intelligent similarity detection.",
      "Contributed to 'Upskillr', an AI e-learning platform transforming presentations into video lessons via user-provided AI avatars and voice synthesis.",
      "Developed a real-time Q&A voice agent that extracts information from presentation materials to provide instant, context-aware answers.",
    ],
    techStack: ["Python", "TypeScript", "LLMs", "Voice Synthesis", "Browser Automation"],
  },
  {
    id: 3,
    company: "AIVC Talent",
    role: "AI Developer Intern",
    duration: "Jan 2025 – Jun 2025",
    location: "Remote — San Juan",
    achievements: [
      "Built a real-time AI voice agent platform using Groq Llama-3 and GPT-4o with Deepgram STT, achieving <600ms latency for 6 pre-configured business agents.",
      "Implemented RAG with LlamaIndex and FAISS processing 1,000+ knowledge documents, enabling automated lead qualification with 4 CRM integrations.",
      "Developed an AI content optimization system using 11 scoring algorithms, improving AI search visibility by 40–60% across 100+ client evaluations.",
    ],
    techStack: ["Groq Llama-3", "GPT-4o", "Deepgram", "LlamaIndex", "FAISS", "Python"],
  },
];

export const projects = [
  {
    id: 1,
    title: "Relational DB → GraphRAG",
    alt: "Knowledge-graph visualization of nodes and relationships",
    description: "Automated transformation of relational databases into semantically-enriched knowledge graphs with natural-language querying.",
    longDescription:
      "A production-ready system that converts PostgreSQL schemas into Neo4j knowledge graphs with AI-powered querying. Enables multi-hop relationship exploration and intent-based semantic search, plus a Natural Language Query interface that extracts complex graph analytics and hidden patterns from plain English.",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80",
    techStack: ["Python", "Neo4j", "PostgreSQL", "LangChain", "OpenAI", "Docker"],
    github: "https://github.com/RohitMudili/relational-to-graphrag",
    liveDemo: null,
    impact: "AI knowledge graphs queryable in plain English",
  },
  {
    id: 2,
    title: "FusionIQ Query Engine",
    alt: "Abstract multi-modal data routing visualization",
    description: "Multi-modal AI query engine with RAG, graph workflows, and agentic routing.",
    longDescription:
      "An AI-driven system that processes diverse queries (policy retrieval, weather, web search) via modular FastAPI endpoints and graph workflows. Combines document chunk extraction and Pinecone vector embeddings for RAG, with CrewAI orchestrating asynchronous REST APIs for seamless query routing.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80",
    techStack: ["Python", "FastAPI", "CrewAI", "LangChain", "Pinecone"],
    github: "https://github.com/RohitMudili/FusionIQ",
    liveDemo: null,
    impact: "Unified query routing across multiple data sources",
  },
  {
    id: 3,
    title: "Mandelbrot — CUDA + MPI",
    alt: "Fractal Mandelbrot set render",
    description: "High-performance fractal renderer with block-cyclic GPU/cluster distribution.",
    longDescription:
      "A parallel Mandelbrot renderer combining CUDA, MPI, and OpenMP with block-cyclic workload distribution across GPUs and nodes — systems-level performance engineering for compute-heavy visualization.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80",
    techStack: ["C++", "CUDA", "MPI", "OpenMP"],
    github: "https://github.com/RohitMudili/mandelbrot-mpi-cuda-omp",
    liveDemo: null,
    impact: "Parallel compute across GPUs + cluster nodes",
  },
  {
    id: 4,
    title: "Prompt-Opt",
    alt: "Abstract optimization gradient visualization",
    description: "Systematic prompt optimization framework for LLM pipelines.",
    longDescription:
      "A framework for optimizing prompts against measurable objectives — iterating prompt variants and scoring outputs to converge on higher-quality, more reliable LLM behaviour.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80",
    techStack: ["Python", "LLMs", "Evaluation"],
    github: "https://github.com/RohitMudili/prompt-opt",
    liveDemo: null,
    impact: "Measurable, repeatable prompt quality gains",
  },
  {
    id: 5,
    title: "DocTel — Post-Op Agent",
    alt: "Health monitoring data streams visualization",
    description: "Personalised AI agent for post-surgical recovery monitoring.",
    longDescription:
      "An AI agent that assists post-surgical recovery using patient logs and symptom monitoring — analyzing mood, temperature, pain, and wound-health signals to surface early complication alerts and deliver personalized recovery guidance in real time.",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80",
    techStack: ["Python", "Pandas", "FastAPI", "Scikit-learn"],
    github: "https://github.com/RohitMudili/DocTel",
    liveDemo: null,
    impact: "Proactive, AI-driven post-operative care",
  },
  {
    id: 6,
    title: "AI Voice Market Analyser",
    alt: "Voice waveform and market chart visualization",
    description: "Voice-driven market analysis agent producing spoken insights.",
    longDescription:
      "A voice-interface agent that analyzes market data and returns spoken, context-aware insights — pairing real-time speech with LLM-driven analysis.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80",
    techStack: ["Python", "Voice", "LLMs"],
    github: "https://github.com/RohitMudili/AI-voice-market-analyser",
    liveDemo: null,
    impact: "Spoken market insight on demand",
  },
];

export const achievements = [
  {
    id: 1,
    title: "Top 5 — Stellar Analytics Competition",
    organizer: "IIT BHU Technalytics",
    description: "Secured a Top 5 position competing against 400+ participants nationwide in a competitive analytics challenge.",
    icon: "Trophy",
  },
  {
    id: 2,
    title: "Top 100 — Amazon ML Challenge",
    organizer: "Amazon",
    description: "Earned a Top 100 rank among 1,000+ skilled teams across India in Amazon's machine-learning challenge.",
    icon: "Award",
  },
];

export const education = {
  institution: "Indian Institute of Information Technology, Nagpur",
  degree: "Bachelor of Technology",
  major: "Computer Science and Engineering",
  duration: "Nov 2022 – Jun 2026 · Graduated",
  location: "Nagpur, Maharashtra",
};

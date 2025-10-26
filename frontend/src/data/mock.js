// Mock data for Rohit Mudili's Portfolio

export const personalInfo = {
  name: "Rohit Mudili",
  title: "AI Engineer | LLM Specialist | Automation Expert",
  tagline: "Building intelligent systems that bridge AI innovation with real-world automation",
  email: "rohitmudili5@gmail.com",
  phone: "+91 8919878337",
  location: "Nagpur, Maharashtra, India",
  linkedin: "https://www.linkedin.com/in/rohit-mudili",
  github: "https://github.com/RohitMudili",
  bio: "I'm an AI Engineer currently pursuing B.Tech in Computer Science at IIIT Nagpur (Class of 2026). I specialize in building LLM-powered automation systems, RAG architectures, and real-time AI voice agents. With experience at Es Magico AI and AIVC Talent, I've developed systems processing 1,200+ workflows, achieving 90% reuse efficiency and sub-600ms latency voice agents. I'm passionate about leveraging cutting-edge AI to solve complex automation challenges and create intelligent, scalable solutions."
};

export const highlights = [
  {
    icon: "GraduationCap",
    text: "B.Tech CSE @ IIIT Nagpur (2022-2026)"
  },
  {
    icon: "Briefcase",
    text: "AI Engineer Intern @ Es Magico AI"
  },
  {
    icon: "Trophy",
    text: "Top 5 at IIT BHU Stellar Analytics Competition"
  },
  {
    icon: "Rocket",
    text: "Top 100 in Amazon ML Challenge (1000+ teams)"
  }
];

export const skills = [
  {
    category: "Programming Languages",
    items: [
      { name: "Python", level: 90 },
      { name: "JavaScript/TypeScript", level: 80 },
      { name: "C/C++", level: 70 },
      { name: "SQL (PostgreSQL)", level: 75 },
      { name: "HTML/CSS", level: 80 }
    ]
  },
  {
    category: "AI/ML Frameworks & Tools",
    items: [
      { name: "LangChain", level: 90 },
      { name: "CrewAI", level: 85 },
      { name: "OpenAI APIs", level: 90 },
      { name: "Groq LLama", level: 80 },
      { name: "GPT-4o", level: 90 },
      { name: "LlamaIndex", level: 85 },
      { name: "TensorFlow/PyTorch", level: 70 },
      { name: "Scikit-learn", level: 75 }
    ]
  },
  {
    category: "Backend & APIs",
    items: [
      { name: "FastAPI", level: 90 },
      { name: "Flask", level: 80 },
      { name: "Node.js", level: 70 },
      { name: "RESTful APIs", level: 90 }
    ]
  },
  {
    category: "Vector Databases & Search",
    items: [
      { name: "ChromaDB", level: 90 },
      { name: "Pinecone", level: 85 },
      { name: "FAISS", level: 80 },
      { name: "Semantic Search", level: 90 }
    ]
  },
  {
    category: "Automation & Orchestration",
    items: [
      { name: "N8N", level: 85 },
      { name: "Workflow Automation", level: 90 },
      { name: "Browser Automation", level: 80 }
    ]
  },
  {
    category: "Developer Tools",
    items: [
      { name: "Git/GitHub", level: 90 },
      { name: "Docker", level: 75 },
      { name: "Google Cloud Platform", level: 70 },
      { name: "VS Code", level: 95 }
    ]
  }
];

export const experiences = [
  {
    id: 1,
    company: "Es Magico AI",
    role: "AI Engineer Intern",
    duration: "June 2025 – Present",
    location: "Mumbai, On-site",
    achievements: [
      "Developed AI-powered automation system achieving 90% workflow reuse through intelligent similarity detection",
      "Built workflow consolidation engine using LangChain & OpenAI APIs, reducing redundant steps by 40% across 1,200+ lines of code",
      "Implemented ChromaDB vector database with semantic search using Google Gemini embeddings, supporting 100+ automation patterns",
      "Created 3-tier AI error recovery system with 85% success rate in workflow replay"
    ],
    techStack: ["Python", "TypeScript", "LangChain", "OpenAI APIs", "ChromaDB", "Google Gemini"]
  },
  {
    id: 2,
    company: "AIVC Talent",
    role: "AI Developer Intern",
    duration: "January 2025 – June 2025",
    location: "Remote, San Juan",
    achievements: [
      "Built real-time AI voice agent platform using Groq LLama-3.3-70b & GPT-4o with Deepgram STT, achieving <600ms latency for 6 business agents",
      "Implemented RAG with LlamaIndex & FAISS, processing 1,000+ knowledge documents with 4 CRM integrations (Podio, RESimpli, Pipedrive, FollowUpBoss)",
      "Developed AI content optimization system with 8 GEO techniques, improving AI search visibility by 40-60% across 100+ client evaluations"
    ],
    techStack: ["Groq LLama-3.3-70b", "GPT-4o", "Deepgram", "IndicTTS", "LlamaIndex", "FAISS", "Python"]
  }
];

export const projects = [
  {
    id: 1,
    title: "DocTel – Personalized PostOP Agent",
    description: "AI-powered personalized agent for post-surgical recovery assistance",
    longDescription: "Processed and analyzed 20,000+ data points including mood, temperature, pain, and wound health. Features early complication alert system and interactive workflows delivering real-time personalized recovery guidance.",
    image: "https://images.unsplash.com/photo-1512998844734-cd2cca565822?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsYWNrX2FuZF93aGl0ZXwxNzYxNDkzNDUyfDA&ixlib=rb-4.1.0&q=85",
    techStack: ["Python", "Pandas", "FastAPI", "Matplotlib", "Scikit-learn"],
    github: "https://github.com/RohitMudili/DocTel",
    liveDemo: null,
    impact: "Enables proactive post-operative care through AI-driven health monitoring"
  },
  {
    id: 2,
    title: "FusionIQ Query Engine",
    description: "AI-driven multi-modal query processing system with RAG capabilities",
    longDescription: "Features modular FastAPI endpoints handling diverse queries, document chunk extraction & vector embedding with Pinecone for RAG, and CrewAI orchestration for asynchronous REST API management.",
    image: "https://images.unsplash.com/photo-1482053450283-3e0b78b09a70?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsYWNrX2FuZF93aGl0ZXwxNzYxNDkzNDUyfDA&ixlib=rb-4.1.0&q=85",
    techStack: ["Python", "FastAPI", "CrewAI", "LangChain", "Pinecone"],
    github: null,
    liveDemo: null,
    impact: "Unified query processing across multiple data sources with seamless routing"
  },
  {
    id: 3,
    title: "Ticket System",
    description: "ML-based support ticket classification and routing system",
    longDescription: "Automated ticket categorization with priority assignment, predictive ticket routing to appropriate support teams, and analysis of ticket resolution patterns.",
    image: "https://images.unsplash.com/photo-1636153849665-08c0ac02b36e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHw0fHxhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsYWNrX2FuZF93aGl0ZXwxNzYxNDkzNDUyfDA&ixlib=rb-4.1.0&q=85",
    techStack: ["Jupyter Notebook", "Python", "Machine Learning"],
    github: "https://github.com/RohitMudili/Ticket-system",
    liveDemo: null,
    impact: "Streamlined support ticket management with intelligent classification"
  },
  {
    id: 4,
    title: "Breast Cancer Prediction",
    description: "Machine learning model for breast cancer detection and classification",
    longDescription: "Binary classification model for malignant/benign tumor detection with feature engineering on clinical datasets and comprehensive model evaluation.",
    image: "https://images.unsplash.com/photo-1632059368252-be6d65abc4e2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwzfHxtaW5pbWFsaXN0fGVufDB8fHxibGFja19hbmRfd2hpdGV8MTc2MTQ5MzQ1OHww&ixlib=rb-4.1.0&q=85",
    techStack: ["Jupyter Notebook", "Python", "Scikit-learn"],
    github: "https://github.com/RohitMudili/breast-cancer-prediction",
    liveDemo: null,
    impact: "Medical ML for early cancer detection"
  },
  {
    id: 5,
    title: "Unsupervised Anomaly Detection",
    description: "Anomaly detection system using unsupervised learning techniques",
    longDescription: "Pattern recognition without labeled data, real-time anomaly identification, and advanced outlier detection algorithms.",
    image: "https://images.pexels.com/photos/158826/structure-light-led-movement-158826.jpeg",
    techStack: ["Jupyter Notebook", "Python", "Machine Learning"],
    github: "https://github.com/RohitMudili/Unsupervised-anomoly-detection",
    liveDemo: null,
    impact: "Intelligent anomaly detection for security and monitoring"
  },
  {
    id: 6,
    title: "DarwixAI",
    description: "Advanced AI project exploring evolutionary algorithms",
    longDescription: "AI system implementing evolutionary computation and adaptive algorithms for complex problem solving.",
    image: "https://images.pexels.com/photos/1420709/pexels-photo-1420709.jpeg",
    techStack: ["Python", "AI/ML"],
    github: "https://github.com/RohitMudili/DarwixAI",
    liveDemo: null,
    impact: "Evolutionary AI for optimization problems"
  }
];

export const achievements = [
  {
    id: 1,
    title: "Top 5 - Stellar Analytics Competition",
    organizer: "IIT BHU Technalytics",
    description: "Secured top 5 position in competitive analytics challenge against 400+ participants from India's best tech talent",
    icon: "Trophy"
  },
  {
    id: 2,
    title: "Top 100 - Amazon ML Challenge",
    organizer: "Amazon",
    description: "Earned top 100 rank in Amazon's highly competitive machine learning challenge with 1,000+ teams nationwide",
    icon: "Award"
  }
];

export const education = {
  institution: "IIIT Nagpur",
  degree: "Bachelor of Technology (B.Tech)",
  major: "Computer Science and Engineering",
  duration: "November 2022 – June 2026",
  location: "Nagpur, Maharashtra, India"
};

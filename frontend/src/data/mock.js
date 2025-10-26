// Mock data for Rohit Mudili's Portfolio

export const personalInfo = {
  name: "Rohit Mudili",
  title: "AI Engineer | Machine Learning | Deep Learning",
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
      { name: "C/C++", level: 70 },
      { name: "SQL (Postgres)", level: 75 },
      { name: "JavaScript", level: 80 },
      { name: "HTML/CSS", level: 80 }
    ]
  },
  {
    category: "AI/ML Frameworks",
    items: [
      { name: "LangChain", level: 90 },
      { name: "CrewAI", level: 85 },
      { name: "TensorFlow", level: 70 },
      { name: "PyTorch", level: 70 },
      { name: "Scikit-learn", level: 75 }
    ]
  },
  {
    category: "Backend Frameworks",
    items: [
      { name: "Node.js", level: 80 },
      { name: "Flask", level: 85 },
      { name: "FastAPI", level: 90 },
      { name: "N8N", level: 85 }
    ]
  },
  {
    category: "Libraries & Tools",
    items: [
      { name: "Pandas", level: 90 },
      { name: "NumPy", level: 85 },
      { name: "Matplotlib", level: 80 },
      { name: "PyPDF2", level: 80 },
      { name: "Pinecone", level: 85 }
    ]
  },
  {
    category: "Developer Tools",
    items: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 75 },
      { name: "Google Cloud Platform", level: 70 },
      { name: "VS Code", level: 95 },
      { name: "Visual Studio", level: 85 },
      { name: "PyCharm", level: 85 },
      { name: "IntelliJ", level: 80 }
    ]
  }
];

export const experiences = [
  {
    id: 1,
    company: "Es Magico AI",
    role: "AI Engineer Intern",
    duration: "June 2025 – Present",
    location: "Mumbai — On-site",
    achievements: [
      "Developed an AI-powered automation system using Python, TypeScript and LLM models, achieving 90% workflow reuse through intelligent similarity detection and pattern recognition",
      "Built a workflow consolidation engine using LangChain and OpenAI APIs that optimizes automation sequences, reducing redundant steps by 40% across 1,200+ lines of workflow processing code",
      "Implemented ChromaDB vector database with semantic search using Google Gemini embeddings, supporting 100+ automation patterns with cross-platform compatibility",
      "Created a 3-tier AI error recovery system with intelligent element detection algorithms and dynamic file handling, achieving 85% success rate in workflow replay across diverse applications"
    ],
    techStack: ["Python", "TypeScript", "LangChain", "OpenAI APIs", "ChromaDB", "Google Gemini"]
  },
  {
    id: 2,
    company: "AIVC Talent",
    role: "AI Developer Intern",
    duration: "January 2025 – June 2025",
    location: "Remote — San Juan",
    achievements: [
      "Built a real-time AI voice agent platform using Groq LLama-3.3-70b and GPT-4o with Deepgram STT and fine tuned huge datasets on the IndicTTS model, achieving <600ms latency for 6 pre-configured business agents",
      "Implemented RAG with LlamaIndex and FAISS processing 1,000+ knowledge documents, enabling automated lead qualification with 4 CRM integrations (Podio, RESimpli, Pipedrive, FollowUpBoss)",
      "Developed an AI content optimization system using GPT-4o with 8 GEO techniques and 11 scoring algorithms, improving AI search visibility by 40-60% across 100+ client evaluations"
    ],
    techStack: ["Groq LLama-3.3-70b", "GPT-4o", "Deepgram", "IndicTTS", "LlamaIndex", "FAISS", "Python"]
  }
];

export const projects = [
  {
    id: 1,
    title: "DocTel – Personalised PostOP Agent",
    description: "AI-powered personalised agent for post-surgical recovery assistance",
    longDescription: "Built an AI-powered personalised agent to assist in post-surgical recovery using patient logs and symptom monitoring. Processed and analyzed 20,000+ data points including mood, temperature, pain, and wound health for early complication alerts. Designed interactive workflows to deliver personalized recovery guidance in real-time scenarios.",
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
    longDescription: "Engineered an AI-driven system to process diverse queries (policy retrieval, weather, web search) via modular FastAPI endpoints and graph workflows. Integrated document chunk extraction and vector embedding (Pinecone) for retrieval-augmented generation. Orchestrated CrewAI for asynchronous REST API management ensuring seamless query routing.",
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
  institution: "Indian Institute of Information Technology, Nagpur",
  degree: "Bachelor of Technology",
  major: "Computer Science and Engineering",
  duration: "November 2022 – June 2026",
  location: "Nagpur, Maharashtra"
};

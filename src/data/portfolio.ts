// ── Portfolio Data ──
// All content derived from Pushkar Dangwal's CVs

export const personalInfo = {
  name: "Pushkar Dangwal",
  initials: "PD",
  email: "dangwalpushkar@gmail.com",
  phone: "+91 8882668278",
  location: "Delhi",
  tagline: "COLLECTION '26",
  description:
    "Full-stack developer and IEEE published researcher with hands-on experience in secure systems, AI/ML integration, and distributed system design.",
  roles: ["Developer", "Engineer", "Scholar"] as const,
  socials: {
    github: "https://github.com/Pushkar-Dangwal",
    linkedin: "https://linkedin.com/in/pushkar-dangwal",
    leetcode: "https://leetcode.com/u/dangwalpushkar",
  },
};

export interface Project {
  title: string;
  subtitle: string;
  image: string;
  link: string;
  tech: string[];
  span: string;
}

export const projects: Project[] = [
  {
    title: "Blockchain IVS",
    subtitle: "Decentralised Identity & Fraud Detection",
    image: "/images/blockchain.png",
    link: "https://github.com/Pushkar-Dangwal/Blockchain-IVS",
    tech: ["Solidity", "React", "Node.js", "LightGBM"],
    span: "md:col-span-7",
  },
  {
    title: "CodeSync",
    subtitle: "Real-time Collaborative Coding",
    image: "/images/codesync.png",
    link: "https://github.com/Pushkar-Dangwal/CodeSync",
    tech: ["React", "TypeScript", "Socket.IO", "CodeMirror"],
    span: "md:col-span-5",
  },
  {
    title: "AI HealthMap",
    subtitle: "Hospital Supply Demand Forecasting",
    image: "/images/healthmap.png",
    link: "https://github.com/Pushkar-Dangwal/HealthMap",
    tech: ["React", "Node.js", "MongoDB", "Python"],
    span: "md:col-span-5",
  },
  {
    title: "BugDetector",
    subtitle: "AI-Powered Code Bug Detection",
    image: "/images/bugdetector.png",
    link: "https://github.com/Pushkar-Dangwal/BugDetector",
    tech: ["Python", "AI/ML", "Static Analysis", "React"],
    span: "md:col-span-7",
  },
];

export interface Publication {
  title: string;
  venue: string;
  date: string;
  link?: string;
  status: "published" | "presented";
}

export const publications: Publication[] = [
  {
    title: "Towards Trustworthy Digital Identity: Designing a Privacy-Enhancing Self-Sovereign Identity Framework",
    venue: "Presented at IC-ICNS (IEEE) 2026, C. V. Raman Global University",
    date: "03/2026",
    status: "presented",
  },
  {
    title: "Prescriptive Security Framework for Managing Risks and Quantifying Security in Software Development Practices",
    venue: "IEEE",
    date: "12/2024",
    link: "https://ieeexplore.ieee.org/document/10931938",
    status: "published",
  },
];

export interface TimelineItem {
  year: string;
  endYear?: string;
  title: string;
  organization: string;
  description: string;
  tags?: string[];
  link?: string;
  category: "education" | "work" | "publication" | "project";
}

export const timeline: TimelineItem[] = [
  {
    year: "Mar 2026",
    title: "IEEE Publication — SSI Framework",
    organization: "IC-ICNS 2026, C.V. Raman Global University",
    description: "Presented a privacy-enhancing self-sovereign identity framework for trustworthy digital identity management.",
    tags: ["IEEE", "Blockchain", "SSI"],
    category: "publication",
  },
  {
    year: "Jun 2025",
    endYear: "Aug 2025",
    title: "Blockchain Identity Verification System",
    organization: "Personal Project",
    description: "Built a decentralised identity verification system with Solidity smart contracts and ML fraud detection pipeline.",
    tags: ["Solidity", "React", "LightGBM"],
    link: "https://github.com/Pushkar-Dangwal/Blockchain-IVS",
    category: "project",
  },
  {
    year: "Jul 2025",
    endYear: "Aug 2025",
    title: "CodeSync — Real-time Collaboration",
    organization: "Personal Project",
    description: "Engineered a real-time collaborative coding platform with sub-second sync and multi-language execution.",
    tags: ["React", "Socket.IO", "TypeScript"],
    link: "https://github.com/Pushkar-Dangwal/CodeSync",
    category: "project",
  },
  {
    year: "Jun 2024",
    endYear: "Dec 2024",
    title: "SDE Intern — Delhi Police",
    organization: "Delhi Police, Rohini",
    description: "Built operational tools including a Kotlin Android app, WebRTC communication system, and Next.js Firebase dashboard. Reduced field lookup time to under 30 seconds.",
    tags: ["Kotlin", "Next.js", "Firebase", "WebRTC"],
    category: "work",
  },
  {
    year: "Dec 2024",
    title: "IEEE Publication — Security Framework",
    organization: "IEEE",
    description: "Prescriptive Security Framework for managing risks and quantifying security in software development practices.",
    tags: ["IEEE", "Security"],
    link: "https://ieeexplore.ieee.org/document/10931938",
    category: "publication",
  },
  {
    year: "Oct 2024",
    endYear: "Dec 2024",
    title: "AI HealthMap",
    organization: "Personal Project",
    description: "AI-powered demand forecasting system for hospital critical supplies with real-time threshold alerts.",
    tags: ["React", "Python", "MongoDB"],
    link: "https://github.com/Pushkar-Dangwal/HealthMap",
    category: "project",
  },
  {
    year: "2022",
    endYear: "Present",
    title: "B.Tech Computer Science",
    organization: "Sharda University, Greater Noida",
    description: "CGPA: 8.72 | 1st Prize, Technokrats 2023 | LeetCode rank under 70,000 (700+ problems solved)",
    tags: ["DSA", "System Design", "OOP"],
    category: "education",
  },
  {
    year: "2021",
    endYear: "2022",
    title: "XII Class — 94.33%",
    organization: "Ganga International School, New Delhi",
    description: "Completed senior secondary education with distinction.",
    category: "education",
  },
];

export interface SkillNode {
  id: string;
  label: string;
  category: string;
}

export interface SkillConnection {
  from: string;
  to: string;
}

export const skillCategories = [
  { id: "languages", label: "Languages", color: "#89AACC" },
  { id: "frameworks", label: "Frameworks & Libraries", color: "#7CC9A0" },
  { id: "databases", label: "Databases", color: "#C98DBF" },
  { id: "blockchain", label: "Blockchain", color: "#E0C060" },
  { id: "aiml", label: "AI/ML", color: "#E08B6D" },
  { id: "tools", label: "Tools & Platforms", color: "#8B9DC3" },
  { id: "web", label: "Web Technologies", color: "#6EC5E9" },
  { id: "cs", label: "CS Concepts", color: "#B0B0B0" },
];

export const skillNodes: SkillNode[] = [
  // Languages
  { id: "java", label: "Java", category: "languages" },
  { id: "javascript", label: "JavaScript", category: "languages" },
  { id: "typescript", label: "TypeScript", category: "languages" },
  { id: "python", label: "Python", category: "languages" },
  { id: "kotlin", label: "Kotlin", category: "languages" },
  { id: "solidity", label: "Solidity", category: "languages" },
  // Frameworks
  { id: "react", label: "React", category: "frameworks" },
  { id: "nodejs", label: "Node.js", category: "frameworks" },
  { id: "express", label: "Express.js", category: "frameworks" },
  { id: "nextjs", label: "Next.js", category: "frameworks" },
  { id: "springboot", label: "Spring Boot", category: "frameworks" },
  { id: "flutter", label: "Flutter", category: "frameworks" },
  { id: "flask", label: "Flask", category: "frameworks" },
  // Databases
  { id: "mysql", label: "MySQL", category: "databases" },
  { id: "mongodb", label: "MongoDB", category: "databases" },
  { id: "firebase", label: "Firebase", category: "databases" },
  { id: "elasticsearch", label: "Elasticsearch", category: "databases" },
  // Blockchain
  { id: "smartcontracts", label: "Smart Contracts", category: "blockchain" },
  { id: "ssi", label: "SSI", category: "blockchain" },
  { id: "web3", label: "Web3", category: "blockchain" },
  // AI/ML
  { id: "transformers", label: "Transformers", category: "aiml" },
  { id: "llm", label: "LLMs", category: "aiml" },
  { id: "lightgbm", label: "LightGBM", category: "aiml" },
  { id: "predictive", label: "Predictive Analytics", category: "aiml" },
  // Tools
  { id: "git", label: "Git", category: "tools" },
  { id: "docker", label: "Docker", category: "tools" },
  { id: "aws", label: "AWS", category: "tools" },
  { id: "postman", label: "Postman", category: "tools" },
  { id: "streamlit", label: "Streamlit", category: "tools" },
  // Web
  { id: "html", label: "HTML", category: "web" },
  { id: "css", label: "CSS", category: "web" },
  { id: "restapi", label: "REST APIs", category: "web" },
  { id: "webrtc", label: "WebRTC", category: "web" },
  { id: "socketio", label: "Socket.IO", category: "web" },
  // CS Concepts
  { id: "dsa", label: "DSA", category: "cs" },
  { id: "oop", label: "OOP", category: "cs" },
  { id: "sysdesign", label: "System Design", category: "cs" },
  { id: "security", label: "Secure Coding", category: "cs" },
  { id: "distributed", label: "Distributed Systems", category: "cs" },
];

export const skillConnections: SkillConnection[] = [
  // JS ecosystem
  { from: "javascript", to: "typescript" },
  { from: "javascript", to: "react" },
  { from: "javascript", to: "nodejs" },
  { from: "typescript", to: "react" },
  { from: "typescript", to: "nextjs" },
  { from: "nodejs", to: "express" },
  { from: "react", to: "nextjs" },
  // Python ecosystem
  { from: "python", to: "flask" },
  { from: "python", to: "transformers" },
  { from: "python", to: "llm" },
  { from: "python", to: "lightgbm" },
  { from: "python", to: "predictive" },
  { from: "python", to: "streamlit" },
  // Java ecosystem
  { from: "java", to: "springboot" },
  { from: "java", to: "dsa" },
  // Kotlin
  { from: "kotlin", to: "java" },
  { from: "kotlin", to: "firebase" },
  // Blockchain
  { from: "solidity", to: "smartcontracts" },
  { from: "smartcontracts", to: "ssi" },
  { from: "smartcontracts", to: "web3" },
  { from: "solidity", to: "web3" },
  // DB connections
  { from: "mongodb", to: "nodejs" },
  { from: "mysql", to: "springboot" },
  { from: "firebase", to: "nextjs" },
  { from: "elasticsearch", to: "nodejs" },
  // Web connections
  { from: "html", to: "css" },
  { from: "html", to: "react" },
  { from: "restapi", to: "express" },
  { from: "restapi", to: "flask" },
  { from: "webrtc", to: "socketio" },
  { from: "socketio", to: "nodejs" },
  // Tools
  { from: "git", to: "docker" },
  { from: "docker", to: "aws" },
  { from: "postman", to: "restapi" },
  // CS
  { from: "dsa", to: "oop" },
  { from: "oop", to: "sysdesign" },
  { from: "sysdesign", to: "distributed" },
  { from: "security", to: "sysdesign" },
  { from: "distributed", to: "socketio" },
  // AI/ML cross-links
  { from: "lightgbm", to: "predictive" },
  { from: "transformers", to: "llm" },
];

export interface Stat {
  value: string;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "700", suffix: "+", label: "Problems Solved" },
  { value: "2", suffix: "", label: "IEEE Publications" },
  { value: "4", suffix: "+", label: "Projects Built" },
];

export const navLinks = ["Home", "Work", "Resume"] as const;

export const HLS_VIDEO_SRC =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";


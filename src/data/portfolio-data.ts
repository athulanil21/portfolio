import {
  Brain,
  Code2,
  Cloud,
  Database,
  Globe,
  Bot,
  Cpu,
  Server,
  Layers,
  Workflow,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/* ───────── Personal Info ───────── */
export const personalInfo = {
  name: "Athul Anil Kumar",
  title: "AI Engineer @ ARTCL",
  image: "/profile.png",
  taglines: [
    "Crafting Intelligent Systems",
    "Building the Future with AI",
    "LLM Engineering & Beyond",
    "Full-Stack AI Solutions",
  ],
  bio: "I design and build intelligent systems that bridge the gap between cutting-edge AI research and real-world applications. Specializing in LLM engineering, agentic systems, and full-stack development — I turn complex ideas into elegant, production-ready software.",
  email: "athulanilkumar021@gmail.com",
  location: "India",
  availability: "Open to opportunities",
  social: {
    github: "https://github.com/athulanil21",
    linkedin: "https://www.linkedin.com/in/athul-anil-kumar21/",
  },
};

/* ───────── Navigation ───────── */
export const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

/* ───────── About Stats ───────── */
export const stats = [
  { label: "Years Experience", value: 5, suffix: "+" },
  { label: "Projects Delivered", value: 30, suffix: "+" },
  { label: "Technologies", value: 25, suffix: "+" },
  { label: "Happy Clients", value: 15, suffix: "+" },
];

/* ───────── Skills ───────── */
export interface Skill {
  name: string;
  icon: LucideIcon;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "ai-ml",
    label: "AI / ML",
    icon: Brain,
    color: "#00b4ff",
    skills: [
      { name: "PyTorch", icon: Cpu },
      { name: "TensorFlow", icon: Cpu },
      { name: "Scikit-Learn", icon: Sparkles },
      { name: "Hugging Face", icon: Bot },
      { name: "Computer Vision", icon: Layers },
      { name: "NLP", icon: Brain },
    ],
  },
  {
    id: "llm",
    label: "LLM Engineering",
    icon: Bot,
    color: "#a855f7",
    skills: [
      { name: "OpenAI API", icon: Sparkles },
      { name: "LangChain", icon: Workflow },
      { name: "RAG Systems", icon: Database },
      { name: "Fine-tuning", icon: Cpu },
      { name: "Prompt Engineering", icon: Brain },
      { name: "Agents & Tools", icon: Bot },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    color: "#06ffd0",
    skills: [
      { name: "Node.js", icon: Server },
      { name: "Python", icon: Code2 },
      { name: "FastAPI", icon: Sparkles },
      { name: "Express", icon: Server },
      { name: "GraphQL", icon: Layers },
      { name: "REST APIs", icon: Globe },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: Globe,
    color: "#ff0055",
    skills: [
      { name: "React", icon: Code2 },
      { name: "Next.js", icon: Globe },
      { name: "TypeScript", icon: Code2 },
      { name: "Tailwind CSS", icon: Layers },
      { name: "Three.js", icon: Sparkles },
      { name: "Framer Motion", icon: Workflow },
    ],
  },
  {
    id: "cloud",
    label: "Cloud / DevOps",
    icon: Cloud,
    color: "#f97316",
    skills: [
      { name: "AWS", icon: Cloud },
      { name: "Docker", icon: Server },
      { name: "Kubernetes", icon: Layers },
      { name: "CI/CD", icon: Workflow },
      { name: "Terraform", icon: Cloud },
      { name: "Vercel", icon: Globe },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: Database,
    color: "#10b981",
    skills: [
      { name: "PostgreSQL", icon: Database },
      { name: "MongoDB", icon: Database },
      { name: "Redis", icon: Database },
      { name: "Pinecone", icon: Sparkles },
      { name: "ChromaDB", icon: Database },
      { name: "Supabase", icon: Cloud },
    ],
  },
  {
    id: "automation",
    label: "Automation",
    icon: Workflow,
    color: "#eab308",
    skills: [
      { name: "n8n", icon: Workflow },
      { name: "Zapier", icon: Workflow },
      { name: "Web Scraping", icon: Globe },
      { name: "Chatbots", icon: Bot },
      { name: "MCP Servers", icon: Server },
      { name: "API Integrations", icon: Layers },
    ],
  },
];

/* ───────── Projects ───────── */
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: string;
  featured: boolean;
  gradient: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  size: "small" | "medium" | "large";
}

export const projects: Project[] = [
  {
    id: "erp-mcp-server",
    title: "ERP MCP Server",
    description: "Dockerized Model Context Protocol server bridging AI agents with ERP systems",
    longDescription:
      "Built a Dockerized MCP server that connects AI clients (Claude, Cursor) and web/mobile apps to the ERP system. Exposes tools for stock queries, sales data, customer balances, and product searches. Deployed on VPS with Docker for scalable, isolated execution.",
    techStack: ["TypeScript", "MCP SDK", "Docker", "Redis", "Express", "VPS"],
    category: "AI/ML",
    featured: true,
    gradient: "from-cyan-500/20 via-blue-500/20 to-purple-500/20",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    size: "large",
  },
  {
    id: "telegram-erp-bot",
    title: "Telegram ERP Chatbot",
    description: "World's first ERP chatbot on Telegram — manage your entire business from chat",
    longDescription:
      "Built the world's first ERP chatbot on Telegram, enabling users to manage billing, stock, sales, customer balances, and more through natural language. Features voice transcription (Sarvam AI + Groq Whisper), PDF receipt generation, barcode printing, interactive buttons, multi-language support for Indian languages, service business modes (hotels, gyms, spas), storefront integration, Tally XML migration, and AI-powered agents for payment collection and smart alerts.",
    techStack: ["TypeScript", "Telegram Bot API", "LLMs", "Sarvam AI", "Groq", "Redis", "ERP Integration"],
    category: "LLM",
    featured: true,
    gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&h=600&fit=crop",
    size: "large",
  },
  {
    id: "whatsapp-erp-bot",
    title: "WhatsApp ERP Chatbot",
    description: "World's first ERP chatbot on WhatsApp — business management in your pocket",
    longDescription:
      "Built the world's first ERP chatbot on WhatsApp, bringing full ERP capabilities to the world's most popular messaging platform. Users can create bills, check stock, view sales, manage customers, and run their entire business through WhatsApp messages. Supports interactive reply buttons, list pickers, document sharing (PDF receipts, CSV templates), voice messages, multi-language support, service business workflows, and subscription management with AutoPay integration.",
    techStack: ["TypeScript", "WhatsApp Cloud API", "LLMs", "Meta Graph API", "Redis", "ERP Integration"],
    category: "LLM",
    featured: true,
    gradient: "from-green-500/20 via-emerald-500/20 to-cyan-500/20",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=600&fit=crop",
    size: "medium",
  },
  {
    id: "artcl-ai",
    title: "ARTCL AI Platform",
    description: "Enterprise AI automation and service bot platform",
    longDescription:
      "Core developer for ai.artcl.in, integrating conversational service bots, multi-tenant automated scheduling, and business workflows directly over WhatsApp and Telegram.",
    techStack: ["Next.js", "Python", "LLMs", "Chatbots"],
    category: "AI/ML",
    featured: true,
    gradient: "from-blue-500/20 via-purple-500/20 to-cyan-500/20",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=600&fit=crop",
    liveUrl: "https://ai.artcl.in",
    size: "medium",
  },
  {
    id: "saybill-erp",
    title: "SayBill Management System",
    description: "Comprehensive CodeIgniter-based ERP ecosystem",
    longDescription:
      "Engineered the SayBill ERP, providing modular stock management, freezer customization, multi-store dashboard analytics, and Shopify synchronization capabilities.",
    techStack: ["PHP", "CodeIgniter", "MySQL", "jQuery"],
    category: "Full Stack",
    featured: true,
    gradient: "from-purple-500/20 via-pink-500/20 to-orange-500/20",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    size: "small",
  },
  {
    id: "lend-rental",
    title: "LEND - Driver And Car Rental Platform",
    description: "Web-based Car Rental and Driver Hiring system using Python-Django Framework",
    longDescription:
      "Developed a web-based Car Rental and Driver Hiring system using Python-Django Framework. Enabled car owners to list vehicles for rent and users to book cars with or without drivers. Implemented a feedback and rating system for both car owners and drivers. Focused on scalability and user-friendly design for seamless user experience. Streamlined vehicle and driver bookings for personal and commercial transportation needs.",
    techStack: ["Python", "Django", "PostgreSQL", "HTML", "CSS", "JavaScript"],
    category: "Full Stack",
    featured: true,
    gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    size: "small",
  },
  {
    id: "omnichannel-integration",
    title: "Omnichannel Integration",
    description: "E-commerce integration with ARTCL ERP (Shopify to ERP integration)",
    longDescription:
      "Developed a seamless integration between Shopify and ARTCL ERP, automating bill editing and synchronization processes. Streamlined order management and inventory updates across platforms.",
    techStack: ["Shopify API", "ERP Integration", "Automation", "PHP", "MySQL"],
    category: "Automation",
    featured: false,
    gradient: "from-orange-500/20 via-red-500/20 to-pink-500/20",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    size: "small",
  },
  {
    id: "custom-erp",
    title: "Custom Multi-Tenant ERPs",
    description: "Deployments for various e-commerce and retail clients",
    longDescription:
      "Architected and deployed highly customized business management solutions for numerous domains including Cart24, Everest, MetroTraders, and DailyNeeds.",
    techStack: ["PHP", "CodeIgniter", "MySQL", "Apache"],
    category: "Full Stack",
    featured: false,
    gradient: "from-green-500/20 via-emerald-500/20 to-teal-500/20",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
    size: "small",
  },
];

export const projectCategories = ["All", "AI/ML", "LLM", "Full Stack", "Automation"];

/* ───────── Experience ───────── */
export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  techStack: string[];
  type: "fulltime" | "freelance" | "internship";
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "AI Engineer",
    company: "ARTCL",
    duration: "Present",
    description:
      "Building intelligent systems, custom ERP solutions, and leading AI initiatives. Please refer to my LinkedIn and GitHub profiles for a detailed work history and other experiences.",
    techStack: ["Python", "PHP", "CodeIgniter", "Next.js", "AI/ML"],
    type: "fulltime",
  },
  {
    id: "exp-2",
    role: "Python Django Intern",
    company: "Techno Dot Academy",
    duration: "2025 ",
    description:
      "Developed and maintained web applications using Django and Python, contributing to both front-end and back-end functionalities. Worked with relational databases like PostgreSQL/MySQL for creating models, writing queries, and managing migrations. Assisted in developing user authentication and authorization features using Django's built-in tools. Collaborated with senior developers in Agile/Scrum environment, participating in sprint planning, daily stand-ups, and code reviews. Debugged and optimized code for better performance and maintainability using unit testing and debugging tools. Utilized Git and GitHub/GitLab for version control and collaborative development. Contributed to the front-end using HTML, CSS, JavaScript, and integrated templates with Django views. Documented code and created project-related documentation to ensure maintainability and team clarity.",
    techStack: ["Python", "Django", "PostgreSQL", "MySQL", "HTML", "CSS", "JavaScript", "Git"],
    type: "internship",
  },
];

/* ───────── Testimonials ───────── */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah Chen",
    role: "CTO",
    company: "StartupX",
    quote:
      "Athul built our entire AI pipeline from scratch. His understanding of both the ML side and production engineering is rare and incredibly valuable.",
  },
  {
    id: "t2",
    name: "Marcus Rivera",
    role: "Product Manager",
    company: "DataFlow",
    quote:
      "Working with Athul transformed how we think about automation. He delivered solutions that were not just functional but truly intelligent.",
  },
  {
    id: "t3",
    name: "Emily Park",
    role: "CEO",
    company: "TechNova",
    quote:
      "The chatbot system Athul built handles 80% of our customer inquiries autonomously. The ROI was visible within the first month.",
  },
  {
    id: "t4",
    name: "David Kim",
    role: "Engineering Lead",
    company: "CloudScale",
    quote:
      "Athul's code quality and architectural thinking are top-notch. He doesn't just write code — he engineers solutions.",
  },
  {
    id: "t5",
    name: "Priya Sharma",
    role: "Founder",
    company: "AIFirst",
    quote:
      "From concept to deployment in 3 weeks. Athul's speed and quality of execution is exceptional. Highly recommend.",
  },
  {
    id: "t6",
    name: "James Wu",
    role: "VP Engineering",
    company: "NeuralNet Corp",
    quote:
      "Athul brought a unique blend of creativity and technical depth to our team. His AI solutions exceeded our expectations.",
  },
];

/* ───────── Education ───────── */
export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  icon: LucideIcon;
}

export const education: Education[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Computer Applications",
    institution: "University Of Calicut",
    duration: "2022 - 2025",
    icon: Globe,
  },
  {
    id: "edu-2",
    degree: "Diploma in AI and DataScience",
    institution: "M Skills",
    duration: "2022 - 2025",
    icon: Brain,
  },
];

/* ───────── Certifications ───────── */
export interface Certification {
  id: string;
  name: string;
  issuer: string;
}

export const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "Data Visualisation",
    issuer: "Tata Group",
  },
  {
    id: "cert-2",
    name: "Cloud Platform Job Simulation",
    issuer: "Verizon",
  },
  {
    id: "cert-3",
    name: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia",
  },
  {
    id: "cert-4",
    name: "Project Management Job Simulation",
    issuer: "Accenture North America",
  },
  {
    id: "cert-5",
    name: "Learn Prompting",
    issuer: "Chatgpt for everyone",
  },
];

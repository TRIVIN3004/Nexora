import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Cpu, Smartphone, Database, Cloud, GraduationCap, 
  FileText, Palette, ChevronLeft, ChevronRight, Send, Mail, 
  MapPin, ArrowRight, 
  CheckCircle2, Menu, X, Sparkles, Code, 
  Layers, Award, Clock, DollarSign,
  ChevronDown, ExternalLink, Briefcase, Bot, Users, BookOpen,
  Search, ArrowUpRight, Terminal,
  Zap, Compass, Star
} from 'lucide-react';
import trivinPhoto from './assets/trivin.png';
import aakashrajPhoto from './assets/aakashraj.png';
import arutselvanPhoto from './assets/arutselvan.png';
import Logo3D from './components/Logo3D';
import WelcomeNamaste from './components/WelcomeNamaste';
import Scroll3DReveal from './components/Scroll3DReveal';
import Background3D from './components/Background3D';
import Tilt from 'react-parallax-tilt';

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projectFilter, setProjectFilter] = useState('all');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    requirement: 'Web Development',
    message: ''
  });
  const [viewingAllTeam, setViewingAllTeam] = useState(false);
  const [teamSearch, setTeamSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [portalsDropdownOpen, setPortalsDropdownOpen] = useState(false);
  const [logoAnimation, setLogoAnimation] = useState('float');

  // Dismiss welcome preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-slide testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % 4);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'portals', 'about', 'services', 'technologies', 'projects', 'why-choose-us', 'team', 'careers', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when loading or viewing team modal
  useEffect(() => {
    if (loading || viewingAllTeam) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loading, viewingAllTeam]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      const subject = encodeURIComponent(`Nexora Project Inquiry - ${formData.requirement}`);
      const body = encodeURIComponent(
        `Hello Nexora Technologies,\n\n` +
        `You have received a new project inquiry:\n\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Requirement: ${formData.requirement}\n\n` +
        `Message:\n${formData.message}\n\n` +
        `Best regards,\n${formData.name}`
      );
      
      window.location.href = `mailto:contactnexoratechs@gmail.com?subject=${subject}&body=${body}`;

      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', requirement: 'Web Development', message: '' });
      }, 5000);
    }
  };

  // Portals Data
  const portalsList = [
    {
      id: "nexora-connect",
      title: "Nexora Connect",
      subtitle: "Internal Collaboration & Learning Portal",
      description: "Interactive masterclasses, team syncs, recordings archive, wiki notes, and support tickets desk.",
      url: "https://nexora-connect-seven.vercel.app/",
      icon: Users,
      badge: "Featured / New",
      color: "from-indigo-600 to-blue-600",
      accent: "text-indigo-600 bg-indigo-50 border-indigo-200"
    },
    {
      id: "dpr-portal",
      title: "DPR Portal",
      subtitle: "Daily Project Reporting System",
      description: "Automated progress tracking, daily updates, client reporting logs, and deliverable metrics.",
      url: "https://dpr-nexora.vercel.app/",
      icon: FileText,
      badge: "Core System",
      color: "from-blue-600 to-cyan-600",
      accent: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      id: "internship-portal",
      title: "Internship Portal",
      subtitle: "Student & Intern Management",
      description: "Fast applications, track status, mentorship workflows, domain tasks, and digital certificates.",
      url: "https://internship-portal-silk.vercel.app/",
      icon: GraduationCap,
      badge: "Academic Hub",
      color: "from-cyan-600 to-teal-600",
      accent: "text-cyan-600 bg-cyan-50 border-cyan-200"
    },
    {
      id: "hiregen-portal",
      title: "HireGenAI Portal",
      subtitle: "Smart AI-Driven Recruitment",
      description: "Automated resume parsing, candidate scoring pipelines, and intelligent interview assessments.",
      url: "https://hiregen-smart-recruiter.vercel.app/",
      icon: Briefcase,
      badge: "AI Powered",
      color: "from-purple-600 to-fuchsia-600",
      accent: "text-purple-600 bg-purple-50 border-purple-200"
    },
    {
      id: "prdams-portal",
      title: "PRDAMS Portal",
      subtitle: "Project Receipt & Acknowledgements",
      description: "Digital verified receipt generation, clearance vouchers, and cryptographic verification logs.",
      url: "https://acknowledgement-generator-roan.vercel.app/",
      icon: Award,
      badge: "Verification",
      color: "from-emerald-600 to-teal-600",
      accent: "text-emerald-600 bg-emerald-50 border-emerald-200"
    }
  ];

  // Static Data: Services
  const services = [
    {
      title: "Portfolio Websites",
      description: "Custom, interactive, and eye-catching personal and business portfolios designed to showcase your work and attract clients.",
      icon: Palette,
      tag: "Design & UX",
      gradient: "from-purple-500/10 to-indigo-500/10"
    },
    {
      title: "Web Development",
      description: "High-performance, secure, and modern web applications built using cutting-edge frameworks like React, Next.js, and Node.js.",
      icon: Globe,
      tag: "Full-Stack",
      gradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      title: "Mobile App Development",
      description: "Cross-platform iOS and Android applications with native-like performance, elegant UI, and smooth animations.",
      icon: Smartphone,
      tag: "iOS & Android",
      gradient: "from-cyan-500/10 to-teal-500/10"
    },
    {
      title: "AI & Machine Learning Solutions",
      description: "Custom intelligent models, predictive analytics, natural language processing, deep learning pipelines, and smart chatbots.",
      icon: Cpu,
      tag: "Deep Tech",
      gradient: "from-fuchsia-500/10 to-purple-500/10"
    },
    {
      title: "UI/UX Design",
      description: "User-centric wireframes, high-fidelity prototypes, and sleek interfaces that provide intuitive digital journeys.",
      icon: Layers,
      tag: "Product Design",
      gradient: "from-pink-500/10 to-rose-500/10"
    },
    {
      title: "Database Management",
      description: "Robust data architectures, schema designs, secure API scaling, and high-availability setups using MongoDB, MySQL, and PostgreSQL.",
      icon: Database,
      tag: "Data Arch",
      gradient: "from-amber-500/10 to-orange-500/10"
    },
    {
      title: "Cloud Deployment",
      description: "Seamless infrastructure setup, serverless deployments, CI/CD automated pipelines, and cloud hosting on AWS and Google Cloud.",
      icon: Cloud,
      tag: "DevOps & Cloud",
      gradient: "from-sky-500/10 to-indigo-500/10"
    },
    {
      title: "College Mini & Major Projects",
      description: "End-to-end guidance, clean implementation, report writing, and complete project codebases for engineering and computer science students.",
      icon: GraduationCap,
      tag: "Academic",
      gradient: "from-emerald-500/10 to-teal-500/10"
    },
    {
      title: "Research Paper Support",
      description: "Technical implementations, experimental results generation, data plotting, and drafting reviews for publication in reputed journals.",
      icon: FileText,
      tag: "Publication",
      gradient: "from-violet-500/10 to-purple-500/10"
    },
    {
      title: "Civil CAD & Structural Design",
      description: "2D/3D building layouts, AutoCAD plans, structural drafting, and STAAD Pro analysis for engineering projects and construction plans.",
      icon: Layers,
      tag: "Engineering",
      gradient: "from-blue-500/10 to-indigo-500/10"
    }
  ];

  const technologies = [
    { name: "React 19", icon: Code, color: "hover:border-blue-500 hover:text-blue-600" },
    { name: "Node.js", icon: Globe, color: "hover:border-green-500 hover:text-green-600" },
    { name: "Python AI", icon: Cpu, color: "hover:border-yellow-500 hover:text-yellow-600" },
    { name: "Java Spring", icon: Code, color: "hover:border-red-500 hover:text-red-600" },
    { name: "MongoDB", icon: Database, color: "hover:border-emerald-500 hover:text-emerald-600" },
    { name: "Firebase", icon: Cloud, color: "hover:border-orange-500 hover:text-orange-600" },
    { name: "TensorFlow", icon: Cpu, color: "hover:border-orange-600 hover:text-orange-700" },
    { name: "PostgreSQL", icon: Database, color: "hover:border-blue-600 hover:text-blue-700" },
    { name: "AWS Cloud", icon: Cloud, color: "hover:border-amber-500 hover:text-amber-600" },
    { name: "GitHub", icon: GithubIcon, color: "hover:border-slate-800 hover:text-slate-900" },
    { name: "AutoCAD", icon: Layers, color: "hover:border-red-600 hover:text-red-600" },
    { name: "STAAD Pro", icon: Layers, color: "hover:border-indigo-600 hover:text-indigo-600" }
  ];

  const projects = [
    {
      title: "Nexora Connect Portal",
      category: "app",
      description: "Centralized internal collaboration and learning portal featuring interactive webinars, team syncs, recordings archive, wiki knowledge notes, and ticket desk.",
      tech: ["React 19", "Vite", "Tailwind CSS", "Realtime"],
      imagePath: "connect_preview",
      liveUrl: "https://nexora-connect-seven.vercel.app/"
    },
    {
      title: "Personal Portfolio Website",
      category: "web",
      description: "A premium personal portfolio website featuring glassmorphism elements, light themes, and immersive scroll animations.",
      tech: ["React", "Framer Motion", "Tailwind CSS"],
      imagePath: "portfolio_preview"
    },
    {
      title: "Smart No Dues Approval System",
      category: "app",
      description: "An automated clearance portal for academic institutions enabling digital approvals and secure database updates.",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      imagePath: "nodues_preview",
      liveUrl: "https://dpr-nexora.vercel.app/"
    },
    {
      title: "AI Chatbot",
      category: "ai",
      description: "Context-aware conversational agent utilizing natural language processing and vector embedding retrieval.",
      tech: ["Python", "TensorFlow", "FastAPI", "React"],
      imagePath: "chatbot_preview",
      liveUrl: "https://nexora-ai-chatbot-zeta.vercel.app"
    },
    {
      title: "HireGen Smart Recruiter",
      category: "ai",
      description: "Automated candidate shortlisting, resume scoring pipelines, and AI-driven interview evaluation system.",
      tech: ["React", "Python", "OpenAI", "Tailwind CSS"],
      imagePath: "hiregen_preview",
      liveUrl: "https://hiregen-smart-recruiter.vercel.app/"
    },
    {
      title: "Deepfake Detection System",
      category: "ai",
      description: "Advanced model analyzing spatial and temporal anomalies in video feeds to classify AI-generated alterations.",
      tech: ["Python", "PyTorch", "TensorFlow", "OpenCV"],
      imagePath: "deepfake_preview"
    },
    {
      title: "E-commerce Website",
      category: "web",
      description: "Feature-rich online store built with secure checkout integration, order tracking, and intuitive admin dashboards.",
      tech: ["React", "Node.js", "MySQL", "AWS"],
      imagePath: "ecommerce_preview"
    },
    {
      title: "Android Application",
      category: "mobile",
      description: "A location-based service application with live tracking, offline synchronization, and instant push notifications.",
      tech: ["React Native", "Firebase", "Redux", "Node"],
      imagePath: "android_preview"
    },
    {
      title: "Smart Building Layout & CAD Design",
      category: "civil",
      description: "A comprehensive 2D/3D commercial complex blueprint with optimized spatial layout planning, electrical mapping, and CAD modeling.",
      tech: ["AutoCAD", "Revit", "SketchUp"],
      imagePath: "civil_cad_preview"
    },
    {
      title: "Structural Stress Analysis & Design",
      category: "civil",
      description: "STAAD Pro modeling and stress-strain calculations for concrete structures under dynamic load scenarios.",
      tech: ["STAAD Pro", "ETABS", "RCC Design"],
      imagePath: "civil_stress_preview"
    }
  ];

  const benefits = [
    {
      title: "Quality Delivery",
      description: "We enforce high coding standards, meticulous QA checks, and premium visual components to ensure a flawless experience.",
      icon: Award,
      color: "from-indigo-500 to-blue-500"
    },
    {
      title: "Modern Technologies",
      description: "We use the latest tech stacks (React 19, Tailwind v4, Python AI libraries) to ensure your software is future-proof.",
      icon: Sparkles,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Affordable Pricing",
      description: "Sleek architectural plans and agile dev methodologies allow us to offer top-tier tech at competitive rates.",
      icon: DollarSign,
      color: "from-cyan-500 to-emerald-500"
    },
    {
      title: "Scalable Solutions",
      description: "We build systems optimized for load-balancing, ready to support thousands of active users without lag.",
      icon: Layers,
      color: "from-pink-500 to-purple-500"
    },
    {
      title: "Continuous Support",
      description: "Our dedicated support team provides proactive updates, security patches, and cloud maintenance post-launch.",
      icon: Clock,
      color: "from-rose-500 to-orange-500"
    }
  ];

  const team = [
    {
      name: "Trivin",
      role: "Founder & Lead Strategist",
      desc: "Visionary entrepreneur driving innovation, leading strategic growth, and building impactful technology solutions that empower businesses and students.",
      skills: ["System Architecture", "AI Integration", "Product Strategy", "AI & Software Development"],
      image: trivinPhoto,
      founder: true
    },
    {
      name: "Aakashraj",
      role: "Co-Founder & Social Media Head",
      desc: "Leads digital brand growth by creating engaging content, managing social media campaigns, and building meaningful audience engagement across multiple platforms.",
      skills: ["Content Strategy", "Social Media Marketing", "Canva & Adobe Express", "Analytics & Tracking", "Brand Management"],
      image: aakashrajPhoto,
      founder: true
    },
    {
      name: "Arutselvan",
      role: "Co-Founder & Team Leader",
      desc: "Directs project execution, orchestrates cross-functional engineering groups, and ensures top-tier quality delivery across all client solutions.",
      skills: ["Project Leadership", "Software Architecture", "Agile Workflows", "Team Coordination", "Client Relations"],
      image: arutselvanPhoto,
      founder: true
    },
    {
      name: "Gopika",
      role: "Java Developer",
      desc: "Crafts robust, enterprise-grade server-side applications, optimized databases, and microservices architectures using Java technologies.",
      skills: ["Java / Spring Boot", "REST APIs", "SQL / NoSQL", "Multithreading"]
    },
    {
      name: "Akshaya",
      role: "Gen AI Engineer",
      desc: "Develops intelligence solutions, integrating advanced large language models, prompt engineering pipelines, and vector database search agents.",
      skills: ["Generative AI", "LLM Integration", "Python / LangChain", "Vector Databases"]
    },
    {
      name: "Amirtha",
      role: "UI/UX & Android Developer",
      desc: "Focuses on designing clean user journeys, high-fidelity prototypes, and building interactive, high-performance native Android applications.",
      skills: ["Android Studio", "Kotlin / Java", "Figma", "Mobile UI Design"]
    },
    {
      name: "Pavithraa",
      role: "Full Stack Developer",
      desc: "Develops scalable end-to-end web applications with performant React frontends, robust Node.js APIs, and secure database schemas.",
      skills: ["React / Vite", "Node.js / Express", "MongoDB", "Tailwind CSS"]
    },
    {
      name: "Shrimathi",
      role: "AI & ML Specialist",
      desc: "Engineers machine learning pipelines, predictive neural networks, and computer vision algorithms tailored for enterprise data.",
      skills: ["Python", "TensorFlow / Keras", "Scikit-Learn", "Computer Vision"]
    },
    {
      name: "Srinithi",
      role: "Java Developer",
      desc: "Specializes in constructing robust, high-throughput backend services and secure microservices frameworks using Java.",
      skills: ["Java / Spring Boot", "RESTful APIs", "Hibernate / JPA", "PostgreSQL"]
    },
    {
      name: "Santhoshraj",
      role: "Android Developer",
      desc: "Crafts high-performance native mobile applications with clean architecture, responsive layouts, and seamless API integrations.",
      skills: ["Android SDK", "Kotlin / Java", "Jetpack Compose", "Material Design"]
    }
  ];

  const testimonials = [
    {
      text: "Nexora Technologies transformed our legacy paper clearances into a lightning-fast 'Smart No Dues' portal. The visual style is premium and our administrative efficiency skyrocketed by 90%!",
      author: "Prof. Ramachandran K.",
      position: "Dean of Academic Affairs, SEC",
      rating: 5
    },
    {
      text: "The AI Chatbot Nexora developed was stellar. It integrates seamlessly into our website, handles 80% of our customer queries automatically, and has a sleek, interactive modern UI.",
      author: "Meera Sen",
      position: "Product Lead, Zenic Media",
      rating: 5
    },
    {
      text: "I hired Nexora for my major college project and research paper implementation. The code was exceptionally structured and their team helped me publish in a high-ranking journal!",
      author: "Arjun Sharma",
      position: "Computer Science Graduate",
      rating: 5
    },
    {
      text: "Absolute professionals. Their cloud deployment pipeline setup on AWS saved us thousands in server bills, and their post-launch support keeps our app running flawlessly.",
      author: "Jessica Carter",
      position: "CTO, FinOrbit Labs",
      rating: 5
    }
  ];

  const filteredProjects = projectFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === projectFilter);

  const filteredTeam = team.filter(t => 
    t.name.toLowerCase().includes(teamSearch.toLowerCase()) ||
    t.role.toLowerCase().includes(teamSearch.toLowerCase()) ||
    t.skills.some(s => s.toLowerCase().includes(teamSearch.toLowerCase()))
  );

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    setViewingAllTeam(false);
    
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <>
      {/* 1. WELCOME PRELOADER */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              y: -1000,
              transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
            }}
            className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center text-white overflow-hidden"
          >
            {/* Ambient Glows */}
            <div className="absolute w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="z-10 flex flex-col items-center space-y-6 max-w-md px-6 text-center">
              {/* Welcoming Figure with Joining Hands */}
              <WelcomeNamaste />

              {/* Company Title */}
              <div className="space-y-2">
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-3xl sm:text-4xl font-extrabold tracking-widest font-display bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent"
                >
                  NEXORA
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-xs sm:text-sm font-mono tracking-[0.25em] text-indigo-400 uppercase font-semibold"
                >
                  Technologies
                </motion.p>
              </div>

              {/* Progress Bar Loader */}
              <div className="w-48 h-[3px] bg-white/10 rounded-full overflow-hidden relative">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500"
                />
              </div>

              {/* Slogan */}
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-[11px] font-display text-slate-500 italic font-medium"
              >
                "Building Tomorrow, Today."
              </motion.p>
            </div>
            
            {/* Skip Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              onClick={() => setLoading(false)}
              className="absolute bottom-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-mono tracking-widest text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all duration-200 cursor-pointer z-50"
            >
              SKIP WELCOME
            </motion.button>
            
            <div className="absolute inset-0 bg-grid-cyber opacity-[0.03] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-screen bg-slate-50/70 text-slate-800 font-sans selection:bg-indigo-500/15 selection:text-indigo-600 overflow-hidden">
        
        {/* 3D Particle Network Canvas */}
        <Background3D />

        {/* Vibrant Multi-Color Ambient Aurora Glow Orbs */}
        <div className="fixed top-[-8%] left-[-8%] w-[600px] h-[600px] bg-gradient-to-tr from-indigo-500/25 via-purple-500/20 to-pink-500/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow z-0" />
        <div className="fixed top-[20%] right-[-10%] w-[650px] h-[650px] bg-gradient-to-bl from-cyan-400/25 via-blue-500/20 to-indigo-500/15 rounded-full blur-[150px] pointer-events-none animate-pulse-slow z-0" style={{ animationDelay: '2s' }} />
        <div className="fixed top-[55%] left-[-5%] w-[550px] h-[550px] bg-gradient-to-tr from-emerald-400/20 via-teal-500/20 to-cyan-500/15 rounded-full blur-[130px] pointer-events-none animate-pulse-slow z-0" style={{ animationDelay: '4s' }} />
        <div className="fixed bottom-[10%] right-[5%] w-[600px] h-[600px] bg-gradient-to-tl from-fuchsia-500/25 via-pink-500/20 to-amber-400/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow z-0" style={{ animationDelay: '3s' }} />
        <div className="fixed bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/20 to-purple-500/15 rounded-full blur-[130px] pointer-events-none animate-pulse-slow z-0" style={{ animationDelay: '1s' }} />

        {/* 2. STICKY LIGHT GLASS NAVBAR */}
        <header className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-slate-200/70 bg-white/80 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            
            {/* Logo Link */}
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} 
              className="flex items-center space-x-3 group"
            >
              <div className="relative w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                <Logo3D size="sm" animation="swing" interactive={false} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-extrabold text-xl tracking-wider bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 bg-clip-text text-transparent">
                  NEXORA
                </span>
                <span className="text-[9px] font-mono tracking-widest text-indigo-600 font-bold uppercase -mt-1">
                  Technologies
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-6">
              {[
                { id: 'home', label: 'Home' },
                { id: 'portals', label: 'Ecosystem' },
                { id: 'about', label: 'About Us' },
                { id: 'services', label: 'Services' },
                { id: 'projects', label: 'Projects' },
                { id: 'team', label: 'Team' },
                { id: 'careers', label: 'Careers' },
                { id: 'testimonials', label: 'Reviews' },
                { id: 'contact', label: 'Contact' }
              ].map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                  className={`text-sm font-semibold transition-all hover:text-slate-950 relative py-2 ${
                    activeSection === link.id ? 'text-indigo-600' : 'text-slate-500'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}

              {/* Portals Dropdown */}
              <div 
                className="relative font-sans"
                onMouseEnter={() => setPortalsDropdownOpen(true)}
                onMouseLeave={() => setPortalsDropdownOpen(false)}
              >
                <button 
                  className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors py-2 px-3 rounded-xl bg-slate-100/80 hover:bg-indigo-50 border border-slate-200/60 flex items-center space-x-1.5 cursor-pointer focus:outline-none"
                  onClick={() => setPortalsDropdownOpen(!portalsDropdownOpen)}
                >
                  <Sparkles size={14} className="text-indigo-600 animate-pulse" />
                  <span>Portals</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${portalsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {portalsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-slate-200/90 shadow-2xl p-2 z-50 overflow-hidden"
                    >
                      <div className="px-3 py-1.5 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100 mb-1">
                        <span>Live Platforms</span>
                        <span className="text-indigo-600 font-semibold">{portalsList.length} Portals</span>
                      </div>

                      {/* Nexora Connect - Highlighted at the top */}
                      <a
                        href="https://nexora-connect-seven.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-xl text-sm bg-gradient-to-r from-indigo-50/90 to-blue-50/70 border border-indigo-200/70 hover:border-indigo-500 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm shadow-indigo-600/30 shrink-0">
                            <Users size={18} />
                          </div>
                          <div className="flex flex-col text-left">
                            <div className="flex items-center space-x-1.5">
                              <span className="font-bold text-slate-900 group-hover:text-indigo-600">Nexora Connect</span>
                              <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 bg-indigo-600 text-white rounded-full font-bold">New</span>
                            </div>
                            <span className="text-[11px] text-slate-500 font-medium">Internal Collab & Learning</span>
                          </div>
                        </div>
                        <ExternalLink size={14} className="text-indigo-600 shrink-0" />
                      </a>

                      <div className="h-[1px] bg-slate-100 my-1.5 mx-1" />

                      {/* Other Portals */}
                      {portalsList.filter(p => p.id !== 'nexora-connect').map((portal) => {
                        const Icon = portal.icon;
                        return (
                          <a
                            key={portal.id}
                            href={portal.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded-xl text-sm text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors group"
                          >
                            <div className="flex items-center space-x-2.5">
                              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-600 flex items-center justify-center shrink-0 transition-colors">
                                <Icon size={14} />
                              </div>
                              <span className="font-medium">{portal.title}</span>
                            </div>
                            <ExternalLink size={13} className="text-slate-400 group-hover:text-indigo-600 shrink-0" />
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Action CTA Button */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => scrollToSection('contact')}
                className="relative px-6 py-2.5 rounded-full font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500 transition-all duration-300 group-hover:scale-105" />
                <span className="relative flex items-center space-x-1.5">
                  <span>Get Started</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-indigo-600 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Drawer Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-2xl px-6 py-6 overflow-y-auto max-h-[calc(100vh-80px)]"
              >
                <div className="flex flex-col space-y-3">
                  {[
                    { id: 'home', label: 'Home Gateway' },
                    { id: 'portals', label: 'Ecosystem & Portals' },
                    { id: 'about', label: 'About Us' },
                    { id: 'services', label: 'Services Catalog' },
                    { id: 'projects', label: 'Showcase Projects' },
                    { id: 'team', label: 'Leadership & Team' },
                    { id: 'careers', label: 'Careers & Mentorship' },
                    { id: 'testimonials', label: 'Client Reviews' },
                    { id: 'contact', label: 'Contact Us' }
                  ].map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                      className={`text-base font-semibold py-2 px-3 rounded-xl border border-transparent ${
                        activeSection === link.id ? 'bg-indigo-50 text-indigo-600 border-indigo-200/60' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}

                  {/* Mobile Portals Direct Access */}
                  <div className="border-t border-slate-200/80 pt-4 mt-2">
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Our Enterprise Portals
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {portalsList.map((portal) => {
                        const Icon = portal.icon;
                        const isConnect = portal.id === 'nexora-connect';
                        return (
                          <a
                            key={portal.id}
                            href={portal.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                              isConnect 
                                ? 'bg-indigo-50 border-indigo-200/80 text-indigo-700 font-bold' 
                                : 'bg-slate-50/80 border-slate-200/70 text-slate-700 hover:border-indigo-300'
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isConnect ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                                <Icon size={16} />
                              </div>
                              <div className="flex flex-col text-left">
                                <div className="flex items-center space-x-1.5">
                                  <span className="text-sm">{portal.title}</span>
                                  {isConnect && (
                                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 bg-indigo-600 text-white rounded-full font-bold">New</span>
                                  )}
                                </div>
                                <span className="text-xs text-slate-400 font-normal">{portal.subtitle}</span>
                              </div>
                            </div>
                            <ExternalLink size={16} className={isConnect ? 'text-indigo-600' : 'text-slate-400'} />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-md cursor-pointer"
                  >
                    Start Collaboration
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* 3. HERO SECTION */}
        <main className="relative z-10 pt-20">
          <section id="home" className="min-h-[calc(100vh-80px)] flex items-center py-16 px-6 max-w-7xl mx-auto relative">
            {/* Section Ambient Glows */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow" />
            <div className="absolute bottom-10 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-400/25 to-blue-500/20 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
              
              {/* Left Hero Column */}
              <div className="lg:col-span-7 text-left space-y-6">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 text-indigo-700 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-xs">
                  <Sparkles size={13} className="text-indigo-600 animate-spin-slow" />
                  <span>Next-Gen Software, AI & Engineering Studio</span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-display leading-[1.08] tracking-tight text-slate-900">
                  Architecting <span className="text-gradient-purple-blue">Future-Ready</span> Digital Solutions
                </h1>
                
                <h2 className="text-2xl sm:text-3xl font-display font-medium text-indigo-600 neon-glow-text">
                  "Building Tomorrow, Today."
                </h2>
                
                <p className="text-slate-600 text-lg md:text-xl max-w-2xl leading-relaxed">
                  We empower enterprises, startups, and ambitious researchers with custom high-scale web platforms, intelligent AI models, mobile ecosystems, enterprise databases, and civil structural design.
                </p>
                
                {/* Hero CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-2">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500 text-center hover:shadow-xl hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-indigo-500/20"
                  >
                    <span>Get Started</span>
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => scrollToSection('portals')}
                    className="px-8 py-4 rounded-2xl font-semibold text-slate-700 bg-white/90 hover:bg-white border border-indigo-200/80 text-center shadow-md hover:shadow-lg hover:border-indigo-400 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Sparkles size={16} className="text-indigo-600 animate-pulse" />
                    <span>Explore Portals</span>
                  </button>
                </div>

                {/* Hero Feature Badges */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-slate-200/70 text-xs font-semibold text-slate-600">
                  <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700">
                    <CheckCircle2 size={15} className="text-emerald-600" />
                    <span>Production Architecture</span>
                  </span>
                  <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700">
                    <CheckCircle2 size={15} className="text-blue-600" />
                    <span>AI & Full-Stack</span>
                  </span>
                  <span className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/60 text-purple-700">
                    <CheckCircle2 size={15} className="text-purple-600" />
                    <span>24/7 Dedicated Support</span>
                  </span>
                </div>
              </div>

              {/* Right Hero Column: 3D Interactive Logo Showcase */}
              <div className="lg:col-span-5 relative flex justify-center items-center min-h-[420px]">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative w-full h-[420px] sm:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
                >
                  {/* Colorful Radiant Glows */}
                  <div className="absolute w-[90%] h-[90%] bg-gradient-to-tr from-indigo-500/30 via-fuchsia-500/20 to-cyan-400/30 rounded-full blur-3xl z-0 animate-pulse-slow pointer-events-none" />

                  <div className="relative flex flex-col items-center justify-center">
                    <Tilt tiltMaxAngleX={12} tiltMaxAngleY={12} scale={1.04} transitionSpeed={2000} className="relative z-20">
                      <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-3xl border border-indigo-200/80 bg-white/40 backdrop-blur-2xl shadow-2xl flex items-center justify-center p-8 group">
                        <div className="absolute inset-0 bg-grid-cyber opacity-25 rounded-3xl" />
                        
                        {/* Glow Core */}
                        <div className="absolute w-48 h-48 rounded-full bg-gradient-to-tr from-indigo-500/40 via-purple-500/30 to-cyan-400/40 blur-2xl group-hover:scale-125 transition-transform duration-700" />
                        
                        {/* 3D Interactive Logo */}
                        <Logo3D size="lg" animation={logoAnimation} interactive={true} layersCount={10} />
                        
                        {/* Corner Accents */}
                        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-indigo-500/60 rounded-tl-md" />
                        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-500/60 rounded-tr-md" />
                        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-purple-500/60 rounded-bl-md" />
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-blue-500/60 rounded-br-md" />
                      </div>
                    </Tilt>

                    {/* Interactive Animation Mode Controls */}
                    <div className="mt-6 flex space-x-2 bg-white/95 backdrop-blur-md border border-indigo-200/80 px-3.5 py-1.5 rounded-full shadow-xl z-30 transition-transform duration-300 hover:scale-105">
                      {[
                        { type: 'float', label: '3D Float' },
                        { type: 'spin', label: '3D Spin' },
                        { type: 'swing', label: '3D Swing' }
                      ].map((anim) => (
                        <button
                          key={anim.type}
                          onClick={() => setLogoAnimation(anim.type)}
                          className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all duration-300 cursor-pointer ${
                            logoAnimation === anim.type 
                              ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md' 
                              : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
                          }`}
                        >
                          {anim.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

            </div>
          </section>

          {/* 4. STATS METRICS STRIP */}
          <section className="py-12 bg-gradient-to-r from-indigo-50/90 via-sky-50/90 to-purple-50/90 border-y border-indigo-200/70 backdrop-blur-xl relative overflow-hidden shadow-xs">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
              {[
                { num: "50+", label: "Completed Projects", desc: "Production deployments" },
                { num: "99.9%", label: "Client Satisfaction", desc: "Verified partner rating" },
                { num: "24/7", label: "Dedicated Support", desc: "Always available engineers" },
                { num: "50+", label: "Engineers & Experts", desc: "Specialized team members" }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-3xl md:text-4xl font-extrabold font-display text-gradient-purple-blue">{stat.num}</p>
                  <p className="text-slate-900 text-sm font-bold tracking-tight">{stat.label}</p>
                  <p className="text-slate-500 text-xs font-medium">{stat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 5. ECOSYSTEM & PORTALS LAUNCHPAD SECTION */}
          <section id="portals" className="py-24 px-6 max-w-7xl mx-auto relative">
            {/* Ambient Aurora behind Portals */}
            <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-tr from-purple-500/20 via-pink-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 via-blue-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            <Scroll3DReveal>
              <div className="space-y-12">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-500/25 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
                    <Zap size={13} className="text-indigo-600" />
                    <span>Nexora Unified Ecosystem</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
                    Explore Our Active Portals
                  </h2>
                  <p className="text-slate-500 text-lg">
                    Discover our suite of tailored web portals built for collaboration, daily progress tracking, talent recruitment, and internship workflows.
                  </p>
                  <div className="w-20 h-[3px] bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 rounded-full mx-auto" />
                </div>

                {/* Portals Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portalsList.map((portal) => {
                    const Icon = portal.icon;
                    const isConnect = portal.id === 'nexora-connect';
                    return (
                      <Tilt key={portal.id} tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.01} transitionSpeed={2000} className="h-full">
                        <div className={`glass-card-bento rounded-3xl p-7 flex flex-col justify-between h-full relative overflow-hidden group shadow-md ${
                          isConnect 
                            ? 'border-indigo-300 ring-2 ring-indigo-500/30 bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/40' 
                            : 'hover:border-indigo-300'
                        }`}>
                          {/* Top Highlight Gradient Line */}
                          <div className={`absolute top-0 left-0 w-full h-[3.5px] bg-gradient-to-r ${portal.color}`} />
                          
                          <div className="space-y-5">
                            {/* Header Row */}
                            <div className="flex items-center justify-between">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-tr ${portal.color} text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300`}>
                                <Icon size={22} />
                              </div>
                              <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border shadow-xs ${portal.accent}`}>
                                {portal.badge}
                              </span>
                            </div>

                            {/* Title & Desc */}
                            <div className="space-y-2 text-left">
                              <h3 className="text-2xl font-bold font-display text-slate-900 group-hover:text-indigo-600 transition-colors">
                                {portal.title}
                              </h3>
                              <p className="text-indigo-600 text-xs font-semibold font-mono uppercase tracking-wide">
                                {portal.subtitle}
                              </p>
                              <p className="text-slate-500 text-sm leading-relaxed pt-1">
                                {portal.description}
                              </p>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                            <a
                              href={portal.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors group/link"
                            >
                              <span>Launch Portal</span>
                              <ArrowUpRight size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                            </a>
                            <span className="text-[11px] font-mono text-slate-400">Live Web App</span>
                          </div>
                        </div>
                      </Tilt>
                    );
                  })}
                </div>
              </div>
            </Scroll3DReveal>
          </section>

          {/* 6. ABOUT US & MISSION SECTION */}
          <section id="about" className="py-24 px-6 bg-gradient-to-br from-indigo-50/90 via-sky-50/70 to-purple-50/80 border-y border-indigo-200/70 relative overflow-hidden">
            {/* Ambient Background Orbs */}
            <div className="absolute top-0 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none" />

            <Scroll3DReveal>
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
                
                {/* Left Visual Illustration */}
                <div className="lg:col-span-5 relative flex justify-center">
                  <div className="relative w-72 h-72 sm:w-88 sm:h-88 glass-panel rounded-3xl flex items-center justify-center p-8 border border-indigo-200/90 shadow-2xl bg-white/80">
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-cyan-500/15 rounded-3xl blur-md" />
                    
                    <div className="z-10 text-center space-y-4">
                      <div className="w-18 h-18 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center mx-auto shadow-lg shadow-indigo-600/30 text-white">
                        <Sparkles size={32} />
                      </div>
                      <h3 className="font-display font-extrabold text-2xl text-slate-900">Our North Star</h3>
                      <p className="text-slate-600 text-sm leading-relaxed italic">
                        "Empowering visionary businesses, modern institutions, and future engineers through reliable, performant, and scalable digital systems."
                      </p>
                    </div>

                    <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-indigo-500/40 animate-ping" />
                    <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-cyan-500/50" />
                  </div>
                </div>

                {/* Right Text Description */}
                <div className="lg:col-span-7 text-left space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-700 text-xs font-semibold uppercase tracking-wider">
                    <Compass size={13} />
                    <span>Who We Are</span>
                  </div>

                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
                    Building Bridges Between Innovation & Execution
                  </h2>

                  <div className="w-20 h-[3px] bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 rounded-full" />

                  <p className="text-slate-600 text-lg leading-relaxed">
                    Nexora Technologies is a technology consulting and software studio dedicated to transforming complex challenges into intuitive, high-velocity digital products. From web and native mobile development to civil CAD engineering and production AI pipelines, our multidisciplinary team turns ambitious ideas into deployed reality.
                  </p>

                  {/* 3 Core Value Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    {[
                      { title: "Scalable Architecture", desc: "Built to support thousands of active users with minimal latency.", color: "border-indigo-200 bg-indigo-50/60" },
                      { title: "Enterprise Security", desc: "Rigorous standards, encrypted databases, and robust auth.", color: "border-blue-200 bg-blue-50/60" },
                      { title: "Agile Speed", desc: "From concept to prototype and production in lightning cycles.", color: "border-purple-200 bg-purple-50/60" }
                    ].map((pillar, i) => (
                      <div key={i} className={`p-4 rounded-2xl bg-white border ${pillar.color} shadow-xs space-y-1.5`}>
                        <h4 className="text-sm font-bold text-slate-900 font-display">{pillar.title}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </Scroll3DReveal>
          </section>

          {/* 7. SERVICES CATALOG SECTION */}
          <section id="services" className="py-24 px-6 max-w-7xl mx-auto relative">
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-gradient-to-tr from-fuchsia-500/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-10 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/15 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            <Scroll3DReveal>
              <div className="space-y-12">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-600 text-xs font-semibold uppercase tracking-wider">
                    <Layers size={13} />
                    <span>Comprehensive Solutions</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
                    Our Core Services
                  </h2>
                  <p className="text-slate-500 text-lg">
                    Tailored software engineering, AI intelligence, and structural design disciplines tailored to deliver tangible impact.
                  </p>
                  <div className="w-20 h-[3px] bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-full mx-auto" />
                </div>

                {/* Services Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Tilt key={service.title} tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.01} transitionSpeed={2000} className="h-full">
                        <div className="glass-card-bento rounded-3xl p-7 flex flex-col justify-between h-full group text-left relative overflow-hidden shadow-sm">
                          {/* Accent Gradient Header */}
                          <div className={`absolute top-0 left-0 w-full h-[3.5px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 opacity-70 group-hover:opacity-100 transition-opacity`} />
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-50 to-blue-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-xs">
                                <Icon size={22} />
                              </div>
                              <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200/60 text-slate-600 uppercase tracking-wider">
                                {service.tag}
                              </span>
                            </div>

                            <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {service.title}
                            </h3>

                            <p className="text-slate-500 text-sm leading-relaxed">
                              {service.description}
                            </p>
                          </div>

                          <div className="pt-6 mt-6 border-t border-slate-100">
                            <button
                              onClick={() => {
                                setFormData(prev => ({ ...prev, requirement: service.title }));
                                scrollToSection('contact');
                              }}
                              className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer group/btn"
                            >
                              <span>Request Consultation</span>
                              <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </Tilt>
                    );
                  })}
                </div>
              </div>
            </Scroll3DReveal>
          </section>

          {/* 8. TECHNOLOGIES MARQUEE STRIP */}
          <section id="technologies" className="py-20 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white border-y border-indigo-950 overflow-hidden relative shadow-xl">
            {/* Glowing neon background lines */}
            <div className="absolute inset-0 bg-grid-cyber opacity-10 pointer-events-none" />
            <div className="absolute top-0 left-1/3 w-96 h-full bg-indigo-500/10 blur-3xl pointer-events-none" />

            <Scroll3DReveal>
              <div className="max-w-7xl mx-auto px-6 text-center space-y-12 relative z-10">
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-400/30 bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                    <Terminal size={13} />
                    <span>Tech Stack</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white">Technologies We Master</h2>
                  <p className="text-slate-400 max-w-xl mx-auto">We leverage state-of-the-art developer environments, scalable cloud services, and reliable engineering frameworks.</p>
                  <div className="w-16 h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full mx-auto" />
                </div>

                {/* Infinite Moving Marquee */}
                <div className="relative w-full overflow-hidden py-4 mask-gradient-sides">
                  <div className="flex space-x-8 animate-marquee w-[200%]">
                    {[...technologies, ...technologies].map((tech, idx) => {
                      const Icon = tech.icon;
                      return (
                        <div 
                          key={idx}
                          className={`flex-shrink-0 flex items-center space-x-3 px-6 py-4 bg-slate-900/90 border border-slate-800 hover:border-indigo-500/80 rounded-2xl cursor-default transition-all duration-300 shadow-md ${tech.color}`}
                        >
                          <Icon className="text-slate-400 group-hover:text-inherit" size={20} />
                          <span className="text-sm font-bold text-slate-200">{tech.name}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Side Fades */}
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
                </div>
              </div>
            </Scroll3DReveal>
          </section>

          {/* 9. FEATURED PROJECTS SHOWCASE */}
          <section id="projects" className="py-24 px-6 max-w-7xl mx-auto relative">
            <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-tl from-purple-500/15 via-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            <Scroll3DReveal>
              <div className="space-y-12 text-center">
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-600 text-xs font-semibold uppercase tracking-wider">
                    <Code size={13} />
                    <span>Selected Works</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
                    Featured Projects
                  </h2>
                  <p className="text-slate-500 text-lg">
                    Explore our recent digital creations, ranging from corporate applications to academic systems and CAD blueprints.
                  </p>
                  <div className="w-20 h-[3px] bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mx-auto" />
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { filter: 'all', label: 'All Works' },
                    { filter: 'app', label: 'Systems & Portals' },
                    { filter: 'web', label: 'Websites' },
                    { filter: 'mobile', label: 'Mobile Apps' },
                    { filter: 'ai', label: 'AI & ML Models' },
                    { filter: 'civil', label: 'Civil CAD' }
                  ].map((btn) => (
                    <button
                      key={btn.filter}
                      onClick={() => setProjectFilter(btn.filter)}
                      className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-300 cursor-pointer ${
                        projectFilter === btn.filter 
                          ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md' 
                          : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/90 shadow-xs'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence>
                    {filteredProjects.map((p) => (
                      <Tilt key={p.title} tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.01} transitionSpeed={2000} className="h-full">
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4 }}
                          className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col justify-between border border-slate-200/80 shadow-md group/project h-full text-left bg-white"
                        >
                          {/* Preview Header Graphic */}
                          <div className="relative h-48 bg-gradient-to-br from-indigo-50/80 via-blue-50/50 to-purple-50/60 flex items-center justify-center p-6 overflow-hidden border-b border-slate-200/60">
                            <div className="absolute inset-0 bg-grid-cyber opacity-30" />
                            <div className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-500/20 to-cyan-400/20 blur-xl group-hover/project:scale-150 transition-transform duration-500" />
                            
                            <div className="relative z-10 flex flex-col items-center space-y-2">
                              {p.category === 'ai' && (
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 flex items-center justify-center border border-indigo-500/30 text-indigo-600">
                                  <Cpu size={26} />
                                </div>
                              )}
                              {p.category === 'web' && (
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30 text-blue-600">
                                  <Globe size={26} />
                                </div>
                              )}
                              {p.category === 'mobile' && (
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-teal-500/20 flex items-center justify-center border border-cyan-500/30 text-cyan-600">
                                  <Smartphone size={26} />
                                </div>
                              )}
                              {p.category === 'app' && (
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-md">
                                  <Users size={26} />
                                </div>
                              )}
                              {p.category === 'civil' && (
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-orange-500/30 text-orange-600">
                                  <Layers size={26} />
                                </div>
                              )}
                              <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                                {p.category === 'ai' ? 'ML PIPELINE' : p.category === 'web' ? 'RESPONSIVE WEB' : p.category === 'mobile' ? 'MOBILE OS' : p.category === 'civil' ? 'CIVIL CAD' : 'ENTERPRISE SYSTEM'}
                              </span>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-[3.5px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />
                          </div>

                          {/* Details */}
                          <div className="p-7 flex-grow flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <h3 className="text-xl font-bold font-display text-slate-900 group-hover/project:text-indigo-600 transition-colors">
                                {p.title}
                              </h3>
                              <p className="text-slate-500 text-sm leading-relaxed">
                                {p.description}
                              </p>
                            </div>

                            <div className="space-y-4 pt-2">
                              {/* Tech Chips */}
                              <div className="flex flex-wrap gap-1.5">
                                {p.tech.map((t, idx) => (
                                  <span 
                                    key={idx} 
                                    className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-mono tracking-wider bg-slate-100 border border-slate-200/60 text-slate-600 uppercase"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>

                              {/* Card Action Buttons */}
                              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                {p.liveUrl ? (
                                  <a
                                    href={p.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200/80 text-xs font-bold text-indigo-700 hover:from-indigo-600 hover:to-blue-600 hover:text-white transition-all shadow-xs group/btn cursor-pointer"
                                  >
                                    <span>Launch Portal</span>
                                    <ExternalLink size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                  </a>
                                ) : (
                                  <div />
                                )}
                                <button
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, requirement: p.title }));
                                    scrollToSection('contact');
                                  }}
                                  className="flex items-center space-x-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                                >
                                  <span>Request Quote</span>
                                  <ArrowRight size={12} className="group-hover/project:translate-x-1 transition-transform" />
                                </button>
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      </Tilt>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </Scroll3DReveal>
          </section>

          {/* 10. WHY CHOOSE US */}
          <section id="why-choose-us" className="py-24 px-6 bg-gradient-to-br from-blue-50/90 via-cyan-50/70 to-indigo-50/90 border-y border-indigo-200/70 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-full blur-3xl pointer-events-none" />

            <Scroll3DReveal>
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
                
                <div className="lg:col-span-5 text-left space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-blue-500/25 bg-blue-500/10 text-blue-700 text-xs font-semibold uppercase tracking-wider">
                    <CheckCircle2 size={13} />
                    <span>Our Core Strengths</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
                    Why Choose Nexora?
                  </h2>
                  <div className="w-20 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full" />
                  <p className="text-slate-600 text-lg leading-relaxed">
                    We combine rigorous software architectural standards, clean visual aesthetic design, and structural precision to construct platforms that truly scale.
                  </p>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-3.5 rounded-2xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-md shadow-indigo-600/20"
                  >
                    Start Collaborating
                  </button>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {benefits.map((b, idx) => {
                    const Icon = b.icon;
                    return (
                      <div 
                        key={idx}
                        className="glass-card-bento rounded-3xl p-6 text-left relative overflow-hidden group shadow-sm bg-white"
                      >
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${b.color} text-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                          <Icon size={22} />
                        </div>
                        <h3 className="text-lg font-bold font-display text-slate-900 mb-2">{b.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{b.description}</p>
                      </div>
                    );
                  })}
                </div>

              </div>
            </Scroll3DReveal>
          </section>

          {/* 11. LEADERSHIP & TEAM SECTION */}
          <section id="team" className="py-24 px-6 max-w-7xl mx-auto relative">
            <div className="absolute top-10 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/20 via-pink-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-10 left-0 w-96 h-96 bg-gradient-to-tr from-indigo-500/20 via-blue-500/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            <Scroll3DReveal>
              <div className="space-y-16">
                
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-600 text-xs font-semibold uppercase tracking-wider">
                    <Users size={13} />
                    <span>Visionaries & Architects</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
                    Executive Leadership
                  </h2>
                  <p className="text-slate-500 text-lg">
                    Meet the founders driving Nexora’s strategic vision, engineering benchmarks, and brand growth.
                  </p>
                  <div className="w-20 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full mx-auto" />
                </div>

                {/* 3 Founders Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {team.filter(t => t.founder).map((t, idx) => (
                    <Tilt key={idx} tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02} transitionSpeed={2000} className="h-full">
                      <div className="glass-panel glass-panel-hover rounded-3xl p-8 text-left relative overflow-hidden flex flex-col justify-between group/card shadow-lg bg-white h-full">
                        <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500" />
                        
                        <div className="space-y-6">
                          <div className="flex items-center space-x-5">
                            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-100 to-purple-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
                              {t.image ? (
                                <img 
                                  src={t.image} 
                                  alt={t.name} 
                                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <span className="font-display font-extrabold text-2xl text-indigo-600">
                                  {t.name[0]}
                                </span>
                              )}
                            </div>

                            <div>
                              <h3 className="text-2xl font-extrabold font-display text-slate-900 group-hover/card:text-indigo-600 transition-colors">
                                {t.name}
                              </h3>
                              <p className="text-xs font-bold text-indigo-600 font-mono tracking-wide uppercase">
                                {t.role}
                              </p>
                            </div>
                          </div>

                          <p className="text-slate-600 text-sm leading-relaxed">
                            {t.desc}
                          </p>
                        </div>

                        {/* Specialties */}
                        <div className="space-y-3 pt-6 border-t border-slate-100 mt-6">
                          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">CORE SPECIALTIES:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {t.skills.map((s, i) => (
                              <span 
                                key={i} 
                                className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 border border-slate-200/60 text-slate-700"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>
                    </Tilt>
                  ))}
                </div>

                {/* Team CTA & Modal Trigger */}
                <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-50/90 via-purple-50/80 to-blue-50/90 border border-indigo-200/80 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-left space-y-1">
                    <h3 className="text-xl font-bold font-display text-slate-900">Explore Our Full Engineering Network</h3>
                    <p className="text-sm text-slate-500">Discover all {team.length} specialists across AI, Java, Android, UI/UX, and Full-Stack.</p>
                  </div>
                  <button
                    onClick={() => setViewingAllTeam(true)}
                    className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center space-x-2 shrink-0"
                  >
                    <Users size={16} />
                    <span>View All Team Members</span>
                  </button>
                </div>

              </div>
            </Scroll3DReveal>
          </section>

          {/* 12. CAREERS & MENTORSHIP SECTION */}
          <section id="careers" className="py-24 px-6 bg-gradient-to-br from-purple-50/90 via-indigo-50/80 to-amber-50/70 border-y border-indigo-200/70 relative overflow-hidden">
            <div className="absolute top-0 right-10 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full blur-3xl pointer-events-none" />

            <Scroll3DReveal>
              <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
                    <GraduationCap size={13} />
                    <span>Grow With Nexora</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
                    Careers & Internships
                  </h2>
                  <p className="text-slate-500 text-lg">
                    Whether you are an experienced software architect or an aspiring student looking for hands-on mentorship, Nexora is where your potential accelerates.
                  </p>
                  <div className="w-20 h-[3px] bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 rounded-full mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  <div className="glass-card-bento rounded-3xl p-8 space-y-4 bg-white shadow-sm flex flex-col justify-between hover:border-indigo-400">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                        <Briefcase size={22} />
                      </div>
                      <h3 className="text-xl font-bold font-display text-slate-900">Open Full-Time Roles</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Join our core product and engineering team as a React, Python AI, Java, or Mobile Developer. Work on high-impact scalable platforms.
                      </p>
                    </div>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer pt-4 border-t border-slate-100"
                    >
                      <span>Apply For Positions</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  <div className="glass-card-bento rounded-3xl p-8 space-y-4 bg-white shadow-sm flex flex-col justify-between hover:border-blue-400">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <GraduationCap size={22} />
                      </div>
                      <h3 className="text-xl font-bold font-display text-slate-900">Internship Programs</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Get live industry exposure, complete tasks under senior mentors, and receive verified digital completion credentials.
                      </p>
                    </div>
                    <a
                      href="https://internship-portal-silk.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors pt-4 border-t border-slate-100"
                    >
                      <span>Open Internship Portal</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>

                  <div className="glass-card-bento rounded-3xl p-8 space-y-4 bg-white shadow-sm flex flex-col justify-between hover:border-purple-400">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                        <BookOpen size={22} />
                      </div>
                      <h3 className="text-xl font-bold font-display text-slate-900">College Project Guidance</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Complete mini & major computer science, AI, and civil engineering project execution with documentation & report support.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, requirement: "College Mini & Major Projects" }));
                        scrollToSection('contact');
                      }}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors cursor-pointer pt-4 border-t border-slate-100"
                    >
                      <span>Request Project Support</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

              </div>
            </Scroll3DReveal>
          </section>

          {/* 13. TESTIMONIALS SLIDER */}
          <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto relative">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-tr from-amber-400/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

            <Scroll3DReveal>
              <div className="space-y-12">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-amber-500/25 bg-amber-500/10 text-amber-700 text-xs font-semibold uppercase tracking-wider">
                    <Star size={13} className="text-amber-500 fill-amber-500" />
                    <span>Client Trust</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
                    What Our Partners Say
                  </h2>
                  <p className="text-slate-500 text-lg">
                    Real feedback from academic deans, technology leaders, and enterprise partners.
                  </p>
                  <div className="w-20 h-[3px] bg-gradient-to-r from-amber-500 via-indigo-500 to-blue-500 rounded-full mx-auto" />
                </div>

                {/* Testimonial Active Slide */}
                <div className="max-w-3xl mx-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={testimonialIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="glass-panel rounded-3xl p-8 md:p-12 text-center relative border border-indigo-200/80 shadow-2xl bg-white/95"
                    >
                      <div className="flex justify-center space-x-1 text-amber-400 mb-6">
                        {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                          <Star key={i} size={22} fill="currentColor" />
                        ))}
                      </div>

                      <p className="text-slate-700 text-lg md:text-xl font-medium leading-relaxed italic mb-8">
                        "{testimonials[testimonialIndex].text}"
                      </p>

                      <div className="space-y-1">
                        <h4 className="text-lg font-bold font-display text-slate-900">
                          {testimonials[testimonialIndex].author}
                        </h4>
                        <p className="text-xs font-mono text-indigo-600 font-semibold uppercase tracking-wider">
                          {testimonials[testimonialIndex].position}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Controls */}
                  <div className="flex items-center justify-center space-x-4 mt-8">
                    <button
                      onClick={() => setTestimonialIndex((prev) => (prev - 1 + 4) % 4)}
                      className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm cursor-pointer"
                      aria-label="Previous Review"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <div className="flex space-x-2">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setTestimonialIndex(i)}
                          className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                            testimonialIndex === i ? 'w-8 bg-gradient-to-r from-indigo-600 to-purple-600' : 'bg-slate-300'
                          }`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setTestimonialIndex((prev) => (prev + 1) % 4)}
                      className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:border-indigo-400 transition-all shadow-sm cursor-pointer"
                      aria-label="Next Review"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

              </div>
            </Scroll3DReveal>
          </section>

          {/* 14. CONTACT & INQUIRY FORM */}
          <section id="contact" className="py-24 px-6 bg-gradient-to-br from-indigo-100/90 via-blue-50/90 to-purple-100/80 border-t border-indigo-200/80 relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-purple-500/20 via-pink-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-400/25 to-transparent rounded-full blur-3xl pointer-events-none" />

            <Scroll3DReveal>
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">
                
                {/* Contact Left Info */}
                <div className="lg:col-span-5 text-left space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
                    <Send size={13} />
                    <span>Get In Touch</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
                    Let's Build Something Exceptional
                  </h2>
                  <div className="w-20 h-[3px] bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 rounded-full" />
                  <p className="text-slate-600 text-lg leading-relaxed">
                    Have a project in mind, need academic research support, or looking to integrate enterprise AI pipelines? Drop us a message and our team will get back to you within 24 hours.
                  </p>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/90 border border-indigo-100 shadow-sm hover:border-indigo-300 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <Mail size={20} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-mono text-slate-400 uppercase font-bold">Email Direct</span>
                        <a href="mailto:contactnexoratechs@gmail.com" className="text-sm font-bold text-slate-800 hover:text-indigo-600 transition-colors">
                          contactnexoratechs@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 p-4 rounded-2xl bg-white/90 border border-blue-100 shadow-sm hover:border-blue-300 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                        <MapPin size={20} />
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-mono text-slate-400 uppercase font-bold">Headquarters</span>
                        <span className="text-sm font-bold text-slate-800">Chennai Node Hub, India</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Right Form */}
                <div className="lg:col-span-7">
                  <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-indigo-200/90 shadow-2xl bg-white/95 text-left">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold text-slate-600 uppercase">Your Full Name</label>
                          <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="Alex Morgan" 
                            className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-sans"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-mono font-bold text-slate-600 uppercase">Email Address</label>
                          <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            required 
                            placeholder="alex@example.com" 
                            className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-sans"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono font-bold text-slate-600 uppercase">Requirement Discipline</label>
                        <select 
                          name="requirement" 
                          value={formData.requirement} 
                          onChange={handleInputChange} 
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-sans"
                        >
                          <option value="Web Development">Web Application Development</option>
                          <option value="AI & Machine Learning Solutions">AI & Machine Learning Solutions</option>
                          <option value="Mobile App Development">Mobile App Development</option>
                          <option value="Portfolio Websites">Portfolio Websites</option>
                          <option value="UI/UX Design">UI/UX Design & Prototyping</option>
                          <option value="Database Management">Database & API Architecture</option>
                          <option value="Cloud Deployment">Cloud Deployment & AWS Setup</option>
                          <option value="College Mini & Major Projects">College Mini & Major Projects</option>
                          <option value="Research Paper Support">Research Paper Implementation</option>
                          <option value="Civil CAD & Structural Design">Civil CAD & Structural Design</option>
                          <option value="Enterprise Portal Solution">Enterprise Portal Solution</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-mono font-bold text-slate-600 uppercase">Project Message & Details</label>
                        <textarea 
                          name="message" 
                          rows={4} 
                          value={formData.message} 
                          onChange={handleInputChange} 
                          required 
                          placeholder="Tell us about your project goals, timelines, and technical requirements..." 
                          className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-sans resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-indigo-600/25"
                      >
                        <Send size={16} />
                        <span>Send Project Inquiry</span>
                      </button>

                      {formSubmitted && (
                        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold text-center animate-fade-in flex items-center justify-center space-x-2">
                          <CheckCircle2 size={16} />
                          <span>Thank you! Your email client has been prepared. We will connect shortly.</span>
                        </div>
                      )}

                    </form>
                  </div>
                </div>

              </div>
            </Scroll3DReveal>
          </section>
        </main>

        {/* 15. FUTURISTIC FOOTER */}
        <footer className="relative z-10 bg-slate-950 border-t border-slate-800 pt-16 pb-8 px-6 text-slate-400">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
            
            {/* Logo Brand */}
            <div className="md:col-span-4 space-y-4 text-left">
              <a 
                href="#home" 
                onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} 
                className="flex items-center space-x-3 group w-max"
              >
                <div className="w-9 h-9 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                  <Logo3D size="xs" animation="spin" interactive={false} />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-lg tracking-wider text-white">
                    NEXORA
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase -mt-1 font-bold">
                    Technologies
                  </span>
                </div>
              </a>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                We design and construct premium web platforms, secure serverless systems, responsive UI interfaces, and civil structural design schemes.
              </p>
              
              {/* Social Icons */}
              <div className="flex space-x-3 pt-2">
                {[
                  { icon: TwitterIcon, href: "https://x.com/nexoratech", label: "Twitter" },
                  { icon: GithubIcon, href: "https://github.com/nexoratechnologies-26", label: "GitHub" },
                  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/nexora-technologies-379440419/", label: "LinkedIn" },
                  { icon: InstagramIcon, href: "https://www.instagram.com/_nexoratech.projects?igsh=MXhua3Q2Y2d4NThjOQ==", label: "Instagram" }
                ].map((soc, i) => {
                  const SocIcon = soc.icon;
                  return (
                    <a 
                      key={i} 
                      href={soc.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/10 transition-all duration-300"
                      aria-label={soc.label}
                    >
                      <SocIcon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Sitemap Navigation */}
            <div className="md:col-span-3 space-y-4 text-left">
              <h4 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">Sitemap Navigation</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { id: 'home', label: 'Home Gateway' },
                  { id: 'portals', label: 'Ecosystem Portals' },
                  { id: 'about', label: 'About Us' },
                  { id: 'services', label: 'Services Catalog' },
                  { id: 'projects', label: 'Showcase Hub' },
                  { id: 'careers', label: 'Careers & Mentorship' }
                ].map((lnk) => (
                  <li key={lnk.id}>
                    <a 
                      href={`#${lnk.id}`}
                      onClick={(e) => { e.preventDefault(); scrollToSection(lnk.id); }} 
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      {lnk.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise Portals */}
            <div className="md:col-span-3 space-y-4 text-left">
              <h4 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase font-sans">Our Portals</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a 
                    href="https://nexora-connect-seven.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center space-x-2 font-medium"
                  >
                    <Users size={14} className="text-indigo-400" />
                    <span>Nexora Connect</span>
                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 rounded-full font-bold border border-indigo-500/40">Live</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://nexora-ai-chatbot-zeta.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1.5 font-medium"
                  >
                    <Bot size={14} className="text-indigo-400" />
                    <span>Nexora AI Chatbot</span>
                    <ExternalLink size={12} className="opacity-60" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://dpr-nexora.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1"
                  >
                    <span>DPR Portal</span>
                    <ExternalLink size={12} className="opacity-60" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://internship-portal-silk.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1"
                  >
                    <span>Internship Portal</span>
                    <ExternalLink size={12} className="opacity-60" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://hiregen-smart-recruiter.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1"
                  >
                    <span>HireGenAI Portal</span>
                    <ExternalLink size={12} className="opacity-60" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://acknowledgement-generator-roan.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1"
                  >
                    <span>PRDAMS Portal</span>
                    <ExternalLink size={12} className="opacity-60" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Tech Matrix Chips */}
            <div className="md:col-span-2 space-y-4 text-left">
              <h4 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">Core Tech</h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["React 19", "Vite 8", "Tailwind v4", "Framer Motion", "Python AI", "Node.js", "MongoDB", "AutoCAD", "STAAD Pro"].map((tech) => (
                  <span key={tech} className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-800">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Copyright Row */}
          <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
            <p>© {new Date().getFullYear()} Nexora Technologies. All rights reserved. "Building Tomorrow, Today."</p>
            <div className="flex space-x-6">
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="hover:text-slate-300 transition-colors">About</a>
              <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="hover:text-slate-300 transition-colors">Services</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="hover:text-slate-300 transition-colors">Chennai Node Hub</a>
            </div>
          </div>
        </footer>

        {/* 16. FULL TEAM MODAL OVERLAY */}
        <AnimatePresence>
          {viewingAllTeam && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="fixed inset-0 z-[100] bg-slate-50/98 backdrop-blur-2xl overflow-y-auto min-h-screen text-slate-800 font-sans pb-16"
            >
              <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 space-y-10">
                
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-slate-200/70 pb-8 text-left">
                  <div className="space-y-3">
                    <button
                      onClick={() => setViewingAllTeam(false)}
                      className="inline-flex items-center space-x-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors group cursor-pointer"
                    >
                      <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                      <span>Back to Home</span>
                    </button>
                    <h1 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
                      Meet the Innovators
                    </h1>
                    <p className="text-slate-500 text-base max-w-2xl leading-relaxed">
                      Our growing network of software architects, cloud engineers, AI experts, and design virtuosos.
                    </p>
                  </div>
                  
                  {/* Search Bar & Counter */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative">
                      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text"
                        placeholder="Search team or skill..."
                        value={teamSearch}
                        onChange={(e) => setTeamSearch(e.target.value)}
                        className="pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-sans focus:outline-none focus:border-indigo-500 w-full sm:w-60"
                      />
                    </div>
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl border border-indigo-500/20 bg-indigo-50 text-indigo-600 text-xs font-mono font-bold tracking-wider uppercase h-max">
                      <Sparkles size={12} className="animate-spin-slow" />
                      <span>{filteredTeam.length} Active Members</span>
                    </div>
                  </div>
                </div>

                {/* Team Roster Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTeam.map((t, idx) => (
                    <div 
                      key={idx}
                      className="glass-panel border border-slate-200/80 rounded-3xl p-6 text-left relative overflow-hidden flex flex-col justify-between group/team transition-all duration-300 hover:border-indigo-400 hover:shadow-lg bg-white"
                    >
                      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 to-blue-500 opacity-60" />
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-100 to-blue-100 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0 shadow-sm">
                            {t.image ? (
                              <img 
                                src={t.image} 
                                alt={t.name} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="font-display font-bold text-xl text-indigo-600">
                                {t.name ? t.name.split(' ').filter(Boolean).map(n => n[0]).join('') : '+'}
                              </span>
                            )}
                          </div>

                          <div>
                            <h3 className="text-xl font-bold font-display text-slate-900 group-hover/team:text-indigo-600 transition-colors">
                              {t.name || "Open Position"}
                            </h3>
                            <p className="text-xs font-bold text-indigo-600 font-mono tracking-wide">
                              {t.role}
                            </p>
                          </div>
                        </div>

                        <p className="text-slate-500 text-sm leading-relaxed pt-1">
                          {t.desc}
                        </p>
                      </div>

                      {/* Skills */}
                      <div className="space-y-3 pt-5 border-t border-slate-100 mt-5">
                        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">CORE SPECIALTIES:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {t.skills.map((s, i) => (
                            <span 
                              key={i} 
                              className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 border border-slate-200/50 text-slate-700"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Call to Action */}
                <div className="glass-panel border border-slate-200/70 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden bg-gradient-to-br from-indigo-50/60 via-blue-50/40 to-white">
                  <div className="max-w-xl mx-auto space-y-6">
                    <h3 className="text-2xl font-bold font-display text-slate-950">Want to join our mission?</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      We are always looking for exceptional software architects, design virtuosos, and cybersecurity specialists to join our distributed global network.
                    </p>
                    <button
                      onClick={() => {
                        setViewingAllTeam(false);
                        scrollToSection('careers');
                      }}
                      className="px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                    >
                      View Open Positions
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 17. FLOATING NEXORA AI CHATBOT LAUNCHER */}
        <a
          href="https://nexora-ai-chatbot-zeta.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Nexora AI Chatbot"
          className="fixed bottom-6 right-6 z-[90] group flex items-center gap-3 decoration-none cursor-pointer"
        >
          {/* Hover Tooltip */}
          <div className="hidden sm:flex flex-col items-end opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
            <div className="px-3.5 py-2 rounded-2xl bg-slate-950/95 text-white text-xs font-medium shadow-2xl border border-indigo-500/30 backdrop-blur-md whitespace-nowrap flex items-center gap-2">
              <Sparkles size={14} className="text-amber-400 animate-pulse" />
              <span>Chat with <strong className="text-indigo-300">Nexora AI</strong></span>
            </div>
          </div>

          {/* Floating Action Button */}
          <div className="relative flex items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-300 animate-pulse-slow" />
            
            <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-blue-600 text-white shadow-2xl shadow-indigo-600/40 flex items-center justify-center border border-white/30 group-hover:scale-110 active:scale-95 transition-all duration-300">
              <Bot size={28} className="group-hover:rotate-12 transition-transform duration-300 drop-shadow-md" />
              
              <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-slate-950 rounded-full">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
              </span>
            </div>
          </div>
        </a>

      </div>
    </>
  );
}

export default App;

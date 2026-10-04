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
import naveenPhoto from './assets/naveen.png';
import Logo3D from './components/Logo3D';
import LogoCreationAnimation from './components/LogoCreationAnimation';
import Scroll3DReveal from './components/Scroll3DReveal';
import Background3D from './components/Background3D';
import Tilt from 'react-parallax-tilt';

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
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
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTestimonialIndex((prev) => (prev + 1) % 4), 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let ticking = false;
    const sections = ['home', 'portals', 'about', 'services', 'technologies', 'projects', 'why-choose-us', 'team', 'careers', 'testimonials', 'contact'];
    const updateActiveSection = () => {
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
      ticking = false;
    };
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (loading || viewingAllTeam) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [loading, viewingAllTeam]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      const subject = encodeURIComponent(`GoNexora Project Inquiry - ${formData.requirement}`);
      const body = encodeURIComponent(
        `Hello GoNexora Techs,\\n\\n` +
        `You have received a new project inquiry:\\n\\n` +
        `Name: ${formData.name}\\n` +
        `Email: ${formData.email}\\n` +
        `Requirement: ${formData.requirement}\\n\\n` +
        `Message:\\n${formData.message}\\n\\n` +
        `Best regards,\\n${formData.name}`
      );
      window.location.href = `mailto:contactnexoratechs@gmail.com?subject=${subject}&body=${body}`;
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', requirement: 'Web Development', message: '' });
      }, 5000);
    }
  };

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

  const services = [
    { title: "Portfolio Websites", description: "Custom, interactive, and eye-catching personal and business portfolios designed to showcase your work and attract clients.", icon: Palette, tag: "Design & UX", gradient: "from-purple-500/10 to-indigo-500/10" },
    { title: "Web Development", description: "High-performance, secure, and modern web applications built using cutting-edge frameworks like React, Next.js, and Node.js.", icon: Globe, tag: "Full-Stack", gradient: "from-blue-500/10 to-cyan-500/10" },
    { title: "Mobile App Development", description: "Cross-platform iOS and Android applications with native-like performance, elegant UI, and smooth animations.", icon: Smartphone, tag: "iOS & Android", gradient: "from-cyan-500/10 to-teal-500/10" },
    { title: "AI & Machine Learning Solutions", description: "Custom intelligent models, predictive analytics, natural language processing, deep learning pipelines, and smart chatbots.", icon: Cpu, tag: "Deep Tech", gradient: "from-fuchsia-500/10 to-purple-500/10" },
    { title: "UI/UX Design", description: "User-centric wireframes, high-fidelity prototypes, and sleek interfaces that provide intuitive digital journeys.", icon: Layers, tag: "Product Design", gradient: "from-pink-500/10 to-rose-500/10" },
    { title: "Database Management", description: "Robust data architectures, schema designs, secure API scaling, and high-availability setups using MongoDB, MySQL, and PostgreSQL.", icon: Database, tag: "Data Arch", gradient: "from-amber-500/10 to-orange-500/10" },
    { title: "Cloud Deployment", description: "Seamless infrastructure setup, serverless deployments, CI/CD automated pipelines, and cloud hosting on AWS and Google Cloud.", icon: Cloud, tag: "DevOps & Cloud", gradient: "from-sky-500/10 to-indigo-500/10" },
    { title: "College Mini & Major Projects", description: "End-to-end guidance, clean implementation, report writing, and complete project codebases for engineering and computer science students.", icon: GraduationCap, tag: "Academic", gradient: "from-emerald-500/10 to-teal-500/10" },
    { title: "Research Paper Support", description: "Technical implementations, experimental results generation, data plotting, and drafting reviews for publication in reputed journals.", icon: FileText, tag: "Publication", gradient: "from-violet-500/10 to-purple-500/10" },
    { title: "Civil CAD & Structural Design", description: "2D/3D building layouts, AutoCAD plans, structural drafting, and STAAD Pro analysis for engineering projects and construction plans.", icon: Layers, tag: "Engineering", gradient: "from-blue-500/10 to-indigo-500/10" }
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
    { title: "Nexora Connect Portal", category: "app", description: "Centralized internal collaboration and learning portal featuring interactive webinars, team syncs, recordings archive, wiki knowledge notes, and ticket desk.", tech: ["React 19", "Vite", "Tailwind CSS", "Realtime"], imagePath: "connect_preview", liveUrl: "https://nexora-connect-seven.vercel.app/" },
    { title: "Personal Portfolio Website", category: "web", description: "A premium personal portfolio website featuring glassmorphism elements, light themes, and immersive scroll animations.", tech: ["React", "Framer Motion", "Tailwind CSS"], imagePath: "portfolio_preview" },
    { title: "Smart No Dues Approval System", category: "app", description: "An automated clearance portal for academic institutions enabling digital approvals and secure database updates.", tech: ["React", "Node.js", "MongoDB", "Express"], imagePath: "nodues_preview", liveUrl: "https://dpr-nexora.vercel.app/" },
    { title: "AI Chatbot", category: "ai", description: "Context-aware conversational agent utilizing natural language processing and vector embedding retrieval.", tech: ["Python", "TensorFlow", "FastAPI", "React"], imagePath: "chatbot_preview", liveUrl: "https://nexora-ai-chatbot-zeta.vercel.app" },
    { title: "HireGen Smart Recruiter", category: "ai", description: "Automated candidate shortlisting, resume scoring pipelines, and AI-driven interview evaluation system.", tech: ["React", "Python", "OpenAI", "Tailwind CSS"], imagePath: "hiregen_preview", liveUrl: "https://hiregen-smart-recruiter.vercel.app/" },
    { title: "Deepfake Detection System", category: "ai", description: "Advanced model analyzing spatial and temporal anomalies in video feeds to classify AI-generated alterations.", tech: ["Python", "PyTorch", "TensorFlow", "OpenCV"], imagePath: "deepfake_preview" },
    { title: "E-commerce Website", category: "web", description: "Feature-rich online store built with secure checkout integration, order tracking, and intuitive admin dashboards.", tech: ["React", "Node.js", "MySQL", "AWS"], imagePath: "ecommerce_preview" },
    { title: "Android Application", category: "mobile", description: "A location-based service application with live tracking, offline synchronization, and instant push notifications.", tech: ["React Native", "Firebase", "Redux", "Node"], imagePath: "android_preview" },
    { title: "Smart Building Layout & CAD Design", category: "civil", description: "A comprehensive 2D/3D commercial complex blueprint with optimized spatial layout planning, electrical mapping, and CAD modeling.", tech: ["AutoCAD", "Revit", "SketchUp"], imagePath: "civil_cad_preview" },
    { title: "Structural Stress Analysis & Design", category: "civil", description: "STAAD Pro modeling and stress-strain calculations for concrete structures under dynamic load scenarios.", tech: ["STAAD Pro", "ETABS", "RCC Design"], imagePath: "civil_stress_preview" }
  ];

  const benefits = [
    { title: "Quality Delivery", description: "We enforce high coding standards, meticulous QA checks, and premium visual components to ensure a flawless experience.", icon: Award, color: "from-indigo-500 to-blue-500" },
    { title: "Modern Technologies", description: "We use the latest tech stacks (React 19, Tailwind v4, Python AI libraries) to ensure your software is future-proof.", icon: Sparkles, color: "from-blue-500 to-cyan-500" },
    { title: "Affordable Pricing", description: "Sleek architectural plans and agile dev methodologies allow us to offer top-tier tech at competitive rates.", icon: DollarSign, color: "from-cyan-500 to-emerald-500" },
    { title: "Scalable Solutions", description: "We build systems optimized for load-balancing, ready to support thousands of active users without lag.", icon: Layers, color: "from-pink-500 to-purple-500" },
    { title: "Continuous Support", description: "Our dedicated support team provides proactive updates, security patches, and cloud maintenance post-launch.", icon: Clock, color: "from-rose-500 to-orange-500" }
  ];

  const team = [
    { name: "Trivin", role: "Founder & Lead Strategist", desc: "Visionary entrepreneur driving innovation, leading strategic growth, and building impactful technology solutions that empower businesses and students.", skills: ["System Architecture", "AI Integration", "Product Strategy", "AI & Software Development"], image: trivinPhoto, founder: true },
    { name: "Aakashraj", role: "Co-Founder & Social Media Head", desc: "Leads digital brand growth by creating engaging content, managing social media campaigns, and building meaningful audience engagement across multiple platforms.", skills: ["Content Strategy", "Social Media Marketing", "Canva & Adobe Express", "Analytics & Tracking", "Brand Management"], image: aakashrajPhoto, founder: true },
    { name: "Arutselvan", role: "Director", desc: "Directs organizational operations, strategic execution, and cross-functional engineering groups to ensure top-tier quality delivery across all solutions.", skills: ["Director", "Operations Strategy", "Software Architecture", "Agile Leadership", "Client Relations"], image: arutselvanPhoto, founder: true },
    { name: "Naveen", role: "Co-Founder", desc: "Drives product strategy, technical architecture, and collaborative development initiatives to engineer future-ready digital platforms.", skills: ["Product Strategy", "Technical Leadership", "System Design", "Agile Execution"], image: naveenPhoto, founder: true },
    { name: "Gopika", role: "Java Developer", desc: "Crafts robust, enterprise-grade server-side applications, optimized databases, and microservices architectures using Java technologies.", skills: ["Java / Spring Boot", "REST APIs", "SQL / NoSQL", "Multithreading"] },
    { name: "Akshaya", role: "Gen AI Engineer", desc: "Develops intelligence solutions, integrating advanced large language models, prompt engineering pipelines, and vector database search agents.", skills: ["Generative AI", "LLM Integration", "Python / LangChain", "Vector Databases"] },
    { name: "Amirtha", role: "UI/UX & Android Developer", desc: "Focuses on designing clean user journeys, high-fidelity prototypes, and building interactive, high-performance native Android applications.", skills: ["Android Studio", "Kotlin / Java", "Figma", "Mobile UI Design"] },
    { name: "Pavithraa", role: "Full Stack Developer", desc: "Develops scalable end-to-end web applications with performant React frontends, robust Node.js APIs, and secure database schemas.", skills: ["React / Vite", "Node.js / Express", "MongoDB", "Tailwind CSS"] },
    { name: "Shrimathi", role: "AI & ML Specialist", desc: "Engineers machine learning pipelines, predictive neural networks, and computer vision algorithms tailored for enterprise data.", skills: ["Python", "TensorFlow / Keras", "Scikit-Learn", "Computer Vision"] },
    { name: "Srinithi", role: "Java Developer", desc: "Specializes in constructing robust, high-throughput backend services and secure microservices frameworks using Java.", skills: ["Java / Spring Boot", "RESTful APIs", "Hibernate / JPA", "PostgreSQL"] },
    { name: "Santhoshraj", role: "Android Developer", desc: "Crafts high-performance native mobile applications with clean architecture, responsive layouts, and seamless API integrations.", skills: ["Android SDK", "Kotlin / Java", "Jetpack Compose", "Material Design"] }
  ];

  const testimonials = [
    { text: "GoNexora Techs transformed our legacy paper clearances into a lightning-fast 'Smart No Dues' portal. The visual style is premium and our administrative efficiency skyrocketed by 90%!", author: "Prof. Ramachandran K.", position: "Dean of Academic Affairs, SEC", rating: 5 },
    { text: "The AI Chatbot GoNexora developed was stellar. It integrates seamlessly into our website, handles 80% of our customer queries automatically, and has a sleek, interactive modern UI.", author: "Meera Sen", position: "Product Lead, Zenic Media", rating: 5 },
    { text: "I hired GoNexora for my major college project and research paper implementation. The code was exceptionally structured and their team helped me publish in a high-ranking journal!", author: "Arjun Sharma", position: "Computer Science Graduate", rating: 5 },
    { text: "Absolute professionals. Their cloud deployment pipeline setup on AWS saved us thousands in server bills, and their post-launch support keeps our app running flawlessly.", author: "Jessica Carter", position: "CTO, FinOrbit Labs", rating: 5 }
  ];

  const filteredProjects = projectFilter === 'all' ? projects : projects.filter(p => p.category === projectFilter);
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
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="logo-creation-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04, filter: "blur(4px)", transition: { duration: 0.35, ease: "easeOut" } }}
            className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center text-white overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
            <div className="absolute w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute w-[45%] h-[45%] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
            <LogoCreationAnimation onComplete={() => setLoading(false)} onSkip={() => setLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-screen bg-neural-black text-neural-silver font-sans selection:bg-neural-purple/30 selection:text-white overflow-hidden">
        {/* Ambient Neural Glows */}
        <div className="fixed top-[-10%] left-[-10%] w-[700px] h-[700px] bg-neural-purple/20 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-slow" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-neural-indigo/20 rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-neural-violet/10 rounded-full blur-[180px] pointer-events-none -z-10 animate-pulse-slow" style={{ animationDelay: '4s' }} />

        <Background3D />

        <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 neural-floating-nav px-6 py-2 shadow-2xl transition-all duration-300">
          <div className="mx-auto flex items-center justify-between">
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
              className="flex items-center space-x-3 group"
            >
              <div className="relative w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border border-white/10 shadow-md transition-transform group-hover:scale-105 duration-300 ring-1 ring-white/5">
                <Logo3D size="sm" animation="swing" interactive={false} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-extrabold text-xl tracking-wider text-white">GONEXORA</span>
                <span className="text-[9px] font-mono tracking-widest text-neural-purple font-bold uppercase -mt-1">TECHS</span>
              </div>
            </a>

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
                  className={`text-sm font-semibold transition-all hover:text-white relative py-2 ${
                    activeSection === link.id ? 'text-neural-purple' : 'text-neural-muted'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div layoutId="activeNavIndicator" className="absolute bottom-0 left-0 w-full h-[2px] bg-neural-purple rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                  )}
                </a>
              ))}

              <div className="relative font-sans" onMouseEnter={() => setPortalsDropdownOpen(true)} onMouseLeave={() => setPortalsDropdownOpen(false)}>
                <button
                  className="text-sm font-semibold text-white hover:text-neural-purple transition-colors py-2 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center space-x-1.5 cursor-pointer focus:outline-none"
                  onClick={() => setPortalsDropdownOpen(!portalsDropdownOpen)}
                >
                  <span>Portals</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${portalsDropdownOpen ? 'rotate-180 text-neural-purple' : 'text-neural-muted'}`} />
                </button>
                <AnimatePresence>
                  {portalsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-76 rounded-2xl glass-panel p-2.5 shadow-xl border border-white/10 bg-neural-black/95 z-50 flex flex-col space-y-1 text-left"
                    >
                      <a
                        href="https://nexora-connect-seven.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2.5 rounded-xl text-sm bg-neural-purple/20 border border-neural-purple/30 hover:border-neural-purple/50 hover:bg-neural-purple/30 transition-all group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-lg bg-neural-purple text-white flex items-center justify-center shadow-xs shrink-0">
                            <Users size={18} />
                          </div>
                          <div className="flex flex-col text-left">
                            <div className="flex items-center space-x-1.5">
                              <span className="font-bold text-white group-hover:text-neural-purple">Nexora Connect</span>
                              <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 bg-neural-purple text-white rounded-full font-bold">New</span>
                            </div>
                            <span className="text-[11px] text-neural-muted font-medium">Internal Collab & Learning</span>
                          </div>
                        </div>
                        <ExternalLink size={14} className="text-neural-purple shrink-0" />
                      </a>
                      <div className="h-[1px] bg-white/5 my-1.5 mx-1" />
                      {portalsList.filter(p => p.id !== 'nexora-connect').map((portal) => {
                        const Icon = portal.icon;
                        return (
                          <a
                            key={portal.id}
                            href={portal.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded-xl text-sm text-neural-muted hover:text-white hover:bg-white/5 transition-colors group"
                          >
                            <div className="flex items-center space-x-2.5">
                              <div className="w-7 h-7 rounded-lg bg-white/5 text-neural-muted group-hover:bg-neural-purple/20 group-hover:text-neural-purple flex items-center justify-center shrink-0 transition-colors">
                                <Icon size={14} />
                              </div>
                              <span className="font-medium">{portal.title}</span>
                            </div>
                            <ExternalLink size={13} className="text-neural-muted group-hover:text-neural-purple shrink-0" />
                          </a>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-2.5 rounded-full font-semibold text-sm text-neural-black bg-white hover:bg-neural-silver transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] cursor-pointer flex items-center space-x-1.5"
              >
                <span>Get Started</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-white/10 text-white hover:text-neural-purple transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="lg:hidden border-t border-white/10 bg-neural-black/95 backdrop-blur-2xl px-6 py-6 overflow-y-auto max-h-[calc(100vh-80px)]"
              >
                <div className="flex flex-col space-y-2.5">
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
                        activeSection === link.id ? 'bg-neural-purple/20 text-neural-purple border-neural-purple/30' : 'text-neural-muted hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="border-t border-white/10 pt-4 mt-2">
                    <h4 className="text-xs font-mono font-bold text-neural-muted uppercase tracking-widest mb-3">Our Enterprise Portals</h4>
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
                                ? 'bg-neural-purple/20 border-neural-purple/40 text-neural-purple font-bold'
                                : 'bg-white/5 border-white/10 text-neural-muted hover:border-neural-purple/30'
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isConnect ? 'bg-neural-purple text-white' : 'bg-white/10 text-neural-muted'}`}>
                                <Icon size={16} />
                              </div>
                              <div className="flex flex-col text-left">
                                <div className="flex items-center space-x-1.5">
                                  <span className="text-sm">{portal.title}</span>
                                  {isConnect && <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 bg-neural-purple text-white rounded-full font-bold">New</span>}
                                </div>
                                <span className="text-xs text-neural-muted/60 font-normal">{portal.subtitle}</span>
                              </div>
                            </div>
                            <ExternalLink size={16} className={isConnect ? 'text-neural-purple' : 'text-neural-muted'} />
                          </a>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="w-full mt-4 py-3 rounded-xl bg-neural-purple text-white font-semibold shadow-sm hover:bg-neural-violet cursor-pointer transition-colors"
                    >
                      Start Collaboration
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="relative z-10 pt-20">
          <section id="home" className="min-h-[calc(100vh-80px)] flex items-center py-16 px-6 max-w-7xl mx-auto relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
              <div className="lg:col-span-7 text-left space-y-6">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-neural-purple/30 bg-neural-purple/10 text-neural-purple text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                  <Sparkles size={13} />
                  <span>Innovating the Future</span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold font-display leading-[1.05] tracking-tighter text-white">
                  Architecting <span className="text-neural-muted font-medium">Future-Ready</span> <br />
                  <span className="text-gradient-neural">Digital Solutions</span>
                </h1>

                <p className="text-neural-muted text-lg md:text-xl max-w-2xl leading-relaxed mt-6">
                  We empower enterprises, startups, and ambitious researchers with custom high-scale web platforms, intelligent AI models, and civil structural design.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-8">
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-4 rounded-full font-bold text-neural-black bg-white hover:bg-neural-silver text-center shadow-xl hover:shadow-neural-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Start Building</span>
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => scrollToSection('portals')}
                    className="px-8 py-4 rounded-full font-semibold text-white bg-transparent hover:bg-white/5 border border-white/20 text-center transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Sparkles size={16} className="text-neural-purple" />
                    <span className="opacity-80">See Pricing</span>
                  </button>
                </div>

                <div className="flex flex-col items-start space-y-3 pt-10">
                  <div className="flex -space-x-3">
                    {[trivinPhoto, aakashrajPhoto, arutselvanPhoto, naveenPhoto].map((photo, i) => (
                      <img key={i} src={photo} className="w-10 h-10 rounded-full border-2 border-neural-black object-cover bg-slate-800" alt="Team member" />
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-neural-black bg-neural-purple flex items-center justify-center text-[10px] font-bold text-white">
                      +4k
                    </div>
                  </div>
                  <p className="text-neural-muted text-xs font-medium">
                    Trusted by <span className="text-neural-silver">4,000+ product teams</span> worldwide
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10 text-xs font-semibold text-neural-muted">
                  {[
                    "Production Architecture",
                    "AI & Full-Stack",
                    "24/7 Dedicated Support"
                  ].map((text, i) => (
                    <span key={i} className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neural-muted">
                      <CheckCircle2 size={15} className="text-neural-purple" />
                      <span>{text}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 relative flex justify-center items-center min-h-[420px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative w-full h-[420px] sm:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
                >
                  <div className="relative flex flex-col items-center justify-center">
                    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.03} transitionSpeed={2000} tiltEnable={!isMobile} glareEnable={false} className="relative z-20">
                      <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-2xl flex items-center justify-center p-8 group overflow-hidden ring-1 ring-neural-purple/20">
                        <div className="absolute inset-3 rounded-full border border-neural-purple/20 pointer-events-none animate-spin-slow" style={{ animationDuration: '25s' }} />
                        <div className="absolute inset-8 rounded-full border border-neural-indigo/15 pointer-events-none" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neural-purple/10 via-transparent to-neural-indigo/10 pointer-events-none" />
                        <Logo3D size="lg" animation={logoAnimation} interactive={true} layersCount={6} />
                      </div>
                    </Tilt>

                    {/* Pattern 1: Hero Glass Preview Card */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute top-0 right-0 lg:-right-8 glass-panel rounded-3xl p-5 w-64 shadow-2xl z-30 border-white/20 overflow-hidden"
                    >
                      <div className="absolute -top-10 -right-10 w-32 h-32 bg-neural-purple/30 blur-[50px] pointer-events-none" />
                      <div className="relative z-10 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold text-neural-purple uppercase tracking-widest">System Live</span>
                          <div className="flex items-center space-x-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] text-green-500 font-bold">ONLINE</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neural-muted">Deployments</span>
                            <span className="text-sm font-bold text-white">50+</span>
                          </div>
                          <div className="w-full h-[1px] bg-white/10" />
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-neural-muted">Satisfaction</span>
                            <span className="text-sm font-bold text-white">99.9%</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <div className="mt-6 flex space-x-2 bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full shadow-md z-30 backdrop-blur-md">
                      {[
                        { type: 'float', label: '3D Float' },
                        { type: 'spin', label: '3D Spin' },
                        { type: 'swing', label: '3D Swing' }
                      ].map((anim) => (
                        <button
                          key={anim.type}
                          onClick={() => setLogoAnimation(anim.type)}
                          className={`text-xs px-3.5 py-1.5 rounded-full font-semibold transition-all duration-200 cursor-pointer ${
                            logoAnimation === anim.type
                              ? 'bg-neural-purple text-white shadow-xs'
                              : 'text-neural-muted hover:bg-white/10 hover:text-white'
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

          {/* Pattern 2: Full-Bleed Split Statement Section */}
          <section className="relative min-h-screen bg-neural-black overflow-hidden flex items-center justify-center px-6">
            <div className="absolute top-12 left-12 z-20">
              <h2 className="text-7xl md:text-9xl font-black font-display text-white opacity-90 leading-none tracking-tighter">Building</h2>
            </div>
            <div className="absolute bottom-12 right-12 z-20 text-right">
              <h2 className="text-7xl md:text-9xl font-black font-display text-white opacity-90 leading-none tracking-tighter">Tomorrow, Today.</h2>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl space-y-8">
              <div className="relative">
                <div className="absolute inset-0 bg-neural-purple/40 blur-[120px] rounded-full animate-pulse-slow" />
                <Sparkles size={64} className="relative z-10 text-white animate-float" />
              </div>
              <p className="text-xl md:text-3xl font-medium text-neural-silver leading-relaxed italic opacity-80">
                "Empowering visionary businesses, modern institutions, and future engineers through reliable, performant, and scalable digital systems."
              </p>
            </div>

            {/* Background ambient accents for the split section */}
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-neural-indigo/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-neural-violet/10 blur-[100px] rounded-full pointer-events-none" />
          </section>

          <section className="py-12 bg-neural-dark border-y border-white/5 shadow-xs">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
              {[
                { num: "50+", label: "Completed Projects", desc: "Production deployments" },
                { num: "99.9%", label: "Client Satisfaction", desc: "Verified partner rating" },
                { num: "24/7", label: "Dedicated Support", desc: "Always available engineers" },
                { num: "50+", label: "Engineers & Experts", desc: "Specialized team members" }
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-3xl md:text-4xl font-extrabold font-display text-neural-purple">{stat.num}</p>
                  <p className="text-white text-sm font-bold tracking-tight">{stat.label}</p>
                  <p className="text-neural-muted text-xs font-medium">{stat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="portals" className="py-24 px-6 max-w-7xl mx-auto relative">
            <Scroll3DReveal>
              <div className="space-y-12">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-neural-purple/30 bg-neural-purple/10 text-neural-purple text-xs font-semibold uppercase tracking-wider">
                    <Zap size={13} />
                    <span>GoNexora Unified Ecosystem</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
                    Explore Our Active Portals
                  </h2>
                  <p className="text-neural-muted text-lg">
                    Discover our suite of tailored web portals built for collaboration, daily progress tracking, talent recruitment, and internship workflows.
                  </p>
                  <div className="w-16 h-[3px] bg-neural-purple rounded-full mx-auto" />
                </div>

                {/* Pattern 4: Light-Section Card Stack */}
                <div className="relative py-20 rounded-[40px] bg-white text-neural-black overflow-hidden shadow-2xl">
                  {/* Bleeding Background Typography */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                    <h2 className="text-[15vw] font-black font-display text-neural-black/5 leading-none whitespace-nowrap uppercase tracking-tighter">
                      Active Portals Active Portals
                    </h2>
                  </div>

                  <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center px-6">
                    <div className="lg:col-span-5 space-y-6">
                      <h3 className="text-4xl font-black font-display leading-tight">
                        High-Velocity <br />
                        <span className="text-neural-purple">Digital Access</span>
                      </h3>
                      <p className="text-neural-muted text-lg leading-relaxed">
                        Our enterprise portals provide seamless integration for every facet of the organizational lifecycle.
                      </p>
                    </div>

                    <div className="lg:col-span-7 relative h-[500px] flex items-center justify-center">
                      {/* The Stack - First 3 Portals */}
                      {portalsList.slice(0, 3).map((portal, idx) => {
                        const Icon = portal.icon;
                        const rotations = ['rotate-[-6deg]', 'rotate-[2deg]', 'rotate-[6deg]'];
                        const translations = ['-translate-y-12 -translate-x-12', 'translate-y-0 translate-x-0', 'translate-y-12 translate-x-12'];

                        return (
                          <motion.div
                            key={portal.id}
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: idx * 0.2 }}
                            className={`absolute w-80 glass-panel rounded-3xl p-6 shadow-2xl border-neural-purple/20 z-[${30 - idx}] ${rotations[idx]} ${translations[idx]} bg-white/80 backdrop-blur-xl`}
                          >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-neural-purple/10 blur-[40px] rounded-full -mr-10 -mt-10" />
                            <div className="relative z-10 space-y-4">
                              <div className="w-12 h-12 rounded-2xl bg-neural-purple text-white flex items-center justify-center shadow-lg">
                                <Icon size={24} />
                              </div>
                              <h4 className="text-xl font-bold font-display">{portal.title}</h4>
                              <p className="text-sm text-neural-muted leading-relaxed">{portal.description}</p>
                              <div className="pt-4 border-t border-neural-black/5">
                                <a href={portal.url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-neural-purple flex items-center space-x-1 hover:underline">
                                  <span>Visit Portal</span>
                                  <ExternalLink size={14} />
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Remaining Portals in Dark Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                  {portalsList.slice(3).map((portal) => {
                    const Icon = portal.icon;
                    return (
                      <Tilt key={portal.id} tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.01} transitionSpeed={2000} tiltEnable={!isMobile} glareEnable={false} className="h-full">
                        <div className={`glass-card-bento rounded-3xl p-7 flex flex-col justify-between h-full relative overflow-hidden group`}>
                          <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${portal.color}`} />
                          <div className="space-y-5">
                            <div className="flex items-center justify-between">
                              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-neural-purple/20 text-neural-purple border border-neural-purple/30 group-hover:bg-neural-purple group-hover:text-white transition-all duration-200">
                                <Icon size={22} />
                              </div>
                              <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider border ${portal.accent.replace('bg-indigo-50', 'bg-neural-purple/20').replace('text-indigo-600', 'text-neural-purple').replace('border-indigo-200', 'border-neural-purple/30')}`}>
                                {portal.badge}
                              </span>
                            </div>
                            <div className="space-y-2 text-left">
                              <h3 className="text-2xl font-bold font-display text-white group-hover:text-neural-purple transition-colors">
                                {portal.title}
                              </h3>
                              <p className="text-neural-purple text-xs font-semibold font-mono uppercase tracking-wide">
                                {portal.subtitle}
                              </p>
                              <p className="text-neural-muted text-sm leading-relaxed pt-1">
                                {portal.description}
                              </p>
                            </div>
                          </div>
                          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                            <a href={portal.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-sm font-bold text-neural-purple hover:text-neural-violet transition-colors group/link">
                              <span>Launch Portal</span>
                              <ArrowUpRight size={16} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                            </a>
                            <span className="text-[11px] font-mono text-neural-muted/60">Live Web App</span>
                          </div>
                        </div>
                      </Tilt>
                    );
                  })}
                </div>
              </div>
            </Scroll3DReveal>
          </section>

          <section id="about" className="py-24 px-6 bg-neural-dark-alt border-y border-white/5">
            <Scroll3DReveal>
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-5 relative flex justify-center">
                  <div className="relative w-72 h-72 sm:w-88 sm:h-88 glass-panel rounded-3xl flex items-center justify-center p-8 border border-white/10 shadow-lg bg-neural-black/40">
                    <div className="z-10 text-center space-y-4">
                      <div className="w-18 h-18 rounded-2xl bg-neural-purple/20 border border-neural-purple/30 flex items-center justify-center mx-auto text-neural-purple shadow-xs">
                        <Sparkles size={32} />
                      </div>
                      <h3 className="font-display font-extrabold text-2xl text-white">Our North Star</h3>
                      <p className="text-neural-muted text-sm leading-relaxed italic">
                        "Empowering visionary businesses, modern institutions, and future engineers through reliable, performant, and scalable digital systems."
                      </p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-7 text-left space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-neural-purple/30 bg-neural-purple/10 text-neural-purple text-xs font-semibold uppercase tracking-wider">
                    <Compass size={13} />
                    <span>Who We Are</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
                    Building Bridges Between Innovation & Execution
                  </h2>
                  <div className="w-16 h-[3px] bg-neural-purple rounded-full" />
                  <p className="text-neural-muted text-lg leading-relaxed">
                    GoNexora Techs is a technology consulting and software studio dedicated to transforming complex challenges into intuitive, high-velocity digital products. From web and native mobile development to civil CAD engineering and production AI pipelines, our multidisciplinary team turns ambitious ideas into deployed reality.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    {[
                      { title: "Scalable Architecture", desc: "Built to support thousands of active users with minimal latency." },
                      { title: "Enterprise Security", desc: "Rigorous standards, encrypted databases, and robust auth." },
                      { title: "Agile Speed", desc: "From concept to prototype and production in lightning cycles." }
                    ].map((pillar, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 shadow-xs space-y-1.5">
                        <h4 className="text-sm font-bold text-white font-display">{pillar.title}</h4>
                        <p className="text-xs text-neural-muted leading-relaxed">{pillar.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Scroll3DReveal>
          </section>

          <section id="services" className="py-24 px-6 max-w-7xl mx-auto">
            <Scroll3DReveal>
              <div className="space-y-12">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-neural-purple/30 bg-neural-purple/10 text-neural-purple text-xs font-semibold uppercase tracking-wider">
                    <Layers size={13} />
                    <span>Comprehensive Solutions</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
                    Our Core Services
                  </h2>
                  <p className="text-neural-muted text-lg">
                    Tailored software engineering, AI intelligence, and structural design disciplines tailored to deliver tangible impact.
                  </p>
                  <div className="w-16 h-[3px] bg-neural-purple rounded-full mx-auto" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <Tilt key={service.title} tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.01} transitionSpeed={2000} tiltEnable={!isMobile} glareEnable={false} className="h-full">
                        <div className="glass-card-bento rounded-3xl p-7 flex flex-col justify-between h-full group text-left relative overflow-hidden shadow-xs">
                          <div className="absolute top-0 left-0 w-full h-[3px] bg-neural-purple opacity-60 group-hover:opacity-100 transition-opacity" />
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="w-12 h-12 rounded-2xl bg-neural-purple/20 border border-neural-purple/30 flex items-center justify-center text-neural-purple group-hover:bg-neural-purple group-hover:text-white transition-all duration-200 shadow-xs">
                                <Icon size={22} />
                              </div>
                              <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neural-muted uppercase tracking-wider">
                                {service.tag}
                              </span>
                            </div>
                            <h3 className="text-xl font-bold font-display text-white group-hover:text-neural-purple transition-colors">
                              {service.title}
                            </h3>
                            <p className="text-neural-muted text-sm leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                          <div className="pt-6 mt-6 border-t border-white/10">
                            <button
                              onClick={() => {
                                setFormData(prev => ({ ...prev, requirement: service.title }));
                                scrollToSection('contact');
                              }}
                              className="inline-flex items-center space-x-1.5 text-xs font-bold text-neural-purple hover:text-neural-violet transition-colors cursor-pointer group/btn"
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

          <section id="technologies" className="py-20 bg-neural-black text-white border-y border-white/5 overflow-hidden relative shadow-md">
            <Scroll3DReveal>
              <div className="max-w-7xl mx-auto px-6 text-center space-y-12 relative z-10">
                {/* Pattern 3: Scattered Glow-Tile Background */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neural-purple/20 blur-[100px] rounded-full animate-pulse-slow" />
                  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neural-indigo/20 blur-[100px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neural-violet/10 blur-[120px] rounded-full" />
                </div>

                <div className="space-y-3 relative z-10">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-neural-purple/30 bg-neural-purple/20 text-neural-purple text-xs font-semibold uppercase tracking-wider">
                    <Terminal size={13} />
                    <span>Tech Stack</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold font-display text-white">Technologies We Master</h2>
                  <p className="text-neural-muted max-w-xl mx-auto">We leverage state-of-the-art developer environments, scalable cloud services, and reliable engineering frameworks.</p>
                  <div className="w-16 h-[2px] bg-neural-purple rounded-full mx-auto" />
                </div>

                <div className="relative z-10 flex flex-col items-center space-y-12">
                  {/* Metallic Focal Card */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-neural-purple/30 blur-3xl group-hover:blur-[50px] transition-all duration-500 rounded-full" />
                    <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-slate-100 via-slate-400 to-slate-700 shadow-2xl flex items-center justify-center p-1 border-4 border-white/20 ring-1 ring-black/10 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                      <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.3),transparent)] animate-spin-slow opacity-50" style={{ animationDuration: '10s' }} />
                      <div className="relative z-10 bg-neural-black/80 backdrop-blur-md w-full h-full rounded-full flex flex-col items-center justify-center p-8 text-center space-y-2">
                        <Cpu size={48} className="text-neural-purple mb-2" />
                        <h3 className="text-2xl font-black font-display text-white uppercase tracking-tighter">Tech Mastery</h3>
                        <p className="text-xs font-mono text-neural-muted uppercase tracking-widest">Next-Gen Architecture</p>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-full overflow-hidden py-4 mask-gradient-sides">
                    <div className="flex space-x-8 animate-marquee w-[200%]">
                      {[...technologies, ...technologies].map((tech, idx) => {
                        const Icon = tech.icon;
                        return (
                          <div
                            key={idx}
                            className="flex-shrink-0 flex items-center space-x-3 px-6 py-4 bg-white/5 border border-white/10 hover:border-neural-purple rounded-2xl cursor-default transition-all duration-200 group"
                          >
                            <Icon className="text-neural-purple group-hover:scale-110 transition-transform" size={20} />
                            <span className="text-sm font-bold text-neural-silver">{tech.name}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neural-black to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neural-black to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </Scroll3DReveal>
          </section>

          <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
            <Scroll3DReveal>
              <div className="space-y-12 text-center">
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-neural-purple/30 bg-neural-purple/10 text-neural-purple text-xs font-semibold uppercase tracking-wider">
                    <Code size={13} />
                    <span>Selected Works</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
                    Featured Projects
                  </h2>
                  <p className="text-neural-muted text-lg">
                    Explore our recent digital creations, ranging from corporate applications to academic systems and CAD blueprints.
                  </p>
                  <div className="w-16 h-[3px] bg-neural-purple rounded-full mx-auto" />
                </div>

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
                      className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                        projectFilter === btn.filter
                          ? 'bg-neural-purple text-white shadow-xs'
                          : 'bg-white/5 text-neural-muted hover:bg-white/10 hover:text-white border border-white/10 shadow-xs'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence>
                    {filteredProjects.map((p) => (
                      <Tilt key={p.title} tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.01} transitionSpeed={2000} tiltEnable={!isMobile} glareEnable={false} className="h-full">
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.3 }}
                          className="glass-panel glass-panel-hover rounded-3xl overflow-hidden flex flex-col justify-between border border-white/10 shadow-xs group/project h-full text-left bg-neural-black/40"
                        >
                          <div className="relative h-44 bg-white/5 flex items-center justify-center p-6 overflow-hidden border-b border-white/10">
                            <div className="relative z-10 flex flex-col items-center space-y-2">
                              {p.category === 'ai' && <div className="w-13 h-13 rounded-2xl bg-neural-purple/20 flex items-center justify-center text-neural-purple"><Cpu size={24} /></div>}
                              {p.category === 'web' && <div className="w-13 h-13 rounded-2xl bg-neural-purple/20 flex items-center justify-center text-neural-purple"><Globe size={24} /></div>}
                              {p.category === 'mobile' && <div className="w-13 h-13 rounded-2xl bg-neural-purple/20 flex items-center justify-center text-neural-purple"><Smartphone size={24} /></div>}
                              {p.category === 'app' && <div className="w-13 h-13 rounded-2xl bg-neural-purple flex items-center justify-center text-white shadow-xs"><Users size={24} /></div>}
                              {p.category === 'civil' && <div className="w-13 h-13 rounded-2xl bg-white/10 flex items-center justify-center text-neural-muted"><Layers size={24} /></div>}
                              <span className="text-[10px] font-mono font-bold tracking-widest text-neural-muted uppercase">
                                {p.category === 'ai' ? 'ML PIPELINE' : p.category === 'web' ? 'RESPONSIVE WEB' : p.category === 'mobile' ? 'MOBILE OS' : p.category === 'civil' ? 'CIVIL CAD' : 'ENTERPRISE SYSTEM'}
                              </span>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-neural-purple" />
                          </div>
                          <div className="p-7 flex-grow flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <h3 className="text-xl font-bold font-display text-white group-hover/project:text-neural-purple transition-colors">
                                {p.title}
                              </h3>
                              <p className="text-neural-muted text-sm leading-relaxed">
                                {p.description}
                              </p>
                            </div>
                            <div className="space-y-4 pt-2">
                              <div className="flex flex-wrap gap-1.5">
                                {p.tech.map((t, idx) => (
                                  <span key={idx} className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-mono tracking-wider bg-white/5 border border-white/10 text-neural-muted uppercase">
                                    {t}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                                {p.liveUrl ? (
                                  <a
                                    href={p.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-neural-purple/20 border border-neural-purple/30 text-xs font-bold text-neural-purple hover:bg-neural-purple hover:text-white transition-all shadow-xs group/btn cursor-pointer"
                                  >
                                    <span>Launch Portal</span>
                                    <ExternalLink size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                  </a>
                                ) : <div />}
                                <button
                                  onClick={() => {
                                    setFormData(prev => ({ ...prev, requirement: p.title }));
                                    scrollToSection('contact');
                                  }}
                                  className="flex items-center space-x-1.5 text-xs font-bold text-neural-purple hover:text-neural-violet transition-colors cursor-pointer"
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

          <section id="why-choose-us" className="py-24 px-6 bg-neural-dark-alt border-y border-white/5">
            <Scroll3DReveal>
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-5 text-left space-y-6">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-neural-purple/30 bg-neural-purple/10 text-neural-purple text-xs font-semibold uppercase tracking-wider">
                    <CheckCircle2 size={13} />
                    <span>Our Core Strengths</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
                    Why Choose GoNexora?
                  </h2>
                  <div className="w-16 h-[3px] bg-neural-purple rounded-full" />
                  <p className="text-neural-muted text-lg leading-relaxed">
                    We combine rigorous software architectural standards, clean visual aesthetic design, and structural precision to construct platforms that truly scale.
                  </p>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-8 py-3.5 rounded-2xl font-semibold text-neural-black bg-white hover:bg-neural-silver transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    Start Collaborating
                  </button>
                </div>
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {benefits.map((b, idx) => {
                    const Icon = b.icon;
                    return (
                      <div key={idx} className="glass-card-bento rounded-3xl p-6 text-left relative overflow-hidden group shadow-xs bg-neural-black/40">
                        <div className="w-12 h-12 rounded-2xl bg-neural-purple/20 border border-neural-purple/30 text-neural-purple flex items-center justify-center mb-4 shadow-xs group-hover:scale-105 transition-transform duration-200">
                          <Icon size={22} />
                        </div>
                        <h3 className="text-lg font-bold font-display text-white mb-2">{b.title}</h3>
                        <p className="text-neural-muted text-sm leading-relaxed">{b.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Scroll3DReveal>
          </section>

          <section id="team" className="py-24 px-6 max-w-7xl mx-auto">
            <Scroll3DReveal>
              <div className="space-y-16">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-neural-purple/30 bg-neural-purple/10 text-neural-purple text-xs font-semibold uppercase tracking-wider">
                    <Users size={13} />
                    <span>Visionaries & Architects</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
                    Executive Leadership
                  </h2>
                  <p className="text-neural-muted text-lg">
                    Meet the founders and directors driving GoNexora’s strategic vision, engineering benchmarks, and brand growth.
                  </p>
                  <div className="w-16 h-[3px] bg-neural-purple rounded-full mx-auto" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {team.filter(t => t.founder).map((t, idx) => (
                    <Tilt key={idx} tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.02} transitionSpeed={2000} tiltEnable={!isMobile} glareEnable={false} className="h-full">
                      <div className="glass-panel glass-panel-hover rounded-3xl p-8 text-left relative overflow-hidden flex flex-col justify-between group/card shadow-md bg-neural-black/40 h-full">
                        <div className="absolute top-0 left-0 w-full h-[4px] bg-neural-purple" />
                        <div className="space-y-6">
                          <div className="flex items-center space-x-5">
                            <div className="relative w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                              {t.image ? (
                                <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300" />
                              ) : (
                                <span className="font-display font-extrabold text-2xl text-neural-purple">{t.name[0]}</span>
                              )}
                            </div>
                            <div>
                              <h3 className="text-2xl font-extrabold font-display text-white group-hover/card:text-neural-purple transition-colors">
                                {t.name}
                              </h3>
                              <p className="text-xs font-bold text-neural-purple font-mono tracking-wide uppercase">
                                {t.role}
                              </p>
                            </div>
                          </div>
                          <p className="text-neural-muted text-sm leading-relaxed">
                            {t.desc}
                          </p>
                        </div>
                        <div className="space-y-3 pt-6 border-t border-white/10 mt-6">
                          <span className="text-[10px] font-mono tracking-widest text-neural-muted/60 uppercase font-bold">CORE SPECIALTIES:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {t.skills.map((s, i) => (
                              <span key={i} className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 border border-white/10 text-neural-muted">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Tilt>
                  ))}
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-left space-y-1">
                    <h3 className="text-xl font-bold font-display text-white">Explore Our Full Engineering Network</h3>
                    <p className="text-sm text-neural-muted">Discover all {team.length} specialists across AI, Java, Android, UI/UX, and Full-Stack.</p>
                  </div>
                  <button
                    onClick={() => setViewingAllTeam(true)}
                    className="px-6 py-3 rounded-xl font-bold text-white bg-neural-purple hover:bg-neural-violet shadow-sm transition-all duration-200 cursor-pointer flex items-center space-x-2 shrink-0"
                  >
                    <Users size={16} />
                    <span>View All Team Members</span>
                  </button>
                </div>
              </div>
            </Scroll3DReveal>
          </section>

          <section id="careers" className="py-24 px-6 bg-neural-dark-alt border-y border-white/5">
            <Scroll3DReveal>
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-neural-purple/30 bg-neural-purple/10 text-neural-purple text-xs font-semibold uppercase tracking-wider">
                    <GraduationCap size={13} />
                    <span>Grow With GoNexora</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
                    Careers & Internships
                  </h2>
                  <p className="text-neural-muted text-lg">
                    Whether you are an experienced software architect or an aspiring student looking for hands-on mentorship, GoNexora is where your potential accelerates.
                  </p>
                  <div className="w-16 h-[3px] bg-neural-purple rounded-full mx-auto" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                  <div className="glass-card-bento rounded-3xl p-8 space-y-4 bg-neural-black/40 shadow-xs flex flex-col justify-between hover:border-neural-purple/50">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-neural-purple/20 text-neural-purple flex items-center justify-center">
                        <Briefcase size={22} />
                      </div>
                      <h3 className="text-xl font-bold font-display text-white">Open Full-Time Roles</h3>
                      <p className="text-neural-muted text-sm leading-relaxed">
                        Join our core product and engineering team as a React, Python AI, Java, or Mobile Developer. Work on high-impact scalable platforms.
                      </p>
                    </div>
                    <button
                      onClick={() => scrollToSection('contact')}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-neural-purple hover:text-neural-violet transition-colors cursor-pointer pt-4 border-t border-white/10"
                    >
                      <span>Apply For Positions</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                  <div className="glass-card-bento rounded-3xl p-8 space-y-4 bg-neural-black/40 shadow-xs flex flex-col justify-between hover:border-neural-purple/50">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-neural-purple/20 text-neural-purple flex items-center justify-center">
                        <GraduationCap size={22} />
                      </div>
                      <h3 className="text-xl font-bold font-display text-white">Internship Programs</h3>
                      <p className="text-neural-muted text-sm leading-relaxed">
                        Get live industry exposure, complete tasks under senior mentors, and receive verified digital completion credentials.
                      </p>
                    </div>
                    <a
                      href="https://internship-portal-silk.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-neural-purple hover:text-neural-violet transition-colors pt-4 border-t border-white/10"
                    >
                      <span>Open Internship Portal</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                  <div className="glass-card-bento rounded-3xl p-8 space-y-4 bg-neural-black/40 shadow-xs flex flex-col justify-between hover:border-neural-purple/50">
                    <div className="space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-neural-purple/20 text-neural-purple flex items-center justify-center">
                        <BookOpen size={22} />
                      </div>
                      <h3 className="text-xl font-bold font-display text-white">College Project Guidance</h3>
                      <p className="text-neural-muted text-sm leading-relaxed">
                        Complete mini & major computer science, AI, and civil engineering project execution with documentation & report support.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, requirement: "College Mini & Major Projects" }));
                        scrollToSection('contact');
                      }}
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-neural-purple hover:text-neural-violet transition-colors cursor-pointer pt-4 border-t border-white/10"
                    >
                      <span>Request Project Support</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </Scroll3DReveal>
          </section>

          <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto">
            <Scroll3DReveal>
              <div className="space-y-12">
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-neural-purple/30 bg-neural-purple/10 text-neural-purple text-xs font-semibold uppercase tracking-wider">
                    <Star size={13} />
                    <span>Client Voices</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
                    Trusted by Visionaries
                  </h2>
                  <p className="text-neural-muted text-lg">
                    Hear from the industry leaders and students who have scaled their vision with GoNexora's architectural precision.
                  </p>
                  <div className="w-16 h-[3px] bg-neural-purple rounded-full mx-auto" />
                </div>

                <div className="relative h-[400px] w-full overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={testimonialIndex}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="max-w-4xl w-full glass-panel rounded-3xl p-12 border border-white/10 bg-neural-black/60 text-center space-y-8">
                        <div className="flex justify-center space-x-1 text-neural-purple">
                          {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                        </div>
                        <p className="text-2xl md:text-3xl font-medium text-white leading-relaxed italic">
                          "{testimonials[testimonialIndex].text}"
                        </p>
                        <div className="space-y-1">
                          <h4 className="text-xl font-bold text-white">{testimonials[testimonialIndex].author}</h4>
                          <p className="text-neural-purple font-mono text-sm uppercase tracking-widest">{testimonials[testimonialIndex].position}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-3">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setTestimonialIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          testimonialIndex === i ? 'bg-neural-purple w-8' : 'bg-white/20 hover:bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Scroll3DReveal>
          </section>

          <section id="contact" className="py-24 px-6 max-w-7xl mx-auto relative">
            <Scroll3DReveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-5 space-y-8">
                  <div className="space-y-4">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-neural-purple/30 bg-neural-purple/10 text-neural-purple text-xs font-semibold uppercase tracking-wider">
                      <Mail size={13} />
                      <span>Get in Touch</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
                      Ready to Scale Your <br />Digital Future?
                    </h2>
                    <p className="text-neural-muted text-lg leading-relaxed">
                      Whether it's a production-grade AI pipeline or a high-fidelity corporate portal, we bring the architectural precision your project deserves.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {[
                      { icon: Mail, label: "Email Us", value: "contactnexoratechs@gmail.com" },
                      { icon: MapPin, label: "Global Operations", value: "Remote / Distributed" },
                      { icon: Globe, label: "Website", value: "www.gonexora.tech" }
                    ].map((info, i) => (
                      <div key={i} className="flex items-center space-x-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-neural-purple/30 transition-colors group">
                        <div className="w-12 h-12 rounded-xl bg-neural-purple/20 text-neural-purple flex items-center justify-center group-hover:bg-neural-purple group-hover:text-white transition-all">
                          <info.icon size={22} />
                        </div>
                        <div>
                          <p className="text-xs font-mono text-neural-muted uppercase tracking-widest">{info.label}</p>
                          <p className="text-white font-semibold">{info.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="glass-panel rounded-3xl p-8 border border-white/10 bg-neural-black/60">
                    {formSubmitted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12"
                      >
                        <div className="w-20 h-20 rounded-full bg-neural-purple/20 text-neural-purple flex items-center justify-center border border-neural-purple/30">
                          <CheckCircle2 size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Request Sent!</h3>
                        <p className="text-neural-muted">Our architectural team will review your requirements and get back to you shortly.</p>
                        <button
                          onClick={() => setFormSubmitted(false)}
                          className="px-6 py-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors text-sm"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-mono text-neural-muted uppercase tracking-widest ml-1">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neural-muted/30 focus:outline-none focus:ring-2 focus:ring-neural-purple/50 transition-all"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-mono text-neural-muted uppercase tracking-widest ml-1">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@company.com"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neural-muted/30 focus:outline-none focus:ring-2 focus:ring-neural-purple/50 transition-all"
                            required
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-mono text-neural-muted uppercase tracking-widest ml-1">Service Requirement</label>
                          <select
                            name="requirement"
                            value={formData.requirement}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-neural-purple/50 transition-all appearance-none"
                          >
                            <option value="Web Development" className="bg-neural-black">Web Development</option>
                            <option value="Mobile App Development" className="bg-neural-black">Mobile App Development</option>
                            <option value="AI & Machine Learning Solutions" className="bg-neural-black">AI & ML Solutions</option>
                            <option value="UI/UX Design" className="bg-neural-black">UI/UX Design</option>
                            <option value="Database Management" className="bg-neural-black">Database Management</option>
                            <option value="Cloud Deployment" className="bg-neural-black">Cloud Deployment</option>
                            <option value="College Mini & Major Projects" className="bg-neural-black">College Projects</option>
                            <option value="Research Paper Support" className="bg-neural-black">Research Paper Support</option>
                            <option value="Civil CAD & Structural Design" className="bg-neural-black">Civil CAD Design</option>
                          </select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-mono text-neural-muted uppercase tracking-widest ml-1">Project Brief</label>
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell us about your vision..."
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neural-muted/30 focus:outline-none focus:ring-2 focus:ring-neural-purple/50 transition-all resize-none"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="md:col-span-2 w-full py-4 rounded-xl bg-neural-purple text-white font-bold shadow-lg hover:bg-neural-violet transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2 group"
                        >
                          <span>Transmit Inquiry</span>
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </Scroll3DReveal>
          </section>
        </main>

        <footer className="py-12 px-6 border-t border-white/10 bg-neural-black relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-3 group">
              <div className="relative w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center border border-white/10 shadow-md ring-1 ring-white/5">
                <Logo3D size="sm" animation="swing" interactive={false} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-extrabold text-lg tracking-wider text-white">GONEXORA</span>
                <span className="text-[8px] font-mono tracking-widest text-neural-purple font-bold uppercase -mt-1">TECHS</span>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-neural-muted">
              {[
                { icon: GithubIcon, href: "#" },
                { icon: TwitterIcon, href: "#" },
                { icon: LinkedinIcon, href: "#" },
                { icon: InstagramIcon, href: "#" }
              ].map((social, i) => (
                <a key={i} href={social.href} className="hover:text-white transition-colors">
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <p className="text-xs font-mono text-neural-muted/60">
              &copy; {new Date().getFullYear()} GoNexora Techs. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;

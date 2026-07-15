import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Cpu, Smartphone, Database, Cloud, GraduationCap, 
  FileText, Palette, ChevronLeft, ChevronRight, Send, Mail, 
  Phone, MapPin, ArrowRight, 
  MessageSquare, CheckCircle2, Menu, X, Sparkles, Code, 
  Layers, ShieldAlert, Award, Clock, DollarSign, Check,
  ChevronDown, ExternalLink
} from 'lucide-react';
import trivinPhoto from './assets/trivin.png';
import aakashrajPhoto from './assets/aakashraj.png';
import arutselvanPhoto from './assets/arutselvan.png';
import logo from './assets/logo.png';
import WelcomeNamaste from './components/WelcomeNamaste';

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
  const [loading, setLoading] = useState(true);
  const [portalsDropdownOpen, setPortalsDropdownOpen] = useState(false);

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
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'technologies', 'projects', 'why-choose-us', 'team', 'careers', 'testimonials', 'contact'];
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

  // Lock body scroll when loading or viewing entire team sub-page
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

  // Static Data
  const services = [
    {
      title: "Portfolio Websites",
      description: "Custom, interactive, and eye-catching personal and business portfolios designed to showcase your work and attract clients.",
      icon: Palette,
      gradient: "from-purple-500/10 to-indigo-500/10"
    },
    {
      title: "Web Development",
      description: "High-performance, secure, and modern web applications built using cutting-edge frameworks like React, Next.js, and Node.js.",
      icon: Globe,
      gradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      title: "Mobile App Development",
      description: "Cross-platform iOS and Android applications with native-like performance, elegant UI, and smooth animations.",
      icon: Smartphone,
      gradient: "from-cyan-500/10 to-teal-500/10"
    },
    {
      title: "AI & Machine Learning Solutions",
      description: "Custom intelligent models, predictive analytics, natural language processing, deep learning pipelines, and smart chatbots.",
      icon: Cpu,
      gradient: "from-fuchsia-500/10 to-purple-500/10"
    },
    {
      title: "UI/UX Design",
      description: "User-centric wireframes, high-fidelity prototypes, and sleek interfaces that provide intuitive digital journeys.",
      icon: Layers,
      gradient: "from-pink-500/10 to-rose-500/10"
    },
    {
      title: "Database Management",
      description: "Robust data architectures, schema designs, secure API scaling, and high-availability setups using MongoDB, MySQL, and PostgreSQL.",
      icon: Database,
      gradient: "from-amber-500/10 to-orange-500/10"
    },
    {
      title: "Cloud Deployment",
      description: "Seamless infrastructure setup, serverless deployments, CI/CD automated pipelines, and cloud hosting on AWS and Google Cloud.",
      icon: Cloud,
      gradient: "from-sky-500/10 to-indigo-500/10"
    },
    {
      title: "College Mini & Major Projects",
      description: "End-to-end guidance, clean implementation, report writing, and complete project codebases for engineering and computer science students.",
      icon: GraduationCap,
      gradient: "from-emerald-500/10 to-teal-500/10"
    },
    {
      title: "Research Paper Support",
      description: "Technical implementations, experimental results generation, data plotting, and drafting reviews for publication in reputed journals.",
      icon: FileText,
      gradient: "from-violet-500/10 to-purple-500/10"
    },
    {
      title: "Civil CAD & Structural Design",
      description: "2D/3D building layouts, AutoCAD plans, structural drafting, and STAAD Pro analysis for engineering projects and construction plans.",
      icon: Layers,
      gradient: "from-blue-500/10 to-indigo-500/10"
    }
  ];

  const technologies = [
    { name: "React", icon: Code, color: "hover:border-blue-500 hover:text-blue-600" },
    { name: "Node.js", icon: Globe, color: "hover:border-green-500 hover:text-green-600" },
    { name: "Python", icon: Cpu, color: "hover:border-yellow-500 hover:text-yellow-600" },
    { name: "Java", icon: Code, color: "hover:border-red-500 hover:text-red-600" },
    { name: "MongoDB", icon: Database, color: "hover:border-emerald-500 hover:text-emerald-600" },
    { name: "Firebase", icon: Cloud, color: "hover:border-orange-500 hover:text-orange-600" },
    { name: "TensorFlow", icon: Cpu, color: "hover:border-orange-600 hover:text-orange-700" },
    { name: "MySQL", icon: Database, color: "hover:border-blue-600 hover:text-blue-700" },
    { name: "AWS", icon: Cloud, color: "hover:border-amber-500 hover:text-amber-600" },
    { name: "GitHub", icon: GithubIcon, color: "hover:border-slate-800 hover:text-slate-900" }
  ];

  const projects = [
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
      imagePath: "nodues_preview"
    },
    {
      title: "AI Chatbot",
      category: "ai",
      description: "Context-aware conversational agent utilizing natural language processing and vector embedding retrieval.",
      tech: ["Python", "TensorFlow", "FastAPI", "React"],
      imagePath: "chatbot_preview"
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
      skills: [ "System Architecture", "AI Integration", "Product Strategy","AI & Software Development"],
      image: trivinPhoto
    },
    {
      name: "Aakashraj",
      role: "Co-Founder & Social Media Head",
      desc: "Leads digital brand growth by creating engaging content, managing social media campaigns, and building meaningful audience engagement across multiple platforms.",
      skills: [ "Content Strategy","Social Media Marketing","Canva & Adobe   Express","Analytics & Performance Tracking","Brand Management" ],
      image: aakashrajPhoto
    },
    {
      name: "Arutselvan",
      role: "Co-Founder & Team Leader",
      desc: "Directs project execution, orchestrates cross-functional engineering groups, and ensures top-tier quality delivery across all client solutions.",
      skills: [ "Project Leadership", "Software Architecture", "Agile Workflows", "Team Coordination", "Client Relations" ],
      image: arutselvanPhoto
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
      role: "Data Analyst",
      desc: "Transforms raw corporate data into actionable business insights, statistics charts, and interactive analysis dashboards.",
      skills: ["Data Visualization", "SQL", "Tableau / PowerBI", "Python / Pandas"]
    },
    {
      name: "Sujitha",
      role: "Full Stack Developer & Data Analyst",
      desc: "Bridges the gap between end-to-end web system architecture and advanced statistical analysis of application telemetry.",
      skills: ["React / Node.js", "Express", "Data Analytics", "SQL Databases"]
    },
    {
      name: "Sangamithra",
      role: "AI/ML & Cloud Engineer",
      desc: "Designs, deploys, and scales machine learning model architectures on cloud infrastructures with CI/CD automated pipeline builds.",
      skills: ["Machine Learning", "Python / PyTorch", "AWS / GCP", "Docker / DevOps"]
    },
    {
      name: "VishnuHasan",
      role: "Data Analyst",
      desc: "Specializes in data mining, predictive trend modeling, statistical audits, and designing clear data report structures.",
      skills: ["Data Analysis", "R / Python", "Excel Analytics", "SQL Queries"]
    },
    {
      name: "Aaryan",
      role: "Data Analyst & Web Developer",
      desc: "Combines frontend web engineering skills with analytics capabilities to create tracking-ready, high-converting digital interfaces.",
      skills: ["Frontend Dev", "React.js", "Data Tracking", "Google Analytics"]
    },
    {
      name: "Ajaykumar",
      role: "Full Stack Developer",
      desc: "Engineers full-scale web platforms from database modeling to client interfaces, utilizing cutting-edge reactive state engines.",
      skills: ["React.js", "Node.js / Express", "MongoDB / SQL", "API Integration"]
    },
    {
      name: "Pathmavathi",
      role: "Frontend Developer",
      desc: "Translates designs into pixel-perfect, highly responsive, and accessible interactive web pages with smooth CSS transitions.",
      skills: ["HTML5 / CSS3", "JavaScript (ES6+)", "React.js", "Tailwind CSS"]
    },
    {
      name: "Pooja",
      role: "2D CAD Drafter",
      desc: "Creates detailed 2D architectural layouts, civil plans, building schematics, and mechanical technical structural drafts.",
      skills: ["AutoCAD 2D", "Drafting Standards", "Building Plans", "CAD Design"]
    },
    {
      name: "Aarathana",
      role: "2D CAD Drafter",
      desc: "Formulates technical building blueprints, electrical circuit alignments, and structural CAD designs according to compliance standards.",
      skills: ["AutoCAD 2D", "Civil Engineering", "Floor Plans", "Blueprint Design"]
    },
    {
      name: "Gokulashri",
      role: "2D CAD Drafter",
      desc: "Develops precise structural engineering elevation sketches, site layouts, and detail-oriented technical drafting documents.",
      skills: ["AutoCAD 2D", "STAAD Pro", "Elevation Drawing", "Layout Planning"]
    },
    {
      name: "Karthikeyan",
      role: "Backend & AI/ML Engineer",
      desc: "Builds scalable API web servers while integrating artificial intelligence model backends and predictive algorithms.",
      skills: ["Node.js / Python", "Deep Learning", "TensorFlow", "PostgreSQL"]
    },
    {
      name: "Logesh",
      role: "Data Analyst",
      desc: "Processes large-scale relational data matrices to detect patterns, formulate performance metrics, and optimize data hygiene.",
      skills: ["Data Warehousing", "Python", "SQL Optimization", "ETL Pipelines"]
    },
    {
      name: "Sanjay Kumar",
      role: "UI/UX & Android Developer",
      desc: "Crafts intuitive wireframes and cross-platform native-feeling mobile app interfaces focusing on clean typography and motion designs.",
      skills: ["Android SDK", "React Native", "Figma Design", "User Journeys"]
    },
    {
      name: "Sanjay",
      role: "Data Analytics & Web Developer",
      desc: "Synthesizes web engineering stacks with database queries to deliver data-intensive, analytical web dashboard applications.",
      skills: ["React.js", "Express.js", "Data Aggregation", "Chart.js / D3"]
    },
    {
      name: "Vishwa",
      role: "Mechanical Engineer",
      desc: "Specializes in fluid dynamics, thermal systems analysis, CAD/CAM mechanical designs, and structural component engineering.",
      skills: ["SolidWorks", "Ansys / FEA", "CAD Modeling", "Thermodynamics"]
    },
    {
      name: "Shakthi",
      role: "Data Analyst",
      desc: "Focuses on data hygiene auditing, performance metric optimization, machine learning modeling, and analytical projections.",
      skills: ["Data Analysis", "SQL Optimization", "Python / NumPy", "Predictive Analytics"]
    },
    {
      name: "Prisha",
      role: "Software Developer",
      desc: "Develops clean, scalable client-side application logic and responsive web interfaces utilizing modern front-end components.",
      skills: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "Git / GitHub"]
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
      text: "The AI Chatbot Nexora developed was stellar. It integrates seamlessly into our website, handles 80% of our customer queries automatically, and has a sleek, interactive light UI.",
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
            {/* Ambient Background Glow */}
            <div className="absolute w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="z-10 flex flex-col items-center space-y-6 max-w-md px-6 text-center">
              {/* Welcoming Figure with Joining Hands (Traditional Greeting) */}
              <WelcomeNamaste />

              {/* Company Name with Typing/Gradient Effect */}
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
            
            {/* Tech grid overlay lines */}
            <div className="absolute inset-0 bg-grid-cyber opacity-[0.03] pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-screen bg-slate-50/50 text-slate-700 selection:bg-indigo-500/10 selection:text-indigo-600 font-sans bg-grid-cyber">
      
      {/* Background glowing blobs (light color washes) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-radial-gradient-glow pointer-events-none animate-pulse-slow z-0" />
      <div className="absolute top-[30%] right-[-10%] w-[55%] h-[55%] bg-radial-gradient-glow pointer-events-none animate-pulse-slow z-0" />
      <div className="absolute bottom-[10%] left-[5%] w-[45%] h-[45%] bg-radial-gradient-glow pointer-events-none animate-pulse-slow z-0" />

      {/* Connection Node Animation overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10%" cy="20%" r="2" fill="#4f46e5" className="animate-ping" style={{ animationDuration: '3s' }} />
          <circle cx="85%" cy="15%" r="3" fill="#2563eb" className="animate-ping" style={{ animationDuration: '4s' }} />
          <circle cx="75%" cy="65%" r="2" fill="#0ea5e9" className="animate-ping" style={{ animationDuration: '5s' }} />
          <circle cx="20%" cy="80%" r="3" fill="#3b82f6" className="animate-ping" style={{ animationDuration: '6s' }} />
        </svg>
      </div>

      {/* Sticky Light Glass Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-slate-200/50 bg-white/70 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} 
            className="flex items-center space-x-3 group"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md transition-transform group-hover:rotate-12 duration-300 flex items-center justify-center bg-white/50 border border-slate-100">
              <img src={logo} alt="Nexora Logo" className="w-full h-full object-contain p-1" />
            </div>
            <span className="font-display font-bold text-xl tracking-wider bg-gradient-to-r from-slate-900 via-slate-800 to-slate-600 bg-clip-text text-transparent">
              NEXORA
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Us' },
              { id: 'services', label: 'Services' },
              { id: 'projects', label: 'Projects' },
              { id: 'why-choose-us', label: 'Why Choose Us' },
              { id: 'team', label: 'Team' },
              { id: 'careers', label: 'Careers' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                className={`text-sm font-medium transition-colors hover:text-slate-950 relative py-2 ${
                  activeSection === link.id ? 'text-indigo-600 font-semibold' : 'text-slate-500'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-blue-500"
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
                className="text-sm font-medium text-slate-500 hover:text-slate-950 transition-colors py-2 flex items-center space-x-1 cursor-pointer focus:outline-none"
                onClick={() => setPortalsDropdownOpen(!portalsDropdownOpen)}
              >
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
                    className="absolute right-0 mt-1 w-52 rounded-xl bg-white border border-slate-200/80 shadow-xl py-2 z-50 overflow-hidden"
                  >
                    <a
                      href="https://dpr-nexora.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-600 hover:text-indigo-600 hover:bg-slate-50/80 transition-colors"
                    >
                      <span className="font-medium">DPR Portal</span>
                      <ExternalLink size={14} className="text-slate-400 group-hover:text-indigo-600" />
                    </a>
                    <a
                      href="https://nexora-s-internship-portal-xi.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-600 hover:text-indigo-600 hover:bg-slate-50/80 transition-colors"
                    >
                      <span className="font-medium">Internship Portal</span>
                      <ExternalLink size={14} className="text-slate-400 group-hover:text-indigo-600" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Action CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => scrollToSection('contact')}
              className="relative px-6 py-2.5 rounded-full font-medium text-sm text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 transition-all duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center space-x-1">
                <span>Get Started</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-900 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-slate-200/50 bg-white/95 backdrop-blur-xl"
            >
              <div className="px-6 py-8 flex flex-col space-y-4">
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'about', label: 'About Us' },
                  { id: 'services', label: 'Services' },
                  { id: 'projects', label: 'Projects' },
                  { id: 'why-choose-us', label: 'Why Choose Us' },
                  { id: 'team', label: 'Team' },
                  { id: 'careers', label: 'Careers' },
                  { id: 'contact', label: 'Contact' }
                ].map((link) => (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                    className={`text-base font-semibold py-2 border-b border-slate-100 ${
                      activeSection === link.id ? 'text-indigo-600' : 'text-slate-500'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                
                {/* Mobile Portals Links */}
                <div className="border-t border-slate-100 pt-4 mt-2">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 font-sans">Our Portals</h4>
                  <div className="flex flex-col space-y-2">
                    <a
                      href="https://dpr-nexora.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-base font-semibold py-2 text-slate-500 hover:text-indigo-600 transition-colors font-sans"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>DPR Portal</span>
                      <ExternalLink size={16} className="text-slate-400" />
                    </a>
                    <a
                      href="https://nexora-s-internship-portal-xi.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-base font-semibold py-2 text-slate-500 hover:text-indigo-600 transition-colors font-sans"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>Internship Portal</span>
                      <ExternalLink size={16} className="text-slate-400" />
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold text-center shadow-md cursor-pointer"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 pt-20">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-[calc(100vh-80px)] flex items-center py-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            
            {/* Left Column Text */}
            <div className="lg:col-span-7 text-left space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-600 text-xs font-semibold uppercase tracking-wider animate-pulse">
                <Sparkles size={12} />
                <span>Next-Gen Software & AI Studio</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-display leading-[1.1] tracking-tight text-slate-900">
                Nexora <span className="text-gradient-purple-blue">Technologies</span>
              </h1>
              
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-blue-600 neon-glow-text">
                "Building Tomorrow, Today."
              </h2>
              
              <p className="text-slate-600 text-lg md:text-xl max-w-xl leading-relaxed">
                We transform ideas into innovative digital solutions, delivering web applications, AI solutions, mobile apps, portfolios, and enterprise software.
              </p>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500 text-center hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
                >
                  Get Started
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/60 text-center transition-all duration-300 cursor-pointer"
                >
                  View Projects
                </button>
              </div>

              {/* Quick Portal Access */}
              <div className="pt-6 border-t border-slate-200/40 mt-8 space-y-4">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block font-sans">
                  Access Our Portals
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a 
                    href="https://dpr-nexora.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl bg-white/60 hover:bg-white border border-slate-200/60 hover:border-indigo-500/80 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group font-sans"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors truncate">DPR Portal</h4>
                      <p className="text-[11px] text-slate-400 truncate">Daily Project Reporting</p>
                    </div>
                    <ExternalLink size={14} className="text-slate-400 group-hover:text-indigo-600 shrink-0 transition-colors" />
                  </a>

                  <a 
                    href="https://nexora-s-internship-portal-xi.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3.5 px-4 py-3 rounded-2xl bg-white/60 hover:bg-white border border-slate-200/60 hover:border-blue-500/80 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group font-sans"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0">
                      <GraduationCap size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">Internship Portal</h4>
                      <p className="text-[11px] text-slate-400 truncate">Apply & Manage Internships</p>
                    </div>
                    <ExternalLink size={14} className="text-slate-400 group-hover:text-blue-600 shrink-0 transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column Brand Logo Showcase */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center"
              >
                {/* Backing ambient glowing spheres */}
                <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-indigo-500/10 via-blue-500/5 to-cyan-500/10 rounded-full blur-3xl z-0 animate-pulse-slow" />
                
                {/* Outer Glassmorphic ring */}
                <div className="absolute inset-0 rounded-3xl border border-slate-200/50 bg-white/30 backdrop-blur-md shadow-2xl flex items-center justify-center overflow-hidden p-8 group">
                  <div className="absolute inset-0 bg-grid-cyber opacity-15" />
                  
                  {/* Glowing background behind logo */}
                  <div className="absolute w-40 h-40 rounded-full bg-gradient-to-tr from-indigo-500/20 to-blue-500/20 blur-2xl group-hover:scale-125 transition-transform duration-700" />
                  
                  {/* Floating Logo */}
                  <motion.img 
                    src={logo} 
                    alt="Nexora Technologies Logo" 
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 object-contain filter drop-shadow-2xl"
                  />
                  
                  {/* Decorative corners */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-indigo-500/40 rounded-tl-md" />
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-indigo-500/40 rounded-tr-md" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-blue-500/40 rounded-bl-md" />
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-blue-500/40 rounded-br-md" />
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* STATS STRIP */}
        <section className="py-12 bg-slate-50 border-y border-slate-200/60 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "50+", label: "Projects Completed" },
              { num: "99.9%", label: "Client Satisfaction" },
              { num: "24/7", label: "Dedicated Support" },
              { num: "50+", label: "Employees Working" }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-3xl md:text-4xl font-extrabold font-display text-gradient-purple-blue">{stat.num}</p>
                <p className="text-slate-500 text-xs md:text-sm tracking-wider uppercase font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT US */}
        <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left graphic representation */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 glass-panel rounded-2xl flex items-center justify-center p-6 border border-slate-200/80 shadow-[0_15px_40px_rgba(15,23,42,0.05)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-blue-500/5 rounded-2xl blur-md" />
                <div className="z-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto border border-indigo-500/20">
                    <Sparkles className="text-indigo-600" size={28} />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-slate-900">Our Mission</h3>
                  <p className="text-slate-700 text-sm leading-relaxed italic">
                    "Empowering businesses and individuals through innovative, reliable, and scalable technology."
                  </p>
                </div>
                
                {/* Accent corners */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-indigo-500 rounded-tl-xl" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-blue-500 rounded-br-xl" />
              </div>
            </div>

            {/* Right text layout */}
            <div className="lg:col-span-7 text-left space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-slate-900">
                Who We Are
              </h2>
              <div className="w-20 h-[3px] bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" />
              
              <p className="text-slate-600 text-lg leading-relaxed">
                Nexora Technologies is a growing team of 50+ passionate developers, designers, and innovators providing high-quality software solutions. We bridge the gap between complex engineering concepts and intuitive, scalable digital experiences.
              </p>
              
              <p className="text-slate-500">
                Whether you need a sleek portfolio to establish your online brand, a custom database backend, an AI deployment, or university research assistance, we deliver cutting-edge technology customized to your needs.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "50+ Active Professionals",
                  "Robust Security Standards",
                  "Expert Software Architects",
                  "End-to-End Support Delivery"
                ].map((val, idx) => (
                  <div key={idx} className="flex items-center space-x-3 text-slate-700">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <Check className="text-blue-600" size={14} />
                    </div>
                    <span className="font-medium text-sm">{val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 px-6 bg-slate-50/50 relative border-t border-slate-200/50">
          <div className="max-w-7xl mx-auto text-center space-y-12">
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900">
                What We Offer
              </h2>
              <p className="text-slate-500 text-lg">
                Cutting-edge capabilities engineered for business growth, creative portfolios, and educational empowerment.
              </p>
              <div className="w-20 h-[3px] bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mx-auto" />
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((svc, i) => {
                const IconComponent = svc.icon;
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="glass-panel glass-panel-hover rounded-2xl p-8 text-left relative overflow-hidden flex flex-col justify-between min-h-[330px]"
                  >
                    {/* Corner overlay background glow */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${svc.gradient} blur-2xl z-0`} />
                    
                    <div className="space-y-4 relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-slate-100/80 border border-slate-200/50 flex items-center justify-center shadow-sm group">
                        <IconComponent className="text-indigo-600 group-hover:scale-110 transition-transform duration-300" size={24} />
                      </div>
                      <h3 className="text-xl font-bold font-display text-slate-900">{svc.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-4">{svc.description}</p>
                    </div>

                    <button 
                      onClick={() => scrollToSection('contact')}
                      className="mt-4 flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors relative z-10 group/link cursor-pointer"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        {/* TECHNOLOGIES SECTION */}
        <section id="technologies" className="py-20 bg-slate-100/50 border-y border-slate-200/60 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold font-display text-slate-900">Technologies We Master</h2>
              <p className="text-slate-500 max-w-xl mx-auto">We leverage state-of-the-art developer environments and scalable production tools to execute projects seamlessly.</p>
              <div className="w-16 h-[2px] bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mx-auto" />
            </div>

            {/* Marquee Loop */}
            <div className="relative w-full overflow-hidden py-4 mask-gradient-sides">
              <div className="flex space-x-8 animate-marquee w-[200%]">
                {[...technologies, ...technologies].map((tech, idx) => {
                  const Icon = tech.icon;
                  return (
                    <div 
                      key={idx}
                      className={`flex-shrink-0 flex items-center space-x-3 px-6 py-4 bg-white border border-slate-200/60 rounded-xl cursor-default transition-all duration-300 shadow-sm ${tech.color}`}
                    >
                      <Icon className="text-slate-500 group-hover:text-inherit" size={20} />
                      <span className="text-sm font-semibold text-slate-700">{tech.name}</span>
                    </div>
                  );
                })}
              </div>

              {/* Side fades overlay */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
            </div>

          </div>
        </section>

        {/* PROJECTS SHOWCASE */}
        <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="space-y-12 text-center">
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900">
                Featured Projects
              </h2>
              <p className="text-slate-500 text-lg">
                Explore our recent digital creations, ranging from corporate applications to academic implementations.
              </p>
              <div className="w-20 h-[3px] bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mx-auto" />
            </div>

            {/* Category Filter Controls */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { filter: 'all', label: 'All Projects' },
                { filter: 'web', label: 'Websites' },
                { filter: 'app', label: 'Systems & Web Apps' },
                { filter: 'mobile', label: 'Mobile Apps' },
                { filter: 'ai', label: 'AI & ML Models' },
                { filter: 'civil', label: 'Civil Projects' }
              ].map((btn) => (
                <button
                  key={btn.filter}
                  onClick={() => setProjectFilter(btn.filter)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                    projectFilter === btn.filter 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-800 border border-slate-200/80 shadow-sm'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredProjects.map((p, index) => (
                  <motion.div
                    key={p.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between border border-slate-200/50 shadow-md group/project"
                  >
                    
                    {/* Simulated Clean Light Preview Block */}
                    <div className="relative h-48 bg-gradient-to-br from-slate-100 to-indigo-50/40 flex items-center justify-center p-6 overflow-hidden border-b border-slate-200/50">
                      {/* Grid overlay */}
                      <div className="absolute inset-0 bg-grid-cyber opacity-30" />
                      <div className="absolute w-24 h-24 rounded-full bg-indigo-500/5 blur-xl group-hover/project:scale-150 transition-transform duration-500" />
                      
                      {/* Custom Vector Iconography */}
                      <div className="relative z-10 flex flex-col items-center space-y-2">
                        {p.category === 'ai' && (
                          <div className="w-14 h-14 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                            <Cpu className="text-indigo-600" size={24} />
                          </div>
                        )}
                        {p.category === 'web' && (
                          <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                            <Globe className="text-blue-600" size={24} />
                          </div>
                        )}
                        {p.category === 'mobile' && (
                          <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                            <Smartphone className="text-cyan-600" size={24} />
                          </div>
                        )}
                        {p.category === 'app' && (
                          <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <Database className="text-emerald-600" size={24} />
                          </div>
                        )}
                        {p.category === 'civil' && (
                          <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                            <Layers className="text-orange-600" size={24} />
                          </div>
                        )}
                        <span className="text-xs font-mono font-semibold tracking-widest text-slate-500 uppercase">
                          {p.category === 'ai' ? 'ML PIPELINE' : p.category === 'web' ? 'RESPONSIVE WEB' : p.category === 'mobile' ? 'MOBILE OS' : p.category === 'civil' ? 'CIVIL CAD' : 'SYSTEM ARCH'}
                        </span>
                      </div>

                      {/* Accent gradient bar bottom */}
                      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 via-blue-500 to-sky-500" />
                    </div>

                    {/* Description Details */}
                    <div className="p-6 text-left flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold font-display text-slate-900 group-hover/project:text-indigo-600 transition-colors">
                          {p.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="space-y-4 pt-2">
                        {/* Tech pills */}
                        <div className="flex flex-wrap gap-1.5">
                          {p.tech.map((t, idx) => (
                            <span 
                              key={idx} 
                              className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold font-mono tracking-wider bg-slate-100 border border-slate-200/50 text-slate-600 uppercase"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => scrollToSection('contact')}
                          className="flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 group-hover/project:text-indigo-800 transition-colors cursor-pointer"
                        >
                          <span>Request Custom Quote</span>
                          <ArrowRight size={12} className="group-hover/project:translate-x-1 transition-transform" />
                        </button>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section id="why-choose-us" className="py-24 px-6 bg-slate-50/50 border-y border-slate-200/60">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side text headers */}
            <div className="lg:col-span-5 text-left space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                <CheckCircle2 size={12} />
                <span>Our Core Strengths</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
                Why Choose Nexora?
              </h2>
              <div className="w-20 h-[3px] bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" />
              <p className="text-slate-500 text-lg leading-relaxed">
                We combine industry-leading software design, robust cybersecurity, and structural engineering to construct systems that stand out.
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                Start Collaborating
              </button>
            </div>

            {/* Right side list of benefit cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((b, idx) => {
                const IconComponent = b.icon;
                return (
                  <div 
                    key={idx}
                    className={`glass-panel border border-slate-200/50 rounded-2xl p-6 text-left relative overflow-hidden transition-all duration-300 hover:border-indigo-400/50 ${idx === 4 ? 'sm:col-span-2' : ''}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${b.color} bg-opacity-10 flex-shrink-0`}>
                        <IconComponent className="text-white" size={20} />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-lg text-slate-900 font-display">{b.title}</h3>
                        <p className="text-slate-500 text-xs leading-relaxed">{b.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* TEAM SECTION */}
        <section id="team" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="space-y-12 text-center">
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900">
                Meet The Innovators
              </h2>
              <p className="text-slate-500 text-lg">
                A skilled group of software architects, designers, and engineering developers.
              </p>
              <div className="w-20 h-[3px] bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mx-auto" />
            </div>

            {/* Grid of Team Cards */}
            <div className="flex justify-center">
              {team.filter(t => t.name === "Trivin").map((t, idx) => (
                <div 
                  key={idx}
                  className="glass-panel border border-slate-200/50 rounded-2xl p-6 text-left relative overflow-hidden flex flex-col justify-between group/team max-w-md w-full animate-fade-in"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 to-blue-500 opacity-55" />
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-100 to-blue-100 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
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
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover/team:opacity-10 transition-opacity duration-300" />
                      </div>

                      <div>
                        <h3 className="text-xl font-bold font-display text-slate-900 group-hover/team:text-indigo-600 transition-colors">
                          {t.name || "Open Position"}
                        </h3>
                        <p className="text-sm font-semibold text-indigo-600 font-mono">
                          {t.role}
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed pt-2">
                      {t.desc}
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="space-y-3 pt-6 border-t border-slate-100 mt-6">
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">CORE SPECIALTIES:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {t.skills.map((s, i) => (
                        <span 
                          key={i} 
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 border border-slate-200/40 text-slate-600"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Link to view all team members */}
            <div className="pt-6">
              <button
                onClick={() => {
                  setViewingAllTeam(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-indigo-600 bg-indigo-500/5 border border-indigo-500/10 hover:border-indigo-500 hover:bg-indigo-600/10 hover:shadow-md active:scale-95 transition-all duration-300 cursor-pointer group/btn"
              >
                <span>Meet Our Entire Team ({team.length} Members)</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </section>

        {/* CAREERS SECTION */}
        <section id="careers" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-200/50 scroll-mt-20">
          <div className="space-y-12 text-center">
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                <span>Join Our Mission</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900">
                Careers at Nexora
              </h2>
              <p className="text-slate-500 text-lg">
                We are actively looking for talented individuals to join our core distributed team. Explore open slots below.
              </p>
              <div className="w-20 h-[3px] bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mx-auto" />
            </div>

            {/* Careers list of vacancies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {[
                {
                  role: "Frontend Developer (React)",
                  dept: "Engineering",
                  type: "Full-Time / Remote",
                  desc: "Responsible for crafting next-generation, high-performance user journeys using React 19, Tailwind v4, and Framer Motion.",
                  reqs: ["2+ years React experience", "Expertise in CSS/Tailwind animations", "Framer Motion proficiency"]
                },
                {
                  role: "Backend Developer (Node.js)",
                  dept: "Engineering",
                  type: "Full-Time / Remote",
                  desc: "Architects scalable APIs, designs robust MongoDB/MySQL database schemas, and maintains AWS serverless deployments.",
                  reqs: ["Experience with Express/Node", "Database optimization expertise", "CI/CD cloud pipelines familiarity"]
                },
                {
                  role: "AI/ML Engineer (Python)",
                  dept: "Artificial Intelligence",
                  type: "Full-Time / Remote",
                  desc: "Develops, tests, and deploys intelligent model backends, computer vision checks, NLP chains, and vector searches.",
                  reqs: ["Python, PyTorch, or TensorFlow", "Experience with LLM fine-tuning/RAG", "FastAPI web server deployment"]
                },
                {
                  role: "UI/UX Designer",
                  dept: "Design & Creative",
                  type: "Contract / Remote",
                  desc: "Designs high-fidelity prototypes, user journeys, visual brand elements, and premium dark/light interfaces.",
                  reqs: ["Figma design files mastery", "Strong portfolio of modern SaaS UIs", "Understanding of responsive grid layout"]
                }
              ].map((job, idx) => (
                <div 
                  key={idx}
                  className="glass-panel border border-slate-200/50 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[340px] group/job"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-indigo-600 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md">
                          {job.dept}
                        </span>
                        <h3 className="text-xl font-bold font-display text-slate-900 mt-2 group-hover/job:text-indigo-600 transition-colors">
                          {job.role}
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        {job.type}
                      </span>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed">
                      {job.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.reqs.map((req, i) => (
                        <span key={i} className="text-[10px] text-slate-600 bg-slate-100 border border-slate-200/30 px-2 py-0.5 rounded-full">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        requirement: "Careers / Job Application",
                        message: `Hi Nexora Team,\n\nI am writing to apply for the ${job.role} position. Here are my details...`
                      }));
                      scrollToSection('contact');
                    }}
                    className="w-full py-2.5 mt-4 rounded-xl border border-indigo-500/20 hover:border-indigo-500 bg-indigo-500/5 hover:bg-indigo-600/10 text-xs font-semibold text-indigo-600 transition-all duration-300 text-center flex items-center justify-center space-x-1.5 group-hover/job:bg-indigo-500/10 cursor-pointer"
                  >
                    <span>Apply For This Role</span>
                    <ArrowRight size={12} className="group-hover/job:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* TESTIMONIALS CAROUSEL */}
        <section id="testimonials" className="py-24 px-6 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent relative border-t border-slate-200/50">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            
            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900">
                Client Testimonials
              </h2>
              <p className="text-slate-500 text-lg">
                What clients and academic partners say about our software solutions and project execution.
              </p>
              <div className="w-20 h-[3px] bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mx-auto" />
            </div>

            {/* Testimonial Active Display Card with Fade Animation */}
            <div className="relative min-h-[300px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.3 }}
                  className="glass-panel border border-slate-200/60 rounded-2xl p-8 sm:p-12 relative text-left shadow-md bg-white/90"
                >
                  <MessageSquare className="text-indigo-500/5 absolute top-6 left-6" size={80} />
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex space-x-1">
                      {Array.from({ length: testimonials[testimonialIndex].rating }).map((_, i) => (
                        <span key={i} className="text-amber-400 text-xl">★</span>
                      ))}
                    </div>

                    <p className="text-slate-800 text-lg sm:text-xl italic leading-relaxed">
                      "{testimonials[testimonialIndex].text}"
                    </p>

                    <div>
                      <h4 className="text-slate-900 font-bold font-display text-lg">
                        {testimonials[testimonialIndex].author}
                      </h4>
                      <p className="text-slate-500 text-xs sm:text-sm font-mono mt-0.5">
                        {testimonials[testimonialIndex].position}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center space-x-4 pt-4">
              <button
                onClick={() => setTestimonialIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-12 h-12 rounded-full border border-slate-200/80 hover:border-indigo-500 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex space-x-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTestimonialIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      testimonialIndex === idx ? 'bg-indigo-600 w-6' : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setTestimonialIndex(prev => (prev + 1) % testimonials.length)}
                className="w-12 h-12 rounded-full border border-slate-200/80 hover:border-indigo-500 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-700 transition-all duration-300 shadow-sm cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>

          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-20 border-t border-slate-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column Information */}
            <div className="lg:col-span-5 text-left space-y-8">
              <div className="space-y-4">
                <a 
                  href="mailto:contactnexoratechs@gmail.com" 
                  className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-600 text-[10px] font-semibold uppercase tracking-wider hover:bg-indigo-500/10 transition-colors cursor-pointer"
                >
                  <Mail size={12} />
                  <span>Get In Touch</span>
                </a>
                <h2 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
                  Start Your Project
                </h2>
                <div className="w-20 h-[3px] bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" />
                <p className="text-slate-500 leading-relaxed text-base">
                  Ready to build a premium website, custom database clearance software, or deploy AI pipelines? Tell us your specifications and we'll reply with a full development proposal.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email Us", val: "nexoratechnologies26@gmail.com", href: "mailto:nexoratechnologies26@gmail.com" },
                  { icon: Mail, label: "Alternate Email", val: "contactnexoratechs@gmail.com", href: "mailto:contactnexoratechs@gmail.com" },
                  { icon: Phone, label: "Call Us", val: "+91 XXXXXXXXXX", href: "tel:+919876543210" },
                  { icon: MapPin, label: "Our Headquarters", val: "Chennai, Tamil Nadu, India", href: "#" }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <a 
                      key={idx} 
                      href={item.href} 
                      className="flex items-center space-x-4 group/contact-item cursor-default"
                    >
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 group-hover/contact-item:bg-indigo-500/20 transition-all duration-300">
                        <Icon size={20} />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">{item.label}</p>
                        <p className="text-slate-800 group-hover/contact-item:text-indigo-600 transition-colors text-xs font-semibold">{item.val}</p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* coordinates Grid instead of iframe map */}
              <div className="glass-panel border border-slate-200/60 rounded-2xl p-6 h-40 relative overflow-hidden flex flex-col justify-between bg-white/70">
                <div className="absolute inset-0 bg-grid-cyber opacity-15" />
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">SERVER GATEWAY</p>
                    <p className="text-sm font-semibold text-slate-900 font-display">CHENN_GATEWAY_NODE_1</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-600 font-semibold">ONLINE</span>
                  </div>
                </div>
                <div className="relative z-10 text-[10px] font-mono text-slate-500 space-y-1">
                  <p>LATITUDE: 13.0827° N</p>
                  <p>LONGITUDE: 80.2707° E</p>
                  <p>STATION ID: IN-MAA-044</p>
                </div>
                <div className="absolute right-6 bottom-4 w-12 h-12 rounded-full bg-blue-500/5 border border-blue-500/10 flex items-center justify-center animate-ping pointer-events-none" style={{ animationDuration: '4s' }} />
              </div>
            </div>

            {/* Right Column Form */}
            <div className="lg:col-span-7">
              <div className="glass-panel border border-slate-200/80 rounded-2xl p-8 sm:p-10 relative overflow-hidden bg-white/80 shadow-md">
                
                {/* Accent line top */}
                <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-indigo-500 to-blue-500" />
                
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form 
                      key="contact-form"
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2 text-left">
                          <label htmlFor="form-name" className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono">Full Name</label>
                          <input 
                            type="text" 
                            id="form-name" 
                            name="name" 
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            placeholder="Alex Mercer"
                            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all duration-300"
                          />
                        </div>

                        {/* Email */}
                        <div className="space-y-2 text-left">
                          <label htmlFor="form-email" className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono">Email Address</label>
                          <input 
                            type="email" 
                            id="form-email" 
                            name="email" 
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="alex@company.com"
                            className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Requirement dropdown */}
                      <div className="space-y-2 text-left">
                        <label htmlFor="form-requirement" className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono">Project Requirement</label>
                        <select 
                          id="form-requirement"
                          name="requirement"
                          value={formData.requirement}
                          onChange={handleInputChange}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 cursor-pointer"
                        >
                          <option value="Portfolio Websites">Portfolio Websites</option>
                          <option value="Web Development">Web Development</option>
                          <option value="Mobile App Development">Mobile App Development</option>
                          <option value="AI & Machine Learning Solutions">AI & Machine Learning Solutions</option>
                          <option value="UI/UX Design">UI/UX Design</option>
                          <option value="Database Management">Database Management</option>
                          <option value="Cloud Deployment">Cloud Deployment</option>
                          <option value="Civil Engineering Projects">Civil Engineering Projects</option>
                          <option value="College Mini & Major Projects">College Mini & Major Projects</option>
                          <option value="Research Paper Support">Research Paper Support</option>
                          <option value="Careers / Job Application">Careers / Job Application</option>
                        </select>
                      </div>

                      {/* Message */}
                      <div className="space-y-2 text-left">
                        <label htmlFor="form-message" className="text-xs font-semibold tracking-wider text-slate-400 uppercase font-mono">Message</label>
                        <textarea 
                          id="form-message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          placeholder="Tell us about your project logic, cad plans, and goals..."
                          className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all duration-300"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <Send size={16} />
                        <span>Submit Requirements</span>
                      </button>

                    </motion.form>
                  ) : (
                    <motion.div 
                      key="form-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="py-16 text-center space-y-6"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-600">
                        <CheckCircle2 size={36} className="animate-bounce" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-display font-bold text-2xl text-slate-900">Transmission Successful</h3>
                        <p className="text-slate-600 max-w-sm mx-auto text-sm">
                          Thank you, <span className="text-indigo-600 font-semibold">{formData.name}</span>. We've received your inquiry for <span className="text-blue-600 font-semibold">{formData.requirement}</span>. A team member will contact you shortly.
                        </p>
                      </div>
                      <div className="text-xs font-mono text-slate-400">
                        TRANSMIT_CODE: 200_OK_NEXORA_SECURE
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 bg-slate-900 border-t border-slate-800 pt-16 pb-8 px-6 text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Logo Brand */}
          <div className="md:col-span-4 space-y-4">
            <a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} 
              className="flex items-center space-x-3 group w-max"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden shadow-md flex items-center justify-center bg-white/50 border border-slate-700">
                <img src={logo} alt="Nexora Logo" className="w-full h-full object-contain p-1" />
              </div>
              <span className="font-display font-bold text-lg tracking-wider text-white">
                NEXORA
              </span>
            </a>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              We design and construct premium web platforms, secure serverless systems, responsive UI interfaces, and civil structural design schemes.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
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
                    className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/10 transition-all duration-300"
                    aria-label={soc.label}
                  >
                    <SocIcon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">Sitemap Navigation</h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'home', label: 'Home Gateway' },
                { id: 'about', label: 'About Tech' },
                { id: 'services', label: 'Services Catalog' },
                { id: 'projects', label: 'Showcase Hub' },
                { id: 'careers', label: 'Careers Portal' }
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

          {/* Portals */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase font-sans">Our Portals</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://dpr-nexora.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1 font-sans"
                >
                  <span>DPR Portal</span>
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              </li>
              <li>
                <a 
                  href="https://nexora-s-internship-portal-xi.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1 font-sans"
                >
                  <span>Internship Portal</span>
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-mono font-bold tracking-widest text-slate-300 uppercase">Technologies Utilized</h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {["React 19", "Vite 8", "Tailwind v4", "Framer Motion", "Lucide React", "AutoCAD", "STAAD Pro", "Node.js", "MongoDB", "TensorFlow"].map((tech) => (
                <span key={tech} className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Nexora Technologies. All rights reserved. "Building Tomorrow, Today."</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Chennai Node Hub</a>
          </div>
        </div>

      </footer>

      {/* Dedicated Team Sub-Page Overlay */}
      <AnimatePresence>
        {viewingAllTeam && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="fixed inset-0 z-[100] bg-slate-50/98 backdrop-blur-xl overflow-y-auto min-h-screen text-slate-700 selection:bg-indigo-500/10 selection:text-indigo-600 font-sans pb-16"
          >
            {/* Background glowing blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-radial-gradient-glow pointer-events-none opacity-50 z-0" />
            <div className="absolute top-[30%] right-[-10%] w-[55%] h-[55%] bg-radial-gradient-glow pointer-events-none opacity-50 z-0" />

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 space-y-12">
              
              {/* Back button & Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-slate-200/50 pb-8 text-left">
                <div className="space-y-4">
                  <button
                    onClick={() => {
                      setViewingAllTeam(false);
                      // Scroll back to team section
                      setTimeout(() => {
                        const el = document.getElementById('team');
                        if (el) {
                          const headerOffset = 80;
                          const elementPosition = el.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }, 100);
                    }}
                    className="inline-flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors group cursor-pointer"
                  >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Home</span>
                  </button>
                  <h1 className="text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
                    Meet the Innovators
                  </h1>
                  <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
                    Our growing team of top-tier software architects, cloud engineers, AI experts, and design virtuosos dedicated to crafting pixel-perfect digital solutions.
                  </p>
                </div>
                
                {/* Visual badge */}
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl border border-indigo-500/20 bg-indigo-500/5 text-indigo-600 text-xs font-mono font-bold tracking-wider uppercase h-max w-max">
                  <Sparkles size={12} className="animate-spin-slow" />
                  <span>{team.length} Active Members</span>
                </div>
              </div>

              {/* Grid of All Team Members */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {team.map((t, idx) => (
                  <div 
                    key={idx}
                    className="glass-panel border border-slate-200/50 rounded-2xl p-6 text-left relative overflow-hidden flex flex-col justify-between group/team transition-all duration-300 hover:border-indigo-400/50 hover:shadow-lg hover:shadow-indigo-500/5 bg-white/85"
                  >
                    {/* Top gradient accent line */}
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 to-blue-500 opacity-55" />
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-100 to-blue-100 border border-slate-200 flex items-center justify-center overflow-hidden flex-shrink-0">
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
                          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 group-hover/team:opacity-10 transition-opacity duration-300" />
                        </div>

                        <div>
                          <h3 className="text-xl font-bold font-display text-slate-900 group-hover/team:text-indigo-600 transition-colors">
                            {t.name || "Open Position"}
                          </h3>
                          <p className="text-sm font-semibold text-indigo-600 font-mono">
                            {t.role}
                          </p>
                        </div>
                      </div>

                      <p className="text-slate-500 text-sm leading-relaxed pt-2">
                        {t.desc}
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="space-y-3 pt-6 border-t border-slate-100 mt-6">
                      <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">CORE SPECIALTIES:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {t.skills.map((s, i) => (
                          <span 
                            key={i} 
                            className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 border border-slate-200/40 text-slate-600"
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
              <div className="glass-panel border border-slate-200/50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden bg-gradient-to-br from-indigo-500/5 via-blue-500/5 to-transparent bg-white/50">
                <div className="max-w-xl mx-auto space-y-6">
                  <h3 className="text-2xl font-bold font-display text-slate-950">Want to join our mission?</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    We are always looking for exceptional software architects, design virtuosos, and cybersecurity specialists to join our distributed global network.
                  </p>
                  <button
                    onClick={() => {
                      setViewingAllTeam(false);
                      // Scroll to careers section
                      setTimeout(() => {
                        const el = document.getElementById('careers');
                        if (el) {
                          const headerOffset = 80;
                          const elementPosition = el.getBoundingClientRect().top;
                          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                          });
                        }
                      }, 100);
                    }}
                    className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                  >
                    View Open Positions
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
    </>
  );
}

export default App;

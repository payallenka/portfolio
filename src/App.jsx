import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Award,
  User,
  ArrowUpRight,
  Cpu
} from 'lucide-react';

// Custom hook for scroll-reveal animations
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return [domRef, isVisible];
};

// Enhanced RevealSection with Staggered Delays
const RevealSection = ({ children, className = '', delay = 0, id }) => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      id={id}
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${className} transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

const App = () => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyEmail = () => {
    const el = document.createElement('textarea');
    el.value = 'payalm.lenka@gmail.com';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const education = {
    college: 'RNS Institute of Technology, Bangalore',
    grad: 'Expected Graduation: 2026',
    degree: 'Bachelor of Engineering (B.E.) in Computer Science and Engineering (CSE)',
    cgpa: 'CGPA: 8.2 / 10',
    entrance: 'Entrance Qualification: COMEDK Rank – 5448',
  };

  const experience = [
    {
      company: 'Codifinary Technologies (Product: Codexray)',
      url: 'https://www.codexray.io/',
      title: 'SDE Intern',
      period: 'Nov 2025 -- Present',
      stack: 'React, TypeScript, Zustand, TanStack Query, Go, ClickHouse, Prometheus',
      location: 'Bangalore',
      bullets: [
        'Built and shipped frontend features for Codexray, a full-stack observability platform, owning database dashboards, telemetry-heavy screens, and production bug fixes.',
        'Improved dashboard responsiveness by implementing debouncing, infinite scrolling, skeleton loaders, and optimized API orchestration, enabling smooth rendering of large observability datasets.',
        'Optimized Go-based query services and ClickHouse retrieval pipelines to process 100K+ telemetry records with millisecond latency, significantly reducing dashboard load times.',
        'Designed frontend data-fetching architecture using TanStack Query, Zustand, and custom hooks, improving caching, pagination, and real-time UI consistency.',
        'Validated end-to-end telemetry ingestion workflows across DB agents, collector services, and query services, ensuring accurate frontend observability data flows.',
        'Owned deployment sanity, release validation, and QA bug resolution, improving frontend stability and reducing regressions in production releases.',
      ],
    },
    {
      company: 'Elite Scholars International',
      url: 'https://www.elitescholarsinter.com/',
      title: 'Freelance Full-Stack Engineer',
      period: 'Oct 2025 -- Nov 2025',
      stack: 'React, TypeScript, Node.js, AI APIs, PostgreSQL, Role-Based Access',
      location: 'Remote',
      bullets: [
        'Built and deployed an AI-powered student counseling platform serving 29 active users, with dedicated student and admin dashboards.',
        'Shipped the live production platform at elitescholarsinter.com, supporting student counseling, university recommendations, and admin workflows.',
        'Developed AI-driven profile evaluation and top-10 university recommendation workflows, helping students discover best-fit academic opportunities.',
        'Engineered secure role-based document workflows with selective visibility, enabling admins to upload user-specific private documents.',
        'Built course CRUD, admin messaging, and application progress tracking dashboards, improving counselor workflow visibility.',
        'Defined the Phase-2 roadmap for future feature expansion, automation, and user growth.',
      ],
    },
    {
      company: 'Laxsis Technologies (Product: Unified)',
      url: 'https://www.laxsistechnologies.com/',
      title: 'Backend Engineering Intern',
      period: 'May 2025 -- Oct 2025',
      stack: 'Java, Spring Boot, AWS, Docker, gRPC, PostgreSQL, Microservices',
      location: 'Remote',
      bullets: [
        'Containerized and deployed Spring Boot microservices using Docker, improving portability across staging and production environments.',
        'Designed AWS Lambda + SNS/SQS event-driven pipelines for real-time notification workflows, reducing latency and improving asynchronous reliability.',
        'Delivered secure authentication and calendar synchronization by integrating WorkMail and Cognito, improving platform trust and adoption.',
        'Built gRPC-based inter-service communication with secure S3-backed CRUD workflows, enabling seamless cross-service data sharing.',
        'Automated IAM-based authorization workflows to strengthen compliance and reduce manual operational overhead.',
        'Improved CI/CD reliability through API documentation, deployment validation, and rollout issue prevention.',
      ],
    },
  ];

  const projects = [
    {
      title: 'AgentHub',
      url: 'https://github.com/payallenka/AgentHub',
      stack: 'React, Node.js, Express, Yjs, WebSockets, IndexedDB, Groq API',
      bullets: [
        'Built a real-time collaborative AI dashboard enabling multi-user task and conversation management with offline-first support.',
        'Implemented CRDT-based synchronization using Yjs and y-websocket, ensuring conflict-free real-time collaboration across devices.',
        'Integrated IndexedDB persistence for offline work, automatically merging local changes after reconnection.',
        'Engineered a secure Node.js + Express backend to serve the React frontend, manage WebSocket upgrades, and proxy Groq AI model API calls.',
      ],
    },
    {
      title: 'interceptor-engine (npm package)',
      url: 'https://www.npmjs.com/package/interceptor-engine',
      stack: 'Node.js, JavaScript, Fetch API, Event Emitters, Observability',
      bullets: [
        'Built and published an npm package for real-time API observability, patching global fetch to capture live request metrics.',
        'Implemented latency aggregation, event-driven monitoring, prompt redaction, and terminal reporting for AI and Gemini-based applications.',
        'Designed developer-friendly APIs for metrics, call history, and error tracking, improving debugging workflows in production systems.',
      ],
    },
    {
      title: 'Explain Code Simply -- VS Code Extension',
      url: 'https://marketplace.visualstudio.com/items?itemName=payallenka.explain-code-simply',
      stack: 'TypeScript, VS Code API, Node.js, AI APIs',
      bullets: [
        'Built and published a VS Code extension with active users, enabling AI-powered code explanations directly inside the editor.',
        'Designed configurable backend integrations and explanation styles, improving developer productivity and learning workflows.',
        'Optimized request handling and extension performance for low-latency code explanation responses.',
      ],
    },
  ];

  const skills = [
    { label: 'Languages', value: 'Java, Go, TypeScript, JavaScript, Python, C++, SQL' },
    { label: 'Backend & Frameworks', value: 'Spring Boot, Node.js, Express, NestJS, Flask, Django, REST APIs, gRPC, Microservices' },
    { label: 'Frontend', value: 'React, Next.js, TypeScript, Zustand, TanStack Query, Custom Hooks, shadcn/ui' },
    { label: 'Databases & Storage', value: 'PostgreSQL, MySQL, MongoDB, ClickHouse, Supabase, IndexedDB' },
    { label: 'Cloud & DevOps', value: 'AWS (Lambda, SNS, SQS, RDS, DynamoDB, IAM, S3), Docker, CI/CD, GCP APIs' },
    { label: 'Observability & Realtime', value: 'Prometheus, WebSockets, Yjs, CRDTs, Event Emitters, API Monitoring' },
    { label: 'AI & Developer Tools', value: 'LangChain, LangGraph, VS Code API, npm Package Development, Groq API, Gemini APIs' },
    { label: 'Core Concepts', value: 'Data Structures & Algorithms, System Design, Low-Latency Systems, Caching, Pagination, JWT' },
  ];

  const summary = `Final-year Computer Science student with 2 product startup internships across backend, observability, and full-stack engineering. Experienced in building low-latency distributed systems, developer tools, and AI-powered products using Java, Go, React, TypeScript, ClickHouse, Prometheus, and AWS, with hands-on experience shipping production features and optimizing large-scale telemetry pipelines.`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-300 selection:bg-emerald-500/20 selection:text-emerald-400 overflow-x-hidden relative">
      {/* Ambient Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px] transition-all duration-[2000ms] ease-out ${
            mounted ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
          }`}
        ></div>
        <div
          className={`absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[150px] transition-all duration-[2500ms] delay-500 ease-out ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        ></div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 px-6 py-6 transition-all duration-500 ${
          mounted ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        } ${scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-stone-900 py-4' : 'bg-transparent'}`}
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div
            onClick={e => scrollToSection(e, 'top')}
            className="font-medium text-white tracking-tighter text-lg hover:text-emerald-500 transition-colors cursor-pointer"
          >
            payal<span className="text-emerald-500">.</span>lenka
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 text-xs font-medium uppercase tracking-[0.2em]">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-white transition-colors">About</a>
            <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className="hover:text-white transition-colors">Skills</a>
            <a href="#education" onClick={(e) => scrollToSection(e, 'education')} className="hover:text-white transition-colors">Education</a>
            <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="hover:text-white transition-colors">Experience</a>
            <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-white transition-colors">Projects</a>
            <a href="#achievements" onClick={(e) => scrollToSection(e, 'achievements')} className="hover:text-white transition-colors">Achievements</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-emerald-500 hover:text-emerald-400 transition-all active:scale-95">Contact</a>
          </div>
          {/* Hamburger Icon for Mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
            aria-label="Open navigation menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${navOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ${navOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${navOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
        {/* Mobile Nav Overlay */}
        {navOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setNavOpen(false)}
              aria-label="Close navigation overlay"
            ></div>
            {/* Side Drawer */}
            <div
              className={`fixed top-0 left-0 z-50 h-full w-4/5 max-w-xs bg-[#0a0a0a] shadow-2xl flex flex-col pt-12 px-8 space-y-8 text-lg font-semibold uppercase tracking-widest text-white md:hidden transition-transform duration-300 ${navOpen ? 'translate-x-0' : '-translate-x-full'}`}
              style={{ minHeight: '100vh' }}
            >
              <button
                onClick={() => setNavOpen(false)}
                className="absolute top-6 right-6 text-2xl text-stone-400 hover:text-emerald-400 focus:outline-none"
                aria-label="Close menu"
              >
                ×
              </button>
              <a href="#about" onClick={e => { scrollToSection(e, 'about'); setNavOpen(false); }} className="hover:text-emerald-400">About</a>
              <a href="#skills" onClick={e => { scrollToSection(e, 'skills'); setNavOpen(false); }} className="hover:text-emerald-400">Skills</a>
              <a href="#education" onClick={e => { scrollToSection(e, 'education'); setNavOpen(false); }} className="hover:text-emerald-400">Education</a>
              <a href="#experience" onClick={e => { scrollToSection(e, 'experience'); setNavOpen(false); }} className="hover:text-emerald-400">Experience</a>
              <a href="#projects" onClick={e => { scrollToSection(e, 'projects'); setNavOpen(false); }} className="hover:text-emerald-400">Projects</a>
              <a href="#achievements" onClick={e => { scrollToSection(e, 'achievements'); setNavOpen(false); }} className="hover:text-emerald-400">Achievements</a>
              <a href="#contact" onClick={e => { scrollToSection(e, 'contact'); setNavOpen(false); }} className="text-emerald-500 hover:text-emerald-400">Contact</a>
            </div>
          </>
        )}
      </nav>

      <main id="top" className="max-w-6xl mx-auto px-6 pt-48 pb-32 relative z-10">
        {/* Editorial Hero */}
        <section className="mb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h1
                className={`text-6xl md:text-8xl font-light text-white leading-[1.1] tracking-tight mb-12 transition-all duration-1000 delay-100 ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                Engineer<span className="text-emerald-500 font-serif italic">ing</span> systems <br />
                for the <span className="opacity-50">next</span> scale.
              </h1>

              <div
                className={`flex flex-col md:flex-row md:items-end gap-12 transition-all duration-1000 delay-300 ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <p className="text-xl md:text-2xl text-stone-400 font-light leading-relaxed max-w-lg hover:text-stone-300 transition-colors duration-500">
                  Final-year CS student & Software Engineer focused on <span className="text-white">observability</span> and{' '}
                  <span className="text-white">backend architecture</span>. Currently building at Codexray.
                </p>
                <div className="flex items-center space-x-4 pb-2">
                  <a
                    href="https://linkedin.com/in/payallenka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border border-stone-800 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all duration-300 hover:-translate-y-1 active:scale-90"
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href="https://github.com/payallenka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border border-stone-800 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all duration-300 hover:-translate-y-1 active:scale-90"
                  >
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Profile Image Column */}
            <div
              className={`lg:col-span-5 relative transition-all duration-[1200ms] delay-500 ease-out ${
                mounted ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
            >
              <div className="relative group cursor-default">
                <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"></div>
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-stone-800 bg-stone-900 shadow-2xl transition-transform duration-700 group-hover:-translate-y-2 group-hover:shadow-emerald-500/10">
                  <img
                    src="image_25e08e.jpg"
                    alt="Payal Lenka"
                    className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100"
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/40 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold mb-1">Current Role</div>
                        <div className="text-white font-medium text-sm">SDE Intern @ Codexray</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-1">Status</div>
                        <div className="text-white font-medium text-sm">8th Sem Undergrad</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-stone-900 border border-stone-800 rounded-2xl flex flex-col items-center justify-center p-4 shadow-xl backdrop-blur-xl group-hover:border-emerald-500/50 transition-all duration-500 group-hover:-translate-y-4 group-hover:rotate-3">
                  <Award className="text-emerald-500 mb-1" size={24} />
                  <span className="text-[8px] uppercase tracking-widest text-stone-500 font-bold text-center leading-tight tracking-tighter">
                    Google
                    <br />
                    Mentee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <RevealSection id="about" className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-stone-900 pt-20">
          <div className="lg:col-span-4 text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold">/ Summary</div>
          <div className="lg:col-span-8">
            <h2 className="text-3xl text-white font-light mb-8 italic">About Me</h2>
            <p className="text-stone-400 leading-relaxed font-light text-lg">{summary}</p>
          </div>
        </RevealSection>

        {/* Skills */}
        <RevealSection id="skills" className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-stone-900 pt-20">
          <div className="lg:col-span-4 text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold">/ Technical Skills</div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((s, i) => (
              <div key={i} className="mb-2">
                <span className="font-semibold text-emerald-400">{s.label}:</span>{' '}
                <span className="text-stone-300">{s.value}</span>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* Education */}
        <RevealSection id="education" className="mb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-stone-900 pt-20">
          <div className="lg:col-span-4 text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold">/ Education</div>
          <div className="lg:col-span-8">
            <div className="mb-2 text-white font-semibold text-lg">
              {education.college} <span className="text-stone-400 font-normal">({education.grad})</span>
            </div>
            <div className="mb-1 text-stone-300">{education.degree}</div>
            <div className="mb-1 text-stone-400">{education.cgpa}</div>
            <div className="mb-1 text-stone-400">{education.entrance}</div>
          </div>
        </RevealSection>

        {/* Work Gallery */}
        <section className="mb-48">
          <RevealSection id="experience" className="flex items-center justify-between mb-20">
            <h2 className="text-4xl font-light text-white tracking-tight">Professional Experience</h2>
          </RevealSection>

          <div className="space-y-32">
            {experience.map((exp, idx) => (
              <RevealSection key={idx} delay={idx * 150} className="group relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4">
                    <div className="text-emerald-500 font-mono text-xs mb-2">{exp.period}</div>
                    <a
                      href={exp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-semibold text-lg hover:text-emerald-400 transition-colors flex items-center space-x-2 mb-2"
                    >
                      <span>{exp.company}</span>
                      <ExternalLink size={16} className="inline-block text-emerald-400" />
                    </a>
                    <div className="text-stone-500 italic mb-2">{exp.title}</div>
                    <div className="text-xs text-stone-400 font-mono mb-2">{exp.stack}</div>
                    <div className="text-xs text-stone-500 mb-2">{exp.location}</div>
                  </div>
                  <div className="lg:col-span-7 lg:col-start-6">
                    <ul className="list-disc ml-6 text-stone-300 space-y-2">
                      {exp.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="absolute -bottom-16 w-full h-[1px] bg-stone-900 group-hover:bg-emerald-500/30 transition-colors duration-1000"></div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-48">
          <RevealSection id="projects" className="flex items-center justify-between mb-20">
            <h2 className="text-4xl font-light text-white tracking-tight">Technical Projects</h2>
          </RevealSection>

          <div className="space-y-32">
            {projects.map((proj, idx) => (
              <RevealSection key={idx} delay={idx * 200} className="group relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-4">
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-semibold text-lg hover:text-emerald-400 transition-colors flex items-center space-x-2 mb-2"
                    >
                      <span>{proj.title}</span>
                      <ExternalLink size={16} className="inline-block text-emerald-400" />
                    </a>
                    <div className="text-xs text-stone-400 font-mono mb-2">{proj.stack}</div>
                  </div>
                  <div className="lg:col-span-7 lg:col-start-6">
                    <ul className="list-disc ml-6 text-stone-300 space-y-2">
                      {proj.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="absolute -bottom-16 w-full h-[1px] bg-stone-900 group-hover:bg-emerald-500/30 transition-colors duration-1000"></div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* Spotlight / Achievements */}
        <section className="mb-48 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <RevealSection
            id="achievements"
            delay={0}
            className="p-12 bg-white/[0.02] border border-stone-900 rounded-[2.5rem] hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] transition-all duration-700 group hover:-translate-y-2"
          >
            <Award className="text-emerald-500 mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500" size={32} />
            <h3 className="text-2xl text-white font-light mb-4 tracking-tight italic">Google Student Launchpad</h3>
            <p className="text-stone-400 leading-relaxed mb-6 font-light">
              Selected for Google’s invite-only mentorship program, receiving guidance from Google engineers on DSA, problem solving, and interview preparation.
            </p>
          </RevealSection>

          <RevealSection
            delay={200}
            className="p-12 bg-white/[0.02] border border-stone-900 rounded-[2.5rem] hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] transition-all duration-700 group hover:-translate-y-2"
          >
            <Cpu className="text-emerald-500 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" size={32} />
            <h3 className="text-2xl text-white font-light mb-4 tracking-tight italic">URF Research Project — Knee Health Analyzer</h3>
            <p className="text-stone-400 leading-relaxed mb-6 font-light">
              Secured <span className="font-semibold">₹25K research funding</span> and contributed to a <span className="font-semibold">patent-filed AI diagnostic solution</span> for knee health assessment.
            </p>
          </RevealSection>

          <RevealSection
            delay={400}
            className="p-12 bg-white/[0.02] border border-stone-900 rounded-[2.5rem] hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] transition-all duration-700 group hover:-translate-y-2"
          >
            <Award className="text-emerald-500 mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500" size={32} />
            <h3 className="text-2xl text-white font-light mb-4 tracking-tight italic">Vend-O-Print Startup</h3>
            <p className="text-stone-400 leading-relaxed mb-6 font-light">
              Core contributor to a college-backed startup, <span className="font-semibold">ranked Top 27 in Manthan'24</span>, where the solution progressed to a <span className="font-semibold">college-held patent filing</span>.
            </p>
          </RevealSection>

          <RevealSection
            delay={600}
            className="p-12 bg-white/[0.02] border border-stone-900 rounded-[2.5rem] hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] transition-all duration-700 group hover:-translate-y-2"
          >
            <User className="text-emerald-500 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" size={32} />
            <h3 className="text-2xl text-white font-light mb-4 tracking-tight italic">Leadership</h3>
            <p className="text-stone-400 leading-relaxed mb-6 font-light">
              Served as <span className="font-semibold">Ex-GDSC Lead and RNSIT CTSoc IEEE Chair</span>, leading <span className="font-semibold">40+ members</span> and organizing <span className="font-semibold">10+ technical workshops and community events</span>.
            </p>
          </RevealSection>

          <RevealSection
            delay={800}
            className="p-12 bg-white/[0.02] border border-stone-900 rounded-[2.5rem] hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] transition-all duration-700 group hover:-translate-y-2"
          >
            <Cpu className="text-emerald-500 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500" size={32} />
            <h3 className="text-2xl text-white font-light mb-4 tracking-tight italic">Problem Solving</h3>
            <p className="text-stone-400 leading-relaxed mb-6 font-light">
              Solved <span className="font-semibold">250+ LeetCode problems</span>, achieved <span className="font-semibold">3 star on CodeChef</span>, and secured <span className="font-semibold">1st place in a college coding contest (2024)</span> by solving a <span className="font-semibold">story-based dynamic programming problem</span>.
            </p>
          </RevealSection>
        </section>

        {/* Contact CTA */}
        <RevealSection id="contact" className="text-center py-32 border-t border-stone-900">
          <div className="text-[10px] uppercase tracking-[0.4em] text-stone-600 font-bold mb-8">Get In Touch</div>
          <h2 className="text-5xl md:text-7xl text-white font-light tracking-tight mb-12 italic leading-tight">
            Ready for <span className="text-emerald-500 underline underline-offset-[12px] decoration-1 hover:decoration-4">day one</span> <br /> impact.
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <button
              onClick={copyEmail}
              className="group px-12 py-5 bg-white text-black font-medium rounded-full hover:bg-emerald-500 transition-all duration-500 active:scale-95 flex items-center space-x-3 overflow-hidden shadow-[0_0_0_0_rgba(16,185,129,0)] hover:shadow-[0_0_30px_0_rgba(16,185,129,0.3)]"
            >
              <span>{copied ? 'Email Copied' : 'payalm.lenka@gmail.com'}</span>
              {!copied && <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
            </button>
            <a
              href="https://linkedin.com/in/payallenka"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium hover:text-emerald-500 transition-all flex items-center space-x-2 group"
            >
              <span>LinkedIn Profile</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a
              href="https://github.com/payallenka"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-medium hover:text-emerald-500 transition-all flex items-center space-x-2 group"
            >
              <span>GitHub</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
          <div className="mt-8 text-stone-400 text-sm flex flex-col items-center gap-2">
            <span>
              <Mail className="inline-block mr-1 text-emerald-400" size={16} /> payalm.lenka@gmail.com
            </span>
            <span>
              <User className="inline-block mr-1 text-emerald-400" size={16} /> +91-9326464064
            </span>
          </div>
        </RevealSection>
      </main>

      <footer className="px-6 py-12 border-t border-stone-900 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-stone-600 font-bold">
          <div className="hover:text-stone-400 transition-colors cursor-default">Payal Lenka © 2026</div>
          <div className="mt-4 md:mt-0 flex space-x-8">
            <a href="https://github.com/payallenka" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">
              Github
            </a>
            <a
              href="https://linkedin.com/in/payallenka"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-500 transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-stone-800">8th Sem Undergraduate</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
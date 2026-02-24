import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, X, Github, ExternalLink, Download, Globe, Database, Zap, Linkedin, Mail, Terminal, Code2, Cpu, Layout, Server, ShieldCheck, Award, MessageSquare, Phone, MapPin } from 'lucide-react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState<any>(null);
  const [messages, setMessages] = useState([{ text: "Hello! I'm Nitin's AI assistant. How can I help you explore his work today?", isUser: false }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const scrollToProjects = () => {
    setActiveSkill(null);
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const MY_GITHUB = "https://github.com/nitinpathak2674"; 
  const MY_LINKEDIN = "https://www.linkedin.com/in/nitin2674/"; 

  const skillDetails: any = {
    "Frontend": { title: "Frontend Development", skills: "HTML, CSS, JavaScript, Tailwind, React.js", impact: "30% performance boost", desc: "Developed a responsive UI with dynamic product filtering and cross-browser compatibility using React.js.", github: MY_GITHUB },
    "Backend & DB": { title: "Backend & Database", skills: "Node.js, Express.js, MySQL, MongoDB", impact: "50% reduction in manual tracking", desc: "Engineered secure RESTful APIs with JWT authentication and efficient database management.", github: MY_GITHUB },
    "Programming": { title: "Programming & DSA", skills: "DSA, C++, Python, JavaScript Logic", impact: "Advanced Problem Solver", desc: "Strong foundation in Data Structures and Algorithms with high-level logic implementation.", github: MY_GITHUB },
    "APIs & Concepts": { title: "System Architecture & APIs", skills: "REST APIs, JWT Auth, OOPs, Security", impact: "JWT Auth Specialist", desc: "Expertise in secure authentication flows and scalable system design principles.", link: "/mern-cert.pdf", buttonText: "View Certificate", github: MY_GITHUB },
    "Tools": { title: "Tools & Deployment", skills: "Git, GitHub, Vercel, Netlify, Postman", impact: "Cloud Deployment Specialist", desc: "Proficient in CI/CD concepts, modern DevOps tools, and cloud application hosting.", github: MY_GITHUB, isScroll: true, buttonText: "View Projects" }
  };

  const projects = [
    { title: "Real-time Attendance System", tech: "Node.js, Rest API, JWT, React.Js", desc: "Developed an Admin-only Attendance Tracker using React.js that allows secure login and efficient attendance management.", link: "https://attendance-tracker-nu-tan.vercel.app/" },
    { title: "E-Commerce-Website", tech: "React.js, Tailwind CSS, Redux", desc: "Developed a responsive E-Commerce web application using React.js with product listing and cart management.", link: "https://my-e-commerce-eta-jet.vercel.app/" },
    { title: "User Authentication System (MERN)", tech: "Express.js, MongoDB, React.Js+ Node.js", desc: "Developed a full-stack user authentication system. Implemented secure user registration and login functionality.", link: "https://mernfront-one.vercel.app/" },
    { title: "Portfolio Overview", tech: "HTML, CSS, Javascript and UI/UX", desc: "A clean and modern layout with sections for Home, About, Skills, Work/Projects, and Contact.", link: "https://nitinpathak2674.github.io/My-Portfolio/" },
  ];

  const certifications = [
    { title: "MERN Stack Specialization", org: "Full-Stack Development", desc: "Advanced certification in building scalable web applications using MongoDB, Express, React, and Node.js.", link: "/mern-cert.pdf" },
    { title: "Honeywell Cyber Security Training", org: "CyberSecurity Training", desc: "Successfully completed a certified program conducted by Honeywell. Developed hands-on understanding of technical workflows.", link: "/Honeywell.jpg" },
    { title: "Technology Job Simulation", org: "Deloitte (Forage)", desc: "Completed Deloitte Technology Job Simulation, gaining practical exposure to real-world corporate tech tasks.", link: "/deloitte certificate.pdf" }
  ];

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, isUser: true }]);
    setInput('');
    setIsLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/chat", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { text: data.reply, isUser: false }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: "Connection error with assistant backend.", isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0c14] text-white flex flex-col items-center p-6 overflow-x-hidden relative font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Header */}
      <div className="text-center mt-20 mb-16 z-10">
        <h1 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter leading-none">
          Nitin <span className="bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">Pathak</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 italic font-medium">Full-Stack Developer crafting digital intelligence.</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button onClick={() => setIsOpen(true)} className="bg-blue-600 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"><Bot size={20}/> Talk to AI</button>
          <a href="/Nitin_Resume.pdf" download="Nitin_Pathak_Resume.pdf" className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all cursor-pointer">
            <Download size={20}/> Download CV
          </a>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl z-10 mb-20">
        {Object.keys(skillDetails).map((key) => (
          <div key={key} onClick={() => setActiveSkill(skillDetails[key])} className={`bg-white/5 border border-white/10 p-8 rounded-[2.5rem] cursor-pointer hover:border-blue-500/50 hover:bg-blue-600/5 transition-all group relative overflow-hidden ${key === 'Tools' ? 'lg:col-span-2' : ''}`}>
            <div className="flex justify-between items-center mb-4">
               {key === "Frontend" && <Globe className="text-blue-400" size={28} />}
               {key === "Backend & DB" && <Database className="text-green-400" size={28} />}
               {key === "Programming" && <Terminal className="text-purple-400" size={28} />}
               {key === "APIs & Concepts" && <Code2 className="text-orange-400" size={28} />}
               {key === "Tools" && <Cpu className="text-red-400" size={28} />}
               <Zap size={20} className="text-white/10 group-hover:text-yellow-400 transition-all" />
            </div>
            <h3 className="text-2xl font-bold mb-2">{skillDetails[key].title}</h3>
            <p className="text-gray-400 text-sm">{skillDetails[key].skills}</p>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div ref={projectsRef} className="w-full max-w-6xl z-10 mb-20 pt-10">
        <h2 className="text-4xl font-bold mb-10 flex items-center gap-4 px-4">
          <Layout className="text-blue-500" /> Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {projects.map((project, index) => (
            <div key={index} className="bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:bg-white/10 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-all"><ExternalLink size={24}/></a>
                </div>
                <div className="flex gap-2 mb-6 flex-wrap">
                  {project.tech.split(', ').map(t => <span key={t} className="text-[10px] uppercase tracking-widest bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full border border-blue-500/20">{t}</span>)}
                </div>
                <p className="text-gray-400 leading-relaxed mb-8">{project.desc}</p>
              </div>
              <a href={project.link} target="_blank" rel="noreferrer" className="font-bold flex items-center gap-2 text-blue-500 group-hover:gap-4 transition-all">View Project <ExternalLink size={16}/></a>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="w-full max-w-6xl z-10 mb-20">
        <h2 className="text-4xl font-bold mb-10 flex items-center gap-4 px-4">
          <Award className="text-yellow-500" /> Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {certifications.map((cert, index) => (
            <div key={index} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:border-yellow-500/30 transition-all group">
              <div className="bg-yellow-500/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="text-yellow-500" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
              <p className="text-blue-400 text-xs font-bold mb-4 tracking-widest uppercase">{cert.org}</p>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">{cert.desc}</p>
              <a href={cert.link} target="_blank" className="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white transition-all">
                View Proof <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Let's Connect & Footer */}
      <div className="w-full max-w-6xl z-10 mb-10 px-4">
        <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-[3rem] p-10 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-6 flex items-center gap-3">
                <MessageSquare className="text-blue-500" /> Let's Connect
              </h2>
              <p className="text-gray-400 mb-8 max-w-md text-lg">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="bg-blue-600/20 p-3 rounded-xl text-blue-400"><Mail size={20} /></div>
                  <span className="font-medium">pathakn475@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="bg-green-600/20 p-3 rounded-xl text-green-400"><MapPin size={20} /></div>
                  <span className="font-medium">India</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center items-center md:items-end gap-6">
              <div className="flex gap-4">
                <a href={MY_GITHUB} target="_blank" rel="noreferrer" className="bg-white/5 p-5 rounded-2xl hover:bg-white hover:text-black transition-all"><Github size={28}/></a>
                <a href={MY_LINKEDIN} target="_blank" rel="noreferrer" className="bg-white/5 p-5 rounded-2xl hover:bg-blue-600 transition-all"><Linkedin size={28}/></a>
                <a href="mailto:pathakn475@gmail.com" className="bg-white/5 p-5 rounded-2xl hover:bg-red-500 transition-all"><Mail size={28}/></a>
              </div>
              <p className="text-gray-500 text-sm font-medium">© 2026 Nitin Pathak. Designed with Passion.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Modal */}
      {activeSkill && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div className="bg-[#111625] border border-white/10 p-8 md:p-10 rounded-[3rem] max-w-lg w-full relative">
            <button onClick={() => setActiveSkill(null)} className="absolute top-8 right-8 text-gray-500 hover:text-white"><X size={24}/></button>
            <h2 className="text-3xl font-bold mb-2">{activeSkill.title}</h2>
            <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl mb-6 text-blue-200 font-semibold text-sm italic"><Zap size={16} className="inline mr-2 fill-blue-500" /> {activeSkill.impact}</div>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">{activeSkill.desc}</p>
            <div className="flex gap-3">
              {activeSkill.isScroll ? (
                <button onClick={scrollToProjects} className="flex-1 bg-blue-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-500 transition-all">
                  <ExternalLink size={18}/> {activeSkill.buttonText}
                </button>
              ) : (
                activeSkill.link && <a href={activeSkill.link} target="_blank" rel="noreferrer" className="flex-1 bg-blue-600 py-4 rounded-2xl text-center font-bold flex items-center justify-center gap-2 hover:bg-blue-500 transition-all"><ExternalLink size={18}/> {activeSkill.buttonText || "View Projects"}</a>
              )}
              <a href={activeSkill.github} target="_blank" rel="noreferrer" className="flex-1 bg-white/10 py-4 px-6 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all"><Github size={20}/> GitHub</a>
            </div>
          </div>
        </div>
      )}

      {/* AI Bot Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[550px] bg-[#111625] border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col z-[150] overflow-hidden">
          <div className="p-6 bg-[#1a2134] flex justify-between items-center">
            <div className="flex items-center gap-3"><Bot className="text-blue-400" size={20} /><p className="font-bold text-sm">AI assistant</p></div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-[#0a0c14]">
            {messages.map((msg, i) => (<div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${msg.isUser ? 'bg-blue-600' : 'bg-[#1e2638] text-gray-200'}`}>{msg.text}</div></div>))}
            {isLoading && <div className="text-xs text-gray-500 italic animate-pulse">Assistant is thinking...</div>}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-6 border-t border-white/5 flex gap-2 bg-[#111625]">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me..." className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none" />
            <button type="submit" className="bg-blue-600 p-3 rounded-xl"><Send size={18} /></button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
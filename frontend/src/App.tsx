import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Background from "./components/Background";

import { Send, Bot, X, Github, ExternalLink, Download, Globe, Database, Zap, Linkedin, Mail, Terminal, Code2, Cpu, Layout, Server, ShieldCheck, Award, MessageSquare, Phone, MapPin } from 'lucide-react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState<any>(null);
  const [messages, setMessages] = useState([{ text: "Hello! I'm Nitin's AI assistant. How can I help you explore his work today?", isUser: false }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [loading, setLoading] = useState(true);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2500);

  return () => clearTimeout(timer);
}, []);
  


if (loading) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#070B17]">

      <div className="text-center">

        <h1 className="text-6xl font-black tracking-widest">
          <span className="text-white">NITIN</span>{" "}
          <span className="text-blue-500">PATHAK</span>
        </h1>

        <p className="mt-4 text-gray-400 text-lg">
          Full-Stack Developer
        </p>

        <div className="mt-10 flex justify-center">
          <div className="h-2 w-56 overflow-hidden rounded-full bg-white/10">

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
            />

          </div>
        </div>

      </div>

    </div>
  );
}

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
  {
    title: "Real-time Attendance System",
    image: "/attendance.png",
    tech: "Node.js, Rest API, JWT, React.Js",
    desc: "Developed an Admin-only Attendance Tracker using React.js that allows secure login and efficient attendance management.",
    link: "https://attendance-tracker-nu-tan.vercel.app/"
  },
  {
    title: "E-Commerce Website",
    image: "/ecommerce.png",
    tech: "React.js, Tailwind CSS, Redux",
    desc: "Developed a responsive E-Commerce web application using React.js with product listing and cart management.",
    link: "https://my-e-commerce-eta-jet.vercel.app/"
  },
  {
    title: "Movie Insight Builder",
    image: "/movie.png",
    tech: "Next.js, Gemini AI, IMDb API",
    desc: "AI Movie Insight Builder that generates audience sentiment analysis using Gemini AI.",
    link: "https://brew-assignment-eight.vercel.app/"
  }
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
      const res = await fetch("https://portfolio-ai-rsf0.onrender.com/chat", { 
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
  <div className="min-h-screen bg-[#0a0c14] text-white flex flex-col items-center p-6 overflow-x-hidden relative isolate font-sans">

    <Background />
   

   
      
      {/* Header */}
      {/* Header */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-center mt-20 mb-16 z-10"
>

  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-semibold"
  >
    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
    Available for Opportunities
  </motion.div>


  <h1 className="text-6xl md:text-9xl font-black mb-4 tracking-tighter leading-none">
    Nitin{" "}
    <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-700 bg-clip-text text-transparent">
      Pathak
    </span>
  </h1>


  <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 italic font-medium">
    Full-Stack Developer crafting scalable web applications and AI-powered digital experiences.
  </p>


  <div className="flex justify-center gap-6 mb-10 flex-wrap">

    <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-xl">
      <h3 className="text-2xl font-bold text-blue-400">20+</h3>
      <p className="text-gray-400 text-sm">Projects</p>
    </div>

    <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-xl">
      <h3 className="text-2xl font-bold text-blue-400">10+</h3>
      <p className="text-gray-400 text-sm">Technologies</p>
    </div>

    <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl backdrop-blur-xl">
      <h3 className="text-2xl font-bold text-blue-400">MERN</h3>
      <p className="text-gray-400 text-sm">Stack</p>
    </div>

  </div>


  <div className="flex gap-4 justify-center flex-wrap">

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsOpen(true)}
      className="bg-blue-600 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
    >
      <Bot size={20}/> Talk to AI
    </motion.button>


    <motion.a
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      href="/NITIN PATHAK.pdf"
      download="NITIN PATHAK.pdf"
      className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/10 transition-all cursor-pointer"
    >
      <Download size={20}/> Download CV

      
    </motion.a>

  </div>

</motion.div>
{/* Skills Heading */}

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="text-center mb-16"
>

  <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 mb-6">

    <Cpu className="text-blue-400" size={18} />

    <span className="text-sm font-semibold text-blue-400">
      Technical Skills
    </span>

  </div>

  <h2 className="text-5xl md:text-6xl font-black">

    My{" "}

    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
      Expertise
    </span>

  </h2>

  <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
    Modern technologies and tools I use to build scalable,
    responsive and production-ready applications.
  </p>

</motion.div>

    
      {/* Skills Section */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl z-10 mb-20">

{Object.keys(skillDetails).map((key, index) => (

<Tilt
key={key}
tiltMaxAngleX={8}
tiltMaxAngleY={8}
scale={1.04}
transitionSpeed={500}
>

<motion.div
initial={{ opacity:0, y:50 }}
whileInView={{ opacity:1, y:0 }}
viewport={{ once:true }}
transition={{ duration:0.5, delay:index*0.1 }}

onClick={() => setActiveSkill(skillDetails[key])}

className={`
relative overflow-hidden
bg-white/5 
backdrop-blur-xl
border border-white/10
p-8
rounded-[2.5rem]
cursor-pointer
group
hover:border-blue-500/50
hover:bg-blue-500/10
transition-all

${key === 'Tools' ? 'lg:col-span-2' : ''}
`}
>


{/* Glow Effect */}
<div className="
absolute -top-10 -right-10 
w-32 h-32 
bg-blue-500/20 
blur-3xl 
rounded-full
group-hover:bg-blue-500/40
transition-all
"></div>


<div className="flex justify-between items-center mb-6">

<div className="
p-3 
rounded-2xl
bg-white/5
border border-white/10
">

{key === "Frontend" && <Globe className="text-blue-400" size={30} />}
{key === "Backend & DB" && <Database className="text-green-400" size={30} />}
{key === "Programming" && <Terminal className="text-purple-400" size={30} />}
{key === "APIs & Concepts" && <Code2 className="text-orange-400" size={30} />}
{key === "Tools" && <Cpu className="text-red-400" size={30} />}

</div>


<Zap 
size={22}
className="
text-white/20 
group-hover:text-yellow-400 
transition-all
"
/>

</div>



<h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition">
{skillDetails[key].title}
</h3>


<p className="text-gray-400 text-sm leading-relaxed">
{skillDetails[key].skills}
</p>


<div className="mt-7">

  <div
    className="
      flex
      items-center
      justify-between
      text-sm
      text-blue-400
      opacity-0
      translate-y-2
      group-hover:opacity-100
      group-hover:translate-y-0
      transition-all
      duration-300
    "
  >

    <span>Click to explore</span>

    <span className="text-lg">→</span>

  </div>

  <div
    className="
      mt-4
      h-[2px]
      w-0
      bg-gradient-to-r
      from-blue-500
      to-cyan-400
      group-hover:w-full
      transition-all
      duration-500
    "
  />

</div>
</motion.div>

</Tilt>

))}

</div>
{/* ===================== Projects Section ===================== */}
<motion.div
  ref={projectsRef}
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="w-full max-w-7xl mx-auto z-10 mb-28 pt-16"
>

  {/* Heading */}
  <div className="text-center mb-16">

    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 mb-6">

      <Layout className="text-blue-400" size={18} />

      <span className="text-sm font-semibold text-blue-400">
        Portfolio Showcase
      </span>

    </div>

    <h2 className="text-5xl md:text-6xl font-black leading-tight">

      Featured{" "}

      <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Projects
      </span>

    </h2>

    <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
      A collection of modern Full-Stack, AI and Web applications built
      using React, Node.js, MongoDB and REST APIs.
    </p>

  </div>

  {/* Grid */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4">

    {projects.map((project, index) => (

      <motion.div
        key={index}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay: index * 0.15,
        }}
        whileHover={{
          y: -14,
          scale: 1.02,
        }}
        className="
          group
          relative
          overflow-hidden
          rounded-[2rem]
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          shadow-xl
          hover:border-cyan-400/40
          hover:bg-blue-500/5
          transition-all
          duration-500
          flex
          flex-col
          justify-between
          p-6
        "
      >

        {/* Glow */}
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

        {/* Live Badge */}
        <div className="absolute top-5 left-5 z-20">

          <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold tracking-wide text-white shadow-lg">
            ● LIVE
          </span>

        </div>

        {/* Screenshot */}
        <div className="mb-7 overflow-hidden rounded-3xl border border-white/10 bg-[#0f172a]">

          <img
            src={project.image}
            alt={project.title}
            className="
              aspect-video
              w-full
              object-contain
              bg-[#0f172a]
              p-2
              transition-all
              duration-500
              group-hover:scale-105
            "
          />

        </div>

        <div>

          {/* Title */}
          <div className="mb-5 flex items-start justify-between">

            <h3 className="text-2xl font-bold transition group-hover:text-cyan-300">
              {project.title}
            </h3>

            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 transition hover:text-cyan-400"
            >
              <ExternalLink size={22} />
            </a>

          </div>

          {/* Tech Stack */}
          <div className="mb-6 flex flex-wrap gap-2">

            {project.tech.split(", ").map((tech) => (

              <span
                key={tech}
                className="
                  rounded-full
                  border
                  border-cyan-500/20
                  bg-cyan-500/10
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-cyan-300
                "
              >
                {tech}
              </span>

            ))}

          </div>

          {/* Description */}

          

                <p className="mb-8 leading-7 text-gray-400">
            {project.desc}
          </p>

        </div>

        {/* Buttons */}
        <div className="flex gap-3">

          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="
              flex-1
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              py-3.5
              font-semibold
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:shadow-lg
              hover:shadow-cyan-500/30
            "
          >
            View Live
            <ExternalLink size={18} />
          </a>

          <a
            href={MY_GITHUB}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex
              items-center
              justify-center
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-5
              transition-all
              duration-300
              hover:bg-white/10
              hover:border-cyan-400/40
            "
          >
            <Github size={20} />
          </a>

        </div>

        

      </motion.div>

    ))}

  </div>

</motion.div>
     {/* Certifications Section */}
<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="w-full max-w-6xl z-10 mb-20"
>

<h2 className="text-4xl font-bold mb-10 flex items-center gap-4 px-4">
  <Award className="text-yellow-500"/>
  Certifications
</h2>


<div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

{certifications.map((cert,index)=>(

<motion.div
key={index}
whileHover={{ y:-8 }}

className="
bg-white/5
backdrop-blur-xl
border border-white/10
p-8
rounded-[2.5rem]
hover:border-yellow-500/40
transition-all
"
>


<div className="
bg-yellow-500/10
w-14
h-14
rounded-2xl
flex
items-center
justify-center
mb-6
">

<ShieldCheck
className="text-yellow-500"
size={28}
/>

</div>


<h3 className="text-xl font-bold mb-2">
{cert.title}
</h3>


<p className="
text-blue-400
text-xs
font-bold
uppercase
tracking-widest
mb-4
">
{cert.org}
</p>


<p className="
text-gray-400
text-sm
leading-relaxed
mb-6
">
{cert.desc}
</p>


<a
href={cert.link}
target="_blank"
rel="noreferrer"

className="
flex
items-center
gap-2
text-gray-300
hover:text-white
font-semibold
transition
"
>

View Certificate
<ExternalLink size={15}/>

</a>


</motion.div>

))}

</div>

</motion.div>

    
      <div className="w-full max-w-6xl z-10 mb-10 px-4">
        <div
  className="
    relative
    overflow-hidden
    rounded-[3rem]
    border
    border-white/10
    bg-white/5
    backdrop-blur-2xl
    p-10
    md:p-16
  "
>

  {/* Background Glow */}
  <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-blue-500/20 blur-[150px]" />
  <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-[150px]" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-5 py-2 mb-6">

  <MessageSquare className="text-blue-400" size={18} />

  <span className="text-sm font-semibold text-blue-400">
    Get In Touch
  </span>

</div>

<h2 className="text-5xl font-black leading-tight mb-6">

  Let's

  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
    {" "}Connect
  </span>

</h2>

<p className="text-gray-400 text-lg leading-8 max-w-md mb-10">
  Whether you have a project, an internship opportunity or just want to say hello, I'd love to hear from you.
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
                <a href={MY_GITHUB} target="_blank" rel="noreferrer" className="bg-white/5
border
border-white/10
p-5
rounded-2xl
transition-all
duration-300
hover:-translate-y-2
hover:scale-110
hover:border-cyan-400/40
hover:bg-white/10"><Github size={28}/></a>
                <a href={MY_LINKEDIN} target="_blank" rel="noreferrer" className="bg-white/5 p-5 rounded-2xl hover:bg-blue-600 transition-all"><Linkedin size={28}/></a>
                <a href="mailto:pathakn475@gmail.com" className="bg-white/5 p-5 rounded-2xl hover:bg-red-500 transition-all"><Mail size={28}/></a>
              </div>
              <p className="text-center text-gray-500 text-sm leading-7">
  © 2026 <span className="font-semibold text-white">Nitin Pathak</span>
  <br />
  Full-Stack Developer • React • Node.js • MongoDB
</p>
            </div>
          </div>
        </div>
      </div>

      
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

      {!isOpen && (
  <motion.button
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    transition={{ duration: 0.3 }}
    onClick={() => setIsOpen(true)}
    className="fixed bottom-6 right-6 z-[150] bg-blue-600 hover:bg-blue-500 p-4 rounded-full shadow-2xl shadow-blue-600/40 transition-all"
  >
    <Bot size={28} />
  </motion.button>
)}

     
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[550px] bg-[#111625] border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col z-[150] overflow-hidden">
         <div className="p-6 bg-gradient-to-r from-blue-600/20 to-transparent flex justify-between items-center border-b border-white/10">
            <div className="flex items-center gap-3"><Bot className="text-blue-400" size={20} /><p className="font-bold text-sm">AI assistant</p></div>
            <button onClick={() => setIsOpen(false)}><X size={20} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-[#0a0c14]">
            {messages.map((msg, i) => (<div key={i} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}><div
  className={`
    max-w-[85%]
    px-5
    py-3
    text-sm
    leading-relaxed
    shadow-lg
    transition-all
    ${
      msg.isUser
        ? "bg-blue-600 text-white rounded-3xl rounded-br-md"
        : "bg-white/10 border border-white/10 text-gray-200 rounded-3xl rounded-bl-md"
    }
  `}
>{msg.text}</div></div>))}
            {isLoading && <div className="text-xs text-gray-500 italic animate-pulse">Assistant is thinking...</div>}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="p-6 border-t border-white/5 flex gap-2 bg-[#111625]">
            <input
  value={input}
  onChange={(e) => setInput(e.target.value)}
  placeholder="Ask me anything..."
  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-all"
/>
            <motion.button
  whileHover={{ scale: 1.08 }}
  whileTap={{ scale: 0.92 }}
  type="submit"
  className="bg-blue-600 hover:bg-blue-500 p-3 rounded-2xl transition-all shadow-lg shadow-blue-600/30"
>
  <Send size={18} />
</motion.button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Shield, Terminal, Code2, Cpu, GraduationCap, Github, Linkedin, Mail, Globe, Lock, Server, ExternalLink } from 'lucide-react';
import Scene3D from './components/Scene3D';
import MatrixRain from './components/MatrixRain';
import ClickEffect from './components/ClickEffect';
import CustomCursor from './components/CustomCursor';
import ProfileImage from './components/ProfileImage';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen text-[#00ff41]">
      <MatrixRain />
      <ClickEffect />
      <CustomCursor />
      
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md' : ''
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6" />
              <span className="text-xl font-bold">Muhammad Waseem</span>
            </div>
            <div className="hidden md:flex space-x-8">
              {[
                { name: 'About', id: 'about' },
                { name: 'Skills', id: 'skills' },
                { name: 'Projects', id: 'projects' },
                { name: 'Education', id: 'education' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="nav-link hover:text-white transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="space-y-2">
                <div className={`w-8 h-0.5 bg-[#00ff41] transition-all ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
                <div className={`w-8 h-0.5 bg-[#00ff41] transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-8 h-0.5 bg-[#00ff41] transition-all ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
              </div>
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden mt-4 py-4 space-y-4">
              {[
                { name: 'About', id: 'about' },
                { name: 'Skills', id: 'skills' },
                { name: 'Projects', id: 'projects' },
                { name: 'Education', id: 'education' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 nav-link hover:text-white transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main>
        <section className="min-h-screen relative flex items-center">
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <Suspense fallback={null}>
                <Scene3D />
              </Suspense>
            </Canvas>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="glass-panel p-8">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-glow">
                  Muhammad Waseem
                </h1>
                <p className="text-lg mb-6">
                  Specializing in Penetration Testing & Ethical Hacking
                </p>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="bg-[#00ff41] text-black px-6 py-2 rounded button-glow"
                >
                  Explore My Work
                </button>
              </div>

              <div className="flex justify-center items-center mt-8 lg:mt-0">
                <ProfileImage />
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-black/30">
          <div className="container mx-auto px-4">
            <div className="glass-panel p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-glow">About Me</h2>
              <div className="space-y-4">
                <p>
                  As a passionate cybersecurity enthusiast and Computer Science student, 
                  I specialize in identifying and exploiting security vulnerabilities to 
                  help organizations strengthen their digital defenses.
                </p>
                <p>
                  With a deep understanding of both offensive and defensive security practices, 
                  I bring a comprehensive approach to cybersecurity challenges.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-glow">Technical Arsenal</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Terminal className="w-8 h-8" />,
                  title: "Penetration Testing",
                  skills: ["Network Security", "Web App Security", "Mobile Security"]
                },
                {
                  icon: <Code2 className="w-8 h-8" />,
                  title: "Programming",
                  skills: ["Python", "JavaScript", "C++", "Bash Scripting"]
                },
                {
                  icon: <Cpu className="w-8 h-8" />,
                  title: "Tools & Technologies",
                  skills: ["Metasploit", "Burp Suite", "Wireshark", "Nmap"]
                }
              ].map((item, index) => (
                <div key={index} className="glass-panel p-6 text-center">
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <ul className="space-y-2">
                    {item.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 bg-black/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-glow">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Server className="w-8 h-8" />,
                  title: "Wazuh Remote Code Execution (RCE) - PoC",
                  description: "This vulnerability allows attackers to execute arbitrary code on the Wazuh server",
                  tech: ["C++", "Qt", "PCap"],
                  github: "https://github.com/MuhammadWaseem29/CVE-2025-24016",
                  demo: "https://github.com/MuhammadWaseem29/CVE-2025-24016"
                }
              ].map((project, index) => (
                <div key={index} className="glass-panel p-6">
                  <div className="flex items-center mb-4">
                    {project.icon}
                    <h3 className="text-xl font-bold ml-3">{project.title}</h3>
                  </div>
                  <p className="mb-4 text-[#00ff41]/80">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 rounded-full border border-[#00ff41]/30 text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 rounded border border-[#00ff41] hover:bg-[#00ff41]/10 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 rounded border border-[#00ff41] hover:bg-[#00ff41]/10 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="py-20">
          <div className="container mx-auto px-4">
            <div className="glass-panel p-8">
              <div className="flex items-center mb-6">
                <GraduationCap className="w-8 h-8 mr-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-glow">Education</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">Bachelor of Science in Computer Science</h3>
                  <p className="text-[#00ff41]/80">Expected Graduation: 2025</p>
                </div>
                <div>
                  <h4 className="font-bold">Relevant Coursework:</h4>
                  <ul className="list-disc list-inside space-y-1 text-[#00ff41]/80">
                    <li>Network Security</li>
                    <li>Operating Systems</li>
                    <li>Data Structures & Algorithms</li>
                    <li>Computer Architecture</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 bg-black/30">
          <div className="container mx-auto px-4">
            <div className="glass-panel p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-glow">Get In Touch</h2>
              <div className="flex flex-col items-center space-y-6">
                <div className="flex items-center space-x-2">
                  <Mail className="w-6 h-6" />
                  <a href="mailto:admin@misterwaseem.tech" className="hover:text-white transition-colors">
                  admin@misterwaseem.tech
                  </a>
                </div>
                <div className="flex space-x-6">
                  <a href="https://github.com/MuhammadWaseem29/" target="_blank" rel="noopener noreferrer" 
                    className="glass-panel p-4 hover:text-white transition-colors">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://www.linkedin.com/in/muhammadwaseem11/" target="_blank" rel="noopener noreferrer"
                    className="glass-panel p-4 hover:text-white transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 bg-black/50">
          <div className="container mx-auto px-4">
            <div className="text-center text-[#00ff41]/60">
              © 2025 Muhammad Waseem. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
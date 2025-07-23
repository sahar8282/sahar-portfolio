"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, Phone, MapPin, Github, ExternalLink, Globe, Award, Calendar, User, Briefcase, GraduationCap } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link: string;
}

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      }, options);

      const currentRef = ref.current;
      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        if (currentRef) {
          observer.unobserve(currentRef);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [ref, isIntersecting] as const;
  };

  const skills = [
    { name: 'TypeScript', level: 100, icon: '📘' },
    { name: 'React', level: 100, icon: '⚛️' },
    { name: 'JavaScript', level: 95, icon: '🟨' },
    { name: 'TailwindCSS', level: 98, icon: '🎨' },
    { name: 'Next.js', level: 90, icon: '▲' },
    { name: 'HTML', level: 90, icon: '🌐' },
    { name: 'CSS', level: 90, icon: '💅' },
    { name: 'Git', level: 95, icon: '📚' }
  ];

  const projects = [
    {
      title: 'AI powered E-Commerce Platform ',
      description: 'Full-featured online shopping platform built with React, TypeScript, and TailwindCSS along with a recommender system.',
      technologies: ['React', 'TypeScript', 'TailwindCSS', 'Next.js'],
      image: '🛒',
      link: 'https://github.com/sahar8282/e-commerce-system'
    },
    {
      title: 'agent-client real time support',
      description: 'Collaborative app with real-time chat features for Comtech LTD.',
      technologies: ['React', 'TypeScript', 'TailwindCSS'],
      image: '📋',
      link: '#'
    },
    {
      title: 'FTP server',
      description: 'A server using C++ that handles client connections and performs various operations such as file management and client interaction which is designed to use POSIX threads.',
      technologies: ['C++', 'standard libraries'],
      image: '🌤️',
      link: 'https://github.com/sahar8282/FTP-server/'
    },
    {
      title: 'CPU scheduler system for OS',
      description: 'scheduling the tasks with different methods.',
      technologies: ['C++', 'standard libraries'],
      image: '🌤️',
      link: 'https://github.com/sahar8282/cpu-scheduling-for-operating-system'
    }
  ];

  const FloatingParticles = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        >
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${i % 3 === 0 ? 'from-pink-400 to-purple-400' :
              i % 3 === 1 ? 'from-purple-400 to-blue-400' :
                'from-blue-400 to-pink-400'
            } opacity-20`}></div>
        </div>
      ))}
    </div>
  );

  const SkillBar = ({ skill, index, isVisible }: { skill: Skill; index: number; isVisible: boolean }) => {
    const [animatedLevel, setAnimatedLevel] = useState(0);

    useEffect(() => {
      if (isVisible) {
        const timer = setTimeout(() => {
          setAnimatedLevel(skill.level);
        }, index * 150);
        return () => clearTimeout(timer);
      }
    }, [isVisible, skill.level, index]);

    return (
      <div
        className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-pink-400/30 transition-all duration-500 group hover:transform hover:scale-105 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
          }`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-3 transition-transform duration-300 group-hover:scale-125">{skill.icon}</span>
          <h3 className="text-lg font-semibold text-white group-hover:text-pink-400 transition-colors duration-300">
            {skill.name}
          </h3>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1500 ease-out relative overflow-hidden"
            style={{ width: `${animatedLevel}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
        <p className="text-gray-400 text-sm font-medium">{skill.level}% Proficiency</p>
      </div>
    );
  };

  const ProjectCard = ({ project, index, isVisible }: { project: Project; index: number; isVisible: boolean }) => (
    <div
      className={`bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/30 transition-all duration-500 group hover:transform hover:scale-105 hover:rotate-1 ${isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'
        }`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-pink-400/10 to-purple-400/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
        <div className="text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">{project.image}</div>
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 leading-relaxed transition-all duration-300 group-hover:text-gray-300">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech: string, techIndex: number) => (
            <span
              key={techIndex}
              className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1 rounded-full text-xs border border-blue-500/30 transition-all duration-300 hover:scale-105 hover:bg-blue-500/30"
              style={{ animationDelay: `${techIndex * 50}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
        <button  onClick={() => window.open(project.link)} className="flex items-center text-pink-400 hover:text-pink-300 transition-all duration-300 font-semibold group-hover:translate-x-2">
          View Project <ExternalLink  size={16} className="ml-2 transition-transform duration-300 group-hover:rotate-45" />
        </button>
      </div>
    </div>
  );

  const SkillsSection = () => {
    const [skillsRef, skillsVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
      <div ref={skillsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <SkillBar key={index} skill={skill} index={index} isVisible={skillsVisible} />
        ))}
      </div>
    );
  };

  const ProjectsSection = () => {
    const [projectsRef, projectsVisible] = useIntersectionObserver({ threshold: 0.1 });

    return (
      <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} isVisible={projectsVisible} />
        ))}
      </div>
    );
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <FloatingParticles />

      <div
        className="fixed w-4 h-4 bg-pink-400/30 rounded-full pointer-events-none z-50 transition-all duration-75 ease-out"
        style={{
          left: mousePos.x - 8,
          top: mousePos.y - 8,
          transform: `scale(${mousePos.x ? 1 : 0})`
        }}
      ></div>

      <nav className={`fixed top-0 w-full bg-white/10 backdrop-blur-md z-50 border-b border-white/20 transition-all duration-500 ${scrollY > 50 ? 'py-2 bg-white/20' : 'py-4'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className={`font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent transition-all duration-500 ${scrollY > 50 ? 'text-xl' : 'text-2xl'
              }`}>
              Sahar Ataee
            </div>
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-all duration-300 hover:text-pink-400 hover:scale-110 ${activeSection === section ? 'text-pink-400 scale-110' : 'text-white'
                    }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-4 relative">
        <div
          className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-blue-500/5"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>

        <div className={`text-center transition-all duration-1000 relative z-10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <div className="relative mb-8 group">
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-1 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-slate-800">
                <div className="text-6xl transition-all duration-500 group-hover:scale-110 animate-pulse">👩‍💻</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 -right-8 w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp">
            {['S', 'a', 'h', 'a', 'r', ' ', 'A', 't', 'a', 'e', 'e'].map((letter, index) => (
              <span
                key={index}
                className="inline-block bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent transition-all duration-300 hover:scale-125 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-4 animate-fadeInUp" style={{ animationDelay: '1s' }}>
            Frontend Developer & IT Professional
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 animate-fadeInUp" style={{ animationDelay: '1.2s' }}>
            Passionate about creating beautiful, responsive web applications with modern technologies like React, TypeScript, and TailwindCSS
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fadeInUp" style={{ animationDelay: '1.4s' }}>
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25 group"
            >
              <span className="flex items-center">
                View My Work
                <ExternalLink size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-400/25"
            >
              Get In Touch
            </button>
          </div>

          <button
            onClick={() => scrollToSection('about')}
            className="animate-bounce text-pink-400 hover:text-pink-300 transition-all duration-300 hover:scale-125"
            style={{ animationDelay: '2s' }}
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </section>

      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fadeInUp">
            <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-500 hover:border-pink-400/30 hover:transform hover:scale-105 animate-fadeInLeft">
                <div className="flex items-center mb-4">
                  <User className="text-pink-400 mr-3 transition-transform duration-300 hover:scale-125" size={24} />
                  <h3 className="text-xl font-semibold text-white">Background</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  I'm a dedicated Frontend Developer from Tehran, Iran, with a passion for creating exceptional digital experiences.
                  With a strong educational background in IT and hands-on professional experience, I specialize in building
                  modern, responsive web applications.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-500 hover:border-purple-400/30 hover:transform hover:scale-105 animate-fadeInLeft" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center mb-4">
                  <GraduationCap className="text-purple-400 mr-3 transition-transform duration-300 hover:scale-125" size={24} />
                  <h3 className="text-xl font-semibold text-white">Education</h3>
                </div>
                <p className="text-gray-300">
                  <span className="font-semibold text-purple-300">Bachelor of Information Technology</span><br />
                  Cyprus International University<br />
                  <span className="text-pink-400 font-bold">CGPA: 3.72</span>
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-500 hover:border-blue-400/30 hover:transform hover:scale-105 animate-fadeInRight">
                <div className="flex items-center mb-4">
                  <Globe className="text-blue-400 mr-3 transition-transform duration-300 hover:scale-125" size={24} />
                  <h3 className="text-xl font-semibold text-white">Languages</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { lang: 'Persian', level: 'Native', color: 'text-pink-400' },
                    { lang: 'English', level: 'Fluent', color: 'text-purple-400' },
                    { lang: 'Turkish', level: 'Intermediate', color: 'text-blue-400' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center group">
                      <span className="text-gray-300 group-hover:text-white transition-colors">{item.lang}</span>
                      <span className={`${item.color} font-semibold transition-all duration-300 group-hover:scale-110`}>{item.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-500 hover:border-pink-400/30 hover:transform hover:scale-105 animate-fadeInRight" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center mb-4">
                  <Award className="text-pink-400 mr-3 transition-transform duration-300 hover:scale-125" size={24} />
                  <h3 className="text-xl font-semibold text-white">Expertise</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Frontend Development', 'UI/UX Design', 'Responsive Design', 'team collaboration'].map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 px-3 py-1 rounded-full text-sm border border-pink-500/30 transition-all duration-300 hover:scale-105 hover:bg-pink-500/30 animate-fadeInUp"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 px-4 bg-black/20 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fadeInUp">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>

          <SkillsSection />
        </div>
      </section>

      <section id="projects" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fadeInUp">
            <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          <ProjectsSection />
        </div>
      </section>

      <section id="experience" className="py-20 px-4 bg-black/20 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 animate-fadeInUp">
            <span className="bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
              Professional Experience
            </span>
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-500 hover:border-purple-400/30 hover:transform hover:scale-105 animate-fadeInUp">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-3 transition-transform duration-300 hover:scale-110">
                  <Briefcase className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1 hover:text-pink-400 transition-colors">
                        Frontend Developer & XML MSRP Tester
                      </h3>
                      <p className="text-pink-400 font-semibold">Comtech Ltd</p>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Calendar size={16} className="mr-2" />
                      <span>1 Year 3 Months</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-gray-300 mb-4">
                    {[
                      'Developed responsive web applications using React, TypeScript, and TailwindCSS',
                      'Conducted comprehensive XML MSRP testing to ensure data accuracy and server reliability',
                      'Collaborated with cross-functional teams to deliver high-quality software solutions',
                      'Improved application performance through optimized component architecture',
                      'Maintained clean, efficient codebase following industry best practices'
                    ].map((item, index) => (
                      <p key={index} className="animate-fadeInLeft transition-all duration-300 hover:text-white hover:translate-x-2" style={{ animationDelay: `${index * 100}ms` }}>
                        • {item}
                      </p>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'TailwindCSS', 'JavaScript', 'XML Testing', 'Git'].map((tech, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30 transition-all duration-300 hover:scale-105 hover:bg-purple-500/30 animate-fadeInUp"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 animate-fadeInUp">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Work Together
            </span>
          </h2>

          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '200ms' }}>
            I'm always interested in new opportunities and exciting projects.
            Let's discuss how we can bring your ideas to life!
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Mail, title: 'Email', info: 's.ataie1321@.com', color: 'pink' },
              { icon: Phone, title: 'Phone', info: '+905338700271', color: 'purple' },
              { icon: MapPin, title: 'Location', info: 'Nicosia, Cyprus', color: 'blue' }
            ].map((contact, index) => {
              const Icon = contact.icon;
              return (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-${contact.color}-400/30 transition-all duration-500 hover:transform hover:scale-105 hover:-translate-y-2 animate-fadeInUp group`}
                  style={{ animationDelay: `${400 + index * 150}ms` }}
                >
                  <Icon className={`text-${contact.color}-400 mx-auto mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12`} size={32} />
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-${contact.color}-400 transition-colors">{contact.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{contact.info}</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center space-x-6 animate-fadeInUp" style={{ animationDelay: '800ms' }}>
            {[
              { icon: Github, color: 'hover:bg-pink-500', delay: '0ms', link: "https://github.com/sahar8282" },
              { icon: Mail, color: 'hover:bg-purple-500', delay: '200ms', link: "s.ataie1321@gmail.com" }
            ].map((social, index) => {
              const Icon = social.icon;
              return (
                <button
                  key={index}
                  onClick={() => window.open(social.link)}
                  className={`bg-white/10 ${social.color} text-white p-4 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12 animate-pulse`}
                  style={{ animationDelay: social.delay }}
                >
                  <Icon size={24} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-white/20 bg-black/30 relative">
        <div className="max-w-6xl mx-auto text-center animate-fadeInUp">
          <p className="text-gray-400 transition-colors duration-300 hover:text-gray-300">
            © 2025 Sahar Ataee. Built with React, TypeScript, and TailwindCSS.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out both;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out both;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.6s ease-out both;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #ec4899, #8b5cf6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #be185d, #7c3aed);
        }

        html {
          scroll-behavior: smooth;
        }

        .skill-bar-loading {
          position: relative;
          overflow: hidden;
        }

        .skill-bar-loading::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
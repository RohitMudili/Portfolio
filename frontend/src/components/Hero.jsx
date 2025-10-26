import React from 'react';
import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { Button } from './ui/button';
import { personalInfo } from '../data/mock';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative neon-gradient-bg">
      <div className="absolute inset-0 overflow-hidden neon-radial-gradient">
        <div className="absolute top-20 right-20 w-96 h-96 border-2 rounded-full animate-spin-slow neon-glow-animation" style={{ animationDuration: '20s', borderColor: '#00f0ff', boxShadow: '0 0 30px #00f0ff, inset 0 0 30px #00f0ff' }}></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 border-2 rounded-full animate-spin-slow" style={{ animationDuration: '30s', animationDirection: 'reverse', borderColor: '#ff006e', boxShadow: '0 0 30px #ff006e, inset 0 0 30px #ff006e' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border-2 rounded-full opacity-40" style={{ borderColor: '#8b5cf6', boxShadow: '0 0 40px #8b5cf6' }}></div>
        <div className="absolute top-40 left-40 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-40 w-48 h-48 bg-gradient-to-br from-purple-500/20 to-green-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-7xl md:text-9xl font-light tracking-tight text-white neon-text">
            {personalInfo.name}
          </h1>
          
          <p className="text-xl md:text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 max-w-3xl mx-auto">
            {personalInfo.title}
          </p>

          <p className="text-base md:text-lg font-normal text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {personalInfo.tagline}
          </p>

          <div className="flex items-center justify-center space-x-4 pt-8">
            <Button
              onClick={() => scrollToSection('projects')}
              className="neon-button text-white font-medium px-8 py-6 text-base transition-transform hover:scale-105"
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                alert('Resume download will be implemented in backend');
              }}
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-6 text-base transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/50"
            >
              Download Resume
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 pt-6">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyan-400 transition-all hover:scale-110 transform hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]"
            >
              <Github size={24} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-pink-400 transition-all hover:scale-110 transform hover:drop-shadow-[0_0_8px_rgba(255,0,110,0.8)]"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-gray-300 hover:text-purple-400 transition-all hover:scale-110 transform hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-cyan-400 hover:text-pink-400 transition-colors hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]"
        >
          <ArrowDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;

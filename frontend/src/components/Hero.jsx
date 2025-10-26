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
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-white via-gray-50 to-gray-100">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 border border-gray-200 rounded-full animate-spin-slow" style={{ animationDuration: '20s' }}></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 border border-gray-300 rounded-full animate-spin-slow" style={{ animationDuration: '30s', animationDirection: 'reverse' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gray-200 rounded-full opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="space-y-6 animate-fade-in">
          <h1 className="text-7xl md:text-9xl font-light tracking-tight text-black">
            {personalInfo.name}
          </h1>
          
          <p className="text-xl md:text-2xl font-light text-gray-600 max-w-3xl mx-auto">
            {personalInfo.title}
          </p>

          <p className="text-base md:text-lg font-normal text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {personalInfo.tagline}
          </p>

          <div className="flex items-center justify-center space-x-4 pt-8">
            <Button
              onClick={() => scrollToSection('projects')}
              className="bg-black text-white hover:bg-gray-800 px-8 py-6 text-base transition-transform hover:scale-105"
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                alert('Resume download will be implemented in backend');
              }}
              className="border-black text-black hover:bg-gray-100 px-8 py-6 text-base transition-transform hover:scale-105"
            >
              Download Resume
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-6 pt-6">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors hover:scale-110 transform"
            >
              <Github size={24} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition-colors hover:scale-110 transform"
            >
              <Linkedin size={24} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-gray-600 hover:text-black transition-colors hover:scale-110 transform"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-gray-400 hover:text-black transition-colors"
        >
          <ArrowDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;

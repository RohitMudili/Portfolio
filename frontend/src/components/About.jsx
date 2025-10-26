import React from 'react';
import { GraduationCap, Briefcase, Trophy, Rocket } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { personalInfo, highlights } from '../data/mock';

const iconMap = {
  GraduationCap,
  Briefcase,
  Trophy,
  Rocket
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-5xl md:text-6xl font-light tracking-tight text-black mb-6">
                About Me
              </h2>
              <div className="w-24 h-1 bg-black"></div>
            </div>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              {personalInfo.bio}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-center mb-8">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl font-light text-gray-400">
                RM
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {highlights.map((highlight, index) => {
                const IconComponent = iconMap[highlight.icon];
                return (
                  <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow">
                    <CardContent className="flex items-center space-x-4 p-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <IconComponent size={20} className="text-black" />
                      </div>
                      <p className="text-sm text-gray-700 font-normal">{highlight.text}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

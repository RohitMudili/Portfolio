import React from 'react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { experiences } from '../data/mock';

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-black mb-4">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <Card key={exp.id} className="border-gray-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-medium text-black mb-2">{exp.role}</h3>
                    <p className="text-xl font-light text-gray-700 mb-2">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.location}</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <p className="text-sm text-gray-600 font-normal">{exp.duration}</p>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2"></span>
                      <span className="text-gray-600 text-base leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.techStack.map((tech, idx) => (
                    <Badge key={idx} variant="outline" className="border-gray-300 text-gray-700 text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { projects } from '../data/mock';

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-black to-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.05),transparent_50%),radial-gradient(circle_at_20%_80%,rgba(0,255,136,0.05),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-green-400 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="border-gray-200 hover:shadow-2xl transition-all duration-300 group overflow-hidden"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-medium text-black group-hover:text-gray-700 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <p className="text-xs text-gray-500 italic">
                  {project.impact}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 4 && (
                    <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                      +{project.techStack.length - 4}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-black text-black hover:bg-black hover:text-white transition-colors"
                      onClick={() => window.open(project.github, '_blank')}
                    >
                      <Github size={16} className="mr-2" />
                      GitHub
                    </Button>
                  )}
                  {project.liveDemo && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-black text-black hover:bg-black hover:text-white transition-colors"
                      onClick={() => window.open(project.liveDemo, '_blank')}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;

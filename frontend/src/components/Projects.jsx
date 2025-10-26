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
              className="border-2 border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/30 hover:border-purple-400 transition-all duration-300 group overflow-hidden"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-pink-500/0 group-hover:from-cyan-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-medium text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-pink-400 transition-all">
                  {project.title}
                </h3>
                
                <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <p className="text-xs text-gray-400 italic">
                  {project.impact}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs bg-gray-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 transition-colors">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 4 && (
                    <Badge variant="secondary" className="text-xs bg-gray-800 text-pink-300 border border-pink-500/30">
                      +{project.techStack.length - 4}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all hover:shadow-lg hover:shadow-cyan-400/50"
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
                      className="border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black transition-all hover:shadow-lg hover:shadow-pink-400/50"
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

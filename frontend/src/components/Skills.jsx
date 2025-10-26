import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { skills } from '../data/mock';

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-gray-950 to-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,240,255,0.05),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(255,0,110,0.05),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-white mb-4">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 mx-auto"></div>
        </div>

        <Tabs defaultValue="0" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 bg-transparent h-auto mb-12">
            {skills.map((skillGroup, index) => (
              <TabsTrigger
                key={index}
                value={index.toString()}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-cyan-500/50 border-2 border-gray-700 text-gray-300 hover:border-cyan-400 py-3 text-xs md:text-sm whitespace-normal h-auto min-h-[3rem] transition-all"
              >
                {skillGroup.category}
              </TabsTrigger>
            ))}
          </TabsList>

          {skills.map((skillGroup, groupIndex) => (
            <TabsContent key={groupIndex} value={groupIndex.toString()} className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {skillGroup.items.map((skill, skillIndex) => (
                  <Card key={skillIndex} className="border-2 border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-400 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-white">{skill.name}</span>
                        <span className="text-xs text-cyan-400 font-normal">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ 
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, #00f0ff ${skill.level}%, #ff006e 100%)`,
                            boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)'
                          }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Skills;

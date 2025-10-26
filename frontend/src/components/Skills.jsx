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
                className="data-[state=active]:bg-black data-[state=active]:text-white border border-gray-300 py-3 text-xs md:text-sm whitespace-normal h-auto min-h-[3rem]"
              >
                {skillGroup.category}
              </TabsTrigger>
            ))}
          </TabsList>

          {skills.map((skillGroup, groupIndex) => (
            <TabsContent key={groupIndex} value={groupIndex.toString()} className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                {skillGroup.items.map((skill, skillIndex) => (
                  <Card key={skillIndex} className="border-gray-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-black">{skill.name}</span>
                        <span className="text-xs text-gray-500 font-normal">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-black h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
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

import React from 'react';
import { Trophy, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { achievements, education } from '../data/mock';

const iconMap = {
  Trophy,
  Award
};

const AchievementsEducation = () => {
  return (
    <section id="achievements" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-black mb-4">
            Achievements & Education
          </h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-light text-black mb-8 text-center">Recognition</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {achievements.map((achievement) => {
              const IconComponent = iconMap[achievement.icon];
              return (
                <Card key={achievement.id} className="border-gray-200 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <IconComponent size={28} className="text-black" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-medium text-black mb-2">{achievement.title}</h4>
                        <p className="text-sm text-gray-500 mb-3">{achievement.organizer}</p>
                        <p className="text-sm text-gray-600 leading-relaxed">{achievement.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-light text-black mb-8 text-center">Education</h3>
          <div className="max-w-3xl mx-auto">
            <Card className="border-gray-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl font-light text-gray-500">
                    IIIT
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-medium text-black mb-2">{education.institution}</h4>
                    <p className="text-lg text-gray-700 mb-2">{education.degree}</p>
                    <p className="text-base text-gray-600 mb-3">{education.major}</p>
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 text-sm text-gray-500">
                      <span>{education.duration}</span>
                      <span className="hidden md:inline">•</span>
                      <span>{education.location}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsEducation;

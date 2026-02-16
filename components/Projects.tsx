import React from 'react';
import { useInView } from '../hooks/useInView';
import portfolioData from '../src/data/details.json';

const Projects: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { projects } = portfolioData;

  return (
    <section id="projects" ref={ref} className="border-b-4 border-black">
      <div className="p-8 md:px-16 md:py-12 border-b-4 border-black flex justify-between items-center bg-black">
        <h2 className={`text-4xl md:text-5xl font-black text-white uppercase tracking-tighter reveal-hidden ${isInView ? 'reveal-visible' : ''}`}>Selected Works</h2>
        <span className={`text-white opacity-50 font-black text-xl hidden md:block reveal-hidden stagger-1 ${isInView ? 'reveal-visible' : ''}`}>[ {projects.length.toString().padStart(2, '0')} PROJECTS ]</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className={`flex flex-col group bg-white reveal-hidden ${
              index !== projects.length - 1 ? 'border-b-4 md:border-b-0 md:border-r-4 border-black' : ''
            } ${isInView ? 'reveal-visible' : ''}`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="aspect-video bg-gray-200 border-b-4 border-black relative overflow-hidden">
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity z-10 duration-300"></div>
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex gap-2 mb-4 flex-wrap">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-black text-white text-xs font-bold border-2 border-black">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-3xl font-black text-black mb-4 uppercase leading-none tracking-tighter">
                {project.title}
              </h3>
              <p className="text-primary font-medium mb-8 flex-1 leading-relaxed">
                {project.description}
              </p>
              <div className="flex gap-4">
                <a href={project.githubUrl} className="flex-1 py-3 text-center bg-primary text-white font-bold border-4 border-black brutalist-shadow text-sm">
                  GITHUB
                </a>
                <a href={project.liveUrl} className="flex-1 py-3 text-center bg-white text-black font-bold border-4 border-black brutalist-shadow text-sm">
                  LIVE
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
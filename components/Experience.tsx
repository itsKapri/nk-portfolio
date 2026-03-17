import React from 'react';
import { useInView } from '../hooks/useInView';
import portfolioData from '../data/details.json';

const Experience: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { experience } = portfolioData;

  return (
    <section id="experience" ref={ref} className="p-8 md:p-16 border-b-4 border-black bg-background-light">
      <h2 className={`text-5xl font-black mb-16 text-black uppercase tracking-tighter reveal-hidden ${isInView ? 'reveal-visible' : ''}`}>Experience</h2>
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className={`absolute left-0 md:left-1/2 top-0 bottom-0 w-1 md:-ml-0.5 bg-black origin-top transition-transform duration-1000 ${isInView ? 'scale-y-100' : 'scale-y-0'}`}></div>
        
        {experience.map((exp, index) => {
          const isEven = index % 2 === 0;
          return (
            <div 
              key={index} 
              className={`relative mb-12 md:mb-24 flex flex-col md:flex-row items-start md:items-center reveal-hidden ${isInView ? 'reveal-visible' : ''}`}
              style={{ transitionDelay: `${index * 200 + 300}ms` }}
            >
              {/* Timeline Dot: Centered with the first line (Date Badge) */}
              <div className="absolute left-[-8px] md:left-1/2 md:-ml-4 w-5 h-5 md:w-8 md:h-8 bg-black border-4 border-primary z-10 top-2 md:top-auto hover:scale-125 transition-transform duration-300"></div>
              
              {/* Header Info (Date, Role, Company) */}
              <div className={`md:w-1/2 pl-8 md:pl-0 mb-4 md:mb-0 ${isEven ? 'md:pr-12 md:text-right md:order-1' : 'md:pl-12 md:text-left md:order-2'}`}>
                <div className="inline-block px-4 py-2 border-4 border-black bg-primary text-white font-black text-sm mb-2 hover:bg-black transition-colors cursor-default">
                  {exp.year}
                </div>
                <h3 className="text-2xl font-black text-black uppercase leading-none mb-1">{exp.role}</h3>
                <p className="text-primary font-bold uppercase tracking-wider text-sm">{exp.company}</p>
              </div>

              {/* Description */}
              <div className={`md:w-1/2 pl-8 md:pl-0 ${isEven ? 'md:pl-12 md:text-left md:order-2' : 'md:pr-12 md:text-right md:order-1'}`}>
                 <p className="text-primary font-medium leading-relaxed">{exp.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
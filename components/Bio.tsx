import React from 'react';
import { Smartphone, Layers, Globe, Database, Server, Shield } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import portfolioData from '../data/details.json';

const iconMap: Record<string, (className: string) => React.ReactNode> = {
  Smartphone: (className) => <Smartphone className={className} />,
  Layers: (className) => <Layers className={className} />,
  Globe: (className) => <Globe className={className} />,
  Database: (className) => <Database className={className} />,
  Server: (className) => <Server className={className} />,
  Shield: (className) => <Shield className={className} />,
};

const Bio: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const { techStack, personal } = portfolioData;

  return (
    <section id="about" ref={ref} className="grid grid-cols-1 lg:grid-cols-2 border-b-4 border-black">
      <div className="p-8 md:p-16 border-r-0 lg:border-r-4 border-black">
        <h2 className={`text-5xl font-black mb-8 text-black uppercase underline decoration-primary decoration-8 underline-offset-8 tracking-tighter leading-snug reveal-hidden ${isInView ? 'reveal-visible' : ''}`}>
          Bio & Expertise
        </h2>
        <div className={`space-y-6 text-lg font-medium text-black max-w-xl reveal-hidden stagger-1 ${isInView ? 'reveal-visible' : ''}`}>
          {personal.bioParagraphs.map((para, index) => (
            <p key={index}>{para}</p>
          ))}
        </div>
      </div>
      <div className="p-4 md:p-16 bg-black text-white">
        <h2 className={`text-5xl font-black mb-8 uppercase italic tracking-tighter reveal-hidden stagger-2 ${isInView ? 'reveal-visible' : ''}`}>Tech Stack</h2>
        <div className="grid grid-cols-2 gap-4">
          {techStack.map((tech, index) => (
            <div 
              key={index} 
              className={`border-4 border-white p-3 sm:p-4 flex flex-col items-start gap-3 sm:gap-4 hover:bg-primary transition-colors cursor-default group reveal-hidden ${isInView ? 'reveal-visible' : ''}`}
              style={{ transitionDelay: `${index * 50 + 300}ms` }}
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {iconMap[tech.icon]?.("w-8 h-8 md:w-10 md:h-10") || <Globe className="w-8 h-8 md:w-10 md:h-10" />}
              </div>
              <span className="font-black text-sm sm:text-lg md:text-xl uppercase leading-none break-words w-full">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bio;
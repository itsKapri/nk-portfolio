import React from 'react';
import { Smartphone, Layers, Globe, Database, Server, Shield } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import portfolioData from '../src/data/details.json';

const iconMap: Record<string, React.ReactNode> = {
  Smartphone: <Smartphone size={40} />,
  Layers: <Layers size={40} />,
  Globe: <Globe size={40} />,
  Database: <Database size={40} />,
  Server: <Server size={40} />,
  Shield: <Shield size={40} />,
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
      <div className="p-8 md:p-16 bg-black text-white">
        <h2 className={`text-5xl font-black mb-8 uppercase italic tracking-tighter reveal-hidden stagger-2 ${isInView ? 'reveal-visible' : ''}`}>Tech Stack</h2>
        <div className="grid grid-cols-2 gap-4">
          {techStack.map((tech, index) => (
            <div 
              key={index} 
              className={`border-4 border-white p-4 flex flex-col items-start gap-4 hover:bg-primary transition-colors cursor-default group reveal-hidden ${isInView ? 'reveal-visible' : ''}`}
              style={{ transitionDelay: `${index * 50 + 300}ms` }}
            >
              <div className="group-hover:scale-110 transition-transform duration-300">
                {iconMap[tech.icon] || <Globe size={40} />}
              </div>
              <span className="font-black text-xl uppercase leading-none">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bio;
import React from 'react';
import { useInView } from '../hooks/useInView';
import portfolioData from '../src/data/details.json';

const Hero: React.FC = () => {
  const { ref, isInView } = useInView();
  const { personal } = portfolioData;

  const firstName = personal.name.split(' ')[0];
  const lastName = personal.name.split(' ')[1];

  return (
    <section ref={ref} className="grid grid-cols-1 lg:grid-cols-12 border-b-4 border-black overflow-hidden">
      <div className="lg:col-span-8 p-8 md:p-16 border-r-0 lg:border-r-4 border-black">
        <h1 className={`text-7xl md:text-9xl font-black leading-none mb-6 text-black tracking-tighter reveal-hidden ${isInView ? 'reveal-visible' : ''}`}>
          {firstName}<br />{lastName}
        </h1>
        <p className={`text-xl md:text-3xl font-bold text-primary mb-12 uppercase italic reveal-hidden stagger-1 ${isInView ? 'reveal-visible' : ''}`}>
          {personal.title}
        </p>
        <div className={`flex flex-wrap gap-6 reveal-hidden stagger-2 ${isInView ? 'reveal-visible' : ''}`}>
          <a href={personal.resumeUrl} target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-primary text-white text-xl font-black uppercase border-4 border-black brutalist-shadow inline-block">
            View Resume
          </a>
          <a href="#contact" className="px-10 py-5 bg-white text-black text-xl font-black uppercase border-4 border-black brutalist-shadow inline-block">
            Contact Me
          </a>
        </div>
      </div>
      <div className="lg:col-span-4 bg-primary p-8 flex flex-col justify-end min-h-[400px]">
        <div className={`border-4 border-black p-6 bg-background-light brutalist-shadow reveal-hidden stagger-3 ${isInView ? 'reveal-visible' : ''}`}>
          <p className="text-black font-black uppercase leading-tight text-2xl">
            {personal.heroTagline}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
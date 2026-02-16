import React from 'react';
import { Terminal } from 'lucide-react';
import portfolioData from '../src/data/details.json';

const Navbar: React.FC = () => {
  const { navigation, personal } = portfolioData;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b-4 border-black bg-background-light px-6 py-4">
      <div className="flex items-center gap-3 group cursor-pointer">
        <Terminal className="w-10 h-10 text-primary transition-transform duration-300 group-hover:rotate-12" strokeWidth={2.5} />
        <span className="text-2xl font-black tracking-tighter uppercase text-black">
          {personal.shortName}
        </span>
      </div>
      <div className="hidden md:flex gap-8 items-center uppercase font-bold text-sm tracking-widest text-black">
        {navigation.map((item) => (
          <a 
            key={item.label}
            href={item.href} 
            className="relative hover:text-primary transition-colors after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-1 after:bottom-[-4px] after:left-0 after:bg-primary after:origin-bottom-right hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            {item.label}
          </a>
        ))}
        <a 
          href="#contact" 
          className="px-6 py-2 border-4 border-black bg-primary text-white brutalist-shadow"
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
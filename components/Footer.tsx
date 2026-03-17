import React from 'react';
import portfolioData from '../data/details.json';

const Footer: React.FC = () => {
  const { socialLinks, personal } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-8 flex flex-col md:flex-row justify-between items-center bg-black text-white">
      <p className="text-gray-400 font-bold uppercase text-sm tracking-wider">
        © {currentYear} {personal.name}. ALL RIGHTS RESERVED.
      </p>
      <div className="flex gap-8 mt-4 md:mt-0 uppercase font-black text-sm tracking-widest">
        {socialLinks.map((link) => (
          <a 
            key={link.label}
            href={link.href} 
            className="hover:text-primary hover:text-white/70 transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-2px] after:left-0 after:bg-white after:origin-bottom-right hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
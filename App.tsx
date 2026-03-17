import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Bio from './components/Bio';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen border-x-4 border-black max-w-[1400px] mx-auto grid-bg relative">
      <Navbar />
      <main>
        <Hero />
        <Bio />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Roadmap } from './components/Roadmap';
import { Team } from './components/Team';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-green-200 selection:text-green-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Roadmap />
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default App;
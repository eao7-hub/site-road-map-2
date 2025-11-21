import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { KPIs } from './components/KPIs';
import { Roadmap } from './components/Roadmap';
import { Team } from './components/Team';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check system preference on mount
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-green-200 selection:text-green-900 dark:selection:bg-green-900 dark:selection:text-green-100 transition-colors duration-300">
      <Navbar toggleTheme={toggleTheme} isDark={isDark} />
      <main>
        <Hero />
        <About />
        <KPIs />
        <Roadmap />
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Sun, Moon, Mail } from 'lucide-react';

interface NavbarProps {
  toggleTheme: () => void;
  isDark: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDark }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Detecta scroll no elemento principal que tem overflow (App container) ou na janela
      // Como usamos scroll snap no div principal, o window.scrollY pode ser 0
      const scrollContainer = document.querySelector('.overflow-y-scroll');
      if (scrollContainer) {
          setIsScrolled(scrollContainer.scrollTop > 20);
      } else {
          setIsScrolled(window.scrollY > 20);
      }
    };

    const scrollContainer = document.querySelector('.overflow-y-scroll');
    const target = scrollContainer || window;
    
    target.addEventListener('scroll', handleScroll);
    return () => target.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-md py-3 border-b border-slate-200 dark:border-slate-800' 
          : 'bg-slate-900/80 backdrop-blur-md border-b border-white/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <div className={`p-2 rounded-full ${isScrolled ? 'bg-green-600 text-white' : 'bg-white text-green-700'}`}>
            <Zap size={20} fill="currentColor" />
          </div>
          <span className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-slate-800 dark:text-white' : 'text-white'}`}>
            EcoMinas<span className="text-green-500">H2V</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {['Sobre', 'KPIs', 'Mapa', 'Autores'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
              className={`font-medium transition-colors ${
                isScrolled 
                  ? 'text-slate-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-green-400' 
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
          
          <div className={`h-6 w-px mx-2 ${isScrolled ? 'bg-slate-300 dark:bg-slate-700' : 'bg-white/20'}`}></div>

          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              isScrolled 
                ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800' 
                : 'text-white hover:bg-white/10'
            }`}
            title={isDark ? "Modo Claro" : "Modo Escuro"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <a 
            href="mailto:geracaodeenergiaifnmg@gmail.com"
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
               isScrolled
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-200'
                : 'bg-white text-green-700 hover:bg-green-50'
            }`}
          >
            <Mail size={16} />
            Contato
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
           <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isScrolled ? 'text-slate-600 dark:text-slate-300' : 'text-white'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button
            className={`p-2 ${isScrolled ? 'text-slate-600 dark:text-slate-300' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 shadow-lg py-4 px-6 flex flex-col gap-4">
          {['Sobre', 'KPIs', 'Mapa', 'Autores'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
              className="text-left text-slate-600 dark:text-slate-300 font-medium py-2 border-b border-slate-50 dark:border-slate-800 last:border-0"
            >
              {item}
            </button>
          ))}
          <a 
            href="mailto:geracaodeenergiaifnmg@gmail.com"
            className="flex items-center justify-center gap-2 w-full py-3 mt-2 bg-green-600 text-white rounded-lg font-medium"
          >
            <Mail size={18} />
            Entrar em Contato
          </a>
        </div>
      )}
    </nav>
  );
};
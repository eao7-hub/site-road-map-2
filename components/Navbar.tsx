import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Zap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
          <div className={`p-2 rounded-full ${isScrolled ? 'bg-green-600 text-white' : 'bg-white text-green-700'}`}>
            <Zap size={20} fill="currentColor" />
          </div>
          <span className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-slate-800' : 'text-white'}`}>
            EcoMinas<span className="text-green-500">H2V</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {['Sobre', 'Mapa', 'Autores'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
              className={`font-medium transition-colors ${
                isScrolled ? 'text-slate-600 hover:text-green-600' : 'text-slate-200 hover:text-white'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-slate-800' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-slate-800' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-lg py-4 px-6 flex flex-col gap-4">
          {['Sobre', 'Mapa', 'Autores'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
              className="text-left text-slate-600 font-medium py-2 border-b border-slate-50 last:border-0"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
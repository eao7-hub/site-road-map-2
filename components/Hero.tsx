import React from 'react';
import { ArrowDown, Map as MapIcon } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToMap = () => {
    document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2072&auto=format&fit=crop" 
          alt="Painéis Solares e Natureza" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-green-900/80 to-slate-900/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6 mt-16">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-400/30 backdrop-blur-sm">
          <span className="text-green-300 font-semibold text-sm uppercase tracking-wider">Estudo Estratégico MG</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Integração da Energia Solar à <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">
            Produção de Hidrogênio Verde
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Uma análise espacial e estratégica aplicada ao estado de Minas Gerais para o desenvolvimento sustentável.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={scrollToMap}
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-green-500/30"
          >
            <MapIcon size={20} />
            Explorar Roadmap
          </button>
          <button 
            onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-lg font-semibold transition-all"
          >
            Saiba Mais
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <ArrowDown size={24} />
      </div>
    </section>
  );
};
import React from 'react';
import { ArrowDown, Map as MapIcon } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToMap = () => {
    document.getElementById('mapa')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-24 pb-12 md:pt-20 md:pb-10">
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
      <div className="relative z-10 text-center max-w-5xl px-6 flex flex-col items-center justify-center w-full h-full">
        
        <div className="animate-fade-in-down mb-6">
          <div className="inline-block mb-4 px-6 py-2 rounded-full bg-green-500/20 border border-green-400/30 backdrop-blur-md shadow-lg hover:bg-green-500/30 transition-colors cursor-default">
            <span className="text-green-300 font-bold text-sm uppercase tracking-widest">Estudo Estratégico MG</span>
          </div>
          
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight tracking-tight drop-shadow-lg">
            Integração da Energia Solar à <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-green-200">
              Produção de H₂V
            </span>
          </h1>
          
          <p className="text-base md:text-xl text-slate-200 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed font-light shadow-black drop-shadow-md">
            Análise estratégica para a integração da energia solar fotovoltaica à produção de hidrogênio verde em Minas Gerais.
          </p>
        </div>
        
        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-2xl px-4">
          <button 
            onClick={scrollToMap}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-green-500/40 hover:-translate-y-1 whitespace-normal sm:whitespace-nowrap"
          >
            <MapIcon size={22} className="flex-shrink-0" />
            Explorar Roadmap
          </button>
          <button 
            onClick={() => document.getElementById('kpis')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-4 rounded-xl font-bold text-lg transition-all hover:-translate-y-1 whitespace-normal sm:whitespace-nowrap"
          >
            Ver Indicadores
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-white/50 hidden md:block">
          <ArrowDown size={24} />
        </div>
      </div>
    </section>
  );
};
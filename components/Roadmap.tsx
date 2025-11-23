import React from 'react';
import { Maximize2 } from 'lucide-react';

export const Roadmap: React.FC = () => {
  const mapUrl = "https://roadmapgeracaoenergiaa.on.drv.tw/roadmap/#7/-18.297/-45.099";

  return (
    <section id="mapa" className="w-full h-screen bg-white dark:bg-slate-950 transition-colors duration-300 flex flex-col pt-24 pb-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
        
        {/* Header da Seção */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-4 shrink-0 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Roadmap Interativo</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Explore o mapa de potencialidades e infraestrutura.</p>
          </div>
          
          <a 
            href={mapUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm text-sm"
          >
            <Maximize2 size={16} />
            Abrir em Tela Cheia
          </a>
        </div>

        {/* Container do Iframe - Usa flex-grow para ocupar todo o espaço restante da tela */}
        <div className="flex-grow w-full bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <p className="text-slate-400 animate-pulse">Carregando mapa...</p>
            </div>
            <iframe 
                src={mapUrl} 
                title="Roadmap Solar H2V Minas Gerais"
                className="absolute inset-0 w-full h-full border-0 z-10"
                loading="lazy"
                allowFullScreen
            ></iframe>
        </div>
        
        {/* Rodapé sutil */}
        <div className="mt-2 text-center shrink-0">
             <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                Instituto Federal do Norte de Minas Gerais
            </p>
        </div>
      </div>
    </section>
  );
};
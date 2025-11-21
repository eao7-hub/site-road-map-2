import React from 'react';
import { Maximize2 } from 'lucide-react';

export const Roadmap: React.FC = () => {
  const mapUrl = "https://roadmapgeracaoenergiaa.on.drv.tw/roadmap/#7/-18.297/-45.099";

  return (
    <section id="mapa" className="py-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Roadmap Interativo</h2>
            <p className="text-slate-600 dark:text-slate-400">Explore o mapa de potencialidades e infraestrutura.</p>
          </div>
          <a 
            href={mapUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-lg hover:bg-green-50 dark:hover:bg-slate-700 hover:text-green-700 dark:hover:text-green-400 transition-colors shadow-sm text-sm"
          >
            <Maximize2 size={16} />
            Tela Cheia
          </a>
        </div>

        {/* Altura reduzida conforme solicitado: h-64 (mobile) e md:h-96 (desktop) */}
        <div className="relative w-full h-64 md:h-96 bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
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
        
        <div className="mt-3 text-center">
             <p className="text-xs text-slate-500 dark:text-slate-400">
                Visualização otimizada para Desktop. <a href={mapUrl} target="_blank" rel="noreferrer" className="text-green-600 dark:text-green-400 underline hover:text-green-800">Abrir link direto</a>.
            </p>
        </div>
      </div>
    </section>
  );
};
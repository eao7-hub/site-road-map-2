import React from 'react';
import { ExternalLink, Maximize2 } from 'lucide-react';

export const Roadmap: React.FC = () => {
  const mapUrl = "https://roadmapgeracaoenergiaa.on.drv.tw/roadmap/#7/-18.297/-45.099";

  return (
    <section id="mapa" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Roadmap Interativo</h2>
            <p className="text-slate-600">Explore o mapa de potencialidades e infraestrutura.</p>
          </div>
          <a 
            href={mapUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 hover:text-green-700 transition-colors shadow-sm"
          >
            <Maximize2 size={18} />
            Abrir em Tela Cheia
          </a>
        </div>

        <div className="relative w-full h-[600px] bg-slate-200 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <p className="text-slate-400">Carregando mapa...</p>
            </div>
            <iframe 
                src={mapUrl} 
                title="Roadmap Solar H2V Minas Gerais"
                className="absolute inset-0 w-full h-full border-0 z-10"
                allowFullScreen
            ></iframe>
        </div>
        
        <div className="mt-4 text-center">
             <p className="text-sm text-slate-500">
                Problemas para visualizar? <a href={mapUrl} target="_blank" rel="noreferrer" className="text-green-600 underline hover:text-green-800">Clique aqui</a> para abrir diretamente.
            </p>
        </div>
      </div>
    </section>
  );
};
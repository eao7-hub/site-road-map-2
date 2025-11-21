import React from 'react';
import { Users } from 'lucide-react';
import { Author } from '../types';

export const Team: React.FC = () => {
  const authors: Author[] = [
    { name: "Eduardo Alves de Oliveira", institution: "IFNMG Campus Montes Claros" },
    { name: "Gustavo Alves de Oliveira", institution: "IFNMG Campus Montes Claros" },
    { name: "Marcos Vinicius Mendes da Silva", institution: "IFNMG Campus Montes Claros" },
    { name: "Matheus de Alencar Veloso", institution: "IFNMG Campus Montes Claros" },
    { name: "Leandro Almeida Vasconcelos", institution: "IFNMG Campus Montes Claros" },
  ];

  return (
    <section id="autores" className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full mb-4 shadow-sm">
            <Users size={28} />
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Equipe Técnica</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Pesquisadores e especialistas do Instituto Federal do Norte de Minas Gerais dedicados ao estudo energético.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
          {authors.map((author, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-6 text-slate-500 dark:text-slate-400 shadow-inner">
                <span className="font-bold text-2xl text-green-600 dark:text-green-400">{author.name.charAt(0)}</span>
              </div>
              
              <h3 className="font-bold text-xl text-slate-800 dark:text-white mb-2">{author.name}</h3>
              
              <div className="h-1 w-12 bg-green-500 rounded-full mb-4"></div>
              
              <p className="text-slate-600 dark:text-slate-300 font-medium text-sm bg-slate-50 dark:bg-slate-900/50 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                {author.institution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
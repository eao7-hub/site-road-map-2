import React from 'react';
import { Users, GraduationCap } from 'lucide-react';
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
    <section id="autores" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-60"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-600 rounded-full mb-4">
            <Users size={24} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Equipe Técnica</h2>
          <p className="mt-2 text-slate-500">Pesquisadores e Desenvolvedores</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-center">
          {authors.map((author, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:border-green-200 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                <span className="text-xl font-bold">{author.name.charAt(0)}</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-1">{author.name}</h3>
              <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-auto">
                <GraduationCap size={14} />
                <span>{author.institution}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-slate-900 rounded-2xl text-center text-white">
          <h3 className="text-xl font-bold mb-2">Instituto Federal do Norte de Minas Gerais</h3>
          <p className="text-slate-400">Campus Montes Claros</p>
        </div>
      </div>
    </section>
  );
};
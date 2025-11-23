import React from 'react';
import { Users, Mail, Linkedin } from 'lucide-react';
import { Author } from '../types';

const TeamMemberCard: React.FC<{ author: Author }> = ({ author }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:-translate-y-1 flex items-center justify-between gap-4 group h-full">
      
      {/* Info Section */}
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white leading-tight mb-1 truncate" title={author.name}>
          {author.name}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm truncate" title={author.institution}>
          {author.institution}
        </p>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {author.email && (
          <a
            href={`mailto:${author.email}`}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-green-100 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400 transition-colors"
            title="Enviar Email"
          >
            <Mail size={18} />
          </a>
        )}

        {author.linkedin && (
          <a
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        )}
      </div>
    </div>
  );
};

export const Team: React.FC = () => {
  const authors: Author[] = [
    { 
      name: "Eduardo Alves de Oliveira", 
      institution: "IFNMG Campus Montes Claros",
      email: "eao7@aluno.ifnmg.edu.br",
      linkedin: "http://linkedin.com/in/eduardo-oliveira-69a462390"
    },
    { 
      name: "Marcos Vinicius Mendes da Silva", 
      institution: "IFNMG Campus Montes Claros",
      email: "mvms3@aluno.ifnmg.edu.br",
      linkedin: "https://www.linkedin.com/in/marcos-mendes-4b6894380?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    },
    { 
      name: "Matheus de Alencar Veloso", 
      institution: "IFNMG Campus Montes Claros",
      email: "mav6@aluno.ifnmg.edu.br",
      linkedin: "https://www.linkedin.com/in/matheus-d-64aa38235?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    },
    { 
      name: "Leandro Almeida Vasconcelos", 
      institution: "IFNMG Campus Montes Claros",
      email: "leandro.vasconcelos@ifnmg.edu.br",
      linkedin: "https://www.linkedin.com/in/leandro-almeida-vasconcelos-4436a548?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    },
    { 
      name: "Gustavo Alves de Oliveira", 
      institution: "IFNMG Campus Montes Claros",
      email: "gao7@aluno.ifnmg.edu.br",
      linkedin: "https://www.linkedin.com/in/gustavo-oliveira-12370338b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
    },
  ];

  return (
    <section id="autores" className="w-full py-20 bg-slate-50 dark:bg-slate-900 relative overflow-hidden transition-colors duration-300 flex items-center justify-center">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>
      
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full mb-4 shadow-sm">
            <Users size={28} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Equipe Técnica</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Estudantes pesquisadores dedicados ao desenvolvimento do projeto.
          </p>
        </div>

        {/* 
           Layout Flexbox Corrigido:
           - gap-6: Espaçamento de 1.5rem.
           - w-[calc(50%-0.75rem)]: 50% da largura menos METADE do gap. Isso garante que 2 cards somem exatamente 100% + 1 gap.
           - Isso alinha as bordas externas perfeitamente.
        */}
        <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          {authors.map((author, index) => (
            <div key={index} className="w-full md:w-[calc(50%-0.75rem)]">
              <TeamMemberCard author={author} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
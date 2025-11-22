import React, { useState } from 'react';
import { Users, Mail, Linkedin } from 'lucide-react';
import { Author } from '../types';

// Helper to generate consistent color
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const c = (hash & 0x00ffffff).toString(16).toUpperCase();
  return '#' + '00000'.substring(0, 6 - c.length) + c;
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

const TeamMemberCard: React.FC<{ author: Author }> = ({ author }) => {
  // Extract base name from provided image path (removes extension and ./ prefix)
  // This allows the component to try multiple extensions regardless of input
  const baseImageName = author.image 
    ? author.image.split('/').pop()?.replace(/\.(jpeg|jpg|png)$/i, '')
    : '';
  
  const extensions = ['.jpeg', '.jpg', '.png'];
  const [extIndex, setExtIndex] = useState(0);
  const [imgSrc, setImgSrc] = useState(baseImageName ? `./${baseImageName}${extensions[0]}` : null);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    const nextIndex = extIndex + 1;
    if (nextIndex < extensions.length) {
      setExtIndex(nextIndex);
      setImgSrc(`./${baseImageName}${extensions[nextIndex]}`);
    } else {
      setHasError(true);
    }
  };

  const bgGradient = `linear-gradient(135deg, ${stringToColor(author.name)}40, ${stringToColor(author.name)}80)`;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center h-full">
      <div className="relative w-28 h-28 mb-5">
        <div className="w-full h-full rounded-full border-4 border-slate-50 dark:border-slate-700 shadow-md overflow-hidden bg-slate-100 flex-shrink-0 relative z-10">
          {!hasError && imgSrc ? (
            <img
              src={imgSrc}
              alt={author.name}
              className="w-full h-full object-cover"
              onError={handleError}
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: bgGradient }}
            >
              <span className="font-bold text-3xl text-slate-700 dark:text-slate-200 drop-shadow-sm">
                {getInitials(author.name)}
              </span>
            </div>
          )}
        </div>
      </div>

      <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1 leading-tight">{author.name}</h3>

      <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6">
        {author.institution}
      </p>

      <div className="flex gap-3 w-full mt-auto pt-4 border-t border-slate-100 dark:border-slate-700/50">
        {author.email && (
          <a
            href={`mailto:${author.email}`}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400 transition-colors"
            title="Enviar Email"
          >
            <Mail size={16} />
            Email
          </a>
        )}

        {author.linkedin && (
          <a
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300 transition-colors"
            title="LinkedIn"
          >
            <Linkedin size={16} />
            LinkedIn
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
      linkedin: "http://linkedin.com/in/eduardo-oliveira-69a462390",
      image: "./eduardo"
    },
    { 
      name: "Marcos Vinicius Mendes da Silva", 
      institution: "IFNMG Campus Montes Claros",
      email: "mvms3@aluno.ifnmg.edu.br",
      linkedin: "https://www.linkedin.com/in/marcos-mendes-4b6894380?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      image: "./marcos"
    },
    { 
      name: "Matheus de Alencar Veloso", 
      institution: "IFNMG Campus Montes Claros",
      email: "mav6@aluno.ifnmg.edu.br",
      linkedin: "https://www.linkedin.com/in/matheus-d-64aa38235?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      image: "./matheus"
    },
    { 
      name: "Leandro Almeida Vasconcelos", 
      institution: "IFNMG Campus Montes Claros",
      email: "leandro.vasconcelos@ifnmg.edu.br",
      linkedin: "https://www.linkedin.com/in/leandro-almeida-vasconcelos-4436a548?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      image: "./leandro"
    },
    { 
      name: "Gustavo Alves de Oliveira", 
      institution: "IFNMG Campus Montes Claros",
      email: "gao7@aluno.ifnmg.edu.br",
      linkedin: "https://www.linkedin.com/in/gustavo-oliveira-12370338b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      image: "./gustavo"
    },
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
          {authors.map((author, index) => (
            <TeamMemberCard key={index} author={author} />
          ))}
        </div>
      </div>
    </section>
  );
};
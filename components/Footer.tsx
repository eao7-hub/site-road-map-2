import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <span className="text-2xl font-bold text-white tracking-tight">
            EcoMinas<span className="text-green-500">H2V</span>
          </span>
          <p className="text-slate-500 text-sm mt-2 max-w-xs">
            Estudo aplicado para o futuro energético sustentável de Minas Gerais.
          </p>
        </div>
        
        <div className="text-slate-500 text-sm text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
          <p>Desenvolvido para fins acadêmicos e científicos.</p>
        </div>
      </div>
    </footer>
  );
};
import React from 'react';
import { Sun, Factory, Leaf, TrendingUp } from 'lucide-react';

export const About: React.FC = () => {
  const features = [
    {
      icon: <Sun className="w-8 h-8 text-orange-500" />,
      title: "Potencial Fotovoltaico",
      description: "Análise da irradiação solar em Minas Gerais para identificar as áreas mais promissoras."
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-500" />,
      title: "Hidrogênio Verde",
      description: "Estratégias para produção de H2V utilizando fontes renováveis e limpas."
    },
    {
      icon: <Factory className="w-8 h-8 text-blue-500" />,
      title: "Infraestrutura",
      description: "Integração com a malha energética existente e polos industriais do estado."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-500" />,
      title: "Desenvolvimento",
      description: "Fomento à economia regional e sustentabilidade através de novas tecnologias."
    }
  ];

  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Sobre o Projeto</h2>
          <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            Este estudo apresenta um roadmap detalhado para a integração da geração de energia solar fotovoltaica 
            à cadeia de produção de hidrogênio verde. Com foco no estado de Minas Gerais, o projeto mapeia 
            oportunidades estratégicas visando a transição energética.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-lg transition-all duration-300 group">
              <div className="mb-4 p-3 bg-white rounded-lg inline-block shadow-sm group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
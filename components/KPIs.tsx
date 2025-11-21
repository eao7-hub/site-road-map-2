import React from 'react';
import { Zap, Sun, MapPin, Award, TrendingUp, Target } from 'lucide-react';

export const KPIs: React.FC = () => {
  
  const topRegions = [
    {
      rank: 1,
      name: "Triângulo Mineiro",
      description: "Destaca-se pela elevada potência instalada de hidrelétricas, alto PIB, além de boa irradiância e velocidade do vento, oferecendo infraestrutura robusta.",
      highlight: "Infraestrutura & Economia"
    },
    {
      rank: 2,
      name: "Norte de Minas",
      description: "Apresenta a maior potência fotovoltaica instalada e os maiores índices de irradiância solar do estado, ideal para geração solar contínua.",
      highlight: "Máximo Potencial Solar"
    },
    {
      rank: 3,
      name: "Noroeste de Minas",
      description: "Combina elevado potencial fotovoltaico, PIB significativo e boas condições de irradiância e disponibilidade hídrica.",
      highlight: "Hídrico & Fotovoltaico"
    }
  ];

  return (
    <section id="kpis" className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Potencial Estratégico</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Panorama da capacidade instalada e as regiões mais promissoras para a integração da energia solar ao Hidrogênio Verde.
          </p>
        </div>

        {/* Destaque Principal - Potência Solar */}
        <div className="mb-20">
          <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl shadow-xl text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Decorative Background Pattern */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>

            <div className="relative z-10 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2 opacity-90">
                <Sun className="w-6 h-6" />
                <span className="font-semibold tracking-wider uppercase text-sm">Potência Fotovoltaica Instalada</span>
              </div>
              <h3 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-2">
                13,3 <span className="text-4xl md:text-6xl">GW</span>
              </h3>
              <p className="text-orange-100 text-lg max-w-md">
                Capacidade total de geração solar mapeada no estado de Minas Gerais, consolidando sua liderança na transição energética.
              </p>
            </div>

            <div className="relative z-10 bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 max-w-xs w-full">
               <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-full text-orange-500">
                    <Zap size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-xl">Energia Limpa</p>
                    <p className="text-sm text-orange-50 leading-relaxed mt-1">Base essencial para a eletrólise da água e produção de Hidrogênio Verde sem emissões de carbono.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Top 3 Regiões */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Award className="text-green-600 dark:text-green-400" size={28} />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Regiões Mais Favoráveis</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topRegions.map((region) => (
              <div key={region.rank} className="bg-white dark:bg-slate-800 rounded-xl p-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="h-full p-6 rounded-lg bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-100 dark:border-slate-700 flex flex-col relative overflow-hidden">
                  
                  {/* Ranking Badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-700 dark:text-green-400 font-bold text-lg border border-green-200 dark:border-green-800">
                    #{region.rank}
                  </div>

                  <div className="mb-4 mt-2">
                    <span className="inline-block py-1 px-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-bold uppercase tracking-wide mb-3">
                      {region.highlight}
                    </span>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <MapPin size={20} className="text-slate-400" />
                      {region.name}
                    </h4>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                    {region.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                    <TrendingUp size={16} className="mr-2" />
                    Alta Viabilidade
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metodologia Pontos Estratégicos */}
        <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
           <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 hidden sm:block">
                 <Target size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Pontos Estratégicos Definidos</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Após a seleção das três mesorregiões mais favoráveis, foram identificados <strong className="text-slate-900 dark:text-slate-200">três pontos estratégicos</strong> em cada uma delas. Essa definição partiu de uma análise visual considerando a proximidade a <span className="text-green-600 dark:text-green-400">recursos hídricos</span> (necessários para eletrólise), <span className="text-green-600 dark:text-green-400">linhas de transmissão</span> e <span className="text-green-600 dark:text-green-400">rodovias</span>. Esses locais reúnem as melhores condições ambientais e logísticas para a implantação dos sistemas de produção.
                </p>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};
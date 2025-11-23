// Simulação de serviço de IA para dados dinâmicos do mapa
// Preparado para integração real com @google/genai no futuro

export interface RegionData {
  title: string;
  description: string;
  stats?: string;
}

const MOCK_DB: Record<string, RegionData> = {
  'Minas Gerais': {
    title: 'Liderança Fotovoltaica',
    description: 'Estado com maior capacidade instalada de geração distribuída solar no Brasil.',
    stats: '13.3 GW'
  },
  'Bahia': {
    title: 'Energia Eólica',
    description: 'Destaque nacional na geração de energia a partir dos ventos.',
  }
};

export const getRegionInfo = async (regionName: string): Promise<RegionData> => {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Fallback seguro
  return MOCK_DB[regionName] || {
    title: regionName,
    description: 'Dados estratégicos em análise.',
  };
};
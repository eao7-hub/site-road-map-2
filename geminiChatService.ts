import { ARTICLE_CONTENT, ARTICLE_TITLE } from "./articleData";

// BANCO DE CONHECIMENTO SIMULADO (MOCK)
// Usado quando não há API Key configurada, para que o site funcione publicamente sem custos.
const KNOWLEDGE_BASE = [
  {
    keywords: ['autor', 'quem', 'equipe', 'criou', 'pesquisador', 'autores'],
    response: "Os autores deste estudo são do IFNMG - Campus Montes Claros:\n\n• Eduardo Alves de Oliveira\n• Gustavo Alves de Oliveira\n• Marcos Vinicius Mendes da Silva\n• Matheus de Alencar Veloso\n• Leandro Almeida Vasconcelos"
  },
  {
    keywords: ['região', 'regiões', 'local', 'onde', 'melhor', 'favoráveis', 'favoraveis'],
    response: "O estudo identificou 3 mesorregiões com maior potencial para Hidrogênio Verde em MG:\n\n1. Triângulo Mineiro (Infraestrutura e Água)\n2. Norte de Minas (Maior Irradiação Solar)\n3. Noroeste de Minas (Potencial Híbrido)\n\nEssas áreas combinam sol, água e logística."
  },
  {
    keywords: ['uberaba', 'triângulo', 'triangulo'],
    response: "Uberaba é um destaque no estudo! O município vem recebendo aportes milionários e caminha para se tornar o maior polo produtor de hidrogênio verde do Brasil, aproveitando a infraestrutura do Triângulo Mineiro."
  },
  {
    keywords: ['solar', 'fotovoltaica', 'sol', 'irradiação', 'dni'],
    response: "Minas Gerais é líder nacional em energia solar! A irradiação solar (DNI) é o fator chave. O Norte de Minas possui os maiores índices, sendo ideal para alimentar os eletrolisadores que produzem o hidrogênio verde."
  },
  {
    keywords: ['hidrogênio', 'h2v', 'verde', 'hidrogenio'],
    response: "O Hidrogênio Verde (H₂V) é produzido separando a água (H₂O) em hidrogênio e oxigênio usando eletricidade limpa (solar). Ele serve para armazenar energia e descarbonizar indústrias que não podem usar apenas eletricidade, como siderúrgicas e fertilizantes."
  },
  {
    keywords: ['crescimento', 'aumento', 'potência', 'potencia'],
    response: "O estudo aponta um crescimento exponencial! A potência instalada de energia solar em Minas Gerais teve um aumento de mais de 2.000% em apenas seis anos, consolidando o estado como protagonista na transição energética."
  },
  {
    keywords: ['conclusão', 'resumo', 'resultado', 'conclusao'],
    response: "A conclusão é que Minas Gerais tem TUDO para liderar a produção de H₂V: recursos naturais abundantes (sol e água) e infraestrutura. O estudo validou a viabilidade técnica e econômica, especialmente integrando as usinas solares com a rede elétrica existente."
  }
];

const findMockResponse = async (query: string): Promise<string> => {
  // Simula tempo de "pensamento" da IA
  await new Promise(resolve => setTimeout(resolve, 1000));

  const lowerQuery = query.toLowerCase();
  
  // Procura a melhor resposta baseada nas palavras-chave
  const match = KNOWLEDGE_BASE.find(item => 
    item.keywords.some(keyword => lowerQuery.includes(keyword))
  );

  if (match) return match.response;

  // Resposta genérica inteligente se não entender
  return `Interessante pergunta! Como estou no modo de demonstração (sem API Key), posso te contar sobre:\n\n• As Melhores Regiões\n• O Potencial Solar de MG\n• O caso de Uberaba\n• Quem são os Autores\n\nTente perguntar sobre um desses tópicos!`;
};

// Função Real (Se tiver API Key)
const generateContentViaREST = async (apiKey: string, prompt: string, systemInstruction: string) => {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] },
        generationConfig: { temperature: 0.3 }
      })
    });

    if (!response.ok) throw new Error("API Error");

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (e) {
    return null; // Retorna null para acionar o Mock
  }
};

export const sendMessageToGemini = async (userMessage: string, history: { role: string, text: string }[] = []) => {
  const apiKey = process.env.API_KEY;

  // Se tiver chave, tenta usar a IA Real
  if (apiKey) {
    const systemInstruction = `
      Você é um assistente especialista e co-autor virtual do artigo científico: "${ARTICLE_TITLE}".
      
      AUTORES DO PROJETO:
      - Eduardo Alves de Oliveira¹
      - Gustavo Alves de Oliveira¹
      - Marcos Vinicius Mendes da Silva¹
      - Matheus de Alencar Veloso¹
      - Leandro Almeida Vasconcelos¹
      
      (1) Instituto Federal do Norte de Minas Gerais, Campus Montes Claros
      
      Seu objetivo é explicar o artigo para o usuário, tirar dúvidas e fornecer insights baseados EXCLUSIVAMENTE no conteúdo do artigo fornecido abaixo.
      
      CONTEÚDO DO ARTIGO:
      ${ARTICLE_CONTENT}
    `;
    
    // Constrói histórico simplificado
    const conversationContext = history.map(msg => `${msg.role}: ${msg.text}`).join('\n');
    const fullPrompt = `${conversationContext}\nUser: ${userMessage}\nAssistant:`;

    const aiResponse = await generateContentViaREST(apiKey, fullPrompt, systemInstruction);
    
    if (aiResponse) return aiResponse;
  }

  // Se não tiver chave OU se a API falhar, usa o Mock Local (Fallback Robusto)
  console.log("Usando IA Simulada (Modo Offline/Demo)");
  return await findMockResponse(userMessage);
};
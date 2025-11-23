import { ARTICLE_CONTENT, ARTICLE_TITLE } from "./articleData";

// Utiliza fetch diretamente para evitar erros de build com o SDK em ambientes restritos (Vercel/Zero Config)
const generateContentViaREST = async (apiKey: string, prompt: string, systemInstruction: string) => {
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

  if (!response.ok) {
    console.warn("Gemini API Error");
    return "O serviço de IA está temporariamente indisponível. Verifique a chave de API ou tente mais tarde.";
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Não consegui processar sua pergunta no momento.";
};

export const sendMessageToGemini = async (userMessage: string, history: { role: string, text: string }[] = []) => {
  // FALLBACK DE SEGURANÇA
  // Se o usuário não configurou a API Key, retorna resposta simulada para não quebrar o app.
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return `Olá! Estou em modo de demonstração (sem chave de API configurada).
    
    Sobre o artigo "${ARTICLE_TITLE}":
    
    AUTORES:
    - Eduardo Alves de Oliveira¹
    - Gustavo Alves de Oliveira¹
    - Marcos Vinicius Mendes da Silva¹
    - Matheus de Alencar Veloso¹
    - Leandro Almeida Vasconcelos¹
    (1) IFNMG - Campus Montes Claros
    
    DESTAQUES:
    - Regiões Norte e Triângulo Mineiro são ideais para H2V.
    - Crescimento da energia solar em MG é exponencial (+2000% em 6 anos).
    
    Para habilitar o chat completo, configure a variável de ambiente API_KEY.`;
  }

  try {
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
      
      Diretrizes:
      1. Use uma linguagem clara, educada e acadêmica, mas acessível.
      2. Seja conciso nas respostas.
      3. Cite seções do artigo quando apropriado.
      
      CONTEÚDO DO ARTIGO:
      ${ARTICLE_CONTENT}
    `;

    const conversationContext = history.map(msg => `${msg.role === 'user' ? 'Usuário' : 'Assistente'}: ${msg.text}`).join('\n');
    
    const fullPrompt = `
      Histórico da conversa:
      ${conversationContext}
      
      Usuário: ${userMessage}
      
      Resposta do Assistente:
    `;

    return await generateContentViaREST(apiKey, fullPrompt, systemInstruction);

  } catch (error) {
    console.error("Erro no serviço Gemini:", error);
    return "Desculpe, ocorreu um erro técnico ao conectar com a Inteligência Artificial.";
  }
};
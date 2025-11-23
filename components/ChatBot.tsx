import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../geminiChatService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: 'Olá! Sou a IA especialista neste artigo sobre H₂V e Energia Solar em Minas Gerais. Como posso te ajudar a entender o estudo?' 
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    
    // Add user message
    const newMessages = [...messages, { role: 'user' as const, text: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    // Get AI response
    try {
      const responseText = await sendMessageToGemini(userMsg, newMessages);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Desculpe, tive um problema técnico. Tente novamente." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
          isOpen 
            ? 'bg-slate-800 text-white rotate-90' 
            : 'bg-green-600 text-white hover:bg-green-500'
        }`}
        title="Tirar dúvidas sobre o artigo"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-6 z-40 w-[90vw] md:w-[400px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-300 origin-bottom-right flex flex-col ${
          isOpen 
            ? 'scale-100 opacity-100 translate-y-0 max-h-[600px] h-[70vh]' 
            : 'scale-0 opacity-0 translate-y-10 h-0'
        }`}
      >
        {/* Header */}
        <div className="bg-slate-900 p-4 flex items-center gap-3 border-b border-slate-800">
          <div className="p-2 bg-green-600 rounded-full">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm">Especialista H₂V</h3>
            <p className="text-green-400 text-xs">Pergunte sobre o artigo</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' 
                  ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300' 
                  : 'bg-green-100 dark:bg-green-900/30 text-green-600'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-slate-800 text-white rounded-tr-none'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none shadow-sm'
              }`}>
                {msg.text.split('\n').map((line, i) => (
                  <p key={i} className="mb-1 last:mb-0">{line}</p>
                ))}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center flex-shrink-0">
                <Bot size={16} />
              </div>
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-green-500" />
                <span className="text-xs text-slate-500">Analisando artigo...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ex: Quais as regiões mais favoráveis?"
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500/50 border border-transparent dark:border-slate-700"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
import React, { useState } from 'react';
import { Sparkles, Send, Loader2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AIChatModal: React.FC = () => {
  const { isAIChatModalOpen, setIsAIChatModalOpen, language } = useApp();
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isAIChatModalOpen) return null;

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user' as const, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    
    try {
      const response = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: `Error: ${(error as Error).message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        <div className="p-4 flex items-center justify-between border-b border-white/20">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            AI Fitness Coach
          </h2>
          <button onClick={() => setIsAIChatModalOpen(false)} className="text-white/80 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`p-3 rounded-xl ${m.role === 'user' ? 'bg-white/20 text-white ml-8' : 'bg-white text-slate-800 mr-8'}`}>
              <p className="text-xs font-semibold mb-1 opacity-75">{m.role === 'user' ? 'You' : 'AI Assistant'}</p>
              <p className="text-sm">{m.text}</p>
            </div>
          ))}
          {loading && <div className="text-white/80 text-sm flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Thinking...</div>}
        </div>

        <div className="p-4 bg-white/10 backdrop-blur-md flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 p-2 rounded-lg bg-white/20 text-white placeholder:text-white/60 focus:outline-none"
            placeholder="Ask a question..."
          />
          <button onClick={sendMessage} disabled={loading} className="p-2 bg-white text-indigo-600 rounded-lg">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

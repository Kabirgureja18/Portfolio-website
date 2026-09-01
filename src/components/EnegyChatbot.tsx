import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Send, X, Sparkles, RefreshCw, Zap, User, ArrowUpRight } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'energy';
  text: string;
  timestamp: string;
}

interface EnegyChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnegyChatbot({ isOpen, onClose }: EnegyChatbotProps) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'energy',
      text: "I am ENEGY — Kabir Gureja's AI assistant. Ask me anything about Kabir's T.E.R.R.A. robotics project, root India apparel (under progress), student web builds, or billboard artwork.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    'Who is Kabir?',
    'What is T.E.R.R.A. robotics?',
    'Tell me about root India',
    'How old is Kabir?',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userQuery: query }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const replyText = data.reply || "ENEGY responded with an empty signal.";

      const aiMsg: ChatMessage = {
        id: `energy-${Date.now()}`,
        sender: 'energy',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      console.warn('ENEGY connection fallback:', err);
      // Fallback answers for offline/client preview
      let fallbackText = "ENEGY: Kabir is a 14-year-old student builder born on September 27, 2012. He develops T.E.R.R.A. robotics, root India apparel (under progress), student web projects, and artwork shown on city billboards. Reach him at kabirgureja08@gmail.com or +91 9826977750.";
      
      const lower = query.toLowerCase();
      if (lower.includes('farmverse') || lower.includes('farmcraft') || lower.includes('mitra') || lower.includes('technoxian')) {
        fallbackText = "FarmVerse is Kabir's autonomous agricultural robotics system featuring Agri Mitra, built for the TechnoXian competition. It features dual Arduinos (Nav MCU + Task MCU), edge AI crop health diagnostics, pinpoint micro-spraying, and LoRa mesh telemetry. Check out the live platform at https://farmverse-technoxian.lovable.app/ !";
      } else if (lower.includes('terra')) {
        fallbackText = "T.E.R.R.A. (Terrain-Enhancing Regeneration via Robotic Algae) is Kabir's autonomous bio-robotic prototype engineered for soil moisture management, remediation, and microalgae dispersal. Visit the live platform at: https://terra-by-kabir.lovable.app/#contact";
      } else if (lower.includes('robot')) {
        fallbackText = "Kabir has built two major robotics systems: T.E.R.R.A. (climate bio-robotics with photobioreactors, https://terra-by-kabir.lovable.app/#contact) and FarmVerse / Agri Mitra (TechnoXian autonomous agricultural rover with AI crop health diagnostics, https://farmverse-technoxian.lovable.app/).";
      } else if (lower.includes('root india') || lower.includes('fashion') || lower.includes('brand')) {
        fallbackText = "root India is Kabir's independent streetwear fashion label, currently under progress and active development. It focuses on heavyweight boxy cuts and Indian street culture.";
      } else if (lower.includes('idea') || lower.includes('manifesto') || lower.includes('quote') || lower.includes('philosophy')) {
        fallbackText = "Kabir's core manifesto is: “Some ideas stay in my head. Mine usually end up becoming projects.” That transition from mental reverie to physical code and hardware defines everything he builds.";
      } else if (lower.includes('age') || lower.includes('old') || lower.includes('birthday')) {
        fallbackText = "Kabir was born on September 27, 2012, and is currently 14 years old.";
      }

      const fallbackMsg: ChatMessage = {
        id: `energy-${Date.now()}`,
        sender: 'energy',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-xl bg-[#0e0e12] border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-zinc-800 bg-zinc-900/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-mono-code font-bold text-zinc-100 tracking-wider">
                      ENEGY
                    </h3>
                    <span className="text-[10px] font-mono-code px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      GEMINI 3.7
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono-code">
                    Kabir's AI Portfolio Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setMessages([
                      {
                        id: 'welcome',
                        sender: 'energy',
                        text: "ENEGY memory reset. How can I help you regarding Kabir's portfolio?",
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      },
                    ])
                  }
                  title="Clear conversation"
                  className="p-1.5 text-zinc-400 hover:text-zinc-200 rounded-lg hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 text-zinc-400 hover:text-zinc-200 rounded-lg hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans text-sm">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'energy' && (
                    <div className="w-7 h-7 rounded bg-emerald-950/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] rounded-xl p-3.5 leading-relaxed text-xs sm:text-sm ${
                      msg.sender === 'user'
                        ? 'bg-zinc-200 text-zinc-950 font-medium ml-auto'
                        : 'bg-zinc-900/90 border border-zinc-800 text-zinc-200'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    <div
                      className={`text-[9px] font-mono-code mt-1.5 ${
                        msg.sender === 'user' ? 'text-zinc-600' : 'text-zinc-500'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 items-center text-xs font-mono-code text-emerald-400">
                  <div className="w-7 h-7 rounded bg-emerald-950/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 shrink-0">
                    <Zap className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <span className="animate-pulse">ENEGY is reasoning...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="px-4 py-2 border-t border-zinc-800/80 bg-zinc-950/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono-code text-zinc-500 shrink-0">
                PROMPTS:
              </span>
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  disabled={isLoading}
                  className="shrink-0 px-2.5 py-1 rounded-md text-[11px] font-mono-code bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={onSubmit}
              className="p-3 sm:p-4 border-t border-zinc-800 bg-zinc-900/90 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask ENEGY about Kabir's robotics, root India, code..."
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs sm:text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-emerald-500 transition-all font-mono-code"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 disabled:hover:bg-emerald-500 text-zinc-950 transition-all cursor-pointer flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

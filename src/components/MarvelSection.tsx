import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { marvelContent } from '../content/marvel';
import { Shield, Sparkles, Send, CheckCircle2, MessageSquare, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MarvelSection() {
  const [topic, setTopic] = useState('Multiverse & Incursions');
  const [question, setQuestion] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !email.trim()) return;

    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#ef4444', '#f59e0b', '#3b82f6'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <section
      id="marvel"
      className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-b border-red-950/80 bg-[#0d090a] relative overflow-hidden"
    >
      {/* Comic Halftone Accent Grid */}
      <div className="absolute inset-0 bg-comic-dots opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="pb-12 border-b border-red-900/40">
          <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.25em] text-[#ff3b30] mb-3">
            <Shield className="w-4 h-4 text-[#ff3b30]" />
            SECTOR 08 // COMIC CONTINUITY & MARVEL MULTIVERSE CORNER
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-zinc-100 uppercase">
                THE MARVEL <span className="text-[#ff3b30]">CORNER</span>
              </h2>
              <p className="text-sm sm:text-base font-serif-editorial italic text-red-200/90 mt-2">
                {marvelContent.quote}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-mono-code text-red-300">
              <span className="px-3 py-1.5 rounded-full border border-red-800/80 bg-red-950/40">
                ACTIVE THEORY CONTRIBUTOR
              </span>
              <span className="px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-400">
                EARTH-616 & MCU
              </span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12">
          {/* Left Column: Theory Highlights & Favorite Characters */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl border border-red-900/40 bg-[#140c0e] space-y-4">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-100">
                Multiverse Theories & Comic Science
              </h3>
              <p className="text-sm font-sans text-red-100/80 leading-relaxed">
                {marvelContent.intro}
              </p>
            </div>

            {/* Top Theory Panels */}
            <div className="space-y-3">
              <div className="text-xs font-mono-code uppercase text-[#ff3b30] tracking-wider">
                ACTIVE MULTIVERSE THEORY LOGS
              </div>
              {marvelContent.theories.map((theory, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-red-950/60 bg-[#120a0d] space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="text-zinc-100 font-bold">{theory.title}</span>
                    <span className="text-[10px] text-red-400 px-2 py-0.5 rounded bg-red-950/60 border border-red-900/60">
                      {theory.topic}
                    </span>
                  </div>
                  <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                    {theory.summary}
                  </p>
                </div>
              ))}
            </div>

            {/* Favorite Heroes */}
            <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/60 text-xs font-mono-code text-zinc-300 flex items-center justify-between">
              <span className="text-red-400 font-bold">CORE FAVORITES:</span>
              <span>{marvelContent.favoriteCharacters.join(' • ')}</span>
            </div>
          </div>

          {/* Right Column: "Ask Kabir About Marvel" Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-2xl border-2 border-red-900/60 bg-[#140b0d] shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-red-900/50 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#ff3b30]" />
                  <h3 className="text-lg font-display font-black text-zinc-100 uppercase">
                    ASK KABIR ABOUT MARVEL
                  </h3>
                </div>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                  DISPATCH TO INBOX
                </span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center space-y-4 rounded-xl bg-red-950/30 border border-red-800/40"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-xl font-display font-bold text-zinc-100 uppercase">
                    QUESTION RECEIVED!
                  </h4>
                  <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                    Your Marvel theory / question was delivered directly to Kabir’s inbox queue. Kabir answers thoughtfully by email once he takes a break from hardware & coding.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setQuestion('');
                    }}
                    className="text-xs font-mono-code text-[#ff3b30] hover:underline"
                  >
                    Submit another Marvel debate →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono-code text-zinc-300 mb-1.5 uppercase">
                      THEORY TOPIC
                    </label>
                    <select
                      id="marvel-topic-select"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-200 focus:outline-none focus:border-red-500"
                    >
                      <option>Multiverse & Incursions</option>
                      <option>Iron Man & Nanotech Physics</option>
                      <option>Kang & Temporal Mechanics</option>
                      <option>Secret Wars Speculation</option>
                      <option>Spider-Man Comic Arcs</option>
                      <option>Other Marvel Lore Debate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-zinc-300 mb-1.5 uppercase">
                      YOUR QUESTION / THEORY
                    </label>
                    <textarea
                      id="marvel-question-input"
                      rows={3}
                      required
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="What is your take on the anchor being collapse, or how Tony Stark engineered the time GPS?"
                      className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-sans text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono-code text-zinc-300 mb-1.5 uppercase">
                        YOUR NAME
                      </label>
                      <input
                        id="marvel-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Peter Parker"
                        className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-200 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono-code text-zinc-300 mb-1.5 uppercase">
                        YOUR EMAIL (FOR REPLY)
                      </label>
                      <input
                        id="marvel-email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="peter@dailybugle.com"
                        className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-200 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="text-[10px] font-mono-code text-zinc-400 pt-1">
                    *Kabir answers all genuine theories via email. No automated canned bot responses.
                  </div>

                  <button
                    type="submit"
                    id="btn-submit-marvel-question"
                    data-interactive="true"
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#ff3b30] hover:bg-red-600 text-white font-mono-code text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                  >
                    <span>TRANSMIT MARVEL QUERY</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

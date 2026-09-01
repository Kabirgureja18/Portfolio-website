import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Code2,
  Bot,
  Cpu,
  Layers,
  Sparkles,
  Palette,
  Camera,
  Megaphone,
  TrendingUp,
  Package,
  BrainCircuit,
  Gamepad2,
  Users,
  ArrowRight
} from 'lucide-react';

interface WhatIDoItem {
  id: string;
  title: string;
  category: string;
  icon: typeof Globe;
  detail: string;
  deliverables: string[];
  proofPoint: string;
  accent: string;
}

export default function WhatIDoSection({ onNavigate }: { onNavigate: (id: string) => void }) {
  const capabilities: WhatIDoItem[] = [
    {
      id: 'student-websites',
      title: 'Affordable Student Web Agency',
      category: 'Web Engineering',
      icon: Users,
      detail: 'Architecting bespoke, high-speed websites for student creators, clubs, and youth startups at accessible, honest rates.',
      deliverables: ['Custom React/Vite frontends', 'Zero bloated template bloat', 'Accessible student pricing tiers'],
      proofPoint: 'Delivered multiple custom portfolio and club websites for student peers.',
      accent: '#06b6d4',
    },
    {
      id: 'robotics',
      title: 'Robotics & Hardware Prototyping',
      category: 'Hardware Systems',
      icon: Cpu,
      detail: 'Designing physical microcontroller circuits, bio-robotic dispersal mechanisms, and sensor rigs from breadboard to autonomous chassis.',
      deliverables: ['ESP32 & Arduino C++ firmware', 'Motor drivers & sensor telemetry', 'Bio-compatible physical dispersal'],
      proofPoint: 'Built the T.E.R.R.A. algae delivery mechanism and FarmVerse (Agri Mitra) autonomous rover.',
      accent: '#10b981',
    },
    {
      id: 'ai-experiments',
      title: 'AI Systems & Custom Assistants',
      category: 'Artificial Intelligence',
      icon: BrainCircuit,
      detail: 'Training local neural workflows, autonomous multi-agent pipelines, and building desktop companions like JARVIS and ENEGY.',
      deliverables: ['Contextual AI browser clients', 'Desktop voice/vision daemon (JARVIS)', 'ENEGY intelligent web assistant'],
      proofPoint: 'Built custom AI-based web browser, JARVIS prototype, and ENEGY assistant.',
      accent: '#3b82f6',
    },
    {
      id: 'artwork-billboards',
      title: 'Artwork & Billboard Ad Campaigns',
      category: 'Visual Design',
      icon: Megaphone,
      detail: 'Creating striking graphic artworks, digital mixed media, and campaign visuals that have appeared on public commercial billboards.',
      deliverables: ['Commercial billboard visual assets', 'Digital illustration & mixed media', 'Brand campaign visual architecture'],
      proofPoint: 'Original artwork selected and displayed across city advertising billboards.',
      accent: '#ff3b30',
    },
    {
      id: 'trading-business',
      title: 'Commerce & Market Research',
      category: 'Commerce & Markets',
      icon: TrendingUp,
      detail: 'Analyzing financial markets, candlestick price action, macro trends, and running independent micro-commerce experiments.',
      deliverables: ['Technical chart analysis', 'Real-world e-commerce test drops', 'Self-taught market mechanics'],
      proofPoint: 'Conducted live e-commerce tests and independent digital tool launches.',
      accent: '#f59e0b',
    },
    {
      id: 'photography-brand',
      title: 'Street Photography & root India Label',
      category: 'Creative Arts',
      icon: Camera,
      detail: 'Documenting architectural geometry, urban street textures, and developing independent apparel label root India.',
      deliverables: ['35mm equivalent focal studies', 'High-contrast monochrome edits', 'root India apparel design (under progress)'],
      proofPoint: 'root India brand in active design and sampling.',
      accent: '#ec4899',
    },
    {
      id: 'game-development',
      title: 'Game Logic & Sandbox Systems',
      category: 'Interactive Systems',
      icon: Gamepad2,
      detail: 'Engineering procedural game mechanics, complex redstone logic computers, and interactive browser easter eggs.',
      deliverables: ['Interactive Easter egg minigames (KABIR.EXE)', 'Redstone arithmetic logic units', 'Canvas game mechanics'],
      proofPoint: 'Built the KABIR.EXE hidden terminal inside this portfolio.',
      accent: '#8b5cf6',
    },
  ];

  const [activeItem, setActiveItem] = useState<WhatIDoItem>(capabilities[0]);

  return (
    <section
      id="what-i-do"
      className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-b border-zinc-800/80 bg-[#0e0e12] relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="pb-12 border-b border-zinc-800">
          <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.25em] text-emerald-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            SECTOR 02 // CAPABILITIES & CRAFT
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-zinc-100 uppercase">
              WHAT I <span className="text-zinc-500">BUILD</span>
            </h2>
            <p className="text-sm font-mono-code text-zinc-400 max-w-md">
              From hardware circuits and AI browsers to billboard art and student web builds — no theoretical fluff, only working outputs.
            </p>
          </div>
        </div>

        {/* Interactive Capability Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 items-stretch">
          {/* Left: Capability Switcher List */}
          <div className="lg:col-span-6 space-y-2">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              const isSelected = activeItem.id === cap.id;
              return (
                <button
                  key={cap.id}
                  id={`capability-item-${cap.id}`}
                  data-interactive="true"
                  onClick={() => setActiveItem(cap)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-zinc-800/90 border-zinc-600 shadow-xl translate-x-1.5'
                      : 'bg-zinc-900/40 border-zinc-800/70 hover:bg-zinc-800/40 hover:border-zinc-700 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className="p-2 rounded-lg shrink-0"
                      style={{
                        backgroundColor: isSelected ? `${cap.accent}25` : '#18181b',
                        color: isSelected ? cap.accent : '#a1a1aa',
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div
                        className={`text-sm font-sans font-medium truncate ${
                          isSelected ? 'text-zinc-100' : 'text-zinc-300'
                        }`}
                      >
                        {cap.title}
                      </div>
                      <div className="text-[10px] font-mono-code text-zinc-400">
                        {cap.category}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-[#ff3b30] translate-x-1' : 'text-zinc-500 opacity-40'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Deep Dive Pane for Active Capability */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-zinc-700/80 bg-[#141418] shadow-2xl relative overflow-hidden"
              >
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: activeItem.accent }}
                      />
                      <span className="text-xs font-mono-code uppercase tracking-wider text-zinc-400">
                        {activeItem.category}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded border border-zinc-800 bg-zinc-900 text-zinc-300">
                      VERIFIED ACTIVITY
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-zinc-100 mb-3">
                      {activeItem.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 font-sans leading-relaxed">
                      {activeItem.detail}
                    </p>
                  </div>

                  {/* Core Deliverables List */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono-code uppercase text-zinc-400 tracking-wider">
                      KEY DELIVERABLES & TECHNIQUES
                    </div>
                    <div className="space-y-1.5">
                      {activeItem.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 text-xs font-mono-code text-zinc-300"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: activeItem.accent }}
                          />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Real World Proof Note */}
                  <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono-code text-zinc-300">
                    <span className="text-[#ff3b30] font-bold mr-1.5">EVIDENCE //</span>
                    {activeItem.proofPoint}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-8 pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono-code text-zinc-400">
                    WANT TO COLLABORATE?
                  </span>
                  <button
                    data-interactive="true"
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-2 text-xs font-mono-code text-white hover:text-[#ff3b30] transition-colors cursor-pointer"
                  >
                    <span>START PROJECT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

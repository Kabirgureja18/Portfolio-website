import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InterestItem } from '../types';
import {
  Cpu,
  Bot,
  Leaf,
  Code2,
  Zap,
  Palette,
  Camera,
  Shirt,
  Sparkles,
  Shield,
  Gamepad2,
  Trophy,
  Globe2,
  TrendingUp,
  Flame,
  Check
} from 'lucide-react';

interface InterestsSectionProps {
  interests: InterestItem[];
}

export default function InterestsSection({ interests }: InterestsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeInterest, setActiveInterest] = useState<InterestItem | null>(null);

  const categories = ['All', 'Tech', 'Creative', 'Athletics & Lore', 'Business'];

  const filteredInterests =
    selectedCategory === 'All'
      ? interests
      : interests.filter((i) => i.category === selectedCategory);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return Cpu;
      case 'Bot': return Bot;
      case 'Leaf': return Leaf;
      case 'Code2': return Code2;
      case 'Zap': return Zap;
      case 'Palette': return Palette;
      case 'Camera': return Camera;
      case 'Shirt': return Shirt;
      case 'Sparkles': return Sparkles;
      case 'Shield': return Shield;
      case 'Gamepad2': return Gamepad2;
      case 'Trophy': return Trophy;
      case 'Globe2': return Globe2;
      case 'TrendingUp': return TrendingUp;
      case 'Flame': return Flame;
      default: return Sparkles;
    }
  };

  return (
    <section
      id="interests"
      className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-b border-zinc-800/80 bg-[#0c0c0e] relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.25em] text-[#ff3b30] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ff3b30]" />
              SECTOR 03 // CURIOSITY CLUSTER
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-zinc-100 uppercase">
              INTERESTS & <span className="text-zinc-500">OBSESSIONS</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                data-interactive="true"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-zinc-100 text-zinc-950 font-bold shadow-md'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Interest Interactive Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-10">
          {filteredInterests.map((item) => {
            const Icon = getIcon(item.iconName);
            const isSelected = activeInterest?.id === item.id;
            return (
              <div
                key={item.id}
                id={`interest-card-${item.id}`}
                data-interactive="true"
                onClick={() => setActiveInterest(isSelected ? null : item)}
                className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-zinc-800/90 border-[#ff3b30]/80 shadow-2xl scale-[1.02]'
                    : 'bg-[#121216]/60 border-zinc-800/80 hover:bg-zinc-800/40 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`p-2.5 rounded-xl transition-colors ${
                      isSelected
                        ? 'bg-[#ff3b30] text-white'
                        : 'bg-zinc-900 text-zinc-400 group-hover:text-zinc-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono-code text-zinc-400 px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-sans font-bold text-zinc-100 group-hover:text-white transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs font-mono-code text-zinc-400 mt-1 line-clamp-2">
                  {item.tagline}
                </p>

                {item.note && (
                  <div
                    className={`mt-3 pt-3 border-t text-[11px] font-sans transition-all ${
                      isSelected
                        ? 'border-zinc-700 text-zinc-200'
                        : 'border-zinc-800/60 text-zinc-400 opacity-80'
                    }`}
                  >
                    💡 {item.note}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Sub-Note */}
        <div className="mt-8 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono-code text-zinc-400">
          <span>15+ DIVERSE DOMAINS • INTERSECTING CODE, CRAFT & DISCIPLINE</span>
          <span className="text-zinc-300">CLICK ANY CARD TO EXPAND INSIGHT</span>
        </div>
      </div>
    </section>
  );
}

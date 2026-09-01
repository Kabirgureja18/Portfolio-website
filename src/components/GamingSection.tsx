import { gamingContent } from '../content/gaming';
import { Gamepad2, Trophy, Swords, Crosshair, Box, ShieldAlert } from 'lucide-react';

export default function GamingSection() {
  return (
    <section
      id="gaming"
      className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-b border-zinc-800/80 bg-[#090b10] relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.25em] text-purple-400 mb-3">
              <Gamepad2 className="w-4 h-4 text-purple-400" />
              SECTOR 11 // GAMING SANCTUARY & SPORTS DISCIPLINE
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-zinc-100 uppercase">
              GAMING <span className="text-zinc-500">& ATHLETICS</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-code">
            <span className="px-3 py-1.5 rounded-full border border-purple-800/60 bg-purple-950/30 text-purple-300">
              {gamingContent.status}
            </span>
          </div>
        </div>

        {/* Intro */}
        <p className="text-sm font-sans text-zinc-300 max-w-2xl pt-6 leading-relaxed">
          {gamingContent.description}
        </p>

        {/* Compact Gaming Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
          {gamingContent.games.map((game) => (
            <div
              key={game.id}
              id={`game-card-${game.id}`}
              className="p-5 rounded-2xl border border-zinc-800/80 bg-[#121216]/60 hover:bg-zinc-800/40 hover:border-purple-800/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono-code text-purple-400">
                  <span className="uppercase">{game.genre}</span>
                </div>

                <h3 className="text-lg font-display font-bold text-zinc-100">
                  {game.title}
                </h3>

                <p className="text-xs font-sans text-zinc-400 leading-relaxed">
                  {game.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[10px] font-mono-code text-zinc-400 flex items-center justify-between">
                <span>STATUS:</span>
                <span className="text-zinc-300">{game.hoursNote}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sports & Hockey Highlight Strip */}
        <div className="mt-6 p-6 rounded-2xl border border-zinc-800 bg-[#121218] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-[#ff3b30]">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-mono-code text-[#ff3b30] uppercase">
                ATHLETIC GRIT // ON-PITCH PERFORMANCE
              </div>
              <h4 className="text-lg font-display font-bold text-zinc-100">
                Hockey Player & High-Intensity Sports
              </h4>
              <p className="text-xs font-sans text-zinc-400 mt-0.5">
                Balancing sedentary coding hours with high-stamina field/ice hockey. Fast tactical instincts on the turf translate directly into agile system debugging.
              </p>
            </div>
          </div>

          <span className="shrink-0 text-xs font-mono-code px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
            ATHLETIC BALANCE
          </span>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { motion } from 'motion/react';
import { AchievementItem } from '../types';
import { Trophy, Award, Landmark, Megaphone, CheckCircle2, ShieldCheck, ArrowUpRight, TrendingUp, Sparkles, Image, FileCheck } from 'lucide-react';

interface AchievementsSectionProps {
  achievements: AchievementItem[];
  onOpenAchievementsPage?: () => void;
}

export default function AchievementsSection({ achievements, onOpenAchievementsPage }: AchievementsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Press & Billboard', 'Robotics', 'MUN', 'Certificate', 'Award'];

  const filteredAchievements =
    selectedCategory === 'All'
      ? achievements
      : achievements.filter((a) => a.category === selectedCategory);

  return (
    <section
      id="achievements"
      className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-b border-zinc-800/80 bg-[#0c0c0e] relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.25em] text-[#ff3b30] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ff3b30]" />
              SECTOR 05 // HISTORICAL TIMELINE & VERIFIED MILESTONES
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-zinc-100 uppercase">
              ACHIEVEMENTS <span className="text-zinc-500">& PROOF</span>
            </h2>
          </div>

          {/* Dedicated Page Trigger Button */}
          {onOpenAchievementsPage && (
            <button
              onClick={onOpenAchievementsPage}
              data-interactive="true"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-mono-code text-xs font-bold transition-all cursor-pointer shadow-lg shadow-cyan-500/10 group"
            >
              <FileCheck className="w-4 h-4" />
              <span>EXPLORE ALL CERTIFICATES & PHOTOS</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`achieve-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              data-interactive="true"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-zinc-100 text-zinc-950 font-bold'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Milestone Spotlight Banner: Student Web Work & Billboard Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
          {/* Student Web Builds & Client Work Card */}
          <div className="p-6 rounded-2xl border border-cyan-900/50 bg-cyan-950/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono-code text-cyan-400 mb-2">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  STUDENT & CLIENT BUILDS
                </span>
                <span className="px-2 py-0.5 rounded bg-cyan-900/40 border border-cyan-700/50 text-[10px]">
                  100% INDEPENDENT
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-black text-zinc-100">
                Custom Web Builds & Tools
              </div>
              <p className="text-xs sm:text-sm font-sans text-zinc-300 mt-2 leading-relaxed">
                Designed and coded high-speed portfolio websites and tools for student peers, youth clubs, and independent creative initiatives.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-cyan-900/40 text-[11px] font-mono-code text-cyan-300/80">
              FOCUS: Fast React/Vite Sites • Clean UI • Accessible Student Rates
            </div>
          </div>

          {/* Billboard Art Feature Card */}
          <div className="p-6 rounded-2xl border border-red-900/50 bg-red-950/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-mono-code text-[#ff3b30] mb-2">
                <span className="flex items-center gap-1.5">
                  <Megaphone className="w-4 h-4 text-[#ff3b30]" />
                  PUBLIC AD CAMPAIGN DISPLAY
                </span>
                <span className="px-2 py-0.5 rounded bg-red-900/40 border border-red-700/50 text-[10px]">
                  CITY BILLBOARDS
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-zinc-100">
                Artwork on Commercial Billboards
              </div>
              <p className="text-xs sm:text-sm font-sans text-zinc-300 mt-2 leading-relaxed">
                Kabir's created visual artwork was selected and displayed on urban commercial advertising billboards across the city.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-red-900/40 text-[11px] font-mono-code text-red-300/80 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ff3b30]" />
              <span>Authentic note: Kabir's artwork appeared on billboards (not his face).</span>
            </div>
          </div>
        </div>

        {/* Timeline List */}
        <div className="space-y-4 pt-8">
          {filteredAchievements.map((item, idx) => (
            <div
              key={item.id}
              id={`achievement-row-${item.id}`}
              className="p-6 rounded-2xl border border-zinc-800/80 bg-[#121216]/60 hover:bg-zinc-800/40 transition-all flex flex-col md:flex-row md:items-start justify-between gap-6"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-mono-code text-[#ff3b30] font-bold">
                    [{item.year}]
                  </span>
                  <span className="text-xs font-mono-code px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono-code text-zinc-400">
                    // {item.organization}
                  </span>
                  {item.evidenceType && (
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-300">
                      {item.evidenceType}
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-display font-bold text-zinc-100">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
                  {item.description}
                </p>

                {item.verifiedNote && (
                  <div className="text-[11px] font-mono-code text-emerald-400/90 pt-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{item.verifiedNote}</span>
                  </div>
                )}
              </div>

              <div className="shrink-0 flex items-center gap-2 self-start md:self-center">
                {onOpenAchievementsPage && (item.photoUrl || item.certificateUrl) && (
                  <button
                    onClick={onOpenAchievementsPage}
                    data-interactive="true"
                    className="px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-700/60 hover:bg-cyan-900/60 text-cyan-300 text-xs font-mono-code flex items-center gap-1.5 cursor-pointer"
                  >
                    <Image className="w-3 h-3" />
                    <span>VIEW PHOTO</span>
                  </button>
                )}
                {item.badge && (
                  <span className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-xs font-mono-code text-zinc-200">
                    {item.badge}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner to Full Achievements Archive */}
        {onOpenAchievementsPage && (
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-cyan-950/30 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-mono-code font-bold text-zinc-100">
                WANT TO INSPECT ALL CERTIFICATES & OFFICIAL EVIDENCE?
              </div>
              <div className="text-xs font-mono-code text-zinc-400 mt-1">
                Open the dedicated gallery with high-res photos, credential verification IDs, and award citations.
              </div>
            </div>
            <button
              onClick={onOpenAchievementsPage}
              data-interactive="true"
              className="px-6 py-2.5 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-mono-code font-bold uppercase transition-all cursor-pointer shrink-0 flex items-center gap-2 shadow-lg"
            >
              <Trophy className="w-4 h-4 text-cyan-600" />
              <span>OPEN ACHIEVEMENTS ARCHIVE ↵</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}


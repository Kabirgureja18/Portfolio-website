import { ProfileData } from '../content/profile';
import AgeTimer from './AgeTimer';
import { Sparkles, Terminal, MapPin, Compass, Code, Cpu, Flame, ArrowUpRight } from 'lucide-react';
import SpotlightCard from './ui/SpotlightCard';
import DecryptedText from './ui/DecryptedText';
import MagneticButton from './ui/MagneticButton';
import { playPop } from '../utils/soundFX';

interface AboutSectionProps {
  profile: ProfileData;
  onNavigateToSection?: (id: string) => void;
  onNavigate?: (id: string) => void;
}

export default function AboutSection({ profile, onNavigateToSection, onNavigate }: AboutSectionProps) {
  const handleNav = (id: string) => {
    playPop(600);
    if (onNavigate) onNavigate(id);
    else if (onNavigateToSection) onNavigateToSection(id);
  };
  return (
    <section
      id="about"
      className="about-three-area py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-b border-zinc-800/80 bg-[#0c0c0e] relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Editorial Flavor */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.25em] text-[#ff3b30] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#ff3b30]" />
              <DecryptedText text="SECTOR 01 // EDITORIAL PROFILE" speed={25} animateOn="view" />
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-zinc-100 uppercase">
              ABOUT <span className="text-zinc-400">KABIR</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono-code text-zinc-400">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-[#ff3b30]" />
              {profile.location}
            </span>
            <span className="px-3 py-1.5 rounded-full border border-emerald-900/60 bg-emerald-950/30 text-emerald-400">
              LAB ONLINE
            </span>
          </div>
        </div>

        {/* Editorial Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 pt-12 items-start">
          {/* Left Column: Quotes & Authenticity Manifesto */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial italic font-normal text-zinc-100 leading-snug">
                {profile.headlineQuote || "“I don’t collect hobbies. I build them.”"}
              </h3>
              {profile.bioParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  className={`text-base sm:text-lg leading-relaxed ${
                    idx === profile.bioParagraphs.length - 1
                      ? 'text-zinc-100 font-medium pt-2 border-l-2 border-[#ff3b30] pl-4 italic bg-zinc-950/40 py-2.5 rounded-r-lg'
                      : 'text-zinc-300 font-sans'
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* A few things that describe me */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.2em] text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30]" />
                <span>A FEW THINGS THAT DESCRIBE ME</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {profile.editorialQuotes.map((quote, idx) => (
                  <SpotlightCard
                    key={idx}
                    spotlightColor="rgba(255, 59, 48, 0.12)"
                    borderColor="rgba(255, 59, 48, 0.3)"
                    className={`p-3.5 ${
                      idx === profile.editorialQuotes.length - 1 && profile.editorialQuotes.length % 2 !== 0
                        ? 'sm:col-span-2'
                        : ''
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-mono-code flex items-start gap-2.5">
                      <span className="text-[#ff3b30] font-bold shrink-0">
                        {String(idx + 1).padStart(2, '0')} —
                      </span>
                      <span className="text-zinc-200 leading-snug">{quote}</span>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </div>

            {/* Action Anchors */}
            <div className="flex flex-wrap gap-4 pt-4">
              <MagneticButton onClick={() => handleNav('projects')} strength={0.25}>
                <div
                  id="about-cta-projects"
                  data-interactive="true"
                  data-cursor-text="PROJECTS"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-100 text-zinc-900 text-xs font-mono-code font-bold uppercase tracking-wider hover:bg-white transition-all cursor-pointer shadow-lg"
                >
                  <span>EXPLORE PROTOTYPES</span>
                  <ArrowUpRight className="w-4 h-4 text-[#ff3b30]" />
                </div>
              </MagneticButton>

              <MagneticButton onClick={() => handleNav('contact')} strength={0.25}>
                <div
                  id="about-cta-contact"
                  data-interactive="true"
                  data-cursor-text="CONNECT"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-xs font-mono-code uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                >
                  <span>GET IN TOUCH</span>
                </div>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Live Age Telemetry & Builder Roles */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Real-time Age Counter */}
            <AgeTimer birthDateString={profile.birthDate} />

            {/* Current Active Roles with Spotlight Card */}
            <SpotlightCard
              spotlightColor="rgba(255, 59, 48, 0.08)"
              borderColor="rgba(255, 59, 48, 0.3)"
              className="p-6"
            >
              <div className="space-y-4">
                <div className="text-xs font-mono-code uppercase tracking-widest text-zinc-400 flex items-center justify-between">
                  <span>ACTIVE OPERATING ROLES</span>
                  <span className="text-[#ff3b30]">CORE MATRIX</span>
                </div>

                <div className="space-y-2.5">
                  {profile.roles.map((role, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/70 border border-zinc-800/80 text-xs font-sans text-zinc-200 hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff3b30]" />
                        <span>{role}</span>
                      </div>
                      <span className="text-[10px] font-mono-code text-zinc-400">ACTIVE</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-zinc-800/80 text-[11px] font-mono-code text-zinc-400">
                  CURRENT FOCUS: <span className="text-zinc-300">{profile.currentFocus}</span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}


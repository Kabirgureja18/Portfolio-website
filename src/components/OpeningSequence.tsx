import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Terminal } from 'lucide-react';
import { ProfileData } from '../content/profile';
import DecryptedText from './ui/DecryptedText';
import InteractiveParticleCanvas from './ui/InteractiveParticleCanvas';
import MagneticButton from './ui/MagneticButton';
import VelocityMarquee from './ui/VelocityMarquee';
import { playPop } from '../utils/soundFX';
import { smoothScrollTo } from '../utils/smoothScroll';
import RotatingText from './reactbits/RotatingText/RotatingText';
import StickerPeel from './reactbits/StickerPeel/StickerPeel';
import stickerImg from '../assets/sticker.svg';

interface OpeningSequenceProps {
  profile?: ProfileData;
  onComplete?: () => void;
  onNavigate?: (sectionId: string) => void;
  onOpenCLI?: () => void;
}

export default function OpeningSequence({
  profile,
  onComplete,
  onNavigate,
  onOpenCLI,
}: OpeningSequenceProps) {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Timed progressive reveal: PORTFOLIO -> KABIR -> GUREJA
    const t1 = setTimeout(() => setStep(1), 350); // Reveal "PORTFOLIO"
    const t2 = setTimeout(() => setStep(2), 1200); // Reveal "KABIR"
    const t3 = setTimeout(() => setStep(3), 2000); // Reveal "GUREJA"
    const t4 = setTimeout(() => setStep(4), 2700); // Reveal badges, status, scroll cues

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const scrollToAbout = () => {
    playPop(520);
    smoothScrollTo('#scroll-quote', { offset: 0, duration: 1.0 });
    if (onComplete) onComplete();
  };

  return (
    <section
      id="opening-hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-32 lg:pt-36 px-4 sm:px-8 lg:px-12 pb-12 sm:pb-16 border-b border-zinc-800/80 bg-[#0c0c0e] select-none overflow-hidden"
    >
      {/* Interactive Physics Particle Background Canvas */}
      <InteractiveParticleCanvas
        particleColor="rgba(255, 255, 255, 0.2)"
        lineColor="transparent"
        particleCount={30}
      />

      {/* Subtle Background Ambience */}
      <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-red-950/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/5 w-80 h-80 bg-emerald-950/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Meta Bar with centered balance and generous spacing from fixed Navbar */}
      <div className="relative z-10 flex items-center justify-between sm:grid sm:grid-cols-3 text-xs font-mono-code uppercase tracking-widest text-zinc-400 p-3 sm:p-3.5 px-4 sm:px-6 rounded-2xl border border-zinc-800/80 bg-[#121216]/60 backdrop-blur-md mb-6 sm:mb-10 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-zinc-300 font-medium">
            <DecryptedText text="SYS.ONLINE // ARCHIVE 2025" speed={30} animateOn="view" />
          </span>
        </div>
        <div className="hidden sm:flex items-center justify-center gap-6 text-zinc-300 text-center">
          <span>BUILDER • ROBOTICS • AI • ART</span>
        </div>
        <div className="hidden sm:block" />
      </div>

      {/* Main Typographic Progression */}
      <div className="hero-parallax-typography relative z-10 my-auto py-4 sm:py-6 flex flex-col justify-center max-w-[94vw] 2xl:max-w-[92vw] mx-auto w-full">
        {/* WORD 1: PORTFOLIO */}
        <div className="overflow-hidden mb-2">
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={step >= 1 ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm md:text-base font-mono-code tracking-[0.35em] text-zinc-300 uppercase flex items-center gap-3"
          >
            <span className="w-8 sm:w-12 h-px bg-zinc-700 inline-block" />
            <DecryptedText
              text="PORTFOLIO ARCHIVE / DIGITAL LAB"
              speed={25}
              animateOn="hover"
            />
          </motion.div>
        </div>

        {/* WORD 2: KABIR */}
        <div className="overflow-hidden pt-1 sm:pt-2 pb-2 sm:pb-4">
          <motion.h1
            initial={{ y: '110%', opacity: 0 }}
            animate={step >= 2 ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,13.5vw,16.5rem)] font-display font-black tracking-tight leading-[0.88] text-zinc-100 uppercase inline-block whitespace-nowrap pr-4 sm:pr-8"
          >
            KABIR
          </motion.h1>
        </div>

        {/* WORD 3: GUREJA */}
        <div className="overflow-hidden pt-1 sm:pt-2 pb-3 sm:pb-5">
          <motion.h1
            initial={{ y: '110%', opacity: 0 }}
            animate={step >= 3 ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,13.5vw,16.5rem)] font-display font-black tracking-tight leading-[0.88] text-[#ff3b30] uppercase inline-block whitespace-nowrap pr-4 sm:pr-8"
          >
            GUREJA
          </motion.h1>
        </div>

        {/* Sub-Manifesto Stagger */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={step >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 sm:mt-10 max-w-3xl"
        >
          <p className="text-lg sm:text-2xl text-zinc-300 font-serif-editorial italic font-normal leading-snug">
            “I don’t collect hobbies. I build them.”
          </p>

          {/* RotatingText Disciplines */}
          <div className="mt-4 flex items-center gap-3 flex-wrap">
            <span className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider">CORE FOCUS //</span>
            <RotatingText
              texts={['ROBOTICS & T.E.R.R.A.', 'AI SYSTEMS & GEMINI', 'BIO-REACTOR DESIGN', 'EDITORIAL ART', 'CREATIVE CODE']}
              mainClassName="px-3 bg-cyan-300 text-black font-mono-code font-bold uppercase overflow-hidden py-1 justify-center rounded-lg inline-flex text-xs sm:text-sm tracking-wider shadow-md"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2400}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono-code text-zinc-300">
            <span className="px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
              <DecryptedText text="Robotic Algae (T.E.R.R.A.)" speed={20} animateOn="hover" />
            </span>
            <span className="px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
              <DecryptedText text="Personal AI & ENEGY" speed={20} animateOn="hover" />
            </span>
            <span className="px-2.5 py-1 rounded bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
              <DecryptedText text="root India Apparel (WIP)" speed={20} animateOn="hover" />
            </span>
          </div>
        </motion.div>
      </div>

      {/* React Bits Interactive StickerPeel */}
      <div className="hidden lg:block absolute right-12 bottom-24 z-20 pointer-events-auto">
        <StickerPeel
          imageSrc={stickerImg}
          width={160}
          rotate={14}
          peelBackHoverPct={28}
          peelBackActivePct={50}
          shadowIntensity={0.55}
          lightingIntensity={0.15}
          initialPosition="center"
        />
      </div>

      {/* Infinite Velocity Marquee of Core Disciplines */}
      <div className="relative z-10 -mx-6 sm:-mx-10 lg:-mx-16 border-y border-zinc-800/60 bg-[#09090c]/80 backdrop-blur-sm my-4">
        <VelocityMarquee
          items={[
            'ROBOTICS & EMBEDDED C++',
            'LOCAL LLMs & SYSTEM PROMPTING',
            'MICROFLUIDIC BIO-REACTORS',
            'HIGH-CONTRAST EDITORIAL DESIGN',
            'STREET PHOTOGRAPHY',
            'APPAREL PROTOTYPING',
          ]}
          speed={32}
        />
      </div>

      {/* Bottom Exploration Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={step >= 4 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 pt-4 flex justify-end"
      >
        <MagneticButton onClick={scrollToAbout} strength={0.3}>
          <div
            id="btn-enter-portfolio"
            data-interactive="true"
            data-cursor-text="ENTER"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-xs font-mono-code tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-lg"
          >
            <span>EXPLORE ARCHIVE</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform text-[#ff3b30]" />
          </div>
        </MagneticButton>
      </motion.div>
    </section>
  );
}


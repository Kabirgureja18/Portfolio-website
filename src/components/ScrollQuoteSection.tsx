import { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollQuoteData, scrollQuoteContent } from '../content/scrollQuote';
import { playSuccessChime } from '../utils/soundFX';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollQuoteSectionProps {
  quote?: ScrollQuoteData;
}

export default function ScrollQuoteSection({ quote = scrollQuoteContent }: ScrollQuoteSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const thoughtRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);
  const gridGuidesRef = useRef<HTMLDivElement>(null);
  const highlightWordRef = useRef<HTMLSpanElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const hasSoundFiredRef = useRef(false);

  // Split sentence 1 into words for subtle kinetic settling
  const thoughtWords = useMemo(() => {
    return quote.thoughtSentence.split(' ');
  }, [quote.thoughtSentence]);

  // Subtle entry offsets for refined micro-drift (never pushed offscreen)
  const wordOffsets = useMemo(() => {
    return [-8, 8, -6, 6, -5, 7, -6, 5];
  }, []);

  const line1Text = quote.projectLine1 || 'Mine usually end up';
  const line2Text = quote.projectLine2 || 'becoming';
  const line3Text = quote.projectHighlight || 'PROJECTS.';

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current || !thoughtRef.current || !projectRef.current) return;

      const words = thoughtRef.current.querySelectorAll<HTMLElement>('.thought-word');
      const pLines = projectRef.current.querySelectorAll<HTMLElement>('.project-line-inner');

      // 1. Initial State: FULLY VISIBLE (opacity: 1) throughout the entire animation.
      // Words have subtle micro-shifts that smoothly resolve to 0 as user begins scrolling.
      words.forEach((w, i) => {
        const offset = wordOffsets[i % wordOffsets.length];
        gsap.set(w, {
          x: offset,
          y: 4,
          opacity: 1,
          display: 'inline-block',
        });
      });

      pLines.forEach((line) => {
        gsap.set(line, {
          y: 6,
          opacity: 1,
        });
      });

      if (highlightWordRef.current) {
        gsap.set(highlightWordRef.current, {
          scale: 0.98,
          opacity: 1,
        });
      }

      if (gridGuidesRef.current) {
        gsap.set(gridGuidesRef.current, { opacity: 0.35 });
      }
      if (bracketsRef.current) {
        gsap.set(bracketsRef.current, { opacity: 0.6, scale: 0.98 });
      }

      // 2. Calibrated GSAP ScrollTrigger Pinning:
      // - pin: true with pinSpacing: true
      // - end: '+=100%' (~1 viewport height) ensures a deliberate, engaging pause
      //   WITHOUT trapping the user in a prolonged screen lock
      // - scrub: 0.8 provides silky, responsive momentum tracking
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=100%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(Math.round(p * 100));

            // Soft sound trigger on first major reveal point
            if (!hasSoundFiredRef.current && p >= 0.4 && p <= 0.6) {
              hasSoundFiredRef.current = true;
              playSuccessChime();
            }
          },
        },
      });

      // Phase 1 (0 -> 0.4): Subtle settling into perfect mathematical alignment
      words.forEach((w) => {
        tl.to(
          w,
          {
            x: 0,
            y: 0,
            ease: 'power2.out',
            duration: 0.35,
          },
          0
        );
      });

      pLines.forEach((line, idx) => {
        tl.to(
          line,
          {
            y: 0,
            ease: 'power2.out',
            duration: 0.35,
          },
          0.05 + idx * 0.05
        );
      });

      if (highlightWordRef.current) {
        tl.to(
          highlightWordRef.current,
          {
            scale: 1.03,
            ease: 'power2.out',
            duration: 0.45,
          },
          0.1
        );
      }

      if (bracketsRef.current) {
        tl.to(
          bracketsRef.current,
          {
            opacity: 0.95,
            scale: 1.0,
            duration: 0.35,
            ease: 'power2.out',
          },
          0.1
        );
      }

      // Phase 2 (0.4 -> 0.8): Clean, crystal-clear hold where the entire quote sits in high-contrast focus

      // Phase 3 (0.8 -> 1.0): Gentle upward elevation handing over smoothly into the next section
      tl.to(
        thoughtRef.current,
        {
          y: -16,
          ease: 'power1.inOut',
          duration: 0.3,
        },
        0.7
      );

      tl.to(
        projectRef.current,
        {
          y: -8,
          ease: 'power1.inOut',
          duration: 0.3,
        },
        0.7
      );
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [quote, wordOffsets]);

  return (
    <section
      id="scroll-quote"
      ref={containerRef}
      className="relative w-full min-h-[100svh] bg-[#070709] text-zinc-100 border-b border-zinc-900 overflow-hidden select-none flex flex-col justify-between py-6 sm:py-8 lg:py-10 px-4 sm:px-8 lg:px-12 box-border"
      aria-label="Kabir Gureja Philosophy & Creative Transformation"
    >
      {/* Subtle Drafting Axes & Guide Lines */}
      <div
        ref={gridGuidesRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
      >
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent" />
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-zinc-700/30 to-transparent" />
      </div>

      {/* Real-time Scrub Progress Track (Prevents perceived lock by offering immediate visual feedback) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-zinc-900/60 z-30">
        <div
          className="h-full bg-gradient-to-r from-[#ff3b30] to-rose-400 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* =========================================================================
          1. TOP EDITORIAL META HEADER
          ========================================================================= */}
      <header className="relative z-20 flex items-center justify-between text-xs font-mono-code text-zinc-400 gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[#ff3b30] font-bold text-xs tracking-widest">
            {quote.indexCode || 'REF.01 // PHILOSOPHY'}
          </span>
          <span className="hidden sm:inline text-zinc-700">|</span>
          <span className="hidden sm:inline text-zinc-400 uppercase tracking-wider text-[11px]">
            {quote.badge || 'THOUGHT → PHYSICAL ARTIFACT'}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-[11px] text-zinc-400">
          <span className="text-zinc-600 font-mono-code">{quote.coordinates || '22.7196° N, 75.8577° E'}</span>
        </div>
      </header>

      {/* =========================================================================
          2. CENTER TYPOGRAPHY STAGE - BIG, IMPOSING WORDS FULLY VISIBLE
          ========================================================================= */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-[96vw] 2xl:max-w-[94vw] mx-auto my-auto px-2 sm:px-6 py-4 sm:py-6">
        {/* Architectural Registration Brackets */}
        <div
          ref={bracketsRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 inset-y-1 sm:inset-y-3 flex flex-col justify-between transition-opacity duration-300"
        >
          <div className="flex justify-between w-full text-zinc-700 font-mono-code text-sm sm:text-base leading-none">
            <span>┌</span>
            <span>┐</span>
          </div>
          <div className="flex justify-between w-full text-zinc-700 font-mono-code text-sm sm:text-base leading-none">
            <span>└</span>
            <span>┘</span>
          </div>
        </div>

        {/* LINE 1: “Some ideas stay in my head.” (Monumental, High-Contrast Editorial Serif) */}
        <div
          ref={thoughtRef}
          className="w-full text-center mb-2 sm:mb-4 px-2 sm:px-4"
        >
          <p className="font-serif-editorial italic text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-zinc-100 font-normal leading-snug max-w-4xl mx-auto drop-shadow-sm">
            “
            {thoughtWords.map((word, idx) => (
              <span
                key={idx}
                className="thought-word mx-1 sm:mx-1.5 inline-block text-zinc-100"
              >
                {word}
              </span>
            ))}
            ”
          </p>
        </div>

        {/* Subtle Architectural Divider */}
        <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent via-zinc-600 to-transparent mb-2 sm:mb-4 shrink-0" />

        {/* LINE 2: “Mine usually end up becoming PROJECTS.” (Giant Viewport Command) */}
        <div
          ref={projectRef}
          className="relative z-10 w-full flex flex-col items-center justify-center text-center text-zinc-100 space-y-1 sm:space-y-1.5"
        >
          {/* Sub-line 1: "Mine usually end up" */}
          <div className="overflow-visible py-0.5 w-full flex justify-center">
            <span className="project-line-inner block font-display font-bold text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl uppercase tracking-wider text-zinc-300 leading-tight">
              {line1Text}
            </span>
          </div>

          {/* Sub-line 2: "becoming" */}
          <div className="overflow-visible py-0.5 w-full flex justify-center">
            <span className="project-line-inner block font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-tight text-zinc-200 leading-tight">
              {line2Text}
            </span>
          </div>

          {/* Sub-line 3: "PROJECTS." (Gigantic Visual Climax, Viewport Constrained) */}
          <div className="overflow-visible pt-1 w-full flex justify-center items-center">
            <span
              ref={highlightWordRef}
              className="project-line-inner block font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] 2xl:text-[7.5rem] uppercase tracking-tighter text-white leading-none drop-shadow-[0_0_35px_rgba(255,255,255,0.2)] origin-center"
            >
              {line3Text.endsWith('.') ? (
                <>
                  {line3Text.slice(0, -1)}
                  <span className="text-[#ff3b30]">.</span>
                </>
              ) : (
                line3Text
              )}
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. BOTTOM EDITORIAL FOOTER & SCROLL TELEMETRY
          ========================================================================= */}
      <footer className="relative z-20 flex items-center justify-between text-xs font-mono-code text-zinc-400 border-t border-zinc-900/90 pt-3 shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-pulse" />
          <span className="text-[11px] text-zinc-400 uppercase tracking-wider">
            {quote.tagline || 'KABIR GUREJA // MANIFESTO'}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-zinc-500 font-mono-code tabular-nums">
            [{String(scrollProgress).padStart(2, '0')}%]
          </span>
        </div>
      </footer>
    </section>
  );
}

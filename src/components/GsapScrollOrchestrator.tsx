import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GsapScrollOrchestrator() {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced-motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Sleek Top Scroll Progress Bar (GSAP ScrollTrigger Scrub)
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.25,
          },
        });
      }

      // 2. Hero Typography Parallax Drift (GSAP Scrub)
      const heroTypography = document.querySelector('.hero-parallax-typography');
      if (heroTypography) {
        gsap.to(heroTypography, {
          yPercent: -18,
          opacity: 0.7,
          ease: 'none',
          scrollTrigger: {
            trigger: '#opening',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 3. Section Titles & Eyebrows Smooth Entrance
      const sectionTitles = document.querySelectorAll(
        'section h2, section h3.font-serif-editorial, .gsap-reveal-title'
      );
      sectionTitles.forEach((title) => {
        gsap.fromTo(
          title,
          { opacity: 0, y: 32, filter: 'blur(3px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: title,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 4. Staggered Cards Entrance (Projects, Artwork, Photography, Descriptors)
      const cardContainers = document.querySelectorAll(
        '#projects .grid, #art .grid, #photography .grid, #about .grid'
      );
      cardContainers.forEach((container) => {
        const cards = container.querySelectorAll(':scope > div');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 28, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      // 5. Section Dividers & Horizontal Rule Sweeps
      const dividers = document.querySelectorAll('.gsap-line-sweep, section hr');
      dividers.forEach((divider) => {
        gsap.fromTo(
          divider,
          { scaleX: 0, transformOrigin: 'left center', opacity: 0.3 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: divider,
              start: 'top 92%',
            },
          }
        );
      });
    });

    // Refresh ScrollTrigger after assets settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <div
      id="gsap-scroll-progress-container"
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-transparent"
    >
      <div
        ref={progressBarRef}
        id="gsap-scroll-progress"
        className="h-full w-full bg-gradient-to-r from-zinc-500 via-[#ff3b30] to-[#ff3b30] origin-left scale-x-0 shadow-[0_0_8px_rgba(255,59,48,0.8)]"
      />
    </div>
  );
}

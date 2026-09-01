import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollToPlugin);
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export interface SmoothScrollOptions {
  offset?: number;
  duration?: number;
  onComplete?: () => void;
}

const SECTION_ALIASES: Record<string, string> = {
  hero: 'opening-hero',
  opening: 'opening-hero',
  'opening-hero': 'opening-hero',
  manifesto: 'scroll-quote',
  quote: 'scroll-quote',
  'scroll-quote': 'scroll-quote',
  ideas: 'scroll-quote',
  about: 'about',
  skills: 'what-i-do',
  capabilities: 'what-i-do',
  'what-i-do': 'what-i-do',
  interests: 'interests',
  projects: 'projects',
  terra: 'projects',
  farmverse: 'projects',
  farmcraft: 'projects',
  jarvis: 'projects',
  achievements: 'achievements',
  awards: 'achievements',
  honors: 'achievements',
  certificates: 'achievements',
  road: 'road-quote',
  lane: 'road-quote',
  'road-quote': 'road-quote',
  pathway: 'road-quote',
  photography: 'photography',
  photos: 'photography',
  art: 'photography',
  artwork: 'photography',
  clothing: 'fashion-brand',
  fashion: 'fashion-brand',
  products: 'fashion-brand',
  'fashion-brand': 'fashion-brand',
  marvel: 'marvel',
  comics: 'marvel',
  socials: 'socials',
  github: 'socials',
  network: 'socials',
  contact: 'contact',
};

/**
 * Smoothly scrolls to a DOM selector, HTMLElement, or vertical pixel position.
 * Uses the active GSAP-synchronized Lenis instance when available, with
 * GSAP ScrollToPlugin and native smooth fallback.
 */
export function smoothScrollTo(
  target: string | number | HTMLElement,
  options?: SmoothScrollOptions
) {
  if (typeof window === 'undefined') return;

  const offset = options?.offset ?? -70;
  const duration = options?.duration ?? 1.2;

  // Resolve HTMLElement if target is string
  let targetElement: HTMLElement | null = null;
  if (typeof target === 'string') {
    const rawId = target.replace(/^#/, '');
    const mappedId = SECTION_ALIASES[rawId] || rawId;
    targetElement =
      (document.getElementById(mappedId) as HTMLElement | null) ||
      (document.querySelector(`#${rawId}`) as HTMLElement | null) ||
      (document.querySelector(target) as HTMLElement | null);
  } else if (target instanceof HTMLElement) {
    targetElement = target;
  }

  // 1. Lenis Smooth Scroll
  if (window.__lenis) {
    if (typeof target === 'number') {
      window.__lenis.scrollTo(target, {
        duration,
        onComplete: options?.onComplete,
      });
      return;
    }

    if (targetElement) {
      window.__lenis.scrollTo(targetElement, {
        offset,
        duration,
        onComplete: options?.onComplete,
      });
      return;
    }
  }

  // 2. GSAP ScrollToPlugin Fallback
  if (typeof target === 'number') {
    gsap.to(window, {
      duration,
      scrollTo: { y: target },
      ease: 'power2.out',
      onComplete: options?.onComplete,
    });
    return;
  }

  if (targetElement) {
    gsap.to(window, {
      duration,
      scrollTo: { y: targetElement, offsetY: Math.abs(offset) },
      ease: 'power2.out',
      onComplete: options?.onComplete,
    });
    return;
  }

  // 3. Fallback native smooth scroll
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else if (targetElement) {
    (targetElement as HTMLElement).scrollIntoView({ behavior: 'smooth' });
  }
}

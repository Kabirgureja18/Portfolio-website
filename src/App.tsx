/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import OpeningSequence from './components/OpeningSequence';
import AboutSection from './components/AboutSection';
import WhatIDoSection from './components/WhatIDoSection';
import InterestsSection from './components/InterestsSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ClothingAndProductsSection from './components/ClothingAndProductsSection';
import MarvelSection from './components/MarvelSection';
import SocialsAndGithubSection from './components/SocialsAndGithubSection';
import ContactSection from './components/ContactSection';
import ProjectModal from './components/ProjectModal';
import CommandPalette from './components/CommandPalette';
import FunFactNotification from './components/FunFactNotification';
import MiniGameEasterEgg from './components/MiniGameEasterEgg';
import ContentStudioModal from './components/ContentStudioModal';
import EnegyChatbot from './components/EnegyChatbot';
import AchievementsPage from './components/AchievementsPage';
import GsapScrollOrchestrator from './components/GsapScrollOrchestrator';
import GlitchShaderOverlay from './components/GlitchShaderOverlay';
import InteractiveCLI from './components/ui/InteractiveCLI';
import CustomCursor from './components/ui/CustomCursor';
import OffcanvasSidebar from './components/ui/OffcanvasSidebar';
import ScrollQuoteSection from './components/ScrollQuoteSection';
import RoadQuoteSection from './components/RoadQuoteSection';
import { smoothScrollTo } from './utils/smoothScroll';

// Content imports
import {
  profileContent as initialProfile,
  interestsContent,
  projectsContent,
  achievementsContent,
  productsContent,
  funFactsContent,
  scrollQuoteContent,
  roadQuoteContent,
} from './content';
import { ProjectItem } from './types';

export default function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [scrollQuote, setScrollQuote] = useState(scrollQuoteContent);
  const [roadQuote, setRoadQuote] = useState(roadQuoteContent);
  const [currentView, setCurrentView] = useState<'home' | 'achievements'>('home');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [isEnegyOpen, setIsEnegyOpen] = useState(false);
  const [isCliOpen, setIsCliOpen] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  // Scroll spy to highlight current active section in nav & offcanvas
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'what-i-do', 'projects', 'achievements', 'marvel', 'contact'];
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync hash routing if user opens with #achievements
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#achievements-archive' || window.location.hash === '#certificates') {
        setCurrentView('achievements');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Global keybindings: Cmd+K for palette, `~` for KABIR.EXE, Cmd+E for ENEGY AI, Cmd+J for CLI
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsEnegyOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setIsCliOpen((prev) => !prev);
      } else if (e.key === '`' || e.key === '~') {
        // Toggle easter egg terminal
        setIsEasterEggOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'achievements-archive' || sectionId === 'certificates') {
      setCurrentView('achievements');
      smoothScrollTo(0, { duration: 0.8 });
      return;
    }
    if (sectionId === 'kabir-exe' || sectionId === 'easter-egg') {
      setIsEasterEggOpen(true);
      return;
    }
    if (sectionId === 'cli' || sectionId === 'terminal') {
      setIsCliOpen(true);
      return;
    }
    if (sectionId === 'cms' || sectionId === 'content-studio') {
      setIsCmsOpen(true);
      return;
    }
    if (sectionId === 'energy' || sectionId === 'ai' || sectionId === 'enegy') {
      setIsEnegyOpen(true);
      return;
    }

    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        smoothScrollTo(sectionId, { offset: -70, duration: 1.2 });
      }, 120);
      return;
    }

    smoothScrollTo(sectionId, { offset: -70, duration: 1.2 });
  };

  return (
    <>
      <SmoothScroll>
        {/* Magic Cursor with outer ball, inner point, and ripple effects */}
        <CustomCursor />

        <GsapScrollOrchestrator />
        <GlitchShaderOverlay />

        {/* Offcanvas Drawer Menu with .overlay and .side-overlay */}
        <OffcanvasSidebar
          isOpen={isOffcanvasOpen}
          onClose={() => setIsOffcanvasOpen(false)}
          onNavigate={handleNavigate}
          onOpenCLI={() => setIsCliOpen(true)}
          onOpenEnegy={() => setIsEnegyOpen(true)}
          onOpenAchievementsPage={() => {
            setCurrentView('achievements');
            smoothScrollTo(0, { duration: 0.8 });
          }}
          onOpenCms={() => setIsCmsOpen(true)}
          onTriggerEasterEgg={() => setIsEasterEggOpen(true)}
          activeSection={activeSection}
        />

        {/* Sticky Agency Header & Navbar */}
        <Navbar
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onTriggerEasterEgg={() => setIsEasterEggOpen(true)}
          onOpenCms={() => setIsCmsOpen(true)}
          onOpenEnegy={() => setIsEnegyOpen(true)}
          onOpenCLI={() => setIsCliOpen(true)}
          onOpenOffcanvas={() => setIsOffcanvasOpen(true)}
          onOpenAchievementsPage={() => {
            setCurrentView('achievements');
            smoothScrollTo(0, { duration: 0.8 });
          }}
          onNavigate={handleNavigate}
          activeSection={activeSection}
        />

      {currentView === 'achievements' ? (
        <AchievementsPage
          onBackToPortfolio={() => {
            setCurrentView('home');
            smoothScrollTo(0, { duration: 0.8 });
          }}
        />
      ) : (
        <main className="min-h-screen bg-[#09090b] text-zinc-100 overflow-x-hidden selection:bg-[#ff3b30] selection:text-white">
          {/* 1. Cinematic Typographic Opening Sequence with React Bits */}
          <OpeningSequence
            profile={profile}
            onNavigate={handleNavigate}
            onOpenCLI={() => setIsCliOpen(true)}
          />

          {/* 1.5. Experimental Full-Screen Scroll-Text Section (Thought → Idea → Project) */}
          <ScrollQuoteSection quote={scrollQuote} />

          {/* 2. Editorial About Kabir & Live Dynamic Age Timer */}
          <AboutSection
            profile={profile}
            onNavigate={handleNavigate}
          />

          {/* 3. What I Do: Active Capability & Craft Matrix */}
          <WhatIDoSection onNavigate={handleNavigate} />

          {/* 4. Interests & Curiosity Cluster */}
          <InterestsSection interests={interestsContent} />

          {/* 5. Selected Projects & Prototypes Grid */}
          <ProjectsSection
            projects={projectsContent}
            onSelectProject={(proj) => setSelectedProject(proj)}
            onNavigateToSection={handleNavigate}
          />

          {/* 6. Achievements Timeline, Certifications & Billboard Feature */}
          <AchievementsSection
            achievements={achievementsContent}
            onOpenAchievementsPage={() => {
              setCurrentView('achievements');
              smoothScrollTo(0, { duration: 0.8 });
            }}
          />

          {/* 6.5. Autonomous Trajectory Cinematic Scroll-Text: “I don’t really have a single lane...” */}
          <RoadQuoteSection quote={roadQuote} />

          {/* 7. Fashion Brand & Products */}
          <ClothingAndProductsSection
            products={productsContent}
            onNavigateToContact={() => handleNavigate('contact')}
          />

          {/* 12. Marvel Multiverse Corner & Theory Transmission */}
          <MarvelSection />

          {/* 13. GitHub Repos & Network Socials */}
          <SocialsAndGithubSection />

          {/* 14. Minimal High-Contrast Contact Terminal */}
          <ContactSection email={profile.email} phone={profile.phone} />
        </main>
      )}

      {/* Interactive CLI Terminal Drawer */}
      <InteractiveCLI
        isOpen={isCliOpen}
        onClose={() => setIsCliOpen(false)}
        onNavigateToSection={(id) => {
          setIsCliOpen(false);
          handleNavigate(id);
        }}
      />

      {/* Interactive Modals and Overlay Systems */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigateToSection={handleNavigate}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
        onTriggerEasterEgg={() => {
          setIsCommandPaletteOpen(false);
          setIsEasterEggOpen(true);
        }}
        onOpenCms={() => {
          setIsCommandPaletteOpen(false);
          setIsCmsOpen(true);
        }}
        onOpenAchievementsPage={() => {
          setIsCommandPaletteOpen(false);
          setCurrentView('achievements');
          smoothScrollTo(0, { duration: 0.8 });
        }}
      />

      <FunFactNotification
        facts={funFactsContent}
        onTriggerEasterEgg={() => setIsEasterEggOpen(true)}
      />

      <MiniGameEasterEgg
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />

      <ContentStudioModal
        isOpen={isCmsOpen}
        onClose={() => setIsCmsOpen(false)}
        currentProfile={profile}
        onSaveProfile={(updated) => setProfile(updated)}
        currentScrollQuote={scrollQuote}
        onSaveScrollQuote={(updated) => setScrollQuote(updated)}
        currentRoadQuote={roadQuote}
        onSaveRoadQuote={(updated) => setRoadQuote(updated)}
      />

      {/* ENEGY Gemini Chatbot */}
      <EnegyChatbot
        isOpen={isEnegyOpen}
        onClose={() => setIsEnegyOpen(false)}
      />
    </SmoothScroll>
    </>
  );
}


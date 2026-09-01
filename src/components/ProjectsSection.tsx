import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../types';
import { Leaf, Bot, ArrowUpRight, CheckCircle2, Sparkles, LayoutGrid, Layers, ChevronRight, Maximize2, ExternalLink, X, Code2, Database, Activity } from 'lucide-react';
import SpotlightCard from './ui/SpotlightCard';
import DecryptedText from './ui/DecryptedText';
import BounceCards from './reactbits/BounceCards/BounceCards';
import LSStudioMockup from './ui/LSStudioMockup';
import { playPop } from '../utils/soundFX';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onNavigateToSection: (sectionId: string) => void;
}

const projectImages: Record<string, string> = {
  terra: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Agricultural_drone_spraying_on_paddy_field.jpg/1280px-Agricultural_drone_spraying_on_paddy_field.jpg',
  jarvis: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  'ai-browser': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
  farmverse: 'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/24ee4793-860f-4f98-8e22-4d59a6192a4a/id-preview-6fc93ac1--2051cc84-6201-4cde-a4e2-2e3e85b72331.lovable.app-1784254633213.png',
  farmcraft: 'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/24ee4793-860f-4f98-8e22-4d59a6192a4a/id-preview-6fc93ac1--2051cc84-6201-4cde-a4e2-2e3e85b72331.lovable.app-1784254633213.png',
  'personal-ai': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=80',
  'student-web-agency': 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80',
};

export default function ProjectsSection({
  projects,
  onSelectProject,
  onNavigateToSection,
}: ProjectsSectionProps) {
  const [filter, setFilter] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'bounce' | 'grid'>('bounce');
  const [expandedProjectId, setExpandedProjectId] = useState<string>('terra');

  const categories = ['All', 'Climate & BioTech', 'AI & Software', 'Robotics & Hardware', 'Web & Products'];

  const filteredProjects = useMemo(() => {
    return filter === 'All' ? projects : projects.filter((p) => p.category === filter);
  }, [projects, filter]);

  // Active expanded project
  const activeProject = useMemo(() => {
    return (
      filteredProjects.find((p) => p.id === expandedProjectId) ||
      filteredProjects[0] ||
      projects[0]
    );
  }, [filteredProjects, expandedProjectId, projects]);

  // Prepare cards for BounceCards
  const bounceItems = useMemo(() => {
    return filteredProjects.map((p) => ({
      id: p.id,
      title: p.title,
      subtitle: p.subtitle,
      category: p.category,
      accentColor: p.accentColor,
      image: projectImages[p.id] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      rawProject: p,
    }));
  }, [filteredProjects]);

  const handleCardClick = (cardItem: any) => {
    playPop(520);
    const projId = cardItem.id;
    setExpandedProjectId(projId);
  };

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-b border-zinc-800/80 bg-[#0c0c0e] relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-red-600/5 via-cyan-500/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.25em] text-emerald-400 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <DecryptedText text="SECTOR 04 // SELECTED PROTOTYPES & LAB BUILDS" speed={25} animateOn="view" />
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-zinc-100 uppercase">
              FEATURED <span className="text-zinc-500">EXPERIMENTS</span>
            </h2>
            <p className="text-xs font-mono-code text-zinc-400 mt-2">
              Hover over cards to see physics bounce • Click any card to expand full technical specs
            </p>
          </div>

          {/* Controls: Category Filter & View Mode */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono-code">
              <button
                id="btn-view-bounce"
                data-interactive="true"
                onClick={() => {
                  playPop(520);
                  setViewMode('bounce');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === 'bounce'
                    ? 'bg-zinc-100 text-zinc-950 font-bold shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>BOUNCE DECK</span>
              </button>
              <button
                id="btn-view-grid"
                data-interactive="true"
                onClick={() => {
                  playPop(520);
                  setViewMode('grid');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-zinc-100 text-zinc-950 font-bold shadow'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>GRID</span>
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`project-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  data-interactive="true"
                  onClick={() => {
                    playPop(550);
                    setFilter(cat);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono-code transition-all cursor-pointer ${
                    filter === cat
                      ? 'bg-zinc-100 text-zinc-950 font-bold shadow-md'
                      : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Primary Showcase: BounceCards or Grid Matrix */}
        {viewMode === 'bounce' ? (
          <div className="pt-10 space-y-12">
            {/* BounceCards Interactive Stage */}
            <div className="relative flex flex-col items-center justify-center min-h-[460px] sm:min-h-[500px] rounded-2xl bg-gradient-to-b from-zinc-900/50 via-zinc-950/70 to-[#09090c] border border-zinc-800/80 p-6 sm:p-10 overflow-hidden shadow-2xl">
              {/* Subtle grid pattern background */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

              {/* Status Header */}
              <div className="absolute top-4 left-6 right-6 flex items-center justify-between pointer-events-none z-10">
                <div className="flex items-center gap-2 text-[11px] font-mono-code text-zinc-400 uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>INTERACTIVE BOUNCE DECK // {bounceItems.length} ARTIFACTS</span>
                </div>
                <div className="text-[11px] font-mono-code text-zinc-400 hidden sm:block">
                  SELECTED: <span className="text-white font-bold">{activeProject?.title}</span>
                </div>
              </div>

              {/* BounceCards Component from React Bits */}
              <div key={`bounce-${filter}`} className="my-auto py-8">
                <BounceCards
                  items={bounceItems}
                  containerWidth={typeof window !== 'undefined' && window.innerWidth < 640 ? 340 : 540}
                  containerHeight={380}
                  animationDelay={0.15}
                  animationStagger={0.06}
                  enableHover={true}
                  onCardClick={handleCardClick}
                  transformStyles={[
                    'rotate(-12deg) translate(-190px, 12px)',
                    'rotate(-6deg) translate(-110px, -6px)',
                    'rotate(-2deg) translate(-30px, 4px)',
                    'rotate(4deg) translate(50px, -8px)',
                    'rotate(10deg) translate(130px, 10px)',
                    'rotate(16deg) translate(210px, -4px)',
                  ]}
                />
              </div>

              {/* Bottom Quick-Selection Strip */}
              <div className="w-full flex items-center justify-center gap-2 flex-wrap pt-4 border-t border-zinc-800/60 z-10">
                <span className="text-[10px] font-mono-code text-zinc-400 uppercase mr-1">QUICK SELECT //</span>
                {filteredProjects.map((p) => {
                  const isCurrent = activeProject?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      id={`deck-selector-${p.id}`}
                      data-interactive="true"
                      onClick={() => {
                        playPop(480);
                        setExpandedProjectId(p.id);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-mono-code transition-all cursor-pointer flex items-center gap-1.5 ${
                        isCurrent
                          ? 'bg-zinc-100 text-zinc-950 font-bold shadow'
                          : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                      }`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: p.accentColor || '#ff3b30' }}
                      />
                      <span>{p.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Expanded Detailed Project View (Small-to-Big Interaction) */}
            <AnimatePresence mode="wait">
              {activeProject && (
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                  className="rounded-2xl border border-zinc-700/80 bg-[#121216] shadow-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden"
                  style={{
                    boxShadow: `0 25px 60px -15px ${activeProject.accentColor || '#ff3b30'}22`,
                  }}
                >
                  {/* Top Ambient Glow Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: activeProject.accentColor || '#ff3b30' }}
                  />

                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className="text-xs font-mono-code px-2.5 py-0.5 rounded font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: `${activeProject.accentColor}18`,
                            color: activeProject.accentColor,
                            border: `1px solid ${activeProject.accentColor}40`,
                          }}
                        >
                          {activeProject.status}
                        </span>
                        <span className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider">
                          {activeProject.category}
                        </span>
                        <span className="text-xs font-mono-code text-zinc-400">
                          // {activeProject.year}
                        </span>
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight mt-2">
                        {activeProject.title}
                      </h3>
                      <p className="text-sm font-mono-code text-zinc-300">
                        {activeProject.subtitle}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        id="btn-expand-modal"
                        data-interactive="true"
                        data-cursor-text="INSPECT"
                        onClick={() => {
                          playPop(520);
                          onSelectProject(activeProject);
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-mono-code font-bold uppercase tracking-wider shadow transition-all cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>FULL ARCHITECTURE MODAL</span>
                      </button>
                    </div>
                  </div>

                  {/* ContentCore Spec Header Tabs */}
                  <div className="pt-4 flex items-center gap-2 border-b border-zinc-800/80 pb-3 flex-wrap">
                    <span className="text-[10px] font-mono-code text-zinc-500 uppercase tracking-widest mr-2">
                      SPEC VIEW //
                    </span>
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-mono-code">
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 text-zinc-100 font-bold">
                        <Sparkles className="w-3 h-3 text-[#ff3b30]" />
                        <span>LS.GRAPHICS 3D STUDIO</span>
                      </span>
                    </div>
                    <div className="ml-auto hidden md:flex items-center gap-2 text-[11px] font-mono-code text-zinc-500">
                      <Activity className="w-3 h-3 text-emerald-400" />
                      <span>CONTENTCORE TELEMETRY: ACTIVE</span>
                    </div>
                  </div>

                  {/* Main Two-Column Content with LS Studio Device Mockup */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
                    {/* Left: LS.Graphics 3D Device Studio Mockup */}
                    <div className="lg:col-span-6 space-y-6">
                      <LSStudioMockup
                        project={activeProject}
                        imageUrl={projectImages[activeProject.id] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'}
                        onOpenModal={() => onSelectProject(activeProject)}
                      />

                      {/* Action Links & ContentCore Endpoints */}
                      {activeProject.links && activeProject.links.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center justify-between text-[11px] font-mono-code uppercase tracking-wider text-zinc-400">
                            <span>CONTENTCORE EXPLORATION ENDPOINTS //</span>
                            <span className="text-emerald-400 text-[10px]">STATUS: 200 OK</span>
                          </div>
                          <div className="flex flex-col gap-2">
                            {activeProject.links.map((link, idx) => {
                              const isExternalLive = link.url.includes('terra-by-kabir') || link.url.includes('farmverse-technoxian');
                              return (
                                <a
                                  key={idx}
                                  href={link.url}
                                  target={link.url.startsWith('http') ? '_blank' : undefined}
                                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                  onClick={(e) => {
                                    if (link.url.startsWith('#')) {
                                      e.preventDefault();
                                      onNavigateToSection(link.url.replace('#', ''));
                                    }
                                  }}
                                  className={`group flex items-center justify-between p-3.5 rounded-xl border text-xs font-mono-code transition-all cursor-pointer shadow-sm ${
                                    isExternalLive
                                      ? 'bg-emerald-950/40 hover:bg-emerald-900/60 border-emerald-500/70 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                                      : 'bg-zinc-900/90 hover:bg-zinc-850 border-zinc-800 hover:border-zinc-700 text-zinc-200'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5">
                                    {isExternalLive ? (
                                      <span className="p-1 rounded bg-emerald-500/20 text-emerald-400">
                                        <Sparkles className="w-3.5 h-3.5" />
                                      </span>
                                    ) : (
                                      <Code2 className="w-3.5 h-3.5 text-[#ff3b30]" />
                                    )}
                                    <span className={isExternalLive ? 'font-bold text-emerald-200' : 'font-semibold'}>
                                      {link.label}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    {isExternalLive && (
                                      <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-mono-code px-2 py-0.5 rounded bg-emerald-500 text-zinc-950 font-bold uppercase tracking-wider">
                                        REDIRECT LINK
                                      </span>
                                    )}
                                    <ArrowUpRight
                                      className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                                        isExternalLive ? 'text-emerald-400 group-hover:text-emerald-200' : 'text-zinc-400 group-hover:text-white'
                                      }`}
                                    />
                                  </div>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right: Technical Breakdown & Innovations */}
                    <div className="lg:col-span-6 space-y-6">
                      {/* Description & Overview */}
                      <div>
                        <div className="text-[11px] font-mono-code uppercase tracking-wider text-zinc-400 mb-2">
                          EXECUTIVE SUMMARY & PROBLEM STATEMENT //
                        </div>
                        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                          {activeProject.description}
                        </p>
                      </div>

                      {/* Innovation Highlights */}
                      <div>
                        <div className="text-[11px] font-mono-code uppercase tracking-wider text-zinc-400 mb-3">
                          KEY TECHNICAL HIGHLIGHTS //
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {activeProject.highlights.map((hl, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-300"
                            >
                              <CheckCircle2
                                className="w-4 h-4 shrink-0 mt-0.5"
                                style={{ color: activeProject.accentColor || '#ff3b30' }}
                              />
                              <span className="leading-snug">{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Pills */}
                      <div>
                        <div className="text-[11px] font-mono-code uppercase tracking-wider text-zinc-400 mb-2.5">
                          SYSTEM STACK & TOOLING //
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.techStack.map((tech, idx) => (
                            <span
                              key={idx}
                              className="text-xs font-mono-code px-3 py-1 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Grid View Matrix (Alternative View Mode) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
            {filteredProjects.map((project) => {
              return (
                <SpotlightCard
                  key={project.id}
                  id={`project-card-${project.id}`}
                  data-interactive="true"
                  data-cursor-text="VIEW"
                  spotlightColor={`${project.accentColor || '#ff3b30'}18`}
                  borderColor={`${project.accentColor || '#ff3b30'}45`}
                  onClick={() => {
                    playPop(480);
                    onSelectProject(project);
                  }}
                  className="group flex flex-col justify-between p-6 cursor-pointer"
                >
                  {/* Top Status & Category */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono-code text-zinc-400 uppercase tracking-wider">
                        {project.category}
                      </span>
                      <span
                        className="text-[10px] font-mono-code px-2 py-0.5 rounded font-semibold uppercase tracking-wider"
                        style={{
                          backgroundColor: `${project.accentColor}18`,
                          color: project.accentColor,
                          border: `1px solid ${project.accentColor}35`,
                        }}
                      >
                        {project.status}
                      </span>
                    </div>

                    {/* Image Preview */}
                    <div className="aspect-video rounded-lg overflow-hidden border border-zinc-800/80 relative">
                      <img
                        src={projectImages[project.id] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-2xl font-display font-bold text-zinc-100 group-hover:text-white flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </h3>
                      <p className="text-xs font-mono-code text-zinc-400 mt-1">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed line-clamp-3">
                      {project.summary}
                    </p>
                  </div>

                  {/* Bottom Tech Tags */}
                  <div className="pt-6 mt-6 border-t border-zinc-800/80 flex flex-wrap gap-1.5 items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 2).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 2 && (
                        <span className="text-[10px] font-mono-code px-1.5 py-0.5 text-zinc-400">
                          +{project.techStack.length - 2}
                        </span>
                      )}
                    </div>

                    <span className="text-[10px] font-mono-code text-zinc-400">
                      {project.year}
                    </span>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../types';
import { X, ExternalLink, Cpu, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export default function ProjectModal({ project, onClose, onNavigateToSection }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#121216] border border-zinc-700/90 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-5 border-b border-zinc-800 bg-zinc-900/60">
            <div className="flex items-center gap-3">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: project.accentColor }}
              />
              <span className="text-xs font-mono-code uppercase tracking-wider text-zinc-400">
                {project.category} // {project.year}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="text-[10px] font-mono-code px-2 py-0.5 rounded font-bold uppercase"
                style={{
                  backgroundColor: `${project.accentColor}20`,
                  color: project.accentColor,
                  border: `1px solid ${project.accentColor}40`,
                }}
              >
                {project.status}
              </span>
              <button
                id="btn-close-project-modal"
                data-interactive="true"
                onClick={onClose}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <h3 className="text-2xl sm:text-4xl font-display font-black text-zinc-100 uppercase">
                {project.title}
              </h3>
              <p className="text-sm font-mono-code text-zinc-400 mt-1">
                {project.subtitle}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm font-sans text-zinc-300 leading-relaxed">
              {project.description}
            </div>

            {/* Highlights */}
            <div className="space-y-3">
              <div className="text-xs font-mono-code uppercase tracking-wider text-zinc-400">
                CORE TECHNICAL HIGHLIGHTS
              </div>
              <div className="space-y-2">
                {project.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-mono-code text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Website Field Clips & Visual Evidence (e.g. for T.E.R.R.A. & FarmVerse) */}
            {project.clips && project.clips.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="text-xs font-mono-code uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>WEBSITE FIELD CLIPS & EVIDENCE //</span>
                  </div>
                  {project.id === 'terra' && (
                    <a
                      href="https://terra-by-kabir.lovable.app/#contact"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono-code text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1"
                    >
                      <span>terra-by-kabir.lovable.app/#contact</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.id === 'farmverse' && (
                    <a
                      href="https://farmverse-technoxian.lovable.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-mono-code text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1"
                    >
                      <span>farmverse-technoxian.lovable.app</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.clips.map((clip, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/50 transition-colors space-y-2 group"
                    >
                      <div className="aspect-video w-full rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800 relative">
                        <img
                          src={clip.imageUrl}
                          alt={clip.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/85 border border-white/20 text-emerald-400 font-mono-code text-[9px] font-bold uppercase tracking-wider">
                          {clip.tag}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-xs font-sans font-bold text-zinc-100">
                          {clip.title}
                        </h4>
                        <p className="text-[11px] text-zinc-300 mt-0.5 leading-snug">
                          {clip.caption}
                        </p>
                        {clip.source && (
                          <p className="text-[9px] font-mono-code text-zinc-500 mt-1">
                            {clip.source}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3D Interactive Model Embed (e.g. Agri Mitra rover) */}
            {project.embed3dUrl && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>3D CAD ROVER TELEMETRY (SKETCHFAB)</span>
                  </span>
                  <span className="text-[10px] text-zinc-500">DRAG TO ROTATE 360°</span>
                </div>
                <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-black border border-emerald-500/40 shadow-inner">
                  <iframe
                    title={`${project.title} 3D Model`}
                    src={project.embed3dUrl}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                  />
                </div>
              </div>
            )}

            {/* Project Links / Exploration Endpoints */}
            {project.links && project.links.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono-code uppercase tracking-wider text-zinc-400">
                  PROJECT LINKS & REDIRECTS
                </div>
                <div className="flex flex-col gap-2">
                  {project.links.map((link, idx) => {
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
                            onClose();
                            onNavigateToSection(link.url.replace('#', ''));
                          }
                        }}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono-code transition-all cursor-pointer ${
                          isExternalLive
                            ? 'bg-emerald-950/50 hover:bg-emerald-900/70 border-emerald-500 text-emerald-200 shadow-md'
                            : 'bg-zinc-900 hover:bg-zinc-850 border-zinc-800 text-zinc-200'
                        }`}
                      >
                        <span className="font-semibold flex items-center gap-2">
                          {isExternalLive && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                          {link.label}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {isExternalLive && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500 text-zinc-950 font-bold uppercase">
                              REDIRECT
                            </span>
                          )}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono-code uppercase tracking-wider text-zinc-400">
                STACK & HARDWARE
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between gap-3 flex-wrap">
            <button
              onClick={onClose}
              className="text-xs font-mono-code text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              CLOSE WINDOW
            </button>

            <div className="flex items-center gap-2 flex-wrap">
              {project.id === 'terra' && (
                <a
                  href="https://terra-by-kabir.lovable.app/#contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono-code font-bold uppercase transition-all shadow-md"
                >
                  <span>LAUNCH TERRA (terra-by-kabir.lovable.app/#contact)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {project.id === 'farmverse' && (
                <a
                  href="https://farmverse-technoxian.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-mono-code font-bold uppercase transition-all shadow-md"
                >
                  <span>LAUNCH FARMVERSE (farmverse-technoxian.lovable.app)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                id="btn-modal-inquire"
                onClick={() => {
                  onClose();
                  onNavigateToSection('contact');
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-mono-code font-bold uppercase transition-all"
              >
                <span>INQUIRE ABOUT THIS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

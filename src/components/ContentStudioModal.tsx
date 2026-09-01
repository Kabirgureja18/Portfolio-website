import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Copy, CheckCircle2, Sliders, FileJson, RefreshCw, Quote } from 'lucide-react';
import { profileContent } from '../content/profile';
import { scrollQuoteContent, ScrollQuoteData } from '../content/scrollQuote';
import { roadQuoteContent, RoadQuoteData } from '../content/roadQuote';

interface ContentStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: typeof profileContent;
  onSaveProfile: (updated: typeof profileContent) => void;
  currentScrollQuote?: ScrollQuoteData;
  onSaveScrollQuote?: (updated: ScrollQuoteData) => void;
  currentRoadQuote?: RoadQuoteData;
  onSaveRoadQuote?: (updated: RoadQuoteData) => void;
}

export default function ContentStudioModal({
  isOpen,
  onClose,
  currentProfile,
  onSaveProfile,
  currentScrollQuote = scrollQuoteContent,
  onSaveScrollQuote,
  currentRoadQuote = roadQuoteContent,
  onSaveRoadQuote,
}: ContentStudioModalProps) {
  const [formData, setFormData] = useState({ ...currentProfile });
  const [quoteData, setQuoteData] = useState<ScrollQuoteData>({ ...currentScrollQuote });
  const [roadData, setRoadData] = useState<RoadQuoteData>({ ...currentRoadQuote });
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    if (onSaveScrollQuote) {
      onSaveScrollQuote(quoteData);
    }
    if (onSaveRoadQuote) {
      onSaveRoadQuote(roadData);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const copyJSON = () => {
    navigator.clipboard.writeText(
      JSON.stringify(
        { profile: formData, scrollQuote: quoteData, roadQuote: roadData },
        null,
        2
      )
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#121216] border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/60">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#ff3b30]" />
              <h3 className="text-sm font-mono-code font-bold text-zinc-100 uppercase">
                CONTENT STUDIO // LIVE CMS & ARCHITECTURE EDITOR
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="flex-1 p-6 overflow-y-auto space-y-4">
            <div>
              <label className="block text-xs font-mono-code text-zinc-300 mb-1 uppercase">
                FULL NAME
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-100 focus:outline-none focus:border-[#ff3b30]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-code text-zinc-300 mb-1 uppercase">
                HERO STATEMENT / OPENING LOGLINE
              </label>
              <textarea
                rows={2}
                value={formData.heroStatement}
                onChange={(e) => setFormData({ ...formData, heroStatement: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-sans text-zinc-100 focus:outline-none focus:border-[#ff3b30]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-code text-zinc-300 mb-1 uppercase">
                HERO SUBTITLE
              </label>
              <input
                type="text"
                value={formData.heroSubtitle}
                onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-100 focus:outline-none focus:border-[#ff3b30]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono-code text-zinc-300 mb-1 uppercase">
                EDITORIAL NARRATIVE (ABOUT)
              </label>
              <textarea
                rows={4}
                value={formData.editorialNarrative}
                onChange={(e) => setFormData({ ...formData, editorialNarrative: e.target.value })}
                className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-sans text-zinc-100 focus:outline-none focus:border-[#ff3b30]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono-code text-zinc-300 mb-1 uppercase">
                  PUBLIC EMAIL
                </label>
                <input
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-100 focus:outline-none focus:border-[#ff3b30]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono-code text-zinc-300 mb-1 uppercase">
                  CURRENT LOCATION
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-100 focus:outline-none focus:border-[#ff3b30]"
                />
              </div>
            </div>

            {/* Scroll Manifesto Section Quotes */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#ff3b30] uppercase font-bold">
                <Quote className="w-3.5 h-3.5 text-[#ff3b30]" />
                <span>SCROLL MANIFESTO TYPOGRAPHY (BEFORE ABOUT SECTION)</span>
              </div>

              <div>
                <label className="block text-xs font-mono-code text-zinc-300 mb-1 uppercase">
                  INITIAL THOUGHT SENTENCE (SMALL, FLOATING, BLUR-TO-SHARP)
                </label>
                <input
                  type="text"
                  value={quoteData.thoughtSentence}
                  onChange={(e) => setQuoteData({ ...quoteData, thoughtSentence: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-100 focus:outline-none focus:border-[#ff3b30]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-mono-code text-zinc-400 mb-1 uppercase">
                    PROJECT LINE 1
                  </label>
                  <input
                    type="text"
                    value={quoteData.projectLine1 || 'Mine usually end up'}
                    onChange={(e) => setQuoteData({ ...quoteData, projectLine1: e.target.value })}
                    className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-100 focus:outline-none focus:border-[#ff3b30]"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-mono-code text-zinc-400 mb-1 uppercase">
                    PROJECT LINE 2
                  </label>
                  <input
                    type="text"
                    value={quoteData.projectLine2 || 'becoming'}
                    onChange={(e) => setQuoteData({ ...quoteData, projectLine2: e.target.value })}
                    className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-100 focus:outline-none focus:border-[#ff3b30]"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-mono-code text-zinc-400 mb-1 uppercase">
                    PROJECT HIGHLIGHT (MASSIVE)
                  </label>
                  <input
                    type="text"
                    value={quoteData.projectHighlight || 'PROJECTS.'}
                    onChange={(e) => setQuoteData({ ...quoteData, projectHighlight: e.target.value })}
                    className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-100 focus:outline-none focus:border-[#ff3b30]"
                  />
                </div>
              </div>
            </div>

            {/* Cinematic Scroll Manifesto 2 (Between Achievements & Clothing) */}
            <div className="pt-4 border-t border-zinc-800/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#ff3b30] uppercase font-bold">
                <Quote className="w-3.5 h-3.5 text-[#ff3b30]" />
                <span>AUTONOMOUS ROAD MANIFESTO (BETWEEN ACHIEVEMENTS & CLOTHING)</span>
              </div>

              <div>
                <label className="block text-xs font-mono-code text-zinc-300 mb-1 uppercase">
                  LINE 1 (SLOW DISPERSION ENTRY)
                </label>
                <input
                  type="text"
                  value={roadData.line1}
                  onChange={(e) => setRoadData({ ...roadData, line1: e.target.value })}
                  className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-100 focus:outline-none focus:border-[#ff3b30]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-mono-code text-zinc-400 mb-1 uppercase">
                    LINE 2 INTRO
                  </label>
                  <input
                    type="text"
                    value={roadData.line2Intro}
                    onChange={(e) => setRoadData({ ...roadData, line2Intro: e.target.value })}
                    className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-100 focus:outline-none focus:border-[#ff3b30]"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-mono-code text-zinc-400 mb-1 uppercase">
                    VISUAL FOCUS (ITALIC SERIF)
                  </label>
                  <input
                    type="text"
                    value={roadData.line2Focus}
                    onChange={(e) => setRoadData({ ...roadData, line2Focus: e.target.value })}
                    className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-100 focus:outline-none focus:border-[#ff3b30]"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="block text-[11px] font-mono-code text-zinc-400 mb-1 uppercase">
                    LINE 2 OUTRO
                  </label>
                  <input
                    type="text"
                    value={roadData.line2Outro}
                    onChange={(e) => setRoadData({ ...roadData, line2Outro: e.target.value })}
                    className="w-full p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-100 focus:outline-none focus:border-[#ff3b30]"
                  />
                </div>
              </div>
            </div>

            {savedSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-xs font-mono-code text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Live updates applied to DOM instantly!</span>
              </div>
            )}
          </form>

          {/* Footer */}
          <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between">
            <button
              onClick={copyJSON}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-xs font-mono-code text-zinc-300 hover:text-white transition-colors"
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>{copied ? 'JSON COPIED!' : 'EXPORT JSON'}</span>
            </button>

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#ff3b30] hover:bg-red-600 text-white font-mono-code text-xs font-bold uppercase transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>SAVE & APPLY LIVE</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

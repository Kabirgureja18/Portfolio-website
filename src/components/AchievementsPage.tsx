import { useState, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Award,
  FileCheck,
  Search,
  ExternalLink,
  ChevronLeft,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Calendar,
  Building,
  Tag,
  Filter,
  Eye,
  Maximize2,
  X,
  UploadCloud,
  Plus,
  Share2,
  Cpu,
  Layers,
  Newspaper
} from 'lucide-react';

import { AchievementItem } from '../types';
import { achievementsContent } from '../content/achievements';

interface AchievementsPageProps {
  onBackToPortfolio: () => void;
}

export default function AchievementsPage({ onBackToPortfolio }: AchievementsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectingItem, setInspectingItem] = useState<AchievementItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [customAchievements, setCustomAchievements] = useState<AchievementItem[]>([]);

  // Form state for adding custom achievements
  const [newTitle, setNewTitle] = useState('');
  const [newOrg, setNewOrg] = useState('');
  const [newYear, setNewYear] = useState('2025');
  const [newCategory, setNewCategory] = useState<AchievementItem['category']>('Certificate');
  const [newAwardLevel, setNewAwardLevel] = useState<AchievementItem['awardLevel']>('Certified');
  const [newDesc, setNewDesc] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newCertUrl, setNewCertUrl] = useState('');
  const [newCredentialId, setNewCredentialId] = useState('');

  const allItems = useMemo(() => {
    return [...achievementsContent, ...customAchievements];
  }, [customAchievements]);

  const categories = [
    { id: 'ALL', label: 'ALL HONORS', count: allItems.length },
    {
      id: 'Certificate',
      label: 'CERTIFICATES',
      count: allItems.filter((i) => i.category === 'Certificate' || i.certificateUrl).length,
    },
    {
      id: 'Robotics',
      label: 'ROBOTICS & STEM',
      count: allItems.filter((i) => i.category === 'Robotics').length,
    },
    {
      id: 'MUN',
      label: 'MUN & DIPLOMACY',
      count: allItems.filter((i) => i.category === 'MUN').length,
    },
    {
      id: 'Press & Billboard',
      label: 'PRESS & BILLBOARDS',
      count: allItems.filter((i) => i.category === 'Press & Billboard').length,
    },
  ];

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'ALL' ||
        item.category === selectedCategory ||
        (selectedCategory === 'Certificate' && item.certificateUrl);

      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.credentialId?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [allItems, selectedCategory, searchQuery]);

  const handleAddCustomAchievement = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newOrg.trim()) return;

    const newItem: AchievementItem = {
      id: `custom-${Date.now()}`,
      title: newTitle.trim(),
      organization: newOrg.trim(),
      year: newYear,
      category: newCategory,
      awardLevel: newAwardLevel,
      description: newDesc.trim() || 'Verified achievement & credential record.',
      badge: newAwardLevel,
      evidenceType: newCertUrl ? 'Certificate' : newPhotoUrl ? 'Photograph' : 'Official Commendation',
      photoUrl: newPhotoUrl.trim() || undefined,
      certificateUrl: newCertUrl.trim() || undefined,
      credentialId: newCredentialId.trim() || `KG-VERIFIED-${Date.now().toString().slice(-4)}`,
      verifiedNote: 'Added via Kabir Portfolio Archive Studio.',
      featured: true,
      tags: [newCategory, 'Verified'],
    };

    setCustomAchievements((prev) => [newItem, ...prev]);
    setIsAddModalOpen(false);

    // Reset form
    setNewTitle('');
    setNewOrg('');
    setNewDesc('');
    setNewPhotoUrl('');
    setNewCertUrl('');
    setNewCredentialId('');
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 font-sans selection:bg-cyan-500 selection:text-black pb-32">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#070709]/90 backdrop-blur-md border-b border-zinc-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToPortfolio}
            data-interactive="true"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs font-mono-code transition-all cursor-pointer shadow-sm group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-cyan-400" />
            <span>BACK TO PORTFOLIO</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono-code text-zinc-500">
            <span>/</span>
            <span className="text-zinc-300">ARCHIVE // HONORS & CERTIFICATIONS</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            data-interactive="true"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 text-xs font-mono-code transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>ADD CERTIFICATE</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-10 sm:pt-16">
        {/* Page Hero Section */}
        <section className="mb-12 border-b border-zinc-800/80 pb-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/40 border border-cyan-800/50 text-[11px] font-mono-code text-cyan-400 mb-4">
                <Trophy className="w-3.5 h-3.5" />
                <span>OFFICIAL ARCHIVE & VERIFIED RECORDS</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-zinc-100 uppercase tracking-tight">
                HONORS, AWARDS & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-300 to-cyan-400">
                  CERTIFICATES
                </span>
              </h1>
              <p className="mt-4 text-sm sm:text-base font-mono-code text-zinc-400 max-w-2xl leading-relaxed">
                Complete documented gallery of competitions, Model United Nations awards, robotics showcases, public billboard artwork selections, and technical certifications.
              </p>
            </div>

            {/* Quick Summary Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
                <div className="text-2xl font-display font-bold text-zinc-100">{allItems.length}</div>
                <div className="text-[10px] font-mono-code text-zinc-400 uppercase mt-0.5">Total Records</div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
                <div className="text-2xl font-display font-bold text-emerald-400">
                  {allItems.filter((i) => i.certificateUrl || i.category === 'Certificate').length}
                </div>
                <div className="text-[10px] font-mono-code text-zinc-400 uppercase mt-0.5">Certificates</div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
                <div className="text-2xl font-display font-bold text-cyan-400">
                  {allItems.filter((i) => i.category === 'Robotics').length}
                </div>
                <div className="text-[10px] font-mono-code text-zinc-400 uppercase mt-0.5">STEM & Robotics</div>
              </div>
              <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-center">
                <div className="text-2xl font-display font-bold text-amber-400">
                  {allItems.filter((i) => i.category === 'MUN').length}
                </div>
                <div className="text-[10px] font-mono-code text-zinc-400 uppercase mt-0.5">MUN Awards</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Bar & Live Search */}
        <section className="mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  data-interactive="true"
                  className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-mono-code transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-zinc-100 text-zinc-950 font-bold shadow-lg'
                      : 'bg-zinc-900/70 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      isSelected ? 'bg-zinc-300 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] sm:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by award, org, credential..."
              className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/50 rounded-xl pl-9 pr-4 py-2 text-xs font-mono-code text-zinc-200 placeholder-zinc-500 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </section>

        {/* Gallery Grid of Achievements & Certificates */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-950/40">
            <Trophy className="w-8 h-8 text-zinc-600 mx-auto mb-3" />
            <div className="text-sm font-mono-code text-zinc-400">No achievements found matching your search.</div>
            <button
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-1.5 rounded-full bg-zinc-800 text-xs font-mono-code text-zinc-300 hover:text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => {
              const hasImage = !!item.photoUrl || !!item.certificateUrl;
              const displayImage = item.certificateUrl || item.photoUrl;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-zinc-700 transition-all flex flex-col justify-between overflow-hidden shadow-xl"
                >
                  <div>
                    {/* Visual Media Header Preview */}
                    {hasImage ? (
                      <div
                        onClick={() => setInspectingItem(item)}
                        className="relative h-48 w-full bg-zinc-950 overflow-hidden cursor-pointer group/img border-b border-zinc-800/80"
                      >
                        <img
                          src={displayImage}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 opacity-80 group-hover/img:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/30" />

                        {/* Top floating badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-md bg-zinc-950/80 border border-zinc-700 text-[10px] font-mono-code font-bold text-zinc-200 backdrop-blur-md">
                            {item.evidenceType || 'Verified Evidence'}
                          </span>
                          <div className="w-7 h-7 rounded-full bg-zinc-950/80 border border-zinc-700 flex items-center justify-center text-zinc-300 group-hover/img:text-white backdrop-blur-md">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>

                        {/* Bottom year pill */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-cyan-950/90 border border-cyan-800/80 text-[10px] font-mono-code font-bold text-cyan-300">
                            {item.year}
                          </span>
                          {item.awardLevel && (
                            <span className="px-2 py-0.5 rounded bg-emerald-950/90 border border-emerald-800/80 text-[10px] font-mono-code font-bold text-emerald-300">
                              {item.awardLevel}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 border-b border-zinc-800/60 flex items-center justify-between bg-zinc-950/40">
                        <span className="text-[10px] font-mono-code text-zinc-400">{item.category}</span>
                        <span className="text-[10px] font-mono-code text-cyan-400 font-bold">{item.year}</span>
                      </div>
                    )}

                    {/* Card Body Details */}
                    <div className="p-5">
                      <div className="text-xs font-mono-code text-zinc-400 mb-1 flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{item.organization}</span>
                      </div>

                      <h3 className="text-lg font-display font-bold text-zinc-100 group-hover:text-cyan-300 transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs font-sans text-zinc-400 mt-2.5 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="mt-3.5 pt-3 border-t border-zinc-800/60 space-y-1.5">
                          {item.highlights.slice(0, 2).map((h, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px] font-mono-code text-zinc-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{h}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tags */}
                      {item.tags && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-[10px] font-mono-code text-zinc-400"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-4 pt-0 border-t border-zinc-800/40 mt-4 flex items-center justify-between">
                    <button
                      onClick={() => setInspectingItem(item)}
                      data-interactive="true"
                      className="text-xs font-mono-code text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>INSPECT RECORD</span>
                    </button>

                    {item.credentialId && (
                      <span className="text-[10px] font-mono-code text-zinc-500">ID: {item.credentialId}</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      {/* INSPECTION LIGHTBOX MODAL */}
      <AnimatePresence>
        {inspectingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c10] border border-zinc-700 rounded-2xl shadow-2xl overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-[#0c0c10]/95 border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono-code font-bold text-zinc-200">
                    EVIDENCE RECORD // {inspectingItem.category.toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={() => setInspectingItem(null)}
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Large Photo or Certificate Preview */}
                {(inspectingItem.certificateUrl || inspectingItem.photoUrl) && (
                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-inner">
                    <img
                      src={inspectingItem.certificateUrl || inspectingItem.photoUrl}
                      alt={inspectingItem.title}
                      className="w-full max-h-[420px] object-contain bg-zinc-950"
                    />
                  </div>
                )}

                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded bg-cyan-950 border border-cyan-800 text-xs font-mono-code font-bold text-cyan-300">
                      {inspectingItem.year}
                    </span>
                    {inspectingItem.awardLevel && (
                      <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-800 text-xs font-mono-code font-bold text-emerald-300">
                        {inspectingItem.awardLevel}
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono-code text-zinc-300">
                      {inspectingItem.evidenceType || 'Official Record'}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-display font-black text-zinc-100">
                    {inspectingItem.title}
                  </h2>
                  <div className="text-sm font-mono-code text-zinc-400 mt-1 flex items-center gap-2">
                    <Building className="w-4 h-4 text-zinc-500" />
                    <span>{inspectingItem.organization}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
                  {inspectingItem.description}
                </div>

                {/* Highlights breakdown */}
                {inspectingItem.highlights && inspectingItem.highlights.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-mono-code font-bold text-zinc-300 uppercase">
                      Documented Deliverables & Highlights:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {inspectingItem.highlights.map((h, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800 flex items-start gap-2 text-xs font-mono-code text-zinc-300"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Verification Notice */}
                {inspectingItem.verifiedNote && (
                  <div className="p-3.5 rounded-lg bg-emerald-950/30 border border-emerald-800/50 flex items-start gap-2.5 text-xs font-mono-code text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{inspectingItem.verifiedNote}</span>
                  </div>
                )}

                {/* Credential ID */}
                {inspectingItem.credentialId && (
                  <div className="flex items-center justify-between text-xs font-mono-code text-zinc-400 border-t border-zinc-800 pt-4">
                    <span>CREDENTIAL VERIFICATION ID:</span>
                    <span className="font-bold text-zinc-200">{inspectingItem.credentialId}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD / STAGE CERTIFICATE MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-[#0c0c10] border border-zinc-700 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div className="flex items-center gap-2 text-sm font-mono-code font-bold text-zinc-100">
                  <UploadCloud className="w-4 h-4 text-cyan-400" />
                  <span>ADD ACHIEVEMENT / CERTIFICATE</span>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <form onSubmit={handleAddCustomAchievement} className="mt-6 space-y-4 text-xs font-mono-code">
                <div>
                  <label className="block text-zinc-400 mb-1">AWARD / CERTIFICATE TITLE *</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. National Robotics Championship First Place"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-200 focus:border-cyan-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">ORGANIZATION / ISSUER *</label>
                    <input
                      type="text"
                      required
                      value={newOrg}
                      onChange={(e) => setNewOrg(e.target.value)}
                      placeholder="e.g. STEM Robotics Board"
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-200 focus:border-cyan-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">YEAR</label>
                    <input
                      type="text"
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-200 focus:border-cyan-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">CATEGORY</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-zinc-200 focus:border-cyan-500 outline-none"
                    >
                      <option value="Certificate">Certificate</option>
                      <option value="Robotics">Robotics & STEM</option>
                      <option value="MUN">MUN & Debate</option>
                      <option value="Press & Billboard">Press & Billboard</option>
                      <option value="Award">General Award</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">AWARD LEVEL</label>
                    <select
                      value={newAwardLevel}
                      onChange={(e) => setNewAwardLevel(e.target.value as any)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-zinc-200 focus:border-cyan-500 outline-none"
                    >
                      <option value="Winner">Winner / 1st Place</option>
                      <option value="Commendation">Commendation</option>
                      <option value="Certified">Certified</option>
                      <option value="Finalist">Finalist</option>
                      <option value="Featured">Featured</option>
                      <option value="Special Mention">Special Mention</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">CERTIFICATE / EVIDENCE PHOTO URL</label>
                  <input
                    type="url"
                    value={newCertUrl}
                    onChange={(e) => setNewCertUrl(e.target.value)}
                    placeholder="https://example.com/certificate.jpg"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-200 focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">EVENT / CEREMONY PHOTO URL (OPTIONAL)</label>
                  <input
                    type="url"
                    value={newPhotoUrl}
                    onChange={(e) => setNewPhotoUrl(e.target.value)}
                    placeholder="https://example.com/stage-photo.jpg"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-200 focus:border-cyan-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">DESCRIPTION & ACHIEVEMENTS</label>
                  <textarea
                    rows={3}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Details about what you engineered, debated, or accomplished..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-zinc-200 focus:border-cyan-500 outline-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-zinc-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold transition-all cursor-pointer shadow-lg"
                  >
                    Save to Archive
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

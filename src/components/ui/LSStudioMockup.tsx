import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Laptop, Smartphone, ExternalLink, ShieldCheck, Wifi, Battery, Sparkles, Terminal } from 'lucide-react';
import { ProjectItem } from '../../types';
import { playPop } from '../../utils/soundFX';

interface LSStudioMockupProps {
  project: ProjectItem;
  imageUrl: string;
  onOpenModal?: () => void;
  activeClipIndex?: number;
  onSelectClip?: (idx: number) => void;
}

export default function LSStudioMockup({
  project,
  imageUrl,
  onOpenModal,
  activeClipIndex,
  onSelectClip,
}: LSStudioMockupProps) {
  const [deviceType, setDeviceType] = useState<'macbook' | 'iphone' | '3d-rover'>('macbook');
  const [localClipIndex, setLocalClipIndex] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentClipIdx = activeClipIndex !== undefined ? activeClipIndex : localClipIndex;
  const currentClip = project.clips && project.clips[currentClipIdx] ? project.clips[currentClipIdx] : null;
  const displayedImage = currentClip ? currentClip.imageUrl : imageUrl;

  const isFarmVerse = project.id === 'farmverse' || project.id === 'farmcraft';
  const isTerra = project.id === 'terra';
  const liveUrl = project.liveUrl || (isFarmVerse ? 'https://farmverse-technoxian.lovable.app/' : (isTerra ? 'https://terra-by-kabir.lovable.app/#contact' : null));
  const liveDomain = isFarmVerse ? 'farmverse-technoxian.lovable.app' : (isTerra ? 'terra-by-kabir.lovable.app/#contact' : null);

  const handleClipChange = (idx: number) => {
    playPop(500 + idx * 30);
    if (onSelectClip) {
      onSelectClip(idx);
    } else {
      setLocalClipIndex(idx);
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Subtle 3D perspective tilt (-6deg to +6deg)
    setRotateX((0.5 - y) * 12);
    setRotateY((x - 0.5) * 12);
    setGlarePos({ x: x * 100, y: y * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos({ x: 50, y: 50 });
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* LS Graphics Device Switcher Bar */}
      <div className="w-full flex items-center justify-between pb-3 text-xs font-mono-code flex-wrap gap-2">
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
            LS.GRAPHICS // 3D STUDIO MOCKUP
          </span>
          <span className="hidden sm:inline text-zinc-600">•</span>
          <span className="hidden sm:inline text-zinc-400 text-[11px]">
            {deviceType === 'macbook'
              ? 'STUDIO DISPLAY 32"'
              : deviceType === 'iphone'
              ? 'IPHONE 16 PRO CLAY'
              : 'AGRI MITRA 3D TELEMETRY'}
          </span>
        </div>

        <div className="flex items-center p-1 rounded-full bg-zinc-900/90 border border-zinc-800 shadow-lg flex-wrap">
          {project.embed3dUrl && (
            <button
              type="button"
              data-interactive="true"
              data-cursor-text="3D ROVER"
              onClick={() => {
                playPop(620);
                setDeviceType('3d-rover');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
                deviceType === '3d-rover'
                  ? 'bg-emerald-400 text-zinc-950 font-bold shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[11px]">3D ROVER</span>
            </button>
          )}

          <button
            type="button"
            data-interactive="true"
            data-cursor-text="DESKTOP"
            onClick={() => {
              playPop(520);
              setDeviceType('macbook');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
              deviceType === 'macbook'
                ? 'bg-zinc-100 text-zinc-950 font-bold shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="text-[11px]">STUDIO DISPLAY</span>
          </button>

          <button
            type="button"
            data-interactive="true"
            data-cursor-text="MOBILE"
            onClick={() => {
              playPop(560);
              setDeviceType('iphone');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all cursor-pointer ${
              deviceType === 'iphone'
                ? 'bg-zinc-100 text-zinc-950 font-bold shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="text-[11px]">IPHONE CLAY</span>
          </button>
        </div>
      </div>

      {/* 3D Perspective Stage Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full flex items-center justify-center py-4 relative"
        style={{ perspective: 1200 }}
      >
        <motion.div
          animate={{
            rotateX,
            rotateY,
            scale: rotateX !== 0 ? 1.015 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 220 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative max-w-full"
        >
          {deviceType === '3d-rover' && project.embed3dUrl ? (
            /* ========================================================
               0. 3D INTERACTIVE ROVER / TELEMETRY VIEWER
               ======================================================== */
            <div
              className="w-full max-w-[640px] rounded-2xl p-2.5 sm:p-3 bg-gradient-to-b from-[#252830] via-[#16181f] to-[#0e1014] border border-emerald-500/50 shadow-[0_30px_90px_-20px_rgba(16,185,129,0.25),0_10px_30px_-10px_rgba(0,0,0,0.8)] relative overflow-hidden"
              style={{
                boxShadow: `0 35px 80px -20px rgba(16,185,129,0.3), 0 10px 30px rgba(0,0,0,0.9)`,
              }}
            >
              {/* Aluminum Bezel Chamfer Highlight */}
              <div className="absolute inset-0 rounded-2xl border border-emerald-500/30 pointer-events-none" />

              {/* Inner Screen Bezel */}
              <div className="w-full rounded-xl bg-[#09090c] border border-zinc-800/90 overflow-hidden relative group">
                {/* Browser Title Bar / Window Controls */}
                <div className="h-8 px-3 bg-[#13171e] border-b border-zinc-800/80 flex items-center justify-between text-[10px] font-mono-code text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-sm" />
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-[10px] shadow-sm">
                    <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-white">AGRI MITRA 3D TELEMETRY</span>
                    <span className="text-emerald-400/80 hidden sm:inline">(SKETCHFAB ENGINE)</span>
                  </div>

                  <div className="text-[10px] text-emerald-400 uppercase flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>3D ACTIVE</span>
                  </div>
                </div>

                {/* 3D Model Iframe Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <iframe
                    title="Agri Mitra - Autonomous Agriculture Rover 3D Model"
                    src={project.embed3dUrl}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; xr-spatial-tracking"
                  />

                  {/* 3D Drag Hint Banner */}
                  <div className="absolute bottom-2 left-3 right-3 pointer-events-none flex items-center justify-between">
                    <div className="flex items-center gap-2 p-1.5 px-2.5 rounded-lg bg-black/85 backdrop-blur-md border border-emerald-500/30 text-[10px] font-mono-code text-emerald-300">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      <span>CLICK & DRAG TO ROTATE 360° // SCROLL TO ZOOM</span>
                    </div>

                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-[10px] font-mono-code font-bold uppercase transition-all shadow-md"
                      >
                        <span>LAUNCH LIVE ↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Workstation Stand Indicator */}
              <div className="w-full flex items-center justify-center pt-2">
                <div className="w-20 h-1 rounded-full bg-emerald-500/40" />
              </div>
            </div>
          ) : deviceType === 'macbook' ? (
            /* ========================================================
               1. LS.GRAPHICS STUDIO DISPLAY / MACBOOK PRO MOCKUP
               ======================================================== */
            <div
              className="w-full max-w-[620px] rounded-2xl p-2.5 sm:p-3 bg-gradient-to-b from-[#2b2b32] via-[#1c1c22] to-[#121216] border border-zinc-700/80 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85),0_10px_30px_-10px_rgba(255,59,48,0.15)] relative overflow-hidden"
              style={{
                boxShadow: `0 35px 80px -20px ${project.accentColor || '#ff3b30'}25, 0 10px 30px rgba(0,0,0,0.8)`,
              }}
            >
              {/* Aluminum Bezel Chamfer Highlight */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />

              {/* Top Notch & Optic Lens */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center">
                <div className="w-20 h-3.5 bg-[#09090b] rounded-b-lg border-b border-x border-zinc-800 flex items-center justify-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Inner Screen Bezel */}
              <div className="w-full rounded-xl bg-[#09090c] border border-zinc-800/90 overflow-hidden relative group">
                {/* Browser Title Bar / Window Controls */}
                <div className="h-7 px-3 bg-[#16161b] border-b border-zinc-800/80 flex items-center justify-between text-[10px] font-mono-code text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] inline-block shadow-sm" />
                  </div>

                  {/* Browser Address Bar */}
                  {liveUrl ? (
                    <a
                      href={liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-0.5 rounded-md bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/50 text-emerald-300 text-[10px] max-w-[280px] truncate transition-all cursor-pointer group shadow-sm"
                      title={`Visit live platform: ${liveDomain}`}
                    >
                      <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="text-emerald-400/80">https://</span>
                      <span className="text-white font-semibold underline decoration-emerald-400/60">{liveDomain}</span>
                      <ExternalLink className="w-2.5 h-2.5 ml-1 text-emerald-300 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-1 px-3 py-0.5 rounded-md bg-zinc-900/90 border border-zinc-800 text-zinc-300 text-[10px] max-w-[260px] truncate">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span className="text-zinc-500">https://</span>
                      <span className="text-zinc-200 font-semibold">{project.id}.kabir.lab</span>
                      <span className="text-zinc-500">/spec</span>
                    </div>
                  )}

                  <div className="text-[10px] text-zinc-500 uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>60 FPS</span>
                  </div>
                </div>

                {/* Main Screen Content Image & Overlays */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={displayedImage}
                    alt={currentClip ? currentClip.title : project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Active Clip Badge */}
                  {currentClip && (
                    <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2 p-1.5 px-2.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono-code text-white shadow-lg">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500 text-zinc-950 font-bold text-[9px]">
                        {currentClip.tag}
                      </span>
                      <span className="text-zinc-100 font-medium">{currentClip.title}</span>
                    </div>
                  )}

                  {/* LS Graphics Ambient Studio Screen Reflection */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)`,
                    }}
                  />

                  {/* Screen HUD Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="flex items-center gap-2 p-1.5 px-3 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono-code text-white">
                      <span
                        className="w-2 h-2 rounded-full animate-ping"
                        style={{ backgroundColor: project.accentColor || '#ff3b30' }}
                      />
                      <span className="font-bold">{project.title}</span>
                      <span className="text-zinc-400 text-[10px]">// {project.year}</span>
                    </div>

                    <div className="pointer-events-auto flex items-center gap-2">
                      {liveUrl && (
                        <a
                          href={liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-[11px] font-mono-code font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                        >
                          <span>LIVE DEMO ↗</span>
                        </a>
                      )}
                      {onOpenModal && (
                        <button
                          type="button"
                          data-interactive="true"
                          onClick={onOpenModal}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#ff3b30] hover:bg-[#ff5147] text-white text-[11px] font-mono-code font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                        >
                          <span>INSPECT</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Macbook Chin with subtle notch */}
              <div className="w-full flex items-center justify-center pt-2">
                <div className="w-16 h-1 rounded-full bg-zinc-700/60" />
              </div>
            </div>
          ) : (
            /* ========================================================
               2. LS.GRAPHICS IPHONE 16 PRO CLAY MOCKUP
               ======================================================== */
            <div
              className="w-[280px] sm:w-[320px] rounded-[44px] p-3 bg-gradient-to-b from-[#2a2a32] via-[#1a1a20] to-[#0f0f13] border-2 border-zinc-700 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.9),0_15px_30px_rgba(255,59,48,0.12)] relative overflow-hidden"
              style={{
                boxShadow: `0 35px 80px -20px ${project.accentColor || '#ff3b30'}28, 0 20px 40px rgba(0,0,0,0.85)`,
              }}
            >
              {/* Outer Titanium Matte Bezel */}
              <div className="absolute inset-0 rounded-[44px] border border-white/10 pointer-events-none" />

              {/* Speaker Ear-piece */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-zinc-800 z-30" />

              {/* Inner OLED Display Container */}
              <div className="w-full rounded-[36px] bg-[#09090c] border border-zinc-800 overflow-hidden relative group">
                {/* Dynamic Island HUD */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 w-24 h-6 bg-black rounded-full border border-zinc-800/80 flex items-center justify-between px-2 text-[8px] font-mono-code text-zinc-300 shadow-md">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: project.accentColor || '#ff3b30' }}
                  />
                  <span className="font-bold">{project.status}</span>
                  <div className="w-2 h-2 rounded-full bg-zinc-800 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  </div>
                </div>

                {/* Status Bar */}
                <div className="h-10 px-5 bg-transparent flex items-center justify-between text-[10px] font-sans font-semibold text-zinc-200 relative z-20 pt-1">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3 h-3 text-zinc-300" />
                    <span className="text-[9px] font-mono-code">5G</span>
                    <Battery className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>

                {/* Screen Content */}
                <div className="relative aspect-[9/17] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={displayedImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* LS Graphics Glare */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 40%, transparent 65%)`,
                    }}
                  />

                  {/* Mobile Card Overlay */}
                  <div className="absolute bottom-4 left-3 right-3 p-3 rounded-2xl bg-black/85 backdrop-blur-md border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono-code uppercase text-[#ff3b30] font-bold">
                        {project.category}
                      </span>
                      <span className="text-[9px] font-mono-code text-zinc-400">{project.year}</span>
                    </div>
                    <div className="text-xs font-display font-black text-white">{project.title}</div>
                    <div className="text-[10px] font-mono-code text-zinc-400 line-clamp-2">
                      {currentClip ? currentClip.caption : project.summary}
                    </div>

                    {liveUrl && (
                      <a
                        href={liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 flex items-center justify-center gap-1 w-full py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-[10px] font-mono-code font-bold uppercase transition-all"
                      >
                        <span>LAUNCH LIVE PLATFORM ↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* iOS Home Indicator Bar */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-white/40 z-30" />
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Interactive Clip Switcher Bar for Projects with Clips (e.g., T.E.R.R.A. & FarmVerse) */}
      {project.clips && project.clips.length > 0 && (
        <div className="w-full max-w-[620px] pt-1 pb-2 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono-code text-zinc-400 px-1">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              WEBSITE FIELD CLIPS & EVIDENCE //
            </span>
            {liveUrl && liveDomain && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1 transition-colors"
              >
                <span>{liveDomain}</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
            {project.clips.map((clip, idx) => (
              <button
                key={idx}
                type="button"
                data-interactive="true"
                onClick={() => handleClipChange(idx)}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-1.5 group ${
                  currentClipIdx === idx
                    ? 'bg-emerald-950/60 border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.15)] text-white'
                    : 'bg-zinc-900/80 hover:bg-zinc-850 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-[9px] font-mono-code font-bold uppercase px-1.5 py-0.5 rounded ${
                      currentClipIdx === idx
                        ? 'bg-emerald-500 text-zinc-950'
                        : 'bg-zinc-800 text-zinc-400 group-hover:text-zinc-200'
                    }`}
                  >
                    {clip.tag}
                  </span>
                  {currentClipIdx === idx && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                </div>

                <div className="w-full aspect-[16/9] rounded-md overflow-hidden bg-zinc-950 border border-zinc-800 relative">
                  <img
                    src={clip.imageUrl}
                    alt={clip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <span className="text-[10px] font-sans font-semibold text-zinc-200 truncate leading-tight">
                  {clip.title}
                </span>
              </button>
            ))}
          </div>

          {currentClip && (
            <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800/80 flex items-start gap-2.5 text-xs text-zinc-300">
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 text-[9px] font-mono-code font-bold uppercase shrink-0 mt-0.5">
                {currentClip.tag}
              </span>
              <div className="space-y-0.5">
                <p className="text-[11px] text-zinc-200 leading-snug">
                  {currentClip.caption}
                </p>
                {currentClip.source && (
                  <p className="text-[9px] font-mono-code text-zinc-500">
                    Source: {currentClip.source}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

import { PhotoItem } from '../types';
import { Camera, MapPin, Film, Sliders } from 'lucide-react';

interface PhotographySectionProps {
  photos: PhotoItem[];
}

export default function PhotographySection({ photos }: PhotographySectionProps) {
  return (
    <section
      id="photography"
      className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-b border-zinc-800/80 bg-[#090a0d] relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.25em] text-pink-400 mb-3">
              <Camera className="w-4 h-4 text-pink-400" />
              SECTOR 06 // EDITORIAL STREET & MACRO FRAMES
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-zinc-100 uppercase">
              PHOTOGRAPHY <span className="text-zinc-500">& FRAMES</span>
            </h2>
          </div>

          <div className="text-xs font-mono-code text-zinc-400 max-w-sm">
            Visual journal: Brutalist concrete shadows, street reflections, circuit macro studies, and high-velocity sports action.
          </div>
        </div>

        {/* Photography Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
          {photos.map((photo) => (
            <div
              key={photo.id}
              id={`photo-card-${photo.id}`}
              data-interactive="true"
              data-cursor-text="PHOTO"
              className="p-6 rounded-2xl border border-zinc-800/80 bg-[#121216]/50 hover:bg-zinc-800/40 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Photo Frame Container with Brutalist Minimalist Treatment */}
              <div className="w-full h-56 sm:h-64 rounded-xl bg-zinc-950 border border-zinc-800 relative overflow-hidden flex flex-col justify-between p-4 mb-5">
                {/* Visual Camera Meta HUD */}
                <div className="flex items-center justify-between z-10 text-[10px] font-mono-code text-zinc-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-pink-400" />
                    {photo.location}
                  </span>
                  <span>{photo.year}</span>
                </div>

                {/* Simulated Film Grain & Lighting Composition */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-zinc-900/60 to-zinc-800/20 opacity-80" />

                <div className="z-10 flex items-center justify-between text-[10px] font-mono-code text-zinc-300">
                  <span className="px-2 py-0.5 rounded bg-zinc-900/90 border border-zinc-800">
                    {photo.camera}
                  </span>
                  <span className="text-pink-300 uppercase">{photo.mood}</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xl font-display font-bold text-zinc-100">
                  {photo.title}
                </h3>
                <p className="text-xs sm:text-sm font-sans text-zinc-300 leading-relaxed">
                  {photo.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono-code text-zinc-400">
                <span>EXIF: RAW COLOR PROFILE</span>
                <span>CURATED SHOT</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

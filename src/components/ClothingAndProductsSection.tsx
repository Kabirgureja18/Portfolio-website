import { ProductItem } from '../types';
import { Shirt, Package, Sparkles, ExternalLink, ArrowRight, Mail } from 'lucide-react';

interface ClothingAndProductsProps {
  products: ProductItem[];
  onNavigateToContact: () => void;
}

export default function ClothingAndProductsSection({
  products,
  onNavigateToContact,
}: ClothingAndProductsProps) {
  return (
    <section
      id="products"
      className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-b border-zinc-800/80 bg-[#0c0c0e] relative"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-[0.25em] text-amber-400 mb-3">
              <Shirt className="w-4 h-4 text-amber-400" />
              SECTOR 07 // APPAREL & COMMERCIAL GOODS
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black tracking-tight text-zinc-100 uppercase">
              CLOTHING & <span className="text-zinc-500">PRODUCTS</span>
            </h2>
          </div>

          <div className="text-xs font-mono-code text-zinc-400 max-w-sm">
            Independent streetwear label in active development, student web builds, and digital merchandise. Direct inquiry model.
          </div>
        </div>

        {/* Clothing Brand Special Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl border border-zinc-700 bg-gradient-to-r from-zinc-900 via-[#16161b] to-zinc-900 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono-code text-amber-400 uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              INDEPENDENT APPAREL LABEL // ROOT INDIA (√ INDIA)
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-zinc-100 uppercase">
              ROOT INDIA APPAREL
            </h3>
            <p className="text-sm font-sans text-zinc-300 leading-relaxed">
              Curating heavyweight boxy streetwear silhouettes, distressed monochrome washes, and graphic typography placements fusing Bharat heritage with modern underground culture. Standalone label storefront launching soon.
            </p>
          </div>

          <button
            id="btn-clothing-redirect"
            data-interactive="true"
            onClick={onNavigateToContact}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-mono-code font-bold uppercase transition-all cursor-pointer shadow-lg"
          >
            <span>EARLY DROP ACCESS / INQUIRE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Other Products Grid */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-8">
          {products.slice(1).map((prod) => (
            <div
              key={prod.id}
              id={`product-card-${prod.id}`}
              className="p-6 rounded-2xl border border-zinc-800/80 bg-[#121216]/60 hover:bg-zinc-800/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 uppercase">
                    {prod.type}
                  </span>
                  <span className="text-[10px] font-mono-code text-amber-400 font-medium">
                    {prod.status}
                  </span>
                </div>

                <h4 className="text-lg font-display font-bold text-zinc-100">
                  {prod.name}
                </h4>

                <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-[10px] font-mono-code text-zinc-400">
                  {prod.priceNote}
                </span>
                <button
                  data-interactive="true"
                  onClick={onNavigateToContact}
                  className="text-xs font-mono-code text-zinc-300 hover:text-white font-bold inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>CONTACT</span>
                  <ArrowRight className="w-3 h-3 text-[#ff3b30]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

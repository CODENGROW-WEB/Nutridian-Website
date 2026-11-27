import SectionHeading from './SectionHeading'

export default function GlanceProducts({ onRequestInfo }) {
  const products = [
    {
      id: 'god_n',
      name: 'GOD-N',
      logo: '/products/god_n_logo.webp',
      image: '/products/god_n_5000_25kg.webp?v=20261123',
      alt: 'GOD-N 5000 Feed Additive 25kg Bag',
      kcplBadge: true
    },
    {
      id: 'nutriquinol',
      name: 'Nutriquinol Powder',
      logo: '/products/nutriquinol_60_logo.webp',
      isPowder: true,
      image: '/products/nutriquinol_powder_25kg.webp?v=20261123',
      alt: 'Nutriquinol Powder 25kg Bag',
      kcplBadge: true
    },
    {
      id: 'avirom_plus',
      name: 'AVIROM PLUS',
      logo: '/products/avirom_plus_logo.webp',
      image: '/products/avirom_plus_25kg.webp?v=20261123',
      alt: 'Avirom Plus Premixture 25kg Bag',
      kcplBadge: true
    }
  ]

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header Badge with authentic rooster emblem */}
        <SectionHeading title="A GLANCE AT OUR PRODUCTS" className="mb-8 sm:mb-14 md:mb-18" />

        {/* 3 Display Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch">
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => onRequestInfo && onRequestInfo(p.name)}
              className="group relative flex flex-col bg-white rounded-3xl border-2 border-slate-300/80 overflow-hidden shadow-lg hover:shadow-2xl hover:border-orange-500/80 transition-all duration-300 cursor-pointer"
            >
              
              {/* Product Image Stage - High Visibility & Full Product Pack */}
              <div className="relative w-full aspect-[4/5] bg-gradient-to-b from-[#eef2f6] via-[#e2e8f0]/60 to-[#edf2f7] rounded-t-3xl border-b border-slate-200 p-6 sm:p-8 flex items-center justify-center overflow-hidden">
                {/* Subtle Inner Arched Dome Architecture matching original brand design */}
                <div className="absolute inset-x-6 top-6 bottom-0 bg-white/70 rounded-t-[80px] sm:rounded-t-[100px] border-t border-x border-white/80 pointer-events-none" />

                {/* 3D Product Bag Graphic - Full Visibility (No Cutoff) */}
                <img
                  src={p.image}
                  alt={p.alt}
                  className="relative z-10 w-full h-full max-h-[88%] object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.30)] transition-transform duration-300 group-hover:scale-105 select-none"
                />

                {/* Hover CTA Overlay Button */}
                <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-3xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                  <span className="px-6 py-3 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Request Information
                  </span>
                </div>
              </div>

              {/* Bottom White Rectangular Title Box - Authentic Brand Logo Images */}
              <div className="py-6 sm:py-8 px-4 bg-white flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px]">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="h-11 sm:h-13 lg:h-15 w-auto max-w-[85%] object-contain drop-shadow-xs transition-transform group-hover:scale-105"
                />
                {p.isPowder && (
                  <span className="text-sm sm:text-base font-serif italic text-indigo-700 tracking-wider font-bold mt-1">
                    Powder
                  </span>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

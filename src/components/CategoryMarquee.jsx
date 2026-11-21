export default function CategoryMarquee({ onSelectCategory }) {
  const categories = [
    'Non Antibiotic Growth Promoters',
    'Anticoccidials',
    "AGP's (Antibiotic Growth Promoters)",
    'Anti Mycoplasma',
    'Organic Acids & Acidifier',
    'Ovary Stimulant',
    'Vitamins',
    'Water Soluble Vitamins',
    'Liver Tonic & Immunomodulator',
    'Mould Terminators & Toxin Binders',
    'Feed Emulsifier',
    'Fly Control',
    'Water Soluble Treatment Products',
    'Antibiotics Injectables',
    'Disinfectant'
  ]

  // Duplicate list to ensure continuous infinite loop
  const marqueeItems = [...categories, ...categories, ...categories]

  return (
    <div className="w-full bg-transparent pt-10 sm:pt-14 lg:pt-16 pb-4 sm:pb-6 overflow-hidden">
      <div className="relative flex overflow-x-hidden group">
        
        {/* Infinite Marquee Track */}
        <div className="animate-marquee flex items-center gap-4 sm:gap-6">
          {marqueeItems.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => {
                if (onSelectCategory) {
                  onSelectCategory(cat)
                }
              }}
              className="relative overflow-hidden flex-none px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#ea580c] via-[#e64a19] to-[#c2410c] text-white font-serif font-bold text-sm sm:text-base md:text-lg border-2 border-orange-400/50 shadow-[0_6px_18px_rgba(234,88,12,0.35)] hover:scale-105 hover:shadow-[0_8px_24px_rgba(234,88,12,0.5)] transition-all duration-200 cursor-pointer flex items-center justify-center min-w-[220px] sm:min-w-[260px] group/pill select-none"
            >
              {/* Rooster Watermark Graphic inside pill matching reference image */}
              <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-24 overflow-hidden pointer-events-none opacity-45 group-hover/pill:opacity-70 transition-opacity">
                <img
                  src="/marquee_rooster_head.png"
                  alt=""
                  className="w-full h-full object-cover object-top scale-125 transform translate-x-2"
                />
              </div>

              {/* White Text Header */}
              <span className="relative z-10 drop-shadow-md whitespace-nowrap tracking-wide text-center">
                {cat}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

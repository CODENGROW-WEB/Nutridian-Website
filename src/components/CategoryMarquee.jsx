import { POULTRY_CATEGORIES } from '../data/poultryCategories'

export default function CategoryMarquee({ onSelectCategory }) {
  // Duplicate list to ensure continuous infinite loop
  const marqueeItems = [...POULTRY_CATEGORIES, ...POULTRY_CATEGORIES, ...POULTRY_CATEGORIES]

  return (
    <div className="w-full bg-transparent pt-10 sm:pt-14 lg:pt-16 pb-4 sm:pb-6 overflow-hidden">
      <div className="relative flex overflow-x-hidden group">
        
        {/* Infinite Marquee Track */}
        <div className="animate-marquee flex items-center gap-4 sm:gap-6">
          {marqueeItems.map((cat, idx) => {
            const initialSub = cat.subcategories ? cat.subcategories[0].name : null
            const initialProd = cat.subcategories
              ? cat.subcategories[0].products?.[0]?.id
              : cat.products?.[0]?.id

            return (
              <div
                key={`${cat.id}-${idx}`}
                onClick={() => {
                  if (onSelectCategory) {
                    onSelectCategory(cat.name, initialSub, initialProd)
                  }
                }}
                className="relative overflow-hidden flex-none pl-6 sm:pl-8 pr-10 sm:pr-12 py-3 sm:py-3.5 rounded-full text-white font-lato font-bold text-sm sm:text-base md:text-lg border-2 border-orange-400/60 shadow-[0_6px_18px_rgba(228,81,33,0.35)] hover:scale-105 hover:shadow-[0_8px_24px_rgba(228,81,33,0.5)] transition-all duration-200 cursor-pointer flex items-center justify-center min-w-[220px] sm:min-w-[260px] group/pill select-none bg-[#e45121]"
                style={{
                  fontFamily: "'Lato', sans-serif",
                  backgroundImage: "url('/marquee_pill_bg.png?v=20261123')",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right center',
                  backgroundSize: 'auto 100%'
                }}
              >
                {/* White Text Header in authentic Lato Font Bold */}
                <span className="relative z-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] whitespace-nowrap tracking-wide text-center font-bold font-lato">
                  {cat.name}
                </span>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

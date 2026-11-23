import { useState, useEffect } from 'react'

export const AD_BANNERS = [
  {
    id: 'avirom-plus',
    title: 'Avirom Plus - Digestive Health Booster',
    image: '/ads/ad_avirom_plus.png?v=20261122_uhd',
    fallbackJpg: '/ads/ad_avirom_plus.jpg?v=20261122_uhd',
    category: 'Non Antibiotic Growth Promoters'
  },
  {
    id: 'butyron',
    title: 'Butyron - Digestive Health Enhancer',
    image: '/ads/ad_butyron.png?v=20261122_uhd',
    fallbackJpg: '/ads/ad_butyron.jpg?v=20261122_uhd',
    category: 'Organic Acids & Acidifier'
  },
  {
    id: 'god-n',
    title: 'GOD-N - Most Reliable Non Antibiotic Growth Promoter',
    image: '/ads/ad_god_n.png?v=20261122_uhd',
    fallbackJpg: '/ads/ad_god_n.jpg?v=20261122_uhd',
    category: 'Non Antibiotic Growth Promoters'
  },
  {
    id: 'nutriquinol',
    title: 'Nutriquinol - 3-in-One Versatile Non Antibiotic Growth Promoter',
    image: '/ads/ad_nutriquinol.png?v=20261122_uhd',
    fallbackJpg: '/ads/ad_nutriquinol.jpg?v=20261122_uhd',
    category: 'Non Antibiotic Growth Promoters'
  }
]

export default function AdvertisementCarousel({ className = '' }) {
  const [currentAdIndex, setCurrentAdIndex] = useState(0)
  const [isAdTransitioning, setIsAdTransitioning] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  // Auto transition every 5 seconds (pauses when hovered/touched)
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setIsAdTransitioning(true)
      setCurrentAdIndex((prev) => (prev + 1) % AD_BANNERS.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isPaused])

  const goToPrev = (e) => {
    e?.stopPropagation()
    setIsAdTransitioning(true)
    setCurrentAdIndex((prev) => (prev - 1 + AD_BANNERS.length) % AD_BANNERS.length)
  }

  const goToNext = (e) => {
    e?.stopPropagation()
    setIsAdTransitioning(true)
    setCurrentAdIndex((prev) => (prev + 1) % AD_BANNERS.length)
  }

  return (
    <section
      aria-label="Product Advertisements"
      className={`w-full relative overflow-hidden bg-white border-t border-slate-200 select-none group/carousel ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* 1. Carousel Slider Container */}
      <div
        className={`flex w-full ${isAdTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${currentAdIndex * 100}%)` }}
      >
        {AD_BANNERS.map((ad, idx) => (
          <div
            key={ad.id}
            className="w-full shrink-0 relative flex items-center justify-center bg-white"
          >
            <picture className="w-full block">
              <source srcSet={ad.image} type="image/png" />
              <img
                src={ad.fallbackJpg}
                alt={ad.title}
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-auto object-cover select-none block"
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              />
            </picture>
          </div>
        ))}
      </div>

      {/* 2. Left / Right Navigation Arrows (Visible on hover) */}
      <button
        onClick={goToPrev}
        aria-label="Previous advertisement banner"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/60 hover:bg-orange-600 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 backdrop-blur-sm shadow-md cursor-pointer z-10 hover:scale-110 active:scale-95"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        aria-label="Next advertisement banner"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/60 hover:bg-orange-600 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 backdrop-blur-sm shadow-md cursor-pointer z-10 hover:scale-110 active:scale-95"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* 3. Dot Indicators */}
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-slate-950/40 backdrop-blur-md px-3 py-1 rounded-full">
        {AD_BANNERS.map((ad, idx) => (
          <button
            key={ad.id}
            onClick={(e) => {
              e.stopPropagation()
              setIsAdTransitioning(true)
              setCurrentAdIndex(idx)
            }}
            aria-label={`Jump to ${ad.title}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              currentAdIndex === idx
                ? 'w-6 h-2 bg-orange-500 shadow-xs'
                : 'w-2 h-2 bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

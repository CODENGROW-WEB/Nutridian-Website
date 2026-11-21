import { useState, useEffect, useRef } from 'react'

export const AD_BANNERS = [
  {
    id: 'avirom-plus',
    title: 'Avirom Plus - Digestive Health Booster',
    headline: 'AVIROM PLUS - DIGESTIVE HEALTH BOOSTER by igusol',
    image: '/ads/ad_avirom_plus.png?v=20261122_uhd',
    fallbackJpg: '/ads/ad_avirom_plus.jpg?v=20261122_uhd',
    category: 'Non Antibiotic Growth Promoters',
    description: 'Targeted defense against Escherichia Coli, Clostridium Perfringens, Salmonella spp, Eimeria species, Cochlosomas, and Histomonas. Manufactured with cGMP, ISO, HALAL, and FAMI-QS certified standards.'
  },
  {
    id: 'butyron',
    title: 'Butyron - Digestive Health Enhancer',
    headline: 'INTRODUCING BUTYRON - DIGESTIVE HEALTH ENHANCER by igusol',
    image: '/ads/ad_butyron.png?v=20261122_uhd',
    fallbackJpg: '/ads/ad_butyron.jpg?v=20261122_uhd',
    category: 'Organic Acids & Acidifier',
    description: 'Usage: 0.5 - 1 kg/ton of feed. Gradually releases Butyric Acid along complete GI tract. Highly bioavailable in Pre-starter & Starter chick stage. Prevents intestinal dysbiosis and bacterial enteric diseases.'
  },
  {
    id: 'god-n',
    title: 'GOD-N - Most Reliable Non Antibiotic Growth Promoter',
    headline: 'GOD-N (GLUCOSE OXIDASE) - TODAY, TOMORROW, FOREVER',
    image: '/ads/ad_god_n.png?v=20261122_uhd',
    fallbackJpg: '/ads/ad_god_n.jpg?v=20261122_uhd',
    category: 'Non Antibiotic Growth Promoters',
    description: 'FAST, STABLE, SPECIFIC Glucose Oxidase formulation. Superior non-antibiotic growth promoter that controls Low Pathogenic Avian Influenza (LPAI) mortality effectively.'
  },
  {
    id: 'nutriquinol',
    title: 'Nutriquinol - 3-in-One Versatile Non Antibiotic Growth Promoter',
    headline: 'NUTRIQUINOL - 3-IN-ONE VERSATILE NON-AGP (HALQUINOL 98%, 60%, 12.5%)',
    image: '/ads/ad_nutriquinol.png?v=20261122_uhd',
    fallbackJpg: '/ads/ad_nutriquinol.jpg?v=20261122_uhd',
    category: 'Non Antibiotic Growth Promoters',
    description: 'From one of the world\'s largest Halquinol manufacturers (KCPL, Since 1971). Highly effective 3-in-1 antimicrobial growth promoter for superior intestinal health and weight gain.'
  }
]

export default function AdvertisementCarousel({ className = '' }) {
  const [currentAdIndex, setCurrentAdIndex] = useState(0)
  const [isAdTransitioning, setIsAdTransitioning] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [activeLightboxAd, setActiveLightboxAd] = useState(null)
  const [lightboxZoom, setLightboxZoom] = useState(1)

  // Auto transition with pause-on-hover support (5 seconds for optimal reading time)
  useEffect(() => {
    if (isPaused || isLightboxOpen) return

    const timer = setInterval(() => {
      setIsAdTransitioning(true)
      setCurrentAdIndex((prev) => (prev + 1) % AD_BANNERS.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isPaused, isLightboxOpen])

  // Keyboard navigation & Esc to close Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return
      if (e.key === 'Escape') {
        setIsLightboxOpen(false)
        setLightboxZoom(1)
      } else if (e.key === '+' || e.key === '=') {
        setLightboxZoom((prev) => Math.min(prev + 0.25, 3))
      } else if (e.key === '-') {
        setLightboxZoom((prev) => Math.max(prev - 0.25, 0.75))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen])

  // Lock body scroll during full-resolution lightbox
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLightboxOpen])

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

  const openLightbox = (ad) => {
    setActiveLightboxAd(ad)
    setLightboxZoom(1)
    setIsLightboxOpen(true)
  }

  return (
    <section
      aria-label="Product Advertisements"
      className={`w-full relative overflow-hidden bg-slate-900 border-t border-slate-200 select-none group/carousel ${className}`}
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
            onClick={() => openLightbox(ad)}
            className="w-full shrink-0 relative flex items-center justify-center cursor-zoom-in bg-white"
            title={`${ad.title} - Click to view in 4K Ultra-HD full resolution zoom`}
          >
            <picture className="w-full block">
              <source srcSet={ad.image} type="image/png" />
              <img
                src={ad.fallbackJpg}
                alt={ad.title}
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-auto object-cover block"
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden'
                }}
              />
            </picture>

            {/* Hover overlay button to inform users they can zoom in */}
            <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-6 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-950/85 text-white backdrop-blur-md shadow-lg border border-white/20">
                <svg className="w-3.5 h-3.5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                <span>Click to Zoom & Read Details (4K HD)</span>
              </span>
            </div>
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
      <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 bg-slate-950/50 backdrop-blur-md px-3 py-1 rounded-full">
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

      {/* 4. Interactive 4K Full-Resolution Zoom Lightbox Modal */}
      {isLightboxOpen && activeLightboxAd && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-3 sm:p-6 text-white select-none animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsLightboxOpen(false)
              setLightboxZoom(1)
            }
          }}
        >
          {/* Lightbox Top Header Toolbar */}
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/10 shrink-0">
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                <span className="text-orange-500 font-bold">{activeLightboxAd.title}</span>
                <span className="text-white/40">|</span>
                <span className="text-xs sm:text-sm font-medium text-slate-300">
                  {activeLightboxAd.category}
                </span>
              </h4>
              <p className="text-xs text-slate-400 hidden sm:block mt-0.5">
                {activeLightboxAd.headline}
              </p>
            </div>

            {/* Zoom Controls & Close Button */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setLightboxZoom((prev) => Math.max(prev - 0.25, 0.5))}
                className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Zoom Out (-)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                </svg>
              </button>
              <button
                onClick={() => setLightboxZoom(1)}
                className="px-2.5 py-1 sm:py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs sm:text-sm font-bold text-white transition-colors cursor-pointer"
                title="Reset Zoom"
              >
                {Math.round(lightboxZoom * 100)}%
              </button>
              <button
                onClick={() => setLightboxZoom((prev) => Math.min(prev + 0.25, 3))}
                className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Zoom In (+)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </button>
              <div className="w-px h-5 bg-white/20 mx-1" />
              <button
                onClick={() => {
                  setIsLightboxOpen(false)
                  setLightboxZoom(1)
                }}
                className="p-1.5 sm:p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Lightbox Main Stage: Ultra-HD Zoomable & Scrollable View */}
          <div
            className="flex-1 overflow-auto flex items-center justify-center p-2 sm:p-6 my-2"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsLightboxOpen(false)
                setLightboxZoom(1)
              }
            }}
          >
            <div
              style={{
                transform: `scale(${lightboxZoom})`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s ease-out'
              }}
              className="max-w-full max-h-full flex items-center justify-center select-none shadow-2xl rounded-lg overflow-hidden bg-white"
            >
              <img
                src={activeLightboxAd.image}
                alt={activeLightboxAd.title}
                className="max-w-[95vw] max-h-[75vh] object-contain block"
                style={{
                  imageRendering: '-webkit-optimize-contrast',
                  transform: 'translateZ(0)'
                }}
              />
            </div>
          </div>

          {/* Lightbox Footer Caption with Clear Technical Content */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-300 shrink-0">
            <p className="max-w-3xl leading-relaxed text-center sm:text-left">
              <span className="font-extrabold text-orange-400 mr-1.5">Key Highlights:</span>
              <span>{activeLightboxAd.description}</span>
            </p>
            <span className="text-[11px] text-slate-400 bg-white/5 px-2.5 py-1 rounded-full shrink-0">
              Use mouse wheel, buttons or +/- to zoom
            </span>
          </div>
        </div>
      )}
    </section>
  )
}

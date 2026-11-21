import { useState, useEffect } from 'react'

export const AD_BANNERS = [
  {
    id: 'avirom-plus',
    title: 'Avirom Plus - Digestive Health Booster',
    image: '/ads/ad_avirom_plus.jpg?v=20261121_hd',
    category: 'Non Antibiotic Growth Promoters',
    productId: 'avirom-plus'
  },
  {
    id: 'butyron',
    title: 'Butyron - Digestive Health Enhancer',
    image: '/ads/ad_butyron.jpg?v=20261121_hd',
    category: 'Organic Acids & Acidifier',
    productId: null
  },
  {
    id: 'god-n',
    title: 'GOD-N - Most Reliable Non Antibiotic Growth Promoter',
    image: '/ads/ad_god_n.jpg?v=20261121_hd',
    category: 'Non Antibiotic Growth Promoters',
    productId: 'god-n'
  },
  {
    id: 'nutriquinol',
    title: 'Nutriquinol - 3-in-One Versatile Non Antibiotic Growth Promoter',
    image: '/ads/ad_nutriquinol.jpg?v=20261121_hd',
    category: 'Non Antibiotic Growth Promoters',
    productId: 'nutriquinol-60'
  }
]

export default function AdvertisementCarousel({ className = '' }) {
  const [currentAdIndex, setCurrentAdIndex] = useState(0)
  const [isAdTransitioning, setIsAdTransitioning] = useState(true)

  // Automatic continuous smooth transition every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIsAdTransitioning(true)
      setCurrentAdIndex((prev) => prev + 1)
    }, 3500)

    return () => clearInterval(timer)
  }, [])

  const handleAdTransitionEnd = () => {
    if (currentAdIndex >= AD_BANNERS.length) {
      setIsAdTransitioning(false)
      setCurrentAdIndex(0)
    }
  }

  return (
    <section aria-label="Product Advertisements" className={`w-full relative overflow-hidden bg-white border-t border-slate-200 ${className}`}>
      <div
        onTransitionEnd={handleAdTransitionEnd}
        className={`flex w-full ${isAdTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${currentAdIndex * 100}%)` }}
      >
        {[...AD_BANNERS, AD_BANNERS[0]].map((ad, idx) => (
          <div key={`${ad.id}-${idx}`} className="w-full shrink-0 flex items-center justify-center">
            <img
              src={ad.image}
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
          </div>
        ))}
      </div>
    </section>
  )
}

import { useState, useEffect } from 'react'
import { POULTRY_CATEGORIES } from '../data/poultryCategories'
import AdvertisementCarousel from './AdvertisementCarousel'

export default function PoultryProducts({
  category = 'Anticoccidials',
  subcategory = 'Anticoccidials Combinations',
  productId = null,
  onSelectCategory,
  onBackToHome,
  onRequestInfo,
}) {
  const [activeCatName, setActiveCatName] = useState(category || 'Anticoccidials')
  const [activeSubcatName, setActiveSubcatName] = useState(subcategory || 'Anticoccidials Combinations')
  const [selectedProdId, setSelectedProdId] = useState(productId)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxZoom, setLightboxZoom] = useState(1)
  const [isReviewsOpen, setIsReviewsOpen] = useState(false)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' })

  // Sync props
  useEffect(() => {
    if (category) setActiveCatName(category)
    setActiveSubcatName(subcategory || null)
    if (productId) setSelectedProdId(productId)
  }, [category, subcategory, productId])

  // Keyboard navigation & Esc to close Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return
      if (e.key === 'Escape') {
        setIsLightboxOpen(false)
        setLightboxZoom(1)
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % (galleryImages?.length || 1))
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + (galleryImages?.length || 1)) % (galleryImages?.length || 1))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen])

  // Body scroll lock during Lightbox
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

  // Resolve active category object
  const currentCategory = POULTRY_CATEGORIES.find(
    (c) =>
      c.name.toLowerCase() === activeCatName.toLowerCase() ||
      c.label.toLowerCase() === activeCatName.toLowerCase() ||
      c.id === activeCatName.toLowerCase()
  ) || POULTRY_CATEGORIES[1]

  const hasSubcategories = Boolean(currentCategory.subcategories && currentCategory.subcategories.length > 0)

  // Resolve active subcategory if applicable
  const currentSubcategory = hasSubcategories
    ? currentCategory.subcategories.find(
        (s) =>
          s.name.toLowerCase() === activeSubcatName.toLowerCase() ||
          s.id === activeSubcatName.toLowerCase()
      ) || currentCategory.subcategories[0]
    : null

  // Collect products for current selection
  const availableProducts = hasSubcategories
    ? currentSubcategory?.products || []
    : currentCategory.products || []

  // Resolve active product
  const activeProduct =
    availableProducts.find((p) => p.id === selectedProdId) ||
    availableProducts[0] ||
    null

  // Reset active image index when active product changes
  useEffect(() => {
    setActiveImageIndex(0)
  }, [activeProduct?.id])

  const handleCategorySwitch = (cat) => {
    setActiveCatName(cat.name)
    const initialSub = cat.subcategories ? cat.subcategories[0].name : null
    setActiveSubcatName(initialSub)
    const firstProd = cat.subcategories ? cat.subcategories[0].products?.[0]?.id : cat.products?.[0]?.id
    setSelectedProdId(firstProd || null)
    if (onSelectCategory) {
      onSelectCategory(cat.name, initialSub, firstProd)
    }
  }

  const handleSubcategorySwitch = (sub) => {
    setActiveSubcatName(sub.name)
    const firstProd = sub.products?.[0]?.id
    setSelectedProdId(firstProd || null)
    if (onSelectCategory) {
      onSelectCategory(currentCategory.name, sub.name, firstProd)
    }
  }

  const handleProductSelect = (prod) => {
    setSelectedProdId(prod.id)
    setActiveImageIndex(0)
    if (onSelectCategory) {
      onSelectCategory(currentCategory.name, currentSubcategory?.name, prod.id)
    }
  }

  // Active gallery images - filter out logos and deduplicate
  const rawGallery = activeProduct?.gallery && activeProduct.gallery.length > 0
    ? activeProduct.gallery
    : [activeProduct?.image || '/products/poultry_banner_bg.png']

  const filteredGallery = Array.from(new Set(
    rawGallery.filter((img) => {
      if (!img) return false
      const lower = img.toLowerCase()
      if (lower.includes('logo') || lower.includes('%20logo')) return false
      if (activeProduct?.logoImage && img === activeProduct.logoImage) return false
      return true
    })
  ))
  const galleryImages = filteredGallery.length > 0
    ? filteredGallery
    : [activeProduct?.image || '/products/poultry_banner_bg.png']

  const thumbnailImages = activeProduct?.thumbnails && activeProduct.thumbnails.length > 0
    ? activeProduct.thumbnails
    : galleryImages

  const currentMainImage = galleryImages[activeImageIndex] || galleryImages[0]

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://nutridian.in'
  const shareLinks = [
    {
      name: 'Facebook',
      icon: '/logo_facebook.png',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: '/logo_linkedin.png',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: '/logo_whatsapp.png',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent((activeProduct?.name || 'Nutridian') + ' - ' + currentUrl)}`
    }
  ]

  return (
    <section id="poultry-products-page" className="w-full bg-white overflow-hidden min-h-[90vh]">
      
      {/* 1. Top Banner Header: Authentic Chevron V-Shape Banner matching exact uploaded shape */}
      <div className="relative w-full overflow-hidden bg-white">
        <div className="relative w-full">
          {/* Authentic Chevron Banner Graphic with Hexagon Constellation Network and downward V-shape */}
          <img
            src="/products/product_banner_custom_bg_hd.png?v=20261121"
            alt="Product Category Banner Background"
            className="w-full h-auto block select-none pointer-events-none"
          />

          {/* Titles Centered Over Banner */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pb-[3%] sm:pb-[4%] px-4 z-10 pointer-events-none">
            {/* ANTICOCCIDIALS / Category Title */}
            <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-wider uppercase text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)] font-sans text-center px-2">
              {currentCategory.label || currentCategory.name.toUpperCase()}
            </h1>

            {/* Subtitle / COMBINATIONS */}
            <p className="text-sm xs:text-base sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-wider uppercase mt-1 xs:mt-1.5 sm:mt-2.5 font-sans drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)] text-center px-2">
              {currentSubcategory ? currentSubcategory.name : currentCategory.name}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-16">

        {/* Top Navigation Breadcrumb & Back Button */}
        <div className="mb-5 sm:mb-6 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 border-b border-slate-200 pb-3 sm:pb-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-700 font-bold text-xs transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </button>

          <div className="text-xs font-semibold text-slate-400 flex flex-wrap items-center gap-1">
            <span>Home</span>
            <span>/</span>
            <span className="text-slate-600 font-bold">Poultry Product</span>
            <span>/</span>
            <span className="text-orange-600 font-extrabold">{currentCategory.name}</span>
            {currentSubcategory && (
              <>
                <span>/</span>
                <span className="text-orange-700 font-bold">{currentSubcategory.name}</span>
              </>
            )}
            {activeProduct && (
              <>
                <span>/</span>
                <span className="text-slate-900 font-black">{activeProduct.name}</span>
              </>
            )}
          </div>
        </div>

        {/* Subcategory Pills (when category has subcategories like Anticoccidials) */}
        {hasSubcategories && (
          <div className="mb-5 sm:mb-6 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {currentCategory.subcategories.map((sub) => {
              const isSubActive = currentSubcategory?.id === sub.id
              return (
                <button
                  key={sub.id}
                  onClick={() => handleSubcategorySwitch(sub)}
                  className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-extrabold transition-all shadow-xs cursor-pointer ${
                    isSubActive
                      ? 'bg-black text-white scale-105 shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {sub.name}
                </button>
              )
            })}
          </div>
        )}

        {/* Product Switcher Bar if multiple products exist in this selection */}
        {availableProducts.length > 1 && (
          <div className="mb-6 sm:mb-8 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-orange-50/80 border border-orange-200/80 max-w-2xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap shadow-xs">
            <span className="text-xs font-extrabold text-orange-900 uppercase tracking-wider mr-1 sm:mr-2">
              Select Product:
            </span>
            {availableProducts.map((p) => {
              const isSelected = activeProduct?.id === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => handleProductSelect(p)}
                  className={`px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#ea580c] text-white shadow-sm scale-105'
                      : 'bg-white text-slate-800 hover:bg-orange-100 border border-orange-200'
                  }`}
                >
                  {p.name}
                </button>
              )
            })}
          </div>
        )}

        {/* 2. Main Product Layout: Exact match to user's uploaded mockup structure (media_1794567892782_cb75513d.jpg) */}
        {activeProduct ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 max-w-6xl xl:max-w-7xl mx-auto items-start my-6">

            {/* LEFT COLUMN: Main Large Product Image + Gallery Thumbnails + Enquire Now Button */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* Main Large Product Frame - Arched dome top matching media_1794676540873_2642dc21.jpg */}
              <div
                onClick={() => {
                  setLightboxZoom(1)
                  setIsLightboxOpen(true)
                }}
                className="w-full max-w-[360px] sm:max-w-[400px] aspect-[4/5] sm:aspect-[1/1.3] bg-gradient-to-b from-slate-200 via-slate-300/80 to-slate-200 rounded-t-[60px] sm:rounded-t-[80px] rounded-b-3xl border-2 border-slate-300 relative overflow-hidden flex items-center justify-center p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all cursor-zoom-in group select-none"
                title="Click to view full leaflet in high-resolution zoom"
              >
                {/* Active Main Product Image - Full Visibility */}
                <img
                  src={currentMainImage}
                  alt={`${activeProduct.name} Preview`}
                  className="relative z-10 w-full h-full max-h-[92%] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:scale-[1.03]"
                  onError={(e) => {
                    if (activeProduct.image && e.target.src !== activeProduct.image) {
                      e.target.src = activeProduct.image
                    }
                  }}
                />

                {/* Hover Click to Zoom Pill */}
                <div className="absolute bottom-3.5 right-3.5 z-20 px-3.5 py-1.5 rounded-full bg-slate-950/85 text-white text-xs font-bold flex items-center gap-2 backdrop-blur-md shadow-lg opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all">
                  <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                  <span>Click to Zoom &amp; Read Leaflet</span>
                </div>
              </div>

              {/* Gallery Thumbnails (Only show when there are multiple distinct images/leaflets) */}
              {galleryImages.length > 1 && (
                <div className="mt-4 sm:mt-5 flex items-center justify-center gap-2 sm:gap-2.5 flex-wrap max-w-sm">
                  {galleryImages.map((imgUrl, idx) => {
                    const isActive = activeImageIndex === idx
                    const thumbSrc = thumbnailImages[idx] || imgUrl
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        aria-label={`View image ${idx + 1}`}
                        className={`w-16 h-18 sm:w-20 sm:h-22 rounded-xl sm:rounded-2xl border-2 p-1 bg-white overflow-hidden cursor-pointer shadow-xs transition-all ${
                          isActive
                            ? 'border-[#ea580c] ring-2 ring-[#ea580c]/50 scale-105'
                            : 'border-orange-300 hover:border-[#ea580c] opacity-80 hover:opacity-100 hover:scale-102'
                        }`}
                      >
                        <img
                          src={thumbSrc}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = imgUrl
                          }}
                        />
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Enquire Now Pill Button (Matching media_1794676540873_2642dc21.jpg) */}
              <button
                onClick={onRequestInfo}
                className="mt-4 sm:mt-5 w-full max-w-[260px] sm:w-auto px-7 py-2.5 sm:py-1.5 rounded-full border border-[#ea580c] text-[#ea580c] hover:bg-[#ea580c] hover:text-white font-bold text-sm tracking-wide transition-all shadow-2xs hover:shadow-sm cursor-pointer active:scale-95 text-center"
              >
                Enquire Now
              </button>

            </div>

            {/* RIGHT COLUMN: Product Technical Specifications matching exact mockup */}
            <div className="lg:col-span-7 space-y-4">

              {/* Brand Logo Banner & Subtitle: Enlarged Brand Logo Image */}
              {activeProduct.logoImage ? (
                <div className="my-2">
                  <img
                    src={activeProduct.logoImage}
                    alt={`${activeProduct.name} Logo`}
                    className="h-16 sm:h-20 lg:h-26 w-auto max-w-[360px] sm:max-w-[460px] lg:max-w-[540px] object-contain object-left drop-shadow-sm"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                  {activeProduct.subTitle && (
                    <p className="text-sm font-bold text-slate-700 mt-1.5">
                      {activeProduct.subTitle}
                    </p>
                  )}
                </div>
              ) : activeProduct.brandRender === 'coxicheck_mn' ? (
                <div className="my-1">
                  <div className="flex items-center font-black text-5xl sm:text-6xl lg:text-7xl tracking-tight text-blue-900 font-sans">
                    <span className="text-[#1a4a84]">Coxi</span>
                    <span className="text-[#0055a5]">check</span>
                    <span className="ml-2 text-[#ea580c] border-2 sm:border-3 border-[#ea580c] rounded-md px-2.5 py-0.5 text-2xl sm:text-3xl lg:text-4xl font-black">MN</span>
                  </div>
                  <p className="text-sm font-bold text-slate-700 mt-1">
                    {activeProduct.subTitle}
                  </p>
                </div>
              ) : activeProduct.brandRender === 'n_carb' ? (
                <div className="my-1">
                  <div className="flex items-center font-black text-5xl sm:text-6xl lg:text-7xl tracking-tight text-slate-800 font-sans">
                    <span className="text-[#dc2626] font-serif italic text-6xl sm:text-7xl mr-1">N</span>
                    <span className="text-slate-900 font-extrabold tracking-wide">Carb™</span>
                  </div>
                  <p className="text-sm font-bold text-slate-700 mt-1">
                    {activeProduct.subTitle}
                  </p>
                </div>
              ) : (
                <div className="my-1">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                    {activeProduct.name}
                  </div>
                  {activeProduct.subTitle && (
                    <p className="text-sm font-bold text-slate-700 mt-0.5">
                      {activeProduct.subTitle}
                    </p>
                  )}
                </div>
              )}

              {/* Horizontal dividing line */}
              <div className="border-b border-slate-300" />

              {/* About Header */}
              <h3 className="text-xl font-bold text-slate-900 underline underline-offset-4 decoration-slate-400 font-sans pt-1">
                About
              </h3>

              {/* Composition */}
              {activeProduct.composition && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1">
                  <strong className="text-slate-900 font-bold block">Composition :</strong>
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.composition}</p>
                </div>
              )}

              {/* Chemical Stability */}
              {activeProduct.chemicalStability && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 pt-1">
                  <strong className="text-slate-900 font-bold block">Chemical Stability :</strong>
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.chemicalStability}</p>
                </div>
              )}

              {/* Advantage */}
              {activeProduct.advantage && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 pt-1">
                  <strong className="text-slate-900 font-bold block">Advantage :</strong>
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.advantage}</p>
                </div>
              )}

              {/* Benefits */}
              {activeProduct.benefits && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 pt-1">
                  <strong className="text-slate-900 font-bold block">Benefits :</strong>
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.benefits}</p>
                </div>
              )}

              {/* Spectrum */}
              {activeProduct.spectrum && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 pt-1">
                  <strong className="text-slate-900 font-bold block">Spectrum :</strong>
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.spectrum}</p>
                </div>
              )}

              {/* Mode of Action (if available) */}
              {activeProduct.modeOfAction && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 pt-1">
                  <strong className="text-slate-900 font-bold block">Mode of Action</strong>
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.modeOfAction}</p>
                </div>
              )}

              {/* Indication */}
              {activeProduct.indication && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 pt-1">
                  <strong className="text-slate-900 font-bold block">Indication :</strong>
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.indication}</p>
                </div>
              )}

              {/* Usage */}
              {activeProduct.usage && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 pt-1">
                  {!/^(usage|usages|poultry prescription|inclusion rate)/i.test(activeProduct.usage.trim()) && (
                    <strong className="text-slate-900 font-bold block">Usage :</strong>
                  )}
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.usage}</p>
                </div>
              )}

              {/* Dosage */}
              {activeProduct.dosage && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 pt-1">
                  <strong className="text-slate-900 font-bold block">Dosage :</strong>
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.dosage}</p>
                </div>
              )}

              {/* Directions for Use */}
              {activeProduct.directionsForUse && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 pt-1">
                  <strong className="text-slate-900 font-bold block">Directions for Use :</strong>
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.directionsForUse}</p>
                </div>
              )}

              {/* Mixing Directions */}
              {activeProduct.mixingDirections && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 pt-1">
                  <strong className="text-slate-900 font-bold block">Mixing Directions :</strong>
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.mixingDirections}</p>
                </div>
              )}

              {/* Storage */}
              {activeProduct.storage && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 pt-1">
                  <strong className="text-slate-900 font-bold block">Storage :</strong>
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.storage}</p>
                </div>
              )}

              {/* Target Species */}
              {activeProduct.targetSpecies && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 pt-1">
                  <strong className="text-slate-900 font-bold block">Target Species :</strong>
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.targetSpecies}</p>
                </div>
              )}

              {/* Presentation */}
              {activeProduct.presentation && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 pt-1">
                  <strong className="text-slate-900 font-bold block">Presentation :</strong>
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.presentation}</p>
                </div>
              )}

              {/* Withdrawal Period */}
              {activeProduct.withdrawalPeriod && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 pt-1">
                  <strong className="text-slate-900 font-bold block">Withdrawal Period :</strong>
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.withdrawalPeriod}</p>
                </div>
              )}

              {/* Contraindication */}
              {activeProduct.contraindications && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 pt-1">
                  <strong className="text-slate-900 font-bold block">Contraindication :</strong>
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.contraindications}</p>
                </div>
              )}

              {/* Caution */}
              {activeProduct.caution && (
                <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-1 pt-1">
                  <strong className="text-slate-900 font-bold block">Caution :</strong>
                  <p className="text-slate-700 whitespace-pre-line">{activeProduct.caution}</p>
                </div>
              )}

              {/* Bottom Regulatory Compliance Box (Left aligned directly above share section) */}
              <div className="pt-4 flex justify-start w-full">
                <div className="border border-slate-900 p-2.5 text-left text-[11px] font-bold text-slate-900 leading-tight bg-white shadow-2xs max-w-[220px]">
                  <p>Animal Feed Supplement</p>
                  <p>Not For Human &amp; Medicinal</p>
                  <p>Use For Animal Use Only</p>
                </div>
              </div>

              {/* Dividing line above SHARE matching user's image */}
              <div className="border-b border-slate-200 my-4" />

              {/* SHARE & CLIENT REVIEWS (Exact match to mockup in Right Column) */}
              <div className="space-y-5 text-left">
                
                {/* SHARE Heading & 6 Social Icons */}
                <div>
                  <div className="inline-block border-b-2 border-black pb-0.5 mb-2.5">
                    <h4 className="font-black text-lg sm:text-xl text-black tracking-wider uppercase font-sans">
                      SHARE
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-2.5 pt-1 flex-wrap">
                    {shareLinks.map((s, idx) => (
                      <a
                        key={idx}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Share on ${s.name}`}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-md overflow-hidden hover:scale-108 active:scale-95 transition-all shadow-xs cursor-pointer block shrink-0 bg-black"
                      >
                        <img
                          src={s.icon}
                          alt={s.name}
                          className="w-full h-full object-cover select-none"
                        />
                      </a>
                    ))}
                  </div>
                </div>

                {/* CLIENT REVIEWS Heading with Toggle Arrow */}
                <div>
                  <button
                    onClick={() => setIsReviewsOpen(!isReviewsOpen)}
                    className="inline-flex items-center gap-2.5 group cursor-pointer text-left"
                    aria-expanded={isReviewsOpen}
                  >
                    <span className="font-black text-lg sm:text-xl text-black tracking-wider uppercase font-sans border-b-2 border-black pb-0.5">
                      CLIENT REVIEWS
                    </span>
                    <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] group-hover:scale-110 transition-transform shrink-0">
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${isReviewsOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>

                  {/* Expandable Client Reviews Drawer */}
                  {isReviewsOpen && (
                    <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm space-y-4 animate-in fade-in duration-200 max-w-xl">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-amber-500 text-sm">★★★★★</span>
                          <span className="text-xs font-black text-slate-800">
                            {activeProduct?.rating ? activeProduct.rating.toFixed(1) : '5.0'} / 5.0
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-500">Verified Client Feedback</span>
                      </div>

                      <div className="space-y-3 text-xs">
                        <div className="border-b border-slate-200/80 pb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-extrabold text-slate-900">Dr. M. S. Reddy (Veterinary Consultant)</span>
                            <span className="text-[10px] text-slate-400">2 weeks ago</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed font-normal">
                            &ldquo;Consistent batch-to-batch homogeneity and excellent bird gut safety. Recommended for standard rotation schedules.&rdquo;
                          </p>
                        </div>

                        <div className="border-b border-slate-200/80 pb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-extrabold text-slate-900">Royal Farms Integration</span>
                            <span className="text-[10px] text-slate-400">1 month ago</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed font-normal">
                            &ldquo;Noticeable gain in flock performance and zero adverse residue. Prompt dispatch and technical support from Nutridian team.&rdquo;
                          </p>
                        </div>
                      </div>

                      {reviewSubmitted ? (
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-center font-bold text-xs">
                          Thank you! Your client review has been recorded.
                        </div>
                      ) : (
                        <form
                          onSubmit={(e) => {
                            e.preventDefault()
                            setReviewSubmitted(true)
                            setTimeout(() => {
                              setReviewSubmitted(false)
                              setNewReview({ name: '', rating: 5, comment: '' })
                            }, 4000)
                          }}
                          className="pt-2 space-y-2 border-t border-slate-200"
                        >
                          <span className="text-xs font-black text-slate-900 block">Leave a Client Review</span>
                          <input
                            type="text"
                            required
                            placeholder="Your Farm / Company Name"
                            value={newReview.name}
                            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                          <textarea
                            required
                            rows={2}
                            placeholder="Share your experience with this formulation..."
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none"
                          />
                          <button
                            type="submit"
                            className="w-full py-1.5 rounded-lg bg-black hover:bg-orange-600 text-white font-extrabold text-xs transition-colors cursor-pointer"
                          >
                            Submit Review
                          </button>
                        </form>
                      )}
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        ) : (
          <div className="py-12 text-center text-slate-500 text-sm">
            Please select a category or product from above.
          </div>
        )}

        {/* 3. Fast Browser Bar: Explore All 15 Poultry Solution Categories */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="text-center mb-6">
            <h3 className="text-base sm:text-lg font-black uppercase tracking-wider text-slate-800">
              Explore All 15 Poultry Solution Categories
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select any category below or from the top navigation dropdown to explore specialized formulations
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {POULTRY_CATEGORIES.map((cat) => {
              const isActive = cat.name.toLowerCase() === currentCategory.name.toLowerCase()
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySwitch(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-black text-white shadow-sm ring-2 ring-orange-500'
                      : 'bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-orange-600 border border-slate-200/80'
                  }`}
                >
                  <span className="opacity-60 mr-1">{cat.number}.</span>
                  <span>{cat.name}</span>
                </button>
              )
            })}
          </div>
        </div>

      </div>

      {/* 4. Bottom ADVERTISEMENT: Full-width Corner-to-Corner Automatic Moving Carousel (Pure Banner Images Only) */}
      <AdvertisementCarousel />

      {/* 5. Interactive Full-Resolution Lightbox Zoom Modal (for 300-DPI technical brochures) */}
      {isLightboxOpen && (
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
                <span className="text-orange-500 font-bold">{activeProduct.name}</span>
                <span className="text-white/40">|</span>
                <span className="text-xs sm:text-sm font-medium text-slate-300">
                  Image {activeImageIndex + 1} of {galleryImages.length}
                </span>
              </h4>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                300-DPI High-Resolution Technical Brochure View &bull; Use zoom buttons (+ / −) to inspect clinical details and dosage tables
              </p>
            </div>

            {/* Controls: Zoom In, Zoom Out, Reset, Open Original File, Close */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLightboxZoom((prev) => Math.max(1, +(prev - 0.5).toFixed(1)))}
                disabled={lightboxZoom <= 1}
                aria-label="Zoom out"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 flex items-center justify-center font-black text-lg transition-all cursor-pointer"
                title="Zoom Out"
              >
                −
              </button>
              <button
                onClick={() => setLightboxZoom(1)}
                className="px-3 h-9 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold transition-all cursor-pointer"
                title="Reset Zoom to Fit"
              >
                {Math.round(lightboxZoom * 100)}%
              </button>
              <button
                onClick={() => setLightboxZoom((prev) => Math.min(3, +(prev + 0.5).toFixed(1)))}
                disabled={lightboxZoom >= 3}
                aria-label="Zoom in"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 flex items-center justify-center font-black text-lg transition-all cursor-pointer"
                title="Zoom In"
              >
                +
              </button>
              <a
                href={currentMainImage}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 h-9 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all"
                title="Open pristine file in separate tab"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Original File</span>
              </a>
              <button
                onClick={() => {
                  setIsLightboxOpen(false)
                  setLightboxZoom(1)
                }}
                aria-label="Close"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-red-600 text-white flex items-center justify-center font-black text-lg transition-all cursor-pointer"
                title="Close (Esc)"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Lightbox Center Image Stage */}
          <div className="relative flex-1 w-full flex items-center justify-center overflow-auto p-2 sm:p-4 my-2">
            {/* Left Nav Arrow */}
            {galleryImages.length > 1 && (
              <button
                onClick={() => setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                aria-label="Previous image"
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-orange-600 text-white flex items-center justify-center shadow-xl transition-all cursor-pointer border border-white/20"
              >
                ◀
              </button>
            )}

            {/* High Res Image */}
            <div
              className="max-w-full max-h-[75vh] flex items-center justify-center transition-transform duration-200"
              style={{
                transform: `scale(${lightboxZoom})`,
                transformOrigin: 'center center'
              }}
            >
              <img
                src={currentMainImage}
                alt={`${activeProduct.name} High Resolution Leaflet`}
                className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
              />
            </div>

            {/* Right Nav Arrow */}
            {galleryImages.length > 1 && (
              <button
                onClick={() => setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)}
                aria-label="Next image"
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-orange-600 text-white flex items-center justify-center shadow-xl transition-all cursor-pointer border border-white/20"
              >
                ▶
              </button>
            )}
          </div>

          {/* Lightbox Bottom Thumbnail Bar */}
          {galleryImages.length > 1 && (
            <div className="flex items-center justify-center gap-3 pt-2 border-t border-white/10 shrink-0">
              {galleryImages.map((imgUrl, idx) => {
                const isActive = activeImageIndex === idx
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl border-2 overflow-hidden bg-white/10 p-0.5 cursor-pointer transition-all ${
                      isActive ? 'border-orange-500 scale-110 shadow-lg' : 'border-white/20 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Page ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

import { useEffect } from 'react'
import SectionHeading from './SectionHeading'
import AdvertisementCarousel from './AdvertisementCarousel'

export default function BlogPage({ onBackToHome, onNavigate, onOpenRequestModal }) {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  const blogs = [
    {
      id: 1,
      date: 'April 11, 2026',
      badge: 'Featured Story',
      title: 'Nutridian Animal Health: Boosting Productivity with Cost Effective Innovative Solutions',
      excerpt: "Valued at $1.9 billion in 2023, the Indian animal health and nutrition market is projected to reach $4.3 billion by 2030. Discover how Nutridian Animal Health is pioneering non-AGP feed solutions...",
      image: '/blog/director_umashankar_shah.webp',
      alt: 'Umashankar Shah, Director - Nutridian Animal Health',
      views: 1240,
      clickable: true
    },
    {
      id: 2,
      date: 'April 11, 2026',
      badge: 'Nutritional Guide',
      title: '5 Proven Ways to Increase Milk Yield and Quality',
      excerpt: "Milk production isn't just about quantity; it's about the right balance of minerals and vitamins. In this blog, we share five expert-backed tips on how to elevate ruminant productivity...",
      image: '/blog/blog_2.webp?v=20261123',
      alt: 'Poultry Broiler Health and Performance',
      views: 890,
      clickable: false
    },
    {
      id: 3,
      date: 'April 11, 2026',
      badge: 'Biosecurity',
      title: 'Optimal Biosecurity & Disinfection Protocols in Hatcheries',
      excerpt: "Proper biosecurity and water sanitation routines can reduce early chick mortality by up to 80%. Learn about synergistic biocide systems that eliminate biofilms...",
      image: '/blog/blog_3.webp?v=20261123',
      alt: 'Commercial Poultry Farm Flocks',
      views: 760,
      clickable: false
    }
  ]

  const handleCardClick = (b) => {
    if (b.clickable || b.id === 1) {
      if (onNavigate) {
        onNavigate('BLOG_DETAIL')
      } else {
        window.location.hash = '#article'
      }
    }
  }

  return (
    <section id="blog-dedicated-page" className="w-full bg-[#f8fafc] min-h-screen pb-16">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP BANNER: Matching user's reference layout with website's color theme
          ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-slate-950 via-[#1e1e24] to-slate-950 border-b-2 border-[#ea580c]/80 shadow-md">
        
        {/* Subtle Warm Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/15 via-transparent to-orange-600/10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16 relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-extrabold uppercase tracking-widest mb-3">
              <span>Articles &bull; Science &bull; Updates</span>
            </div>
            
            {/* Main Header Title matching reference */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none drop-shadow-md">
              Blog
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm md:text-base font-medium mt-2 max-w-xl leading-relaxed">
              Discover veterinary research, flock nutrition insights, biosecurity protocols, and corporate milestones from Nutridian Animal Health.
            </p>
          </div>

          {/* Quick Consultation CTA */}
          <div className="shrink-0 pt-2 sm:pt-0">
            <button
              onClick={onOpenRequestModal}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ea580c] to-[#c2410c] hover:from-[#c2410c] hover:to-[#9a3412] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              Request Information
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">

        {/* 2. Top Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-orange-50 text-slate-800 hover:text-orange-600 font-bold text-xs border border-slate-300 shadow-xs transition-colors cursor-pointer group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </button>

          <span className="text-xs font-semibold text-slate-400">
            Home &nbsp;/&nbsp; <span className="text-[#ea580c] font-bold">Blog</span>
          </span>
        </div>

        {/* 3. Section Heading */}
        <SectionHeading title="LATEST ARTICLES" className="mb-10 sm:mb-12" />

        {/* 4. The 3 Blog Cards (Exact Match to Homepage Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 max-w-6xl mx-auto">
          {blogs.map((b) => (
            <article
              key={b.id}
              onClick={() => handleCardClick(b)}
              className={`bg-white border shadow-xs transition-all duration-300 flex flex-col justify-between group rounded-sm overflow-hidden ${
                b.clickable || b.id === 1
                  ? 'border-orange-300 hover:border-[#ea580c] hover:shadow-xl cursor-pointer hover:-translate-y-1'
                  : 'border-slate-300 hover:shadow-md'
              }`}
            >
              
              {/* Top Image Box */}
              <div className="w-full aspect-[4/3] bg-slate-100 overflow-hidden flex items-center justify-center relative">
                <img
                  src={b.image}
                  alt={b.alt || b.title}
                  className="w-full h-full object-cover object-top block transition-transform duration-500 group-hover:scale-105"
                />
                {b.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/80 text-white backdrop-blur-xs">
                    {b.badge}
                  </span>
                )}
                {(b.clickable || b.id === 1) && (
                  <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-bold bg-[#ea580c] text-white shadow-md opacity-90 group-hover:opacity-100 flex items-center gap-1">
                    <span>Read Article</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
              </div>

              {/* Card Body Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center justify-between">
                    <span>{b.date}</span>
                    {(b.clickable || b.id === 1) && (
                      <span className="text-[11px] font-extrabold text-[#ea580c] uppercase tracking-wide">
                        Click to Read &rarr;
                      </span>
                    )}
                  </div>
                  <h3 className={`text-base sm:text-lg font-bold leading-snug mt-2 transition-colors ${
                    b.clickable || b.id === 1 ? 'text-slate-900 group-hover:text-[#ea580c]' : 'text-slate-900'
                  }`}>
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2.5 font-normal line-clamp-3">
                    {b.excerpt}
                  </p>
                </div>

                {/* Divider Line & Views Count */}
                <div className="mt-4 pt-1">
                  <div className="w-full h-[1.5px] bg-slate-800 mb-2.5" />
                  <div className="flex items-center justify-between text-xs text-slate-900 font-semibold">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>{b.views}</span>
                    </div>
                    {(b.clickable || b.id === 1) && (
                      <span className="text-xs font-bold text-[#ea580c] group-hover:underline">
                        Read Post &rarr;
                      </span>
                    )}
                  </div>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>

      {/* 5. Continuous Moving Advertisement Carousel */}
      <AdvertisementCarousel />

    </section>
  )
}

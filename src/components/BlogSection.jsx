import SectionHeading from './SectionHeading'

export default function BlogSection({ onNavigate }) {

  const blogs = [
    {
      id: 1,
      date: 'Pharma Outlook • July 2025',
      badge: 'TOP 10 VETERINARY MEDICINE MANUFACTURERS 2025',
      title: 'Nutridian Animal Health: Boosting Productivity with Cost Effective Innovative Solutions',
      excerpt: "Recognized among India's Top 10 Veterinary Medicine Manufacturers. How Nutridian Animal Health is revolutionizing poultry nutrition with AGP alternatives, gut health innovations, and cost-effective solutions.",
      image: '/blog/blog_1.jpg?v=20261123',
      alt: 'Mr. Umashankar Shah, Director - Nutridian Animal Health',
      views: 1420,
      isFeatured: true
    },
    {
      id: 2,
      date: 'April 11, 2026',
      badge: 'POULTRY HEALTH & NUTRITION',
      title: '5 Proven Ways to Increase Milk Yield and Quality',
      excerpt: "Milk production isn't just about quantity; it's about the right balance of minerals and vitamins. In this blog, we share five expert-backed tips on how......",
      image: '/blog/blog_2.jpg?v=20261123',
      alt: 'Poultry Broiler Health and Performance',
      views: 0,
      isFeatured: false
    },
    {
      id: 3,
      date: 'April 11, 2026',
      badge: 'COMMERCIAL FLOCK MANAGEMENT',
      title: '5 Proven Ways to Increase Milk Yield and Quality',
      excerpt: "Milk production isn't just about quantity; it's about the right balance of minerals and vitamins. In this blog, we share five expert-backed tips on how......",
      image: '/blog/blog_3.jpg?v=20261123',
      alt: 'Commercial Poultry Farm Flocks',
      views: 0,
      isFeatured: false
    }
  ]

  const handleCardClick = (blog) => {
    if (blog.id === 1 && onNavigate) {
      onNavigate('BLOG_DETAIL')
    }
  }

  return (
    <section id="blog" className="py-12 sm:py-16 bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header Badge - Authentic rooster icon + pill heading */}
        <SectionHeading title="BLOGS" className="mb-10 sm:mb-12" />

        {/* 3 Blog Cards Grid matching reference image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 max-w-6xl mx-auto">
          {blogs.map((b) => {
            const isClickable = b.id === 1

            return (
              <article
                key={b.id}
                onClick={() => handleCardClick(b)}
                className={`bg-white border border-slate-300 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group ${
                  isClickable ? 'cursor-pointer ring-0 hover:ring-2 hover:ring-orange-500/50 hover:border-orange-400' : ''
                }`}
              >
                
                {/* Top Image Box */}
                <div className="w-full aspect-[4/3] bg-slate-100 overflow-hidden flex items-center justify-center relative">
                  <img
                    src={b.image}
                    alt={b.alt || b.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 block"
                  />

                  {/* Feature Tag for Blog 1 */}
                  {b.isFeatured && (
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-orange-600 text-white shadow-md flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                        Featured Article
                      </span>
                    </div>
                  )}

                  {/* Click Overlay Indicator on Blog 1 */}
                  {isClickable && (
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/25 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 rounded-lg bg-orange-600 text-white font-extrabold text-xs shadow-lg flex items-center gap-1.5">
                        <span>Read Full Story</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Body Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-800">
                      <span>{b.date}</span>
                      {isClickable && (
                        <span className="text-[11px] font-bold text-orange-600 group-hover:underline flex items-center gap-0.5">
                          Read More →
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mt-2 group-hover:text-orange-600 transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2.5 font-normal">
                      {b.excerpt}
                    </p>
                  </div>

                  {/* Divider Line & Views Count (Exact matching reference image) */}
                  <div className="mt-4 pt-1">
                    <div className="w-full h-[1.5px] bg-slate-800 mb-2.5" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-slate-900 font-semibold">
                        <svg className="w-4 h-4 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span>{b.views}</span>
                      </div>

                      {isClickable && (
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Pharma Outlook
                        </span>
                      )}
                    </div>
                  </div>
                </div>

              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}

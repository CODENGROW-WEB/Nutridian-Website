import SectionHeading from './SectionHeading'

export default function BlogSection({ onNavigate }) {

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
    <section id="blog" className="py-12 sm:py-16 bg-[#f7f7f7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header Badge - Authentic rooster icon + pill heading */}
        <SectionHeading title="BLOGS" className="mb-10 sm:mb-12" />

        {/* 3 Blog Cards Grid matching reference image */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 max-w-6xl mx-auto">
          {blogs.map((b) => (
            <article
              key={b.id}
              onClick={() => handleCardClick(b)}
              className={`bg-white border shadow-xs transition-all duration-300 flex flex-col justify-between group ${
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

                {/* Divider Line & Views Count (Exact matching reference image) */}
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
    </section>
  )
}


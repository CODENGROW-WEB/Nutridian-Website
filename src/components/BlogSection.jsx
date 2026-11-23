import SectionHeading from './SectionHeading'

export default function BlogSection({ onNavigate }) {

  const blogs = [
    {
      id: 1,
      date: 'April 11, 2026',
      title: '5 Proven Ways to Increase Milk Yield and Quality',
      excerpt: "for quality-driven additives & supplements such as Non AGP's, Coccidiostats, Organic Acids, Mycoplasma preventive solutions, Immunomodulators,......",
      image: '/blog/blog_1.jpg?v=20261123',
      alt: 'Nutridian Leadership Profile',
      views: 0
    },
    {
      id: 2,
      date: 'April 11, 2026',
      title: '5 Proven Ways to Increase Milk Yield and Quality',
      excerpt: "Milk production isn't just about quantity; it's about the right balance of minerals and vitamins. In this blog, we share five expert-backed tips on how......",
      image: '/blog/blog_2.jpg?v=20261123',
      alt: 'Poultry Broiler Health and Performance',
      views: 0
    },
    {
      id: 3,
      date: 'April 11, 2026',
      title: '5 Proven Ways to Increase Milk Yield and Quality',
      excerpt: "Milk production isn't just about quantity; it's about the right balance of minerals and vitamins. In this blog, we share five expert-backed tips on how......",
      image: '/blog/blog_3.jpg?v=20261123',
      alt: 'Commercial Poultry Farm Flocks',
      views: 0
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
          {blogs.map((b) => (
            <article
              key={b.id}
              onClick={() => handleCardClick(b)}
              className={`bg-white border border-slate-300 shadow-xs hover:shadow-md transition-shadow duration-300 flex flex-col justify-between group ${
                b.id === 1 ? 'cursor-pointer' : ''
              }`}
            >
              
              {/* Top Image Box */}
              <div className="w-full aspect-[4/3] bg-slate-100 overflow-hidden flex items-center justify-center relative">
                <img
                  src={b.image}
                  alt={b.alt || b.title}
                  className="w-full h-full object-cover object-center block"
                />
              </div>

              {/* Card Body Content */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-800">
                    {b.date}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mt-2">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2.5 font-normal">
                    {b.excerpt}
                  </p>
                </div>

                {/* Divider Line & Views Count (Exact matching reference image) */}
                <div className="mt-4 pt-1">
                  <div className="w-full h-[1.5px] bg-slate-800 mb-2.5" />
                  <div className="flex items-center gap-1.5 text-xs text-slate-900 font-semibold">
                    <svg className="w-4 h-4 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{b.views}</span>
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

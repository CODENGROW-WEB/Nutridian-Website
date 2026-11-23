import { useState } from 'react'

export default function BlogDetail({ onBackToHome, onOpenRequestModal, onNavigate }) {
  const [viewMode, setViewMode] = useState('both') // 'both', 'article', 'scans'
  const [activeScanModal, setActiveScanModal] = useState(null)

  const pages = [
    {
      page: 1,
      title: 'Pharma Outlook Cover Feature - Page 24',
      image: '/blog/pharma_outlook_page1.jpg'
    },
    {
      page: 2,
      title: 'Top 10 Veterinary Medicine Manufacturers - Page 25',
      image: '/blog/pharma_outlook_page2.jpg'
    }
  ]

  return (
    <article className="w-full bg-[#fafafa] min-h-[90vh] py-6 sm:py-10 text-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Breadcrumb & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-200">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-orange-50 text-slate-700 hover:text-orange-600 font-bold text-xs sm:text-sm border border-slate-200 hover:border-orange-200 shadow-xs transition-all cursor-pointer group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-slate-500 group-hover:text-orange-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-400">
              Home &nbsp;/&nbsp; Blogs &nbsp;/&nbsp; <span className="text-orange-600 font-bold">Pharma Outlook Feature</span>
            </span>

            <button
              onClick={onOpenRequestModal}
              className="ml-2 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              Enquire Now
            </button>
          </div>
        </div>

        {/* Article Headline Header */}
        <header className="pt-8 pb-6 sm:pb-8">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Pharma Outlook Exclusive
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
              Top 10 Veterinary Medicine Manufacturers - 2025
            </span>
            <span className="text-xs text-slate-500 font-medium ml-auto hidden md:inline-block">
              Published: July 2025 • 4 min read
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight uppercase">
            Nutridian Animal Health: <span className="text-emerald-700">Boosting Productivity with Cost Effective Innovative Solutions</span>
          </h1>

          <p className="mt-3.5 text-base sm:text-lg text-slate-700 font-medium leading-relaxed max-w-4xl">
            A unit of Kanad Chemicals Pvt. Ltd., Nutridian Animal Health is empowering poultry and livestock farmers with science-backed Non-AGP feed supplements, precision gut-health technologies, and global research partnerships.
          </p>

          {/* View Mode Switcher */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Display Mode:</span>
              <div className="inline-flex p-1 bg-slate-200/70 rounded-xl">
                <button
                  onClick={() => setViewMode('both')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'both' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Split View (Article &amp; Magazine)
                </button>
                <button
                  onClick={() => setViewMode('article')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'article' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Article Only
                </button>
                <button
                  onClick={() => setViewMode('scans')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    viewMode === 'scans' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Original Magazine Only
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveScanModal(pages[0].image)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:text-orange-600 hover:border-orange-300 cursor-pointer transition-colors shadow-2xs"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                <span>Zoom Magazine Page 1</span>
              </button>
              <button
                onClick={() => setActiveScanModal(pages[1].image)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:text-orange-600 hover:border-orange-300 cursor-pointer transition-colors shadow-2xs"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                <span>Zoom Page 2</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Layout */}
        <div className={`grid gap-8 ${viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>

          {/* Formatted Article Reading View */}
          {(viewMode === 'both' || viewMode === 'article') && (
            <div className={`bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200 shadow-sm ${
              viewMode === 'both' ? 'lg:col-span-7' : 'max-w-4xl mx-auto'
            }`}>

              {/* Leadership Portrait Banner */}
              <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-slate-50 to-orange-50 border border-emerald-200/80 flex flex-col sm:flex-row items-center gap-5">
                <img
                  src="/blog/blog_1.jpg"
                  alt="Umashankar Shah, Director - Nutridian Animal Health"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl object-cover object-top border-2 border-white shadow-md shrink-0"
                />
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-emerald-700 text-white font-extrabold text-[11px] uppercase tracking-wider mb-1">
                    Featured Leader
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                    Mr. Umashankar Shah
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-semibold">
                    Director, Nutridian Animal Health (Kanad Chemicals Pvt. Ltd.)
                  </p>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                    Pioneering affordable, science-backed animal health formulations and driving India’s transition to sustainable Non-AGP poultry nutrition.
                  </p>
                </div>
              </div>

              {/* Body Prose */}
              <div className="space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed">
                
                {/* Intro paragraph with Drop Cap */}
                <p className="text-justify font-medium leading-[1.8]">
                  <span className="float-left mr-3 mt-1 w-12 h-12 bg-emerald-800 text-white font-black text-3xl flex items-center justify-center rounded-lg shadow select-none font-serif">
                    T
                  </span>
                  he Indian animal health and nutrition market is growing rapidly due to rising poultry and livestock populations, rising protein and milk consumption, and thus livestock businesses. Valued at <strong>$1.9 billion in 2023</strong>, the Indian animal health market is projected to reach <strong>$4.3 billion by 2030</strong>, growing at a <strong>CAGR of 12.35 percent</strong>. The livestock rearing business is deeply affected by seasonal demands and thus price variations, disease outbreaks, and most importantly being a marginal profit-making business, nutrition plays a very important role.
                </p>

                <p className="text-justify leading-relaxed">
                  This is where <strong>Nutridian Animal Health (NAH)</strong> steps in by offering a high-quality, affordable nutrition product range specially intended to reduce feed costing, improve health and feed conversion ratio (FCR), and decrease disease probabilities to offer better returns to farmers. These products are specially formulated and tailored by considering Indian farmers’ needs.
                </p>

                <p className="text-justify leading-relaxed">
                  Today, the company is known in the market for quality-driven additives and supplements such as <strong>Non-AGPs, Coccidiostats, Organic Acids, Mycoplasma preventive solutions, Immunomodulators, Vitamins, Productivity-Fertility Enhancers</strong>, and imported technologically driven products like alternative energy sources to reduce feed costing. NAH, which is part of <strong>Kanad Chemicals Pvt. Ltd. (KCPL)</strong>, is a leading company in India’s poultry feed additives market today. It focuses on non-antibiotic growth promoters, solutions for gut health, and controlling coccidiosis. It achieves this by working with global <strong>Igusol SA</strong> and local research groups to introduce fresh, cost-efficient products.
                </p>

                {/* Section 1 */}
                <div className="pt-4 border-t border-slate-100">
                  <h2 className="text-lg sm:text-xl font-extrabold text-emerald-800 mb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                    Pioneering Poultry Feed Solutions in India
                  </h2>
                  <p className="text-justify leading-relaxed">
                    NAH specializes in producing Economical Supplements &amp; Additives for poultry feed. These products help to influence gut health positively, reduce occurrences of coccidiosis, and reduce the need of using antibiotics, which aligns with India’s phasing out antibiotics strategy in order to reduce Antimicrobial Resistance (AMR). In a nutshell, NAH is a future-ready organization focusing on innovating and providing AGP alternatives to industry.
                  </p>
                  <p className="mt-3 text-justify leading-relaxed">
                    With R&amp;D driven partners like Spanish <strong>Igusol SA</strong>, NAH brings the much-needed expertise in devising and introducing supplements such as <strong>Solergy</strong> and <strong>Butyron</strong> to the market. The use of these products can improve the absorption of nutrients, increase their feed-to-weight ratio, and decrease mortality. Additionally, the company organizes interviews, group discussions, and on-site visits with farmers to address any technical and nutritional shortcomings, guidance for improvement, and ways to manage climate stress.
                  </p>
                  <p className="mt-3 text-justify leading-relaxed">
                    Adding to this and to build the company’s position in the market, NAH takes part in several events like <strong>Poultry India Expo</strong> and <strong>VIV Asia</strong>, along with running informative campaigns in poultry magazines to help farmers recognize and trust them. Here, NAH is aligning with the government’s strategy and boosting export of our Non-AGP animal health solutions globally.
                  </p>
                </div>

                {/* Pull Quote Box */}
                <div className="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-md relative overflow-hidden">
                  <div className="absolute right-4 bottom-2 text-white/15 text-8xl font-serif select-none pointer-events-none">
                    “
                  </div>
                  <div className="relative z-10">
                    <p className="text-base sm:text-lg font-bold leading-relaxed italic">
                      “Our focus on affordable, innovative feed supplements empowers poultry farmers to achieve better productivity and sustainability, and by prioritizing gut health with focus on antibiotic alternatives, we're meeting regulatory demands and farmer needs.”
                    </p>
                    <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
                      <span className="font-extrabold text-sm uppercase tracking-wide">
                        Pravinkumar Handekar
                      </span>
                      <span className="text-xs text-orange-100 font-medium">
                        CEO, Nutridian Animal Health
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="pt-4 border-t border-slate-100">
                  <h2 className="text-lg sm:text-xl font-extrabold text-emerald-800 mb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                    Revolutionizing Poultry Nutrition
                  </h2>
                  <p className="text-justify leading-relaxed">
                    The company was established with a promising aspiration to provide performance-oriented cost-effective solutions specifically Non-AGP category products for global supply. It has earned respect for the company in the global animal health industry.
                  </p>
                  <p className="mt-3 text-justify leading-relaxed">
                    Today, the company has witnessed noteworthy growth as it puts a strong emphasis on innovation, quality, consistency, and teamwork. Furthermore, by providing technical support to poultry farmers and reaching out to experts, the company delves deep into performance improvement in poultry like better feed conversion, better health, and less disease occurrences—all while reducing feed costs.
                  </p>
                </div>

                {/* Section 3 */}
                <div className="pt-4 border-t border-slate-100">
                  <h2 className="text-lg sm:text-xl font-extrabold text-emerald-800 mb-3 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                    Pioneering Sustainable Poultry Nutrition
                  </h2>
                  <p className="text-justify leading-relaxed">
                    As India is in the process of phasing out antibiotics, NAH is focusing more on the development of non-antibiotic ways to promote animal health. NAH is also putting efforts to bring cutting-edge technologically driven Non-AGP product lines to Indian farmers via international collaborations.
                  </p>
                  <p className="mt-3 text-justify leading-relaxed">
                    Furthermore, it plans to boost the efficiency of feed by <strong>5–10 percent</strong> and lower the mortality rate among poultry by <strong>10–15 percent</strong> by focusing on R&amp;D of probiotics, prebiotics, and phytogenics. These advances address the needs of the poultry industry, making up 45.8 percent of the feed additives market, complying with regulations, and enhancing the efficiency of modern commercial farms.
                  </p>
                </div>

                {/* Conclusion & Future Outlook */}
                <div className="pt-4 border-t border-slate-100 bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-2">
                    Future Roadmap: Sustainability &amp; Asia-Pacific Expansion
                  </h3>
                  <p className="text-slate-700 text-xs sm:text-sm text-justify leading-relaxed font-medium">
                    Going forward, the company’s core focus for the future would be on sustainability while staying at par with ever-evolving regulations. Focusing on using eco-friendly substances such as enzymes and organic acids, the company will focus on aiding the <strong>National Animal Disease Control Program</strong> while lowering environmental risks. Steering innovation, affordability, and expanding its wings across varied countries have given the company the prowess to improve poultry nutrition, making it a key player in the Asia-Pacific region.
                  </p>
                </div>

              </div>

              {/* Bottom Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={onBackToHome}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  ← Back to Home Page
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate('POULTRY PRODUCT')
                      } else {
                        onBackToHome()
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
                  >
                    Explore Products
                  </button>
                  <button
                    onClick={onOpenRequestModal}
                    className="px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
                  >
                    Request Product Info
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* Original Magazine Scans View */}
          {(viewMode === 'both' || viewMode === 'scans') && (
            <div className={`space-y-6 ${viewMode === 'both' ? 'lg:col-span-5' : 'max-w-4xl mx-auto w-full'}`}>
              
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-600" />
                    Original Print Edition Scans
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">Pharma Outlook (July 2025)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Click on either page scan to open the full-screen high-resolution zoom viewer.
                </p>
              </div>

              {pages.map((p) => (
                <div
                  key={p.page}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="p-3.5 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      {p.title}
                    </span>
                    <button
                      onClick={() => setActiveScanModal(p.image)}
                      className="text-xs font-extrabold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Full Screen</span>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>
                  </div>

                  <div
                    onClick={() => setActiveScanModal(p.image)}
                    className="relative cursor-pointer bg-slate-900/5 overflow-hidden flex items-center justify-center p-2"
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-auto object-contain rounded-lg shadow-xs group-hover:scale-[1.01] transition-transform duration-300 block"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-xl bg-slate-900/85 text-white font-bold text-xs flex items-center gap-2 shadow-lg backdrop-blur-xs">
                        <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        Click to view High-Res
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>

      {/* Lightbox / High-Res Zoom Modal */}
      {activeScanModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={() => setActiveScanModal(null)}
        >
          <div
            className="relative max-w-4xl max-h-[95vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 sm:p-4 bg-slate-900 text-white flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold">
                Pharma Outlook Feature - High-Resolution Print View
              </span>
              <button
                onClick={() => setActiveScanModal(null)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors"
                title="Close"
              >
                ✕
              </button>
            </div>
            <div className="p-2 sm:p-4 overflow-auto max-h-[85vh] flex justify-center bg-slate-100">
              <img
                src={activeScanModal}
                alt="Pharma Outlook Print View"
                className="max-w-full h-auto object-contain rounded shadow"
              />
            </div>
          </div>
        </div>
      )}

    </article>
  )
}

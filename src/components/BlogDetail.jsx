import { useState } from 'react'

export default function BlogDetail({ onBackToHome, onOpenRequestModal }) {
  const [activeTab, setActiveTab] = useState('article')

  return (
    <section className="w-full bg-[#faf9f6] min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Header & Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-orange-50 text-slate-800 hover:text-orange-600 font-bold text-xs sm:text-sm border border-slate-300 shadow-xs transition-colors cursor-pointer group"
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

          <div className="text-xs font-semibold text-slate-500">
            <span>Home</span> &nbsp;/&nbsp; <span>Blog</span> &nbsp;/&nbsp; <span className="text-[#ea580c] font-bold">Featured Article</span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            MAIN ARTICLE CONTENT SECTION
            ───────────────────────────────────────────────────────────── */}
        <article id="article-content" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10 lg:p-12 max-w-5xl mx-auto">

          
          {/* Header Title Bar */}
          <div className="border-b border-slate-200 pb-6 mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#15803d] tracking-tight">
              NUTRIDIAN ANIMAL HEALTH
            </h2>
            <h3 className="text-lg sm:text-xl md:text-2xl font-black italic text-slate-900 mt-1.5 tracking-tight">
              BOOSTING PRODUCTIVITY WITH COST EFFECTIVE INNOVATIVE SOLUTIONS
            </h3>
            <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-semibold text-slate-500">
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-bold">
                Industry Spotlight
              </span>
              <span>&bull;</span>
              <span>Pharma Outlook Special Report</span>
              <span>&bull;</span>
              <span>Animal Health &amp; Nutrition</span>
            </div>
          </div>

          {/* Article Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left 7 Columns: Story Text with Drop Cap */}
            <div className="lg:col-span-8 space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
              
              <p className="leading-relaxed">
                <span className="float-left mr-3.5 mt-1 font-serif text-5xl sm:text-6xl font-bold text-slate-900 leading-none select-none">
                  T
                </span>
                he Indian animal health and nutrition market is growing rapidly due to rising poultry and livestock populations, rising protein and milk consumption and thus livestock businesses. Valued at $1.9 billion in 2023, the Indian animal health market is projected to reach $4.3 billion by 2030, growing at a CAGR of 12.35 percent. The livestock rearing business is deeply affected by the seasonal demands and thus price variations, disease outbreaks and most importantly being a marginal profit-making business, Nutrition plays a very important role.
              </p>

              <p>
                This is where Nutridian Animal Health (NAH) steps in by offering high-quality, affordable nutrition product range specially intended to reduce the feed costing, improve health and feed conversion, decrease disease probabilities to offer better returns to farmers. These products are specially formulated and tailored by considering Indian farmers' needs. Today, the company is known in the market for quality-driven additives and supplements such as Non AGP's, Coccidiostats, Organic Acids, Mycoplasma preventive solutions, Immunomodulators, Vitamins, Productivity-Fertility Enhancers and imported technologically driven products like alternative energy sources to reduce feed costing.
              </p>

              <p>
                NAH, which is part of Kanad Chemicals, is a leading company in India's poultry feed additives market, today. It focuses on non-antibiotic growth promoters, solutions for gut health, and controlling coccidiosis. It achieves this by working with global Igusol SA and local research groups to introduce fresh, cost-efficient products.
              </p>

              {/* Subheading: Pioneering Poultry Feed Solutions in India */}
              <div className="pt-4">
                <h4 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 border-l-4 border-[#ea580c] pl-3">
                  Pioneering Poultry Feed Solutions in India
                </h4>
                
                <p className="mt-3">
                  NAH specializes in producing Economical Supplements &amp; Additives for poultry feed. These products help to influence gut health positively, reduce occurrences of coccidiosis and reduce the need of using antibiotics which aligns with India's phasing out antibiotics strategy in order to reduce AMR. In a nutshell, NAH is a future ready organization focusing on innovating and providing AGP alternatives to Industry.
                </p>

                <p className="mt-4">
                  With R&amp;D driven partners like Spanish Igusol SA, NAH brings the much needed expertise in devising and introducing supplements such as Solergy and Butyron to the market. The use of these products can improve the absorption of nutrients, increase their feed-to-weight ratio, and decrease mortality. Additionally, the company organizes interviews, group discussions, and on-site visits with farmers to address any technical and nutritional shortcomings, guidance for improvement and ways to manage climate stress.
                </p>

                <p className="mt-4">
                  Adding to this and to build the company's position in the market, NAH takes part in several events like Poultry India Expo, VIV Asia, along with running ads in poultry magazines to help farmers recognize and trust them. Here NAH is aligning with the government's strategy and boosting export of our Non AGP animal health solutions globally.
                </p>
              </div>

              {/* Highlight Quote Block */}
              <div className="my-6 p-5 rounded-xl bg-orange-50 border-l-4 border-[#ea580c] shadow-xs">
                <blockquote className="font-serif italic text-base sm:text-lg text-slate-900 leading-snug">
                  &ldquo;Our focus on affordable, innovative feed supplements empowers poultry farmers to achieve better productivity.&rdquo;
                </blockquote>
              </div>

            </div>

            {/* Right 4 Columns: Director Portrait & Company Card */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Director Portrait with Caption Bar */}
              <div className="bg-white rounded-xl overflow-hidden border-2 border-slate-300 shadow-md">
                <img
                  src="/blog/director_umashankar_shah.webp"
                  alt="Umashankar Shah, Director"
                  className="w-full h-auto object-cover block"
                />
                <div className="bg-black/95 text-white py-2.5 px-3 text-center">
                  <div className="font-bold text-sm tracking-wide">Umashankar Shah</div>
                  <div className="text-[11px] text-slate-300 font-medium tracking-wider uppercase">Director</div>
                </div>
              </div>

              {/* Organization Highlights Card */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Quick Profile
                </h5>
                <div className="space-y-2 text-xs text-slate-700">
                  <div>
                    <span className="font-bold text-slate-900">Entity:</span> Nutridian Animal Health
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Parent Firm:</span> Kanad Chemicals Pvt. Ltd. (Est. 1971)
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Global R&amp;D:</span> Igusol SA (Spain)
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">Key Offerings:</span> Non-AGP Growth Promoters, Coccidiostats, Organic Acids, Biosecurity
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenRequestModal}
                    className="w-full py-2 px-3 rounded-lg bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs transition-colors cursor-pointer text-center"
                  >
                    Enquire Products
                  </button>
                </div>
              </div>

              {/* Original Magazine Toggle Card */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs text-center space-y-3">
                <div className="text-xs font-bold text-slate-800">
                  Pharma Outlook Original Feature
                </div>
                <p className="text-[11px] text-slate-500">
                  Inspect the official 2-page print edition scans from Pharma Outlook Magazine.
                </p>
                <button
                  onClick={() => setActiveTab(activeTab === 'spread' ? 'article' : 'spread')}
                  className="w-full py-2 px-3 rounded-lg border border-slate-300 hover:border-orange-500 text-xs font-bold text-slate-700 hover:text-orange-600 transition-colors cursor-pointer"
                >
                  {activeTab === 'spread' ? 'Hide Magazine Pages' : 'View Magazine Pages (24 & 25)'}
                </button>
              </div>

            </div>

          </div>

          {/* Original Magazine Spreads (Toggled) */}
          {activeTab === 'spread' && (
            <div className="mt-10 pt-8 border-t border-slate-200 space-y-6">
              <h4 className="text-base font-bold text-slate-900 text-center uppercase tracking-wider">
                Original Published Magazine Spread &bull; Pages 24 &amp; 25
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
                  <img src="/blog/pharma_outlook_page1.webp" alt="Pharma Outlook Feature - Page 24" className="w-full h-auto" />
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-200 shadow-md">
                  <img src="/blog/pharma_outlook_page2.webp" alt="Pharma Outlook Feature - Page 25" className="w-full h-auto" />
                </div>
              </div>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-orange-50 text-slate-800 hover:text-orange-600 font-bold text-xs transition-colors cursor-pointer"
            >
              &larr; Back to All Blogs
            </button>
            <button
              onClick={onOpenRequestModal}
              className="px-6 py-2.5 rounded-xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs transition-all cursor-pointer shadow-sm"
            >
              Request Information
            </button>
          </div>

        </article>

      </div>
    </section>
  )
}

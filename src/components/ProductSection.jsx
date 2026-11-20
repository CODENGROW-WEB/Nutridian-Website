export default function ProductSection({ onRequestInfo }) {
  const products = [
    {
      title: 'Flock-Max Performance Additive',
      badge: 'Bestseller',
      desc: 'Formulated to optimize feed conversion ratio (FCR), improve weight gain, and elevate egg production quality.',
      icon: '🐓'
    },
    {
      title: 'Gut-Shield Bio Probiotics',
      badge: 'Eco-Friendly',
      desc: 'Enhances gut microbiota integrity and natural immunity against intestinal pathogen colonization.',
      icon: '🛡️'
    },
    {
      title: 'Tox-Bind Premium Matrix',
      badge: 'High Absorbency',
      desc: 'Multi-toxin binder engineered to eliminate mycotoxins and safeguard liver function in layer and broiler birds.',
      icon: '🌿'
    },
    {
      title: 'Nutri-Premix Gold Formula',
      badge: 'Essential',
      desc: 'Comprehensive blend of micro-minerals, essential amino acids, and high-potency vitamins for all poultry stages.',
      icon: '⚡'
    }
  ]

  return (
    <section id="products" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
            Our Poultry Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            High Performance Feed Additives
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Scientifically developed formulations manufactured in state-of-the-art facility since 1971 to maximize flock profitability.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{p.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 border border-orange-200 px-2.5 py-0.5 rounded-full">
                    {p.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {p.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {p.desc}
                </p>
              </div>

              <button
                onClick={onRequestInfo}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-orange-600 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Inquire Product</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

import { useState } from 'react'
import { POULTRY_CATEGORIES } from '../data/poultryCategories'

export default function SearchModal({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('')

  const baseResults = [
    { title: 'Poultry Feed Additives', category: 'Overview', snippet: 'High performance feed additives for optimal flock health and yield.', page: 'POULTRY PRODUCT' },
    { title: 'Nutridian Probiotics & Gut Care', category: 'Overview', snippet: 'Advanced bio-additives to improve digestive efficiency.', page: 'POULTRY PRODUCT' },
    { title: 'KCPL Export Standards & Quality', category: 'About', snippet: 'Manufacturing and exporting premier agricultural products since 1971.', page: 'OUR CORE' },
    { title: 'Annual Poultry Industry Event 2026', category: 'Events', snippet: 'Join Nutridian Animal Health at the upcoming national livestock summit.', page: 'EVENTS' },
    { title: 'Latest Research & Technical Blogs', category: 'Blog', snippet: 'Scientific research and field studies on poultry nutrition and biosecurity.', page: 'HOME', anchor: '#blog' },
    { title: 'Our Foundations & KCPL History', category: 'Company', snippet: 'Manufacturing excellence, R&D facilities, and global presence since 1971.', page: 'OUR FOUNDATIONS' },
  ]

  // Add all 15 poultry categories
  const categoryResults = POULTRY_CATEGORIES.map((cat) => ({
    title: cat.name,
    category: 'Category',
    snippet: cat.description,
    page: 'POULTRY PRODUCT',
    catData: { category: cat.name, categoryId: cat.id }
  }))

  // Add all subcategories
  const subcategoryResults = POULTRY_CATEGORIES.flatMap((cat) =>
    (cat.subcategories || []).map((sub) => ({
      title: `${sub.name} (${cat.name})`,
      category: 'Sub-Category',
      snippet: sub.description,
      page: 'POULTRY PRODUCT',
      catData: { category: cat.name, categoryId: cat.id, subcategory: sub.name, subcategoryId: sub.id }
    }))
  )

  // Add all individual products
  const productResults = POULTRY_CATEGORIES.flatMap((cat) => {
    const list = []
    if (cat.subcategories) {
      cat.subcategories.forEach((sub) => {
        (sub.products || []).forEach((p) => {
          list.push({
            title: p.title || p.name,
            category: 'Product',
            snippet: `${p.subTitle ? p.subTitle + ' — ' : ''}${p.advantage || p.composition || ''}`,
            image: p.image,
            page: 'POULTRY PRODUCT',
            catData: { category: cat.name, categoryId: cat.id, subcategory: sub.name, subcategoryId: sub.id, productId: p.id }
          })
        })
      })
    }
    if (cat.products) {
      cat.products.forEach((p) => {
        list.push({
          title: p.title || p.name,
          category: 'Product',
          snippet: `${p.subTitle ? p.subTitle + ' — ' : ''}${p.advantage || p.composition || ''}`,
          image: p.image,
          page: 'POULTRY PRODUCT',
          catData: { category: cat.name, categoryId: cat.id, productId: p.id }
        })
      })
    }
    return list
  })

  const allSearchItems = [...productResults, ...categoryResults, ...subcategoryResults, ...baseResults]

  const filteredResults = allSearchItems.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.snippet.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  )

  if (!isOpen) return null

  const handleItemClick = (item) => {
    onClose()
    if (onNavigate) {
      onNavigate(item.page, null, item.catData)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-6 sm:pt-16 px-3 sm:px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[88vh] flex flex-col">
        
        {/* Search Input Bar */}
        <div className="p-3.5 sm:p-4 border-b border-slate-200 flex items-center gap-2.5 sm:gap-3">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            autoFocus
            placeholder="Search products, active ingredients, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm sm:text-base md:text-lg font-medium text-slate-800 focus:outline-none placeholder:text-slate-400"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 sm:px-2.5 sm:py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 font-bold text-xs flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>✕</span>
            <span className="hidden sm:inline">ESC</span>
          </button>
        </div>

        {/* Results List */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-2">
          {query.trim() === '' ? (
            <div className="py-6 text-center text-sm text-slate-400">
              Type product names, active ingredients, or categories to search...
            </div>
          ) : filteredResults.length > 0 ? (
            filteredResults.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleItemClick(item)}
                className="p-3 rounded-xl hover:bg-orange-50/80 border border-transparent hover:border-orange-200 transition-colors cursor-pointer flex items-center gap-3"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    className="w-10 h-10 object-contain rounded-lg border border-slate-200 bg-slate-50 shrink-0 p-0.5"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="font-bold text-slate-800 text-sm truncate">
                      {item.title}
                    </h5>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-700 uppercase shrink-0">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{item.snippet}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-slate-500 text-sm">
              No results found for &quot;<span className="font-semibold text-slate-800">{query}</span>&quot;
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

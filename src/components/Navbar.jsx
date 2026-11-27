import { useState, useEffect, useRef } from 'react'
import { POULTRY_CATEGORIES } from '../data/poultryCategories'

export default function Navbar({ activePage = 'HOME', onNavigate, onOpenRequestModal, onOpenSearch }) {
  const [activeLink, setActiveLink] = useState(activePage)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isPoultryDropdownOpen, setIsPoultryDropdownOpen] = useState(false)
  const [mobilePoultryOpen, setMobilePoultryOpen] = useState(false)
  const [expandedMobileCat, setExpandedMobileCat] = useState('anticoccidials')
  const [expandedMobileSubcat, setExpandedMobileSubcat] = useState('anticoccidials-combinations')

  const dropdownTimeoutRef = useRef(null)

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'OUR CORE', href: '#our-core' },
    { name: 'POULTRY PRODUCT', href: '#products' },
    { name: 'EVENTS', href: '#events' },
    { name: 'BLOG', href: '#blog' },
    { name: 'CONTACT', href: '#contact' },
  ]

  useEffect(() => {
    if (activePage === 'CONTACT US') {
      setActiveLink('CONTACT')
    } else {
      setActiveLink(activePage)
    }
  }, [activePage])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnterPoultry = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
    }
    setIsPoultryDropdownOpen(true)
  }

  const handleMouseLeavePoultry = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsPoultryDropdownOpen(false)
    }, 200)
  }

  const handleLinkClick = (e, link) => {
    e.preventDefault()
    setActiveLink(link.name)
    setIsMobileMenuOpen(false)
    setIsPoultryDropdownOpen(false)

    if (link.name === 'OUR CORE') {
      if (onNavigate) onNavigate('OUR CORE')
    } else if (link.name === 'POULTRY PRODUCT') {
      if (onNavigate) {
        onNavigate('POULTRY PRODUCT', null, {
          category: 'Anticoccidials',
          subcategory: 'Anticoccidials Combinations',
          productId: 'coxicheck-mn'
        })
      }
    } else if (link.name === 'EVENTS') {
      if (onNavigate) onNavigate('EVENTS')
    } else if (link.name === 'BLOG') {
      if (onNavigate) onNavigate('HOME', '#blog')
    } else if (link.name === 'CONTACT') {
      if (onNavigate) onNavigate('CONTACT')
    } else if (link.name === 'HOME') {
      if (onNavigate) onNavigate('HOME')
    } else {
      if (onNavigate) onNavigate('HOME', link.href)
    }
  }

  const handleSelectCategory = (cat) => {
    setActiveLink('POULTRY PRODUCT')
    setIsPoultryDropdownOpen(false)
    setIsMobileMenuOpen(false)
    const initialSub = cat.subcategories ? cat.subcategories[0].name : null
    const initialProd = cat.subcategories
      ? cat.subcategories[0].products?.[0]?.id
      : cat.products?.[0]?.id
    if (onNavigate) {
      onNavigate('POULTRY PRODUCT', null, {
        category: cat.name,
        categoryId: cat.id,
        subcategory: initialSub,
        productId: initialProd
      })
    }
  }

  const handleSelectSubcategory = (cat, sub) => {
    setActiveLink('POULTRY PRODUCT')
    setIsPoultryDropdownOpen(false)
    setIsMobileMenuOpen(false)
    const initialProd = sub.products?.[0]?.id
    if (onNavigate) {
      onNavigate('POULTRY PRODUCT', null, {
        category: cat.name,
        categoryId: cat.id,
        subcategory: sub.name,
        subcategoryId: sub.id,
        productId: initialProd
      })
    }
  }

  const handleSelectProduct = (cat, sub, prod) => {
    setActiveLink('POULTRY PRODUCT')
    setIsPoultryDropdownOpen(false)
    setIsMobileMenuOpen(false)
    if (onNavigate) {
      onNavigate('POULTRY PRODUCT', null, {
        category: cat.name,
        categoryId: cat.id,
        subcategory: sub ? sub.name : null,
        subcategoryId: sub ? sub.id : null,
        productId: prod.id
      })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white transition-shadow duration-300 shadow-sm">
      {/* 1. Signature Striped Lines Image Bar just upon the navbar */}
      <div
        className="w-full h-8 sm:h-9 bg-repeat-x bg-[length:auto_100%] relative"
        style={{ backgroundImage: "url('/navbar_stripe.png')" }}
      />

      {/* 2. Main White Navigation Header Container */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 relative ${isScrolled ? 'py-1.5' : 'py-2.5 sm:py-3'}`}>
        <div className="flex items-center justify-between gap-4">

          {/* Logo Section - Nutridian & KCPL exact given logo image */}
          <div className="relative flex items-center">
            {/* Signature white semicircle arc protruding upward into the striped bar, centered directly above the first letter 'N' of the logo */}
            <div
              className={`absolute -left-0.5 sm:-left-1 w-7 xs:w-8 sm:w-9 md:w-10 lg:w-11 bg-white rounded-t-full pointer-events-none z-20 transition-all ${
                isScrolled ? '-top-6 sm:-top-7 h-7 sm:h-8' : '-top-7 sm:-top-9 md:-top-10 h-8 sm:h-10 md:h-11'
              }`}
            />

            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                if (onNavigate) onNavigate('HOME')
              }}
              className="relative z-30 inline-flex items-center cursor-pointer -mt-1 sm:-mt-2 transition-transform duration-200 hover:scale-[1.01]"
              aria-label="Nutridian Animal Health & KCPL Home"
            >
              <img
                src="/nutridian_kcpl_logo.png"
                alt="Nutridian Animal Health - KCPL Manufacturer & Exporter Since 1971"
                className="h-9 xs:h-11 sm:h-13 md:h-15 lg:h-16 w-auto object-contain max-w-[190px] xs:max-w-[240px] sm:max-w-[320px] md:max-w-none"
              />
            </a>
          </div>

          {/* Desktop Navigation Links & Search */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link, index) => {
              const isActive = activeLink === link.name
              const isPoultry = link.name === 'POULTRY PRODUCT'

              if (isPoultry) {
                return (
                  <div
                    key={link.name}
                    className="relative flex items-center"
                    onMouseEnter={handleMouseEnterPoultry}
                    onMouseLeave={handleMouseLeavePoultry}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link)}
                      className={`px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                        isActive || isPoultryDropdownOpen
                          ? 'bg-black text-white shadow-sm'
                          : 'text-slate-900 hover:text-orange-600'
                      }`}
                    >
                      <span>{link.name}</span>
                    </a>

                    {/* Main Dropdown Menu: Contains All 15 Categories in order */}
                    {isPoultryDropdownOpen && (
                      <div className="absolute left-0 top-full pt-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.22)] border border-slate-200/90 py-2.5 min-w-[300px] w-max max-w-[360px]">
                          {POULTRY_CATEGORIES.map((cat) => {
                            const hasSub = Boolean(cat.subcategories && cat.subcategories.length > 0)
                            const hasDirectProds = Boolean(cat.products && cat.products.length > 0)

                            return (
                              <div key={cat.id} className="relative group/sub">
                                <button
                                  type="button"
                                  onClick={() => handleSelectCategory(cat)}
                                  className="w-full text-left px-4 py-2 text-[13px] font-bold text-slate-800 hover:bg-slate-100 hover:text-slate-900 group-hover/sub:bg-slate-100 transition-colors flex items-center justify-between cursor-pointer"
                                >
                                  <span className="whitespace-nowrap">{cat.name}</span>
                                  {(hasSub || hasDirectProds) && (
                                    <svg
                                      className="w-3.5 h-3.5 text-slate-500 group-hover/sub:text-slate-900 ml-3 shrink-0"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                  )}
                                </button>

                                {/* Flyout 1: For categories with Subcategories (e.g. Anticoccidials) */}
                                {hasSub && (
                                  <div className="hidden group-hover/sub:block absolute left-full top-0 pl-1.5 -mt-1.5 z-50">
                                    <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.22)] border border-slate-200/90 py-2 px-1 min-w-[290px] max-w-[340px] whitespace-nowrap">
                                      {cat.subcategories.map((sub) => (
                                        <div key={sub.id} className="mb-1.5 last:mb-0">
                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation()
                                              handleSelectSubcategory(cat, sub)
                                            }}
                                            className="w-full text-left px-3 py-1.5 text-[13px] font-extrabold text-slate-900 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors cursor-pointer flex items-center justify-between"
                                          >
                                            <span>{sub.name}</span>
                                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                                              {sub.products?.length || 0}
                                            </span>
                                          </button>

                                          {/* Sub-product listing with thumbnail images */}
                                          {sub.products && sub.products.length > 0 && (
                                            <div className="pl-3 pr-1 py-0.5 space-y-0.5">
                                              {sub.products.map((prod) => (
                                                <button
                                                  key={prod.id}
                                                  type="button"
                                                  onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleSelectProduct(cat, sub, prod)
                                                  }}
                                                  className="w-full text-left px-2.5 py-1 text-[12px] font-semibold text-slate-700 hover:text-orange-600 hover:bg-slate-100 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                                                >
                                                  <img
                                                    src={prod.thumbnail || prod.logoImage || prod.image}
                                                    alt=""
                                                    className="w-5 h-5 object-contain rounded shrink-0 bg-slate-50 border border-slate-200"
                                                    onError={(e) => {
                                                      e.target.style.display = 'none'
                                                    }}
                                                  />
                                                  <span className="truncate">{prod.name}</span>
                                                </button>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Flyout 2: For categories with direct products (e.g. Non Antibiotic Growth Promoters, AGP, etc.) */}
                                {!hasSub && hasDirectProds && (
                                  <div className="hidden group-hover/sub:block absolute left-full top-0 pl-1.5 -mt-1.5 z-50">
                                    <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.22)] border border-slate-200/90 py-2 px-1 min-w-[270px] max-w-[320px] whitespace-nowrap">
                                      <div className="px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                                        Sub Products
                                      </div>
                                      {cat.products.map((prod) => (
                                        <button
                                          key={prod.id}
                                          type="button"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleSelectProduct(cat, null, prod)
                                          }}
                                          className="w-full text-left px-3 py-1.5 text-[12.5px] font-bold text-slate-800 hover:bg-slate-100 hover:text-orange-600 rounded-lg transition-colors cursor-pointer flex items-center gap-2.5"
                                        >
                                          <img
                                            src={prod.thumbnail || prod.logoImage || prod.image}
                                            alt=""
                                            className="w-6 h-6 object-contain rounded shrink-0 bg-slate-50 border border-slate-200"
                                            onError={(e) => {
                                              e.target.style.display = 'none'
                                            }}
                                          />
                                          <span className="truncate">{prod.name}</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Vertical separator line between items */}
                    {index < navLinks.length - 1 && (
                      <span className="text-slate-900 font-light mx-1 xl:mx-1.5 select-none text-sm">
                        |
                      </span>
                    )}
                  </div>
                )
              }

              return (
                <div key={link.name} className="flex items-center">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-black text-white shadow-sm'
                        : 'text-slate-900 hover:text-orange-600'
                    }`}
                  >
                    {link.name}
                  </a>

                  {index < navLinks.length - 1 && (
                    <span className="text-slate-900 font-light mx-1 xl:mx-1.5 select-none text-sm">
                      |
                    </span>
                  )}
                </div>
              )
            })}

            {/* Magnifying Glass Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Search products and articles"
              className="ml-2 p-1.5 text-slate-900 hover:text-orange-600 transition-colors cursor-pointer flex items-center justify-center rounded-full hover:bg-slate-100"
            >
              <svg
                className="w-5 h-5 text-slate-900 stroke-[2.5]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </nav>

          {/* Mobile Actions: Search & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              aria-label="Search"
              className="p-2 text-slate-900 hover:text-orange-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg text-slate-900 hover:text-orange-600 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Menu with Backdrop */}
      {isMobileMenuOpen && (
        <>
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 top-[64px] bg-slate-950/40 backdrop-blur-3xs z-40 lg:hidden animate-in fade-in duration-150"
          />
          <div className="relative z-50 lg:hidden border-t border-slate-200 bg-white shadow-2xl animate-in slide-in-from-top duration-200 max-h-[82vh] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1.5">
              {navLinks.map((link) => {
                const isActive = activeLink === link.name
                const isPoultry = link.name === 'POULTRY PRODUCT'

                if (isPoultry) {
                  return (
                    <div key={link.name} className="space-y-1">
                      <div className="flex items-center justify-between rounded-xl overflow-hidden bg-slate-100">
                        <button
                          onClick={(e) => handleLinkClick(e, link)}
                          className={`flex-1 text-left px-4 py-3 text-sm font-bold tracking-wide transition-all ${
                            isActive
                              ? 'bg-black text-white'
                              : 'text-slate-900 hover:bg-orange-50 hover:text-orange-600'
                          }`}
                        >
                          {link.name}
                        </button>
                        <button
                          onClick={() => setMobilePoultryOpen(!mobilePoultryOpen)}
                          aria-label="Toggle Poultry Categories"
                          className={`p-3 border-l border-slate-200 transition-colors ${
                            isActive ? 'bg-black text-white' : 'text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobilePoultryOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                    {/* Mobile Accordion */}
                    {mobilePoultryOpen && (
                      <div className="pl-3 pr-2 py-2 space-y-1 bg-slate-50 rounded-xl border border-slate-200">
                        {POULTRY_CATEGORIES.map((cat) => {
                          const isCatExpanded = expandedMobileCat === cat.id
                          const hasSub = Boolean(cat.subcategories && cat.subcategories.length > 0)
                          const hasDirectProds = Boolean(cat.products && cat.products.length > 0)

                          return (
                            <div key={cat.id} className="space-y-0.5 border-b border-slate-100 pb-1">
                              <div className="flex items-center justify-between">
                                <button
                                  onClick={() => handleSelectCategory(cat)}
                                  className="flex-1 text-left px-2 py-1.5 text-xs font-bold text-slate-800 hover:text-orange-600 transition-colors"
                                >
                                  {cat.number}. {cat.name}
                                </button>
                                {(hasSub || hasDirectProds) && (
                                  <button
                                    onClick={() => setExpandedMobileCat(isCatExpanded ? null : cat.id)}
                                    aria-label="Toggle sub-items"
                                    className="p-1 text-slate-600 hover:text-slate-950"
                                  >
                                    <svg
                                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                        isCatExpanded ? 'rotate-180' : ''
                                      }`}
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                    </svg>
                                  </button>
                                )}
                              </div>

                              {/* Mobile Subcategories (e.g. Anticoccidials) */}
                              {hasSub && isCatExpanded && (
                                <div className="pl-4 pr-1 py-1 space-y-1.5 border-l-2 border-orange-500 ml-3 my-1">
                                  {cat.subcategories.map((sub) => {
                                    const isSubExpanded = expandedMobileSubcat === sub.id
                                    return (
                                      <div key={sub.id} className="space-y-1">
                                        <div className="flex items-center justify-between">
                                          <button
                                            onClick={() => handleSelectSubcategory(cat, sub)}
                                            className="text-left text-[11px] font-bold text-slate-800 hover:text-orange-600"
                                          >
                                            • {sub.name}
                                          </button>
                                          {sub.products && sub.products.length > 0 && (
                                            <button
                                              onClick={() => setExpandedMobileSubcat(isSubExpanded ? null : sub.id)}
                                              className="p-0.5 text-slate-500"
                                            >
                                              <svg className={`w-3 h-3 ${isSubExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                              </svg>
                                            </button>
                                          )}
                                        </div>

                                        {isSubExpanded && sub.products && (
                                          <div className="pl-3 space-y-1">
                                            {sub.products.map((prod) => (
                                              <button
                                                key={prod.id}
                                                onClick={() => handleSelectProduct(cat, sub, prod)}
                                                className="flex items-center gap-2 text-left text-[11px] font-medium text-slate-600 hover:text-orange-600 truncate w-full py-0.5"
                                              >
                                                <img
                                                  src={prod.thumbnail || prod.logoImage || prod.image}
                                                  alt=""
                                                  className="w-4 h-4 object-contain rounded shrink-0 bg-slate-50 border border-slate-200"
                                                  onError={(e) => {
                                                    e.target.style.display = 'none'
                                                  }}
                                                />
                                                <span className="truncate">{prod.name}</span>
                                              </button>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    )
                                  })}
                                </div>
                              )}

                              {/* Mobile Direct Products */}
                              {!hasSub && hasDirectProds && isCatExpanded && (
                                <div className="pl-4 pr-1 py-1 space-y-1 border-l-2 border-orange-400 ml-3 my-1">
                                  {cat.products.map((prod) => (
                                    <button
                                      key={prod.id}
                                      onClick={() => handleSelectProduct(cat, null, prod)}
                                      className="flex items-center gap-2 w-full text-left py-0.5 px-1 text-[11px] font-medium text-slate-700 hover:text-orange-600 truncate"
                                    >
                                      <img
                                        src={prod.thumbnail || prod.logoImage || prod.image}
                                        alt=""
                                        className="w-4 h-4 object-contain rounded shrink-0 bg-slate-50 border border-slate-200"
                                        onError={(e) => {
                                          e.target.style.display = 'none'
                                        }}
                                      />
                                      <span className="truncate">{prod.name}</span>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
                    isActive
                      ? 'bg-black text-white shadow-sm'
                      : 'text-slate-900 hover:bg-orange-50 hover:text-orange-600'
                  }`}
                >
                  {link.name}
                </a>
              )
            })}

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  if (onOpenRequestModal) onOpenRequestModal()
                }}
                className="w-full py-2.5 px-4 rounded-full font-bold text-sm text-[#b91c1c] bg-gradient-to-b from-white via-slate-100 to-slate-200 border border-slate-300 shadow-sm active:scale-[0.98] transition-all text-center cursor-pointer"
              >
                Request Information
              </button>
            </div>
          </div>
        </div>
      </>
    )}
    </header>
  )
}

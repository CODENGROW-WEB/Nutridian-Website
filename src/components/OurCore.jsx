import React from 'react'
import SectionHeading from './SectionHeading'

export default function OurCore({ onRequestInfo, onBackToHome, onNavigate }) {
  const portfolioItems = [
    {
      title: 'Advanced Feed Additives',
      description: "High-performance non-AGPs, AGP's, Anticoccidials and Nutritional enhancers.",
      icon: (
        <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: 'Targeted Health & Disease Control',
      description: 'Effective Anti-mycoplasma Solutions, Injectables and specialized veterinary care.',
      icon: (
        <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: 'Metabolic & Reproductive Support',
      description: 'Premium Emulsifiers, Vitamins and Ovary Stimulants for peak productivity.',
      icon: (
        <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: 'Farm Biosecurity',
      description: 'Heavy-duty disinfectants to maintain a safe, pathogen-free farm environment.',
      icon: (
        <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      title: 'Partner with NAH :',
      description: 'For driving health, productivity and sustainable growth across borders, flock by flock.',
      icon: (
        <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    }
  ]

  return (
    <section id="our-core" className="w-full bg-white overflow-hidden min-h-[80vh]">
      
      {/* 1. Top Banner Header: OUR CORE (Full width edge-to-edge touching both sides) */}
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-b border-orange-200/60 shadow-xs">
        <img
          src="/our_core_banner.png"
          alt="OUR CORE - Nutridian Animal Health"
          className="w-full h-auto object-cover object-center select-none block"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-12">

        {/* Top Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-orange-100 text-slate-700 hover:text-orange-700 font-bold text-xs transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </button>

          <span className="text-xs font-semibold text-slate-400">
            Home &nbsp;/&nbsp; <span className="text-orange-600 font-bold">Our Core</span>
          </span>
        </div>

        {/* 2. Content Section: 2 Column Layout (Left: Hatching Chick Egg Art, Right: Details) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">

          {/* Left Column: Hatching Chick Illustration (Using exact provided image) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full flex flex-col items-center justify-center">
              <div className="relative p-4 sm:p-6 flex items-center justify-center">
                <img
                  src="/chick_hatching_egg.png"
                  alt="Nutridian Hatching Chick Mascot"
                  className="w-full max-w-[260px] sm:max-w-[300px] h-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Copywriting & Portfolio List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative pl-5 border-l-4 border-orange-500 py-1">
              <p className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug italic font-serif">
                &ldquo;Your trusted provider of reliable solutions for everyday poultry health and nutrition.&rdquo;
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
              Nutridian Animal Health, a trusted global leader and exporter of comprehensive poultry health, nutrition and biosecurity solutions. Operating from India and reaching partners across international markets, we deliver science-backed, high-efficacy products designed to optimize flock performance, safeguard animal well-being and maximize profitability for modern commercial poultry operations.
            </p>

            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Our Comprehensive Portfolio
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Engineered for every phase of the poultry lifecycle, our versatile product range covers:
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {portfolioItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-gradient-to-r from-amber-50/50 to-orange-50/30 hover:from-amber-100/60 hover:to-orange-100/40 border border-amber-100 transition-colors group"
                >
                  <div className="p-2 rounded-xl bg-white shadow-xs border border-orange-100 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-sm">
                    <span className="font-extrabold text-slate-900 mr-1.5">
                      {item.title}
                    </span>
                    <span className="text-slate-600 font-medium">
                      {item.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  if (onNavigate) {
                    onNavigate('POULTRY PRODUCT')
                  } else if (onRequestInfo) {
                    onRequestInfo()
                  }
                }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
              >
                <span>More Details</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 3. THE ARCHITECTS & DRIVERS (Leadership Team)        */}
        {/* ---------------------------------------------------- */}
        <div className="pt-10 border-t border-slate-200/80">
          
          {/* Section Pill Badge Header with authentic rooster emblem */}
          <SectionHeading title="THE ARCHITECTS & DRIVERS" className="mb-14 sm:mb-16" />

          {/* Leaders List */}
          <div className="space-y-16 sm:space-y-20">

            {/* Leader 1: Mr. Umashankar Shah (Using exact provided HD portrait) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Photo Frame Left */}
              <div className="md:col-span-5 lg:col-span-4 flex justify-center">
                <div className="relative group">
                  <img
                    src="/leader_umashankar_hd.png"
                    alt="Mr. Umashankar Shah - Director"
                    className="w-64 sm:w-72 md:w-80 h-auto object-contain transform group-hover:scale-[1.03] transition-transform duration-300 drop-shadow-xl"
                  />
                </div>
              </div>

              {/* Bio Right */}
              <div className="md:col-span-7 lg:col-span-8 space-y-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#8c3b12] tracking-tight">
                  Mr. Umashankar Shah
                </h3>
                <div>
                  <span className="inline-block border-b-2 border-slate-700 font-bold text-slate-800 text-base sm:text-lg tracking-wide pb-0.5">
                    Director
                  </span>
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed pt-2 font-medium">
                  Welcome to Nutridian Animal Health, where we deliver science-backed high performance feed additives. Our commitment is rooted in maximizing flock health and enhancing feed efficiency. Committed to strict quality control, we provide trusted solutions for profitable poultry farming.
                </p>
              </div>
            </div>

            {/* Leader 2: Mrs. Mona Deepak Shah (Alternating: Text Left, Photo Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Bio Left */}
              <div className="md:col-span-7 lg:col-span-8 space-y-3 order-2 md:order-1">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#8c3b12] tracking-tight">
                  Mrs. Mona Deepak Shah
                </h3>
                <div>
                  <span className="inline-block border-b-2 border-slate-700 font-bold text-slate-800 text-base sm:text-lg tracking-wide pb-0.5">
                    Managing Director
                  </span>
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed pt-2 font-medium">
                  At Nutridian Animal Health, we believe that great poultry performance starts from within. Our innovative additives are engineered to optimize gut health, boost immunity and unlock the true genetic potential of poultry flock&apos;s. We are committed to delivering reliable, high-yield solutions for modern farmers. We look forward to growing together and shaping a more resilient poultry sector.
                </p>
              </div>

              {/* Photo Frame Right */}
              <div className="md:col-span-5 lg:col-span-4 flex justify-center order-1 md:order-2">
                <div className="relative group">
                  <img
                    src="/leader_mona_hd.png"
                    alt="Mrs. Mona Deepak Shah - Managing Director"
                    className="w-64 sm:w-72 md:w-80 h-auto object-contain transform group-hover:scale-[1.03] transition-transform duration-300 drop-shadow-xl"
                  />
                </div>
              </div>
            </div>

            {/* Leader 3: Dr. Pravinkumar Handekar (Photo Left, Text Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Photo Frame Left */}
              <div className="md:col-span-5 lg:col-span-4 flex justify-center">
                <div className="relative group">
                  <img
                    src="/leader_pravinkumar_hd.png"
                    alt="Dr. Pravinkumar Handekar - CEO"
                    className="w-64 sm:w-72 md:w-80 h-auto object-contain transform group-hover:scale-[1.03] transition-transform duration-300 drop-shadow-xl"
                  />
                </div>
              </div>

              {/* Bio Right */}
              <div className="md:col-span-7 lg:col-span-8 space-y-3">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#8c3b12] tracking-tight">
                  Dr. Pravinkumar Handekar
                </h3>
                <div>
                  <span className="inline-block border-b-2 border-slate-700 font-bold text-slate-800 text-base sm:text-lg tracking-wide pb-0.5">
                    CEO
                  </span>
                </div>
                <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed pt-2 font-medium">
                  <p>
                    Driven by a passion for animal nutrition, We delivers advanced feed additive solutions designed to maximize flock performance, optimize feed conversion, and support overall bird vitality.
                  </p>
                  <p>
                    Nutridian Animal Health provide field-proven solutions to help poultry farmers achieve superior yield. We view ourselves as their strategic partner delivering high-potency products that safeguard animal welfare and boost bottom line. Thank you for partnering with us to power growth and secure a more resilient farming future.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Quote Banner */}
          <div className="mt-16 bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 p-6 sm:p-10 rounded-2xl shadow-xl text-white flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8">
            {/* Giant White Quote Icon */}
            <div className="text-white shrink-0 opacity-90 leading-none font-serif text-6xl sm:text-8xl -mt-2 sm:-mt-4 select-none">
              &ldquo;&ldquo;
            </div>

            {/* Quote Text & Author */}
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-snug tracking-wide">
                Customer service should not be a department. It should be the entire company.
              </h4>
              <p className="text-base sm:text-lg font-bold opacity-90 pt-1">
                &mdash; Tony Hsieh
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

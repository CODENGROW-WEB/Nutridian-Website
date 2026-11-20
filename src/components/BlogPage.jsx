import SectionHeading from './SectionHeading'

export default function BlogPage({ onBackToHome, onOpenRequestModal }) {

  return (
    <section id="blog-page" className="w-full bg-white overflow-hidden min-h-[85vh]">
      
      {/* Top Banner Header: OUR FOUNDATIONS (Full width edge-to-edge touching both sides) */}
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 border-b border-orange-200/60 shadow-xs">
        <div className="relative w-full">
          <img
            src="/our_foundations_banner.png"
            alt="OUR FOUNDATIONS - Nutridian Animal Health"
            className="w-full h-auto object-cover object-center select-none block"
          />

          {/* Interactive 'Enquiry Now' Button on Left */}
          <div className="absolute left-[6%] sm:left-[8%] md:left-[10%] top-[60%] sm:top-[62%] -translate-y-1/2 z-20">
            <button
              onClick={onOpenRequestModal}
              className="px-3 xs:px-4 sm:px-6 py-1 xs:py-1.5 sm:py-2.5 rounded-full bg-white/95 hover:bg-white text-orange-600 hover:text-orange-700 font-extrabold text-[11px] xs:text-xs sm:text-sm lg:text-base border border-orange-300 sm:border-2 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
            >
              Enquiry Now
            </button>
          </div>
        </div>
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
            Home &nbsp;/&nbsp; <span className="text-orange-600 font-bold">Foundations &amp; Blog</span>
          </span>
        </div>

        {/* SECTION 1: KCPL Company Profile & Factory Gate */}
        <div className="pt-2 pb-12 sm:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: KCPL History Copy with Drop-Cap 'K' */}
            <div className="lg:col-span-7 text-slate-800 text-xs sm:text-sm lg:text-[15px] leading-relaxed font-medium">
              <p className="text-justify leading-[1.75]">
                <span className="float-left mr-2.5 mt-0.5 w-7 h-7 sm:w-8 sm:h-8 bg-[#f95700] text-white font-black text-lg sm:text-xl flex items-center justify-center rounded-xs shadow-xs select-none">
                  K
                </span>
                anad Chemicals Pvt. Ltd. (KCPL) is a well-established and reputed leader in the animal health industry, globally recognized for excellence in manufacturing and exporting high-quality solutions like Halquinol and allied products. Founded in 1971, KCPL brings over 55 years of deep expertise to producing feed additives, medicines and chemicals that prevent and treat animal diseases while optimizing production efficiency. Guided by a profound understanding of customer needs, our products are carefully formulated to meet strict standard specifications and are backed by rigorous research. At KCPL, we constantly upgrade our processes to deliver affordable, innovative and effective solutions worldwide. Expanding our global reach, KCPL launched Nutridian Animal Health—a dynamic venture dedicated to bringing premier products and services directly to the grassroots level of the animal healthcare market. Under the guidance of our Managing Director and executive leadership, Nutridian AH has quickly made a powerful impact across the industry.
              </p>
            </div>

            {/* Right Column: Kanad Chemicals Factory Gate Photo (Exact provided image) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group max-w-md w-full">
                <img
                  src="/kanad_factory_gate.png"
                  alt="Kanad Chemicals Private Limited Manufacturing Facility"
                  className="w-full h-auto object-contain select-none transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: MANUFACTURING UNIT R&D */}
        <div className="py-8 sm:py-12 border-t border-slate-200">
          
          <SectionHeading title="MANUFACTURING UNIT R&D" className="mb-8 sm:mb-10" />

          <div className="space-y-8">
            
            {/* Top Grid: R&D Graphic Left + State-of-the-Art Manufacturing Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: 3D Puzzle R & D Graphic (Exact provided image) */}
              <div className="lg:col-span-6 flex justify-center">
                <img
                  src="/rd_puzzle_graphic.png"
                  alt="Manufacturing Unit R&D Puzzle Innovation"
                  className="w-full max-w-md lg:max-w-none h-auto object-contain select-none transition-transform duration-300 hover:scale-[1.02]"
                />
              </div>

              {/* Right Column: State-of-the-Art Manufacturing */}
              <div className="lg:col-span-6 space-y-3 pt-2">
                <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-900 inline-block shrink-0" />
                  <span>State-of-the-Art Manufacturing</span>
                </h3>
                <p className="text-slate-700 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed text-justify font-medium">
                  Our sophisticated manufacturing facility is equipped with cutting-edge technology and advanced processing systems. Featuring high-precision machinery and tools, the plant is fully optimized to meet the diverse and exacting requirements of our industrial clients. We strictly maintain our facility in accordance with stringent global industrial standards to guarantee the highest level of product quality, safety and consistency.
                </p>
              </div>

            </div>

            {/* Bottom Row: Innovative Research & Development (Full width below) */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-900 inline-block shrink-0" />
                <span>Innovative Research &amp; Development</span>
              </h3>
              <p className="text-slate-700 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed text-justify font-medium">
                Complementing our production capabilities, our well-integrated R&amp;D unit consistently drives process innovation and quality enhancement. This dedicated research focus allows us to develop superior, customized products tailored to evolving market needs. Every formulation undergoes rigorous, scientifically validated testing to ensure maximum efficacy and performance.
              </p>
            </div>

          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* SECTION 3: BLUEPRINT & HORIZON (Vision, Mission, Values) */}
        {/* ---------------------------------------------------- */}
        <div className="py-12 sm:py-16 border-t border-slate-200">
          
          {/* Header Badge with authentic rooster emblem */}
          <SectionHeading title="BLUEPRINT & HORIZON" className="mb-10 sm:mb-12" />

          {/* Cards Container with Soft Neutral Background */}
          <div className="bg-[#f4f6f8] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xs border border-slate-200/80">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              
              {/* CARD 1: OUR VISION */}
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-300 flex flex-col bg-[#476982] text-white group">
                <div className="w-full aspect-[1024/526] overflow-hidden bg-white">
                  <img
                    src="/card_our_vision.jpg"
                    alt="Our Vision"
                    className="w-full h-[200%] object-cover object-top select-none group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-center">
                  <div className="pb-3 mb-2 border-b border-white/30">
                    <h3 className="font-science-gothic font-black tracking-[0.25em] text-sm sm:text-base uppercase text-white">
                      OUR VISION
                    </h3>
                  </div>
                  <p className="text-white text-xs sm:text-sm leading-relaxed font-medium">
                    To Become leading Indian animal healthcare organization driven by people
                  </p>
                </div>
              </div>

              {/* CARD 2: OUR MISSION */}
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-300 flex flex-col bg-[#476982] text-white group">
                <div className="w-full aspect-[1024/526] overflow-hidden bg-white">
                  <img
                    src="/card_our_mission.png"
                    alt="Our Mission"
                    className="w-full h-[200%] object-cover object-top select-none group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-center">
                  <div className="pb-3 mb-2 border-b border-white/30">
                    <h3 className="font-science-gothic font-black tracking-[0.25em] text-sm sm:text-base uppercase text-white">
                      OUR MISSION
                    </h3>
                  </div>
                  <p className="text-white text-xs sm:text-sm leading-relaxed font-medium">
                    We are committed to develop innovative, safe &amp; effective products for the livestock health
                  </p>
                </div>
              </div>

              {/* CARD 3: OUR VALUES */}
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-300 flex flex-col bg-[#476982] text-white group">
                <div className="w-full aspect-[1024/526] overflow-hidden bg-white">
                  <img
                    src="/card_our_values.png"
                    alt="Our Values"
                    className="w-full h-[200%] object-cover object-top select-none group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between text-left">
                  <div className="pb-3 mb-2 border-b border-white/30 text-center">
                    <h3 className="font-science-gothic font-black tracking-[0.25em] text-sm sm:text-base uppercase text-white">
                      OUR VALUES
                    </h3>
                  </div>
                  <ul className="space-y-1.5 text-white text-xs sm:text-sm leading-relaxed font-medium pl-2 sm:pl-4">
                    <li className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">&ndash;</span>
                      <span>Creativity &amp; Efficiency</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">&ndash;</span>
                      <span>Concern For Achievement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="font-bold text-slate-200">&ndash;</span>
                      <span>Collaboration &amp; Human</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>        {/* ---------------------------------------------------- */}
        {/* SECTION 4: COMPLIANCE & STADARDS                     */}
        {/* ---------------------------------------------------- */}
        <div className="py-12 sm:py-16 border-t border-slate-200">
          
          {/* Header Badge with authentic rooster emblem */}
          <SectionHeading title="COMPLIANCE & STANDARDS" className="mb-8 sm:mb-10" />

          {/* Subhead Quote Statement (Exact wording matching reference) */}
          <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12 px-4">
            <p className="text-sm sm:text-base md:text-lg font-semibold text-slate-800 leading-relaxed font-sans">
              &ldquo;A trusted global manufacturer and exporter of Halquinol and allied products.<br className="hidden sm:block" />
              Driven by international quality standards, we are proud to be<br className="hidden sm:block" />
              cGMP, ISO 9001: 2015, ISO 22000, Fami QS and Halal certified.&rdquo;
            </p>
          </div>

          {/* 5 Authentic Certificate Paper Documents Grid (Exact high-res scans) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 mb-10 max-w-5xl mx-auto">
            {[
              {
                img: '/cert_doc_cgmp.png',
                name: 'cGMP Certificate',
                subtitle: 'Good Manufacturing Practice - Food Hygiene (Cert No: 80473/A/0001/NA/En)',
                badge: 'cGMP Standard'
              },
              {
                img: '/cert_doc_iso9001.png',
                name: 'ISO 9001:2015',
                subtitle: 'Quality Management System - UKAS & IAF (Cert No: 72828/A/0001/UK/En)',
                badge: 'Quality Standard'
              },
              {
                img: '/cert_doc_iso22000.png',
                name: 'ISO 22000:2018',
                subtitle: 'Food Safety Management System (Cert No: 72828/B/0001/UK/En)',
                badge: 'Food Safety'
              },
              {
                img: '/cert_doc_famiqs.png',
                name: 'FAMI-QS Certificate',
                subtitle: 'EU CERT Feed Safety & Quality Management System (Cert No: EU-02-D-763)',
                badge: 'FAMI-QS Code'
              },
              {
                img: '/cert_doc_fssai.png',
                name: 'FSSAI State License',
                subtitle: 'Food Safety and Standards Authority of India (License No: 11517022000488)',
                badge: 'Govt. Licensed'
              }
            ].map((cert, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-slate-300 rounded-xl p-2 sm:p-2.5 shadow-xs hover:shadow-xl hover:border-orange-500 hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center justify-center group overflow-hidden"
              >
                <div className="relative w-full overflow-hidden rounded-lg bg-slate-50 flex items-center justify-center">
                  <img
                    src={cert.img}
                    alt={cert.name}
                    className="w-full h-auto object-contain select-none group-hover:scale-110 transition-transform duration-300 ease-out"
                  />
                </div>
                <div className="mt-2 text-center w-full px-1">
                  <p className="text-[11px] sm:text-xs font-bold text-slate-800 truncate group-hover:text-orange-600 transition-colors">
                    {cert.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Official Quality Logos Strip (Exact shared image) */}
          <div className="max-w-2xl mx-auto px-4 flex justify-center pt-2">
            <img
              src="/compliance_cert_logos.png"
              alt="cGMP, ISO 22000, ISO 9001:2015, HALAL, FAMI-QS Certified"
              className="w-full max-w-xl h-auto object-contain select-none drop-shadow-xs"
            />
          </div>

        </div>

      </div>
    </section>
  )
}

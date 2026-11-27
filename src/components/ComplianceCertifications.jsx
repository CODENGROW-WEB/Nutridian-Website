export default function ComplianceCertifications() {
  return (
    <section className="py-6 sm:py-10 md:py-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Decreased left-right size of the broken egg banner (Compact, centered width) */}
        <div className="relative w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto flex flex-col items-center justify-center">
          
          {/* Authentic Broken Egg Banner Graphic */}
          <div className="relative w-full group transition-transform duration-300 hover:scale-[1.01]">
            <img
              src="/compliance_banner_fssai.webp?v=20261123_noline"
              alt="Compliance & Certifications Banner - cGMP, ISO 22000, ISO 9001, FAMI-QS, FSSAI, HALAL"
              className="w-full h-auto select-none pointer-events-none drop-shadow-md block mx-auto"
            />
          </div>

        </div>

      </div>
    </section>
  )
}

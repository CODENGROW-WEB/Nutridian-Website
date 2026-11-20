export default function AviromSpotlight({ onRequestInfo }) {
  return (
    <section className="w-full bg-white overflow-hidden my-6 sm:my-10">
      
      {/* AVIROM PLUS Spotlight Banner touching both sides */}
      <div 
        onClick={onRequestInfo}
        className="relative w-full overflow-hidden shadow-xs hover:shadow-md cursor-pointer group border-y border-slate-200/80 transition-shadow duration-300"
        title="AVIROM PLUS Digestive Health Booster - Click to Request Information"
      >
        {/* Authentic High-Resolution AVIROM PLUS Banner Image Graphic */}
        <img
          src="/avirom_plus_banner.png"
          alt="AVIROM PLUS Digestive Health Booster by igusol - Nutridian Animal Health"
          className="w-full h-auto object-cover object-center block select-none"
        />

        {/* Subtle interactive hover indicator badge */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-purple-900/90 text-white backdrop-blur-sm shadow-md">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Request Product Details
          </span>
        </div>
      </div>

    </section>
  )
}

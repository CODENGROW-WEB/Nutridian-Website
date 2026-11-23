import { useState } from 'react'

export default function BlogDetail({ onBackToHome }) {
  const [zoomImage, setZoomImage] = useState(null)
  const [zoomLevel, setZoomLevel] = useState(1)

  const pages = [
    {
      id: 1,
      src: '/blog/pharma_outlook_page1.jpg?v=20261123_perfect',
      title: 'Pharma Outlook Feature - Page 24'
    },
    {
      id: 2,
      src: '/blog/pharma_outlook_page2.jpg?v=20261123_perfect',
      title: 'Pharma Outlook Feature - Page 25'
    }
  ]

  const openZoom = (src) => {
    setZoomImage(src)
    setZoomLevel(1)
  }

  const closeZoom = () => {
    setZoomImage(null)
    setZoomLevel(1)
  }

  return (
    <section className="w-full bg-[#f3f4f6] min-h-screen py-6 sm:py-10">
      <div className="max-w-5xl mx-auto px-3 sm:px-6">

        {/* Top Header & Back Button */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-orange-50 text-slate-800 hover:text-orange-600 font-bold text-sm border border-slate-300 shadow-xs transition-colors cursor-pointer group"
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

          <span className="text-xs text-slate-500 font-medium hidden sm:inline-block">
            Click on any page to view in full resolution
          </span>
        </div>

        {/* Enhanced High-Resolution Magazine Pages */}
        <div className="flex flex-col gap-8 sm:gap-10 items-center">
          {pages.map((p) => (
            <div
              key={p.id}
              onClick={() => openZoom(p.src)}
              className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200/90 cursor-zoom-in relative group transition-all duration-300 hover:shadow-xl"
            >
              <img
                src={p.src}
                alt={p.title}
                className="w-full h-auto object-contain block select-none"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />

              {/* Click to zoom badge */}
              <div className="absolute top-3 right-3 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="px-3 py-1.5 rounded-lg bg-slate-900/80 text-white text-xs font-bold flex items-center gap-1.5 shadow-md backdrop-blur-xs">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  <span>Click to Zoom</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Back Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-orange-50 text-slate-800 hover:text-orange-600 font-bold text-sm border border-slate-300 shadow-sm transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Home</span>
          </button>
        </div>

      </div>

      {/* Full-Screen Zoom Lightbox Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-between p-2 sm:p-4"
          onClick={closeZoom}
        >
          {/* Top Bar with Controls */}
          <div
            className="w-full max-w-5xl flex items-center justify-between text-white py-2 px-3 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs sm:text-sm font-bold text-slate-200">
              High-Definition Full Page View ({Math.round(zoomLevel * 100)}%)
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                className="px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-bold text-sm cursor-pointer"
                title="Zoom Out"
              >
                -
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-bold text-xs cursor-pointer"
                title="Reset Zoom"
              >
                Reset
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                className="px-2.5 py-1 rounded bg-white/20 hover:bg-white/30 text-white font-bold text-sm cursor-pointer"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={closeZoom}
                className="ml-3 w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center cursor-pointer shadow-md"
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Scrollable Image Area */}
          <div
            className="flex-1 w-full overflow-auto flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={zoomImage}
              alt="Zoomed Magazine Page"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'top center',
                transition: 'transform 0.2s ease',
                maxHeight: zoomLevel <= 1 ? '85vh' : 'none'
              }}
              className="max-w-full h-auto object-contain rounded shadow-2xl block"
            />
          </div>

          {/* Bottom Hint */}
          <div className="text-slate-400 text-xs py-1">
            Click anywhere outside or the ✕ button to close
          </div>
        </div>
      )}
    </section>
  )
}

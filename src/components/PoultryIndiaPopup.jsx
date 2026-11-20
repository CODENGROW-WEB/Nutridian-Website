import { useEffect } from 'react'

export default function PoultryIndiaPopup({ isOpen, onClose }) {
  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // Body scroll lock while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Poultry India 2026"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300 cursor-pointer"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      {/* Pure Image Container */}
      <div className="relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden flex items-center justify-center animate-in zoom-in-95 duration-300 cursor-default">
        
        {/* Minimalist Close 'X' Button in Corner */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/75 hover:bg-orange-600 text-white flex items-center justify-center border border-white/40 backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95 cursor-pointer"
        >
          <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Pure Image Only */}
        <img
          src="/events/poultry_india_2026_popup.jpg"
          alt="Meet Us at Poultry India 2026 - Nutridian Animal Health"
          className="w-full h-auto max-h-[90vh] object-contain rounded-2xl sm:rounded-3xl select-none"
        />
      </div>
    </div>
  )
}

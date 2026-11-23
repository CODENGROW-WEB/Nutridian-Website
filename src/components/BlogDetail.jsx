export default function BlogDetail({ onBackToHome }) {
  const images = [
    {
      id: 1,
      src: '/blog/pharma_outlook_page1.jpg',
      alt: 'Page 1'
    },
    {
      id: 2,
      src: '/blog/pharma_outlook_page2.jpg',
      alt: 'Page 2'
    }
  ]

  return (
    <section className="w-full bg-[#f4f4f4] min-h-screen py-6 sm:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        
        {/* Simple Back Button */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-orange-50 text-slate-800 hover:text-orange-600 font-bold text-sm border border-slate-300 shadow-xs transition-colors cursor-pointer"
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

        {/* Only the images shared by the user */}
        <div className="flex flex-col gap-6 sm:gap-8 items-center">
          {images.map((img) => (
            <div
              key={img.id}
              className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-slate-200"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-contain block select-none"
              />
            </div>
          ))}
        </div>

        {/* Bottom Back Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-orange-50 text-slate-800 hover:text-orange-600 font-bold text-sm border border-slate-300 shadow-xs transition-colors cursor-pointer"
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
    </section>
  )
}

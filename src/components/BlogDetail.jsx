export default function BlogDetail({ onBackToHome }) {
  const pages = [
    {
      id: 1,
      src: '/blog/pharma_outlook_page1.webp?v=20261123_perfect',
      title: 'Pharma Outlook Feature - Page 24'
    },
    {
      id: 2,
      src: '/blog/pharma_outlook_page2.webp?v=20261123_perfect',
      title: 'Pharma Outlook Feature - Page 25'
    }
  ]

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
        </div>

        {/* Enhanced High-Resolution Magazine Pages (Static, no zoom effect) */}
        <div className="flex flex-col gap-8 sm:gap-10 items-center">
          {pages.map((p) => (
            <div
              key={p.id}
              className="w-full bg-white rounded-xl shadow-md overflow-hidden border border-slate-200"
            >
              <img
                src={p.src}
                alt={p.title}
                className="w-full h-auto object-contain block select-none"
              />
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
    </section>
  )
}

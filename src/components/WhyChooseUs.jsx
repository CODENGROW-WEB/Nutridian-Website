import SectionHeading from './SectionHeading'

export default function WhyChooseUs() {
  const features = [
    { id: 0, title: 'Unique, Quality & Innovative Products' },
    { id: 1, title: 'In-House Production' },
    { id: 2, title: 'Unbeatable & Competitive Prices' },
    { id: 3, title: 'Sufficient Stock Availability' },
    { id: 4, title: 'Prompt Dispatch, Timely Delivery' },
    { id: 5, title: 'Strong Supply Chain' },
    { id: 6, title: 'Customer Support & Technical Services' }
  ]

  return (
    <section id="why-choose-us" className="py-12 sm:py-16 md:py-20 bg-[#f5f5f5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header Badge with authentic rooster emblem - Large */}
        <SectionHeading title="WHY CHOOSE US ?" className="mb-8 sm:mb-14" size="lg" />

        {/* Central Dial Image with Integrated Arrow Labels - Generous scale */}
        <div className="w-full max-w-6xl 2xl:max-w-7xl mx-auto flex justify-center px-2 sm:px-4">
          <img
            src="/why_choose_us_dial_large.png"
            alt="Why Choose Us - Nutridian Animal Health Advantages"
            className="w-full h-auto max-w-5xl lg:max-w-6xl xl:max-w-7xl object-contain select-none drop-shadow-xs transform transition-transform duration-300 hover:scale-[1.01]"
          />
        </div>

        {/* Mobile View: Feature Grid for small devices */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 pt-8 max-w-lg mx-auto">
          {features.map((feat, idx) => (
            <div
              key={feat.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 text-slate-900 font-extrabold text-xs shadow-xs"
            >
              <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                {idx + 1}
              </div>
              <span className="whitespace-pre-line">{feat.title}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

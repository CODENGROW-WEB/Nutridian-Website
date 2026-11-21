import { useState, useEffect } from 'react'
import SectionHeading from './SectionHeading'
import { EVENTS_DATA } from '../data/eventsData'

export default function Events({ onBackToHome }) {
  const [activeYear, setActiveYear] = useState('2022')
  const [activeEventIdx, setActiveEventIdx] = useState(0)
  const [selectedImage, setSelectedImage] = useState(null)
  const [isCollageModalOpen, setIsCollageModalOpen] = useState(false)

  // Dynamic countdown timer calculated for Poultry India Expo 2026 (25 Nov 2026 09:00 IST)
  const targetDate = new Date('2026-11-25T09:00:00+05:30').getTime()

  const calculateTimeLeft = () => {
    const now = new Date().getTime()
    const diff = Math.max(0, targetDate - now)
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Reset active event index when activeYear changes
  useEffect(() => {
    setActiveEventIdx(0)
  }, [activeYear])

  // Resolve current year data
  const currentYearData = EVENTS_DATA[activeYear] || EVENTS_DATA['2022']
  const availableEvents = currentYearData.events || []
  const currentEvent = availableEvents[activeEventIdx] || availableEvents[0]

  return (
    <section id="events-page" className="w-full bg-white overflow-hidden min-h-[85vh]">
      
      {/* 1. Top Event Media Banner: Panoramic Collage Banner from Google Drive */}
      <div className="relative w-full overflow-hidden shadow-lg border-b border-orange-200">
        <div
          className="relative w-full min-h-[280px] sm:min-h-[360px] md:min-h-[420px] flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-cover bg-center overflow-hidden"
          style={{
            backgroundImage: "url('/events/our_events_collage_web.jpg')",
          }}
        >
          {/* Dark semi-transparent overlay to make typography pop */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/75 to-slate-950/90 backdrop-blur-[1px] pointer-events-none" />

          {/* Authentic OUR EVENTS header image from Drive root */}
          <div className="relative z-10 max-w-xl mx-auto px-4 mb-4">
            <img
              src="/events/our_events_header.png"
              alt="OUR EVENTS"
              className="h-16 sm:h-24 md:h-28 w-auto object-contain mx-auto drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)] filter brightness-110"
            />
          </div>

          {/* Subtitle Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-600/90 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-xl backdrop-blur-md">
            <span>Global Exhibitions • Poultry India • VIV Asia</span>
          </div>

          {/* Interactive button to view full panoramic collage */}
          <button
            onClick={() => setIsCollageModalOpen(true)}
            className="relative z-10 mt-5 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-slate-900 border border-white/60 font-bold text-xs uppercase tracking-wider backdrop-blur-md transition-all shadow-md cursor-pointer hover:scale-105"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M4 4h6v2H6v4H4V4zm16 0h-6v2h4v4h2V4zM4 20h6v-2H6v-4H4v6zm16 0h-6v-2h4v-4h2v6z" />
            </svg>
            <span>View Full Exhibition Collage</span>
          </button>
        </div>

        {/* Bottom Upcoming Event Ticker Strip */}
        <div className="bg-slate-900 text-white text-center py-2.5 px-4 font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 flex-wrap">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-orange-400 uppercase font-black">Upcoming Events:</span>
          <span>Quarter Meeting July 2026 • Poultry India Exhibition Hitex Hyderabad 2026</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">

        {/* Top Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-4">
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
            Home &nbsp;/&nbsp; <span className="text-orange-600 font-bold">Events</span>
          </span>
        </div>

        {/* 2. Live Countdown Timer Section */}
        <div className="my-10 text-center flex flex-col items-center">
          
          {/* Title Pill Badge */}
          <div className="inline-block px-6 py-2.5 rounded-full bg-indigo-600 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md mb-6">
            COUNTDOWN TO NUTRIDIAN ANIMAL HEALTH 2026
          </div>

          {/* 4 Odometer Circles */}
          <div className="flex items-center justify-center gap-2 xs:gap-3 sm:gap-6 flex-wrap">
            {/* Days */}
            <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-28 sm:h-28 rounded-full border-2 sm:border-4 border-slate-200 bg-white shadow-md flex flex-col items-center justify-center">
              <span className="text-lg xs:text-xl sm:text-3xl font-black text-indigo-600 leading-none">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold text-slate-600 mt-0.5 sm:mt-1 uppercase">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-28 sm:h-28 rounded-full border-2 sm:border-4 border-slate-200 bg-white shadow-md flex flex-col items-center justify-center">
              <span className="text-lg xs:text-xl sm:text-3xl font-black text-indigo-600 leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold text-slate-600 mt-0.5 sm:mt-1 uppercase">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-28 sm:h-28 rounded-full border-2 sm:border-4 border-slate-200 bg-white shadow-md flex flex-col items-center justify-center">
              <span className="text-lg xs:text-xl sm:text-3xl font-black text-indigo-600 leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold text-slate-600 mt-0.5 sm:mt-1 uppercase">
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-28 sm:h-28 rounded-full border-2 sm:border-4 border-slate-200 bg-white shadow-md flex flex-col items-center justify-center">
              <span className="text-lg xs:text-xl sm:text-3xl font-black text-indigo-600 leading-none">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-bold text-slate-600 mt-0.5 sm:mt-1 uppercase">
                Seconds
              </span>
            </div>
          </div>
        </div>

        {/* 3. OUR EVENTS Timeline Section */}
        <div className="mt-10 sm:mt-14 text-center">
          
          {/* Header with authentic rooster emblem */}
          <SectionHeading title="OUR EVENTS" className="mb-4 sm:mb-6" />

          {/* Horizontal Year Timeline Selector */}
          <div className="relative max-w-xl mx-auto my-4 sm:my-6 flex items-center justify-center px-2">
            {/* Timeline Horizontal Axis Line */}
            <div className="absolute inset-x-2 top-1/2 h-0.5 bg-slate-300 -z-0" />

            {/* Year Buttons for authentic user provided events: 2022, 2023, 2026 */}
            <div className="relative z-10 flex items-center gap-2 sm:gap-4 bg-white px-3 sm:px-6 py-1 rounded-full overflow-x-auto no-scrollbar max-w-full">
              {['2022', '2023', '2026'].map((year) => {
                const isActive = activeYear === year
                return (
                  <button
                    key={year}
                    onClick={() => setActiveYear(year)}
                    className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all cursor-pointer shrink-0 ${
                      isActive
                        ? 'bg-black text-white shadow-lg scale-105 ring-2 ring-orange-500'
                        : 'bg-white text-slate-800 border border-slate-300 hover:border-orange-500 hover:text-orange-600'
                    }`}
                  >
                    {year === '2026' ? '2026 (Upcoming)' : year}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Multi-Event Switcher Pills (when a year has multiple events, e.g. 2023 & 2025) */}
          {availableEvents.length > 1 && (
            <div className="my-6 flex items-center justify-center gap-2 flex-wrap">
              {availableEvents.map((ev, idx) => {
                const isSelected = activeEventIdx === idx
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveEventIdx(idx)}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-black transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? 'bg-[#ea580c] text-white shadow-md scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-orange-600 border border-slate-200'
                    }`}
                  >
                    {ev.title}
                  </button>
                )
              })}
            </div>
          )}

          {/* Active Event Information */}
          <div className="my-6 space-y-1">
            <h3 className="text-2xl sm:text-3xl font-black text-red-600 tracking-tight font-sans">
              {currentEvent.title}
            </h3>
            <p className="text-sm sm:text-base font-bold text-slate-700">
              {currentEvent.venue} &bull; <span className="text-orange-600">{currentEvent.dateRange}</span>
            </p>
          </div>

          {/* Render Multi-Day Gallery Sections with Real Photos from Google Drive */}
          <div className="space-y-16 mt-10">
            {currentEvent.days.map((day, dayIdx) => (
              <div key={dayIdx} className="space-y-6">
                
                {/* Day Header */}
                <div className="flex flex-col items-center justify-center border-b border-slate-200 pb-3 max-w-md mx-auto">
                  <h4 className="text-2xl sm:text-3xl font-serif font-black text-red-600 tracking-wide">
                    {day.name}
                  </h4>
                  <span className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                    {day.date} &bull; {day.gallery.length} Official Photos
                  </span>
                </div>

                {/* Photo Grid for this Day */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                  {day.gallery.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(item)}
                      className="group relative rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 sm:border-2 shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-slate-100 cursor-pointer aspect-[4/3]"
                    >
                      <img
                        src={item.src}
                        alt={item.caption || 'Nutridian Event Photo'}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = '/events/our_events_collage_web.jpg'
                        }}
                      />
                      
                      {/* Hover Overlay with Zoom Icon */}
                      <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* 4. Full Exhibition Collage Highlight Banner */}
        <div className="mt-20 pt-10 border-t border-slate-200">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tight">
              Nutridian Exhibition Moments
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Highlights from our delegates, global distributors, and scientific forums across international poultry exhibitions
            </p>
          </div>

          <div
            onClick={() => setIsCollageModalOpen(true)}
            className="group relative rounded-3xl overflow-hidden border-2 border-slate-300 shadow-xl cursor-pointer hover:border-orange-500 transition-all"
          >
            <img
              src="/events/our_events_collage_web.jpg"
              alt="Nutridian Animal Health Events Collage"
              className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
              <span className="px-5 py-2.5 rounded-full bg-white/95 text-slate-900 font-extrabold text-xs uppercase tracking-wider shadow-xl group-hover:scale-105 transition-transform flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span>Click to Expand Panoramic Collage</span>
              </span>
            </div>
          </div>
        </div>

        {/* 5. Full Single Image Lightbox Preview Modal */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            >
              <button
                onClick={() => setSelectedImage(null)}
                aria-label="Close modal"
                className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-orange-600 text-white flex items-center justify-center font-bold transition-colors cursor-pointer"
              >
                ✕
              </button>
              <div className="p-2 sm:p-4 flex items-center justify-center bg-black min-h-[300px]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.caption}
                  className="w-full h-auto max-h-[78vh] object-contain"
                />
              </div>
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between gap-4">
                <p className="text-xs sm:text-sm font-bold text-slate-200">
                  {selectedImage.caption}
                </p>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer shrink-0"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. Panoramic Collage Fullscreen Modal */}
        {isCollageModalOpen && (
          <div
            onClick={() => setIsCollageModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col max-h-[95vh]"
            >
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <h4 className="font-extrabold text-sm sm:text-base text-white">
                  Nutridian Animal Health • Global Events Diamond Collage
                </h4>
                <button
                  onClick={() => setIsCollageModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-orange-600 text-white flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
              <div className="overflow-auto p-2 sm:p-4 flex items-center justify-center bg-black">
                <img
                  src="/events/our_events_collage_web.jpg"
                  alt="Nutridian Events Panorama"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}

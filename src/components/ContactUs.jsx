import { useState } from 'react'
import { submitToNutridian } from '../services/formService'

export default function ContactUs({ onBackToHome }) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await submitToNutridian(formData, 'Contact Us Inquiry')
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ fullName: '', companyName: '', email: '', phone: '', subject: '', message: '' })
    }, 6000)
  }

  return (
    <section id="contact-us" className="w-full bg-white overflow-hidden min-h-[85vh]">
      
      {/* Top Header Banner - Full width edge-to-edge touching both sides */}
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 border-b border-orange-200/60 shadow-xs">
        <img
          src="/contact_us_banner.png"
          alt="CONTACT US - Nutridian Animal Health"
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
            Home &nbsp;/&nbsp; <span className="text-orange-600 font-bold">Contact Us</span>
          </span>
        </div>

        {/* Middle Content Section: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12 items-start">

          {/* Left Column: Get in Touch Info & Socials */}
          <div className="lg:col-span-5 space-y-7">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#c84010] mb-6 tracking-tight font-sans">
                Get in Touch
              </h2>

              <div className="space-y-5 text-slate-900">
                
                {/* Call Us */}
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-black text-base leading-tight">Call us</h3>
                    <a href="tel:+919004423478" className="text-slate-800 font-semibold hover:text-[#c84010] transition-colors mt-0.5 text-sm sm:text-base block">
                      +91 90044 23478
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-black text-base leading-tight">Email</h3>
                    <a href="mailto:info@nutridian.in" className="text-slate-800 font-semibold hover:text-[#c84010] transition-colors mt-0.5 text-sm sm:text-base block">
                      info@nutridian.in
                    </a>
                  </div>
                </div>

                {/* Our Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-black text-base leading-tight">Our Address</h3>
                    <p className="text-slate-800 font-semibold mt-0.5 text-sm sm:text-base leading-relaxed">
                      Nutridian Animal Health (A Unit of KCPL)<br />
                      428, Signet A, Lodha Amara,<br />
                      Kolshet, Thane (W) - 400 607.
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="pt-2">
                  <h3 className="font-extrabold text-black text-base mb-2">Business Hours</h3>
                  <div className="space-y-2 text-sm sm:text-base text-slate-800">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 block leading-tight">Mon. - Sat.</span>
                        <span className="text-slate-700 text-sm font-medium block mt-0.5">09:30 am - 05:30 pm IST</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0 shadow-xs">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="font-extrabold text-slate-900">Sunday Closed</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Follow Us Card (Exact box matching mockup) */}
            <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-white shadow-[0_8px_30px_rgba(200,215,235,0.7)] w-full max-w-full sm:max-w-[260px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-black text-black text-sm tracking-wide">Follow Us</span>
                <div className="flex-1 h-px bg-slate-200" />
              </div>

              <div className="flex items-center justify-between px-1 text-center">
                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-xs overflow-hidden">
                    <span className="font-serif font-black text-2xl leading-none">f</span>
                  </div>
                  <span className="text-[9px] font-black tracking-wider uppercase text-slate-800 group-hover:text-[#c84010] transition-colors">
                    FACEBOOK
                  </span>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-xs overflow-hidden">
                    <span className="font-sans font-black text-base leading-none">in</span>
                  </div>
                  <span className="text-[9px] font-black tracking-wider uppercase text-slate-800 group-hover:text-[#c84010] transition-colors">
                    LINKEDIN
                  </span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919004423478"
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-1 group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-black flex items-center justify-center text-white transition-transform group-hover:scale-105 shadow-xs overflow-hidden">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.79 14.07c-.24.67-1.4 1.24-1.92 1.32-.49.07-1.12.1-3.23-.77-2.69-1.11-4.43-3.83-4.56-4.01-.13-.18-1.09-1.45-1.09-2.76 0-1.31.69-1.95.93-2.22.24-.27.53-.33.71-.33.18 0 .36 0 .51.01.16.01.38-.06.59.45.22.53.76 1.86.83 2 .07.14.12.31.02.5-.09.19-.14.3-.29.47-.14.17-.3.38-.43.51-.14.14-.29.3-.12.59.17.29.74 1.22 1.6 1.98 1.1.98 2.03 1.28 2.32 1.42.29.14.46.12.63-.07.18-.2.74-.86.94-1.16.2-.29.4-.24.67-.14.27.1 1.73.82 2.03.97.29.15.49.22.56.34.07.13.07.74-.17 1.41z" />
                    </svg>
                  </div>
                  <span className="text-[9px] font-black tracking-wider uppercase text-slate-800 group-hover:text-[#c84010] transition-colors">
                    WHATSAPP
                  </span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Connect Form (Clean background matching user's request) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-sm border-2 sm:border-[2.5px] border-[#c84010] shadow-sm p-4 xs:p-6 sm:p-8 bg-white overflow-hidden">
              <h3 className="relative z-10 text-xl sm:text-2xl font-bold text-[#c84010] mb-5 tracking-tight font-sans">
                Lets Connect, We are here to Serve you.
              </h3>

              {isSubmitted ? (
                <div className="relative z-10 p-6 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 text-center space-y-2 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-2xl font-bold shadow-sm">
                    ✓
                  </div>
                  <h4 className="font-extrabold text-lg">Message Forwarded to info@nutridian.in!</h4>
                  <p className="text-sm font-medium text-emerald-700">
                    Thank you for reaching out. Your inquiry has been sent directly to <span className="font-bold underline">info@nutridian.in</span>. Our team will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  
                  {/* FULL NAME & COMPANY NAME (Row 1) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-black tracking-wider uppercase text-black mb-1.5">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c84010] text-sm font-medium shadow-2xs transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black tracking-wider uppercase text-black mb-1.5">
                        COMPANY NAME *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="Company Name"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c84010] text-sm font-medium shadow-2xs transition-all"
                      />
                    </div>
                  </div>

                  {/* EMAIL & PHONE (Row 2) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-black tracking-wider uppercase text-black mb-1.5">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c84010] text-sm font-medium shadow-2xs transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-black tracking-wider uppercase text-black mb-1.5">
                        PHONE / MOBILE
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 xxxxx xxxxx"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c84010] text-sm font-medium shadow-2xs transition-all"
                      />
                    </div>
                  </div>

                  {/* SUBJECT (Row 3) */}
                  <div>
                    <label className="block text-[11px] font-black tracking-wider uppercase text-black mb-1.5">
                      SUBJECT *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c84010] text-sm font-medium shadow-2xs transition-all"
                    />
                  </div>

                  {/* MASSAGE (Row 4 - Optional / not compulsory as requested) */}
                  <div>
                    <label className="block text-[11px] font-black tracking-wider uppercase text-black mb-1.5">
                      MASSAGE
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Massage (Optional)"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#c84010] text-sm font-medium shadow-2xs transition-all resize-none min-h-[120px]"
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-2.5 rounded-lg bg-[#c84010] hover:bg-[#a6330b] disabled:opacity-60 text-white font-extrabold text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending to info@nutridian.in...</span>
                        </>
                      ) : (
                        <span>Send Message</span>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Section: Satellite Google Map matching reference image */}
        <div className="w-full rounded-sm overflow-hidden border border-slate-300 shadow-md">
          <div className="relative w-full h-56 xs:h-64 sm:h-72 md:h-80 bg-slate-900">
            
            {/* Interactive Google Map iframe in Satellite Mode (t=k) */}
            <iframe
              title="Nutridian Location Map"
              src="https://maps.google.com/maps?q=Lodha+Signet,+Kolshet+Road,+Thane+West,+Maharashtra+400607&t=k&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 select-none"
              allowFullScreen=""
              loading="lazy"
            />

            {/* Authentic Map Location Info Badge (Matching reference image overlay) */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/95 backdrop-blur-xs p-2.5 sm:p-3 rounded shadow-lg border border-slate-200 max-w-[220px] xs:max-w-[260px] text-xs pointer-events-auto">
              <div className="flex items-start justify-between gap-1">
                <h4 className="font-bold text-slate-900 text-xs leading-snug">
                  Lodha Signet, Kolshet Road Thane
                </h4>
                <a
                  href="https://maps.google.com/?q=Lodha+Signet,+Kolshet+Road,+Thane+West,+Maharashtra+400607"
                  target="_blank"
                  rel="noreferrer"
                  title="Open in Google Maps"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              <p className="text-[11px] text-slate-600 mt-1 leading-tight">
                Kolshet Rd, Kolshet Industrial Area, Thane West, Maharashtra 400607
              </p>
              <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-700">
                <span className="font-bold text-amber-600">4.4</span>
                <span className="text-amber-500">★★★★☆</span>
                <span className="text-slate-400 text-[10px]">(71)</span>
              </div>
              <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between">
                <a
                  href="https://maps.google.com/?q=Lodha+Signet,+Kolshet+Road,+Thane+West,+Maharashtra+400607"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline font-semibold text-[11px]"
                >
                  View larger map
                </a>
                <a
                  href="https://maps.google.com/maps/dir//Lodha+Signet,+Kolshet+Road,+Thane"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[10px]"
                >
                  Directions
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

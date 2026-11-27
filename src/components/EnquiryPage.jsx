import { useState, useEffect } from 'react'
import { submitToNutridian } from '../services/formService'

export default function EnquiryPage({ onBackToHome, initialProduct = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    telephone: '',
    mobile: '',
    address: '',
    productDetails: initialProduct || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (initialProduct) {
      setFormData((prev) => ({ ...prev, productDetails: initialProduct }))
    }
  }, [initialProduct])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await submitToNutridian(formData, 'Product Enquiry')
    setIsSubmitting(false)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        fullName: '',
        companyName: '',
        email: '',
        telephone: '',
        mobile: '',
        address: '',
        productDetails: ''
      })
    }, 6000)
  }

  return (
    <section id="enquiry-page" className="w-full bg-white overflow-hidden min-h-[85vh]">
      
      {/* Top Header Banner - Full width edge-to-edge touching both sides */}
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 border-b border-orange-200/60 shadow-xs">
        <img
          src="/enquire_now_banner.webp"
          alt="ENQUIRE NOW - Nutridian Animal Health"
          className="w-full h-auto object-cover object-center select-none block"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 pb-12">

        {/* Top Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
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
            Home &nbsp;/&nbsp; <span className="text-orange-600 font-bold">Enquire Now</span>
          </span>
        </div>

        {/* Subhead Quote Text (Exact wording matching reference) */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 px-2">
          <p className="text-sm sm:text-base md:text-[17px] font-medium text-slate-900 leading-relaxed font-sans">
            Have questions about our products or need a quote?<br className="hidden sm:block" />
            Submit your details below and a technical sales expert will reach out to you within 24 hours.
          </p>
        </div>

        {/* Enquiry Form (Exact matching layout in user's image) */}
        <div className="max-w-2xl mx-auto mb-10">
          {isSubmitted ? (
            <div className="p-8 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-800 text-center space-y-3 animate-in fade-in duration-300 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-3xl font-bold shadow-xs">
                ✓
              </div>
              <h4 className="font-extrabold text-xl text-emerald-900">Enquiry Forwarded to info@nutridian.in!</h4>
              <p className="text-sm sm:text-base font-medium text-emerald-700 max-w-md mx-auto">
                Thank you for contacting Nutridian Animal Health. Your requirements have been forwarded directly to <span className="font-bold underline">info@nutridian.in</span>. A technical sales expert will reach out to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              
              {/* Row 1: Full Name & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 rounded-md sm:rounded-lg bg-white border border-slate-400 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium shadow-2xs transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="w-full px-3.5 py-2.5 rounded-md sm:rounded-lg bg-white border border-slate-400 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium shadow-2xs transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Email */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your@email.com"
                  className="w-full px-3.5 py-2.5 rounded-md sm:rounded-lg bg-white border border-slate-400 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium shadow-2xs transition-all"
                />
              </div>

              {/* Row 3: Telephone No. & Mobile No. */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1">
                    Telephone No.
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="(+91) xxx xxx xxxx"
                    className="w-full px-3.5 py-2.5 rounded-md sm:rounded-lg bg-white border border-slate-400 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium shadow-2xs transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1">
                    Mobile No.
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="(+91) xxx xxx xxxx"
                    className="w-full px-3.5 py-2.5 rounded-md sm:rounded-lg bg-white border border-slate-400 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium shadow-2xs transition-all"
                  />
                </div>
              </div>

              {/* Row 4: Address */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Your Address"
                  className="w-full px-3.5 py-2.5 rounded-md sm:rounded-lg bg-white border border-slate-400 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium shadow-2xs transition-all"
                />
              </div>

              {/* Row 5: Product Enquiry Details */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-900 mb-1">
                  Product Enquiry Details
                </label>
                <input
                  type="text"
                  name="productDetails"
                  required
                  value={formData.productDetails}
                  onChange={handleChange}
                  placeholder="Your Product Enquiry Details"
                  className="w-full px-3.5 py-2.5 rounded-md sm:rounded-lg bg-white border border-slate-400 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium shadow-2xs transition-all"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-md sm:rounded-lg bg-[#ea4b00] hover:bg-[#d04000] disabled:opacity-60 text-white font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Forwarding to info@nutridian.in...</span>
                    </>
                  ) : (
                    <span>Submit Enquiry</span>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

        {/* Bottom Section: Follow Us Card (Exact match to reference mockup & user assets) */}
        <div className="flex justify-center pt-2 pb-10">
          <div className="w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-[0_10px_35px_rgba(0,0,0,0.08)] px-5 py-6 sm:px-8 sm:py-7">
            
            {/* Header: Follow Us with clean divider */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-extrabold text-2xl sm:text-3xl text-black tracking-tight font-sans">
                Follow Us
              </span>
              <div className="flex-1 h-[1.5px] bg-slate-300" />
            </div>

            {/* Social Icons Row: Keep Facebook, LinkedIn, WhatsApp (remove everything else) */}
            <div className="flex justify-center items-center gap-6 sm:gap-10 text-center">
              
              {/* 1. FACEBOOK */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-black flex items-center justify-center shadow-xs group-hover:scale-108 group-hover:shadow-lg transition-all duration-200 overflow-hidden">
                  <img
                    src="/logo_facebook.webp"
                    alt="Facebook"
                    className="w-full h-full object-contain select-none"
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-black group-hover:text-[#ea4b00] transition-colors mt-0.5">
                  FACEBOOK
                </span>
              </a>

              {/* 2. LINKEDIN */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-black flex items-center justify-center shadow-xs group-hover:scale-108 group-hover:shadow-lg transition-all duration-200 overflow-hidden">
                  <img
                    src="/logo_linkedin.webp"
                    alt="LinkedIn"
                    className="w-full h-full object-contain select-none"
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-black group-hover:text-[#ea4b00] transition-colors mt-0.5">
                  LINKEDIN
                </span>
              </a>

              {/* 3. WHATSAPP */}
              <a
                href="https://wa.me/919004423478"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-black flex items-center justify-center shadow-xs group-hover:scale-108 group-hover:shadow-lg transition-all duration-200 overflow-hidden p-1">
                  <img
                    src="/logo_whatsapp.webp"
                    alt="WhatsApp"
                    className="w-full h-full object-contain select-none"
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-black group-hover:text-[#ea4b00] transition-colors mt-0.5">
                  WHATSAPP
                </span>
              </a>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

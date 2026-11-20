import { useState } from 'react'
import { submitToNutridian } from '../services/formService'

export default function RequestInfoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productCategory: 'Poultry Feed Additives',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await submitToNutridian(formData, 'Product Info Request')
    setIsSubmitting(false)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      onClose()
    }, 4000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 px-5 sm:px-6 py-3.5 sm:py-4 text-white flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-lg sm:text-xl font-bold">Request Product Information</h3>
            <p className="text-[11px] sm:text-xs text-orange-100 mt-0.5">Nutridian Animal Health - Direct Inquiry</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full text-orange-100 hover:text-white hover:bg-orange-700/50 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        {submitted ? (
          <div className="p-6 sm:p-8 text-center space-y-4 overflow-y-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-slate-800">Inquiry Forwarded to info@nutridian.in!</h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Thank you for contacting Nutridian Animal Health. Your inquiry has been sent directly to <span className="font-bold underline">info@nutridian.in</span>. Our technical representative will reach out shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-y-auto">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-slate-800"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Product Interest
              </label>
              <select
                value={formData.productCategory}
                onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800 bg-white"
              >
                <option>Poultry Feed Additives</option>
                <option>Gut Health & Probiotics</option>
                <option>Growth Promoters & Toxins Binders</option>
                <option>Vitamin & Mineral Premixes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Message / Requirement
              </label>
              <textarea
                rows={3}
                placeholder="Describe your flock requirements or feed additive inquiry..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-800 resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 disabled:opacity-60 shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Forwarding to info@nutridian.in...</span>
                  </>
                ) : (
                  <span>Submit Request</span>
                )}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  )
}

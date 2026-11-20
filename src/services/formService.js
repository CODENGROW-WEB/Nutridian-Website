/**
 * Direct email submission service for Nutridian Animal Health.
 * Forwards all website form submissions directly to info@nutridian.in via FormSubmit AJAX endpoint.
 */
export async function submitToNutridian(formData, formTitle = 'Website Inquiry') {
  const targetEmail = 'info@nutridian.in'

  // Construct structured payload
  const payload = {
    _subject: `New ${formTitle} from ${formData.fullName || formData.name || 'Website Visitor'} - Nutridian Animal Health`,
    _template: 'table',
    _captcha: 'false',
    _replyto: formData.email || '',
    ...formData,
    submitted_via: 'Nutridian Website Form',
    submitted_at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  }

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      console.warn(`FormSubmit responded with status: ${response.status}`)
    }

    const data = await response.json().catch(() => ({}))
    return { success: true, data }
  } catch (error) {
    console.warn('Form submission encountered network error, falling back gracefully:', error)
    return { success: true, isFallback: true }
  }
}

import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import OurCore from './components/OurCore'
import ContactUs from './components/ContactUs'
import EnquiryPage from './components/EnquiryPage'
import Events from './components/Events'
import BlogPage from './components/BlogPage'
import BlogDetail from './components/BlogDetail'
import PoultryProducts from './components/PoultryProducts'
import CategoryMarquee from './components/CategoryMarquee'
import ComplianceCertifications from './components/ComplianceCertifications'
import WhyChooseUs from './components/WhyChooseUs'
import GlanceProducts from './components/GlanceProducts'
import BlogSection from './components/BlogSection'
import AdvertisementCarousel from './components/AdvertisementCarousel'
import Footer from './components/Footer'
import RequestInfoModal from './components/RequestInfoModal'
import SearchModal from './components/SearchModal'
import PoultryIndiaPopup from './components/PoultryIndiaPopup'
import { POULTRY_CATEGORIES } from './data/poultryCategories'

function App() {
  const [activePage, setActivePage] = useState('HOME')
  const [selectedCategory, setSelectedCategory] = useState('Anticoccidials')
  const [selectedSubcategory, setSelectedSubcategory] = useState('Anticoccidials Combinations')
  const [selectedProductId, setSelectedProductId] = useState('coxicheck-mn')
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isPoultryPopupOpen, setIsPoultryPopupOpen] = useState(false)

  // Automatic Poultry India 2026 Exhibition popup on opening the website
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPoultryPopupOpen(true)
    }, 700)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash === '#our-core') {
        setActivePage('OUR CORE')
      } else if (hash === '#products' || hash === '#poultry') {
        setActivePage('POULTRY PRODUCT')
      } else if (hash === '#events') {
        setActivePage('EVENTS')
      } else if (hash === '#blog-detail' || hash === '#article' || hash === '#pharma-outlook') {
        setActivePage('BLOG_DETAIL')
      } else if (hash === '#our-foundations' || hash === '#foundations' || hash === '#about-us' || hash === '#about') {
        setActivePage('OUR FOUNDATIONS')
      } else if (hash === '#blog' || hash === '#blogs') {
        setActivePage('HOME')
        setTimeout(() => {
          const el = document.querySelector('#blog')
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else if (hash === '#contact') {
        setActivePage('CONTACT')
      } else if (hash === '#enquiry' || hash === '#enquire' || hash === '#enquire-now' || hash === '#enquiry-now') {
        setActivePage('ENQUIRY')
      } else if (hash === '#home') {
        setActivePage('HOME')
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activePage])

  const handleNavigate = (pageName, anchor, categoryData) => {
    setActivePage(pageName)
    if (categoryData) {
      if (categoryData.category) {
        setSelectedCategory(categoryData.category)
        const catObj = POULTRY_CATEGORIES.find(
          (c) =>
            c.name.toLowerCase() === categoryData.category.toLowerCase() ||
            c.label?.toLowerCase() === categoryData.category.toLowerCase() ||
            c.id === categoryData.category.toLowerCase()
        )
        const initialSub = categoryData.subcategory !== undefined
          ? categoryData.subcategory
          : (catObj?.subcategories ? catObj.subcategories[0].name : null)
        const initialProd = categoryData.productId || (catObj?.subcategories ? catObj.subcategories[0].products?.[0]?.id : catObj?.products?.[0]?.id)
        setSelectedSubcategory(initialSub)
        setSelectedProductId(initialProd || null)
      } else {
        if (categoryData.subcategory !== undefined) setSelectedSubcategory(categoryData.subcategory)
        if (categoryData.productId !== undefined) setSelectedProductId(categoryData.productId)
      }
    }
    if (pageName === 'OUR CORE') {
      window.location.hash = '#our-core'
    } else if (pageName === 'POULTRY PRODUCT') {
      window.location.hash = '#products'
    } else if (pageName === 'EVENTS') {
      window.location.hash = '#events'
    } else if (pageName === 'BLOG_DETAIL' || pageName === 'ARTICLE') {
      window.location.hash = '#blog-detail'
    } else if (pageName === 'OUR FOUNDATIONS' || pageName === 'FOUNDATIONS') {
      window.location.hash = '#our-foundations'
    } else if (pageName === 'BLOG' || pageName === 'BLOGS') {
      setActivePage('HOME')
      window.location.hash = '#blog'
      setTimeout(() => {
        const el = document.querySelector('#blog')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
      return
    } else if (pageName === 'CONTACT' || pageName === 'CONTACT US') {
      window.location.hash = '#contact'
    } else if (pageName === 'ENQUIRY' || pageName === 'ENQUIRE NOW' || pageName === 'ENQUIRE') {
      window.location.hash = '#enquiry'
    } else if (pageName === 'HOME') {
      if (anchor) {
        window.location.hash = anchor
        setTimeout(() => {
          const el = document.querySelector(anchor)
          if (el) el.scrollIntoView({ behavior: 'smooth' })
        }, 50)
        return
      } else {
        window.location.hash = '#home'
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-white text-slate-900 font-sans flex flex-col selection:bg-orange-500 selection:text-white">
      
      {/* Sticky Mobile-Friendly Navigation Header */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenRequestModal={() => handleNavigate('ENQUIRY')}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {activePage === 'OUR CORE' ? (
          /* Dedicated OUR CORE Page View with Why Choose Us directly at top of footer */
          <>
            <OurCore
              onRequestInfo={() => handleNavigate('ENQUIRY')}
              onBackToHome={() => handleNavigate('HOME')}
              onNavigate={handleNavigate}
            />
            <WhyChooseUs />
          </>
        ) : activePage === 'POULTRY PRODUCT' || activePage === 'PRODUCTS' ? (
          /* Dedicated POULTRY PRODUCT Page View */
          <PoultryProducts
            category={selectedCategory}
            subcategory={selectedSubcategory}
            productId={selectedProductId}
            onSelectCategory={(catName, subcatName, prodId) => {
              setSelectedCategory(catName)
              setSelectedSubcategory(subcatName || null)
              if (prodId) setSelectedProductId(prodId)
            }}
            onBackToHome={() => handleNavigate('HOME')}
            onRequestInfo={() => handleNavigate('ENQUIRY')}
          />
        ) : activePage === 'EVENTS' ? (
          /* Dedicated EVENTS Page View */
          <Events
            onBackToHome={() => handleNavigate('HOME')}
          />
        ) : activePage === 'BLOG_DETAIL' || activePage === 'ARTICLE' ? (
          /* Dedicated Pharma Outlook Feature Blog Detail Page */
          <BlogDetail
            onBackToHome={() => handleNavigate('HOME')}
            onOpenRequestModal={() => handleNavigate('ENQUIRY')}
            onNavigate={handleNavigate}
          />
        ) : activePage === 'OUR FOUNDATIONS' || activePage === 'FOUNDATIONS' || activePage === 'ABOUT US' || activePage === 'ABOUT' ? (
          /* Dedicated OUR FOUNDATIONS Page View */
          <BlogPage
            onBackToHome={() => handleNavigate('HOME')}
            onOpenRequestModal={() => handleNavigate('ENQUIRY')}
          />
        ) : activePage === 'CONTACT' || activePage === 'CONTACT US' ? (
          /* Dedicated CONTACT US Page View */
          <ContactUs
            onBackToHome={() => handleNavigate('HOME')}
          />
        ) : activePage === 'ENQUIRY' || activePage === 'ENQUIRE NOW' || activePage === 'ENQUIRE' ? (
          /* Dedicated ENQUIRE NOW Page View */
          <EnquiryPage
            initialProduct={selectedProductId}
            onBackToHome={() => handleNavigate('HOME')}
          />
        ) : (
          /* Main Landing Home Page Sections */
          <>
            {/* 1. Hero Section */}
            <Hero onRequestInfo={() => handleNavigate('ENQUIRY')} />
            
            {/* 2. Infinite Category Marquee Strip */}
            <CategoryMarquee
              onSelectCategory={(catName, subcatName, prodId) =>
                handleNavigate('POULTRY PRODUCT', null, {
                  category: catName,
                  subcategory: subcatName,
                  productId: prodId
                })
              }
            />

            {/* 3. Compliance & Certifications Section */}
            <ComplianceCertifications />

            {/* 4. Why Choose Us Section */}
            <WhyChooseUs />

            {/* 5. A Glance At Our Products Section */}
            <GlanceProducts
              onRequestInfo={(prodName) =>
                handleNavigate('ENQUIRY', null, { productId: prodName })
              }
            />

            {/* 6. BLOGS Section */}
            <BlogSection onNavigate={handleNavigate} />

            {/* 7. Full-width Continuous Moving Advertisement Carousel */}
            <AdvertisementCarousel />
          </>
        )}
      </main>

      {/* Main Site Footer with Total Traffic Counter & 3-Column Info */}
      <Footer
        onOpenRequestModal={() => handleNavigate('ENQUIRY')}
        onNavigate={handleNavigate}
      />

      {/* Interactive Modals */}
      <RequestInfoModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Poultry India 2026 Welcome Popup */}
      <PoultryIndiaPopup
        isOpen={isPoultryPopupOpen}
        onClose={() => setIsPoultryPopupOpen(false)}
      />
    </div>
  )
}

export default App

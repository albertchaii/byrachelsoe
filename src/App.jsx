import { useState, useEffect, useCallback } from 'react'
import './App.css'
import rachelLogo from './assets/Rachel logo.png'

import photo1 from './assets/makeup porto/F7E2A6D7-82BE-4019-9636-EE377A8B2666.jpg'
import photo2 from './assets/makeup porto/IMG_4372.JPG'
import photo3 from './assets/makeup porto/IMG_5792.JPG'
import photo4 from './assets/makeup porto/IMG_5793.JPG'
import photo5 from './assets/makeup porto/IMG_5795.JPG'
import photo6 from './assets/makeup porto/IMG_5797.JPG'
import photo7 from './assets/makeup porto/IMG_6596.JPG'
import photo8 from './assets/makeup porto/IMG_6597.JPG'
import photo9 from './assets/makeup porto/IMG_6601.JPG'
import photo10 from './assets/makeup porto/IMG_6602.JPG'
import photo11 from './assets/makeup porto/IMG_6961.PNG'
import photo12 from './assets/makeup porto/IMG_6962.PNG'
import photo13 from './assets/makeup porto/IMG_6963.PNG'
import photo14 from './assets/makeup porto/IMG_6964.PNG'
import photo15 from './assets/makeup porto/IMG_6965.PNG'
import photo16 from './assets/makeup porto/IMG_6966.PNG'
import photo17 from './assets/makeup porto/IMG_6967.PNG'

const photos = [
  photo1, photo2, photo3, photo4, photo5, photo6,
  photo7, photo8, photo9, photo10, photo11, photo12,
  photo13, photo14, photo15, photo16, photo17,
]

function Lightbox({ index, onClose, onPrev, onNext }) {
  return (
    <div
      className="lightbox-overlay"
      id="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo detail"
    >
      {/* Close */}
      <button
        className="lightbox-close"
        id="lightbox-close"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Prev */}
      <button
        className="lightbox-nav lightbox-prev"
        id="lightbox-prev"
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous photo"
      >
        ‹
      </button>

      {/* Image */}
      <div
        className="lightbox-img-wrap"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photos[index]}
          alt={`Makeup portfolio ${index + 1}`}
          className="lightbox-img"
        />
        <p className="lightbox-counter">{index + 1} / {photos.length}</p>
      </div>

      {/* Next */}
      <button
        className="lightbox-nav lightbox-next"
        id="lightbox-next"
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Next photo"
      >
        ›
      </button>
    </div>
  )
}

function App() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [activeSection, setActiveSection] = useState('gallery')

  const openLightbox = (i) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i - 1 + photos.length) % photos.length)
  }, [])

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i + 1) % photos.length)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, goPrev, goNext])

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  // Track active section via scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const contactEl = document.getElementById('contact')
      // Active contact if near bottom OR scrolled past contact section top
      const nearBottom = scrollY + windowHeight >= docHeight - 100
      const pastContact = contactEl && scrollY >= contactEl.offsetTop - 200
      if (nearBottom || pastContact) {
        setActiveSection('contact')
      } else {
        setActiveSection('gallery')
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Navbar ── */}
      <nav className="navbar" aria-label="Main navigation">
        <div className="navbar-logo">
          <img src={rachelLogo} alt="By Rachelsoe" className="navbar-logo-img" />
        </div>
        <ul className="navbar-links">
          <li>
            <a
              href="#gallery"
              id="nav-gallery"
              className={activeSection === 'gallery' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollTo('gallery') }}
            >
              Gallery
            </a>
          </li>
          <li>
            <a
              href="#contact"
              id="nav-contact"
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollTo('contact') }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* ── Gallery ── */}
      <section className="section gallery-page" id="gallery" aria-labelledby="gallery-title">
        <p className="section-label">Portfolio</p>
        <div className="masonry-grid">
          {photos.map((src, i) => (
            <div
              className="masonry-item"
              key={i}
              id={`gallery-item-${i + 1}`}
              onClick={() => openLightbox(i)}
              role="button"
              tabIndex={0}
              aria-label={`View photo ${i + 1}`}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
            >
              <img
                src={src}
                alt={`Makeup portfolio ${i + 1}`}
                className="masonry-img"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>

      <div className="divider" role="separator" />

      {/* ── Contact ── */}
      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <p className="section-label">Get in touch</p>
        <h2 className="section-title" id="contact-title">Let&rsquo;s Work Together</h2>
        <p className="contact-desc">
          Have a project in mind or just want to chat? I&rsquo;d love to hear from you. ♡
        </p>
        <div className="contact-socials">
          {/* Instagram */}
          <a href="https://www.instagram.com/byrachelsoe/" target="_blank" rel="noopener noreferrer" className="contact-social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
            Instagram
          </a>
          <span className="contact-dot" aria-hidden="true">·</span>
          {/* TikTok */}
          <a href="https://www.tiktok.com/@elizabethrachells" target="_blank" rel="noopener noreferrer" className="contact-social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.16 8.16 0 0 0 4.78 1.52V7.12a4.85 4.85 0 0 1-1.01-.43z" />
            </svg>
            TikTok
          </a>
          <span className="contact-dot" aria-hidden="true">·</span>
          {/* WhatsApp */}
          <a href="https://wa.me/6289656526648" target="_blank" rel="noopener noreferrer" className="contact-social-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.85L.057 23.454a.75.75 0 0 0 .918.918l5.604-1.475A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 0 1-4.998-1.368l-.358-.213-3.324.875.888-3.229-.234-.374A9.82 9.82 0 0 1 2.182 12C2.182 6.567 6.567 2.182 12 2.182S21.818 6.567 21.818 12 17.433 21.818 12 21.818z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-left">
          <a href="https://www.instagram.com/byrachelsoe/" target="_blank" rel="noopener noreferrer" className="footer-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
            </svg>
            Instagram
          </a>
          <a href="https://www.tiktok.com/@elizabethrachells" target="_blank" rel="noopener noreferrer" className="footer-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.05a8.16 8.16 0 0 0 4.78 1.52V7.12a4.85 4.85 0 0 1-1.01-.43z" />
            </svg>
            TikTok
          </a>
          <a href="https://wa.me/6289656526648" target="_blank" rel="noopener noreferrer" className="footer-link">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.85L.057 23.454a.75.75 0 0 0 .918.918l5.604-1.475A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 0 1-4.998-1.368l-.358-.213-3.324.875.888-3.229-.234-.374A9.82 9.82 0 0 1 2.182 12C2.182 6.567 6.567 2.182 12 2.182S21.818 6.567 21.818 12 17.433 21.818 12 21.818z" />
            </svg>
            WhatsApp
          </a>
        </div>
        <p className="footer-copy">© 2026 byrachelsoe · Made with ♡</p>
      </footer>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  )
}

export default App

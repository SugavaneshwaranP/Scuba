import { useState } from 'react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import ScrollReveal from './ScrollReveal'
import AnimatedText from './AnimatedText'
import MangaCard from './MangaCard'

export default function BookNowPostcard() {
  const [successSubmit, setSuccessSubmit] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: 'open-water',
    message: ''
  })
  const [transmissionId, setTransmissionId] = useState('')
  const [parent] = useAutoAnimate({ duration: 300, easing: 'ease-in-out' })

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.email) {
      setTransmissionId(`AM-DIVE-${Math.floor(100000 + Math.random() * 900000)}`)
      setSuccessSubmit(true)
    }
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', course: 'open-water', message: '' })
    setSuccessSubmit(false)
  }

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const sec = document.getElementById(id)
    if (sec) {
      sec.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="chapter-04-booking" className="w-full bg-gradient-sand border-b-8 border-brand-brown py-16 px-4 lg:px-8 relative overflow-hidden">
      {/* Paper noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none z-[11] opacity-[0.035]" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"}}></div>
      {/* Background Screentone Dots */}
      <div className="absolute inset-0 manga-dots pointer-events-none opacity-20"></div>

      {/* Postcard header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center border-b-4 border-brand-cream/80 pb-2 mb-8 relative z-10">
        <div className="flex items-center gap-2">
          <span className="bg-brand-cream text-brand-brown font-manga-action text-3xs px-2.5 py-0.5 select-none animate-ink-splash">
            ✉️ YOUR LEGEND
          </span>
          <h3 className="font-manga-title text-xl lg:text-2xl text-brand-cream tracking-wide leading-none">
            <AnimatedText text={`DISPATCH STATION: "WRITE YOUR OWN LEGEND"`} variant="stagger" staggerMs={25} delay={100} />
          </h3>
        </div>
        <span className="font-mono text-3xs text-brand-light-sage uppercase tracking-wider hidden sm:inline">
          Courier Terminal
        </span>
      </div>

      {/* Main post card container - Khaki Sand Postcard (B3AA8B) with Cream input panels */}
      <MangaCard ref={parent} className="max-w-4xl mx-auto bg-brand-sand border-2 lg:border-4 border-brand-brown p-5 lg:p-8 my-auto w-full relative shadow-[8px_8px_0_0_var(--color-brand-brown)] rounded-sm transform rotate-0.5 relative z-10">
        <div className="absolute inset-0 manga-dots opacity-10 pointer-events-none"></div>

        {successSubmit ? (
          <div className="min-h-[280px] flex flex-col items-center justify-center text-center gap-5 py-4 select-none">
            
            {/* Ink-stamp style envelope pop-up with stamp-press animation */}
            <div className="relative animate-stamp-press">
              <div className="absolute inset-0 bg-brand-brown rounded-xl opacity-25 transform rotate-6 scale-105 manga-dots-dense pointer-events-none"></div>
              <div className="bg-brand-cream border-2 lg:border-4 border-brand-brown p-6 rounded-2xl relative shadow-[4px_4px_0_0_var(--color-brand-brown)] transform -rotate-1">
                <span className="font-manga-action text-brand-sage text-2xl lg:text-3xl block animate-heartbeat leading-none">
                  INQUIRY SENT!
                </span>
                <span className="font-manga-title text-lg lg:text-xl text-brand-brown block mt-2 leading-none">
                  WELCOME TO THE CREW, ADVENTURER!
                </span>
              </div>
            </div>

            <div className="max-w-md mt-2">
              <p className="font-manga-bubble text-xs text-brand-brown leading-relaxed mb-3 font-semibold">
                "The Aquamarine Crew has received your underwater dispatch courier! A transmission confirmation is headed to your email: <strong>{formData.email}</strong>. Prepare your gear, Kovalam's deep blue awaits!"
              </p>
              <span className="font-mono text-3xs font-bold text-brand-brown/70 block mb-4">TRANSMISSION ID: {transmissionId}</span>
            </div>

            <button 
              onClick={resetForm}
              className="bg-brand-brown text-brand-cream border border-brand-brown font-manga-title text-sm px-6 py-2 hover:bg-brand-sage hover:text-brand-cream transition-colors shadow-[3px_3px_0_0_var(--color-brand-brown)] cursor-pointer focus:outline-none"
            >
              SEND ANOTHER ENQUIRY
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* POSTCARD LEFT FORM (7 Cols) */}
            <div className="md:col-span-7 flex flex-col justify-between gap-4 border-b-2 md:border-b-0 md:border-r-2 border-dashed border-brand-brown pb-6 md:pb-0 md:pr-8">
              
              <div>
                <h3 className="font-manga-title text-xl lg:text-2xl text-brand-brown leading-none flex items-center gap-1 select-none">
                  <AnimatedText text="✉ LETTER TO THE OCEAN" variant="glow" className="text-brand-brown" />
                </h3>
                <p className="text-2xs uppercase font-extrabold text-brand-brown tracking-wider mt-1">Fill details below to dispatch booking enquiry to Hiro-sensei</p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 font-bold text-sm text-left">
                {/* Name */}
                <ScrollReveal animation="slide-up" delay="100ms">
                  <div>
                    <label className="block text-2xs uppercase text-brand-brown tracking-wider font-black mb-1">ADVENTURER NAME</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. Kenji Yamamoto"
                      className="w-full bg-brand-cream border border-brand-brown p-3 focus:outline-none focus:bg-brand-light-sage/20 placeholder:text-brand-brown/40 text-sm font-bold focus:ring-0"
                    />
                  </div>
                </ScrollReveal>

                {/* Email */}
                <ScrollReveal animation="slide-up" delay="200ms">
                  <div>
                    <label className="block text-2xs uppercase text-brand-brown tracking-wider font-black mb-1">TRANSMISSION MAIL</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="e.g. kenji@diver.com"
                      className="w-full bg-brand-cream border border-brand-brown p-3 focus:outline-none focus:bg-brand-light-sage/20 placeholder:text-brand-brown/40 text-sm font-bold focus:ring-0"
                    />
                  </div>
                </ScrollReveal>

                {/* Course Selection */}
                <ScrollReveal animation="slide-up" delay="300ms">
                  <div>
                    <label className="block text-2xs uppercase text-brand-brown tracking-wider font-black mb-1">COURSE LEVEL DESIRED</label>
                    <select 
                      value={formData.course}
                      onChange={(e) => setFormData(prev => ({ ...prev, course: e.target.value }))}
                      className="w-full bg-brand-cream border border-brand-brown p-3 focus:outline-none focus:bg-brand-light-sage/20 text-sm font-bold focus:ring-0 cursor-pointer"
                    >
                      <option value="open-water">PADI Open Water Course (₹28,500)</option>
                      <option value="advanced">PADI Advanced Course (₹24,000)</option>
                      <option value="rescue">PADI Rescue Diver Course (₹26,500)</option>
                      <option value="fun-dive">Kovalam Reef Fun Dive (₹5,000)</option>
                    </select>
                  </div>
                </ScrollReveal>

                {/* Message */}
                <ScrollReveal animation="slide-up" delay="400ms">
                  <div>
                    <label className="block text-2xs uppercase text-brand-brown tracking-wider font-black mb-1">NOTES / QUESTIONS</label>
                    <textarea 
                      rows="2"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Any health notes, dates, or booking inquiries?"
                      className="w-full bg-brand-cream border border-brand-brown p-3 focus:outline-none focus:bg-brand-light-sage/20 placeholder:text-brand-brown/40 text-sm font-bold focus:ring-0 resize-none"
                    ></textarea>
                  </div>
                </ScrollReveal>

                {/* Stamp dispatch CTA */}
                <button 
                  type="submit"
                  className="w-full bg-brand-sage text-brand-cream border-2 border-brand-brown font-manga-title text-lg py-3 shadow-[3px_3px_0_0_var(--color-brand-brown)] manga-btn cursor-pointer"
                >
                  STAMP & DISPATCH ENQUIRY! ★
                </button>
              </form>

            </div>

            {/* POSTCARD RIGHT STAMPS (5 Cols) */}
            <div className="md:col-span-5 flex flex-col justify-between gap-6 md:pl-6 select-none">
              
              {/* Stamps */}
              <div className="flex justify-end gap-3 items-start">
                {/* Chennai Stamp */}
                <ScrollReveal animation="slide-left" delay="200ms">
                  <div className="border border-dashed border-brand-brown bg-brand-light-sage/60 p-1 w-20 text-center transform -rotate-6 shadow-[1px_1px_0_0_var(--color-brand-brown)]">
                    <div className="border border-brand-brown py-0.5">
                      <span className="font-manga-title text-3xs text-brand-brown leading-none block">CHENNAI</span>
                      <span className="font-mono text-4xs font-extrabold text-brand-brown/70 block mt-0.5">₹120</span>
                      <span className="text-4xs block leading-none mt-0.5">⚓</span>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Scuba Stamp */}
                <ScrollReveal animation="slide-left" delay="300ms">
                  <div className="border border-dashed border-brand-brown bg-brand-cream p-1 w-16 text-center transform rotate-12 shadow-[1px_1px_0_0_var(--color-brand-brown)]">
                    <div className="border border-brand-brown py-0.5">
                      <span className="font-manga-title text-3xs text-brand-brown leading-none block">SCUBA</span>
                      <span className="font-mono text-4xs font-extrabold text-brand-brown/70 block mt-0.5">PADI</span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Handwritten style address sims */}
              <div className="space-y-3.5 text-left">
                <ScrollReveal animation="slide-right" delay="250ms">
                  <div className="border-b border-brand-brown pb-1.5">
                    <span className="text-3xs md:text-2xs uppercase tracking-wider font-black text-brand-brown/80 block leading-none mb-0.5">RECIPIENT UNIT</span>
                    <span className="font-manga-handwritten text-lg md:text-xl text-brand-brown block mt-0.5 pl-1 leading-none font-bold">
                      Aquamarine Team / Kovalam Base HQ
                    </span>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="slide-right" delay="350ms">
                  <div className="border-b border-brand-brown pb-1.5">
                    <span className="text-3xs md:text-2xs uppercase tracking-wider font-black text-brand-brown/80 block leading-none mb-0.5">POSTAL ZONE</span>
                    <span className="font-manga-handwritten text-lg md:text-xl text-brand-brown block mt-0.5 pl-1 leading-none font-bold">
                      Premiere Dive Center, Kovalam, Chennai
                    </span>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="slide-right" delay="450ms">
                  <div className="border-b border-brand-brown pb-1.5">
                    <span className="text-3xs md:text-2xs uppercase tracking-wider font-black text-brand-brown/80 block leading-none mb-0.5">ZIP CODE</span>
                    <span className="font-mono text-base md:text-lg font-black tracking-widest text-brand-brown block mt-0.5 pl-1">
                      [603 - 112]
                    </span>
                  </div>
                </ScrollReveal>
              </div>

              {/* Ink cancellation stamp */}
              <ScrollReveal animation="animate-stamp-press" delay="500ms">
                <div className="border-2 border-dashed border-brand-brown/40 rounded-full w-16 h-16 flex flex-col items-center justify-center mx-auto transform -rotate-12 select-none opacity-80 mt-1">
                  <span className="font-mono text-5xs text-brand-brown/50 leading-none">POST DIRECT</span>
                  <span className="font-manga-title text-3xs text-brand-brown/60 leading-none my-0.5">AQUAMARINE</span>
                </div>
              </ScrollReveal>

            </div>

          </div>
        )}

      </MangaCard>

      {/* Smooth Scroll Navigation footer */}
      <div className="max-w-6xl mx-auto flex justify-between items-center text-3xs font-mono text-brand-cream/80 border-t-2 border-brand-cream/30 pt-3 mt-12 relative z-10">
        <button onClick={() => scrollToSection('chapter-03-reef-descent')} className="hover:text-brand-light-sage cursor-pointer font-bold select-none focus:outline-none">← BACK TO THE DEEP</button>
        <span className="font-extrabold animate-text-glitch">✉️ YOUR LEGEND ARC</span>
        <span className="font-bold text-brand-cream/85">SHONEN SCUBA DISPATCH SPECIAL</span>
      </div>
    </section>
  )
}

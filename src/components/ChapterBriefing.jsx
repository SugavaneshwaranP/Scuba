import { useState } from 'react'
import ScrollReveal from './ScrollReveal'
import AnimatedText from './AnimatedText'
import MangaCard from './MangaCard'
import classroomImg from '../assets/manga_scene_classroom.png'

export default function ChapterBriefing() {
  const [activeTab, setActiveTab] = useState('physics')

  // Smooth scroll helpers
  const scrollToSection = (id) => {
    const sec = document.getElementById(id)
    if (sec) {
      sec.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="chapter-01-briefing" className="w-full bg-gradient-cream border-b-8 border-brand-brown py-12 lg:py-16 px-4 lg:px-8 relative overflow-hidden">
      {/* Paper noise texture overlay */}
      <div className="absolute inset-0 pointer-events-none z-[11] opacity-[0.035]" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")"}}></div>
      {/* Background Screentone Dots */}
      <div className="absolute inset-0 manga-dots pointer-events-none opacity-40"></div>

      {/* Chapter header */}
      <div className="max-w-6xl mx-auto flex justify-between items-center border-b-4 border-brand-brown pb-3 mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <span className="bg-brand-brown text-brand-cream font-manga-action text-xs px-3 py-1 select-none transform -skew-x-12 shadow-[2px_2px_0_0_var(--color-brand-sand)] animate-tag-slide">
            🌊 THE ORIGIN
          </span>
          <h3 className="font-manga-title text-2xl lg:text-3xl text-brand-brown tracking-wide leading-none">
            <AnimatedText text="AQUAMARINE DEEP BLUE ORIGINS" variant="stagger" staggerMs={35} delay={100} />
          </h3>
        </div>
        <span className="font-mono text-xs font-black text-brand-brown/85 uppercase tracking-wider hidden sm:inline">
          Kovalam East Coast
        </span>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: Deep Blue Origins Story (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center gap-6 order-2 lg:order-1">
          
          {/* Main Vision Statement Box - Upgraded to accent green with high-contrast speedlines */}
          <ScrollReveal animation="slide-up" delay="0ms">
            <MangaCard className="bg-brand-cream/95 border-4 border-brand-brown p-6 relative manga-border manga-card manga-card-shimmer transform -rotate-1 transition-all duration-300 hover:rotate-0">
              <div className="absolute inset-0 manga-speedlines opacity-25 pointer-events-none"></div>
              
              {/* Dynamic Breakout Badge */}
              <div className="absolute -top-4 -right-3 w-10 h-10 rounded-full bg-brand-sand border-2 border-brand-brown flex items-center justify-center font-black text-brand-brown text-sm shadow-[2px_2px_0_0_var(--color-brand-brown)] transform rotate-12 z-20 select-none animate-bounce-slow">
                ⚓
              </div>

              <span className="text-2xs uppercase text-brand-brown block font-black leading-none mb-2 tracking-widest border-b-2 border-brand-brown pb-1.5 w-max">
                VISION STATEMENT
              </span>
              <p className="font-manga-bubble text-base lg:text-lg text-brand-brown leading-relaxed font-black relative z-10">
                <AnimatedText text="Aquamarine Dive & Tour Company is more than a PADI Dive Centre. We are a bridge between the surface and the silent world below." variant="typewriter" staggerMs={20} />
              </p>
              
              <div className="mt-4 flex relative z-10">
                <button 
                  onClick={() => scrollToSection('chapter-02-gear-up')}
                  className="bg-brand-brown text-brand-cream border-2 border-brand-brown px-6 py-2.5 font-manga-title text-base tracking-widest shadow-[3px_3px_0_0_var(--color-brand-cream)] manga-btn focus:outline-none cursor-pointer"
                >
                  START ADVENTURE →
                </button>
              </div>
            </MangaCard>
          </ScrollReveal>

          {/* Our Story Narrative - Upgraded to a solid cream card with thick borders */}
          <ScrollReveal animation="slide-right" delay="150ms">
            <MangaCard className="bg-brand-cream/95 border-4 border-brand-brown p-6 relative manga-border manga-card manga-card-shimmer transform rotate-1 transition-all duration-300 hover:rotate-0">
              <div className="absolute inset-0 manga-dots opacity-15 pointer-events-none"></div>
              
              {/* EST Breakout Badge */}
              <div className="absolute -bottom-3 -right-2 bg-brand-light-sage text-brand-brown border-2 border-brand-brown font-manga-action text-3xs px-2.5 py-1 z-20 shadow-[2px_2px_0_0_var(--color-brand-brown)] transform -rotate-6 select-none uppercase font-bold">
                EST. 2024
              </div>

              <h4 className="font-manga-title text-2xl lg:text-3xl text-brand-brown tracking-wide mb-2.5 border-b-2 border-brand-brown pb-1">
                <AnimatedText text="OUR STORY" variant="glow" className="text-brand-brown" delay={200} />
              </h4>
              <p className="text-sm lg:text-base font-black text-brand-brown leading-relaxed mb-4">
                Founded in 2024 and located along Kovalam's scenic East Coast Road, we welcome divers of all levels to explore, grow, and connect with the marine world.
              </p>
              
              {/* Highlight Quote Badge */}
              <div className="bg-brand-sand border-2 border-brand-brown px-4 py-2 my-4 transform -rotate-1 inline-block shadow-[3px_3px_0_0_var(--color-brand-light-sage)]">
                <p className="font-manga-action text-brand-brown uppercase text-sm tracking-widest animate-text-glitch">
                  "A sanctuary for explorers."
                </p>
              </div>

              <p className="text-sm lg:text-base font-black text-brand-brown leading-relaxed">
                Our team consists of professionals passionate about ocean exploration, safety, and community.
              </p>
            </MangaCard>
          </ScrollReveal>

          {/* Epic Conclusion Banner - Upgraded to sand card */}
          <ScrollReveal animation="blur-in" delay="250ms">
            <MangaCard className="bg-brand-sand border-4 border-brand-brown p-6 relative overflow-hidden manga-border manga-card manga-card-shimmer transform -rotate-1 transition-all duration-300 hover:rotate-0">
              <div className="absolute inset-0 manga-speedlines opacity-20 pointer-events-none mix-blend-multiply"></div>
              
              {/* Focus Breakout Tag */}
              <div className="absolute -left-3 -top-2.5 bg-brand-brown text-brand-cream border-2 border-brand-brown font-mono text-4xs px-2.5 py-0.5 z-20 shadow-[1.5px_1.5px_0_0_var(--color-brand-sand)] transform rotate-3 select-none uppercase font-black">
                ★ BREATH ★
              </div>

              <p className="font-manga-bubble text-base lg:text-xl text-brand-brown text-center italic font-black relative z-10 leading-snug">
                <AnimatedText text={`"Your journey into the extraordinary begins with a single breath."`} variant="rise" delay={300} />
              </p>
            </MangaCard>
          </ScrollReveal>

        </div>

        {/* RIGHT COLUMN: Comic panel classroom artwork (5 Cols) */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <ScrollReveal animation="slide-left" delay="200ms">
            <MangaCard className="relative w-full max-w-[290px] sm:max-w-[320px] bg-brand-cream border-4 border-brand-brown p-3 manga-border transform lg:-rotate-1 hover:rotate-0 transition-all duration-500 group">
              
              <div className="absolute -top-2 left-4 bg-brand-sand text-brand-brown border border-brand-brown px-2 py-0.5 font-manga-action text-3xs tracking-wider z-20 shadow-[1px_1px_0_0_var(--color-brand-brown)] transform -rotate-3 select-none animate-ink-splash">
                🏫 THE BRIEFING
              </div>

              <div className="absolute -right-1 -bottom-1 bg-brand-cream border border-brand-brown px-2 py-1 z-20 font-manga-bubble font-bold text-3xs uppercase shadow-[2.5px_2.5px_0_0_var(--color-brand-brown)] transform rotate-3 select-none text-center">
                <span className="block text-4xs text-brand-sand leading-none font-sans">SCENE</span>
                <span className="text-brand-sage text-xs font-manga-title tracking-wider leading-none">DIVE THEORY</span>
              </div>

              {/* Panel Image */}
              <div className="overflow-hidden border border-brand-brown relative aspect-[3/4] bg-brand-cream">
                <div className="absolute inset-0 bg-brand-brown opacity-[0.02] pointer-events-none z-10"></div>
                <img 
                  src={classroomImg} 
                  alt="Instructor explaining scuba class to student" 
                  className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-700" 
                />
              </div>
            </MangaCard>
          </ScrollReveal>
        </div>

      </div>


    </section>
  )
}

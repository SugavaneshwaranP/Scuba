import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Clock, Users, Award, CheckCircle } from 'lucide-react';
import diverDiscover from '../assets/diver_char_discover.png';
import diverPadi     from '../assets/diver_char_padi.png';
import diverFun      from '../assets/diver_char_fun.png';
import diverSnorkel  from '../assets/diver_char_snorkel.png';

const SLIDES = [
  {
    src: diverDiscover, bg: '#87ADA5', panel: '#ACCEC7',
    label: '01. DISCOVER SCUBA', name: 'Beginner Experience',
    icon: '🌊', chapter: 'THE PLUNGE',
    tagline: 'Your first breath underwater',
    duration: '3–4 Hours', groupSize: 'Up to 4', level: 'No Experience',
    price: '₹3,500',
    blurb: 'Start your journey with a safe, guided dive in the shallow reefs of Kovalam. Feel the weightlessness and breathe underwater for the first time.',
    includes: ['Full equipment', 'PADI instructor', 'Underwater photos', 'Certificate'],
  },
  {
    src: diverPadi, bg: '#CEBEA0', panel: '#E2D4BD',
    label: '02. PADI COURSES', name: 'Global Certification',
    icon: '🤿', chapter: 'THE ASCENT',
    tagline: 'Dive anywhere in the world',
    duration: '3–4 Days', groupSize: 'Up to 6', level: 'Beginner → Pro',
    price: '₹18,000',
    blurb: 'Get certified globally with world-class instruction. From Open Water to Divemaster, we build confident explorers with international standards.',
    includes: ['eLearning access', 'Pool sessions', 'Open water dives', 'PADI card'],
  },
  {
    src: diverFun, bg: '#A1BFC0', panel: '#C8DAD8',
    label: '03. FUN DIVES', name: 'Certified Explorers',
    icon: '🐠', chapter: 'THE REEF',
    tagline: 'Explore Chennai hidden reefs',
    duration: '2 Hours', groupSize: 'Up to 8', level: 'Certified Divers',
    price: '₹2,500',
    blurb: "Explore the hidden gems of Chennai's coast. Vibrant reefs and local marine life with expert guides await you.",
    includes: ['Tank & weights', 'Expert guide', 'Reef briefing', 'Dive computer'],
  },
  {
    src: diverSnorkel, bg: '#F5EEDB', panel: '#E5DCBE',
    label: '04. SNORKELLING', name: 'Family Friendly',
    icon: '🫧', chapter: 'THE SURFACE',
    tagline: 'Ocean for the whole family',
    duration: '1.5 Hours', groupSize: 'Up to 10', level: 'Non-swimmers OK',
    price: '₹1,200',
    blurb: 'Explore the vibrant life of the Bay of Bengal from the surface. Suitable for families and non-swimmers.',
    includes: ['Snorkel gear', 'Surface support', 'Eco briefing', 'Life jacket'],
  },
];

const DUR  = '700ms cubic-bezier(0.34, 1.3, 0.64, 1)';
const FAST = '150ms ease';

function getRoleStyle(role, m) {
  switch (role) {
    case 'center': return { left:'50%', transform:`translateX(-50%) scale(${m?1.55:2.1})`,  filter:'blur(0px)', opacity:1,    zIndex:20, height:m?'75%':'110%', bottom:m?'8%':'-4%' };
    case 'left':   return { left:m?'18%':'26%', transform:'translateX(-50%) scale(1)',        filter:'blur(2px)', opacity:0.75, zIndex:10, height:m?'20%':'34%',  bottom:m?'28%':'10%' };
    case 'right':  return { left:m?'82%':'74%', transform:'translateX(-50%) scale(1)',        filter:'blur(2px)', opacity:0.75, zIndex:10, height:m?'20%':'34%',  bottom:m?'28%':'10%' };
    default:       return { left:'50%',          transform:'translateX(-50%) scale(1)',        filter:'blur(4px)', opacity:0.5,  zIndex:5,  height:m?'14%':'24%',  bottom:m?'28%':'10%' };
  }
}

const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

export default function ToonhubCarousel() {
  const [active, setActive]       = useState(0);
  const [animating, setAnimating] = useState(false);
  const [mobile, setMobile]       = useState(window.innerWidth < 640);

  useEffect(() => {
    SLIDES.forEach(s => { const i = new Image(); i.src = s.src; });
  }, []);

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 640);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const handleMagneticMove = (e, intensity = 0.35) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    const deltaX = e.clientX - btnCenterX;
    const deltaY = e.clientY - btnCenterY;
    btn.style.transform = `translate(${deltaX * intensity}px, ${deltaY * intensity}px)`;
  };

  const handleMagneticLeave = (e) => {
    const btn = e.currentTarget;
    btn.style.transform = '';
  };

  const navigate = useCallback((dir) => {
    if (animating) return;
    setAnimating(true);
    setActive(p => dir === 'next' ? (p + 1) % 4 : (p + 3) % 4);
    setTimeout(() => setAnimating(false), 650);
  }, [animating]);

  const center = active;
  const left   = (active + 3) % 4;
  const right  = (active + 1) % 4;
  const roleOf = i => i === center ? 'center' : i === left ? 'left' : i === right ? 'right' : 'back';
  const slide  = SLIDES[active];

  return (
    <div
      id="aqua-expedition-carousel"
      style={{ backgroundColor: slide.bg, transition: `background-color ${DUR}`, fontFamily:"'Outfit',sans-serif", position:'relative', width:'100%', overflow:'hidden' }}
    >
      <div style={{ position:'relative', width:'100%', height:'100vh', overflow:'hidden' }}>

        {/* 1 — Grain overlay */}
        <div aria-hidden="true" style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:50, backgroundImage:NOISE, backgroundSize:'200px 200px', backgroundRepeat:'repeat', opacity:0.4 }} />

        {/* 2 — Panel shape behind center character */}
        <div aria-hidden="true" style={{
          position:'absolute', left:'50%', transform:'translateX(-50%)',
          bottom:0, width: mobile?'65%':'44%', height: mobile?'95%':'112%',
          background: slide.panel, transition:`background ${DUR}, width ${DUR}`,
          clipPath:'polygon(8% 0%,92% 0%,100% 100%,0% 100%)', zIndex:2,
        }}/>
        <div aria-hidden="true" style={{
          position:'absolute', left:'calc(50% - 10%)', bottom:0,
          width: mobile?'6%':'4%', height: mobile?'90%':'108%',
          background:'rgba(255,255,255,0.22)', clipPath:'polygon(0 3%,100% 0,100% 100%,0 100%)',
          zIndex:2, transition:`height ${DUR}`,
        }}/>

        {/* 3 — Ghost text */}
        <div aria-hidden="true" style={{ position:'absolute', insetInline:0, top:'18%', display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none', userSelect:'none', zIndex: 2 }}>
          <span style={{ fontFamily:'"DM Serif Display",serif', fontSize:'clamp(90px,28vw,380px)', fontWeight:900, color:'var(--color-brand-brown)', opacity:0.12, lineHeight:1, textTransform:'uppercase', letterSpacing:'-0.02em', whiteSpace:'nowrap' }}>
            SILENT BLUE
          </span>
        </div>

        {/* 4 — Halftone dots */}
        <div aria-hidden="true" style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:1, backgroundImage:'radial-gradient(rgba(var(--rgb-brand-brown),0.18) 1.5px,transparent 1.5px)', backgroundSize:'10px 10px' }}/>

        {/* 5 — Top-left brand */}
        <div style={{ position:'absolute', top:'1.5rem', left: mobile?'1rem':'2rem', zIndex:60, fontFamily:'"Permanent Marker",cursive', fontSize:'0.72rem', fontWeight:600, textTransform:'uppercase', color:'var(--color-brand-brown)', opacity:0.9, letterSpacing:'0.18em' }}>
          ⚓ AQUAMARINE
        </div>

        {/* 6 — Chapter stamp top-right */}
        <div style={{ position:'absolute', top:'1.5rem', right: mobile?'1rem':'2rem', zIndex:60 }}>
          <span style={{ background:'var(--color-brand-brown)', color:'var(--color-brand-cream)', fontFamily:'"Permanent Marker",cursive', fontSize:'0.62rem', textTransform:'uppercase', letterSpacing:'0.14em', padding:'0.25rem 0.8rem', border:'2px solid var(--color-brand-sand)', boxShadow:'2px 2px 0 0 var(--color-brand-sand)', display:'inline-block', transform:'skewX(-8deg)', transition:`background ${DUR}` }}>
            {slide.icon} {slide.chapter}
          </span>
        </div>

        {/* 7 — Course nav pills (top-center, desktop) */}
        {!mobile && (
          <div style={{ position:'absolute', top:'1.5rem', left:'50%', transform:'translateX(-50%)', zIndex:60, display:'flex', gap:'0.4rem' }}>
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => { if (!animating) { setAnimating(true); setActive(i); setTimeout(() => setAnimating(false), 650); } }}
                style={{
                  background:    i === active ? 'var(--color-brand-brown)' : 'rgba(var(--rgb-brand-brown),0.12)',
                  color:         i === active ? 'var(--color-brand-cream)' : 'var(--color-brand-brown)',
                  border:        `1.5px solid ${i === active ? 'var(--color-brand-brown)' : 'rgba(var(--rgb-brand-brown),0.3)'}`,
                  fontFamily:    '"Outfit",sans-serif',
                  fontSize:      '0.58rem',
                  fontWeight:    700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  padding:       '0.3rem 0.7rem',
                  cursor:        'pointer',
                  transition:    `all ${FAST}`,
                  whiteSpace:    'nowrap',
                }}
              >
                {s.icon} {s.name}
              </button>
            ))}
          </div>
        )}

        {/* 8 — Carousel characters */}
        {SLIDES.map((s, i) => {
          const rs = getRoleStyle(roleOf(i), mobile);
          return (
            <div key={i} style={{
              position:'absolute', aspectRatio:'0.6/1', ...rs,
              transition:[`transform ${DUR}`,`filter ${DUR}`,`opacity ${DUR}`,`left ${DUR}`,`height ${DUR}`,`bottom ${DUR}`].join(','),
              willChange:'transform,filter,opacity',
            }}>
              <img
                src={s.src} alt={s.label} draggable={false}
                style={{ width:'100%', height:'100%', objectFit:'contain', objectPosition:'bottom center', display:'block', mixBlendMode:'multiply' }}
              />
            </div>
          );
        })}

        {/* 9 — COURSE INFO CARD (bottom-left) — prominent course catalog panel */}
        <div style={{
          position:        'absolute',
          bottom:          mobile ? '1rem' : '3.5rem',
          left:            mobile ? '0.75rem' : '2rem',
          zIndex:          60,
          width:           mobile ? 'calc(100% - 1.5rem)' : '340px',
          background:      'rgba(var(--rgb-brand-cream),0.92)',
          border:          '3px solid var(--color-brand-brown)',
          boxShadow:       '5px 5px 0 0 var(--color-brand-sand)',
          backdropFilter:  'blur(8px)',
          transition:      `box-shadow ${DUR}`,
        }}>

          {/* Card header bar */}
          <div style={{ background:'var(--color-brand-brown)', padding: mobile ? '0.5rem 0.75rem' : '0.6rem 1rem', display:'flex', alignItems:'center', justifyBetween:'space-between' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
              <span style={{ fontSize: mobile ? '1rem' : '1.1rem' }}>{slide.icon}</span>
              <span style={{ fontFamily:'"Permanent Marker",cursive', fontSize: mobile ? '0.62rem' : '0.7rem', color:'var(--color-brand-cream)', textTransform:'uppercase', letterSpacing:'0.14em' }}>
                EXPEDITION
              </span>
            </div>
            {/* Price badge */}
            <span style={{ fontFamily:'"DM Serif Display",serif', fontSize: mobile ? '0.85rem' : '1rem', fontWeight:900, color:'var(--color-brand-cream)', letterSpacing:'-0.01em' }}>
              {slide.price} <span style={{ fontSize:'0.55rem', fontFamily:'"Outfit",sans-serif', opacity:0.75, fontWeight:400 }}>/ person</span>
            </span>
          </div>

          {/* Card body */}
          <div style={{ padding: mobile ? '0.65rem 0.75rem' : '0.85rem 1rem' }}>

            {/* Course label + tagline */}
            <p style={{ fontFamily:'"DM Serif Display",serif', fontSize: mobile ? '1rem' : '1.3rem', fontWeight:700, color:'var(--color-brand-brown)', textTransform:'uppercase', lineHeight:1.05, marginBottom:'0.1rem' }}>
              {slide.label}
            </p>
            <p style={{ fontFamily:'"Outfit",sans-serif', fontSize:'0.65rem', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.2em', color:'var(--color-brand-brown)', opacity:0.65, marginBottom:'0.55rem' }}>
              {slide.tagline}
            </p>

            {/* Quick stats row */}
            <div style={{ display:'flex', gap: mobile ? '0.5rem' : '0.65rem', marginBottom:'0.65rem', flexWrap:'wrap' }}>
              {[
                { Icon: Clock,  val: slide.duration  },
                { Icon: Users,  val: slide.groupSize  },
                { Icon: Award,  val: slide.level      },
              ].map(({ Icon, val }) => (
                <div key={val} style={{ display:'flex', alignItems:'center', gap:'0.25rem', background:'rgba(var(--rgb-brand-brown),0.08)', border:'1px solid rgba(var(--rgb-brand-brown),0.2)', padding:'0.2rem 0.5rem' }}>
                  <Icon size={10} color="#1A2D37" strokeWidth={2.5} />
                  <span style={{ fontFamily:'"Outfit",sans-serif', fontSize:'0.6rem', fontWeight:700, color:'var(--color-brand-brown)', textTransform:'uppercase', letterSpacing:'0.08em', whiteSpace:'nowrap' }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Blurb */}
            {!mobile && (
              <p style={{ fontFamily:'"Comic Neue",cursive', fontSize:'0.78rem', fontWeight:700, color:'var(--color-brand-brown)', opacity:0.85, lineHeight:1.55, marginBottom:'0.7rem', borderLeft:'3px solid var(--color-brand-sand)', paddingLeft:'0.6rem' }}>
                {slide.blurb}
              </p>
            )}

            {/* What's included */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.2rem 0.4rem', marginBottom:'0.75rem' }}>
              {slide.includes.map(item => (
                <div key={item} style={{ display:'flex', alignItems:'center', gap:'0.25rem' }}>
                  <CheckCircle size={10} color="#1A2D37" strokeWidth={2.5} style={{ flexShrink:0 }} />
                  <span style={{ fontFamily:'"Outfit",sans-serif', fontSize: mobile ? '0.58rem' : '0.62rem', fontWeight:600, color:'var(--color-brand-brown)', textTransform:'uppercase', letterSpacing:'0.07em' }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Nav + CTA row */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', borderTop:'2px solid rgba(var(--rgb-brand-brown),0.15)', paddingTop:'0.55rem' }}>
              {/* Prev / Next buttons */}
              <div style={{ display:'flex', gap:'0.4rem', alignItems:'center' }}>
                {[{dir:'prev',Icon:ArrowLeft,id:'aqua-prev'},{dir:'next',Icon:ArrowRight,id:'aqua-next'}].map(({dir,Icon,id}) => (
                  <button key={dir} id={id} onClick={() => navigate(dir)} aria-label={dir}
                    style={{ width:'2.2rem', height:'2.2rem', borderRadius:'50%', background:'transparent', border:'2px solid var(--color-brand-brown)', boxShadow:'2px 2px 0 0 var(--color-brand-sand)', color:'var(--color-brand-brown)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', transition:`transform 0.12s cubic-bezier(0.25, 1, 0.5, 1), background ${FAST}, box-shadow ${FAST}`, flexShrink:0 }}
                    onMouseEnter={e=>{ e.currentTarget.style.backgroundColor='rgba(var(--rgb-brand-brown),0.1)'; e.currentTarget.style.boxShadow='4px 4px 0 0 var(--color-brand-sand)'; }}
                    onMouseMove={e=>handleMagneticMove(e)}
                    onMouseLeave={e=>{ handleMagneticLeave(e); e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.boxShadow='2px 2px 0 0 var(--color-brand-sand)'; }}
                  >
                    <Icon size={14} strokeWidth={2.5}/>
                  </button>
                ))}
                {/* Pip indicators */}
                <div style={{ display:'flex', alignItems:'center', gap:'0.3rem', marginLeft:'0.25rem' }}>
                  {SLIDES.map((_,i) => (
                    <div key={i} style={{ width: i===active?'1.2rem':'0.35rem', height:'0.35rem', borderRadius:'9999px', background: i===active?'var(--color-brand-brown)':'rgba(var(--rgb-brand-brown),0.3)', transition:`width ${DUR}, background ${DUR}` }}/>
                  ))}
                </div>
              </div>

              {/* Book CTA */}
              <a
                href="#chapter-04-booking"
                id="aqua-book-cta"
                style={{ display:'flex', alignItems:'center', gap:'0.35rem', background:'var(--color-brand-brown)', color:'var(--color-brand-cream)', fontFamily:'"DM Serif Display",serif', fontSize: mobile ? '0.72rem' : '0.82rem', fontWeight:900, textTransform:'uppercase', letterSpacing:'0.04em', padding:'0.45rem 0.85rem', textDecoration:'none', boxShadow:'3px 3px 0 0 var(--color-brand-sand)', transition:`transform ${FAST}, box-shadow ${FAST}, background ${FAST}` }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translate(-2px,-2px)'; e.currentTarget.style.boxShadow='5px 5px 0 0 var(--color-brand-sand)'; e.currentTarget.style.background='var(--color-brand-sage)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='3px 3px 0 0 var(--color-brand-sand)'; e.currentTarget.style.background='var(--color-brand-brown)'; }}
              >
                BOOK NOW <ArrowRight size={13} strokeWidth={2.5}/>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

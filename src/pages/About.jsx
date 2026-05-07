import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Compass, Anchor, Shield, Target, Eye, Sparkles, ArrowRight } from 'lucide-react';
import { useOcean } from '../core/OceanEngine';
import trainingImage from '../assets/service-training.png';
import aboutImage from '../assets/about-beach.png';
import LiquidText from '../components/LiquidText';
import OceanDots from '../components/OceanDots';

const BlurIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
    whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const ParallaxImage = ({ src, alt, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img 
        style={{ y, willChange: 'transform' }}
        src={src} 
        alt={alt} 
        className="absolute inset-0 w-full h-[120%] object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
    </div>
  );
};

const HeroSection = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, -50]);

  return (
    <section className="relative h-[65vh] flex flex-col items-center justify-center overflow-hidden bg-[#F8FBFA] border-b border-[#004D4D]/5">
      {/* Subtle Background */}
      <div className="absolute inset-0 z-0">
        <OceanDots spacing={50} baseSize={1} className="opacity-10" />
      </div>

      {/* Content Layer */}
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-[10px] font-black uppercase tracking-[0.8em] text-[#008080] mb-6 block"
        >
          Deep Blue Origins
        </motion.span>

        <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter text-[#004D4D] mb-8">
          <LiquidText text="Beyond The Horizon" />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="space-y-8"
        >
          <p className="text-lg md:text-xl text-black leading-relaxed">
            Aquamarine Dive & Tour Company is more than a PADI Dive Centre. We are a sanctuary for explorers, a bridge between the surface and the silent world below.
          </p>
          
          <div className="flex flex-col items-center gap-2 pt-4">
            <motion.div 
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[#008080]"
            >
              <ArrowRight size={20} className="rotate-90" />
            </motion.div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#008080]/60">Dive Deeper</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default function About() {
  const { depth, lightIntensity } = useOcean();
  
  return (
    <div className="relative bg-[#F8FBFA] text-[#004D4D] overflow-x-hidden selection:bg-[#008080] selection:text-white">
      {/* Dynamic Background Elements */}
      <motion.div 
        style={{ opacity: lightIntensity }}
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      >
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[radial-gradient(circle,_#B2D8D8_0%,_transparent_70%)] opacity-30 animate-float" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[70%] h-[70%] bg-[radial-gradient(circle,_#008080_0%,_transparent_70%)] opacity-10 animate-float" style={{ animationDelay: '-5s' }} />
      </motion.div>

      <HeroSection />

      {/* 2. Identity Section - Minimalism & Text Animation */}
      <section className="py-24 px-8 md:px-24 relative z-10 border-t border-[#004D4D]/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-16">
            <div className="group">
              <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-xs font-black text-[#008080] mb-4 uppercase tracking-[0.4em] block">
                Our Essence
              </motion.span>
              <h3 className="text-4xl font-black mb-6">
                <LiquidText text="Pioneering Excellence" />
              </h3>
              <BlurIn delay={0.2}>
                <p className="text-lg text-black leading-relaxed max-w-md">
                  Our team consists of professionals passionate about ocean exploration, safety, and community. We believe every dive should be an educational and life-changing experience.
                </p>
              </BlurIn>
            </div>

            <div className="group">
              <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-xs font-black text-[#008080] mb-4 uppercase tracking-[0.4em] block text-right">
                Our Sanctuary
              </motion.span>
              <h3 className="text-4xl font-black mb-6 text-right">
                <LiquidText text="Kovalam Chennai" />
              </h3>
              <BlurIn delay={0.4}>
                <p className="text-lg text-black leading-relaxed max-w-md ml-auto text-right">
                  Located near the Taj Fisherman’s Cove, our center is a hub for conversation, coffee, and expert guidance on your next underwater adventure.
                </p>
              </BlurIn>
            </div>
          </div>

          <ParallaxImage 
            src={trainingImage} 
            alt="Elite Training" 
            className="aspect-[4/5] rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 group"
          />
        </div>
      </section>

      {/* 3. Immersive Vision - Depth Driven */}
      <section className="py-24 px-8 md:px-24 bg-[#004D4D] text-white flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--color-secondary)_1px,_transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-[#B2D8D8]">
                  <Target size={20} />
                  <span className="text-xs font-black uppercase tracking-[0.4em]">The Mission</span>
                </div>
                <h4 className="text-4xl md:text-5xl font-black italic text-[#F8FBFA] leading-tight">
                  <LiquidText text="Safe high-quality diving" />
                </h4>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-[#B2D8D8]">
                  <Eye size={20} />
                  <span className="text-xs font-black uppercase tracking-[0.4em]">The Vision</span>
                </div>
                <h4 className="text-4xl md:text-5xl font-black italic text-[#F8FBFA] leading-tight">
                  <LiquidText text="Leading eco dive centre" />
                </h4>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <ParallaxImage 
                src={aboutImage} 
                alt="Ocean View" 
                className="w-full aspect-square rounded-[4rem] shadow-2xl border border-white/10"
              />
              <div className="absolute -inset-20 bg-[#B2D8D8]/5 blur-[100px] rounded-full z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Commitment Grid - Minimal & Staggered */}
      <section className="py-24 px-8 md:px-24 bg-[#F8FBFA]">
        <div className="max-w-4xl mb-16">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-xs font-black uppercase tracking-[0.6em] block mb-4 text-[#008080]"
          >
            Conservation
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-black leading-[0.9] mb-8 text-[#004D4D]">
            <LiquidText text="Silent Promise" />
          </h2>
          <BlurIn delay={0.4}>
            <p className="text-lg max-w-2xl leading-relaxed text-black">
              As members of PADI AWARE and Green Fins, our commitment goes beyond the surface. We actively work to protect the marine ecosystem.
            </p>
          </BlurIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: "Dive Against Debris", icon: <Shield /> },
            { title: "Reef Adoption", icon: <Anchor /> },
            { title: "Marine Conservation", icon: <Compass /> },
            { title: "Eco Briefing", icon: <Sparkles /> }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white border border-[#004D4D]/5 p-8 rounded-[2rem] flex flex-col justify-between h-56 group hover:bg-[#004D4D] hover:text-white transition-all duration-500 cursor-pointer"
            >
              <div className="text-[#008080] group-hover:text-[#B2D8D8] transition-colors">
                {React.cloneElement(item.icon, { size: 28, strokeWidth: 1.5 })}
              </div>
              <div className="space-y-4">
                <h5 className="text-lg font-black uppercase tracking-tight">{item.title}</h5>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Details <ArrowRight size={12} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. CTA Section - Premium Minimalist */}
      <section className="py-32 px-8 md:px-24 bg-white text-center border-t border-[#004D4D]/5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h2 className="text-6xl md:text-[8rem] font-black text-[#004D4D] leading-[0.8] tracking-tighter">
            <LiquidText text="DIVE DEEPER." />
          </h2>
          <BlurIn delay={0.5}>
            <p className="text-lg text-[#004D4D]/60 max-w-xl mx-auto">
              Your journey into the extraordinary begins with a single breath.
            </p>
          </BlurIn>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-[#004D4D] text-white rounded-full text-xs font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-[#008080] transition-colors"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

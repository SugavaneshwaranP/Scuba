import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Waves, Anchor, Compass, Camera, Sparkles } from 'lucide-react';
import heroImage from '../assets/hero-dive.png';
import aboutImage from '../assets/about-beach.png';
import LiquidText from '../components/LiquidText';
import OceanDots from '../components/OceanDots';
import { Link } from 'react-router-dom';
const ExperienceCard = ({ icon: Icon, title, description, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), springConfig);
  const textX = useSpring(useTransform(mouseX, [-100, 100], [-3, 3]), springConfig);
  const textY = useSpring(useTransform(mouseY, [-100, 100], [-3, 3]), springConfig);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left - rect.width / 2);
        mouseY.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, perspective: 1200 }}
      className="group relative bg-white border border-[#004D4D]/5 rounded-[2.5rem] p-10 transition-all hover:shadow-[0_40px_80px_-20px_rgba(0,128,128,0.15)] cursor-pointer overflow-hidden h-full flex flex-col justify-between"
    >
      <div className="absolute inset-0 p-[1px] rounded-[2.5rem] bg-gradient-to-tr from-transparent via-[#008080]/0 to-transparent group-hover:via-[#008080]/30 transition-all duration-1000" />
      
      <div className="relative z-10 space-y-6">
        <div className="p-4 bg-[#008080]/5 rounded-2xl w-fit text-[#008080] group-hover:bg-[#008080] group-hover:text-white transition-all duration-500 shadow-sm">
          <Icon size={24} />
        </div>
        <div className="space-y-3">
          <h4 className="text-2xl font-black text-[#004D4D] leading-tight tracking-tight">{title}</h4>
          <p className="text-sm text-black leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>

      <div className="pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#008080]">
          Learn More <ArrowRight size={14} />
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  return (
    <div className="bg-[#F8FBFA] text-[#004D4D] overflow-x-hidden selection:bg-[#008080] selection:text-white">
      {/* Cinematic Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-8 overflow-hidden pt-24">
        <div className="absolute inset-0 z-0 opacity-10">
          <OceanDots spacing={60} baseSize={1} />
        </div>
        
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#008080]">PADI Center</span>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                <LiquidText text="Deep Blue" />
                <br />
                <span className="text-[#008080]">Origins.</span>
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-black max-w-xl leading-relaxed font-medium"
            >
              Aquamarine Dive & Tour Company is more than a PADI Dive Centre. We are a bridge between the surface and the silent world below.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-8 pt-6"
            >
              <button className="group relative px-10 py-6 bg-[#004D4D] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-[#008080] transition-all overflow-hidden">
                <span className="relative z-10">Start Adventure</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              </button>
              
              <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] group">
                <span className="border-b border-[#004D4D]/20 group-hover:border-[#008080] transition-all">Our Story</span>
                <ArrowRight size={16} className="text-[#008080] group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-[#008080]/5 rounded-[5rem] blur-3xl" />
            <div className="relative rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,77,77,0.3)] border-4 border-white grayscale group hover:grayscale-0 transition-all duration-1000">
              <img 
                src={heroImage} 
                alt="Underwater Exploration" 
                className="w-full aspect-[4/5] object-cover scale-110 group-hover:scale-100 transition-transform duration-[2000ms]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#004D4D]/60 via-transparent to-transparent opacity-40" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Micro-Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 flex flex-col items-center gap-4 opacity-30"
        >
          <div className="w-[1px] h-16 bg-[#004D4D]" />
          <span className="text-[8px] font-black uppercase tracking-[0.8em] rotate-180 [writing-mode:vertical-lr]">Explore</span>
        </motion.div>
      </section>

      {/* Experience Grid - The "Minimum" Interactive Row */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#008080]">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              <LiquidText text="Designed for the Deep." />
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ExperienceCard 
              icon={Waves}
              title="Certified PADI"
              description="Learn to dive with world-class instructors following international safety standards."
              index={0}
            />
            <ExperienceCard 
              icon={Anchor}
              title="Kovalam Origins"
              description="Explore the hidden reefs and diverse marine life along Chennai's stunning coastline."
              index={1}
            />
            <ExperienceCard 
              icon={Compass}
              title="Tailored Trips"
              description="Small groups and personal attention ensure every dive is a calm, focused adventure."
              index={2}
            />
            <ExperienceCard 
              icon={Camera}
              title="Conservation"
              description="We dive with a purpose, helping protect the very ocean we call our home sanctuary."
              index={3}
            />
          </div>
        </div>
      </section>

      {/* Editorial About Section */}
      <section className="py-32 px-8 md:px-16 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-20 bg-[#008080]/5 rounded-full blur-3xl" />
            <motion.div
              initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
              whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="relative rounded-[4rem] overflow-hidden shadow-2xl"
            >
              <img 
                src={aboutImage} 
                alt="Ocean Sanctuary" 
                className="w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
            <div className="absolute bottom-12 right-12 p-8 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-xs border border-[#004D4D]/5">
              <Sparkles className="text-[#008080] mb-4" />
              <p className="text-sm font-bold italic text-[#004D4D]/80 leading-relaxed">
                "We are a bridge between the surface and the silent world below."
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#008080]">Beyond The Horizon</span>
              <h2 className="text-5xl md:text-6xl font-black leading-[0.9] tracking-tighter">
                A sanctuary <br /> for explorers.
              </h2>
            </div>
            <div className="space-y-6 text-black text-lg font-medium leading-relaxed">
              <p>
                Founded in 2024 and located along Kovalam’s scenic East Coast Road, we welcome divers of all levels to explore, grow, and connect with the marine world.
              </p>
              <p>
                Our team offers world-class PADI courses, unforgettable experience dives, and conservation programs that help protect the very world we explore.
              </p>
            </div>
            <motion.button 
              whileHover={{ x: 10 }}
              className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#004D4D]"
            >
              Read Full Story <ArrowRight size={20} className="text-[#008080]" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Minimalistic Premium CTA (Replacing Contact Form) */}
      <section className="py-40 px-8 text-center bg-[#004D4D] text-white rounded-t-[5rem] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <OceanDots spacing={100} baseSize={0.5} color="#FFFFFF" />
        </div>
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="space-y-4"
          >
            <span className="text-[10px] font-black uppercase tracking-[1em] text-[#00BFA5]">Ready to Dive?</span>
            <h2 className="text-5xl md:text-8xl font-black leading-tight tracking-tighter">
              The Ocean <br /> is Calling.
            </h2>
          </motion.div>
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Take your first breath underwater or continue your professional journey with Chennai's most dedicated dive tribe.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-white text-[#004D4D] rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl"
            >
              Book Your Experience
            </motion.button>
            <Link to="/contact" className="text-[10px] font-black uppercase tracking-[0.4em] border-b border-white/20 hover:border-white transition-all pb-2">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

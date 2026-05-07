import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Waves, Compass, Anchor, Shield } from 'lucide-react';
import LiquidText from '../components/LiquidText';
import trainingImg from '../assets/service-training.png';
import snorkelingImg from '../assets/service-snorkeling.png';
import diveImg from '../assets/hero-dive.png';
import fundiveImg from '../assets/service-fundive.png';
import OceanDots from '../components/OceanDots';

const services = [
  {
    title: "Discover Scuba",
    subtitle: "Beginner Experience",
    description: "Start your journey with a safe, guided dive in the shallow reefs of Kovalam. Feel the weightlessness and breathe underwater for the first time.",
    image: diveImg,
    features: ["Equipment Included", "PADI Instructor", "Underwater Photos"],
    icon: <Waves size={24} />,
    color: "#008080"
  },
  {
    title: "PADI Courses",
    subtitle: "Global Certification",
    description: "Get certified globally with world-class instruction. From Open Water to Divemaster, we build confident explorers with international standards.",
    image: trainingImg,
    features: ["eLearning Access", "Certification Card", "Pool Sessions"],
    icon: <Compass size={24} />,
    color: "#004D4D"
  },
  {
    title: "Fun Dives",
    subtitle: "Certified Explorers",
    description: "For certified divers looking to explore the hidden gems of Chennai's coast. Visit vibrant reefs and encounter local marine life with our expert guides.",
    image: fundiveImg,
    features: ["Guided Tours", "Tanks & Weights", "Local Reefs"],
    icon: <Anchor size={24} />,
    color: "#006666"
  },
  {
    title: "Ocean Snorkelling",
    subtitle: "Family Friendly",
    description: "Explore the vibrant life of the Bay of Bengal from the surface. Suitable for families and non-swimmers. A gentle way to connect with the ocean.",
    image: snorkelingImg,
    features: ["Surface Support", "Snorkel Gear", "Eco Briefing"],
    icon: <Shield size={24} />,
    color: "#008080"
  }
];

const ServiceCard = ({ service, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), springConfig);
  
  // Internal Parallax
  const textX = useSpring(useTransform(mouseX, [-100, 100], [-3, 3]), springConfig);
  const textY = useSpring(useTransform(mouseY, [-100, 100], [-3, 3]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, perspective: 1200 }}
      className="group relative bg-white border border-[#004D4D]/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,128,128,0.15)] cursor-pointer"
    >
      {/* Liquid Gradient Border */}
      <div className="absolute inset-0 p-[1px] rounded-[2.5rem] bg-gradient-to-tr from-transparent via-[#008080]/0 to-transparent group-hover:via-[#008080]/40 transition-all duration-1000 z-0" />
      
      <div className="relative z-10 bg-white rounded-[2.4rem] overflow-hidden h-full flex flex-col">
        <div className="aspect-[16/10] overflow-hidden relative">
          <motion.img 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#004D4D]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="absolute top-6 left-6 p-3 bg-white/95 backdrop-blur-2xl rounded-xl text-[#008080] shadow-xl transform group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700">
            {React.cloneElement(service.icon, { size: 20 })}
          </div>
        </div>

        <motion.div 
          style={{ x: textX, y: textY }}
          className="p-8 flex-1 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#008080]/60">
                {service.subtitle}
              </span>
              <h3 className="text-2xl font-black text-[#004D4D] leading-tight tracking-tight">
                {service.title}
              </h3>
            </div>

            <p className="text-black leading-relaxed text-xs line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
              {service.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {service.features.slice(0, 3).map((feature, i) => (
                <span key={i} className="text-[8px] font-black uppercase tracking-widest text-[#004D4D]/30 border border-[#004D4D]/5 px-3 py-1.5 rounded-full group-hover:text-[#008080] group-hover:border-[#008080]/10 transition-colors">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-[#004D4D]/5 mt-6">
            <motion.div
              className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-[#004D4D]"
            >
              <span className="group-hover:text-[#008080] transition-colors">Dive In</span>
              <ArrowRight size={14} className="text-[#008080] -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function Services() {
  return (
    <div className="bg-[#F8FBFA] text-[#004D4D] overflow-x-hidden selection:bg-[#008080] selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <OceanDots spacing={60} baseSize={1} />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-6"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.8em] text-[#008080]">Professional Excellence</span>
          <h1 className="text-5xl md:text-8xl font-black leading-tight tracking-tighter">
            <LiquidText text="Our Services" />
          </h1>
          <p className="text-lg md:text-xl text-black max-w-2xl mx-auto leading-relaxed">
            From your first breath underwater to professional certifications, we provide world-class diving experiences in the heart of Chennai.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={i} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Standards */}
      <section className="py-24 px-8 md:px-24 bg-[#004D4D] text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-[#B2D8D8]">PADI Standards</span>
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              <LiquidText text="World Class Training" />
            </h2>
            <p className="text-lg text-white/60 leading-relaxed max-w-xl">
              As a certified PADI Dive Centre, we adhere to the strictest safety protocols and training standards. Our instructors are dedicated to building your confidence and skills.
            </p>
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <p className="text-4xl font-black">100%</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-2">Safety Record</p>
              </div>
              <div className="text-center border-l border-white/10 pl-8">
                <p className="text-4xl font-black">500+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mt-2">Certified Divers</p>
              </div>
            </div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative rounded-[3rem] overflow-hidden aspect-video bg-white/5 backdrop-blur-xl border border-white/10 p-12 flex items-center justify-center text-center"
          >
            <div className="space-y-6">
              <Sparkles size={60} className="text-[#008080] mx-auto animate-pulse" />
              <p className="text-2xl font-black italic">"Every dive is a new story waiting to be told."</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 md:px-24 bg-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-12"
        >
          <h2 className="text-5xl md:text-[8rem] font-black text-[#004D4D] leading-[0.8] tracking-tighter">
            <LiquidText text="START TODAY." />
          </h2>
          <p className="text-lg text-[#004D4D]/60 max-w-xl mx-auto">
            Book your slot now and join us in the crystal clear waters of Kovalam.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-16 py-8 bg-[#004D4D] text-white rounded-full text-xs font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-[#008080] transition-colors"
          >
            Book Experience Now
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

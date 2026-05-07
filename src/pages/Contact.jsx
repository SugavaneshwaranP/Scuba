import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Sparkles, ArrowRight, Camera, Share2, MessageSquare } from 'lucide-react';
import LiquidText from '../components/LiquidText';
import OceanDots from '../components/OceanDots';

const ContactCard = ({ icon: Icon, title, content, subtitle, link, index }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-10, 10]), springConfig);
  const textX = useSpring(useTransform(mouseX, [-100, 100], [-3, 3]), springConfig);
  const textY = useSpring(useTransform(mouseY, [-100, 100], [-3, 3]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, perspective: 1200 }}
      className="group relative bg-white border border-[#004D4D]/5 rounded-[2.5rem] p-8 transition-all hover:shadow-[0_30px_60px_-15px_rgba(0,128,128,0.1)] cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 p-[1px] rounded-[2.5rem] bg-gradient-to-tr from-transparent via-[#008080]/0 to-transparent group-hover:via-[#008080]/30 transition-all duration-1000" />
      
      <motion.div style={{ x: textX, y: textY }} className="relative z-10 flex flex-col h-full justify-between">
        <div className="space-y-6">
          <div className="p-4 bg-[#008080]/5 rounded-2xl w-fit text-[#008080] group-hover:bg-[#008080] group-hover:text-white transition-all duration-500 shadow-sm">
            <Icon size={24} />
          </div>
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#008080]/60 mb-2 block">{subtitle}</span>
            <h4 className="text-2xl font-black text-[#004D4D] leading-tight">{title}</h4>
          </div>
        </div>

        <div className="mt-8">
          {link ? (
            <a href={link} className="text-sm font-bold text-black hover:text-[#008080] transition-colors break-words">
              {content}
            </a>
          ) : (
            <p className="text-sm font-bold text-black whitespace-pre-line">{content}</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const InputField = ({ label, placeholder, type = "text", isTextArea = false }) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-black uppercase tracking-widest text-black group-focus-within:text-[#008080] transition-colors">
      {label}
    </label>
    {isTextArea ? (
      <textarea 
        rows="4" 
        placeholder={placeholder}
        className="w-full px-6 py-4 bg-[#F8FBFA] border border-[#004D4D]/5 rounded-2xl focus:outline-none focus:border-[#008080]/30 focus:bg-white transition-all resize-none text-sm font-medium"
      />
    ) : (
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full px-6 py-4 bg-[#F8FBFA] border border-[#004D4D]/5 rounded-2xl focus:outline-none focus:border-[#008080]/30 focus:bg-white transition-all text-sm font-medium"
      />
    )}
  </div>
);

export default function Contact() {
  return (
    <div className="bg-[#F8FBFA] text-[#004D4D] overflow-x-hidden selection:bg-[#008080] selection:text-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-32">
        <div className="absolute inset-0 z-0 opacity-5">
          <OceanDots spacing={80} baseSize={0.8} />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 space-y-4"
        >
          <span className="text-[9px] font-black uppercase tracking-[1em] text-[#008080]">Connect</span>
          <h1 className="text-4xl md:text-7xl font-black leading-tight tracking-tighter">
            <LiquidText text="Contact Us" />
          </h1>
          <p className="text-base md:text-lg text-black max-w-xl mx-auto leading-relaxed">
            Ready to explore? Our team is here to guide your next adventure.
          </p>
        </motion.div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20 px-8 md:px-16 relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Info Cards - 5 Columns */}
          <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <ContactCard 
              icon={MapPin} 
              subtitle="Location"
              title="Our Center"
              content="Kovalam, Chennai"
              index={0}
            />
            <ContactCard 
              icon={Phone} 
              subtitle="Call"
              title="Talk"
              content="+91 97911 96774"
              link="tel:+919791196774"
              index={1}
            />
            <ContactCard 
              icon={Mail} 
              subtitle="Email"
              title="Write"
              content="info@aquamarine.com"
              link="mailto:info@aquamarinediveandtours.com"
              index={2}
            />
            <ContactCard 
              icon={MessageSquare} 
              subtitle="Support"
              title="Chat"
              content="9AM - 6PM"
              index={3}
            />
            
            {/* Social Connect */}
            <div className="md:col-span-2 p-6 bg-[#004D4D] rounded-[2rem] text-white flex items-center justify-between">
              <h5 className="text-base font-black italic">Join the tribe</h5>
              <div className="flex gap-2">
                <motion.a whileHover={{ y: -3 }} href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                  <Camera size={16} />
                </motion.a>
                <motion.a whileHover={{ y: -3 }} href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all">
                  <Share2 size={16} />
                </motion.a>
              </div>
            </div>
          </div>

          {/* Contact Form - 7 Columns */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-white rounded-[3rem] p-10 md:p-14 border border-[#004D4D]/5 shadow-sm"
          >
            <div className="max-w-xl">
              <h3 className="text-3xl font-black text-[#004D4D] mb-2">
                <LiquidText text="Drop a Line" />
              </h3>
              <p className="text-[10px] uppercase tracking-widest text-black mb-8 font-black">Tell us about your dreams</p>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="First Name" placeholder="First Name" />
                  <InputField label="Last Name" placeholder="Last Name" />
                </div>
                <InputField label="Email Address" placeholder="Email Address" type="email" />
                <InputField label="Message" placeholder="Dive into details..." isTextArea />
                
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-5 bg-[#004D4D] text-white rounded-xl text-[10px] font-black uppercase tracking-[0.4em] shadow-xl hover:bg-[#008080] transition-colors flex items-center justify-center gap-4"
                >
                  Send <Send size={14} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section - Premium Compact */}
      <section className="py-12 px-8 md:px-16 border-t border-[#004D4D]/5">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-[9px] font-black uppercase tracking-[0.6em] text-[#008080]">Navigation</span>
            <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter">
              <LiquidText text="Visit Us" />
            </h2>
            <p className="text-sm text-black max-w-sm">
              Located near Taj Fisherman's Cove. Fresh coffee and ocean stories are waiting for you.
            </p>
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-[#004D4D]"
            >
              Directions <ArrowRight size={14} className="text-[#008080]" />
            </motion.button>
          </div>
          <div className="relative group h-96">
            <div className="absolute -inset-4 bg-[#008080]/5 rounded-[3.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative h-full bg-white border border-[#004D4D]/5 rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-sm">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.638541258671!2d80.2452!3d12.7937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDQ3JzM3LjMiTiA4MMKwMTQnNDIuNyJF!5e0!3m2!1sen!2sin!4v1715096000000!5m2!1sen!2sin" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen="" 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 title="Aquamarine Location"
                 className="opacity-80 group-hover:opacity-100 transition-opacity"
               />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

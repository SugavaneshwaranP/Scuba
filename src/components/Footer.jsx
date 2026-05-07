import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-[#000D0D] text-white pt-24 pb-12 px-8 md:px-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-8">
            <h3 className="text-5xl font-black pacifico text-[#00BFA5] tracking-tight">Aquamarine</h3>
            <p className="text-lg text-white/50 max-w-sm leading-relaxed font-medium">
              A sanctuary for explorers, a bridge between the surface and the silent world below. Join our tribe in Kovalam.
            </p>
            <div className="flex gap-4">
              {[Camera, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -5, backgroundColor: '#00BFA5', color: '#000D0D' }}
                  href="#"
                  className="p-4 bg-white/5 rounded-2xl text-white/80 transition-all border border-white/5 shadow-xl"
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.6em] font-black text-white/20 mb-10">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '')}`} 
                    className="group flex items-center gap-2 text-sm font-bold text-white/40 hover:text-[#00BFA5] transition-all"
                  >
                    {item}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-y-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] uppercase tracking-[0.6em] font-black text-white/20 mb-10">Connect</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-lg text-[#00BFA5] mt-1"><Phone size={16} /></div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/20 font-black mb-1">Call Us</p>
                  <p className="text-base font-bold text-white/80">+91 97911 96774</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-lg text-[#00BFA5] mt-1"><MapPin size={16} /></div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/20 font-black mb-1">Location</p>
                  <p className="text-base font-bold text-white/80">Kovalam, Chennai, TN</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20">
            © 2026 Aquamarine Dive & Tours. Crafted for the deep.
          </p>
          <div className="flex gap-10 text-[10px] uppercase tracking-[0.4em] font-black text-white/20">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

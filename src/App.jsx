import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { OceanProvider } from './core/OceanEngine';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Footer from './components/Footer';

import { Home as HomeIcon, Waves, Info, Mail } from 'lucide-react';
import { FloatingDock } from './components/ui/floating-dock';

import { useOcean } from './core/OceanEngine';

function Navigation() {
  const { pressure } = useOcean();
  
  // Fade out navbar as we reach the bottom of the page (footer)
  // useOcean's pressure is the scroll progress from 0 to 1
  const opacity = pressure > 0.85 ? Math.max(0, 1 - (pressure - 0.85) / 0.1) : 1;
  const isHidden = pressure > 0.95;

  const links = [
    {
      title: "Home",
      icon: <HomeIcon className="h-full w-full" />,
      href: "/",
    },
    {
      title: "About",
      icon: <Info className="h-full w-full" />,
      href: "/about",
    },
    {
      title: "Services",
      icon: <Waves className="h-full w-full" />,
      href: "/services",
    },
    {
      title: "Contact",
      icon: <Mail className="h-full w-full" />,
      href: "/contact",
    },
  ];

  return (
    <motion.nav 
      animate={{ 
        opacity,
        pointerEvents: isHidden ? "none" : "auto",
        y: isHidden ? -20 : 0
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50 pointer-events-none"
    >
      <Link to="/" className="text-3xl font-black pacifico text-[#004D4D] no-underline pointer-events-auto">
        Aquamarine
      </Link>
      
      <div className="pointer-events-auto flex items-center gap-4">
        <FloatingDock items={links} />
      </div>
    </motion.nav>
  );
}

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      {isHome && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <OceanProvider>
        <AppContent />
      </OceanProvider>
    </BrowserRouter>
  );
}

export default App;

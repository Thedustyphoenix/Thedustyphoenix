import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { LOGO_IMAGE } from '../data';

interface NavbarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'gallery', label: 'Gallery' },
    { id: 'products', label: 'Events' },
    { id: 'studio-desk', label: 'Socials' },
  ];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <nav
      id="navbar-widget"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-purple-50/95 backdrop-blur-md border-b border-purple-200/40 py-3 shadow-md' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 group text-left cursor-pointer"
          >
            <img 
              src={LOGO_IMAGE} 
              alt="thedustyphoenix logo" 
              className="h-10 w-10 object-contain group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="block font-display text-lg tracking-widest font-bold text-purple-950 leading-tight group-hover:text-purple-800 transition-colors lowercase">
                thedustyphoenix
              </span>
              <span className="block font-mono text-[10px] tracking-widest text-purple-600 uppercase">
                Art • Illustration • Crafts
              </span>
            </div>
          </button>
 
          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-sans text-sm font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-purple-950 bg-purple-150/60 border-b-2 border-purple-800'
                      : 'text-purple-800 hover:text-purple-950 hover:bg-purple-100/30'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Shops button styled as the purple button to the right of Socials */}
            <button
              id="nav-item-storefronts"
              onClick={() => handleScrollTo('storefronts')}
              className="ml-4 px-4 py-2 rounded-lg bg-purple-950 text-white font-sans text-sm font-semibold tracking-wide hover:bg-purple-900 transition-all shadow-sm cursor-pointer"
            >
              <span>Shops</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              id="toggle-mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
              className="text-purple-900 hover:text-purple-950 focus:outline-none p-2 rounded-lg hover:bg-purple-100 transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-purple-50/95 border-b border-purple-200 overflow-hidden shadow-lg"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    id={`mobile-nav-${item.id}`}
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className={`flex items-center w-full px-4 py-3 rounded-lg text-left text-base font-medium transition-colors ${
                      isActive
                        ? 'text-purple-950 bg-purple-100 font-semibold'
                        : 'text-purple-850 hover:text-purple-950 hover:bg-purple-100/50'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
              {/* Shops button styled as a purple button to the right of Socials on mobile */}
              <button
                id="mobile-cta-shops"
                onClick={() => handleScrollTo('storefronts')}
                className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-base font-semibold text-white bg-purple-950 hover:bg-purple-900 transition-colors opacity-95 cursor-pointer"
              >
                <span>Shops</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

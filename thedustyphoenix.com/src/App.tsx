import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import StoreSection from './components/StoreSection';
import GallerySection from './components/GallerySection';
import EventsSection from './components/EventsSection';
import AboutSection from './components/AboutSection';
import Footer from './components/Footer';
import CookieConsentBanner from './components/CookieConsentBanner';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import { 
  getConsentPreferences, 
  initializeThirdPartyScripts 
} from './utils/cookieConsent';
import { 
  BKGRD_IMAGE, 
  LOGO_BIG_CIRCLE, 
  STAR_BULLET 
} from './data';


// Reusable custom star bullet separator (whimsical 3-5x larger star design)
export function StarDivider() {
  return (
    <div className="flex items-center justify-center py-1 select-none pointer-events-none">
      <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-purple-300 to-transparent" />
      <img 
        src={STAR_BULLET} 
        alt="star divider" 
        className="h-14 w-14 mx-4 animate-[spin_15s_linear_infinite]" 
        referrerPolicy="no-referrer"
      />
      <div className="h-[1px] w-20 bg-gradient-to-l from-transparent via-purple-300 to-transparent" />
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<'home' | 'privacy' | 'terms'>('home');
  const [activeSection, setActiveSection] = useState('gallery');
  const [triggerOpenCount, setTriggerOpenCount] = useState(0);
  const [triggerDoNotSellCount, setTriggerDoNotSellCount] = useState(0);

  // Launch third party scripts and disable context menu to protect copyright on artwork
  useEffect(() => {
    const initialConsent = getConsentPreferences();
    initializeThirdPartyScripts(initialConsent);

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener('contextmenu', handleContextMenu);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // Listen to hashchanges and query params to sync browser routing
  useEffect(() => {
    // Clear hash/query on fresh entry to ensure the main home page always loads first
    if (window.location.hash === '#privacy' || window.location.search.includes('page=privacy') || window.location.hash === '#terms' || window.location.search.includes('page=terms')) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    setView('home');

    const handleRouteSync = () => {
      if (window.location.hash === '#privacy') {
        setView('privacy');
      } else if (window.location.hash === '#terms') {
        setView('terms');
      } else {
        setView('home');
      }
    };

    window.addEventListener('hashchange', handleRouteSync);
    return () => window.removeEventListener('hashchange', handleRouteSync);
  }, []);

  // Scroll listener to update Navbar highlighted state based on scroll coordinates
  useEffect(() => {
    if (view !== 'home') return;

    const handleScroll = () => {
      const sections = ['gallery', 'storefronts', 'products', 'studio-desk'];
      const scrollPosition = window.scrollY + 200; // offset for sticky navbar

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  const handleScrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavigate = (id: string) => {
    if (id === 'home' || id === 'gallery' || id === 'storefronts' || id === 'products' || id === 'studio-desk') {
      if (view !== 'home') {
        setView('home');
        window.location.hash = '';
        setTimeout(() => {
          if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            handleScrollToId(id);
          }
        }, 150);
      } else {
        if (id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          handleScrollToId(id);
        }
      }
    }
  };

  const handleViewPolicy = () => {
    setView('privacy');
    window.location.hash = 'privacy';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewTerms = () => {
    setView('terms');
    window.location.hash = 'terms';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenPrivacyChoices = () => {
    setTriggerOpenCount(prev => prev + 1);
  };

  const handleDoNotSell = () => {
    setTriggerDoNotSellCount(prev => prev + 1);
  };

  return (
    <div 
      className="bg-purple-100/5 min-h-screen text-purple-950 font-sans selection:bg-purple-200 selection:text-purple-900 scroll-smooth flex flex-col justify-between bg-repeat bg-fixed bg-center"
      style={{ backgroundImage: `linear-gradient(rgba(247, 245, 252, 0.95), rgba(247, 245, 252, 0.95)), url(${BKGRD_IMAGE})` }}
    >
 
      {/* Sticky Top Navbar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
  
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.div
            key="home-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-grow"
          >
            {/* 1. Magnificent Hero Section */}
            <header id="home" className="relative min-h-[95vh] md:min-h-screen flex items-center justify-center bg-[#130924] overflow-hidden pt-12">
              
              {/* Background Visual Banner Image (V2-BkGrd-Thedustyphoenix.png) */}
              <div className="absolute inset-0 z-0">
                <img
                  src={BKGRD_IMAGE}
                  alt="thedustyphoenix workshop banner"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none"
                />
              </div>
        
              {/* Hero Interactive Contents */}
              <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        
                {/* Mascot Circle Logo as the Header Logo centered without containers or backgrounds */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.0, duration: 0.6 }}
                  className="flex justify-center mb-1 md:-mb-10 px-4"
                >
                  <img 
                    src={LOGO_BIG_CIRCLE} 
                    alt="thedustyphoenix crest" 
                    className="h-60 w-60 sm:h-80 sm:w-80 md:h-[420px] md:w-[420px] object-contain scroll-smooth select-none transition-transform duration-500 hover:rotate-6 max-w-full"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
      
                {/* Primary Business Heading with Sparkles */}
                <div className="relative inline-block mb-6">
                  {/* Dynamic floating sparkles using 2023-StarBullet-Purp01.png */}
                  {[
                    { id: 1, top: '-25%', left: '8%', size: 24, delay: 0.2, duration: 2.8, rot: 15 },
                    { id: 2, top: '15%', left: '-6%', size: 18, delay: 0.5, duration: 2.2, rot: -20 },
                    { id: 3, top: '-30%', left: '48%', size: 20, delay: 0.9, duration: 3.0, rot: 45 },
                    { id: 4, top: '-15%', left: '86%', size: 26, delay: 0.0, duration: 2.4, rot: -10 },
                    { id: 5, top: '40%', left: '102%', size: 16, delay: 1.2, duration: 2.6, rot: 35 },
                    { id: 6, top: '78%', left: '90%', size: 22, delay: 0.4, duration: 2.1, rot: -15 },
                    { id: 7, top: '85%', left: '12%', size: 18, delay: 1.4, duration: 2.7, rot: 50 },
                    { id: 8, top: '45%', left: '-10%', size: 22, delay: 0.7, duration: 2.3, rot: -40 },
                    { id: 9, top: '-10%', left: '26%', size: 14, delay: 1.6, duration: 2.0, rot: 10 },
                    { id: 10, top: '5%', left: '68%', size: 20, delay: 0.8, duration: 2.5, rot: -25 },
                    { id: 11, top: '90%', left: '55%', size: 16, delay: 1.1, duration: 2.9, rot: 60 },
                    { id: 12, top: '-5%', left: '100%', size: 18, delay: 0.3, duration: 2.4, rot: -5 },
                  ].map((sparkle) => (
                    <motion.img
                      key={sparkle.id}
                      src={STAR_BULLET}
                      alt="sparkle star"
                      referrerPolicy="no-referrer"
                      style={{
                        position: 'absolute',
                        top: sparkle.top,
                        left: sparkle.left,
                        width: sparkle.size * 4,
                        height: sparkle.size * 4,
                      }}
                      animate={{
                        scale: [0, 1, 1, 0],
                        opacity: [0, 0.9, 0.9, 0],
                        rotate: [sparkle.rot, sparkle.rot + 180, sparkle.rot + 360],
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: sparkle.duration,
                        delay: sparkle.delay,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                      className="pointer-events-none select-none z-0"
                    />
                  ))}

                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="font-display text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-black text-purple-950 tracking-wide sm:tracking-widest leading-tight select-all lowercase break-words px-2 relative z-10"
                  >
                    thedustyphoenix
                  </motion.h1>
                </div>
         
                {/* Business description text */}
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="font-sans text-purple-800 text-xs xs:text-sm sm:text-base max-w-3xl mx-auto mb-10 leading-relaxed font-semibold whitespace-pre-line text-center px-4"
                >
                  {"Thedustyphoenix is an artist and crafter creating her wares nestled in the rainy heart of the Willamette Valley.\n\nSpecializing in a blend of traditional crafts and digital illustration, she weaves together the worlds of high fantasy, historical fiction, geek culture, and anime. Whether it’s an original character emerging from the mist or a fun spin on a beloved fandom icon, Dusty's \"DOOM box\" mind is likely poking about ready to add yet another project to her ridiculous to-do list."}
                </motion.p>
        
                {/* Action CTAs replaced with a single purple star divider */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex justify-center items-center mt-6"
                >
                  <StarDivider />
                </motion.div>
        
              </div>
        
            </header>
       
            {/* 2. Unified Content Showcase - Reordered Layout Section */}
            <main className="flex-grow">
              {/* 1. Studio Fine Art Gallery Section */}
              <GallerySection />
      
              {/* 2. Unified Online Store Directory Section */}
              <StarDivider />
              <StoreSection />
      
              {/* 4. Creator Desk Story & Social Links Dashboard */}
              <StarDivider />
              <AboutSection />
      
              {/* 3. Events Section */}
              <StarDivider />
              <EventsSection />
            </main>
          </motion.div>
        ) : view === 'privacy' ? (
          <motion.div
            key="privacy-view"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="flex-grow"
          >
            <PrivacyPolicyPage onBackToHome={() => { setView('home'); window.location.hash = ''; }} />
          </motion.div>
        ) : (
          <motion.div
            key="terms-view"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="flex-grow"
          >
            <TermsOfServicePage onBackToHome={() => { setView('home'); window.location.hash = ''; }} />
          </motion.div>
        )}
      </AnimatePresence>
 
      {/* 5. Custom Fine Footer Organizer */}
      <Footer 
        onViewPolicy={handleViewPolicy} 
        onViewTerms={handleViewTerms}
        onOpenPrivacyChoices={handleOpenPrivacyChoices}
        onDoNotSell={handleDoNotSell}
      />

      {/* 6. Cookie Consent Banner */}
      <CookieConsentBanner 
        onViewPolicy={handleViewPolicy} 
        onViewTerms={handleViewTerms}
        onConsentChanged={(newConsent) => {
          // Keep current view states and script variables refreshed
          console.log("Consent changed to: ", newConsent);
        }}
        triggerOpenCount={triggerOpenCount}
        triggerDoNotSellCount={triggerDoNotSellCount}
      />
      
    </div>
  );
}

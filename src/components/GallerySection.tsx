import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../types';
import { LOCAL_GALLERY_ITEMS } from '../galleryData';
import { 
  Layers, 
  X, 
  Maximize,
  ChevronRight,
  ChevronLeft,
  ExternalLink
} from 'lucide-react';

// Helper to format/shorten links to look highly professional
const formatUrlLabel = (urlStr: string): string => {
  try {
    const url = new URL(urlStr);
    let hostname = url.hostname.replace(/^www\./, '');
    
    // If it's a DeviantArt link, let's shorten it beautifully
    if (hostname.includes('deviantart.com')) {
      const pathname = url.pathname;
      const parts = pathname.split('/').filter(Boolean);
      const artIndex = parts.indexOf('art');
      if (artIndex !== -1 && parts[artIndex + 1]) {
        const titlePart = parts[artIndex + 1];
        const cleanTitle = titlePart
          .replace(/-\d+$/, '') // strip tracking ID if present
          .replace(/-/g, ' ');  // replace hyphens with spaces
        
        // Capitalize words
        const capitalizedTitle = cleanTitle
          .split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
        
        return `${capitalizedTitle}`;
      }
      return 'DeviantArt';
    }
    
    // Wikipedia links
    if (hostname.includes('wikipedia.org')) {
      const parts = url.pathname.split('/').filter(Boolean);
      const last = parts[parts.length - 1];
      if (last) {
        const cleanTitle = decodeURIComponent(last).replace(/_/g, ' ');
        return `Wiki: ${cleanTitle}`;
      }
      return 'Wikipedia';
    }
    
    // Fallback for other domains: domain.com/...path
    if (url.pathname && url.pathname !== '/') {
      const parts = url.pathname.split('/').filter(Boolean);
      const last = parts[parts.length - 1];
      const name = last ? last.substring(0, 15) : '';
      return `${hostname}/.../${name}`;
    }
    
    return hostname;
  } catch (error) {
    return urlStr;
  }
};

// Render multiline description with beautifully styled embedded hyperlinks
const renderDescriptionWithLinks = (text: string) => {
  if (!text) return null;
  
  // Regex to extract http/https links
  const urlRegex = /(https?:\/\/[^\s\)]+)/g;
  const lines = text.split('\n');
  
  return lines.map((line, lineIdx) => {
    // If line is empty, render a line break
    if (line.trim() === '') {
      return <div key={lineIdx} className="h-2" />;
    }
    
    const parts = line.split(urlRegex);
    return (
      <p key={lineIdx} className="mb-2 last:mb-0">
        {parts.map((part, partIdx) => {
          if (part.match(/^https?:\/\//)) {
            let url = part;
            let suffix = '';
            
            // Clean up trailing punctuation if any was swept into regex matched URL
            const lastChar = url[url.length - 1];
            if (['.', ',', ';', '"', '\'', ')'].includes(lastChar)) {
              url = url.slice(0, -1);
              suffix = lastChar;
            }
            
            const label = formatUrlLabel(url);
            
            return (
              <React.Fragment key={partIdx}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="font-semibold text-amber-300 hover:text-amber-200 underline inline-flex items-center gap-0.5 mx-0.5 transition-colors duration-150 decoration-purple-400 hover:decoration-amber-300"
                >
                  <span>{label}</span>
                  <ExternalLink size={11} className="inline opacity-80" />
                </a>
                {suffix}
              </React.Fragment>
            );
          }
          return part;
        })}
      </p>
    );
  });
};

export default function GallerySection() {
  const [deviations] = useState<GalleryItem[]>(() => {
    // Fisher-Yates Shuffle to randomize gallery order on load/each time it's seen
    const arr = [...LOCAL_GALLERY_ITEMS];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [isLiked, setIsLiked] = useState<Record<string, boolean>>({});
  const [isLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);

  // Swipe support for Carousel
  const [carouselTouchStart, setCarouselTouchStart] = useState<number | null>(null);
  const [carouselTouchEnd, setCarouselTouchEnd] = useState<number | null>(null);

  // Swipe support for Lightbox
  const [lightboxTouchStart, setLightboxTouchStart] = useState<number | null>(null);
  const [lightboxTouchEnd, setLightboxTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const handleCarouselTouchStart = (e: React.TouchEvent) => {
    setCarouselTouchEnd(null);
    setCarouselTouchStart(e.targetTouches[0].clientX);
  };

  const handleCarouselTouchMove = (e: React.TouchEvent) => {
    setCarouselTouchEnd(e.targetTouches[0].clientX);
  };

  const handleCarouselTouchEnd = () => {
    if (!carouselTouchStart || !carouselTouchEnd) return;
    const distance = carouselTouchStart - carouselTouchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    setLightboxTouchEnd(null);
    setLightboxTouchStart(e.targetTouches[0].clientX);
  };

  const handleLightboxTouchMove = (e: React.TouchEvent) => {
    setLightboxTouchEnd(e.targetTouches[0].clientX);
  };

  const handleLightboxTouchEnd = () => {
    if (!lightboxTouchStart || !lightboxTouchEnd) return;
    const distance = lightboxTouchStart - lightboxTouchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextLightboxItem();
    } else if (isRightSwipe) {
      prevLightboxItem();
    }
  };

  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 5;
    const width = window.innerWidth;
    if (width >= 768) return 5;  // Tablet and desktop are exactly 5 across
    if (width >= 640) return 3;  // Mobile landscape can fit 3 across
    return 2;                    // Mobile portrait can fit 2 across
  };

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, deviations.length - visibleCount);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    setCurrentIndex(prev =>
      Math.min(prev, Math.max(0, deviations.length - visibleCount))
    );
  }, [visibleCount, deviations.length]);

  const lightboxIndex = lightboxItem ? deviations.findIndex(item => item.id === lightboxItem.id) : -1;

  const nextLightboxItem = () => {
    if (lightboxIndex !== -1) {
      const nextIdx = (lightboxIndex + 1) % deviations.length;
      setLightboxItem(deviations[nextIdx]);
    }
  };

  const prevLightboxItem = () => {
    if (lightboxIndex !== -1) {
      const prevIdx = (lightboxIndex - 1 + deviations.length) % deviations.length;
      setLightboxItem(deviations[prevIdx]);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxItem(null);
      if (e.key === "ArrowRight") {
        if (lightboxIndex !== -1) {
          const nextIdx = (lightboxIndex + 1) % deviations.length;
          setLightboxItem(deviations[nextIdx]);
        }
      }
      if (e.key === "ArrowLeft") {
        if (lightboxIndex !== -1) {
          const prevIdx = (lightboxIndex - 1 + deviations.length) % deviations.length;
          setLightboxItem(deviations[prevIdx]);
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, deviations]);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="gallery" className="py-6 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-purple-950">
            Gallery
          </h2>
        </div>

        {/* Gallery Image Slider Carousel featuring 5 across on desktop */}
        <div className="relative group/slider px-1 sm:px-10">
          {/* Slide Controller Left */}
          <button
            id="gallery-slider-prev-btn"
            onClick={prevSlide}
            className="absolute -left-2 sm:left-0 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white hover:bg-purple-600 hover:text-white text-purple-950 shadow-md border border-purple-100/70 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
          </button>

          {/* Viewport wrapper with swipe support */}
          <div 
            className="overflow-hidden py-4 w-full cursor-grab active:cursor-grabbing touch-pan-y"
            onTouchStart={handleCarouselTouchStart}
            onTouchMove={handleCarouselTouchMove}
            onTouchEnd={handleCarouselTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            >
              {deviations.map((item, idx) => {
                const isSpecialBg = ['da-cobwebs-glow', 'da-candlesticks', 'da-tears-hanging-tree'].includes(item.id);
                const isVisible = idx >= currentIndex && idx < currentIndex + visibleCount;
                return (
                  <div
                    id={item.id}
                    key={item.id}
                    style={{ width: `${100 / visibleCount}%` }}
                    className="flex-shrink-0 px-2.5"
                  >
                    <motion.div
                      className={`group relative border border-purple-200/40 rounded-2xl overflow-hidden shadow-sm aspect-square cursor-pointer hover:border-purple-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 transition-all ${isSpecialBg ? 'bg-[#fefdfe]' : 'bg-white'}`}
                      style={isSpecialBg ? { backgroundColor: '#fefdfe' } : undefined}
                      onClick={() => setLightboxItem(item)}
                      tabIndex={isVisible ? 0 : -1}
                      role="button"
                      aria-label={`View larger artwork of ${item.title}`}
                      onKeyDown={(e) => {
                        if (isVisible && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault();
                          setLightboxItem(item);
                        }
                      }}
                    >
                      {/* Photo container */}
                      <div 
                        className={`w-full h-full overflow-hidden relative ${isSpecialBg ? '' : 'bg-stone-50'}`}
                        style={isSpecialBg ? { backgroundColor: '#fefdfe' } : undefined}
                      >
                      <img
                        src={item.imageUrl}
                        alt={item.altText || item.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Outer shade gradient for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/85 via-purple-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350" />
                    </div>

                    {/* Overlaid micro interactions */}
                    <div className="absolute top-3 right-3 flex space-x-1.5 z-10">
                      <div className="p-1.5 rounded-full bg-white/95 text-purple-900 shadow-sm backdrop-blur-sm md:opacity-0 group-hover:opacity-100 transition-all scale-95 duration-200">
                        <Maximize size={12} />
                      </div>
                    </div>

                    {/* Hover title info */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 z-10 md:translate-y-3 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <h4 className="font-display text-sm font-bold text-white mb-0.5 truncate leading-tight">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-purple-200 font-mono self-start leading-none">{item.year}</span>
                    </div>

                    {/* Mobile visible bar footer */}
                    <div className="p-2.5 border-t border-purple-100 flex flex-col justify-center bg-white md:hidden">
                      <div className="flex items-center justify-between w-full mb-1">
                        <h4 className="font-display text-purple-950 font-bold text-[11px] truncate max-w-[85%] leading-none">{item.title}</h4>
                        <ChevronRight size={10} className="text-purple-600 flex-shrink-0" />
                      </div>
                      <span className="text-[9px] text-purple-500 font-mono self-start leading-none">{item.year}</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
            </div>
          </div>

          {/* Slide Controller Right */}
          <button
            id="gallery-slider-next-btn"
            onClick={nextSlide}
            className="absolute -right-2 sm:right-0 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 rounded-full bg-white hover:bg-purple-600 hover:text-white text-purple-950 shadow-md border border-purple-100/70 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6" />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center space-x-1.5 mt-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-5 bg-purple-600" : "w-1.5 bg-purple-200 hover:bg-purple-300"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Immersive Full-Screen Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="gallery-lightbox-modal">
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxItem(null)}
              className="fixed inset-0 bg-purple-950/90 backdrop-blur-xl"
            />

            {/* Content Centering Area */}
            <div className="flex items-center justify-center min-h-screen p-4 md:p-10 relative z-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="bg-purple-900 border border-purple-800 text-stone-100 rounded-3xl overflow-hidden max-w-5xl w-full shadow-2xl relative"
              >
                {/* Close Button */}
                <button
                  id="close-lightbox-btn"
                  onClick={() => setLightboxItem(null)}
                  className="absolute top-4 right-4 z-30 p-2 text-purple-200 hover:text-white bg-purple-950/80 backdrop-blur-md rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-1 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Left Column - High fidelity art placement with touch swipe support */}
                  <div 
                    className={`lg:col-span-7 relative flex shadow-inner overflow-hidden aspect-square lg:aspect-auto focus:outline-none min-h-[320px] lg:min-h-[480px] touch-pan-y cursor-grab active:cursor-grabbing ${
                      ['da-cobwebs-glow', 'da-candlesticks', 'da-tears-hanging-tree'].includes(lightboxItem.id)
                        ? 'bg-[#fefdfe]'
                        : 'bg-purple-950'
                    }`}
                    style={
                      ['da-cobwebs-glow', 'da-candlesticks', 'da-tears-hanging-tree'].includes(lightboxItem.id)
                        ? { backgroundColor: '#fefdfe' }
                        : undefined
                    }
                    onTouchStart={handleLightboxTouchStart}
                    onTouchMove={handleLightboxTouchMove}
                    onTouchEnd={handleLightboxTouchEnd}
                  >
                    {/* Left Navigation Arrow */}
                    <button
                      id="lightbox-left-nav-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevLightboxItem();
                      }}
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 text-purple-200 hover:text-white bg-purple-950/80 backdrop-blur-md border border-purple-800/50 rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md flex items-center justify-center animate-fade-in"
                      aria-label="Previous artwork"
                    >
                      <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                    </button>

                    {/* Right Navigation Arrow */}
                    <button
                      id="lightbox-right-nav-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextLightboxItem();
                      }}
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 text-purple-200 hover:text-white bg-purple-950/80 backdrop-blur-md border border-purple-800/50 rounded-full transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-md flex items-center justify-center animate-fade-in"
                      aria-label="Next artwork"
                    >
                      <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                    </button>

                    <img
                      src={lightboxItem.imageUrl}
                      alt={lightboxItem.altText || lightboxItem.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain mx-auto"
                    />
                    
                    {/* Floating Brand Label */}
                    <div className="absolute bottom-4 left-4 flex space-x-1.5 items-center bg-purple-950/60 px-2.5 py-1 rounded-md backdrop-blur-sm border border-purple-800/30">
                      <span className="font-mono text-[8px] text-purple-300 tracking-wider">thedustyphoenix deviantart</span>
                    </div>
                  </div>

                  {/* Right Column - Specs and Link actions */}
                  <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-purple-850 min-h-[380px]">
                    <div>
                      {/* Title */}
                      <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-1 tracking-tight leading-tight">
                        {lightboxItem.title}
                      </h3>

                      {/* Created Date */}
                      <div className="flex items-center space-x-1.5 text-purple-300 text-xs font-mono mb-4">
                        <span>{lightboxItem.year}</span>
                      </div>

                      {/* Description */}
                      <div className="font-sans text-purple-100 text-sm leading-relaxed mb-6">
                        {renderDescriptionWithLinks(lightboxItem.description)}
                      </div>

                      {/* Tags Array */}
                      {lightboxItem.tags && lightboxItem.tags.length > 0 && (
                        <div className="mb-8">
                          <span className="font-mono text-[10px] text-purple-300 uppercase tracking-widest block mb-2 leading-none">
                            Tags:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {lightboxItem.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="px-2.5 py-1 text-[10px] font-mono text-purple-300 bg-purple-950/60 border border-purple-800/40 rounded-md font-medium font-mono"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer Actions */}
                    <div className="space-y-3 border-t border-purple-800 pt-6">
                      <a
                        href={lightboxItem.link || "https://www.deviantart.com/thedustyphoenix"}
                        target="_blank"
                        rel="noreferrer"
                        referrerPolicy="no-referrer"
                        className="flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-sans text-sm font-semibold tracking-wide transition-all shadow-md group cursor-pointer"
                      >
                        <span>View on DeviantArt</span>
                        <ExternalLink size={14} className="opacity-80 group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>

                  </div>

                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

import { ArrowUp, ExternalLink } from 'lucide-react';
import { STORE_LINKS, SOCIAL_LINKS, LOGO_IMAGE } from '../data';

interface FooterProps {
  onViewPolicy: () => void;
  onViewTerms: () => void;
  onOpenPrivacyChoices: () => void;
  onDoNotSell: () => void;
}

export default function Footer({ onViewPolicy, onViewTerms, onOpenPrivacyChoices, onDoNotSell }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-purple-950 text-purple-300 border-t border-purple-900 pt-4 pb-3 text-sm relative overflow-hidden" id="footer-widget">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-2 border-b border-purple-900/60">
          
          {/* Storefronts Directory Links Column */}
          <div className="md:col-span-4">
            <span className="block font-mono text-[10px] tracking-widest text-purple-300 uppercase font-bold mb-3 leading-none">
              Storefronts
            </span>
            <ul className="space-y-3">
              {STORE_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    id={`footer-store-${link.id}`}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    referrerPolicy="no-referrer"
                    className="group/foot flex items-center space-x-2 text-purple-300 hover:text-white transition-colors text-xs"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-300 group-hover/foot:bg-purple-200 transition-colors" />
                    <span>{link.name}</span>
                    <ExternalLink size={10} className="opacity-0 group-hover/foot:opacity-85 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Profiles & Portfolios Column */}
          <div className="md:col-span-4">
            <span className="block font-mono text-[10px] tracking-widest text-purple-300 uppercase font-bold mb-3 leading-none">
              Socials
            </span>
            <ul className="space-y-3">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    id={`footer-soc-${link.id}`}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    referrerPolicy="no-referrer"
                    className="group/foot flex items-center space-x-2 text-purple-300 hover:text-white transition-colors text-xs"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-purple-300 group-hover/foot:bg-purple-200 transition-colors" />
                    <span>{link.name}</span>
                    <ExternalLink size={10} className="opacity-0 group-hover/foot:opacity-85 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Column with logo aligned to the bottom right, and the brand title to its top left */}
          <div className="md:col-span-4 flex flex-col justify-start select-none w-full">
            <span className="font-display text-base tracking-widest font-extrabold text-white lowercase mb-2 self-start">
              thedustyphoenix
            </span>
            <img 
              src={LOGO_IMAGE} 
              alt="thedustyphoenix logo" 
              className="w-36 h-36 sm:w-40 sm:h-40 md:w-[200px] md:h-[200px] object-contain hover:rotate-2 hover:scale-[1.02] transition-transform duration-500 select-none filter brightness-110 self-end"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
          </div>

        </div>

        {/* Bottom copyright and Scroll-to-top */}
        <div className="pt-2 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="text-center md:text-left text-xs text-purple-300 font-sans flex flex-col md:flex-row md:items-center gap-2 md:gap-4 flex-wrap justify-center md:justify-start">
            <span>© {new Date().getFullYear()} thedustyphoenix. All rights reserved.</span>
            <button
              id="footer-terms-of-service-btn"
              onClick={onViewTerms}
              className="text-purple-400 hover:text-white underline transition-colors font-semibold cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              id="footer-privacy-policy-btn"
              onClick={onViewPolicy}
              className="text-purple-400 hover:text-white underline transition-colors font-semibold cursor-pointer"
            >
              Cookies & Privacy Policy
            </button>
            <button
              id="footer-privacy-choices-btn"
              onClick={onOpenPrivacyChoices}
              className="text-purple-400 hover:text-white underline transition-colors font-semibold cursor-pointer"
            >
              Your Privacy Choices
            </button>
            <button
              id="footer-do-not-sell-btn"
              onClick={onDoNotSell}
              className="text-purple-400 hover:text-white underline transition-colors font-semibold cursor-pointer"
            >
              Do Not Sell or Share My Personal Information
            </button>
          </div>

          <button
            id="scroll-to-top-footer-btn"
            onClick={handleScrollToTop}
            className="flex items-center space-x-2 p-2 px-3.5 rounded-xl bg-purple-900 hover:bg-purple-800 border border-purple-800 text-purple-100 hover:text-white font-sans text-xs font-semibold tracking-wide transition-all select-none active:scale-95 cursor-pointer shadow-sm flex-shrink-0"
          >
            <span>Back to top</span>
            <ArrowUp size={13} />
          </button>

        </div>

      </div>
    </footer>
  );
}

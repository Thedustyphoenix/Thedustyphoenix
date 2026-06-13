import { motion } from 'motion/react';
import { SOCIAL_LINKS } from '../data';

// Import social brand logos
import igLogo from '../assets/images/Instagram_Glyph_Gradient.png';
import daLogo from '../assets/images/DeviantArt_mark_green.png';
import pinLogo from '../assets/images/P-Badge-Red-RGB.png';
import fbLogo from '../assets/images/Facebook_Logo_Primary.png';
import tumLogo from '../assets/images/Tumblr_Logos_2018.03.06_t Icon Black.png';
import xLogo from '../assets/images/logo-black.png';

export default function AboutSection() {
  const getSocialLabel = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return "Instagram";
      case 'deviantart':
        return "DeviantArt";
      case 'pinterest':
        return "Pinterest";
      case 'facebook':
        return "Facebook";
      case 'tumblr':
        return "Tumblr";
      case 'twitter':
      case 'x':
        return "X";
      default:
        return platform;
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return igLogo;
      case 'deviantart':
        return daLogo;
      case 'pinterest':
        return pinLogo;
      case 'facebook':
        return fbLogo;
      case 'tumblr':
        return tumLogo;
      case 'twitter':
      case 'x':
        return xLogo;
      default:
        return null;
    }
  };

  return (
    <section id="studio-desk" className="relative py-6 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-purple-950 tracking-tight leading-tight mb-4">
          Socials
        </h2>

        {/* Elegant grid for Social Links matching the Shop style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SOCIAL_LINKS.map((link) => {
            const displayName = getSocialLabel(link.platform);
            const icon = getSocialIcon(link.platform);

            return (
              <motion.a
                id={link.id}
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -2 }}
                className="flex items-center px-6 py-4 rounded-xl bg-white border border-purple-200/40 hover:border-purple-400 shadow-sm hover:shadow-md transition-all group cursor-pointer w-full text-left"
              >
                <div className="flex items-center w-full max-w-[220px] mx-auto space-x-4">
                  {icon && (
                    <img
                      src={icon}
                      alt={`${displayName} icon`}
                      className="h-7 w-7 object-contain select-none flex-shrink-0"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  )}
                  <span className="font-display font-bold text-purple-950 text-base md:text-lg group-hover:text-purple-800 transition-colors text-left flex-grow whitespace-nowrap">
                    {displayName}
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>

      </div>
    </section>
  );
}

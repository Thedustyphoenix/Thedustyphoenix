import { motion } from 'motion/react';
import { STORE_LINKS } from '../data';

// Import shop brand logos
import rbLogo from '../assets/images/RB_Small_Red_RGB.png';
import tpLogo from '../assets/images/TP_wreath.png';
import zLogo from '../assets/images/circleZ_black.png';
import cpLogo from '../assets/images/NyyCF28m_400x400.jpg';

export default function StoreSection() {
  const getShopDisplayName = (id: string) => {
    switch (id) {
      case 'store-rb-gnomes':
        return "Dusty's Gnomes";
      case 'store-rb-holidays':
        return "Dusty's Holidays";
      case 'store-rb-portfolio':
        return "Redbubble";
      case 'store-teepublic':
        return "Teepublic";
      case 'store-zazzle':
        return "Zazzle";
      case 'store-cafepress':
        return "CafePress";
      default:
        return "";
    }
  };

  const getShopIcon = (id: string) => {
    if (id.startsWith('store-rb-') || id === 'store-rb-portfolio') {
      return rbLogo;
    }
    switch (id) {
      case 'store-teepublic':
        return tpLogo;
      case 'store-zazzle':
        return zLogo;
      case 'store-cafepress':
        return cpLogo;
      default:
        return null;
    }
  };

  const firstColOrder = ['store-zazzle', 'store-teepublic', 'store-cafepress'];
  const secondColOrder = ['store-rb-portfolio', 'store-rb-gnomes', 'store-rb-holidays'];

  const firstColLinks = firstColOrder
    .map(id => STORE_LINKS.find(link => link.id === id))
    .filter((link): link is NonNullable<typeof link> => !!link);

  const secondColLinks = secondColOrder
    .map(id => STORE_LINKS.find(link => link.id === id))
    .filter((link): link is NonNullable<typeof link> => !!link);

  const renderShopItem = (link: typeof STORE_LINKS[0]) => {
    const displayName = getShopDisplayName(link.id) || link.name;
    const icon = getShopIcon(link.id);

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
  };

  return (
    <section id="storefronts" className="relative py-6 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-4">
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-purple-950 mb-1.5 leading-tight">
            Shops
          </h2>
        </div>

        {/* 1. Official Storefronts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First vertical column: zazzle, teepublic, cafepress */}
          <div className="flex flex-col gap-6">
            {firstColLinks.map(renderShopItem)}
          </div>
          {/* Second vertical column: redbubble, dusty's gnomes, dusty's holidays */}
          <div className="flex flex-col gap-6 font-normal">
            {secondColLinks.map(renderShopItem)}
          </div>
        </div>

      </div>
    </section>
  );
}


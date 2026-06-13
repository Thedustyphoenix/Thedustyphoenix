import { StoreLink, SocialLink, Product, GalleryItem } from './types';

// Import our beautiful custom generated images
import logoImage from './assets/images/ooo_-_thedustyphoenix_logo_-_2_inch.png';
import bkgrdImage from './assets/images/V2-BkGrd-Thedustyphoenix.png';
import logoBigCircle from './assets/images/V2023-LogoBigCircle1-Thedustyphoenix2.png';
import btnShops from './assets/images/2023-Button-Shops02.png';
import btnGalleries from './assets/images/2023-Button-GalleriesSocials02.png';
import btnOddsEnds from './assets/images/2023-Button-OddsEnds02.png';
import starBullet from './assets/images/2023-StarBullet-Purp01.png';

export const HERO_IMAGE = bkgrdImage;
export const LOGO_IMAGE = logoImage;
export const BKGRD_IMAGE = bkgrdImage;
export const LOGO_BIG_CIRCLE = logoBigCircle;
export const BTN_SHOPS = btnShops;
export const BTN_GALLERIES = btnGalleries;
export const BTN_ODDS_ENDS = btnOddsEnds;
export const STAR_BULLET = starBullet;

export const STORE_LINKS: StoreLink[] = [
  {
    id: 'store-zazzle',
    name: "Zazzle",
    url: "http://www.zazzle.com/thedustyphoenix",
    platform: 'zazzle',
    description: "Customizable paper products, personalized holiday tags, high-end invitations, custom cushions, and crafted stationery.",
    category: ['stationery', 'gifts', 'decor'],
    imageUrl: logoBigCircle
  },
  {
    id: 'store-teepublic',
    name: "TeePublic",
    url: "https://www.teepublic.com/user/thedustyphoenix",
    platform: 'teepublic',
    description: "Casual apparel, t-shirts, cozy hoodies, and tote bags imprinted with clean Phoenix and mythical folk art illustrations.",
    category: ['apparel', 'gifts'],
    imageUrl: logoBigCircle
  },
  {
    id: 'store-cafepress',
    name: "CafePress",
    url: "https://www.cafepress.com/profile/thedustyphoenix",
    platform: 'cafepress',
    description: "Charming home accents, kitchenware, coffee tumblers, pillowcases, and kitchen towels featuring classic rustic paintings.",
    category: ['kitchen', 'home', 'gifts'],
    imageUrl: logoBigCircle
  },
  {
    id: 'store-rb-portfolio',
    name: "Redbubble",
    url: "https://www.redbubble.com/people/thedustyphoenix/portfolio",
    platform: 'redbubble',
    description: "Browse premium photographic prints, canvases, acrylic blocks, and phone cases featuring original fine art and mythical phoenix collections.",
    category: ['phoenix', 'prints', 'decor'],
    imageUrl: logoBigCircle
  },
  {
    id: 'store-rb-gnomes',
    name: "Dusty's Gnomes - Redbubble",
    url: "https://www.redbubble.com/people/dustysgnomes",
    platform: 'redbubble',
    description: "Our whimsical gnome-dedicated workshop on Redbubble. Find cozy gnome illustrations, apparel, mugs, and whimsical decor prints.",
    category: ['gnomes', 'prints', 'gifts'],
    imageUrl: logoBigCircle
  },
  {
    id: 'store-rb-holidays',
    name: "Dusty's Holidays - Redbubble",
    url: "https://www.redbubble.com/people/DustyHolidays/shop?asc=u",
    platform: 'redbubble',
    description: "Celebrate the seasons with custom holiday gnomes, festive autumn items, cozy Christmas gear, and greeting cards.",
    category: ['holiday', 'cards', 'stickers'],
    imageUrl: logoBigCircle
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'soc-deviantart',
    name: "DeviantArt",
    url: "https://www.deviantart.com/thedustyphoenix",
    platform: 'deviantart',
    description: ""
  },
  {
    id: 'soc-instagram',
    name: "Instagram",
    url: "https://www.instagram.com/thedustyphoenix/",
    platform: 'instagram',
    description: ""
  },
  {
    id: 'soc-pinterest',
    name: "Pinterest",
    url: "https://www.pinterest.com/thedustyphoenix/",
    platform: 'pinterest',
    description: ""
  },
  {
    id: 'soc-facebook',
    name: "Facebook",
    url: "https://www.facebook.com/pages/thedustyphoenix/169899653111755",
    platform: 'facebook',
    description: ""
  },
  {
    id: 'soc-twitter',
    name: "X",
    url: "https://twitter.com/thedustyphoenix",
    platform: 'twitter',
    description: ""
  },
  {
    id: 'soc-tumblr',
    name: "Tumblr",
    url: "https://thedustyphoenix.tumblr.com/",
    platform: 'tumblr',
    description: ""
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-forest-gnome',
    title: "Whimsical Guardian Forest Gnome",
    description: "Charming garden gnome design, individually hand-drawn and illustrated. Features a beautiful long textured beard, moss-covered pointy green hat, and holds a delicate miniature lantern.",
    category: 'gnomes',
    priceCategory: "$$",
    imageUrl: logoBigCircle,
    featured: true,
    shopLinks: [
      { platformName: "thedustyphoenix (Redbubble)", url: "https://www.redbubble.com/people/dustysgnomes" },
      { platformName: "TeePublic Merch Shop", url: "https://www.teepublic.com/user/thedustyphoenix" }
    ]
  },
  {
    id: 'prod-rising-phoenix',
    title: "The Rising Phoenix Heritage Plaque",
    description: "Fierce and magical phoenix emblem design on a rustic heartwood background. Intricately illustrated with layers of crimson wash, rich burnt sienna, and hand-gilded metallic gold details.",
    category: 'phoenix',
    priceCategory: "$$$",
    imageUrl: logoBigCircle,
    featured: true,
    shopLinks: [
      { platformName: "thedustyphoenix (Redbubble)", url: "https://www.redbubble.com/people/thedustyphoenix/portfolio" },
      { platformName: "Zazzle Crafts Station", url: "http://www.zazzle.com/thedustyphoenix" }
    ]
  },
  {
    id: 'prod-cozy-holiday',
    title: "Rustic Holiday Hearth Ornaments",
    description: "Delightful seasonal collection containing a hand-designed birch star illustration, pine cone snowman, and a rustic burlap and twig motif. Styled for a magical winter look.",
    category: 'holiday',
    priceCategory: "$",
    imageUrl: logoBigCircle,
    featured: true,
    shopLinks: [
      { platformName: "thedustyphoenix (Redbubble)", url: "https://www.redbubble.com/people/DustyHolidays/shop?asc=u" },
      { platformName: "Zazzle Ornaments", url: "http://www.zazzle.com/thedustyphoenix" }
    ]
  },
  {
    id: 'prod-mystic-owl',
    title: "Sage Owl Original Art Print",
    description: "A gorgeous illustrated design depicting a roosting barn owl with intricate feather details. Creates a tranquil, atmospheric feel for any reading or workspace.",
    category: 'paintings',
    priceCategory: "$$",
    imageUrl: logoBigCircle,
    featured: false,
    shopLinks: [
      { platformName: "CafePress Home Goods", url: "https://www.cafepress.com/profile/thedustyphoenix" },
      { platformName: "Zazzle Store", url: "http://www.zazzle.com/thedustyphoenix" }
    ]
  },
  {
    id: 'prod-autumn-watercolor',
    title: "Autumn Canopy Watercolor Print",
    description: "A cozy watercolor rendering of a hidden forest glen blanketed in deep amber and rust-colored leaves. Printed on heavy textured watercolor paper to capture the high dynamics of the original painting.",
    category: 'paintings',
    priceCategory: "$$",
    imageUrl: logoBigCircle,
    featured: false,
    shopLinks: [
      { platformName: "Redbubble Portfolio Shop", url: "https://www.redbubble.com/people/thedustyphoenix/portfolio" }
    ]
  },
  {
    id: 'prod-fairytale-shroom',
    title: "Fairy Mushroom Novelty Cup",
    description: "Whimsical novelty mug decorated with a cute mushroom cap illustration to keep your drinks cozy. Styled with rich red tones and white woodland spots, complete with an oak branch handle.",
    category: 'gnomes',
    priceCategory: "$$",
    imageUrl: logoBigCircle,
    featured: false,
    shopLinks: [
      { platformName: "thedustyphoenix (Redbubble)", url: "https://www.redbubble.com/people/dustysgnomes" },
      { platformName: "CafePress Giftware", url: "https://www.cafepress.com/profile/thedustyphoenix" }
    ]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gall-woodland-gnomes',
    title: "Gnome Realm Illustrations",
    description: "A close view of our rustic forest gnome character designs. Each gnome possesses a distinct personality and custom illustrated accessories.",
    imageUrl: logoBigCircle,
    year: "2025",
    tags: ["gnomes", "character design", "woodland", "illustration"]
  },
  {
    id: 'gall-phoenix-rising',
    title: "Rising from Flame Ashes",
    description: "Our signature logo art representing rejuvenation and handmade spirit. Combines deep mahogany woodcrafting with warm metallic acrylic finishes.",
    imageUrl: logoBigCircle,
    year: "2026",
    tags: ["phoenix", "logo", "folk art", "brand", "emblem"]
  },
  {
    id: 'gall-cozy-hinterland',
    title: "Cozy Holiday Rustic Flatlay",
    description: "A curated visual array of our Winter solstice ornaments. Combining raw natural elements like pinecones, cedar branches, burlap, and warm ambient light.",
    imageUrl: logoBigCircle,
    year: "2025",
    tags: ["holiday", "wreaths", "christmas", "cozy"]
  },
  {
    id: 'gall-twilight-forest',
    title: "Twilight Forest Whispers",
    description: "A dark mystical oil landscape capturing the transition of evening into deep night, painted on reclaimed barn wood panel.",
    imageUrl: logoBigCircle,
    year: "2024",
    tags: ["oil painting", "landscape", "barnwood", "mystical"]
  },
  {
    id: 'gall-phoenix-sketchbook',
    title: "Mythological Sketches & Studies",
    description: "Original carbon pencil study logs of wing postures and avian plumage shapes, laid out in our primary studio diary.",
    imageUrl: logoBigCircle,
    year: "2025",
    tags: ["sketches", "phoenix", "avian", "study"]
  },
  {
    id: 'gall-fairy-lanterns',
    title: "Toadstool Fairy Lanterns Illustration",
    description: "Warm magical illustrations showing fairy mushroom lanterns casting speckled light silhouettes across forest glades.",
    imageUrl: logoBigCircle,
    year: "2026",
    tags: ["lanterns", "gnomes", "lighting", "illustration"]
  }
];

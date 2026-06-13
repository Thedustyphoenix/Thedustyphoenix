export interface StoreLink {
  id: string;
  name: string;
  url: string;
  platform: 'teepublic' | 'zazzle' | 'cafepress' | 'redbubble' | 'deviantart' | 'social';
  description: string;
  category: string[];
  imageUrl: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  platform: 'facebook' | 'instagram' | 'twitter' | 'tumblr' | 'pinterest' | 'deviantart';
  description: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: 'gnomes' | 'phoenix' | 'holiday' | 'paintings' | 'ceramics';
  priceCategory: string;
  imageUrl: string;
  featured: boolean;
  shopLinks: {
    platformName: string;
    url: string;
  }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  year: string;
  tags: string[];
  link?: string;
  altText?: string;
}

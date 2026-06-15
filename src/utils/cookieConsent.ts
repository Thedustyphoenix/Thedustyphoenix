export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  decided: boolean;
  gpcApplied: boolean;
}

const STORAGE_KEY = 'thedustyphoenix-cookie-consent';

export function isGPCActive(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = window.navigator as any;
  // GPC can be on navigator or window
  return (
    nav.globalPrivacyControl === true || 
    nav.globalPrivacyControl === '1' ||
    (window as any).globalPrivacyControl === true ||
    (window as any).globalPrivacyControl === '1'
  );
}

export function getConsentPreferences(): CookieConsent {
  if (typeof window === 'undefined') {
    return { essential: true, analytics: false, marketing: false, decided: false, gpcApplied: false };
  }
  
  const gpc = isGPCActive();
  const stored = localStorage.getItem(STORAGE_KEY);
  const termsAccepted = localStorage.getItem('thedustyphoenix-terms-accepted') === 'true';
  
  if (stored && termsAccepted) {
    try {
      const parsed = JSON.parse(stored);
      return {
        essential: true,
        // Override with opt-out if GPC is active and there is no manual user override
        analytics: gpc && !parsed.userOverride ? false : (parsed.analytics ?? false),
        marketing: gpc && !parsed.userOverride ? false : (parsed.marketing ?? false),
        decided: true,
        gpcApplied: gpc && !parsed.userOverride,
      };
    } catch (e) {
      // ignore parse issues
    }
  }
  
  // If either progress hasn't been saved or terms haven't been accepted, the user has not decided yet.
  // We opt them out of tracking/analytics by default, but set decided is false so they must interact with the banner.
  return {
    essential: true,
    analytics: false,
    marketing: false,
    decided: false,
    gpcApplied: gpc,
  };
}

export function initializeThirdPartyScripts(consent: CookieConsent) {
  if (typeof window === 'undefined') return;

  const win = window as any;
  win.dataLayer = win.dataLayer || [];
  if (!win.gtag) {
    win.gtag = function gtag() {
      win.dataLayer.push(arguments);
    };
  }

  // 1. SET commands MUST run BEFORE update commands!
  if (!consent.marketing) {
    win.gtag('set', 'restricted_data_processing', true);
    win.gtag('set', 'allow_google_signals', false);
  } else {
    win.gtag('set', 'restricted_data_processing', false);
    win.gtag('set', 'allow_google_signals', true);
  }

  // 2. Now UPDATE the consent parameters
  win.gtag('consent', 'update', {
    'analytics_storage': consent.analytics ? 'granted' : 'denied',
    'ad_storage': consent.marketing ? 'granted' : 'denied',
    'ad_user_data': consent.marketing ? 'granted' : 'denied',
    'ad_personalization': consent.marketing ? 'granted' : 'denied',
    'personalization_storage': consent.marketing ? 'granted' : 'denied',
    'functionality_storage': 'granted',
    'security_storage': 'granted'
  });

  // 2b. Dispatch a custom dataLayer event to force re-evaluation of non-Consent Mode GTM tags
  win.dataLayer.push({
    'event': 'consent_update',
    'analytics_consent': consent.analytics ? 'granted' : 'denied',
    'marketing_consent': consent.marketing ? 'granted' : 'denied'
  });

  // Track the 'us_privacy_optout' key in localStorage for state privacy laws parity
  const optedOut = consent.gpcApplied || (consent.decided && !consent.analytics && !consent.marketing);
  localStorage.setItem('us_privacy_optout', optedOut ? 'true' : 'false');

  // Clear or load analytics
  if (!consent.analytics) {
    removeScript('google-analytics');
    removeScript('gtag-js-analytics');
    // Clear typical Google Analytics cookies
    clearCookiesByPattern(/^_ga/);
  } else {
    loadGA4();
  }

  // Clear or load marketing
  if (!consent.marketing) {
    removeScript('google-ads');
    removeScript('facebook-pixel');
    // Clear advertising globals
    try {
      delete win.fbq;
      delete win._fbq;
    } catch (e) {
      win.fbq = undefined;
      win._fbq = undefined;
    }
    // Clear advertising cookies
    clearCookiesByPattern(/^_fbp|_fbc|_gcl/);
  } else {
    loadGoogleAds();
    loadMetaPixel();
  }
}

function removeScript(id: string) {
  const scriptObj = document.getElementById(id);
  if (scriptObj) {
    scriptObj.parentNode?.removeChild(scriptObj);
  }
  
  // Force removal of script tags running these analytics/marketing sources
  const scripts = Array.from(document.getElementsByTagName('script'));
  for (let i = scripts.length - 1; i >= 0; i--) {
    const s = scripts[i];
    const src = s.src || '';
    const text = s.textContent || '';
    
    // Safety check - NEVER remove the core GTM script container or elements containing GTM- identifier
    if (src.includes('GTM-') || text.includes('GTM-')) {
      continue;
    }
    
    if (
      (id === 'google-analytics' && (src.includes('googletagmanager.com') && src.includes('G-'))) ||
      (id === 'google-analytics' && text.includes('G-8BXLG41LNL')) ||
      (id === 'gtag-js-analytics' && src.includes('G-8BXLG41LNL')) ||
      (id === 'google-ads' && src.includes('googletagmanager.com') && src.includes('AW-')) ||
      (id === 'facebook-pixel' && (src.includes('connect.facebook.net') || text.includes('fbq(')))
    ) {
      // Prevent deleting the standalone inline default google-consent state block
      if (src === '' && text.includes("consent', 'default'")) {
        continue;
      }
      s.parentNode?.removeChild(s);
    }
  }
}

function clearCookiesByPattern(regex: RegExp) {
  try {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      if (regex.test(name)) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
        
        // Handle common subdomains or domain wildcards
        const hostParts = window.location.hostname.split('.');
        if (hostParts.length > 1) {
          const domain = '.' + hostParts.slice(-2).join('.');
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
        }
      }
    }
  } catch (e) {
    console.error("Error clearing cookies:", e);
  }
}

function loadGA4() {
  const GA_ID = 'G-8BXLG41LNL'; // Google Tag Manager ID
  if (document.getElementById('gtag-js-analytics')) return;
  
  (window as any).dataLayer = (window as any).dataLayer || [];
  if (!(window as any).gtag) {
    (window as any).gtag = function gtag() {
      (window as any).dataLayer.push(arguments);
    };
  }
  const gtag = (window as any).gtag;
  gtag('js', new Date());
  gtag('config', GA_ID, { 'anonymize_ip': true });

  const script = document.createElement('script');
  script.id = 'gtag-js-analytics';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

function loadGoogleAds() {
  const AW_ID = 'AW-11234567890'; // General Art Marketing Ad tag placeholder
  if (document.getElementById('google-ads')) return;

  (window as any).dataLayer = (window as any).dataLayer || [];
  if (!(window as any).gtag) {
    (window as any).gtag = function gtag() {
      (window as any).dataLayer.push(arguments);
    };
  }
  const gtag = (window as any).gtag;
  gtag('js', new Date());
  gtag('config', AW_ID);

  const script = document.createElement('script');
  script.id = 'google-ads';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${AW_ID}`;
  document.head.appendChild(script);
}

function loadMetaPixel() {
  const PIXEL_ID = '123456789012345'; // Whimsical Arts Pixel placeholder
  if (document.getElementById('facebook-pixel')) return;

  const fbq: any = function(...args: any[]) {
    fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args);
  };
  (window as any).fbq = fbq;
  if (!(window as any)._fbq) (window as any)._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];

  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');

  const script = document.createElement('script');
  script.id = 'facebook-pixel';
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
}

export function saveConsentPreferences(consent: { analytics: boolean; marketing: boolean; userOverride?: boolean }): CookieConsent {
  if (typeof window === 'undefined') {
    return { essential: true, analytics: false, marketing: false, decided: false, gpcApplied: false };
  }
  
  const gpc = isGPCActive();
  const rawPreferences = {
    analytics: consent.analytics,
    marketing: consent.marketing,
    userOverride: consent.userOverride ?? true, // true means manual choices, false means automatic
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rawPreferences));
  
  const updatedpreferences: CookieConsent = {
    essential: true,
    analytics: consent.analytics,
    marketing: consent.marketing,
    decided: true,
    gpcApplied: gpc && !rawPreferences.userOverride,
  };
  
  // Re-apply actions on scripts and cookies
  initializeThirdPartyScripts(updatedpreferences);
  return updatedpreferences;
}

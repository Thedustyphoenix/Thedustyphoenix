import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Settings, X, Check, Lock, ShieldAlert } from 'lucide-react';
import { 
  getConsentPreferences, 
  saveConsentPreferences, 
  isGPCActive, 
  CookieConsent 
} from '../utils/cookieConsent';
import { LOGO_IMAGE } from '../data';

interface CookieConsentBannerProps {
  onViewPolicy: () => void;
  onViewTerms: () => void;
  onConsentChanged: (consent: CookieConsent) => void;
  triggerOpenCount?: number;
  triggerDoNotSellCount?: number;
}

export default function CookieConsentBanner({ 
  onViewPolicy, 
  onViewTerms,
  onConsentChanged,
  triggerOpenCount = 0,
  triggerDoNotSellCount = 0
}: CookieConsentBannerProps) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [lockNotice, setLockNotice] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Custom draft selections when customizing
  const [draftAnalytics, setDraftAnalytics] = useState(false);
  const [draftMarketing, setDraftMarketing] = useState(false);
  const [draftDoNotSell, setDraftDoNotSell] = useState(false);
  const [gpcDetected, setGpcDetected] = useState(false);

  useEffect(() => {
    // Determine active consent
    const activeConsent = getConsentPreferences();
    setConsent(activeConsent);
    const gpc = isGPCActive();
    setGpcDetected(gpc);
    
    // Sync draft choices to current settings
    setDraftAnalytics(activeConsent.analytics);
    setDraftMarketing(activeConsent.marketing);
    
    const optOutSignal = gpc || (localStorage.getItem('us_privacy_optout_explicit') === 'true');
    setDraftDoNotSell(optOutSignal);

    const stored = localStorage.getItem('thedustyphoenix-cookie-consent');
    const acceptedSaved = localStorage.getItem('thedustyphoenix-terms-accepted') === 'true';
    
    if (!stored || !acceptedSaved) {
      setShowBanner(true);
    }

    if (acceptedSaved) {
      setTermsAccepted(true);
    }
  }, []);

  // Listen to parent triggers to open & configure
  useEffect(() => {
    if (triggerOpenCount > 0) {
      setShowBanner(true);
      setIsCustomizing(true);
      const activeConsent = getConsentPreferences();
      setDraftAnalytics(activeConsent.analytics);
      setDraftMarketing(activeConsent.marketing);
      
      const optOutSignal = isGPCActive() || (localStorage.getItem('us_privacy_optout_explicit') === 'true');
      setDraftDoNotSell(optOutSignal);
    }
  }, [triggerOpenCount]);

  useEffect(() => {
    if (triggerDoNotSellCount > 0) {
      // Immediately run the opt-out & save!
      localStorage.setItem('us_privacy_optout_explicit', 'true');
      const nextConsent = saveConsentPreferences({
        analytics: false,
        marketing: false,
        userOverride: true
      });
      setConsent(nextConsent);
      onConsentChanged(nextConsent);
      
      // Sync draft choices to match the lock down
      setDraftAnalytics(false);
      setDraftMarketing(false);
      setDraftDoNotSell(true);
      
      // Open banner and details so they see the proof
      setShowBanner(true);
      setIsCustomizing(true);
      
      // Flash notice
      setLockNotice(true);
      const timer = setTimeout(() => setLockNotice(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [triggerDoNotSellCount]);

  const handleDoNotSellLock = () => {
    localStorage.setItem('us_privacy_optout_explicit', 'true');
    const nextConsent = saveConsentPreferences({
      analytics: false,
      marketing: false,
      userOverride: true
    });
    setConsent(nextConsent);
    onConsentChanged(nextConsent);
    setDraftAnalytics(false);
    setDraftMarketing(false);
    setDraftDoNotSell(true);
    
    // Switch on customizing detail if it wasn't already to let them see it is turned off
    setIsCustomizing(true);
    
    // We can show a temporary notice of locking down
    setLockNotice(true);
    const timer = setTimeout(() => setLockNotice(false), 4000);
    return () => clearTimeout(timer);
  };

  if (!consent || !showBanner) return null;

  const handleAcceptAll = () => {
    localStorage.setItem('us_privacy_optout_explicit', 'false');
    localStorage.setItem('thedustyphoenix-terms-accepted', 'true');
    setTermsAccepted(true);
    const nextConsent = saveConsentPreferences({
      analytics: false,
      marketing: true,
      userOverride: true
    });
    setConsent(nextConsent);
    onConsentChanged(nextConsent);
    setDraftAnalytics(false);
    setDraftMarketing(true);
    setDraftDoNotSell(false);
    setShowBanner(false);
  };

  const handleDeclineAll = () => {
    localStorage.setItem('us_privacy_optout_explicit', 'false');
    localStorage.setItem('thedustyphoenix-terms-accepted', 'true');
    setTermsAccepted(true);
    const nextConsent = saveConsentPreferences({
      analytics: false,
      marketing: false,
      userOverride: true
    });
    setConsent(nextConsent);
    onConsentChanged(nextConsent);
    setDraftAnalytics(false);
    setDraftMarketing(false);
    setDraftDoNotSell(false);
    setShowBanner(false);
  };

  const handleSaveCustom = () => {
    const actAnalytics = draftDoNotSell ? false : draftAnalytics;
    const actMarketing = draftDoNotSell ? false : draftMarketing;
    
    localStorage.setItem('us_privacy_optout_explicit', draftDoNotSell ? 'true' : 'false');
    localStorage.setItem('thedustyphoenix-terms-accepted', 'true');
    setTermsAccepted(true);
    
    const nextConsent = saveConsentPreferences({
      analytics: actAnalytics,
      marketing: actMarketing,
      userOverride: true
    });
    setConsent(nextConsent);
    onConsentChanged(nextConsent);
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-purple-950/85 backdrop-blur-xl cursor-not-allowed"
            id="cookie-consent-backdrop"
          />
          
          {/* Logo container above the banner */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 125 }}
            className="z-50 mb-4 flex flex-shrink-0 justify-center select-none"
            id="cookie-consent-logo-container"
          >
            <img 
              src={LOGO_IMAGE} 
              alt="thedustyphoenix logo" 
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain filter drop-shadow-[0_8px_16px_rgba(107,33,168,0.35)] select-none brightness-110"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          
          {/* Center-aligned Modal Banner */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 125 }}
            className="relative w-full max-w-lg bg-white/95 backdrop-blur-md border border-purple-200/90 rounded-2xl shadow-2xl overflow-hidden font-sans text-purple-950 z-50 my-auto"
            id="cookie-consent-widget"
          >
            <div className="p-5 md:p-6 space-y-4">
              
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display font-bold text-sm tracking-wide lowercase">
                    thedustyphoenix • terms & privacy
                  </h3>
                  <p className="text-[10px] uppercase font-mono tracking-wider text-purple-600 font-bold">
                    Consent Agreement & Privacy Choices
                  </p>
                </div>
                
                {localStorage.getItem('thedustyphoenix-terms-accepted') === 'true' && termsAccepted && (
                  <button
                    onClick={() => setShowBanner(false)}
                    className="text-purple-400 hover:text-purple-600 p-1 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                    id="close-cookie-banner-btn"
                    title="Dismiss"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Description */}
              <div className="text-xs text-purple-800 font-medium leading-relaxed">
                <p>
                  To help our site function and to understand how you engage with our site, we use cookies and tracking technologies.
                </p>
              </div>

              {/* Click-wrap terms and privacy agreement */}
              <div className="p-3.5 bg-purple-50/50 rounded-xl border border-purple-200/60 flex items-start space-x-2.5 text-xs text-purple-950 select-none">
                <input 
                  type="checkbox"
                  id="terms-clickwrap-checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 w-4.5 h-4.5 text-purple-900 border-purple-200 rounded focus:ring-purple-500 cursor-pointer"
                />
                <label htmlFor="terms-clickwrap-checkbox" className="leading-relaxed cursor-pointer font-medium text-purple-900">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={onViewTerms}
                    className="text-purple-700 hover:text-purple-900 underline font-bold focus-visible:outline-none"
                  >
                    Terms of Service
                  </button>{' '}
                  and confirm I have read the{' '}
                  <button
                    type="button"
                    onClick={onViewPolicy}
                    className="text-purple-700 hover:text-purple-900 underline font-bold focus-visible:outline-none"
                  >
                    Cookies & Privacy Policy
                  </button>.
                </label>
              </div>

              {/* GPC Signal Notice if active */}
              {gpcDetected && (
                <div className="flex items-start space-x-2 p-3 bg-emerald-50 border border-emerald-200/60 rounded-xl text-emerald-900 text-[11px] font-medium leading-normal">
                  <ShieldCheck size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Global Privacy Control (GPC) Detected:</strong> We have automatically opted you out of tracking cookies to respect your browser privacy settings!
                  </span>
                </div>
              )}

              {/* Do Not Sell / Opt-Out Lock Notice */}
              {lockNotice && (
                <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200/60 rounded-xl text-red-900 text-[11px] font-semibold leading-normal animate-pulse shadow-sm">
                  <Lock size={15} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Privacy Settings Locked:</strong> Opted-out from all analytics, advertising, third-party tracking, and data selling/sharing under state privacy laws!
                  </span>
                </div>
              )}

              {/* Customization panel */}
              {isCustomizing && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="space-y-3 bg-purple-50/50 border border-purple-100 rounded-xl p-3 text-xs overflow-hidden max-h-60 overflow-y-auto"
                >
                  <h4 className="font-bold text-xs uppercase tracking-wider font-mono text-purple-800">
                    Manage Preferences:
                  </h4>
                  
                  {/* Category 1: Essential (Required) */}
                  <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-purple-100/50 shadow-sm">
                    <div className="pr-3">
                      <div className="flex items-center space-x-1.5 font-bold text-[12px] text-purple-950">
                        <span>Essential Session Cookies</span>
                        <Lock size={11} className="text-purple-500" />
                      </div>
                      <p className="text-[10px] text-purple-600/80 mt-0.5 leading-snug">
                        Required for basic site navigation, cart persistence, and layout.
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] uppercase font-mono font-bold bg-purple-150 text-purple-700">
                      Required
                    </span>
                  </div>

                  {/* Do Not Sell / Share Opt-Out */}
                  <label className="flex items-center justify-between p-2.5 bg-red-50/40 rounded-lg border border-red-200/60 shadow-sm cursor-pointer hover:border-red-300 transition-all select-none">
                    <div className="pr-3">
                      <span className="font-bold text-[12px] text-red-950 block">Do Not Sell or Share My Info</span>
                      <p className="text-[10px] text-red-800/80 mt-0.5 leading-snug">
                        Checking this opts you out of all third-party tracking and data selling/sharing under state privacy laws.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={draftDoNotSell}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setDraftDoNotSell(checked);
                        if (checked) {
                          setDraftAnalytics(false);
                          setDraftMarketing(false);
                        }
                      }}
                      className="w-4 h-4 text-red-600 border-red-300 rounded focus:ring-red-500"
                    />
                  </label>

                  {/* Category 2: Analytics (GA4) */}
                  <label className={`flex items-center justify-between p-2 bg-white rounded-lg border border-purple-100/50 shadow-sm select-none ${draftDoNotSell || gpcDetected ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:border-purple-300 transition-all'}`}>
                    <div className="pr-3">
                      <span className="font-bold text-[12px] text-purple-950 block">Analytics & Audience (GA4)</span>
                      <p className="text-[10px] text-purple-600/80 mt-0.5 leading-snug">
                        Helps us understand which art pieces and shops are most popular.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={draftAnalytics}
                      disabled={draftDoNotSell || gpcDetected} // GPC or Do Not Sell locks GA4
                      onChange={(e) => setDraftAnalytics(e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500"
                    />
                  </label>

                  {/* Category 3: Marketing & Ads (Google Ads, Pixels) */}
                  <label className={`flex items-center justify-between p-2 bg-white rounded-lg border border-purple-100/50 shadow-sm select-none ${draftDoNotSell || gpcDetected ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:border-purple-300 transition-all'}`}>
                    <div className="pr-3">
                      <span className="font-bold text-[12px] text-purple-950 block">Marketing Pixels & Ads</span>
                      <p className="text-[10px] text-purple-600/80 mt-0.5 leading-snug">
                        Tracks conversion paths from our TeePublic, Zazzle and Redbubble stores.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={draftMarketing}
                      disabled={draftDoNotSell || gpcDetected} // GPC or Do Not Sell locks Ads
                      onChange={(e) => setDraftMarketing(e.target.checked)}
                      className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500"
                    />
                  </label>

                  {/* Do Not Sell Or Share Action Block */}
                  <div className="p-2.5 bg-red-50/50 border border-red-150 rounded-xl flex flex-col gap-2">
                    <div className="space-y-0.5">
                      <span className="font-bold text-[11px] text-red-950 block">Do Not Sell or Share My Info</span>
                      <p className="text-[9px] text-red-800 leading-tight">
                        Opt-out and deactivate all analytics tracking, behavioral cookies, and ads personalization tags under state privacy laws.
                      </p>
                    </div>
                    <button
                      id="cookie-banner-do-not-sell-block-btn"
                      onClick={handleDoNotSellLock}
                      className="w-full py-1.5 bg-red-700 hover:bg-red-800 text-white font-bold text-[10px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center justify-center space-x-1"
                    >
                      <Lock size={10} />
                      <span>Opt Out & Lock Down Preferences</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col gap-2 pt-1 font-sans">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="cookie-banner-accept-all"
                    onClick={handleAcceptAll}
                    disabled={!termsAccepted}
                    className={`px-4 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-sm flex items-center justify-center space-x-1 cursor-pointer ${
                      termsAccepted 
                        ? 'bg-purple-950 text-white hover:bg-purple-900 focus-visible:ring-2 focus-visible:ring-purple-600' 
                        : 'bg-purple-200 text-purple-400 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <Check size={13} />
                    <span>Accept All</span>
                  </button>
                  
                  <button
                    id="cookie-banner-decline-all"
                    onClick={handleDeclineAll}
                    disabled={!termsAccepted}
                    className={`px-4 py-2.5 rounded-xl border font-semibold text-xs transition-all flex items-center justify-center space-x-1 cursor-pointer ${
                      termsAccepted 
                        ? 'bg-purple-50 text-purple-900 border-purple-200/60 hover:bg-purple-100/60 focus-visible:ring-2 focus-visible:ring-purple-600' 
                        : 'bg-purple-50 text-purple-300 border-purple-100 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <span>Essentials Only</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <button
                    id="cookie-banner-customize"
                    onClick={() => setIsCustomizing(!isCustomizing)}
                    className="flex items-center space-x-1 text-purple-705 font-bold hover:text-purple-900 transition-colors cursor-pointer"
                  >
                    <Settings size={12} />
                    <span>{isCustomizing ? 'Hide details' : 'Customize preferences'}</span>
                  </button>

                  {isCustomizing ? (
                    <button
                      id="cookie-banner-save-custom"
                      onClick={handleSaveCustom}
                      disabled={!termsAccepted}
                      className={`px-3 py-1.5 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
                        termsAccepted 
                          ? 'bg-purple-800 text-white hover:bg-purple-900' 
                          : 'bg-purple-200 text-purple-400 cursor-not-allowed opacity-60'
                      }`}
                    >
                      Save settings
                    </button>
                  ) : (
                    <button
                      id="cookie-banner-view-policy"
                      onClick={onViewPolicy}
                      className="text-purple-600 hover:text-purple-800 underline font-semibold cursor-pointer"
                    >
                      Cookie & Privacy Policy
                    </button>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Cookie, 
  Settings, 
  Lock, 
  ExternalLink, 
  Eye, 
  CheckCircle, 
  RotateCcw,
  ArrowLeft
} from 'lucide-react';
import { 
  getConsentPreferences, 
  saveConsentPreferences, 
  isGPCActive, 
  CookieConsent 
} from '../utils/cookieConsent';
import { StarDivider } from '../App';
import { 
  LOGO_BIG_CIRCLE, 
  STORE_LINKS, 
  SOCIAL_LINKS 
} from '../data';

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
}

export default function PrivacyPolicyPage({ onBackToHome }: PrivacyPolicyPageProps) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [gpcActive, setGpcActive] = useState(false);
  const [doNotSellActive, setDoNotSellActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const activeConsent = getConsentPreferences();
    setConsent(activeConsent);
    const gpc = isGPCActive();
    setGpcActive(gpc);
    
    const isOptedOut = gpc || (localStorage.getItem('us_privacy_optout_explicit') === 'true');
    setDoNotSellActive(isOptedOut);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  if (!consent) return null;

  const handleTogglePreference = (category: 'analytics' | 'marketing', checked: boolean) => {
    const nextConsent = saveConsentPreferences({
      analytics: category === 'analytics' ? checked : consent.analytics,
      marketing: category === 'marketing' ? checked : consent.marketing,
      userOverride: true
    });
    setConsent(nextConsent);
    
    // If they explicitly enable a cookie category, we turn off the "Do Not Sell" locked state
    if (checked) {
      setDoNotSellActive(false);
      localStorage.setItem('us_privacy_optout_explicit', 'false');
    }
    
    // Trigger flash success message
    setSuccessMessage(true);
    const id = setTimeout(() => setSuccessMessage(false), 2500);
    return () => clearTimeout(id);
  };

  const handleResetPreferences = () => {
    const nextConsent = saveConsentPreferences({
      analytics: false,
      marketing: false,
      userOverride: false // trigger defaults again (or respect GPC)
    });
    setConsent(nextConsent);
    setDoNotSellActive(isGPCActive());
    localStorage.setItem('us_privacy_optout_explicit', 'false');
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 2000);
  };

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-sans text-purple-950 text-left">
      
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={onBackToHome}
          className="group flex items-center space-x-2 text-purple-800 hover:text-purple-950 font-semibold text-sm transition-colors cursor-pointer bg-white px-4 py-2 border border-purple-200/50 rounded-xl shadow-sm hover:shadow"
          id="back-to-home-policy-btn"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Main</span>
        </button>
      </div>

      {/* Styled header similar to the home template */}
      <div className="text-center mb-10 pt-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <img 
            src={LOGO_BIG_CIRCLE} 
            alt="thedustyphoenix logo" 
            className="h-36 w-36 xs:h-40 xs:w-40 sm:h-48 sm:w-48 md:h-52 md:w-52 object-contain select-none transition-transform duration-500 hover:rotate-3 shadow-sm rounded-full bg-white/20 p-2"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>

      <StarDivider />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8 bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-purple-200/40 shadow-sm leading-relaxed text-sm text-purple-900">
          
          <div className="border-b border-purple-150 pb-4 mb-6">
            <p className="text-xl font-bold font-display text-purple-950 lowercase">
              Cookies & Privacy Policy
            </p>
            <p className="text-[11px] font-mono text-purple-500 mt-1 uppercase tracking-wider font-semibold">
              Last Updated: June 8, 2026
            </p>
          </div>

          <section className="space-y-3">
            <p className="font-semibold text-purple-950">
              This Privacy Policy describes how Thedustyphoenix ("we," "us," or "our") collects, uses, discloses, and protects your information when you visit our website (the "Site"). We are committed to transparency and the protection of your digital privacy under global standards, including the General Data Protection Regulation (GDPR), the UK GDPR, and various US State Privacy Laws, including the Oregon Consumer Privacy Act (OCPA).
            </p>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              1. Information We Collect Automatically & Advanced Tracking
            </h2>
            <p>
              When you visit our Site, we utilize Google Analytics 4 (GA4) to collect information about your device and how you interact with our pages. While this data does not directly identify you by name, privacy laws classify these digital footprints as "personal data" or "personally identifiable information (PII)."
            </p>
            <p>
              Depending on your interactions and browser settings, GA4 automatically collects:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>
                <strong>Granular Device & Technical Data:</strong> Web browser type, version, operating system, device model, screen resolution, language settings, and unique digital identifiers (such as first-party cookies and GA4 Client IDs).
              </li>
              <li>
                <strong>Approximate Location Data:</strong> Your approximate geographic location (country, region/state, city). GA4 automatically derives approximate location data before discarding full IP addresses; full IP addresses are never logged or stored on Google servers. For users in the European Economic Area (EEA), IP addresses are used solely for coarse location lookup on local EU servers before data is transferred to the US. We do not collect precise geolocation data (defined as data within a 1,750-foot radius).
              </li>
              <li>
                <strong>Behavioral & Engagement Data:</strong> Pages viewed, time spent on pages, scroll depth, links clicked, internal searches, and video interactions.
              </li>
              <li>
                <strong>Google Signals:</strong> We have activated Google Signals. GA4 associates visitation information with Google account information from signed-in users who have consented to ads personalization to provide aggregated, anonymous demographic and interest insights. This data is entirely de-identified and cannot be used to isolate individual user behavior.
              </li>
            </ul>
            
            <div className="bg-purple-50/50 p-4 border border-purple-100 rounded-xl space-y-2 mt-4">
              <h3 className="font-mono text-xs uppercase text-purple-800 font-bold tracking-wide">
                Minimal Data Collection Practices
              </h3>
              <p className="text-xs">
                Our Site is strictly informational. We do not host interactive web forms, message boards, or user accounts. We do not automatically collect or store personal contact identifiers like your name or email address during your browsing session. Furthermore, we have configured our analytics tools to automatically redact potential identifiers (such as accidentally appended email addresses in query strings) from URLs.
              </p>
              <p className="text-xs text-purple-700">
                <strong>Note on Server Log Files:</strong> Our third-party web hosting provider automatically collects standard server log data (IP address, browser type, date/time) to maintain site security, prevent fraud, and optimize performance. This data is processed and stored separately from our analytics infrastructure.
              </p>
            </div>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              2. How We Use and Share This Information
            </h2>
            <p>
              We use the data collected via GA4 for the following business and commercial purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>To analyze traffic and engagement trends to improve our Site, performance, and overall user experience.</li>
              <li>To maintain, secure, and troubleshoot technical performance.</li>
              <li>
                <strong>Advertising & Remarketing:</strong> We link GA4 with Google Ads for ads personalization (cross-device remarketing). Behavioral data and pseudonymous identifiers are shared with Google to deliver targeted advertisements on third-party platforms and measure overall ad performance.
              </li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              3. Your Choices and Opt-Out Options
            </h2>
            <p>
              We provide multiple layers of control over your digital privacy:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>
                <strong>Cookie Consent Banner:</strong> You can accept or decline analytics and advertising tracking upon your first visit. If you decline, GA4 tracking scripts are blocked from executing.
              </li>
              <li>
                <strong>"Your Privacy Choices" Footer Link:</strong> We provide a single, unified link in our website footer titled "Your Privacy Choices." Clicking this link opens this privacy preference center, where you can explicitly opt out of targeted tracking, selling, sharing, or processing your personal information for targeted advertising at any time via the toggles below.
              </li>
              <li>
                <strong>Global Privacy Control (GPC):</strong> Our Site is designed to respect GPC signals. If your browser transmits a GPC signal, our system automatically interprets it as a valid request to opt out of targeted advertising cookies.
              </li>
              <li>
                <strong>Official Third-Party Opt-outs:</strong> You may use the Google Analytics Opt-out Browser Add-on at <a href="https://tools.google.com/dlpage/gaoptout/" target="_blank" rel="noopener noreferrer" className="underline font-bold text-purple-950">tools.google.com/dlpage/gaoptout/ <ExternalLink size={10} className="inline" /></a>, Google My Ad Center, or clear your data via Google My Activity to control your data privacy across the web.
              </li>
            </ul>

            <div className="border border-purple-200 bg-white shadow-sm rounded-xl p-5 mt-4 space-y-4">
              <h3 className="font-display font-bold text-purple-950 lowercase text-base">
                Your Privacy Choices Preference Center
              </h3>
              
              {/* Flash success notice */}
              {successMessage && (
                <div className="flex items-center space-x-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 text-xs font-semibold animate-pulse">
                  <CheckCircle size={15} className="text-emerald-600 flex-shrink-0" />
                  <span>Preferences saved successfully and applied locally in real-time.</span>
                </div>
              )}

              <div className="space-y-3">
                {/* Category 1: Essential */}
                <div className="flex items-start justify-between p-3.5 bg-purple-50/20 rounded-xl border border-purple-100">
                  <div className="space-y-1 pr-4">
                    <span className="font-display font-semibold text-purple-950 text-sm block">Essential Session Cookies</span>
                    <p className="text-[11px] text-purple-700/95 leading-relaxed">
                      Required for basic site navigation, fluid animations, layout rendering and maintaining active preference states.
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] uppercase font-mono font-bold bg-purple-105 text-purple-700 flex-shrink-0 mt-0.5">
                    Active
                  </span>
                </div>

                {/* Do Not Sell / Share Opt-Out */}
                <div className="flex items-start justify-between p-3.5 bg-red-50/50 rounded-xl border border-red-200">
                  <div className="space-y-1 pr-4">
                    <span className="font-display font-semibold text-red-950 text-sm block">Do Not Sell or Share My Information / Targeted Ads Opt-Out</span>
                    <p className="text-[11px] text-red-800 leading-relaxed">
                      Opt-out of all standard marketing pixels, ad personalization profiles, de-identified behavioral tracking, and data sharing tools under state laws (CCPA/CPRA, OCPA).
                    </p>
                    {(gpcActive || doNotSellActive) && (
                      <span className="inline-block text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 mt-1">
                        Active (Data privacy fully locked & shielded)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center h-full my-auto flex-shrink-0 pt-1">
                    <input
                      type="checkbox"
                      checked={gpcActive || doNotSellActive}
                      disabled={gpcActive}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setDoNotSellActive(checked);
                        if (checked) {
                          const nextConsent = saveConsentPreferences({
                            analytics: false,
                            marketing: false,
                            userOverride: true
                          });
                          setConsent(nextConsent);
                          localStorage.setItem('us_privacy_optout_explicit', 'true');
                        } else {
                          localStorage.setItem('us_privacy_optout_explicit', 'false');
                        }
                        setSuccessMessage(true);
                        setTimeout(() => setSuccessMessage(false), 2500);
                      }}
                      className="w-4.5 h-4.5 text-red-900 border-red-200 rounded focus:ring-red-500 cursor-pointer disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Category 2: Analytics (GA4) */}
                <div className={`flex items-start justify-between p-3.5 bg-white rounded-xl border border-purple-150 ${(gpcActive || doNotSellActive) ? 'opacity-60' : ''}`}>
                  <div className="space-y-1 pr-4">
                    <span className="font-display font-semibold text-purple-950 text-sm block">Analytics & Audience (GA4)</span>
                    <p className="text-[11px] text-purple-700/95 leading-relaxed">
                      Toggle to configure your preference. If disabled, GA4 scripts are blocked from logging any page interaction telemetry.
                    </p>
                    {gpcActive && (
                      <span className="inline-block text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 mt-1">
                        Locked (Opted-out by GPC browser request)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center h-full my-auto flex-shrink-0 pt-1">
                    <input
                      type="checkbox"
                      checked={consent.analytics}
                      disabled={gpcActive || doNotSellActive}
                      onChange={(e) => handleTogglePreference('analytics', e.target.checked)}
                      className="w-4.5 h-4.5 text-purple-900 border-purple-200 rounded focus:ring-purple-500 cursor-pointer disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Category 3: Marketing (Google Ads / Pixels) */}
                <div className={`flex items-start justify-between p-3.5 bg-white rounded-xl border border-purple-150 ${(gpcActive || doNotSellActive) ? 'opacity-60' : ''}`}>
                  <div className="space-y-1 pr-4">
                    <span className="font-display font-semibold text-purple-950 text-sm block">Marketing Pixels & Advertising Tags</span>
                    <p className="text-[11px] text-purple-700/95 leading-relaxed">
                      Enables linking with Google Ads and social channels to measure conversion paths. (Fully blocked until consented).
                    </p>
                    {gpcActive && (
                      <span className="inline-block text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 mt-1">
                        Locked (Opted-out by GPC browser request)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center h-full my-auto flex-shrink-0 pt-1">
                    <input
                      type="checkbox"
                      checked={consent.marketing}
                      disabled={gpcActive || doNotSellActive}
                      onChange={(e) => handleTogglePreference('marketing', e.target.checked)}
                      className="w-4.5 h-4.5 text-purple-900 border-purple-200 rounded focus:ring-purple-500 cursor-pointer disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleResetPreferences}
                  className="flex items-center space-x-1 text-purple-705 hover:text-purple-950 font-bold text-xs transition-colors cursor-pointer"
                >
                  <RotateCcw size={11} />
                  <span>Restore system defaults</span>
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              4. International Data Transfers & GDPR/UK GDPR Compliance
            </h2>
            <p>
              If you access our Site from the European Economic Area (EEA) or the United Kingdom (UK), your data is processed under the General Data Protection Regulation (GDPR) and the UK Data Protection Act 2018. Thedustyphoenix acts as the Data Controller for this information.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                <strong>Legal Basis for Processing:</strong> We process analytics and marketing data based strictly on your Explicit Consent (Article 6(1)(a) GDPR). Security processing via hosting server logs is based on our Legitimate Interest (Article 6(1)(f) GDPR) to ensure a secure browsing environment.
              </li>
              <li>
                <strong>Data Minimization & Retention:</strong> In compliance with data minimization principles, we have restricted our user-level and event-level data retention within GA4 to a strict period of 2 months. Server log files held by our hosting provider are automatically purged or anonymized within 30 days. Individual cookie-linked data reaching its limit is automatically deleted by Google monthly.
              </li>
              <li>
                <strong>Data Transfers:</strong> Data is stored on Google servers in the United States. To ensure a lawful transfer mechanism, we rely on Google’s standard data processing terms, incorporating the EU Standard Contractual Clauses (SCCs) and Google's certification under the EU-U.S. Data Privacy Framework and the UK Extension thereto.
              </li>
              <li>
                <strong>Your Rights:</strong> You have the right to access, rectify, erase, restrict processing, object to processing, and request data portability.
              </li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              5. US State Privacy Rights
            </h2>
            <p>
              Depending on your US state of residence (including Oregon, California, Texas, Virginia, Colorado, Connecticut, Utah, Indiana, and others), you have specific rights regarding your personal information under frameworks like the OCPA and CCPA/CPRA.
            </p>
            <p>
              <strong>Sharing for Targeted Advertising / "Selling":</strong> Sharing cookie data and pseudonymous identifiers with Google Ads to serve personalized ads is legally considered a "sale," "sharing," or processing for "targeted advertising" under several US state laws. You can opt out at any time via our consent banner, our footer link, or a browser-level GPC signal.
            </p>
            <p>
              <strong>Specific Third-Party Disclosures (Oregon OCPA):</strong> In accordance with the Oregon Consumer Privacy Act, we explicitly disclose the specific third parties with whom we share personal data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>
                <strong>Google LLC:</strong> Receives pseudonymous digital identifiers, device data, and behavioral events for analytics and targeted advertising services.
              </li>
              <li>
                <strong>Cloud Run Service (Google Cloud Platform):</strong> Processes technical data, including IP addresses and server log parameters, exclusively to securely host, maintain, and deliver our Site infrastructure.
              </li>
            </ul>
            <p className="text-xs">
              <strong>California "Shine the Light" Law:</strong> We do not disclose your personal information to third parties for their direct marketing purposes.
            </p>
            <p className="text-xs">
              <strong>Sensitive Data:</strong> We do not knowingly collect, process, or sell sensitive personal information, precise geolocation, or biometric data.
            </p>

            <div className="bg-purple-100/10 p-4 border border-purple-150 rounded-xl space-y-2 mt-4 text-xs">
              <h3 className="font-display font-semibold text-purple-950 text-sm">
                Identity Verification Requirement & Right to Appeal
              </h3>
              <p>
                Because we do not collect names or emails natively on the Site, we cannot inherently match a physical identity to anonymous cookies. To exercise your rights to access or delete your data under any privacy framework, you must provide your specific browser Client ID or cookie identifier. If you contact us, we can provide instructions on how to locate these identifiers in your browser settings. Without this information, we have no secure technical means to map anonymous browsing data to a specific individual, and we may decline the request to protect consumer privacy.
              </p>
              <p>
                If we decline to take action on a privacy request due to an inability to verify your identity identifiers, residents of specific US States (including Oregon) have the right to appeal our decision. To submit an appeal, please contact us via email specifying your original request and the context of the denial. We will respond to appeals within forty-five (45) days of receipt, as mandated by local state law, and provide a written explanation of our decision. If your appeal is denied, you may contact your state's Attorney General to file a formal complaint.
              </p>
            </div>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              6. Children and Teens Trust & Privacy
            </h2>
            <p>
              Our Site and services are intended solely for a general audience and are not directed to children.
            </p>
            <p>
              We do not knowingly collect or process personal data from children under the age of 13 under the Children's Online Privacy Protection Act (COPPA). Furthermore, because we cannot verify the age of anonymous website visitors, we do not knowingly sell or share the data of consumers under the age of 16. Because our Site does not allow user content registration or public postings, we do not host or display user content generated by minors.
            </p>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              7. Changes to this Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this policy. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              8. Contact Us
            </h2>
            <p>
              For questions, concerns, or to exercise your data privacy rights (such as submitting a data deletion, access, or appeal request), you may contact us using the information below:
            </p>
            <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-150 text-xs space-y-1">
              <p><strong>Website Name:</strong> https://www.thedustyphoenix.com</p>
              <p><strong>Contact Name/Owner:</strong> Thedustyphoenix</p>
              <p><strong>Email Contact:</strong> <a href="mailto:thedustyphoenix@gmail.com?subject=Privacy%20Rights%20Request" className="underline hover:text-purple-950 font-bold">thedustyphoenix@gmail.com</a> (Please use the subject line: "Privacy Rights Request")</p>
              <p className="text-purple-700 text-[11px] pt-1 leading-normal">
                Please note: If you contact us directly via email, we will process your email address and any voluntarily provided contact information solely to respond to your specific inquiry. This contact data is managed strictly separate from our automated web analytics data.
              </p>
            </div>
          </section>

        </div>

        {/* Sidebar / Quick Widget Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Status Box */}
          <div className="bg-purple-950 text-purple-100 rounded-2xl p-5 border border-purple-900 shadow-md">
            <h3 className="font-display font-bold text-base lowercase mb-3 text-white">
              Status Dashboard
            </h3>
            
            <div className="space-y-4 text-xs font-medium">
              <div className="flex justify-between items-center py-2 border-b border-purple-900">
                <span className="text-purple-350 font-mono text-[10px] uppercase">Compliance</span>
                <span className="text-emerald-400 font-bold">Compliant</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-purple-900">
                <span className="text-purple-350 font-mono text-[10px] uppercase">GPC Shield</span>
                <span className={`font-bold ${gpcActive ? 'text-emerald-400' : 'text-purple-300'}`}>
                  {gpcActive ? 'Active (Opted-Out)' : 'Inactive'}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-purple-900">
                <span className="text-purple-350 font-mono text-[10px] uppercase">Analytics Tags</span>
                <span className={`font-bold ${consent.analytics ? 'text-amber-300' : 'text-purple-400'}`}>
                  {consent.analytics ? 'Injected & Firing' : 'Blocked & Evicted'}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-purple-350 font-mono text-[10px] uppercase">Marketing Pixels</span>
                <span className={`font-bold ${consent.marketing ? 'text-amber-300' : 'text-purple-400'}`}>
                  {consent.marketing ? 'Injected & Firing' : 'Blocked & Evicted'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Shops Directory (Formatted matching main page theme) */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-purple-200/50 shadow-sm space-y-4">
            <h3 className="font-display font-extrabold text-sm text-purple-950 uppercase font-mono tracking-widest text-center">
              shops
            </h3>
            
            <ul className="space-y-3.5 text-xs text-purple-900">
              {STORE_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center group/side p-2 hover:bg-purple-50/70 border border-transparent hover:border-purple-200/55 rounded-xl transition-all"
                  >
                    <div>
                      <span className="font-bold text-purple-950 block">{link.name}</span>
                    </div>
                    <ExternalLink size={12} className="text-purple-500 opacity-0 group-hover/side:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Socials Directory */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-purple-200/50 shadow-sm space-y-4">
            <h3 className="font-display font-extrabold text-sm text-purple-950 uppercase font-mono tracking-widest text-center">
              socials
            </h3>
            
            <ul className="space-y-3 text-xs text-purple-900">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-between items-center group/side p-2 hover:bg-purple-50/70 border border-transparent hover:border-purple-200/55 rounded-xl transition-all"
                  >
                    <span className="font-semibold text-purple-950">{link.name}</span>
                    <ExternalLink size={11} className="text-purple-400 opacity-60 group-hover/side:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}

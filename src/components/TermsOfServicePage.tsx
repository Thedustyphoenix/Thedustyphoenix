import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  ArrowLeft,
  ExternalLink,
  Shield,
  Briefcase
} from 'lucide-react';
import { StarDivider } from '../App';
import { 
  LOGO_BIG_CIRCLE, 
  STORE_LINKS, 
  SOCIAL_LINKS 
} from '../data';

interface TermsOfServicePageProps {
  onBackToHome: () => void;
}

export default function TermsOfServicePage({ onBackToHome }: TermsOfServicePageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto font-sans text-purple-950 text-left">
      
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={onBackToHome}
          className="group flex items-center space-x-2 text-purple-800 hover:text-purple-950 font-semibold text-sm transition-colors cursor-pointer bg-white px-4 py-2 border border-purple-200/50 rounded-xl shadow-sm hover:shadow"
          id="back-to-home-terms-btn"
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
            <h1 className="text-xl font-bold font-display text-purple-950 lowercase flex items-center gap-2">
              <FileText size={20} className="text-purple-700" />
              <span>Terms of Service</span>
            </h1>
            <p className="text-[11px] font-mono text-purple-500 mt-1 uppercase tracking-wider font-semibold">
              Last Updated: June 12, 2026
            </p>
          </div>

          <section className="space-y-3">
            <p className="font-semibold text-purple-950">
              Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the website operated by Thedustyphoenix ("us", "we", "our", "Thedustyphoenix"). By accessing or using this website (the "Service"), you agree to be bound by these Terms. If you disagree with any part of the terms, you do not have permission to access the Service.
            </p>
            <p>
              Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference.
            </p>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              1. Minimum Age Requirement and Commercial Purchases
            </h2>
            <p>
              <strong>General Access:</strong> By using this Service, you represent and warrant that you are at least 13 years of age. If you are under the age of 13, you may not use or access this website. We do not knowingly collect or solicit personal information from anyone under the age of 13.
            </p>
            <p>
              <strong>Purchases:</strong> If you are purchasing any goods, digital downloads, or services via the Service, you represent and warrant that you are at least 18 years of age, or that you are accessing the Service under the direct supervision of a parent or legal guardian who has agreed to be bound by these Terms on your behalf. All purchases are subject to our standard Shipping and Refund Policies, which are incorporated herein by reference. All physical items purchased from the Service are made pursuant to a shipment contract, meaning that the risk of loss and title for such items pass to you upon our delivery to the courier/carrier.
            </p>
            <p>
              <strong>Digital Downloads:</strong> Due to the nature of digital goods, all digital downloads are final sale and non-refundable. By completing a purchase of a digital product, you expressly acknowledge and agree that delivery begins immediately, and you explicitly give your prior express consent to forfeit your statutory right of withdrawal, cancellation, or refund immediately upon the commencement of the download or when access to the digital content is granted.
            </p>
            <p>
              <strong>Order Limitations and Pricing Errors:</strong> We reserve the right to refuse, limit, or cancel any order placed through the Service at our sole discretion. This includes, but is not limited to, orders that appear to be placed by dealers, resellers, or distributors. In the event that an item is listed at an incorrect price or with incorrect information due to a typographical error or an error in pricing, we reserve the right to cancel or refuse any orders placed for that item, even if the order has been confirmed and your payment method charged. If your payment method has already been charged, we will issue a full refund of the amount charged for that incorrect item or order.
            </p>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              2. Intellectual Property, Ownership of Content, and Moral Rights
            </h2>
            <p>
              <strong>Ownership:</strong> The Service and all of its original content, features, and functionality—including but not limited to digital illustrations, traditional craft photographs, text, graphics, logos, images, audio clips, digital downloads, data compilations, and software (collectively, the "Content")—are and will remain the exclusive property of Thedustyphoenix and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p>
              <strong>Assertion of Moral Rights (VARA):</strong> To the extent that any physical artwork sold through or displayed on this Service qualifies as a "work of visual art" under the Visual Artists Rights Act of 1990 (17 U.S.C. § 106A) ("VARA"), and meets its statutory criteria (including being a single copy or part of a limited edition of 200 or fewer signed and numbered copies), we hereby expressly assert and reserve all moral rights associated with such physical works. This includes, without limitation:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-purple-900">
              <li>The right to claim authorship of the work.</li>
              <li>The right to prevent the use of the artist's name on any work that has been distorted, mutilated, or modified in a manner prejudicial to the artist's honor or reputation.</li>
              <li>The right to prevent any intentional distortion, mutilation, or destruction of a work of recognized stature.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              3. Limited License and Permitted Use
            </h2>
            <p>
              We grant you a personal, non-exclusive, non-transferable, non-sublicensable, and revocable license to access and view the Content on this website strictly for your own personal, non-commercial use. This license does not transfer any title or ownership rights of the Content to you.
            </p>
            <p>
              Non-commercial, casual sharing of images on social media or personal blogs is permitted only if it includes clear, prominent attribution to Thedustyphoenix and a direct, active hyperlink back to this website. We reserve the right to revoke this permission for any reason at any time. Any rights not expressly granted herein are reserved by Thedustyphoenix.
            </p>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase text-red-950">
              4. Prohibited Uses and Contractual Restrictions on Data Mining
            </h2>
            <p>
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li>
                <strong>Commercial Exploitation:</strong> Reproduce, duplicate, copy, sell, resell, distribute, or exploit any portion of the Content or Service for commercial purposes without express, prior written permission from Thedustyphoenix.
              </li>
              <li>
                <strong>Modification:</strong> Modify, alter, crop, manipulate, or create derivative works of any artwork or Content found on this site.
              </li>
              <li>
                <strong>Removal of Markings:</strong> Remove, obscure, or alter any copyright notices, digital signatures, watermarks, or other proprietary rights notices.
              </li>
              <li>
                <strong>Scraping and Automation:</strong> Use any automated system—including bots, spiders, offline readers, scrapers, or data mining tools—to access, crawl, or harvest Content from the Service.
              </li>
              <li>
                <strong>Text and Data Mining / AI Prohibition:</strong> Use any Content, images, or text from this website to train, fine-tune, test, develop, or otherwise inform artificial intelligence (AI) models, machine learning algorithms, or generative text/image datasets. This website and its Content are expressly opted out of, and protected against, automated text and data mining under all applicable international and regional frameworks, including Article 4(3) of the EU Copyright Directive (Directive (EU) 2019/790). These restrictions are expressly reserved in a machine-readable format via website metadata and robots.txt protocols. Any violation of this clause constitutes a material breach of these Terms.
              </li>
              <li>
                <strong>Mass Republication:</strong> Republish, re-upload, or host full galleries or large quantities of images from this Service on other websites, forums, or platforms without explicit written consent.
              </li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              5. Intellectual Property Infringement Claims (DMCA Notice)
            </h2>
            <p>
              We respect the intellectual property rights of others. If you believe that your copyrighted work has been copied or used on the Service in a way that constitutes copyright infringement, please contact our Designated Agent in writing with the following information in compliance with 17 U.S.C. § 512(c)(3):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>A physical or electronic signature of the copyright owner or authorized representative.</li>
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>Identification of the material that is claimed to be infringing and where it is located on the Service (including specific URLs).</li>
              <li>Your contact information, including address, telephone number, and email.</li>
              <li>A statement that you have a good faith belief that use of the material is not authorized by the copyright owner, its agent, or the law.</li>
              <li>A statement, under penalty of perjury, that the information in the notification is accurate and that you are authorized to act on behalf of the copyright owner.</li>
            </ul>
            <p className="text-xs">
              If you believe your own content was removed or disabled by mistake or misidentification, you may submit a written counter-notification to our Designated Agent containing the information required by 17 U.S.C. § 512(g)(3).
            </p>
            <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-150 text-xs space-y-1 mt-2">
              <p className="font-bold text-purple-950">DMCA Designated Agent Contact:</p>
              <p><strong>Entity:</strong> Thedustyphoenix</p>
              <p><strong>Attn:</strong> DMCA Designated Agent</p>
              <p><strong>Email:</strong> <a href="mailto:contact@thedustyphoenix.com" className="underline hover:text-purple-950 font-bold">contact@thedustyphoenix.com</a></p>
            </div>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              6. User Conduct and User-Generated Content
            </h2>
            <p>
              You agree to use the Service only for lawful purposes. You are prohibited from posting or transmitting any material that is defamatory, obscene, threatening, harassing, abusive, or that violates the law, the intellectual property rights, or the privacy rights of any third party.
            </p>
            <p>
              If the Service allows you to post comments, reviews, or other content ("User Content"), you grant Thedustyphoenix a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, and display such content worldwide in any media. You represent and warrant that you own or control all rights to the User Content you post and that your content does not violate these Terms.
            </p>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              7. Modification and Termination of Service
            </h2>
            <p>
              We reserve the right to modify, suspend, or discontinue the Service (or any part or Content thereof) at any time, temporarily or permanently, with or without notice. You agree that we shall not be liable to you or to any third party for any modification, suspension, or discontinuance of the Service.
            </p>
            <p>
              We may also terminate or suspend your access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including but not limited to a breach of the Terms. Upon termination, your right to use the Service will cease immediately.
            </p>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              8. Links to Third-Party Websites
            </h2>
            <p>
              The Service may contain links to third-party websites, services, or platforms (such as online marketplaces, portfolio sites, payment processors, or social media networks) that are not owned or controlled by Thedustyphoenix. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that Thedustyphoenix shall not be liable, directly or indirectly, for any damage or loss caused by or in connection with the use of such sites.
            </p>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              9. Disclaimer of Warranties; "As Is"
            </h2>
            <p className="italic text-purple-800 text-xs">
              Note: Some jurisdictions do not allow the exclusion of certain warranties or the limitation of consumer statutory rights. Accordingly, some of the exclusions below may not apply to you.
            </p>
            <p>
              The Service and its Content are provided on an "as is" and "as available" basis. Thedustyphoenix makes no representations or warranties of any kind, express or implied, as to the operation of the Service or the accuracy, completeness, or reliability of the Content. To the full extent permissible by applicable law, we disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose. We do not warrant that the Service, its servers, or emails sent from us are free of viruses or other harmful components.
            </p>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              10. Limitation of Liability
            </h2>
            <p className="italic text-purple-800 text-xs">
              Note: Some jurisdictions do not allow the limitation of liability for certain damages. Accordingly, some of the exclusions below may not apply to you.
            </p>
            <p>
              To the maximum extent permitted by applicable law, in no event shall Thedustyphoenix be liable for any direct, indirect, incidental, special, consequential, or punitive damages—including without limitation, loss of profits, data, use, goodwill, or other intangible losses—resulting from:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-purple-900">
              <li>Your access to or use of (or inability to access or use) the Service;</li>
              <li>Any conduct or content of any third party on the Service;</li>
              <li>Any unauthorized access, use, or alteration of your transmissions or content; or</li>
              <li>Any issues arising from product fulfillment, shipping delays, or physical item delivery.</li>
            </ul>
            <p>
              To the maximum extent permitted by applicable law, the total liability of Thedustyphoenix for any claims, damages, or losses arising out of or related to the Service or items purchased through the Service shall be strictly limited to the actual amount paid by you, if any, for the specific transaction giving rise to the claim. Except where prohibited by law, if you have not purchased any items or services through the Service, the total liability of Thedustyphoenix to you shall be limited to $10.00 USD.
            </p>
            <p>
              We will not be responsible or liable for any delays or failures in performance resulting from acts beyond our reasonable control, including but not limited to acts of God, postal or delivery strikes, customs delays, supply shortages, or government restrictions.
            </p>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              11. Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless Thedustyphoenix and its owners, employees, contractors, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees) resulting from or arising out of:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-purple-900">
              <li>Your use and access of the Service;</li>
              <li>A breach of these Terms; or</li>
              <li>Any content you post, upload, or transmit through the Service that violates any law or third-party right.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              12. Governing Law, Jurisdiction, and Dispute Resolution
            </h2>
            <p>
              <strong>Governing Law:</strong> These Terms shall be governed by, construed, and enforced in accordance with the laws of the State of Oregon, United States, without regard to its conflict of law provisions.
            </p>
            <p>
              <strong>Jurisdiction:</strong> You agree that any legal action or proceeding arising out of or related to these Terms shall be brought exclusively in the state courts located in Marion County, Oregon, or the United States District Court for the District of Oregon. Notwithstanding the foregoing, either party may bring an individual action in a small claims court of competent jurisdiction.
            </p>
            <p>
              <strong>Class Action Waiver:</strong> YOU AND THEDUSTYPHOENIX AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
            </p>
            <p>
              <strong>Statute of Limitations:</strong> You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to use of the Service or these Terms must be filed within one (1) year after such claim or cause of action arose or be forever barred.
            </p>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              13. Entire Agreement, Severability, and No Waiver
            </h2>
            <p>
              <strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and Thedustyphoenix regarding the Service and supersede any prior agreements or understandings.
            </p>
            <p>
              <strong>Severability:</strong> If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, that specific portion will be limited or eliminated to the minimum extent necessary, and the remaining provisions of these Terms will remain in full force and effect.
            </p>
            <p>
              <strong>No Waiver:</strong> Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. The waiver of any such right or provision will be effective only if in writing and signed by an authorized representative of Thedustyphoenix.
            </p>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              14. Changes to These Terms
            </h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide notice prior to any new terms taking effect by updating the "Last Updated" date at the top of this page or by posting a prominent notification on the website. What constitutes a material change will be determined at our sole discretion. You are advised to review these Terms periodically for any changes.
            </p>
            <p>
              By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
            </p>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              15. Non-Affiliation and Third-Party Trademark Disclaimer
            </h2>
            <p>
              Any product names, logos, brands, characters, intellectual properties, or trademarks featured, depicted, or referred to within this website and the Service are the property of their respective trademark and copyright holders.
            </p>
            <p>
              Unless explicitly stated otherwise, Thedustyphoenix is completely independent and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with any third-party intellectual property owners, franchises, corporations, or their subsidiaries. Any creative works, fan illustrations, or traditional crafts inspired by pop culture, anime, fantasy fiction, or historical themes are created solely as artistic expressions and personal interpretations. The use of any third-party names or references is done strictly for descriptive, transformative, or identification purposes and does not imply any official relationship, endorsement, or sponsorship.
            </p>
          </section>

          <section className="space-y-3 border-t border-purple-150/60 pt-6">
            <h2 className="font-display text-lg sm:text-xl font-bold text-purple-950 lowercase">
              16. Electronic Communications and Contact Information
            </h2>
            <p>
              By using the Service or sending emails to us, you are communicating with us electronically. You consent to receive communications from us electronically, such as via email or notices posted on this site.
            </p>
            <p>
              If you have any questions about these Terms, or if you wish to request written permission for commercial licensing or usage of the Content, please contact us at:
            </p>
            <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-150 text-xs space-y-1">
              <p><strong>Email Contact:</strong> <a href="mailto:contact@thedustyphoenix.com" className="underline hover:text-purple-950 font-bold">contact@thedustyphoenix.com</a></p>
              <p><strong>Website:</strong> <a href="https://www.thedustyphoenix.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-950 font-bold">https://www.thedustyphoenix.com</a></p>
            </div>
          </section>

        </div>

        {/* Sidebar / Quick Widget Column */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quick Legal Notice */}
          <div className="bg-purple-950 text-purple-100 rounded-2xl p-5 border border-purple-900 shadow-md">
            <h3 className="font-display font-bold text-base lowercase mb-3 text-white flex items-center gap-2">
              <Shield size={16} className="text-purple-300" />
              <span>Legal Summary</span>
            </h3>
            
            <div className="space-y-4 text-xs font-medium">
              <div className="flex justify-between items-center py-2 border-b border-purple-900">
                <span className="text-purple-350 font-mono text-[10px] uppercase">Jurisdiction</span>
                <span className="text-purple-200 font-bold">Oregon, USA</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-purple-900">
                <span className="text-purple-350 font-mono text-[10px] uppercase">Min Age (Access)</span>
                <span className="text-purple-200 font-bold">13 Years Old</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-purple-900">
                <span className="text-purple-350 font-mono text-[10px] uppercase">Min Age (Shop)</span>
                <span className="text-purple-200 font-bold">18 Years/Supervised</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-purple-350 font-mono text-[10px] uppercase">VARA Assertion</span>
                <span className="text-emerald-400 font-bold">Explicitly Reserved</span>
              </div>
            </div>
          </div>

          {/* Quick Shops Directory */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-purple-200/50 shadow-sm space-y-4">
            <h3 className="font-display font-extrabold text-sm text-purple-950 uppercase font-mono tracking-widest text-center flex items-center justify-center gap-2">
              <Briefcase size={14} className="text-purple-700" />
              <span>Authorized Shops</span>
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

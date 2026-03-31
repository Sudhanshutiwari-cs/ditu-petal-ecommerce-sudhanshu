// app/privacy-policy/page.tsx
// This is a single-file page for the Privacy Policy of an e-commerce platform.
// Place this file in your Next.js App Router directory (e.g., app/privacy-policy/page.tsx)
'use client'
import React from 'react';

// Metadata for SEO

const PrivacyPolicyPage = () => {
  // Set the last updated date dynamically
  const lastUpdatedDate = 'April 1, 2026';
  const effectiveDate = 'April 1, 2026';

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-700 to-purple-800 px-6 py-12 sm:px-10 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-3 text-indigo-100 text-sm sm:text-base">
            Last Updated: {lastUpdatedDate} | Effective Date: {effectiveDate}
          </p>
          <p className="mt-2 text-indigo-100 text-sm">
            At [Your E-Commerce Store Name], we take your privacy seriously. This policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
          </p>
        </div>

        {/* Content Section */}
        <div className="px-6 py-10 sm:px-10 sm:py-12 space-y-8 text-gray-700">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              [Your Company Name] (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the [Your E-Commerce Store Name] website, mobile application, and related services (collectively, the &quot;Platform&quot;). This Privacy Policy describes how we collect, use, store, and protect your personal information when you visit or make a purchase from our Platform. By using our Platform, you consent to the data practices described in this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="leading-relaxed mb-3">We collect several types of information from and about users of our Platform:</p>
            
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information You Provide</h3>
                <p className="leading-relaxed">When you create an account, place an order, subscribe to our newsletter, or contact us, you may provide us with:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Name, email address, phone number, and shipping/billing address</li>
                  <li>Payment information (processed securely through third-party payment processors)</li>
                  <li>Account credentials (username and password)</li>
                  <li>Communication preferences and feedback</li>
                  <li>Order history and product preferences</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Automatically Collected Information</h3>
                <p className="leading-relaxed">When you interact with our Platform, we automatically collect:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Device information (IP address, browser type, operating system, device identifiers)</li>
                  <li>Usage data (pages viewed, time spent, links clicked, search queries)</li>
                  <li>Location data (general geographic location based on IP address)</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="leading-relaxed mb-3">We use the information we collect for various purposes, including:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Processing and fulfilling your orders, including shipping and delivery</li>
              <li>Managing your account and providing customer support</li>
              <li>Personalizing your shopping experience and recommending products</li>
              <li>Sending order confirmations, shipping updates, and service-related communications</li>
              <li>Sending marketing communications (with your consent) about new products, promotions, and events</li>
              <li>Analyzing and improving our Platform, products, and services</li>
              <li>Preventing fraud, unauthorized transactions, and ensuring security</li>
              <li>Complying with legal obligations and enforcing our terms and conditions</li>
            </ul>
          </section>

          {/* Legal Basis for Processing (GDPR Compliance) */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Legal Basis for Processing (For EU Users)</h2>
            <p className="leading-relaxed">
              If you are located in the European Economic Area (EEA), we process your personal information based on the following legal grounds:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li><strong>Contractual Necessity:</strong> To fulfill orders and provide services you request</li>
              <li><strong>Legitimate Interests:</strong> To improve our services, prevent fraud, and communicate with you</li>
              <li><strong>Consent:</strong> For marketing communications and optional data collection</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </section>

          {/* Cookies and Tracking Technologies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="leading-relaxed">
              We use cookies, web beacons, and similar tracking technologies to enhance your experience on our Platform. Cookies are small data files stored on your device that help us remember your preferences, understand how you use our Platform, and improve our services. You can control cookies through your browser settings, but disabling them may affect your ability to use certain features of our Platform.
            </p>
            <p className="leading-relaxed mt-3">
              We use the following types of cookies:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li><strong>Essential Cookies:</strong> Required for basic Platform functionality (e.g., shopping cart, checkout)</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our Platform</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Targeting Cookies:</strong> Used to deliver relevant advertisements to you</li>
            </ul>
          </section>

          {/* Sharing Your Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Sharing Your Information</h2>
            <p className="leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. However, we may share your information with:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li><strong>Service Providers:</strong> Third-party vendors who assist with payment processing, shipping, marketing, analytics, and customer support</li>
              <li><strong>Business Partners:</strong> With your consent, we may share information with trusted partners for promotional purposes</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights, property, or safety</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
            </ul>
            <p className="leading-relaxed mt-3">
              All third-party service providers are contractually obligated to protect your information and use it only for the purposes for which it was disclosed.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Security</h2>
            <p className="leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption (SSL/TLS) for data transmission, secure servers, firewalls, and restricted access to personal data. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
            <p className="leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it. If you close your account, we will retain certain information as necessary to comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          {/* Your Rights and Choices */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Your Rights and Choices</h2>
            <p className="leading-relaxed mb-3">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal exceptions)</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
              <li><strong>Data Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Withdraw Consent:</strong> Withdraw consent where we rely on consent for processing</li>
            </ul>
            <p className="leading-relaxed mt-3">
              To exercise these rights, please contact us using the information in the &quot;Contact Us&quot; section below. We will respond to your request within 30 days. For EU residents, you also have the right to lodge a complaint with your local data protection authority.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
            <p className="leading-relaxed">
              Our Platform is not intended for children under the age of 13 (or under 16 in certain jurisdictions). We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately so we can delete such information.
            </p>
          </section>

          {/* International Data Transfers */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. International Data Transfers</h2>
            <p className="leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. These countries may have data protection laws different from your jurisdiction. When we transfer your information internationally, we take appropriate safeguards to protect your information, such as using standard contractual clauses approved by the European Commission.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Third-Party Links</h2>
            <p className="leading-relaxed">
              Our Platform may contain links to third-party websites, products, or services. This Privacy Policy does not apply to those third parties. We are not responsible for the privacy practices or content of such third parties. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </section>

          {/* Changes to This Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Changes to This Privacy Policy</h2>
            <p className="leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or operational needs. We will notify you of any material changes by posting the updated policy on this page and updating the &quot;Last Updated&quot; date. Your continued use of the Platform after such changes constitutes your acceptance of the revised policy.
            </p>
          </section>

          {/* California Privacy Rights (CCPA Compliance) */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. California Privacy Rights (CCPA)</h2>
            <p className="leading-relaxed">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>The right to know what personal information we collect, use, and disclose</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to opt-out of the sale of your personal information (we do not sell your information)</li>
              <li>The right to non-discrimination for exercising your privacy rights</li>
            </ul>
            <p className="leading-relaxed mt-3">
              To exercise your California privacy rights, please contact us using the information below. We will verify your identity before responding to your request.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <address className="not-italic mt-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <strong>[Your Company Name]</strong><br />
              [Your Address Line 1]<br />
              [City, State, ZIP Code]<br />
              <strong>Privacy Officer:</strong> [Name or Department]<br />
              Email: <a href="mailto:privacy@yourstore.com" className="text-indigo-600 hover:text-indigo-800">privacy@yourstore.com</a><br />
              Phone: <a href="tel:+1234567890" className="text-indigo-600 hover:text-indigo-800">+1 (234) 567-890</a><br />
              For data privacy inquiries: <a href="mailto:dpo@yourstore.com" className="text-indigo-600 hover:text-indigo-800">dpo@yourstore.com</a>
            </address>
          </section>

          {/* Consent Acknowledgment */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Privacy Matters</h3>
              <p className="text-sm text-gray-700 mb-4">
                We are committed to protecting your personal information and being transparent about our data practices. By using our Platform, you acknowledge that you have read and understood this Privacy Policy.
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="privacy-acknowledge"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  disabled
                />
                <label htmlFor="privacy-acknowledge" className="text-sm text-gray-600">
                  I acknowledge that I have read and understand the Privacy Policy (simulated acknowledgment)
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Note: This acknowledgment is a UI element. Actual consent is captured during account creation, checkout, or when you provide your information.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} [Your Company Name]. All rights reserved. | 
          <a href="/terms-and-conditions" className="text-indigo-600 hover:text-indigo-800 ml-1">Terms and Conditions</a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
// app/terms-and-conditions/page.tsx
// This is a single-file page for the Terms and Conditions of an e-commerce platform.
// Place this file in your Next.js App Router directory (e.g., app/terms/page.tsx)
'use client'
import React from 'react';

// Metadata for SEO


const TermsAndConditionsPage = () => {
  // Set the last updated date dynamically
  const lastUpdatedDate = 'April 1, 2026';

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-700 to-purple-800 px-6 py-12 sm:px-10 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms and Conditions
          </h1>
          <p className="mt-3 text-indigo-100 text-sm sm:text-base">
            Last Updated: {lastUpdatedDate}
          </p>
          <p className="mt-2 text-indigo-100 text-sm">
            Welcome to [Your E-Commerce Store Name]. By accessing or using our platform, you agree to comply with and be bound by the following terms.
          </p>
        </div>

        {/* Content Section */}
        <div className="px-6 py-10 sm:px-10 sm:py-12 space-y-8 text-gray-700">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              These Terms and Conditions (&quot;Terms&quot;) govern your use of the [Your E-Commerce Store Name] website, mobile application, and related services (collectively, the &quot;Platform&quot;). The Platform is operated by [Your Company Name] (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By creating an account, placing an order, or browsing the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms, our <a href="/privacy-policy" className="text-indigo-600 hover:text-indigo-800 underline">Privacy Policy</a>, and any other policies referenced herein.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
            <p className="leading-relaxed">
              To use our Platform, you must be at least 18 years old or the age of majority in your jurisdiction. By agreeing to these Terms, you represent and warrant that you have the legal capacity to enter into a binding agreement. If you are using the Platform on behalf of a business or entity, you represent that you have the authority to bind that entity to these Terms.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
            <p className="leading-relaxed">
              To access certain features, such as placing an order, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information as necessary. We reserve the right to suspend or terminate accounts that violate these Terms.
            </p>
          </section>

          {/* Orders and Payments */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Orders and Payments</h2>
            <p className="leading-relaxed mb-3">
              All orders placed through the Platform are subject to our acceptance. We reserve the right to refuse or cancel any order for reasons including but not limited to product availability, errors in pricing, or suspected fraud. Once an order is placed, you will receive a confirmation email; this does not signify our acceptance of your order, but rather a confirmation that we have received it.
            </p>
            <p className="leading-relaxed">
              Prices for products are subject to change without notice. We strive to display accurate pricing and availability, but errors may occur. In the event of a pricing error, we will cancel the order and notify you. All payments are processed securely through third-party payment gateways. By providing payment information, you represent that you are authorized to use the chosen payment method.
            </p>
          </section>

          {/* Shipping and Delivery */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Shipping and Delivery</h2>
            <p className="leading-relaxed">
              Shipping times and costs are estimates and may vary based on location, carrier delays, or other factors outside our control. Title and risk of loss for products pass to you upon our delivery to the carrier. We are not responsible for any delays, damages, or losses once the product has been handed over to the shipping carrier. For more details, please refer to our <a href="/shipping-policy" className="text-indigo-600 hover:text-indigo-800 underline">Shipping Policy</a>.
            </p>
          </section>

          {/* Returns and Refunds */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Returns and Refunds</h2>
            <p className="leading-relaxed">
              We want you to be completely satisfied with your purchase. If you are not satisfied, you may be eligible to return eligible items within [e.g., 30] days of delivery, subject to our <a href="/returns-policy" className="text-indigo-600 hover:text-indigo-800 underline">Return Policy</a>. Refunds will be issued to the original payment method after we receive and inspect the returned item. Certain products, such as intimate goods, perishable items, or digital downloads, are non-returnable.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Intellectual Property</h2>
            <p className="leading-relaxed">
              All content on the Platform, including but not limited to text, graphics, logos, images, product designs, and software, is the property of [Your Company Name] or its licensors and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of any content without our express written permission.
            </p>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Prohibited Activities</h2>
            <p className="leading-relaxed">
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
              <li>Violating any applicable laws or regulations.</li>
              <li>Using the Platform for any fraudulent or unauthorized purpose.</li>
              <li>Interfering with or disrupting the security, performance, or functionality of the Platform.</li>
              <li>Attempting to gain unauthorized access to any portion of the Platform or other user accounts.</li>
              <li>Uploading or transmitting viruses, malware, or other harmful code.</li>
              <li>Harvesting or collecting user data without consent.</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="leading-relaxed">
              To the maximum extent permitted by law, [Your Company Name] shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or in connection with your use of the Platform or these Terms, even if we have been advised of the possibility of such damages. Our total liability shall not exceed the amount you paid us in the twelve (12) months preceding the claim.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
            <p className="leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of [Your State/Country], without regard to its conflict of law principles. Any legal action or proceeding arising under these Terms shall be brought exclusively in the federal or state courts located in [Your City, Your State], and you hereby consent to the personal jurisdiction of such courts.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to These Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these Terms at any time. If we make material changes, we will notify you by posting the updated Terms on the Platform and updating the &quot;Last Updated&quot; date. Your continued use of the Platform after any changes constitutes your acceptance of the new Terms. It is your responsibility to review these Terms periodically.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions or concerns regarding these Terms, please contact us at:
            </p>
            <address className="not-italic mt-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <strong>[Your Company Name]</strong><br />
              [Your Address Line 1]<br />
              [City, State, ZIP Code]<br />
              Email: <a href="mailto:legal@yourstore.com" className="text-indigo-600 hover:text-indigo-800">legal@yourstore.com</a><br />
              Phone: <a href="tel:+1234567890" className="text-indigo-600 hover:text-indigo-800">+1 (234) 567-890</a>
            </address>
          </section>

          {/* Acknowledgment Checkbox - Simulated for UI/UX */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="bg-gray-50 p-5 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Acknowledgment</h3>
              <p className="text-sm text-gray-600 mb-4">
                By using our Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
              {/* This is a visual placeholder. In a real implementation, you'd tie this to user state/backend */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="acknowledge"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  disabled // Disabled for demo; in a real app, you'd enable based on user session
                />
                <label htmlFor="acknowledge" className="text-sm text-gray-500">
                  I have read and agree to the Terms and Conditions (simulated acknowledgment)
                </label>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Note: This acknowledgment is a UI element. Actual user agreement is captured during account creation or checkout.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} [Your Company Name]. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
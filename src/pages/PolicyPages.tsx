import React from 'react'
import { Link } from 'react-router-dom'

const Section: React.FC<{title:string;children:React.ReactNode}> = ({title,children}) => (
  <div className="mb-8">
    <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-xl font-bold text-gray-900 mb-3">{title}</h2>
    <div className="font-body text-gray-600 leading-relaxed space-y-2">{children}</div>
  </div>
)

const PolicyLayout: React.FC<{title:string;emoji:string;children:React.ReactNode}> = ({title,emoji,children}) => (
  <div className="pt-24 md:pt-36 min-h-screen bg-cream">
    <div className="gradient-gold py-12 px-4 text-center">
      <div className="text-5xl mb-3">{emoji}</div>
      <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl md:text-5xl font-black text-white">{title}</h1>
      <p className="font-body text-white/80 mt-2 text-sm">Last updated: April 2025</p>
    </div>
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gold-100">
        {children}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="font-body text-sm text-gray-500 mb-4">Questions? Contact us at <a href="mailto:info@mmlagrofoods.com" className="text-gold-600 hover:underline">info@mmlagrofoods.com</a></p>
          <Link to="/" className="btn-outline px-6 py-2.5 text-sm">Back to Home</Link>
        </div>
      </div>
    </div>
  </div>
)

export const PrivacyPage: React.FC = () => (
  <PolicyLayout title="Privacy Policy" emoji="🔒">
    <Section title="1. Information We Collect">
      <p>We collect information you provide directly: name, email address, phone number, delivery address, and payment details. We also collect usage data when you browse our website including pages visited, time spent, and click patterns.</p>
    </Section>
    <Section title="2. How We Use Your Information">
      <p>Your information is used to process orders and deliver products, send order updates and tracking information, improve our website and services, send promotional offers (with your consent), and comply with legal obligations.</p>
    </Section>
    <Section title="3. Data Security">
      <p>We implement industry-standard security measures including SSL encryption for all transactions, secure payment processing through certified gateways, and regular security audits of our systems.</p>
    </Section>
    <Section title="4. Your Rights">
      <p>You have the right to access, correct, or delete your personal data at any time. You may also opt out of marketing communications by clicking "unsubscribe" in any email or contacting us directly.</p>
    </Section>
    <Section title="5. Contact Us">
      <p>For any privacy-related queries, contact our Data Protection Officer at privacy@mmlagrofoods.com or call +91-XXXXXXXXXX.</p>
    </Section>
  </PolicyLayout>
)

export const TermsPage: React.FC = () => (
  <PolicyLayout title="Terms & Conditions" emoji="📜">
    <Section title="1. Acceptance of Terms">
      <p>By accessing and using the MML Agro Foods website and services, you accept and agree to be bound by these terms. If you do not agree, please do not use our services.</p>
    </Section>
    <Section title="2. Products & Pricing">
      <p>All prices are in Indian Rupees (₹) and inclusive of applicable taxes. We reserve the right to change prices without prior notice. Product images are for illustration purposes; actual products may vary slightly in appearance.</p>
    </Section>
    <Section title="3. Orders & Payments">
      <p>Orders are confirmed only after successful payment. We accept UPI, credit/debit cards, net banking, and cash on delivery. Cash on delivery is available for orders up to ₹5,000 within serviceable areas.</p>
    </Section>
    <Section title="4. Intellectual Property">
      <p>All content on this website including text, images, logos, and graphics are the property of MML Agro Foods and protected by applicable intellectual property laws.</p>
    </Section>
    <Section title="5. Limitation of Liability">
      <p>MML Agro Foods shall not be liable for any indirect, incidental, or consequential damages arising from use of our products or services beyond the purchase price paid.</p>
    </Section>
  </PolicyLayout>
)

export const ShippingPage: React.FC = () => (
  <PolicyLayout title="Shipping Policy" emoji="🚚">
    <Section title="Delivery Timelines">
      <p><strong>Standard Delivery:</strong> 3–5 business days for metro cities</p>
      <p><strong>Express Delivery:</strong> 1–2 business days (available in select cities)</p>
      <p><strong>Remote Areas:</strong> 5–10 business days</p>
    </Section>
    <Section title="Shipping Charges">
      <p><strong>Free Shipping:</strong> On all orders above ₹999</p>
      <p><strong>Standard Charges:</strong> ₹50 for orders below ₹999</p>
      <p><strong>Bulk Orders:</strong> Special shipping rates apply. Contact us for a quote.</p>
    </Section>
    <Section title="Serviceable Areas">
      <p>We deliver across India including all major cities and towns. Remote and PIN code restricted areas may have limited or no delivery availability.</p>
    </Section>
    <Section title="Order Tracking">
      <p>Once shipped, you will receive an SMS and email with your tracking number. Track your order through our website or the courier partner's portal.</p>
    </Section>
    <Section title="Damaged / Missing Orders">
      <p>If your order arrives damaged or is missing items, contact us within 48 hours of delivery with photos for immediate resolution.</p>
    </Section>
  </PolicyLayout>
)

export const ReturnsPage: React.FC = () => (
  <PolicyLayout title="Return Policy" emoji="🔄">
    <Section title="Return Window">
      <p>We accept returns within 7 days of delivery for unopened, sealed products. Once a product is opened, it cannot be returned for quality and safety reasons.</p>
    </Section>
    <Section title="Eligible for Return">
      <p>Products that are damaged upon delivery, products that are different from what was ordered, products with manufacturing defects, and products with packaging issues that compromise quality.</p>
    </Section>
    <Section title="Return Process">
      <p>1. Contact our support team at support@mmlagrofoods.com with order ID and photos</p>
      <p>2. Receive return authorization within 24 hours</p>
      <p>3. Pack the product securely and hand over to our pickup agent</p>
      <p>4. Refund processed within 5–7 business days after quality check</p>
    </Section>
    <Section title="Refund Methods">
      <p>Refunds are credited back to the original payment method. For COD orders, refunds are made via bank transfer or UPI within 7 business days.</p>
    </Section>
  </PolicyLayout>
)

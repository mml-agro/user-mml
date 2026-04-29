import React from 'react'
import { Link } from 'react-router-dom'

interface Props { title: string; content: string[] }

const PolicyPage: React.FC<Props> = ({ title, content }) => (
  <div className="pt-24 md:pt-36 min-h-screen bg-cream">
    <div className="gradient-gold py-12 px-4 text-center">
      <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl md:text-5xl font-black text-white">{title}</h1>
    </div>
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gold-100">
        <div className="space-y-6">
          {content.map((section,i)=>{
            const [heading,...body] = section.split(':')
            return (
              <div key={i}>
                {body.length>0?(
                  <>
                    <h3 style={{fontFamily:"'Playfair Display',serif"}} className="text-lg font-bold text-gray-900 mb-2">{heading}</h3>
                    <p className="font-body text-gray-600 leading-relaxed">{body.join(':')}</p>
                  </>
                ):(
                  <p className="font-body text-gray-600 leading-relaxed">{section}</p>
                )}
              </div>
            )
          })}
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="font-body text-sm text-gray-400">For questions, contact us at <a href="mailto:info@mmlagrofoods.com" className="text-gold-600">info@mmlagrofoods.com</a></p>
          <Link to="/" className="btn-outline mt-4 inline-flex text-sm px-5 py-2.5">← Back to Home</Link>
        </div>
      </div>
    </div>
  </div>
)

export const PrivacyPage: React.FC = () => <PolicyPage title="Privacy Policy" content={["Last updated: January 2025","We at MML Agro Foods are committed to protecting your personal information and your right to privacy. This policy outlines how we collect, use, and safeguard your data.","Information We Collect: We collect information you provide directly, such as name, email, phone number, and delivery address when you create an account or place an order.","How We Use Your Data: Your information is used to process orders, send delivery updates, improve our services, and occasionally send promotional offers (with your consent).","Data Security: We implement industry-standard security measures including SSL encryption to protect your personal information from unauthorized access.","Cookies: We use cookies to improve your browsing experience and analyze site traffic. You can disable cookies in your browser settings.","Third Parties: We do not sell or share your personal data with third parties except as required to fulfill orders (e.g., delivery partners).","Contact Us: If you have questions about this policy, please reach out to info@mmlagrofoods.com"]} />

export const TermsPage: React.FC = () => <PolicyPage title="Terms & Conditions" content={["Last updated: January 2025","By accessing and using the MML Agro Foods website, you accept and agree to these terms and conditions.","Account Terms: You are responsible for maintaining the confidentiality of your account credentials and all activities under your account.","Orders & Payments: All orders are subject to product availability. Prices are inclusive of applicable taxes unless stated otherwise. We accept UPI, card payments, net banking, and cash on delivery.","Returns & Refunds: Products may be returned within 7 days of delivery if damaged or defective. Refunds are processed within 5-7 business days to the original payment method.","Intellectual Property: All content on this website, including text, graphics, and logos, is the property of MML Agro Foods and protected by copyright laws.","Limitation of Liability: MML Agro Foods shall not be liable for any indirect or consequential damages arising from use of our products or services.","Changes to Terms: We reserve the right to modify these terms at any time. Continued use of the website constitutes acceptance of updated terms."]} />

export const ShippingPage: React.FC = () => <PolicyPage title="Shipping Policy" content={["Last updated: January 2025","MML Agro Foods delivers across India. We strive to ensure your order reaches you safely and on time.","Delivery Timelines: Standard delivery takes 3-5 business days. Express delivery (where available) takes 1-2 business days at an additional charge.","Free Delivery: Orders above ₹999 qualify for free standard delivery. Orders below ₹999 incur a flat delivery fee of ₹50.","Order Processing: Orders placed before 2 PM IST on business days are processed the same day. Orders placed after 2 PM are processed the next business day.","Tracking: Once your order is shipped, you'll receive an SMS with the tracking number and courier partner details.","Bulk Orders: Bulk orders may have different delivery timelines. Our team will communicate expected delivery dates at the time of confirmation.","Damages in Transit: If your order arrives damaged, please photograph the package and contact us within 48 hours at info@mmlagrofoods.com"]} />

export const ReturnsPage: React.FC = () => <PolicyPage title="Return Policy" content={["Last updated: January 2025","We want you to be completely satisfied with your purchase from MML Agro Foods. Here is our return and refund policy.","Eligible Returns: Products may be returned within 7 days of delivery if they are damaged, defective, or significantly different from what was ordered.","Non-Returnable Items: Opened or partially used products cannot be returned for hygiene and safety reasons unless they are defective.","Return Process: To initiate a return, contact us at info@mmlagrofoods.com or call our support number with your order ID and reason for return.","Refund Timeline: Once we receive and inspect the returned product, refunds are processed within 5-7 business days to your original payment method.","Exchange Option: Instead of a refund, you may opt for an exchange with a product of equal or lesser value.","Bulk Orders: Bulk order returns are handled on a case-by-case basis. Please contact our business team for assistance."]} />

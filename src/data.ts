import { Product, Blog, Testimonial, TeamMember } from './types'

// export const products: Product[] = [
//   { id:1, name:'MML Gold Sunflower Oil', brand:'MML Gold', category:'sunflower', shortDesc:'Premium refined sunflower oil for daily cooking', description:'A premium refined sunflower oil offering light texture and superior cooking performance. Sourced from the finest sunflower seeds and processed using advanced refining technology, this oil is perfect for daily use in every Indian kitchen.', price:{'1L':180,'5L':850,'15L':2400}, features:['Rich in Vitamin E','Light & non-greasy','Ideal for frying & cooking','Zero trans fat','No cholesterol'], badge:'Best Seller', emoji:'🌻', color:'#d97706', bgColor:'#fef3c7', rating:4.8, reviews:1240 },
//   { id:2, name:'Sunnova Premium Refined Sunflower Oil', brand:'Sunnova', category:'sunflower', shortDesc:'Heart-friendly oil with low fat absorption', description:'Carefully refined for purity and nutrition, Sunnova ensures healthy cooking with great taste that your family will love. Ideal for everyday Indian cooking — from tempering to deep frying.', price:{'1L':165,'5L':780,'15L':2200}, features:['Low fat absorption','Heart-friendly','Consistent quality','Cholesterol free','Light texture'], badge:'New', emoji:'☀️', color:'#f59e0b', bgColor:'#fffbeb', rating:4.6, reviews:890 },
//   { id:3, name:'MML Gold Refined Sunflower Oil', brand:'MML Gold', category:'sunflower', shortDesc:'Superior quality for everyday Indian cooking', description:'MML Gold Refined Sunflower Oil is carefully processed to retain maximum nutrition while delivering exceptional taste. A trusted choice for health-conscious Indian families.', price:{'1L':170,'5L':800,'15L':2300}, features:['Low absorption','Heart-friendly','Consistent quality','Premium seeds','FSSAI certified'], emoji:'✨', color:'#b45309', bgColor:'#fef3c7', rating:4.7, reviews:760 },
//   { id:4, name:'Karthigai Jothi Deepam Oil', brand:'Karthigai Jothi', category:'traditional', shortDesc:'Sacred oil for lamps and rituals', description:'Specially crafted oil for lamps and rituals, ensuring purity and long-lasting light. A trusted companion for all your devotional needs. Burns clean with minimal smoke.', price:{'1L':120,'5L':550,'15L':1500}, features:['Long-lasting flame','Pure & sacred','Traditional formula','Clean burn','No residue'], badge:'Traditional', emoji:'🪔', color:'#92400e', bgColor:'#fef9f0', rating:4.9, reviews:2100 },
//   { id:5, name:'MML Gold Cold Press Groundnut Oil', brand:'MML Gold', category:'specialty', shortDesc:'Traditional cold-pressed groundnut oil', description:'Cold pressed from the finest groundnuts, this oil retains all natural nutrients and delivers authentic flavor. Perfect for South Indian cooking styles and traditional recipes.', price:{'1L':220,'5L':1050,'15L':3000}, features:['Cold pressed','Natural aroma','High smoke point','Rich flavor','Authentic taste'], badge:'Premium', emoji:'🥜', color:'#d97706', bgColor:'#fef3c7', rating:4.5, reviews:430 },
//   { id:6, name:'Sunnova Refined Rice Bran Oil', brand:'Sunnova', category:'specialty', shortDesc:'Light oil with high smoke point', description:'Refined from quality rice bran, this oil is ideal for high-temperature cooking. Its light flavor makes it versatile for all types of Indian cooking from stir fry to deep fry.', price:{'1L':190,'5L':900,'15L':2600}, features:['High smoke point','Light flavor','Vitamin E rich','Anti-oxidants','Ideal for all cooking'], emoji:'🍚', color:'#f59e0b', bgColor:'#fffbeb', rating:4.4, reviews:380 },
// ]

export const blogs: Blog[] = [
  { id:1, title:'Why Sunflower Oil is Best for Daily Cooking', excerpt:'Discover the science behind sunflower oil\'s health benefits and why millions of Indian families trust it for everyday cooking needs.', date:'April 15, 2025', readTime:'4 min read', emoji:'🌻', category:'Health' },
  { id:2, title:'Healthy Cooking Habits for Indian Kitchens', excerpt:'Simple tips and tricks to make your daily cooking healthier without compromising on the rich, bold flavors of traditional Indian cuisine.', date:'March 28, 2025', readTime:'5 min read', emoji:'🍳', category:'Tips' },
  { id:3, title:'Choosing the Right Oil for Your Family', excerpt:'A comprehensive guide to understanding different cooking oils and making the best choice for your family\'s health, taste, and budget.', date:'March 10, 2025', readTime:'6 min read', emoji:'💛', category:'Guide' },
  { id:4, title:'The Benefits of Vitamin E in Cooking Oils', excerpt:'Vitamin E is a powerful antioxidant that plays a key role in heart health and immunity. Learn how MML oils help you get more of it daily.', date:'February 20, 2025', readTime:'3 min read', emoji:'💊', category:'Health' },
  { id:5, title:'Understanding Oil Smoke Points: A Cooking Guide', excerpt:'Every oil has a smoke point that determines the best cooking method. This guide will help you pick the right oil for frying, sautéing, and more.', date:'February 5, 2025', readTime:'5 min read', emoji:'🔥', category:'Guide' },
  { id:6, title:'Traditional Indian Cooking with Deepam Oil', excerpt:'Explore the spiritual and practical uses of traditional lamp oils in Indian culture and how Karthigai Jothi oil continues this sacred tradition.', date:'January 18, 2025', readTime:'4 min read', emoji:'🪔', category:'Culture' },
]

export const testimonials: Testimonial[] = [
  { id:1, name:'Priya Sharma', city:'Chennai', text:'MML Gold is the best sunflower oil I have ever used. Light, healthy, and my curries taste absolutely amazing! My whole family loves it.', rating:5, product:'MML Gold Sunflower Oil' },
  { id:2, name:'Rajan Kumar', city:'Coimbatore', text:'Switched to Sunnova last year. My doctor noticed my cholesterol levels improved significantly. Great quality product at a very fair price!', rating:5, product:'Sunnova Premium Oil' },
  { id:3, name:'Meena Devi', city:'Madurai', text:'Karthigai Jothi Deepam Oil burns so cleanly and lasts so long. Perfect for our daily puja rituals. We have been using it for generations!', rating:5, product:'Karthigai Jothi Deepam' },
  { id:4, name:'Anand Krishnan', city:'Trichy', text:'Ordered bulk supply for my restaurant. Excellent quality and delivery was prompt. The MML team is very professional and responsive.', rating:5, product:'MML Gold Bulk Order' },
  { id:5, name:'Saritha Nair', city:'Salem', text:'As a nutritionist I recommend MML Gold to my clients. The Vitamin E content is excellent and the refining process maintains nutritional integrity.', rating:5, product:'MML Gold Sunflower Oil' },
  { id:6, name:'Vijay Murugan', city:'Tirunelveli', text:'Been using MML products for 3 years now. Consistent quality every single time. Proud to support a local brand that cares about health!', rating:4, product:'Sunnova Premium Oil' },
]

export const team: TeamMember[] = [
  { name:'Mr. Mohan Kumar', role:'Founder & CEO', emoji:'👨‍💼' },
  { name:'Mrs. Lakshmi Mohan', role:'Director of Quality', emoji:'👩‍🔬' },
  { name:'Mr. Arjun Raj', role:'Head of Operations', emoji:'👨‍🏭' },
  { name:'Ms. Divya Priya', role:'Marketing Lead', emoji:'👩‍💻' },
]

export const faqs = [
  { q:'Which oil is best for daily use?', a:'MML Gold and Sunnova sunflower oils are perfect for everyday cooking. They are light, healthy, and suitable for all Indian cooking styles including frying, tempering, and sautéing.' },
  { q:'Are your oils safe and healthy?', a:'Yes, all our oils are refined using advanced technology and quality tested at every stage to ensure maximum purity and nutrition. All products are FSSAI certified.' },
  { q:'Do you offer bulk supply?', a:'Yes, we provide bulk orders for businesses, distributors, wholesalers, and restaurants with competitive pricing, consistent supply, and dedicated support.' },
  { q:'What sizes are available?', a:'Our oils are available in 1L, 5L, and 15L packaging to suit individual families as well as bulk buyers. Custom packaging is available for large orders.' },
  { q:'How should I store cooking oil?', a:'Store in a cool, dry place away from direct sunlight. Keep the cap tightly closed after use. For best results, consume within 6 months of opening.' },
  { q:'Is free delivery available?', a:'Yes! We offer free delivery on all orders above ₹999. Standard delivery takes 3-5 business days across India.' },
]

export const whyChoose = [
  { icon:'🌱', title:'Premium Quality Seeds', desc:'Sourced from the finest sunflower farms across India' },
  { icon:'⚙️', title:'Advanced Refining Technology', desc:'State-of-the-art processing for maximum purity' },
  { icon:'💊', title:'Rich in Essential Nutrients', desc:'Packed with Vitamin E and heart-healthy fats' },
  { icon:'🧴', title:'Hygienically Packed', desc:'Sealed for freshness, safety, and longer shelf life' },
  { icon:'👨‍👩‍👧‍👦', title:'Trusted by Thousands', desc:'Preferred by 10,000+ families across South India' },
  { icon:'❤️', title:'Heart Healthy Formula', desc:'Scientifically formulated for cardiovascular wellness' },
]

export const mockOrders = [
  { id:'#MML10234', date:'April 20, 2025', status:'Delivered' as const, items:['MML Gold Sunflower Oil 5L × 2','Sunnova Premium 1L × 1'], total:1865 },
  { id:'#MML10198', date:'April 5, 2025', status:'Delivered' as const, items:['Karthigai Jothi Deepam 1L × 3'], total:360 },
  { id:'#MML10156', date:'March 22, 2025', status:'Delivered' as const, items:['MML Gold Refined 5L × 1','Sunnova Premium 5L × 2'], total:2360 },
  { id:'#MML10089', date:'March 1, 2025', status:'Delivered' as const, items:['MML Cold Press Groundnut 1L × 2'], total:440 },
]

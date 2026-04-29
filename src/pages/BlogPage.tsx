import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { blogs } from '../data'

const BlogPage: React.FC = () => {
  const { id } = useParams()
  const [cat, setCat] = useState('All')
  const cats = ['All','Health','Tips','Guide','Culture']

  if(id) {
    const blog = blogs.find(b=>b.id===Number(id))||blogs[0]
    return (
      <div className="pt-24 md:pt-36 min-h-screen bg-cream">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <Link to="/blog" className="inline-flex items-center gap-2 font-body text-gold-600 mb-8 hover:gap-3 transition-all"><ArrowLeft size={16}/>Back to Blog</Link>
          <div className="h-48 rounded-3xl bg-gold-50 flex items-center justify-center text-8xl mb-8">{blog.emoji}</div>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-gold-100 text-gold-700 text-xs font-body font-semibold">{blog.category}</span>
            <span className="font-body text-sm text-gray-400">{blog.date}</span>
            <span className="font-body text-sm text-gold-600">{blog.readTime}</span>
          </div>
          <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-3xl md:text-4xl font-black text-gray-900 mb-6">{blog.title}</h1>
          <div className="font-body text-gray-600 leading-relaxed space-y-4 text-lg">
            <p>{blog.excerpt}</p>
            <p>Cooking with the right oil is one of the most impactful choices you can make for your family's health. The type of oil you use affects not just the taste of your food, but also its nutritional profile and how it affects your body over time.</p>
            <p>MML Agro Foods has been dedicated to providing high-quality cooking oils that support a healthy lifestyle without compromising on flavor. Our oils undergo rigorous quality testing to ensure they meet the highest standards of purity and nutrition.</p>
            <p>When choosing a cooking oil, consider factors like smoke point, nutritional profile, and flavor compatibility with your cuisine. Sunflower oil, for instance, has a high smoke point making it ideal for frying, while also being rich in Vitamin E — a powerful antioxidant.</p>
          </div>
          <div className="mt-10 p-6 bg-gold-50 rounded-2xl border border-gold-200">
            <h3 style={{fontFamily:"'Playfair Display',serif"}} className="text-xl font-bold text-gray-900 mb-3">Try Our Premium Oils</h3>
            <p className="font-body text-gray-600 mb-4">Experience the quality difference with MML Gold and Sunnova oils.</p>
            <Link to="/shop" className="btn-primary">Shop Now <ArrowRight size={17}/></Link>
          </div>
        </div>
      </div>
    )
  }

  const filtered = cat==='All' ? blogs : blogs.filter(b=>b.category===cat)

  return (
    <div className="pt-24 md:pt-36 min-h-screen">
      <div className="gradient-gold py-16 px-4 text-center">
        <h1 style={{fontFamily:"'Playfair Display',serif"}} className="text-4xl md:text-6xl font-black text-white mb-4">Health & Cooking Blog</h1>
        <p className="font-body text-white/90 text-xl">Tips, recipes, and health insights for your kitchen</p>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-2 flex-wrap mb-8 justify-center">
          {cats.map(c=>(
            <button key={c} onClick={()=>setCat(c)} className={`px-4 py-2 rounded-full font-body font-semibold text-sm border-2 transition-all ${cat===c?'border-gold-500 bg-gold-50 text-gold-700':'border-gray-200 text-gray-500 hover:border-gold-300'}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(b=>(
            <article key={b.id} className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover border border-gold-100">
              <div className="h-44 bg-gold-50 flex items-center justify-center text-7xl">{b.emoji}</div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold-100 text-gold-700 text-xs font-body font-medium">{b.category}</span>
                  <span className="text-xs text-gold-600 font-body">{b.readTime}</span>
                </div>
                <h2 style={{fontFamily:"'Playfair Display',serif"}} className="text-xl font-bold text-gray-900 mb-3 leading-snug">{b.title}</h2>
                <p className="font-body text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{b.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs text-gray-400">{b.date}</span>
                  <Link to={`/blog/${b.id}`} className="flex items-center gap-1 text-gold-600 text-sm font-body font-semibold hover:gap-2 transition-all">Read More <ArrowRight size={14}/></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
export default BlogPage

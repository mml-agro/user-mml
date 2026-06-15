import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../context/ProductContext'

const ShopPage: React.FC = () => {
  const location = useLocation()
  const [cat, setCat] = useState('all')
  const [sort, setSort] = useState('default')
  const [search, setSearch] = useState('')
  const { products, loading, loadMoreProducts } = useProducts();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      // Load more when near bottom
      if (
        windowHeight + scrollTop >= fullHeight - 200 &&
        !loading
      ) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('q')
    if (q) setSearch(q)
  }, [location.search])

  const cats = [
    {
      k: 'all',
      l: 'All Products',
      c: products?.content?.length,
    },
    {
      k: 'SUNFLOWER_OIL',
      l: 'Sunflower Oils',
      c: products?.content?.filter(
        (p) => p.category === 'SUNFLOWER_OIL'
      ).length,
    },
    {
      k: 'SPECIALTY_OIL',
      l: 'Specialty Oils',
      c: products?.content?.filter(
        (p) => p.category === 'SPECIALTY_OIL'
      ).length,
    },
    {
      k: 'TRADITIONAL_OIL',
      l: 'Traditional Oils',
      c: products?.content?.filter(
        (p) => p.category === 'TRADITIONAL_OIL'
      ).length,
    },
  ];

  let filtered = products?.content?.filter((p) => {

    const mc =
      cat === 'all' ||
      p.category === cat;

    const ms =
      !search ||
      p.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      p.brand
        .toLowerCase()
        .includes(search.toLowerCase());

    return mc && ms;
  });
  const getVariantPrice = (product: any) => {
  const variant = product?.variants?.find(
    (v: any) => v.size === 'SIZE_1L'
  );

  return variant?.price || 0;
};

if (sort === 'pl') {
  filtered = [...filtered].sort(
    (a, b) =>
      getVariantPrice(a) -
      getVariantPrice(b)
  );
}

if (sort === 'ph') {
  filtered = [...filtered].sort(
    (a, b) =>
      getVariantPrice(b) -
      getVariantPrice(a)
  );
}

if (sort === 'name') {
  filtered = [...filtered].sort(
    (a, b) =>
      a.name.localeCompare(b.name)
  );
}

if (sort === 'rating') {
  filtered = [...filtered].sort(
    (a, b) =>
      b.avgRating - a.avgRating
  );
}

  return (
    <div className="pt-24 md:pt-36 min-h-screen bg-cream">
      <div className="gradient-gold py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 style={{ fontFamily: "'Playfair Display',serif" }} className="text-3xl md:text-5xl font-black text-white mb-3">Our Products</h1>
          <p className="font-body text-white/90 text-lg">Explore our complete range of cooking oils designed for every kitchen need.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="input-field flex-1" />
          <select value={sort} onChange={e => setSort(e.target.value)} className="input-field sm:w-48">
            <option value="default">Sort By</option>
            <option value="pl">Price: Low to High</option>
            <option value="ph">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>

        <div className="flex gap-8">
          <aside className="hidden sm:block w-52 shrink-0">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gold-100 sticky top-28">
              <h3 style={{ fontFamily: "'Playfair Display',serif" }} className="font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {cats.map(c => (
                  <button key={c.k} onClick={() => setCat(c.k)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-body font-medium transition-all border-2 ${cat === c.k ? 'border-gold-400 bg-gold-50 text-gold-800' : 'border-transparent text-gray-600 hover:bg-gold-50'}`}>
                    <span>{c.l}</span>
                    <span className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold ${cat === c.k ? 'bg-gold-600 text-white' : 'bg-gray-100 text-gray-500'}`}>{c.c}</span>
                  </button>
                ))}
              </div>
              {search && <div className="mt-4 pt-4 border-t border-gold-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-xs text-gray-500">Filter:</span>
                  <button onClick={() => setSearch('')}><X size={14} className="text-red-400" /></button>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-gold-100 text-gold-700 text-xs font-body">"{search}"</span>
              </div>}
            </div>
          </aside>

          <main className="flex-1">
            {/* Mobile category pills */}
            <div className="flex gap-2 flex-wrap mb-5 sm:hidden">
              {cats.map(c => (
                <button key={c.k} onClick={() => setCat(c.k)} className={`px-3 py-1.5 rounded-full text-xs font-body font-semibold border-2 transition-all ${cat === c.k ? 'border-gold-500 bg-gold-50 text-gold-700' : 'border-gray-200 text-gray-500'}`}>{c.l}</button>
              ))}
            </div>
            <p className="font-body text-gray-500 text-sm mb-6">Showing <span className="font-semibold text-gray-900">{filtered.length}</span> products</p>
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 style={{ fontFamily: "'Playfair Display',serif" }} className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="font-body text-gray-500 mb-6">Try adjusting your search or filters</p>
                <button onClick={() => { setSearch(''); setCat('all') }} className="btn-primary">Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
export default ShopPage

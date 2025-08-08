import React, { useState } from 'react'
import { Search, Filter, Grid, List, Star, ShoppingCart } from 'lucide-react'

const Products = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  // Demo ürünler
  const allProducts = [
    {
      id: 1,
      name: "Ultra Gaming Keyboard Pro",
      price: 299.99,
      originalPrice: 349.99,
      image: "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 124,
      category: "gaming",
      isNew: true,
      discount: 15
    },
    {
      id: 2,
      name: "RGB Wireless Mouse X1",
      price: 159.99,
      originalPrice: 189.99,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 89,
      category: "gaming",
      isNew: false,
      discount: 16
    },
    // Daha fazla ürün eklenecek...
  ]

  const categories = [
    { id: 'all', name: 'Tümü' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'audio', name: 'Ses & Müzik' },
    { id: 'monitor', name: 'Monitör' },
    { id: 'accessories', name: 'Aksesuar' },
  ]

  return (
    <div className="min-h-screen pt-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="neon-text">Tüm</span>
            <span className="text-white"> Ürünler</span>
          </h1>
          <p className="text-gray-400">En kaliteli ürünleri keşfedin</p>
        </div>

        {/* Filters & Search */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-500 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-500"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-neon-500"
            >
              <option value="newest">En Yeni</option>
              <option value="price-low">Fiyat: Düşük → Yüksek</option>
              <option value="price-high">Fiyat: Yüksek → Düşük</option>
              <option value="rating">En Çok Beğenilen</option>
            </select>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-neon-500 text-dark-900'
                    : 'bg-dark-800 text-gray-400 hover:text-neon-500'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-neon-500 text-dark-900'
                    : 'bg-dark-800 text-gray-400 hover:text-neon-500'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {allProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode={viewMode}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Product Card Component
const ProductCard = ({ product, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div className="glass-card p-6 flex gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 object-cover rounded-xl"
        />
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-neon-500 fill-current'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold neon-text">₺{product.price}</span>
              {product.originalPrice && (
                <span className="text-gray-500 line-through">₺{product.originalPrice}</span>
              )}
            </div>
            <button className="btn-neon">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-6 group hover:shadow-neon-lg hover:scale-105 transition-all duration-300">
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 px-3 py-1 bg-neon-500 text-dark-900 text-xs font-bold rounded-full">
            YENİ
          </span>
        )}
        {product.discount > 0 && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            -%{product.discount}
          </span>
        )}
      </div>
      
      <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
      
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? 'text-neon-500 fill-current'
                  : 'text-gray-600'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-400">({product.reviews})</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold neon-text">₺{product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-sm">₺{product.originalPrice}</span>
          )}
        </div>
        <button className="p-2 bg-neon-500/20 hover:bg-neon-500 hover:text-dark-900 rounded-lg transition-all duration-300">
          <ShoppingCart className="w-5 h-5 text-neon-500 hover:text-dark-900" />
        </button>
      </div>
    </div>
  )
}

export default Products

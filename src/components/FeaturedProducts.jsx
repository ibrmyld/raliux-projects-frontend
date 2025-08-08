import React, { useState, useEffect } from 'react'
import { Star, ShoppingCart, Eye, Heart } from 'lucide-react'
import { apiService } from '../services/api.js'

const FeaturedProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [connectionStatus, setConnectionStatus] = useState('checking')

  // Ürünleri API'dan yükle
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setConnectionStatus('checking')
        
        const response = await apiService.getProducts({ 
          featured: true, 
          per_page: 6 
        })
        
        // API formatını component formatına çevir
        const formattedProducts = response.products.map(product => ({
          id: product.id,
          name: product.name,
          price: product.sale_price || product.price,
          originalPrice: product.sale_price ? product.price : null,
          image: product.featured_image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
          rating: 4.0 + Math.random() * 1.0, // Mock rating
          reviews: Math.floor(Math.random() * 200) + 50, // Mock reviews
          category: "Premium",
          isNew: Math.random() > 0.7, // Random new badge
          discount: product.sale_price ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0,
          slug: product.slug,
          currency: product.currency
        }))
        
        setProducts(formattedProducts)
        setConnectionStatus(apiService.isBackendConnected() ? 'online' : 'offline')
        
      } catch (error) {
        console.error('Error loading products:', error)
        setConnectionStatus('offline')
        
        // Fallback demo products
        setProducts([
    {
      id: 1,
      name: "Ultra Gaming Keyboard Pro",
      price: 299.99,
      originalPrice: 349.99,
      image: "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 124,
      category: "Gaming",
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
      category: "Gaming",
      isNew: false,
      discount: 16
    },
    {
      id: 3,
      name: "Premium Gaming Headset",
      price: 199.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 203,
      category: "Audio",
      isNew: false,
      discount: 20
    },
    {
      id: 4,
      name: "4K Gaming Monitor 27''",
      price: 599.99,
      originalPrice: 699.99,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 156,
      category: "Monitor",
      isNew: true,
      discount: 14
    },
    {
      id: 5,
      name: "Mechanical Switch Kit",
      price: 89.99,
      originalPrice: 109.99,
      image: "https://images.unsplash.com/photo-1540829917886-91ab031b1764?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 67,
      category: "Accessories",
      isNew: false,
      discount: 18
    },
    {
      id: 6,
      name: "Wireless Charging Pad",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1609091841946-f7fe6c0a0b7b?w=400&h=400&fit=crop",
      rating: 4.3,
      reviews: 45,
      category: "Accessories",
      isNew: true,
      discount: 29
    }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold neon-text mb-4">Öne Çıkan Ürünler</h2>
            <div className="w-24 h-1 bg-gradient-neon mx-auto mb-4"></div>
            <p className="text-gray-300 max-w-2xl mx-auto">
              En popüler ve kaliteli ürünlerimizi keşfedin
            </p>
          </div>
          
          {/* Loading Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="glass-card p-6 animate-pulse">
                <div className="bg-gray-700 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-700 h-4 rounded mb-2"></div>
                <div className="bg-gray-700 h-6 rounded mb-4"></div>
                <div className="flex justify-between">
                  <div className="bg-gray-700 h-4 w-20 rounded"></div>
                  <div className="bg-gray-700 h-4 w-16 rounded"></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-400">
              {connectionStatus === 'checking' ? 'Bağlantı kontrol ediliyor...' : 
               connectionStatus === 'offline' ? 'Offline modda çalışıyor' : 'Ürünler yükleniyor...'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text">Öne Çıkan</span>
            <span className="text-white"> Ürünler</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            En popüler ve kaliteli ürünlerimizi keşfedin
          </p>
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-8">
            <div className="w-16 h-1 bg-gradient-neon rounded-full shadow-neon-sm"></div>
          </div>
        </div>

        {/* Connection Status */}
        <div className="text-center mb-8">
          <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
            connectionStatus === 'online' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
          }`}>
            {connectionStatus === 'online' ? '🟢 Live Data' : '🟠 Demo Data'}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group glass-card p-6 hover:shadow-neon-lg hover:scale-105 transition-all duration-500 fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Image */}
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="px-3 py-1 bg-neon-500 text-dark-900 text-xs font-bold rounded-full">
                      YENİ
                    </span>
                  )}
                  {product.discount > 0 && (
                    <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      -%{product.discount}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-2 glass-card hover:bg-neon-500/20 rounded-lg transition-colors">
                    <Heart className="w-4 h-4 text-neon-500" />
                  </button>
                  <button className="p-2 glass-card hover:bg-neon-500/20 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-neon-500" />
                  </button>
                </div>

                {/* Quick Add to Cart */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-full btn-neon-fill py-2 text-sm">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Sepete Ekle
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div>
                {/* Category */}
                <span className="text-neon-500 text-sm font-medium">
                  {product.category}
                </span>
                
                {/* Product Name */}
                <h3 className="text-lg font-bold text-white mt-2 mb-3 group-hover:text-neon-400 transition-colors">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
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
                  <span className="text-sm text-gray-400">
                    {product.rating} ({product.reviews} değerlendirme)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold neon-text">
                      ₺{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through">
                        ₺{product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {/* Add to Cart Icon */}
                  <button className="p-2 bg-neon-500/20 hover:bg-neon-500 hover:text-dark-900 rounded-lg transition-all duration-300 group/btn">
                    <ShoppingCart className="w-5 h-5 text-neon-500 group-hover/btn:text-dark-900" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-neon px-8 py-4 text-lg">
            Tüm Ürünleri Görüntüle
          </button>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-neon-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-neon-500/3 rounded-full blur-3xl" />
      </div>
    </section>
  )
}

export default FeaturedProducts

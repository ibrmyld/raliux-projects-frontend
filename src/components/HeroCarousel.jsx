import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Eye } from 'lucide-react'

const HeroCarousel = ({ products = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Demo ürünler eğer prop gelmezse
  const demoProducts = [
    {
      id: 1,
      name: "Neon Gaming Keyboard",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=500&h=500&fit=crop",
      rating: 4.8,
      featured: true
    },
    {
      id: 2,
      name: "RGB Gaming Mouse",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
      rating: 4.6,
      featured: true
    },
    {
      id: 3,
      name: "Ultra Gaming Headset",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=500&h=500&fit=crop",
      rating: 4.9,
      featured: true
    },
    {
      id: 4,
      name: "Gaming Monitor 4K",
      price: 599.99,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop",
      rating: 4.7,
      featured: true
    },
    {
      id: 5,
      name: "Mechanical Switch Set",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1540829917886-91ab031b1764?w=500&h=500&fit=crop",
      rating: 4.5,
      featured: true
    }
  ]

  const items = products.length > 0 ? products : demoProducts

  // Auto play
  useEffect(() => {
    if (!isAutoPlay) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000) // 4 saniyede bir değiş

    return () => clearInterval(interval)
  }, [items.length, isAutoPlay])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlay(false) // Manuel seçimde auto play'i durdur
    setTimeout(() => setIsAutoPlay(true), 10000) // 10 saniye sonra tekrar başlat
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
    goToSlide(newIndex)
  }

  const goToNext = () => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1
    goToSlide(newIndex)
  }

  const getItemClass = (index) => {
    const total = items.length
    const current = currentIndex
    
    if (index === current) return 'active'
    
    // Sol taraf ürünleri
    const leftPrev = (current - 1 + total) % total
    const leftFar = (current - 2 + total) % total
    
    // Sağ taraf ürünleri  
    const rightNext = (current + 1) % total
    const rightFar = (current + 2) % total
    
    if (index === leftPrev) return 'prev'
    if (index === rightNext) return 'next'
    if (index === leftFar) return 'far-left'
    if (index === rightFar) return 'far-right'
    
    return 'hidden'
  }

  return (
    <div className="relative w-full min-h-screen lg:h-[120vh] bg-gradient-dark overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-neon-500/30 via-neon-500/10 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_70%)]" />
      </div>
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'float 6s ease-in-out infinite'
          }}
        />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-8xl mx-auto">
          
          {/* Enhanced Title Section */}
          <div className="text-center mb-20">
            {/* Floating Badge */}
            <div className="inline-block mb-8">
              <span className="px-6 py-3 bg-neon-500/20 backdrop-blur-sm border border-neon-500/50 rounded-full text-neon-400 font-medium text-sm tracking-wider uppercase">
                ✨ Yeni Teknoloji Ürünleri
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight">
              <span className="neon-text text-transparent bg-clip-text bg-gradient-neon">En İyi</span>
              <br />
              <span className="text-white"> Ürünler</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Teknolojinin en yeni ve kaliteli ürünlerini keşfedin. 
              <br />
              <span className="text-neon-400">Premium kalite, uygun fiyat.</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <button className="btn-neon-fill px-8 py-4 text-lg font-semibold">
                Ürünleri Keşfet
              </button>
              <button className="btn-neon px-8 py-4 text-lg font-semibold">
                Kategoriler
              </button>
            </div>
          </div>

          {/* Enhanced 3D Carousel - Wider Container */}
          <div className="carousel-3d relative h-[500px] w-full max-w-none flex items-center justify-center overflow-visible">
            {items.map((product, index) => (
              <div
                key={product.id}
                className={`carousel-item absolute w-96 h-96 cursor-pointer ${getItemClass(index)}`}
                onClick={() => goToSlide(index)}
              >
                <div className="glass-card h-full p-6 group hover:scale-105 transition-all duration-300">
                  {/* Product Image */}
                  <div className="relative mb-4 overflow-hidden rounded-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Floating Icons */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="p-2 bg-neon-500/20 backdrop-blur-sm rounded-full hover:bg-neon-500/40 transition-colors">
                        <Eye className="w-4 h-4 text-neon-500" />
                      </button>
                      <button className="p-2 bg-neon-500/20 backdrop-blur-sm rounded-full hover:bg-neon-500/40 transition-colors">
                        <ShoppingCart className="w-4 h-4 text-neon-500" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-center gap-2 mb-3">
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
                      <span className="text-sm text-gray-400">({product.rating})</span>
                    </div>

                    {/* Price */}
                    <div className="text-2xl font-bold neon-text mb-4">
                      ₺{product.price}
                    </div>

                    {/* Action Button */}
                    <button className="btn-neon w-full">
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Navigation Controls */}
          <div className="relative mt-16 mb-8">
            {/* Center Dots Indicator - Yukarı taşındı */}
            <div className="relative z-[100] flex items-center justify-center gap-4 py-4">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative z-[100] transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 h-4 bg-gradient-neon rounded-full shadow-neon scale-125'
                      : 'w-4 h-4 bg-gray-600 hover:bg-gray-500 rounded-full hover:scale-110'
                  }`}
                >
                  {/* Active indicator glow */}
                  {index === currentIndex && (
                    <div className="absolute inset-0 bg-gradient-neon rounded-full blur-sm opacity-50 animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Side Arrow Buttons - Hero Section İçinde Sabit */}
      <div className="absolute inset-0 pointer-events-none">
        <button
          onClick={goToPrevious}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 p-4 glass-card hover:neon-glow hover:scale-110 transition-all duration-300 group z-[100] pointer-events-auto"
        >
          <ChevronLeft className="w-8 h-8 text-neon-500 group-hover:text-white" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 p-4 glass-card hover:neon-glow hover:scale-110 transition-all duration-300 group z-[100] pointer-events-auto"
        >
          <ChevronRight className="w-8 h-8 text-neon-500 group-hover:text-white" />
        </button>
      </div>

      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-neon-500/15 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-[120px] h-[120px] bg-neon-500/10 rounded-full blur-3xl animate-bounce-slow" />
        <div className="absolute top-1/3 -left-20 w-64 h-64 bg-neon-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-500/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-500 rounded-full animate-bounce opacity-60" style={{ animationDuration: '3s', animationDelay: '1s' }} />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-neon-400 rounded-full animate-bounce opacity-40" style={{ animationDuration: '4s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-neon-300 rounded-full animate-bounce opacity-50" style={{ animationDuration: '5s' }} />
      </div>
    </div>
  )
}

export default HeroCarousel

import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Scroll efekti
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Menu kapat location değişince
  useEffect(() => {
    setIsMenuOpen(false)
  }, [location])

  const navItems = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Ürünler', path: '/products' },
    { name: 'Hakkımızda', path: '/about' },
    { name: 'İletişim', path: '/contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass-card backdrop-blur-xl shadow-neon-sm' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              {/* R Letter Logo */}
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-neon rounded-xl shadow-neon-sm group-hover:shadow-neon transition-all duration-300 group-hover:scale-110">
                <span className="text-2xl font-bold text-dark-900">R</span>
              </div>
              
              {/* Glow Ring */}
              <div className="absolute inset-0 rounded-xl border-2 border-neon-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            </div>
            
            {/* Brand Name */}
            <div className="ml-3">
              <span className="text-2xl font-bold neon-text group-hover:text-neon-400 transition-colors">
                Raliux
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                  isActive(item.path)
                    ? 'text-neon-500'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
                
                {/* Active Indicator */}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-neon shadow-neon-sm" />
                )}
                
                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 text-gray-300 hover:text-neon-500 transition-colors duration-300 hover:bg-dark-800 rounded-lg">
              <Search className="w-5 h-5" />
            </button>
            
            {/* Cart */}
            <button className="relative p-2 text-gray-300 hover:text-neon-500 transition-colors duration-300 hover:bg-dark-800 rounded-lg">
              <ShoppingCart className="w-5 h-5" />
              {/* Cart Badge */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-neon-500 text-dark-900 text-xs font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* User */}
            <button className="p-2 text-gray-300 hover:text-neon-500 transition-colors duration-300 hover:bg-dark-800 rounded-lg">
              <User className="w-5 h-5" />
            </button>
            
            {/* CTA Button */}
            <button className="btn-neon ml-4">
              Giriş Yap
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-300 hover:text-neon-500 transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="glass-card mx-4 my-2 rounded-xl border border-neon-500/20">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Navigation */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-neon-500/20 text-neon-500 shadow-neon-sm'
                    : 'text-gray-300 hover:bg-dark-800 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Actions */}
            <div className="pt-4 border-t border-dark-700 space-y-3">
              <button className="w-full btn-neon-fill">
                Giriş Yap
              </button>
              
              <div className="flex justify-center space-x-6">
                <button className="p-2 text-gray-300 hover:text-neon-500 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
                <button className="relative p-2 text-gray-300 hover:text-neon-500 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-neon-500 text-dark-900 text-xs font-bold rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
                <button className="p-2 text-gray-300 hover:text-neon-500 transition-colors">
                  <User className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

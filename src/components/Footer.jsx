import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Instagram, 
  Twitter, 
  Youtube, 
  Github,
  Mail,
  Phone,
  MapPin,
  ArrowUp
} from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = {
    company: [
      { name: 'Hakkımızda', path: '/about' },
      { name: 'İletişim', path: '/contact' },
      { name: 'Kariyer', path: '/career' },
      { name: 'Basın', path: '/press' },
    ],
    products: [
      { name: 'Tüm Ürünler', path: '/products' },
      { name: 'Yeni Ürünler', path: '/products?sort=newest' },
      { name: 'İndirimler', path: '/products?sale=true' },
      { name: 'Öne Çıkanlar', path: '/products?featured=true' },
    ],
    support: [
      { name: 'Yardım Merkezi', path: '/help' },
      { name: 'İade & Değişim', path: '/returns' },
      { name: 'Kargo Takibi', path: '/tracking' },
      { name: 'Garanti', path: '/warranty' },
    ],
    legal: [
      { name: 'Gizlilik Politikası', path: '/privacy' },
      { name: 'Kullanım Şartları', path: '/terms' },
      { name: 'Çerez Politikası', path: '/cookies' },
      { name: 'KVKK', path: '/kvkk' },
    ]
  }

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/raliux', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/raliux', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com/raliux', label: 'YouTube' },
    { icon: Github, href: 'https://github.com/raliux', label: 'GitHub' },
  ]

  return (
    <footer className="relative bg-dark-900 border-t border-dark-700">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 p-3 glass-card hover:neon-glow transition-all duration-300 group"
      >
        <ArrowUp className="w-5 h-5 text-neon-500 group-hover:text-white" />
      </button>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-neon rounded-xl shadow-neon-sm">
                <span className="text-2xl font-bold text-dark-900">R</span>
              </div>
              <span className="ml-3 text-2xl font-bold neon-text">Raliux</span>
            </div>
            
            {/* Description */}
            <p className="text-gray-400 mb-6 leading-relaxed">
              Teknolojinin en yeni ve kaliteli ürünlerini sunan, 
              müşteri memnuniyetini ön planda tutan yenilikçi e-ticaret platformu.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-3 text-neon-500" />
                <span>info@raliux.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3 text-neon-500" />
                <span>+90 (212) 123 45 67</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-3 text-neon-500" />
                <span>İstanbul, Türkiye</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Şirket</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-neon-500 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Ürünler</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-neon-500 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Destek</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-neon-500 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Yasal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-neon-500 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-dark-700">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold text-white mb-4">
              Haberlerden Haberdar Olun
            </h3>
            <p className="text-gray-400 mb-6">
              Yeni ürünler ve kampanyalardan ilk siz haberdar olun.
            </p>
            
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="E-mail adresiniz"
                className="flex-1 px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-neon-500 transition-colors"
              />
              <button className="btn-neon-fill px-6">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-700 bg-dark-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Raliux. Tüm hakları saklıdır.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-neon-500 transition-colors duration-300 hover:bg-dark-800 rounded-lg"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-neon-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-neon-500/3 rounded-full blur-3xl" />
      </div>
    </footer>
  )
}

export default Footer

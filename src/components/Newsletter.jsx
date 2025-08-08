import React, { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <section className="py-20 bg-dark-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-neon-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-neon rounded-2xl flex items-center justify-center shadow-neon-lg">
            <Mail className="w-10 h-10 text-dark-900" />
          </div>
        </div>
        
        {/* Content */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="text-white">Haberlerden</span>
          <span className="neon-text"> Haberdar Olun</span>
        </h2>
        
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Yeni ürünler, özel kampanyalar ve teknoloji haberlerinden 
          ilk siz haberdar olun.
        </p>

        {/* Newsletter Form */}
        {!isSubscribed ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail adresiniz"
                className="flex-1 px-6 py-4 bg-dark-800 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-neon-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="btn-neon-fill px-8 py-4 whitespace-nowrap"
              >
                Abone Ol
              </button>
            </div>
            
            <p className="text-gray-500 text-sm mt-4">
              E-mail adresinizi kimseyle paylaşmıyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
            </p>
          </form>
        ) : (
          <div className="max-w-md mx-auto glass-card p-8 border border-neon-500/50">
            <CheckCircle className="w-16 h-16 text-neon-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Başarılı!</h3>
            <p className="text-gray-400">
              E-mail adresiniz başarıyla kaydedildi. 
              Hoş geldin mesajımızı kontrol edin.
            </p>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-neon-500/20 rounded-lg flex items-center justify-center">
              <span className="text-neon-500 font-bold text-xl">🚀</span>
            </div>
            <h4 className="text-white font-semibold mb-2">Yeni Ürünler</h4>
            <p className="text-gray-400 text-sm">En yeni teknoloji ürünlerinden ilk haberdar olun</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-neon-500/20 rounded-lg flex items-center justify-center">
              <span className="text-neon-500 font-bold text-xl">💰</span>
            </div>
            <h4 className="text-white font-semibold mb-2">Özel İndirimler</h4>
            <p className="text-gray-400 text-sm">Sadece abone üyelerine özel kampanyalar</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 bg-neon-500/20 rounded-lg flex items-center justify-center">
              <span className="text-neon-500 font-bold text-xl">📰</span>
            </div>
            <h4 className="text-white font-semibold mb-2">Tech Haberler</h4>
            <p className="text-gray-400 text-sm">Teknoloji dünyasından son gelişmeler</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter

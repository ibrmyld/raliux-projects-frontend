import React from 'react'
import { Gamepad2, Headphones, Monitor, Keyboard, Mouse, Usb } from 'lucide-react'

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Gaming',
      icon: Gamepad2,
      count: 156,
      color: 'from-neon-400 to-neon-600'
    },
    {
      id: 2,
      name: 'Ses & Müzik',
      icon: Headphones,
      count: 89,
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 3,
      name: 'Monitör',
      icon: Monitor,
      count: 67,
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 4,
      name: 'Klavye',
      icon: Keyboard,
      count: 124,
      color: 'from-orange-400 to-orange-600'
    },
    {
      id: 5,
      name: 'Mouse',
      icon: Mouse,
      count: 95,
      color: 'from-red-400 to-red-600'
    },
    {
      id: 6,
      name: 'Aksesuar',
      icon: Usb,
      count: 203,
      color: 'from-green-400 to-green-600'
    }
  ]

  return (
    <section className="py-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">Ürün</span>
            <span className="neon-text"> Kategorileri</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            İhtiyacınız olan ürünü kolayca bulun
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={category.id}
                className="group glass-card p-6 text-center hover:shadow-neon-lg hover:scale-105 transition-all duration-300 cursor-pointer fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Category Name */}
                <h3 className="text-white font-semibold mb-2 group-hover:text-neon-400 transition-colors">
                  {category.name}
                </h3>
                
                {/* Product Count */}
                <p className="text-gray-400 text-sm">
                  {category.count} ürün
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Categories

import React from 'react'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const { slug } = useParams()

  return (
    <div className="min-h-screen pt-20 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold neon-text mb-4">Ürün Detayı</h1>
          <p className="text-gray-400">Ürün slug: {slug}</p>
          <p className="text-gray-400 mt-4">Bu sayfa yakında tamamlanacak...</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

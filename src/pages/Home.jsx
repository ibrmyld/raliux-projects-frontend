import React from 'react'
import HeroCarousel from '../components/HeroCarousel'
import FeaturedProducts from '../components/FeaturedProducts'
import Categories from '../components/Categories'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Carousel */}
      <HeroCarousel />
      
      {/* Categories Section */}
      <Categories />
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}

export default Home

import React, { useState, useEffect } from 'react';
import { Download, ExternalLink, Star, Eye, Sparkles, TrendingUp, Award, Search as SearchIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import ProductFilter from '../components/ProductFilter';
import GenericCardActions from '../components/GenericCardActions';

const Products = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({ search: '', category: '' });

  // Static data
  const products = [
    {
      id: 1,
      name: "React Template Pack",
      description: "Modern React templates with Tailwind CSS and advanced animations",
      price: "0.02",
      priceUSD: "$29",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      rating: "4.8",
      downloads: 1250,
      type: "Template",
      category: { name: "Templates" },
      featured: true,
      trending: true
    },
    {
      id: 2,
      name: "3D Model Collection",
      description: "High-quality 3D models for games and apps with textures included",
      price: "0.035",
      priceUSD: "$49",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
      rating: "4.9",
      downloads: 890,
      type: "3D Model",
      category: { name: "3D Models" },
      featured: false,
      trending: false
    },
    {
      id: 3,
      name: "Security Scripts",
      description: "Cybersecurity automation scripts with documentation and examples",
      price: "0.025",
      priceUSD: "$39",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
      rating: "4.7",
      downloads: 654,
      type: "Script",
      category: { name: "Scripts" },
      featured: false,
      trending: true
    }
  ];

  const categories = [
    { id: 1, name: "Templates" },
    { id: 2, name: "3D Models" },
    { id: 3, name: "Scripts" }
  ];

  const stats = [
    { label: "Premium Products", value: "50+", icon: Award },
    { label: "Active Users", value: "10K+", icon: TrendingUp },
    { label: "Downloads", value: "25K+", icon: Download },
    { label: "Satisfaction", value: "98%", icon: Star }
  ];

  useEffect(() => {
    setFilteredProducts(products);
  }, []);

  // Category badge styling function
  const getCategoryBadgeClasses = (category) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-bold text-white";
    switch (category) {
      case 'Templates':
        return `${baseClasses} bg-gradient-to-r from-blue-500 to-blue-600`;
      case '3D Models':
        return `${baseClasses} bg-gradient-to-r from-purple-500 to-purple-600`;
      case 'Scripts':
        return `${baseClasses} bg-gradient-to-r from-green-500 to-green-600`;
      default:
        return `${baseClasses} bg-gradient-to-r from-gray-500 to-gray-600`;
    }
  };

  // Payment functions removed - handled in admin panel

  const handleFilterChange = async (filters) => {
    // Show loading state for better UX
    setIsLoading(true);
    setCurrentFilters(filters);
    
    // Simulate API delay for realistic loading experience
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filtered = [...products];
    
    if (filters.search) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.type.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.category) {
      filtered = filtered.filter(p => p.category.name === filters.category);
    }
    
    setFilteredProducts(filtered);
    setIsLoading(false);
  };

  // Loading Skeleton Component
  const ProductSkeleton = () => (
    <div className="card overflow-hidden">
      <div className="relative h-56 bg-gray-200 dark:bg-gray-700 animate-pulse">
        <div className="absolute top-4 left-4 w-20 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-24 h-12 bg-gray-300 dark:bg-gray-600 rounded-2xl"></div>
      </div>
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  // Empty State Component
  const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
        <SearchIcon className="w-12 h-12 text-gray-400 dark:text-gray-600" />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
        No products found
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        {currentFilters.search || currentFilters.category 
          ? `No products match your current filters. Try adjusting your search criteria.`
          : "No products available at the moment."
        }
      </p>

      {(currentFilters.search || currentFilters.category) && (
        <button
          onClick={() => handleFilterChange({ search: '', category: '' })}
          className="btn-outline"
        >
          Clear Filters
        </button>
      )}
    </div>
  );

  // Ultra Simplified Product Card - Pure CSS Performance
  const ProductCard = ({ product, index }) => {
    return (
      <div
        key={product.id}
        className={`card overflow-hidden relative cursor-pointer
          ${product.featured ? 'ring-1 ring-primary-400/30 shadow-lg' : 'shadow-md'}`}
        onMouseEnter={() => setHoveredCard(product.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Featured Badge - Static */}
        {product.featured && (
          <div className="absolute top-0 right-0 z-20">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-bl-lg shadow-lg">
              <div className="flex items-center space-x-1">
                <Sparkles size={12} />
                <span className="text-xs font-bold">FEATURED</span>
              </div>
            </div>
          </div>
        )}

        <div className="relative h-56 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {/* Simple gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Category Badge - Static */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`${getCategoryBadgeClasses(product.category?.name || product.type)} 
              shadow-lg backdrop-blur-sm border border-white/20`}>
              {product.category?.name || product.type}
            </span>
          </div>

          {/* Trending Badge - Static */}
          {product.trending && (
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full shadow-lg backdrop-blur-sm">
                <div className="flex items-center space-x-1">
                  <TrendingUp size={12} />
                  <span className="text-xs font-bold">HOT</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Price Badge - Static */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-2xl border border-white/30 shadow-xl">
              <div className="text-center">
                <div className="text-lg font-bold text-primary-400">{product.price} ETH</div>
                <div className="text-xs text-gray-300">{product.priceUSD}</div>
              </div>
            </div>
          </div>
          
          {/* Generic Card Actions */}
          <GenericCardActions
            targetId={product.id}
            targetType="product"
            layout="overlay"
            position="bottom-left"
            showFavorite={true}
            showLike={true}
            showComment={false}
            showShare={true}
            showStats={false}
            size="small"
          />
        </div>

        {/* Content Section - Simplified */}
        <div className="p-6 space-y-4">          
          <div>
            {/* Simple title */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {product.name}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              {product.description}
            </p>

            {/* Rating Section */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {product.rating}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <Download size={14} />
                <span>{product.downloads.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons - View Only */}
            <div className="space-y-3">
              <Link to={`/products/${product.id}`}>
                <div className="w-full btn-primary flex items-center justify-center space-x-2">
                  <Eye size={16} />
                  <span>View Details</span>
                </div>
              </Link>
              
              <div className="w-full btn-outline flex items-center justify-center space-x-2 opacity-50 cursor-not-allowed">
                <Download size={16} />
                <span>Contact for Purchase</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Premium Products - Digital Assets for Developers"
        description="Discover premium templates, 3D models, and scripts for developers. High-quality digital assets with crypto payment options."
        keywords={['React templates', 'premium products', '3D models', 'developer tools', 'crypto payments']}
        type="website"
        url="/products"
      />
      
      {/* Enhanced Hero Section with Parallax */}
      <div className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 py-20 overflow-hidden">
        {/* Parallax Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-200 dark:bg-primary-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 dark:bg-pink-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20"></div>
        </div>

        {/* Floating Geometric Shapes - Reduced and Slower */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-3 h-3 bg-primary-400/10 ${i % 2 === 0 ? 'rounded-full' : 'rotate-45'}`}
              style={{
                left: `${20 + i * 25}%`,
                top: `${30 + (i % 2) * 20}%`,
              }}
            ></div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Premium Products
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover high-quality templates, 3D models, and scripts crafted by expert developers. 
              <span className="text-primary-600 dark:text-primary-400 font-semibold"> Pay with crypto or traditional methods.</span>
            </p>

            {/* Simple Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Simplified */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <ProductFilter 
          categories={categories}
          onFilterChange={handleFilterChange}
        />

        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
                <span>Loading products...</span>
              </span>
            ) : (
              `Showing ${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'}`
            )}
          </p>
        </div>

        {/* Products Grid - Pure CSS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {isLoading ? (
            // Loading Skeletons
            [...Array(6)].map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))
          ) : filteredProducts.length === 0 ? (
            // Empty State
            <EmptyState />
          ) : (
            // Products - Simplified
            filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index} 
              />
            ))
          )}
        </div>

        {/* Simple CTA Section */}
        <div className="text-center mt-16 py-12 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-800 dark:to-purple-900 rounded-3xl border border-primary-100 dark:border-gray-700 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              More Amazing Products Coming Soon! 🚀
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Join our community to get notified about new releases, exclusive discounts, and early access to premium content.
            </p>
            <button className="btn-primary px-8 py-3 text-lg font-semibold">
              Follow for Updates
            </button>
          </div>
        </div>
      </div>

      {/* Payment removed from frontend - handled in admin panel */}
    </div>
  );
};

export default Products;
import React, { useState } from 'react';
import { Heart, BookOpen, ArrowLeft, Sparkles, Package, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
// Removed motion import
import { useAuth } from '../context/AuthContext';
import { useGenericUserFavorites } from '../hooks/useGeneric';
import { SkeletonGrid } from '../components/LoadingSpinner';
import BlogCard from '../components/BlogCard';
import { getCategoryBadgeClasses } from '../utils/categoryColors';

const Favorites = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'post', 'product'
  
  // Get all favorites
  const { data: allFavorites = [], isLoading: allLoading, error: allError } = useGenericUserFavorites(null, isAuthenticated);
  
  // Get post favorites
  const { data: postFavorites = [], isLoading: postLoading, error: postError } = useGenericUserFavorites('post', isAuthenticated);
  
  // Get product favorites  
  const { data: productFavorites = [], isLoading: productLoading, error: productError } = useGenericUserFavorites('product', isAuthenticated);
  
  // Debug logs


  const isLoading = allLoading || postLoading || productLoading;
  const error = allError || postError || productError;

  // Filter favorites based on active tab
  const getFilteredFavorites = () => {
    switch (activeTab) {
      case 'post':
        return postFavorites;
      case 'product':
        return productFavorites;
      default:
        return allFavorites;
    }
  };

  const filteredFavorites = getFilteredFavorites();

  // Product Card Component
  const ProductCard = ({ product, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white dark:bg-dark-800 rounded-2xl shadow-lg border-2 border-gray-100 dark:border-dark-700 overflow-hidden hover:shadow-2xl hover:shadow-primary-500/20 dark:hover:shadow-primary-500/10 transition-all duration-500 cursor-pointer"
    >
      <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-600">
        {product.image ? (
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700"
            whileHover={{ scale: 1.15, rotate: 1 }}
            loading="lazy"
          />
        ) : (
          <motion.div 
            className="w-full h-full bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div whileHover={{ scale: 1.2, rotate: 10 }}>
              <Package className="text-white text-4xl" />
            </motion.div>
          </motion.div>
        )}
        
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 group-hover:from-black/60 transition-all duration-500" />
        
        {/* Category Badge with enhanced hover */}
        <motion.div 
          className="absolute top-4 left-4 z-10"
          whileHover={{ scale: 1.1, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={getCategoryBadgeClasses(product.type || 'Product')}>
            {product.type || 'Product'}
          </span>
        </motion.div>

        {/* Price Badge with enhanced hover */}
        <motion.div 
          className="absolute top-4 right-4 z-10"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="inline-flex items-center px-3 py-2 rounded-full text-sm font-bold bg-green-500/90 backdrop-blur-sm text-white shadow-lg border border-green-400/50 hover:bg-green-500 transition-all duration-300">
            {product.price} ETH
          </span>
        </motion.div>
        
        {/* Floating particles effect on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-400 rounded-full"
              style={{
                left: `${25 + i * 20}%`,
                top: `${40 + i * 15}%`,
              }}
              animate={{
                y: [-8, -25, -8],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Content with enhanced animations */}
      <div className="p-8 space-y-5">
        {/* Title with enhanced hover */}
        <motion.h3 
          className="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 leading-tight"
          whileHover={{ scale: 1.02, x: 4 }}
        >
          {product.title}
        </motion.h3>

        {/* Description */}
        <motion.p 
          className="text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed text-base"
          whileHover={{ scale: 1.01 }}
        >
          {product.description}
        </motion.p>

        {/* Footer with enhanced animations */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-dark-600">
          {/* Product Info with enhanced hover */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05, x: 4 }}
          >
            <motion.div 
              className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-md"
              whileHover={{ 
                scale: 1.1, 
                rotate: 360,
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
              }}
              transition={{ duration: 0.5 }}
            >
              <Package size={20} />
            </motion.div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Product</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Digital Asset</p>
            </div>
          </motion.div>

          {/* View Details Button with enhanced animations */}
          <Link to={`/products/${product.id}`}>
            <motion.div
              className="group/btn inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-800"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Details</span>
            </motion.div>
          </Link>
        </div>
      </div>
      
      {/* Enhanced hover overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-primary-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ 
          opacity: 1,
          background: "linear-gradient(to top, rgba(59, 130, 246, 0.1), transparent, transparent)"
        }}
      />
    </motion.div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-white dark:bg-dark-800 rounded-3xl shadow-xl border border-gray-200 dark:border-dark-700 p-12">
              <Heart className="mx-auto text-gray-300 dark:text-gray-600 mb-8" size={80} />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Your Favorites
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                You need to log in to save articles and products you like.
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
              >
                <BookOpen size={22} />
                <span>Browse Content</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 dark:bg-dark-700 rounded-2xl w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 dark:bg-dark-700 rounded-xl w-96 mx-auto animate-pulse" />
          </div>
          <SkeletonGrid count={6} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-900 dark:to-dark-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-red-600 bg-clip-text text-transparent mb-6 flex items-center justify-center">
            <Heart className="text-red-500 mr-4" size={48} fill="currentColor" />
            My Favorites
            <Sparkles className="text-yellow-400 ml-4" size={24} />
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your special collection of articles and products you liked
          </p>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-primary-500 hover:text-primary-600 transition-all duration-200 hover:scale-105 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Blog</span>
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-2 shadow-sm border border-gray-200 dark:border-dark-700 inline-flex">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'all'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-500'
              }`}
            >
              All ({allFavorites.length})
            </button>
            <button
              onClick={() => setActiveTab('post')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'post'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-500'
              }`}
            >
              Articles ({postFavorites.length})
            </button>
            <button
              onClick={() => setActiveTab('product')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'product'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary-500'
              }`}
            >
              Products ({productFavorites.length})
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Failed to Load Favorites</h3>
              <p>An error occurred while loading your favorites: {error.message}</p>
            </div>
          </div>
        )}

        {/* Favorites Content */}
        {filteredFavorites.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white dark:bg-dark-800 rounded-3xl shadow-xl border border-gray-200 dark:border-dark-700 p-12 max-w-lg mx-auto">
              <Heart className="mx-auto text-gray-300 dark:text-gray-600 mb-8" size={80} />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                No Favorites Yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                {activeTab === 'post' 
                  ? 'You can add articles to your favorites by clicking the heart icon on blog posts.'
                  : activeTab === 'product'
                  ? 'You can add products to your favorites by clicking the heart icon on product cards.'
                  : 'You can add articles and products to your favorites by clicking the heart icon.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/blog"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  <BookOpen size={22} />
                  <span>Browse Articles</span>
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Package size={22} />
                  <span>Browse Products</span>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Stats */}
            <div className="mb-12 bg-white dark:bg-dark-800 rounded-3xl shadow-xl border border-gray-200 dark:border-dark-700 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {activeTab === 'all' 
                      ? `Total ${filteredFavorites.length} Favorite${filteredFavorites.length !== 1 ? 's' : ''}`
                      : activeTab === 'post'
                      ? `${filteredFavorites.length} Favorite Article${filteredFavorites.length !== 1 ? 's' : ''}`
                      : `${filteredFavorites.length} Favorite Product${filteredFavorites.length !== 1 ? 's' : ''}`
                    }
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {activeTab === 'all' 
                      ? 'Articles and products you liked and saved'
                      : activeTab === 'post'
                      ? 'Articles you liked and saved'
                      : 'Products you liked and saved'
                    }
                  </p>
                </div>
                <Heart className="text-red-500" size={48} fill="currentColor" />
              </div>
            </div>

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredFavorites.map((item, index) => (
                <div key={`${item.target_type}-${item.id}`}>
                  {item.target_type === 'post' ? (
                    <BlogCard post={item} index={index} />
                  ) : (
                    <ProductCard product={item} index={index} />
                  )}
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-primary-50 to-pink-50 dark:from-primary-900/20 dark:to-pink-900/20 rounded-3xl p-8 border border-primary-200 dark:border-primary-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Discover More Interesting Content
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Check out more quality articles and products
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/blog"
                    className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                  >
                    <BookOpen size={20} />
                    <span>View All Articles</span>
                  </Link>
                  <Link
                    to="/products"
                    className="inline-flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                  >
                    <Package size={20} />
                    <span>View All Products</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites; 
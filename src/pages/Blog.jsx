import React, { useState, useMemo, useEffect } from 'react';
import { Search, AlertCircle, RefreshCw } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import CategoryFilter from '../components/CategoryFilter';
import Newsletter from '../components/Newsletter';
import SEOHead from '../components/SEOHead';
import { SkeletonGrid } from '../components/LoadingSpinner';
import { usePosts, useCategories } from '../hooks/useBlog';

const Blog = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Route değişiminde state'i sıfırla
  useEffect(() => {
  
    setSelectedCategory('All');
    setSearchTerm('');
  }, [location.pathname]);

  // React Query hooks - location.pathname ile force refresh
  const { data: posts = [], isLoading: postsLoading, error: postsError, refetch: refetchPosts } = usePosts({ 
    category: selectedCategory, 
    search: searchTerm,
    _refresh: location.pathname // Force refresh on route change
  });
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();
  
  const categories = categoriesData?.categories || ['All'];
  const loading = postsLoading || categoriesLoading;
  const error = postsError;

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => {
        const categoryName = post.category?.name || post.category;
        return categoryName === selectedCategory;
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && post.tags.some(tag => {
          const tagName = tag?.name || tag;
          return tagName.toLowerCase().includes(searchTerm.toLowerCase());
        }))
      );
    }

    return filtered;
  }, [posts, selectedCategory, searchTerm]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-dark-900">
      <SEOHead
        title="Blog"
        description="Latest blog posts about technology, web development, artificial intelligence and cybersecurity. Expert insights and in-depth analysis."
        keywords={['blog posts', 'technology blog', 'web development', 'artificial intelligence', 'cybersecurity', 'programming', 'software']}
        type="website"
        url="/blog"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 dark:from-white dark:via-primary-400 dark:to-white bg-clip-text text-transparent mb-6">
            Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Latest posts from the tech world, in-depth analysis and expert insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <Search className="mr-2" size={20} />
                  Search
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-dark-600 rounded-xl bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              {/* Popular Posts */}
              {!loading && posts.length > 0 && (
                <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Popular Posts
                  </h3>
                  <div className="space-y-4">
                    {posts
                      .sort((a, b) => (b.views || 0) - (a.views || 0))
                      .slice(0, 3)
                      .map((post) => (
                        <div key={post.id} className="group p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {post.title}
                          </h4>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <span>{post.views || 0} views</span>
                            <span className="mx-2">•</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Loading State with Skeleton */}
            {loading && <SkeletonGrid count={6} />}

            {/* Error State */}
            {error && (
              <div className="text-center py-16">
                <div className="bg-white dark:bg-dark-800 rounded-2xl p-12 shadow-sm border border-gray-100 dark:border-dark-700">
                  <div className="text-red-400 mb-6">
                    <AlertCircle size={64} className="mx-auto" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Failed to Load Blog
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    Articles cannot be loaded at the moment. Please check your internet connection and try again.
                  </p>
                  <button
                    onClick={() => refetchPosts()}
                    className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                  >
                    <RefreshCw size={18} />
                    <span>Try Again</span>
                  </button>
                </div>
              </div>
            )}

            {/* No Results */}
            {!loading && !error && filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <div className="bg-white dark:bg-dark-800 rounded-2xl p-12 shadow-sm border border-gray-100 dark:border-dark-700">
                  <div className="text-gray-400 mb-6">
                    <Search size={64} className="mx-auto" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    No Results Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                    No articles found matching your search criteria. Try clearing the filters and search again.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                  >
                    <span>Clear Filters</span>
                  </button>
                </div>
              </div>
            )}

            {/* Posts Grid */}
            {!loading && !error && filteredPosts.length > 0 && (
              <div>
                {/* Results Header */}
                <div className="flex items-center justify-between mb-8 bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-700">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {searchTerm || selectedCategory !== 'All' 
                        ? `${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''} found`
                        : `${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''} published`
                      }
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {selectedCategory !== 'All' && `in ${selectedCategory} category`}
                      {searchTerm && ` for "${searchTerm}" search`}
                    </p>
                  </div>
                  {(selectedCategory !== 'All' || searchTerm) && (
                    <button
                      onClick={clearFilters}
                      className="text-primary-500 hover:text-primary-600 text-sm font-medium"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>

                {/* Posts Grid - Basit grid, animasyon yok */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Newsletter Section */}
        {!loading && (
          <div className="mt-20">
            <Newsletter />
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
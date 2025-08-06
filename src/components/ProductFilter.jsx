import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, Sparkles, TrendingUp, Star } from 'lucide-react';

const ProductFilter = ({ categories, onFilterChange }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filters = {
    search: searchValue,
    category: activeCategory,
    sort_by: 'publishDate'
  };

  const handleFilterChange = (key, value) => {
    if (key === 'search') {
      setSearchValue(value);
    } else if (key === 'category') {
      setActiveCategory(value);
    }
    
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setSearchValue('');
    setActiveCategory('');
    onFilterChange({ search: '', category: '', sort_by: 'publishDate' });
  };

  const hasActiveFilters = searchValue || activeCategory;

  const categoryIcons = {
    'Templates': Sparkles,
    '3D Models': TrendingUp,
    'Scripts': Star
  };

  return (
    <div className="mb-12">
      {/* Search Section */}
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Enhanced Search Input */}
          <div className="flex-1 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search products, templates, scripts..."
                className={`w-full pl-12 pr-4 py-4 bg-white/70 dark:bg-gray-700/70 border-2 rounded-xl 
                  ${isSearchFocused 
                    ? 'border-primary-500 ring-4 ring-primary-500/20' 
                    : 'border-gray-200 dark:border-gray-600'
                  } 
                  text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 
                  backdrop-blur-sm transition-all duration-200 text-lg font-medium`}
              />
              {searchValue && (
                <button
                  onClick={() => handleFilterChange('search', '')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`lg:hidden flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-semibold transition-all duration-200 relative overflow-hidden
              ${isFilterOpen 
                ? 'bg-primary-500 text-white shadow-lg' 
                : 'bg-white/70 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400'
              }`}
          >
            <Filter size={20} />
            <span>Filters</span>
            {hasActiveFilters && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            )}
          </button>
        </div>

        {/* Filter Content */}
        <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Categories Filter */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                <Filter size={18} />
                <span>Categories</span>
              </h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => handleFilterChange('category', '')}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-3
                    ${!activeCategory 
                      ? 'bg-primary-500 text-white shadow-md' 
                      : 'bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-gray-200 dark:border-gray-600'
                    }`}
                >
                  <Star size={16} />
                  <span>All Categories</span>
                </button>
                
                {categories?.map((category) => {
                  const IconComponent = categoryIcons[category.name] || Star;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleFilterChange('category', category.name)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center space-x-3
                        ${activeCategory === category.name 
                          ? 'bg-primary-500 text-white shadow-md' 
                          : 'bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-gray-200 dark:border-gray-600'
                        }`}
                    >
                      <IconComponent size={16} />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Filters */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Filters</h3>
              <div className="flex flex-wrap gap-2">
                {['Featured', 'Popular', 'New', 'Free'].map((filter) => (
                  <button
                    key={filter}
                    className="px-4 py-2 bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 font-medium transition-all duration-200"
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters & Clear */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Active Filters</h3>
              
              {hasActiveFilters ? (
                <div className="space-y-3">
                  {searchValue && (
                    <div className="flex items-center justify-between px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg border border-primary-200 dark:border-primary-700">
                      <span className="text-sm font-medium">Search: "{searchValue}"</span>
                      <button
                        onClick={() => handleFilterChange('search', '')}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  
                  {activeCategory && (
                    <div className="flex items-center justify-between px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg border border-primary-200 dark:border-primary-700">
                      <span className="text-sm font-medium">Category: {activeCategory}</span>
                      <button
                        onClick={() => handleFilterChange('category', '')}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-200"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition-all duration-200"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm italic">No active filters</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
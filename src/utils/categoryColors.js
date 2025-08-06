// Dynamic category color system
const categoryColorMap = {
  // Blog Categories
  'technology': {
    bg: 'bg-blue-500/90',
    border: 'border-blue-400/50',
    text: 'text-white',
    gradient: 'from-blue-400 to-blue-600'
  },
  'programming': {
    bg: 'bg-green-500/90',
    border: 'border-green-400/50',
    text: 'text-white',
    gradient: 'from-green-400 to-green-600'
  },
  'design': {
    bg: 'bg-purple-500/90',
    border: 'border-purple-400/50',
    text: 'text-white',
    gradient: 'from-purple-400 to-purple-600'
  },
  'tutorial': {
    bg: 'bg-orange-500/90',
    border: 'border-orange-400/50',
    text: 'text-white',
    gradient: 'from-orange-400 to-orange-600'
  },
  'news': {
    bg: 'bg-red-500/90',
    border: 'border-red-400/50',
    text: 'text-white',
    gradient: 'from-red-400 to-red-600'
  },
  'review': {
    bg: 'bg-yellow-500/90',
    border: 'border-yellow-400/50',
    text: 'text-white',
    gradient: 'from-yellow-400 to-yellow-600'
  },
  'tips': {
    bg: 'bg-teal-500/90',
    border: 'border-teal-400/50',
    text: 'text-white',
    gradient: 'from-teal-400 to-teal-600'
  },
  'guide': {
    bg: 'bg-indigo-500/90',
    border: 'border-indigo-400/50',
    text: 'text-white',
    gradient: 'from-indigo-400 to-indigo-600'
  },
  'blog': {
    bg: 'bg-gray-500/90',
    border: 'border-gray-400/50',
    text: 'text-white',
    gradient: 'from-gray-400 to-gray-600'
  },

  // Product Categories
  'templates': {
    bg: 'bg-pink-500/90',
    border: 'border-pink-400/50',
    text: 'text-white',
    gradient: 'from-pink-400 to-pink-600'
  },
  '3d models': {
    bg: 'bg-cyan-500/90',
    border: 'border-cyan-400/50',
    text: 'text-white',
    gradient: 'from-cyan-400 to-cyan-600'
  },
  'scripts': {
    bg: 'bg-emerald-500/90',
    border: 'border-emerald-400/50',
    text: 'text-white',
    gradient: 'from-emerald-400 to-emerald-600'
  },
  'ui kits': {
    bg: 'bg-violet-500/90',
    border: 'border-violet-400/50',
    text: 'text-white',
    gradient: 'from-violet-400 to-violet-600'
  },
  'icons': {
    bg: 'bg-rose-500/90',
    border: 'border-rose-400/50',
    text: 'text-white',
    gradient: 'from-rose-400 to-rose-600'
  },
  'fonts': {
    bg: 'bg-amber-500/90',
    border: 'border-amber-400/50',
    text: 'text-white',
    gradient: 'from-amber-400 to-amber-600'
  },
  'themes': {
    bg: 'bg-lime-500/90',
    border: 'border-lime-400/50',
    text: 'text-white',
    gradient: 'from-lime-400 to-lime-600'
  },
  'plugins': {
    bg: 'bg-sky-500/90',
    border: 'border-sky-400/50',
    text: 'text-white',
    gradient: 'from-sky-400 to-sky-600'
  },
  'product': {
    bg: 'bg-slate-500/90',
    border: 'border-slate-400/50',
    text: 'text-white',
    gradient: 'from-slate-400 to-slate-600'
  },

  // Additional Popular Categories
  'web development': {
    bg: 'bg-blue-600/90',
    border: 'border-blue-500/50',
    text: 'text-white',
    gradient: 'from-blue-500 to-blue-700'
  },
  'mobile development': {
    bg: 'bg-green-600/90',
    border: 'border-green-500/50',
    text: 'text-white',
    gradient: 'from-green-500 to-green-700'
  },
  'artificial intelligence': {
    bg: 'bg-purple-600/90',
    border: 'border-purple-500/50',
    text: 'text-white',
    gradient: 'from-purple-500 to-purple-700'
  },
  'machine learning': {
    bg: 'bg-indigo-600/90',
    border: 'border-indigo-500/50',
    text: 'text-white',
    gradient: 'from-indigo-500 to-indigo-700'
  },
  'data science': {
    bg: 'bg-cyan-600/90',
    border: 'border-cyan-500/50',
    text: 'text-white',
    gradient: 'from-cyan-500 to-cyan-700'
  },
  'blockchain': {
    bg: 'bg-orange-600/90',
    border: 'border-orange-500/50',
    text: 'text-white',
    gradient: 'from-orange-500 to-orange-700'
  },
  'cryptocurrency': {
    bg: 'bg-yellow-600/90',
    border: 'border-yellow-500/50',
    text: 'text-white',
    gradient: 'from-yellow-500 to-yellow-700'
  },
  'cybersecurity': {
    bg: 'bg-red-600/90',
    border: 'border-red-500/50',
    text: 'text-white',
    gradient: 'from-red-500 to-red-700'
  },
  'cloud computing': {
    bg: 'bg-sky-600/90',
    border: 'border-sky-500/50',
    text: 'text-white',
    gradient: 'from-sky-500 to-sky-700'
  },
  'devops': {
    bg: 'bg-teal-600/90',
    border: 'border-teal-500/50',
    text: 'text-white',
    gradient: 'from-teal-500 to-teal-700'
  },
  'ui/ux': {
    bg: 'bg-pink-600/90',
    border: 'border-pink-500/50',
    text: 'text-white',
    gradient: 'from-pink-500 to-pink-700'
  },
  'graphic design': {
    bg: 'bg-rose-600/90',
    border: 'border-rose-500/50',
    text: 'text-white',
    gradient: 'from-rose-500 to-rose-700'
  },
  'photography': {
    bg: 'bg-violet-600/90',
    border: 'border-violet-500/50',
    text: 'text-white',
    gradient: 'from-violet-500 to-violet-700'
  },
  'video editing': {
    bg: 'bg-emerald-600/90',
    border: 'border-emerald-500/50',
    text: 'text-white',
    gradient: 'from-emerald-500 to-emerald-700'
  },
  'animation': {
    bg: 'bg-lime-600/90',
    border: 'border-lime-500/50',
    text: 'text-white',
    gradient: 'from-lime-500 to-lime-700'
  },
  'gaming': {
    bg: 'bg-purple-700/90',
    border: 'border-purple-600/50',
    text: 'text-white',
    gradient: 'from-purple-600 to-purple-800'
  },
  'game development': {
    bg: 'bg-indigo-700/90',
    border: 'border-indigo-600/50',
    text: 'text-white',
    gradient: 'from-indigo-600 to-indigo-800'
  },
  'e-commerce': {
    bg: 'bg-green-700/90',
    border: 'border-green-600/50',
    text: 'text-white',
    gradient: 'from-green-600 to-green-800'
  },
  'marketing': {
    bg: 'bg-orange-700/90',
    border: 'border-orange-600/50',
    text: 'text-white',
    gradient: 'from-orange-600 to-orange-800'
  },
  'seo': {
    bg: 'bg-blue-700/90',
    border: 'border-blue-600/50',
    text: 'text-white',
    gradient: 'from-blue-600 to-blue-800'
  },
  'social media': {
    bg: 'bg-pink-700/90',
    border: 'border-pink-600/50',
    text: 'text-white',
    gradient: 'from-pink-600 to-pink-800'
  },
  'business': {
    bg: 'bg-gray-600/90',
    border: 'border-gray-500/50',
    text: 'text-white',
    gradient: 'from-gray-500 to-gray-700'
  },
  'finance': {
    bg: 'bg-emerald-700/90',
    border: 'border-emerald-600/50',
    text: 'text-white',
    gradient: 'from-emerald-600 to-emerald-800'
  },
  'startup': {
    bg: 'bg-cyan-700/90',
    border: 'border-cyan-600/50',
    text: 'text-white',
    gradient: 'from-cyan-600 to-cyan-800'
  },
  'productivity': {
    bg: 'bg-teal-700/90',
    border: 'border-teal-600/50',
    text: 'text-white',
    gradient: 'from-teal-600 to-teal-800'
  },
  'lifestyle': {
    bg: 'bg-rose-700/90',
    border: 'border-rose-600/50',
    text: 'text-white',
    gradient: 'from-rose-600 to-rose-800'
  },
  'health': {
    bg: 'bg-green-800/90',
    border: 'border-green-700/50',
    text: 'text-white',
    gradient: 'from-green-700 to-green-900'
  },
  'fitness': {
    bg: 'bg-red-700/90',
    border: 'border-red-600/50',
    text: 'text-white',
    gradient: 'from-red-600 to-red-800'
  },
  'travel': {
    bg: 'bg-sky-700/90',
    border: 'border-sky-600/50',
    text: 'text-white',
    gradient: 'from-sky-600 to-sky-800'
  },
  'food': {
    bg: 'bg-amber-600/90',
    border: 'border-amber-500/50',
    text: 'text-white',
    gradient: 'from-amber-500 to-amber-700'
  },
  'education': {
    bg: 'bg-violet-700/90',
    border: 'border-violet-600/50',
    text: 'text-white',
    gradient: 'from-violet-600 to-violet-800'
  },
  'science': {
    bg: 'bg-blue-800/90',
    border: 'border-blue-700/50',
    text: 'text-white',
    gradient: 'from-blue-700 to-blue-900'
  },
  'research': {
    bg: 'bg-indigo-800/90',
    border: 'border-indigo-700/50',
    text: 'text-white',
    gradient: 'from-indigo-700 to-indigo-900'
  },
  'music': {
    bg: 'bg-purple-800/90',
    border: 'border-purple-700/50',
    text: 'text-white',
    gradient: 'from-purple-700 to-purple-900'
  },
  'art': {
    bg: 'bg-pink-800/90',
    border: 'border-pink-700/50',
    text: 'text-white',
    gradient: 'from-pink-700 to-pink-900'
  },
  'books': {
    bg: 'bg-amber-700/90',
    border: 'border-amber-600/50',
    text: 'text-white',
    gradient: 'from-amber-600 to-amber-800'
  },
  'writing': {
    bg: 'bg-slate-600/90',
    border: 'border-slate-500/50',
    text: 'text-white',
    gradient: 'from-slate-500 to-slate-700'
  },
  'javascript': {
    bg: 'bg-yellow-500/90',
    border: 'border-yellow-400/50',
    text: 'text-black',
    gradient: 'from-yellow-400 to-yellow-600'
  },
  'python': {
    bg: 'bg-blue-500/90',
    border: 'border-blue-400/50',
    text: 'text-white',
    gradient: 'from-blue-400 to-blue-600'
  },
  'react': {
    bg: 'bg-cyan-500/90',
    border: 'border-cyan-400/50',
    text: 'text-white',
    gradient: 'from-cyan-400 to-cyan-600'
  },
  'vue': {
    bg: 'bg-green-500/90',
    border: 'border-green-400/50',
    text: 'text-white',
    gradient: 'from-green-400 to-green-600'
  },
  'angular': {
    bg: 'bg-red-500/90',
    border: 'border-red-400/50',
    text: 'text-white',
    gradient: 'from-red-400 to-red-600'
  },
  'node.js': {
    bg: 'bg-green-600/90',
    border: 'border-green-500/50',
    text: 'text-white',
    gradient: 'from-green-500 to-green-700'
  },
  'php': {
    bg: 'bg-purple-600/90',
    border: 'border-purple-500/50',
    text: 'text-white',
    gradient: 'from-purple-500 to-purple-700'
  },
  'java': {
    bg: 'bg-orange-600/90',
    border: 'border-orange-500/50',
    text: 'text-white',
    gradient: 'from-orange-500 to-orange-700'
  },
  'c++': {
    bg: 'bg-blue-600/90',
    border: 'border-blue-500/50',
    text: 'text-white',
    gradient: 'from-blue-500 to-blue-700'
  },
  'c#': {
    bg: 'bg-purple-700/90',
    border: 'border-purple-600/50',
    text: 'text-white',
    gradient: 'from-purple-600 to-purple-800'
  },
  'swift': {
    bg: 'bg-orange-500/90',
    border: 'border-orange-400/50',
    text: 'text-white',
    gradient: 'from-orange-400 to-orange-600'
  },
  'kotlin': {
    bg: 'bg-purple-500/90',
    border: 'border-purple-400/50',
    text: 'text-white',
    gradient: 'from-purple-400 to-purple-600'
  },
  'flutter': {
    bg: 'bg-blue-400/90',
    border: 'border-blue-300/50',
    text: 'text-white',
    gradient: 'from-blue-300 to-blue-500'
  },
  'react native': {
    bg: 'bg-cyan-600/90',
    border: 'border-cyan-500/50',
    text: 'text-white',
    gradient: 'from-cyan-500 to-cyan-700'
  },
  'wordpress': {
    bg: 'bg-blue-700/90',
    border: 'border-blue-600/50',
    text: 'text-white',
    gradient: 'from-blue-600 to-blue-800'
  },
  'shopify': {
    bg: 'bg-green-600/90',
    border: 'border-green-500/50',
    text: 'text-white',
    gradient: 'from-green-500 to-green-700'
  },
  'magento': {
    bg: 'bg-orange-600/90',
    border: 'border-orange-500/50',
    text: 'text-white',
    gradient: 'from-orange-500 to-orange-700'
  },
  'woocommerce': {
    bg: 'bg-purple-600/90',
    border: 'border-purple-500/50',
    text: 'text-white',
    gradient: 'from-purple-500 to-purple-700'
  },
  'aws': {
    bg: 'bg-orange-500/90',
    border: 'border-orange-400/50',
    text: 'text-white',
    gradient: 'from-orange-400 to-orange-600'
  },
  'google cloud': {
    bg: 'bg-blue-500/90',
    border: 'border-blue-400/50',
    text: 'text-white',
    gradient: 'from-blue-400 to-blue-600'
  },
  'azure': {
    bg: 'bg-blue-600/90',
    border: 'border-blue-500/50',
    text: 'text-white',
    gradient: 'from-blue-500 to-blue-700'
  },
  'docker': {
    bg: 'bg-blue-400/90',
    border: 'border-blue-300/50',
    text: 'text-white',
    gradient: 'from-blue-300 to-blue-500'
  },
  'kubernetes': {
    bg: 'bg-blue-700/90',
    border: 'border-blue-600/50',
    text: 'text-white',
    gradient: 'from-blue-600 to-blue-800'
  }
};

// Default colors for unknown categories
const defaultColors = {
  bg: 'bg-gray-500/90',
  border: 'border-gray-400/50',
  text: 'text-white',
  gradient: 'from-gray-400 to-gray-600'
};

// Hash function to generate consistent colors for unknown categories
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

// Color palette for dynamic generation
const dynamicColors = [
  {
    bg: 'bg-red-500/90',
    border: 'border-red-400/50',
    text: 'text-white',
    gradient: 'from-red-400 to-red-600'
  },
  {
    bg: 'bg-blue-500/90',
    border: 'border-blue-400/50',
    text: 'text-white',
    gradient: 'from-blue-400 to-blue-600'
  },
  {
    bg: 'bg-green-500/90',
    border: 'border-green-400/50',
    text: 'text-white',
    gradient: 'from-green-400 to-green-600'
  },
  {
    bg: 'bg-purple-500/90',
    border: 'border-purple-400/50',
    text: 'text-white',
    gradient: 'from-purple-400 to-purple-600'
  },
  {
    bg: 'bg-orange-500/90',
    border: 'border-orange-400/50',
    text: 'text-white',
    gradient: 'from-orange-400 to-orange-600'
  },
  {
    bg: 'bg-teal-500/90',
    border: 'border-teal-400/50',
    text: 'text-white',
    gradient: 'from-teal-400 to-teal-600'
  },
  {
    bg: 'bg-pink-500/90',
    border: 'border-pink-400/50',
    text: 'text-white',
    gradient: 'from-pink-400 to-pink-600'
  },
  {
    bg: 'bg-indigo-500/90',
    border: 'border-indigo-400/50',
    text: 'text-white',
    gradient: 'from-indigo-400 to-indigo-600'
  }
];

/**
 * Get category colors based on category name
 * @param {string} category - Category name
 * @returns {object} Color configuration object
 */
export const getCategoryColors = (category) => {
  if (!category) return defaultColors;
  
  const normalizedCategory = category.toLowerCase().trim();
  
  // Check if we have predefined colors
  if (categoryColorMap[normalizedCategory]) {
    return categoryColorMap[normalizedCategory];
  }
  
  // Generate consistent color based on category name hash
  const hash = hashString(normalizedCategory);
  const colorIndex = hash % dynamicColors.length;
  
  return dynamicColors[colorIndex];
};

/**
 * Get category badge classes with enhanced hover animations
 * @param {string} category - Category name
 * @param {string} variant - Badge variant ('default', 'outline', 'solid')
 * @returns {string} Tailwind CSS classes
 */
export const getCategoryBadgeClasses = (category, variant = 'default') => {
  const colors = getCategoryColors(category);
  
  const baseClasses = 'inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-sm shadow-lg transition-all duration-300 cursor-pointer select-none';
  const hoverAnimations = 'hover:scale-110 hover:shadow-xl hover:-translate-y-1 hover:rotate-1 active:scale-95 active:rotate-0';
  const glowEffect = 'hover:shadow-2xl';
  
  switch (variant) {
    case 'outline':
      return `${baseClasses} ${hoverAnimations} bg-white/90 dark:bg-gray-800/90 border-2 ${colors.border} text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/90 hover:border-opacity-80 ${glowEffect}`;
    case 'solid':
      return `${baseClasses} ${hoverAnimations} ${colors.bg} ${colors.text} border ${colors.border} hover:brightness-110 hover:saturate-110 ${glowEffect}`;
    default:
      return `${baseClasses} ${hoverAnimations} ${colors.bg} ${colors.text} border ${colors.border} hover:brightness-110 hover:saturate-110 hover:shadow-${colors.bg.split('-')[1]}-500/50 ${glowEffect}`;
  }
};

/**
 * Get category gradient classes for backgrounds
 * @param {string} category - Category name
 * @returns {string} Tailwind gradient classes
 */
export const getCategoryGradient = (category) => {
  const colors = getCategoryColors(category);
  return `bg-gradient-to-br ${colors.gradient}`;
};

/**
 * Get all available category colors for preview
 * @returns {object} All category color mappings
 */
export const getAllCategoryColors = () => {
  return categoryColorMap;
};

export default {
  getCategoryColors,
  getCategoryBadgeClasses,
  getCategoryGradient,
  getAllCategoryColors
}; 
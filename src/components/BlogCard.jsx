import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Eye, User, ArrowRight } from 'lucide-react';
// Removed motion import
import GenericCardActions from './GenericCardActions';
import { getCategoryBadgeClasses } from '../utils/categoryColors';

const BlogCard = ({ post, index = 0 }) => {
  if (!post) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <article className="group relative bg-white dark:bg-dark-800 rounded-2xl shadow-lg border-2 border-gray-100 dark:border-dark-700 overflow-hidden hover:shadow-2xl hover:shadow-primary-500/20 dark:hover:shadow-primary-500/10 transition-all duration-500 cursor-pointer">
      {/* Image Container */}
      <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-700 dark:to-dark-600">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                <span className="text-2xl text-primary-500">📝</span>
              </div>
              <p className="text-sm">No Image Available</p>
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryBadgeClasses(post.category)}`}>
            {post.category}
          </span>
        </div>

        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 right-4">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              ⭐ Featured
            </div>
          </div>
        )}

        {/* Read Time */}
        <div className="absolute bottom-4 right-4">
          <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs flex items-center space-x-1">
            <Clock size={12} />
            <span>{post.readTime || '5 min'}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{formatDate(post.date || new Date().toISOString())}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{post.author || 'Admin'}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1 text-primary-600 dark:text-primary-400">
            <Eye size={14} />
            <span>{post.views || 0}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
          {post.excerpt || post.content?.substring(0, 120) + '...'}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, tagIndex) => (
              <span 
                key={tagIndex}
                className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 text-xs rounded-md hover:bg-primary-100 dark:hover:bg-primary-900/20 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-500 dark:text-gray-400 text-xs rounded-md">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-dark-700">
          <GenericCardActions 
            targetType="post" 
            targetId={post.id} 
            compact={true}
          />
          
          <Link 
            to={`/blog/${post.id}`}
            className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors group/link"
          >
            <span className="text-sm">Read More</span>
            <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </article>
  );
};

export default BlogCard;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Eye, ArrowLeft, Tag, User2 } from 'lucide-react';
// Removed motion import
import GenericCommentSection from '../components/GenericCommentSection';
import GenericFloatingActions from '../components/GenericFloatingActions';
import SEOHead from '../components/SEOHead';
import ApiService from '../services/api';

// import useAnalytics from '../hooks/useAnalytics';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  // const { trackPageView, trackBlogRead } = useAnalytics();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postData = await ApiService.getPost(slug);
        setPost(postData);
        
        // Track page view for analytics
        // trackPageView(`/blog/${slug}`, postData.title);
        
        // Track blog post read after 3 seconds (indicating user engagement)
        // setTimeout(() => {
        //   trackBlogRead(postData.title, postData.category?.name || 'Uncategorized', postData.readTime);
        // }, 3000);
        
        // Fetch related posts
        if (postData.category) {
          try {
            const allPosts = await ApiService.getPosts();
            const related = allPosts
              .filter(p => p.id !== postData.id && p.category?.name === postData.category?.name)
              .slice(0, 3);
            setRelatedPosts(related);
          } catch (err) {
      
          }
        }
        
      } catch (err) {
        console.error('Blog post yükleme hatası:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]); // trackPageView, trackBlogRead kaldırıldı

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-800 rounded-full animate-spin"></div>
            <div className="w-16 h-16 border-t-4 border-primary-500 rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-4 font-medium">Loading article...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">😔</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Error Loading Article
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {error}
          </p>
          <Link 
            to="/blog" 
            className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🔍</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Article Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/blog" 
            className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
          >
            <ArrowLeft size={20} />
            <span>Back to Blog</span>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <SEOHead
        title={post.title}
        description={post.excerpt}
        keywords={post.tags?.map(tag => tag?.name || tag) || []}
        image={post.image}
        type="article"
        author={post.author}
        publishedTime={post.publishedAt}
        tags={post.tags?.map(tag => tag?.name || tag) || []}
        category={post.category?.name || post.category}
        readTime={post.readTime}
        url={`/blog/${post.slug}`}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 px-3 py-2 rounded-lg"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Blog</span>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-dark-800 rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Featured Image */}
          <div className="relative h-72 md:h-96 overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Floating Actions */}
            <GenericFloatingActions
              targetId={post.id}
              targetType="post"
              shareData={{
                url: window.location.href,
                title: post.title,
                description: post.excerpt
              }}
              position="top-right"
            />

            {/* Category Badge */}
            <div className="absolute top-6 left-6">
              <span className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
                {post.category?.name || post.category || 'Blog'}
              </span>
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-xl opacity-90 max-w-3xl">
                  {post.excerpt}
                </p>
              )}
            </div>
          </div>

          {/* Article Meta */}
          <div className="p-8 border-b border-gray-200 dark:border-dark-700">
            <div className="flex flex-wrap items-center justify-between gap-6 mb-6">
              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Calendar size={18} className="text-primary-500" />
                  <span className="font-medium">{new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={18} className="text-primary-500" />
                  <span className="font-medium">{post.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye size={18} className="text-primary-500" />
                  <span className="font-medium">{post.views || 0} views</span>
                </div>
              </div>
            </div>

            {/* Author */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {post.author?.charAt(0) || 'A'}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                    {post.author || 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Author
                  </p>
                </div>
              </div>
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-700">
                <div className="flex items-center space-x-2 mb-3">
                  <Tag size={16} className="text-primary-500" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-sm font-medium border border-primary-200 dark:border-primary-800"
                    >
                      #{typeof tag === 'object' ? tag.name : tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Article Content */}
          <div className="p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-a:text-primary-600 dark:prose-a:text-primary-400">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>

          {/* Post Footer */}
          <div className="px-8 py-6 bg-gray-50 dark:bg-dark-700 border-t border-gray-200 dark:border-dark-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 dark:text-gray-400">Was this helpful?</span>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg font-medium transition-all duration-200 hover:bg-green-200 dark:hover:bg-green-800/30"
                  >
                    👍 Yes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg font-medium transition-all duration-200 hover:bg-red-200 dark:hover:bg-red-800/30"
                  >
                    👎 No
                  </motion.button>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {new Date(post.publishedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </motion.article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Related Articles
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="card overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                      {relatedPost.excerpt}
                    </p>
                    <Link
                      to={`/blog/${relatedPost.slug}`}
                      className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                    >
                      Read more →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Comments Section */}
        <GenericCommentSection targetId={post.id} targetType="post" />
      </div>
    </div>
  );
};

export default BlogPost;
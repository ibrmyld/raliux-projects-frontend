import React, { useState, useEffect } from 'react';
// Removed motion import
import { MessageCircle, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { createApiUrl } from '../utils/api';
import toast from 'react-hot-toast';

const ProductCommentSection = ({ productId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (productId) {
      fetchComments();
    }
  }, [productId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(createApiUrl(`/api/products/${productId}/comments`));
      
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        const errorData = await response.json();

        toast.error(errorData.detail || 'Failed to load comments');
      }
    } catch (error) {

      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to comment');
      return;
    }

    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    setSubmitting(true);
    
    try {
      const commentPayload = {
        product_id: parseInt(productId),
        content: newComment.trim()
      };
      


      
      const response = await fetch(createApiUrl(`/api/products/${productId}/comments`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include',
        body: JSON.stringify(commentPayload)
      });



      if (response.ok) {
        const comment = await response.json();

        setComments(prev => [comment, ...prev]);
        setNewComment('');
        toast.success('Comment added successfully!');
        // Refresh comments
        fetchComments();
      } else {
        let errorMessage = 'Failed to add comment';
        try {
          const errorData = await response.json();
          console.error('❌ Product comment submit error:', errorData);
          errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch (parseError) {
          console.error('❌ Error parsing response:', parseError);
          errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('❌ Error adding product comment:', error);
      const errorMessage = typeof error === 'string' ? error : (error.message || 'Failed to add comment');
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  return (
    <div className="mt-12">
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center space-x-3 mb-8"
      >
        <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-full">
          <MessageCircle className="text-primary-600 dark:text-primary-400" size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Product Reviews ({comments.length})
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Share your experience with this product
          </p>
        </div>
      </motion.div>

      {/* Comment Form */}
      {isAuthenticated ? (
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmitComment} 
          className="card p-6 mb-8"
        >
          <div className="flex space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </div>
            </div>
            <div className="flex-grow">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts about this product..."
                className="w-full p-4 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all duration-200"
                rows="3"
                maxLength="1000"
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {newComment.length}/1000 characters
                </span>
                <motion.button
                  type="submit"
                  disabled={submitting || !newComment.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-dark-800"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Posting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Post Review</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 text-center mb-8"
        >
          <MessageCircle className="mx-auto text-gray-400 mb-4" size={48} />
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Share Your Experience
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please login to leave a product review
          </p>
          <button className="btn-primary">
            Login to Review
          </button>
        </motion.div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-gray-600 dark:text-gray-400">Loading reviews...</span>
          </div>
        ) : comments.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <MessageCircle className="mx-auto text-gray-400 mb-4" size={48} />
            <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
              No reviews yet
            </h4>
            <p className="text-gray-500 dark:text-gray-500">
              Be the first to share your experience with this product!
            </p>
          </motion.div>
        ) : (
          comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6"
            >
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  {comment.user?.avatar ? (
                    <img 
                      src={comment.user.avatar} 
                      alt={`${comment.user.firstName} ${comment.user.lastName}`}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 font-semibold">
                      {comment.user?.firstName?.charAt(0) || comment.author?.charAt(0) || 'U'}
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {comment.user ? `${comment.user.firstName} ${comment.user.lastName}` : comment.author}
                    </h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(comment.created_at)}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCommentSection; 
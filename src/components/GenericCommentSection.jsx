import React, { useState } from 'react'
import { MessageCircle, Send, Edit2, Trash2, User, Heart, X, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { 
  useGenericComments, 
  useGenericCreateComment, 
  useGenericUpdateComment, 
  useGenericDeleteComment 
} from '../hooks/useGeneric'

const GenericCommentSection = ({ targetId, targetType, className = "" }) => {
  const { user, isAuthenticated } = useAuth()
  const [newComment, setNewComment] = useState('')
  const [editingComment, setEditingComment] = useState(null)
  const [editContent, setEditContent] = useState('')
  
  // Get comments
  const { data: comments = [], isLoading } = useGenericComments(targetId, targetType)
  
  // Mutations
  const createCommentMutation = useGenericCreateComment()
  const updateCommentMutation = useGenericUpdateComment()
  const deleteCommentMutation = useGenericDeleteComment()
  
  const handleSubmitComment = async (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      alert('Please login to comment')
      return
    }
    
    if (!newComment.trim()) return
    
    try {
      await createCommentMutation.mutateAsync({
        targetId,
        targetType,
        content: newComment.trim()
      })
      setNewComment('')
    } catch (error) {
      console.error('Create comment error:', error)
      alert('Failed to create comment')
    }
  }

  const handleEditComment = (comment) => {
    setEditingComment(comment.id)
    setEditContent(comment.content)
  }

  const handleUpdateComment = async (commentId) => {
    if (!editContent.trim()) return
    
    try {
      await updateCommentMutation.mutateAsync({
        commentId,
        content: editContent.trim()
      })
      setEditingComment(null)
      setEditContent('')
    } catch (error) {
      console.error('Update comment error:', error)
      alert('Failed to update comment')
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!confirm('Are you sure you want to delete this comment?')) return
    
    try {
      await deleteCommentMutation.mutateAsync(commentId)
    } catch (error) {
      console.error('Delete comment error:', error)
      alert('Failed to delete comment')
    }
  }

  const handleCancelEdit = () => {
    setEditingComment(null)
    setEditContent('')
  }
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
  
  return (
    <div className={`bg-white dark:bg-dark-800 rounded-3xl shadow-xl border border-gray-200 dark:border-dark-700 p-8 ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Comments
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
          </p>
        </div>
      </div>
      
      {/* Comment Form */}
      {isAuthenticated ? (
        <div className="mb-8 p-6 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-dark-700 dark:to-dark-600 rounded-2xl border border-gray-200 dark:border-dark-600">
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={`Share your thoughts about this ${targetType}...`}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-dark-500 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-dark-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
                  rows="3"
                  disabled={createCommentMutation.isPending}
                />
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {newComment.length}/500 characters
                  </span>
                  <button
                    type="submit"
                    disabled={!newComment.trim() || createCommentMutation.isPending || newComment.length > 500}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    <Send className="w-4 h-4" />
                    {createCommentMutation.isPending ? 'Posting...' : 'Post Comment'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="mb-8 text-center py-8 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-dark-700 dark:to-dark-600 rounded-2xl border border-gray-200 dark:border-dark-600">
          <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Please login to leave a comment</p>
        </div>
      )}
      
      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-dark-600 dark:to-dark-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No comments yet</h4>
            <p className="text-gray-500 dark:text-gray-400">Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment, index) => (
            <div 
              key={comment.id} 
              className="group p-6 bg-gradient-to-br from-white to-gray-50 dark:from-dark-700 dark:to-dark-600 rounded-2xl border border-gray-200 dark:border-dark-600 shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {comment.user?.avatar ? (
                    <img
                      src={comment.user.avatar}
                      alt={`${comment.user.firstName} ${comment.user.lastName}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                        {comment.user?.firstName} {comment.user?.lastName}
                      </h4>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full">
                        {formatDate(comment.created_at)}
                      </span>
                    </div>
                    
                    {/* Comment actions */}
                    {user?.id === comment.user?.id && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {editingComment === comment.id ? (
                          <>
                            <button 
                              onClick={() => handleUpdateComment(comment.id)}
                              disabled={updateCommentMutation.isPending}
                              className="p-2 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-colors duration-200"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={handleCancelEdit}
                              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button 
                              onClick={() => handleEditComment(comment)}
                              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteComment(comment.id)}
                              disabled={deleteCommentMutation.isPending}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Comment content - editable or display */}
                  {editingComment === comment.id ? (
                    <div className="mb-4">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-blue-200 dark:border-blue-500 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white dark:bg-dark-700 text-gray-900 dark:text-white transition-all duration-200"
                        rows="3"
                        disabled={updateCommentMutation.isPending}
                      />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {editContent.length}/500 characters
                        </span>
                        {updateCommentMutation.isPending && (
                          <span className="text-sm text-blue-500">Updating...</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base mb-4">
                      {comment.content}
                    </p>
                  )}
                  
                  {comment.updated_at && comment.updated_at !== comment.created_at && (
                    <p className="text-xs text-gray-400 italic">
                      Edited {formatDate(comment.updated_at)}
                    </p>
                  )}
                  
                  {/* Comment footer */}
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-dark-500">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors duration-200">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">Like</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors duration-200">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default GenericCommentSection 
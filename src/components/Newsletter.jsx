import React, { useState } from 'react';
import { Mail, Send, Check, X } from 'lucide-react';
// Removed motion imports

const Newsletter = ({ variant = 'default', className = '' }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo, randomly succeed or fail
      if (Math.random() > 0.3) {
        setStatus('success');
        setMessage('Thank you for subscribing! Check your email for confirmation.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please check your connection.');
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  const baseClasses = 'relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8 border border-primary-200 dark:border-primary-800';
  
  const variantClasses = {
    default: 'max-w-2xl mx-auto',
    compact: 'max-w-lg',
    full: 'w-full'
  };

  if (status === 'success') {
    return (
      <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Successfully Subscribed!
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {message}
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="btn-secondary hover:scale-105 transition-transform"
          >
            Subscribe Another Email
          </button>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
            <X className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Subscription Failed
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {message}
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="btn-secondary hover:scale-105 transition-transform"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-6 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Stay Updated
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
          Get the latest news, updates, and exclusive content delivered straight to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 input-field"
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send size={18} />
                <span>Subscribe</span>
              </>
            )}
          </button>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>

      {/* Background Decoration */}
      <div className="absolute -top-2 -right-2 w-32 h-32 bg-gradient-to-br from-primary-200 to-secondary-200 dark:from-primary-800/20 dark:to-secondary-800/20 rounded-full opacity-20 blur-2xl"></div>
      <div className="absolute -bottom-2 -left-2 w-24 h-24 bg-gradient-to-br from-secondary-200 to-primary-200 dark:from-secondary-800/20 dark:to-primary-800/20 rounded-full opacity-20 blur-xl"></div>
    </div>
  );
};

export default Newsletter;
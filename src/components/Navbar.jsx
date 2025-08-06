import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, User, LogOut, Settings, ChevronDown, Heart, Shield } from 'lucide-react';
import SimpleThemeToggle from './SimpleThemeToggle';
import { useAuth } from '../context/AuthContext';
import useClickOutside from '../hooks/useClickOutside';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useClickOutside(() => setIsProfileOpen(false));

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Products', path: '/products' },
    { name: 'Tools', path: '/tools' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-dark-900 shadow-lg border-b border-gray-200 dark:border-dark-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary-500">
              RailuX
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 font-medium"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 rounded-lg"
            >
              <Search size={20} />
            </button>

            {/* Theme Toggle */}
            <SimpleThemeToggle />

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="hidden md:flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profil"
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                    </div>
                  )}
                  <span className="text-sm font-medium">{user?.firstName}</span>
                  <ChevronDown size={16} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-600 py-2">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-dark-600">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                    
                    <Link to="/profile" className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 flex items-center space-x-2">
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                    
                    <Link to="/favorites" className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 flex items-center space-x-2">
                      <Heart size={16} />
                      <span>My Favorites</span>
                    </Link>
                    
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 flex items-center space-x-2">
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                    
                    <hr className="my-1 border-gray-200 dark:border-dark-600" />
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-dark-700 flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="btn-secondary"
                >
                  Login
                </Link>
                <Link 
                  to="/login"
                  className="btn-primary"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 dark:text-gray-400 rounded-lg"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-dark-700">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {isAuthenticated ? (
                <div className="pt-4 border-t border-gray-200 dark:border-dark-700">
                  <div className="flex items-center space-x-3 mb-4">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Link to="/profile" className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg flex items-center space-x-2">
                      <User size={16} />
                      <span>Profile</span>
                    </Link>
                    
                    <Link 
                      to="/favorites" 
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg flex items-center space-x-2"
                    >
                      <Heart size={16} />
                      <span>My Favorites</span>
                    </Link>
                    
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg flex items-center space-x-2">
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-lg flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200 dark:border-dark-700">
                  <Link 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-secondary text-center"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary text-center"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
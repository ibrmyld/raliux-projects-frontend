import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Shield, Cpu, Play, Star } from 'lucide-react';
// Removed motion import

const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Future', 'Innovation', 'Technology', 'Solutions'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: <Code className="w-6 h-6" />, text: "Clean Code" },
    { icon: <Zap className="w-6 h-6" />, text: "Fast Performance" },
    { icon: <Shield className="w-6 h-6" />, text: "Secure" },
    { icon: <Cpu className="w-6 h-6" />, text: "Modern Tech" }
  ];

  const stats = [
    { number: "1000+", label: "Happy Users" },
    { number: "50+", label: "Projects" },
    { number: "99%", label: "Satisfaction" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary-300 dark:bg-primary-700 rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4 fill-current" />
                <span>Premium Quality Products</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Build The{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-1000">
                  {words[currentWord]}
                </span>
                <br />
                You Deserve
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl">
                Discover cutting-edge tools, premium templates, and innovative solutions 
                that will transform your digital experience.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/products" 
                  className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4 hover:scale-105 transition-transform"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to="/blog" 
                  className="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4 hover:scale-105 transition-transform"
                >
                  <Play className="w-5 h-5" />
                  <span>Learn More</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            {/* Main Card */}
            <div className="relative bg-white dark:bg-dark-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-dark-700 p-8 hover:scale-105 transition-transform duration-500">
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                  >
                    <div className="text-primary-600 dark:text-primary-400">
                      {feature.icon}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="border-t border-gray-200 dark:border-dark-700 pt-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {stats.map((stat, index) => (
                    <div key={index} className="space-y-1">
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-4 rounded-2xl shadow-xl opacity-90 hover:scale-110 transition-transform">
              <div className="text-sm font-medium">New!</div>
              <div className="text-xs opacity-90">Latest Release</div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 p-4 rounded-2xl shadow-xl opacity-90 hover:scale-110 transition-transform">
              <div className="text-sm font-medium text-gray-900 dark:text-white">Premium</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Quality Assured</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
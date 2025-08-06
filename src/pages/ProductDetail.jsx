import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// Removed framer-motion imports
import { 
  ArrowLeft, 
  Star, 
  Download, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Eye, 
  Calendar,
  User,
  Tag,
  ExternalLink,
  CheckCircle,
  MessageCircle
} from 'lucide-react';
// Removed wagmi import
// Removed PaymentModal import
import ProductCommentSection from '../components/ProductCommentSection';
import GenericFavoriteButton from '../components/GenericFavoriteButton';
import OptimizedImage from '../components/OptimizedImage';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import { usePurchaseStatus } from '../hooks/usePurchase';
import { createApiUrl } from '../config/api';
import SEOHead from '../components/SEOHead';
import GenericLikeButton from '../components/GenericLikeButton';
import GenericCommentSection from '../components/GenericCommentSection';
import GenericFloatingActions from '../components/GenericFloatingActions';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Removed wagmi hook
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  // Removed payment modal state
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const products = [
    {
      id: 1,
      name: "React Template Pack",
      description: "Modern React templates with Tailwind CSS",
      fullDescription: "This comprehensive React template pack includes 15+ modern, responsive templates built with the latest React 18 features and Tailwind CSS. Each template is fully customizable and includes dark mode support, mobile-first design, and clean code structure.",
      price: "0.02",
      priceUSD: "$29",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
      ],
      rating: 4.8,
      downloads: 1250,
      type: "Template",
      features: [
        "15+ Responsive Templates",
        "React 18 & Tailwind CSS", 
        "Dark Mode Support",
        "Mobile-First Design",
        "TypeScript Support",
        "Documentation Included"
      ],
      tech: ["React", "Tailwind CSS", "TypeScript", "Vite"],
      author: "John Doe",
      publishDate: "2024-01-15"
    },
    {
      id: 2,
      name: "3D Model Collection",
      description: "High-quality 3D models for games and apps", 
      fullDescription: "Professional 3D model collection featuring 50+ high-quality assets optimized for games, apps, and VR experiences. All models are low-poly optimized for performance while maintaining visual quality.",
      price: "0.035",
      priceUSD: "$49",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&h=600&fit=crop"
      ],
      rating: 4.9,
      downloads: 890,
      type: "3D Model",
      features: [
        "50+ 3D Models",
        "Low-Poly Optimized",
        "PBR Textures Included", 
        "Animation Ready",
        "Multiple Formats",
        "Commercial License"
      ],
      tech: ["Blender", "Maya", "Unity", "Unreal Engine"],
      author: "Jane Smith",
      publishDate: "2024-02-01"
    },
    {
      id: 3,
      name: "Security Scripts",
      description: "Cybersecurity automation scripts",
      fullDescription: "Advanced cybersecurity automation scripts for penetration testing, vulnerability assessment, and security monitoring. Includes tools for network scanning, log analysis, threat detection, and automated reporting.",
      price: "0.025",
      priceUSD: "$39", 
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop", 
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop"
      ],
      rating: 4.7,
      downloads: 654,
      type: "Script",
      features: [
        "25+ Security Scripts",
        "Python & Bash",
        "Automated Scanning",
        "Report Generation", 
        "Documentation",
        "Regular Updates"
      ],
      tech: ["Python", "Bash", "Nmap", "Wireshark"],
      author: "Mike Johnson", 
      publishDate: "2024-01-20"
    }
  ];

  // Purchase status kontrol et
  const purchaseStatus = usePurchaseStatus(parseInt(id));

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  }, [id]);

  // Removed payment modal handler

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Product Not Found
          </h1>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <SEOHead
        title={product.name}
        description={product.description}
        keywords={[product.type, 'premium', 'download', 'development']}
        type="product"
        url={`/products/${id}`}
        image={product.image}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={product.gallery[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {/* Floating Actions */}
              <GenericFloatingActions
                targetId={product.id}
                targetType="product"
                shareData={{
                  url: window.location.href,
                  title: product.name,
                  description: product.description
                }}
                position="top-right"
                showShare={true}
                showFavorite={true}
                showLike={true}
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.gallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index ? 'border-primary-500' : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {product.type}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">•</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {product.downloads} downloads
                </span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              {product.fullDescription}
            </p>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-primary-500" />
                    <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {product.tech.map((tech, index) => (
                  <span key={index} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">By {product.author}</span>
                </div>
                <span className="text-gray-600 dark:text-gray-400">•</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {new Date(product.publishDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {product.price} ETH
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                    (~{product.priceUSD})
                  </span>
                </div>
                {purchaseStatus.can_download && (
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    ✓ Purchased
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {purchaseStatus.can_download ? (
                  // Satın alındıysa download butonu göster
                  <button className="w-full btn-primary flex items-center justify-center space-x-2">
                    <Download size={20} />
                    <span>Download Product</span>
                  </button>
                ) : (
                  // Simplified contact button - payment moved to admin
                  <button 
                    disabled
                    className="w-full btn-secondary flex items-center justify-center space-x-2 opacity-75 cursor-not-allowed"
                  >
                    <MessageCircle size={20} />
                    <span>Contact for Purchase - {product.priceUSD}</span>
                  </button>
                )}

                {/* Removed wallet connection message */}

                {!isAuthenticated && !purchaseStatus.can_download && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 text-center">
                    Please log in to purchase products
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl">
          <div className="flex items-center space-x-2 mb-6">
            <MessageCircle className="w-6 h-6 text-primary-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Reviews & Comments
            </h2>
          </div>
          <GenericCommentSection targetId={product.id} targetType="product" />
        </div>
      </div>

      {/* Removed PaymentModal - moved to admin panel */}
    </div>
  );
};

export default ProductDetail; 
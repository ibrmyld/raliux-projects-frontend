import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

// Pages
import Home from './pages/Home'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Tools from './pages/Tools'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Favorites from './pages/Favorites'
import Download from './pages/Download'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingTransition from './components/LoadingTransition'
import PageTransition from './components/PageTransition'
import GlobalSEO from './components/GlobalSEO'

// Context
import { AuthProvider } from './context/AuthContext'

// Hooks
import { usePageTransition } from './hooks/usePageTransition'
import { useTheme } from './hooks/useTheme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    },
  },
})

function AppContent() {
  const { isTransitioning } = usePageTransition()
  const { isDark } = useTheme() // Theme hook'unu aktif ediyoruz

  return (
    <>
      <GlobalSEO />
      
      {/* Loading Transition */}
      <LoadingTransition isLoading={isTransitioning} />
      
      {/* Main Layout */}
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
        <Navbar />
        
        <main className="pt-20">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/download/:id" element={<Download />} />
            </Routes>
          </PageTransition>
        </main>
        
        <Footer />
      </div>

      {/* Modals and other components can be added later */}
      
      {/* Toast Notifications */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
            border: '1px solid var(--toast-border)',
          },
          success: {
            style: {
              background: 'var(--toast-success-bg)',
              color: 'var(--toast-success-color)',
            },
            iconTheme: {
              primary: 'var(--toast-success-icon)',
              secondary: 'var(--toast-success-bg)',
            },
          },
          error: {
            style: {
              background: 'var(--toast-error-bg)',
              color: 'var(--toast-error-color)',
            },
            iconTheme: {
              primary: 'var(--toast-error-icon)',
              secondary: 'var(--toast-error-bg)',
            },
          },
        }}
      />
    </>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
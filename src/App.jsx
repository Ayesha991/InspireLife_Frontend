import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AnimatePresence, motion } from 'framer-motion';
import { queryClient } from './lib/queryClient';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/common/Loader';
import ProtectedRoute from './components/common/ProtectedRoute';
import FloatingContact from './components/common/FloatingContact';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

// Route level code splitting for reduced initial JS bundle size
const About = lazy(() => import('./pages/About'));
const Industries = lazy(() => import('./pages/Industries'));
const MepSolutions = lazy(() => import('./pages/MepSolutions'));
const MepCategoryDetail = lazy(() => import('./pages/MepCategoryDetail'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Quote = lazy(() => import('./pages/Quote'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);
  return null;
}

// Page-level fade transition wrapper
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <HelmetProvider>
            {!loaded && <Loader onComplete={handleLoaderComplete} />}
            <div className="min-h-screen flex flex-col bg-[#001736] w-full overflow-x-hidden">
              <ScrollToTop />
              <Navbar />
              <FloatingContact />

              <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-white/50 text-sm">Loading...</div>}>
                <AnimatePresence mode="wait" initial={false}>
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                    <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                    <Route path="/industries" element={<PageTransition><Industries /></PageTransition>} />
                    <Route path="/mep-solutions" element={<PageTransition><MepSolutions /></PageTransition>} />
                    <Route path="/mep" element={<PageTransition><MepSolutions /></PageTransition>} />
                    <Route path="/mep-products" element={<PageTransition><MepSolutions /></PageTransition>} />
                    <Route path="/mep-solutions/:categorySlug" element={<PageTransition><MepCategoryDetail /></PageTransition>} />
                    <Route path="/mep/:categorySlug" element={<PageTransition><MepCategoryDetail /></PageTransition>} />
                    <Route path="/mep-products/:categorySlug" element={<PageTransition><MepCategoryDetail /></PageTransition>} />
                    <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
                    <Route path="/products/:categorySlug" element={<PageTransition><Products /></PageTransition>} />
                    <Route path="/products/:categorySlug/:productSlug" element={<PageTransition><ProductDetail /></PageTransition>} />
                    <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                    <Route path="/quote" element={<PageTransition><Quote /></PageTransition>} />
                    <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                    <Route path="/admin" element={<Navigate to="/" replace />} />
                    <Route path="/dashboard" element={<Navigate to="/" replace />} />
                    <Route path="/admin-panel" element={<Navigate to="/" replace />} />
                    <Route
                      path="/admin/dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
                  </Routes>
                </AnimatePresence>
              </Suspense>

              {location.pathname !== '/industries' &&
                location.pathname !== '/login' &&
                location.pathname !== '/admin/dashboard' && <Footer />}
            </div>

            {/* TanStack Query DevTools — development only */}
            <ReactQueryDevtools initialIsOpen={false} position="bottom" />
          </HelmetProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

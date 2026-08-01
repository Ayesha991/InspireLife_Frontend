import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/common/Loader';
import ProtectedRoute from './components/common/ProtectedRoute';
import FloatingContact from './components/common/FloatingContact';
import Home from './pages/Home';
import About from './pages/About';
import Industries from './pages/Industries';
import MepSolutions from './pages/MepSolutions';
import MepCategoryDetail from './pages/MepCategoryDetail';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';

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

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <LanguageProvider>
    <AuthProvider>
      <HelmetProvider>
        {!loaded && <Loader onComplete={handleLoaderComplete} />}
        <div className="min-h-screen flex flex-col bg-[#001736] w-full overflow-x-hidden">
          <ScrollToTop />
          <Navbar />
          <FloatingContact />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/mep-solutions" element={<MepSolutions />} />
            <Route path="/mep" element={<MepSolutions />} />
            <Route path="/mep-products" element={<MepSolutions />} />
            <Route path="/mep-solutions/:categorySlug" element={<MepCategoryDetail />} />
            <Route path="/mep/:categorySlug" element={<MepCategoryDetail />} />
            <Route path="/mep-products/:categorySlug" element={<MepCategoryDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:categorySlug" element={<Products />} />
          <Route path="/products/:categorySlug/:productSlug" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/login" element={<Login />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
        {location.pathname !== '/industries' && location.pathname !== '/login' && location.pathname !== '/admin/dashboard' && <Footer />}
      </div>
    </HelmetProvider>
    </AuthProvider>
    </LanguageProvider>
  );
}

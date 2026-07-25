import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loader from './components/common/Loader';
import Home from './pages/Home';
import About from './pages/About';
import Industries from './pages/Industries';
import Products from './pages/Products';
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

  return (
    <LanguageProvider>
    <AuthProvider>
      <HelmetProvider>
        {!loaded && <Loader onComplete={() => setLoaded(true)} />}
        <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:categorySlug" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote" element={<Quote />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {location.pathname !== '/industries' && location.pathname !== '/login' && <Footer />}
      </div>
    </HelmetProvider>
    </AuthProvider>
    </LanguageProvider>
  );
}

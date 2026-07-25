import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Settings2, Search, Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

function LanguageDropdown() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const options = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇦🇪' },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 text-xs lg:text-sm font-semibold transition-colors px-2 py-1.5 rounded-md ${
          open ? 'text-purple-700 bg-purple-50' : 'text-[#43474f] hover:text-purple-700'
        }`}
        aria-label={t('nav.languageLabel')}
        aria-expanded={open}
      >
        <Globe size={16} className="lg:w-[18px] lg:h-[18px]" />
        <span className="text-xs font-semibold">
          {lang === 'ar' ? 'AR' : 'EN'}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-lg border border-[#e5e7eb] py-1.5 min-w-[148px] z-50"
          >
            {options.map((opt) => (
              <button
                key={opt.code}
                onClick={() => { setLang(opt.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                  lang === opt.code
                    ? 'text-purple-700 bg-purple-50'
                    : 'text-[#43474f] hover:bg-gray-50 hover:text-purple-700'
                }`}
              >
                <span className="text-base">{opt.flag}</span>
                <span>{opt.label}</span>
                {lang === opt.code && (
                  <Check size={14} className="ml-auto text-purple-600" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const { t, lang, setLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.about'), to: '/about' },
    { label: t('nav.industries'), to: '/industries' },
    { label: t('nav.products'), to: '/products' },
    { label: t('nav.contact'), to: '/contact' },
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const langOptions = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇦🇪' },
  ];

  return (
    <>
      <header
        className="bg-[#f8f9ff] border-b border-[#c4c6d0] w-full z-50 sticky top-0"
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 md:py-4 flex justify-between items-center gap-4">
          {/* Logo */}
          <Link to="/" aria-label="IPTS — Go to homepage" className="flex items-center gap-2 shrink-0">
            <Settings2 className="text-purple-600 w-6 h-6 sm:w-7 sm:h-7" />
            <span className="font-bold text-xl sm:text-2xl text-[#001736] tracking-tight font-heading">
              IPTS
            </span>
          </Link>

          {/* Tablet & Desktop nav */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8" role="navigation" aria-label="Main navigation">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-xs sm:text-sm lg:text-base font-semibold transition-colors ${
                    isActive
                      ? 'text-purple-700 border-b-2 border-purple-700 pb-0.5'
                      : 'text-[#43474f] hover:text-purple-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Utility */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
            <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-white border border-[#e5e7eb] rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-purple-500/20 focus-within:border-purple-500 transition-all">
              <input
                type="text"
                placeholder={t('nav.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-transparent !outline-none !ring-0 focus:!border-transparent focus:!ring-0 focus:!outline-none text-sm w-32 xl:w-40 text-[#43474f] placeholder:text-[#aab5c2]"
              />
              <button type="submit" className="text-[#aab5c2] hover:text-purple-700 transition-colors" aria-label="Search">
                <Search size={16} />
              </button>
            </form>

            {/* Language switcher */}
            <LanguageDropdown />

            <Link
              to="/login"
              className="text-[#43474f] hover:text-purple-700 text-xs sm:text-sm lg:text-base font-semibold transition-colors px-1"
              aria-label="Login"
            >
              {t('nav.login')}
            </Link>
            <Link
              to="/quote"
              className="px-3.5 py-2 lg:px-6 lg:py-2.5 bg-purple-700 hover:bg-purple-600 text-white text-xs lg:text-sm font-semibold rounded-lg shadow-sm transition-all whitespace-nowrap"
              aria-label="Request a Quote"
            >
              {t('nav.requestQuote')}
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 rounded-full text-[#001736] hover:bg-purple-50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' ? '-100%' : '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: lang === 'ar' ? '-100%' : '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#001736]/95 backdrop-blur-xl flex flex-col pt-24 pb-10 px-6 overflow-y-auto text-white"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav className="flex flex-col gap-1" role="navigation">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `block py-4 text-xl font-bold border-b border-white/10 transition-colors ${
                        isActive
                          ? 'text-[#aac7ff] border-purple-400'
                          : 'text-white/90 hover:text-purple-300'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            {/* Mobile language switcher */}
            <div className="mt-8 flex gap-3">
              {langOptions.map((opt) => (
                <button
                  key={opt.code}
                  onClick={() => setLang(opt.code)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                    lang === opt.code
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                      : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/20'
                  }`}
                >
                  <span>{opt.flag}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/quote"
                className="flex justify-center items-center px-6 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg w-full transition-all shadow-md active:scale-95"
              >
                {t('nav.requestQuote')}
              </Link>
              <Link
                to="/login"
                className="text-center py-2 text-sm font-semibold text-[#aac7ff] hover:text-white transition-colors"
              >
                {t('nav.login')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

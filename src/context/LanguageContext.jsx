import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('ipts_lang') || 'en';
  });

  const setLang = useCallback((newLang) => {
    setLangState(newLang);
    localStorage.setItem('ipts_lang', newLang);
  }, []);

  // Apply dir and lang attributes to <html> whenever lang changes
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  /**
   * Translation helper — supports dot notation e.g. t('hero.heading')
   * Falls back to English if key is missing in current language.
   */
  const t = useCallback((key) => {
    const keys = key.split('.');
    let result = translations[lang];
    for (const k of keys) {
      result = result?.[k];
    }
    if (result !== undefined) return result;
    // Fallback to English
    let fallback = translations['en'];
    for (const k of keys) {
      fallback = fallback?.[k];
    }
    return fallback ?? key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}

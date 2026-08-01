import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function FloatingInput({ label, name, type = 'text', required = true, initialValue = '', placeholderText = '' }) {
  const [val, setVal] = useState(initialValue);
  const [focused, setFocused] = useState(false);
  const active = focused || val.length > 0;
  return (
    <div className="floating-label-group">
      <input
        type={type} name={name} id={`quote-${name}`}
        placeholder={focused ? placeholderText : " "} required={required}
        value={val}
        onChange={e => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={label}
      />
      <label htmlFor={`quote-${name}`} className={active ? 'active' : ''}>{label}{required ? ' *' : ''}</label>
    </div>
  );
}

function FloatingSelect({ label, name, options, required = true }) {
  const [val, setVal] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="floating-label-group relative">
      <input type="hidden" name={name} value={val} required={required} />

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 pt-5 pb-2 border-[1.5px] rounded-lg cursor-pointer flex items-center justify-between transition-colors bg-white ${isOpen ? 'border-purple-500' : 'border-[#EEF2F6] hover:border-purple-300'}`}
        style={{ minHeight: '56px' }}
      >
        <span className="text-[#071C33] opacity-0">{val || ' '}</span>
      </div>

      {/* The actual visible value */}
      <span className="absolute start-4 top-[1.4rem] text-[#071C33] pointer-events-none">
        {val}
      </span>

      <ChevronDown
        size={18}
        className={`absolute end-4 top-1/2 -translate-y-1/2 text-[#AAB5C2] pointer-events-none transition-transform ${isOpen ? 'rotate-180 text-purple-500' : ''}`}
      />

      <label
        className={val || isOpen ? 'active' : ''}
        style={{
          top: val || isOpen ? '0.4rem' : '50%',
          transform: val || isOpen ? 'none' : 'translateY(-50%)',
          fontSize: val || isOpen ? '0.75rem' : '1rem',
          color: val || isOpen ? '#9333ea' : '#AAB5C2',
          insetInlineStart: '1rem',
          position: 'absolute',
          pointerEvents: 'none',
          transition: 'all 0.2s ease',
          fontWeight: val || isOpen ? '500' : '400'
        }}
      >
        {label}{required ? ' *' : ''}
      </label>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-1 bg-white border border-purple-200 shadow-xl rounded-lg overflow-hidden"
          >
            <ul className="max-h-60 overflow-y-auto py-1">
              {options.map(o => (
                <li
                  key={o}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${val === o ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-[#071C33] hover:bg-purple-50 hover:text-purple-700'}`}
                  onClick={() => {
                    setVal(o);
                    setIsOpen(false);
                  }}
                >
                  {o}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

function FloatingTextarea({ label, name, required = true }) {
  const [val, setVal] = useState('');
  const [focused, setFocused] = useState(false);
  return (
    <div className="floating-label-group">
      <textarea name={name} id={`quote-${name}`} placeholder=" " required={required}
        rows={5} value={val}
        onChange={e => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={label}
      />
      <label htmlFor={`quote-${name}`}>
        {label}{required ? ' *' : ''}
      </label>
    </div>
  );
}

// Removed hardcoded productOptions

export default function Quote() {
  const { t } = useLanguage();
  const productOptions = t('quote.productOptions') || [];
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.target);
    const data = {
      companyName: formData.get('company'),
      contactPerson: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      requestedProducts: `Category: ${formData.get('category')}\nProduct: ${formData.get('product')}\nQuantity: ${formData.get('quantity')}`,
      requirements: formData.get('requirements')
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || 'Failed to submit quote request');

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Request a Quote | IPTS Global</title>
        <meta name="description" content="Request a quote from IPTS for industrial, oilfield, electrical, mechanical or chemical products. Fast response guaranteed." />
      </Helmet>

      <main id="main-content">
        <div className="bg-[#071C33] pt-28 pb-14">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-2 text-xs text-white/50">
                <li><Link to="/" className="hover:text-white transition-colors">{t('quote.breadcrumbHome')}</Link></li>
                <li>/</li>
                <li className="text-white/80">{t('quote.pageTitle')}</li>
              </ol>
            </nav>
            <h1 className="heading-lg text-white font-heading">{t('quote.pageTitle')}</h1>
            <p className="text-white/60 text-body mt-3 max-w-md">
              {t('quote.pageSubtitle')}
            </p>
          </div>
        </div>

        <section className="section-pad bg-[#F8FAFC]">
          <div className="container-custom max-w-2xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-card p-12 text-center border border-purple-200 shadow-xl"
              >
                <div className="w-16 h-16 bg-[#18C964]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <Check size={32} className="text-[#18C964]" />
                </div>
                <h2 className="font-bold text-[#071C33] font-['Space_Grotesk'] text-2xl mb-3">
                  {t('quote.successTitle')}
                </h2>
                <p className="text-[#AAB5C2] mb-6">
                  {t('quote.successText')}
                </p>
                <Link to="/" className="btn-primary">{t('quote.backHome')}</Link>
              </motion.div>
            ) : (
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-card p-8 border border-purple-200 shadow-xl">
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4" aria-label="Quote request form">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm mb-2 border border-red-100">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatingInput label={t('quote.fullName')} name="name" />
                    <FloatingInput label={t('quote.companyName')} name="company" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FloatingInput label={t('quote.emailAddress')} name="email" type="email" />
                    <FloatingInput label={t('quote.phoneNumber')} name="phone" type="tel" required={false} />
                  </div>
                  <FloatingSelect label={t('quote.productCategory')} name="category" options={productOptions} />
                  <FloatingInput label={t('quote.productRequired')} name="product" placeholderText="e.g. Oil Spill Dispersant" />
                  <FloatingInput label={t('quote.quantity')} name="quantity" required={false} placeholderText="e.g. 500 Liters" />
                  <FloatingTextarea label={t('quote.additionalRequirements')} name="requirements" required={false} />

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#071C33] hover:bg-[#0a284a] text-white font-semibold rounded-full text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t('quote.submitting')}
                      </>
                    ) : (
                      <><Send size={15} /> {t('quote.submitButton')}</>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

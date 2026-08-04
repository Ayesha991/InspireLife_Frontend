import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Check, ChevronDown } from 'lucide-react';
import { company } from '../data/company';
import { useLanguage } from '../context/LanguageContext';
import { useSubmitContact } from '../hooks/useMutations';

function FloatingInput({ label, type = 'text', name, required = true, ...props }) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState('');
  const active = focused || val.length > 0;

  return (
    <div className="floating-label-group">
      <input
        type={type}
        name={name}
        id={name}
        placeholder=" "
        required={required}
        value={val}
        onChange={e => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={label}
        {...props}
      />
      <label htmlFor={name} className={active ? 'active' : ''}>
        {label}{required ? ' *' : ''}
      </label>
    </div>
  );
}

function FloatingTextarea({ label, name, required = true }) {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState('');
  const active = focused || val.length > 0;

  return (
    <div className="floating-label-group">
      <textarea
        name={name}
        id={name}
        placeholder=" "
        required={required}
        rows={5}
        value={val}
        onChange={e => setVal(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-label={label}
      />
      <label htmlFor={name}>
        {label}{required ? ' *' : ''}
      </label>
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
      
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  );
}

export default function Contact() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const contactMutation = useSubmitContact();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    contactMutation.mutate(data, {
      onSuccess: () => setSubmitted(true),
    });
  };

  const loading = contactMutation.isPending;
  const error = contactMutation.error?.message ?? null;

  return (
    <>
      <Helmet>
        <title>Contact Us | IPTS Global</title>
        <meta
          name="description"
          content="Contact IPTS — branches in UAE and Oman, centralized warehouse in Dubai. Phone: +971 50 357 8282. Email: info@iptsglobal.com"
        />
      </Helmet>

      <main id="main-content" className="bg-[#f8f9ff]">
        {/* Header */}
        <div className="bg-[#071C33] relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[#001736] z-10" />
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-20">
            <p className="text-purple-400 text-xs font-bold tracking-widest uppercase mb-3">
              {t('contact.connectLabel')}
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 font-heading">
              {t('contact.pageTitle')}
            </h1>
            <p className="text-white/70 max-w-xl text-sm leading-relaxed">
              {t('contact.pageSubtitle')}
            </p>
          </div>
        </div>

        {/* Contact section */}
        <section className="py-12 md:py-16">
          <div className="container-custom flex justify-center">
            <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[#e5e7eb]">
              <h2 className="text-2xl font-bold text-[#071C33] font-heading mb-8">{t('contact.formHeading')}</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#F8FAFC] border border-[#18C964]/30 rounded-2xl p-10 text-center"
                >
                  <div className="w-14 h-14 bg-[#18C964]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={28} className="text-[#18C964]" />
                  </div>
                  <h3 className="font-bold text-[#071C33] font-['Space_Grotesk'] text-xl mb-2">
                    {t('contact.successTitle')}
                  </h3>
                  <p className="text-[#AAB5C2] text-sm">
                    {t('contact.successText')}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6" aria-label="Contact form">
                  {error && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
                      {error}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FloatingInput label={t('contact.fullName')} name="name" />
                    <FloatingInput label={t('contact.company')} name="company" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FloatingInput label={t('contact.emailAddress')} type="email" name="email" />
                    <FloatingSelect 
                      label={t('contact.industry')} 
                      name="subject" 
                      options={t('contact.industryOptions') || []} 
                      required={false} 
                    />
                  </div>
                  <FloatingTextarea label={t('contact.message')} name="message" />
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#071C33] hover:bg-[#0a284a] text-white font-semibold rounded-full text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {t('contact.sending')}
                      </>
                    ) : (
                      <>
                        {t('contact.sendInquiry')}
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import GlowCard from '../components/common/GlowCard';
import { useLanguage } from '../context/LanguageContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      login(data.data.admin, data.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('loginPage.pageTitle')}</title>
      </Helmet>

      <main className="bg-[#f8f9fc] min-h-[calc(100vh-80px)] flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <GlowCard className="shadow-xl rounded-2xl">
            <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#071C33] font-heading mb-2">{t('loginPage.heading')}</h1>
              <p className="text-[#071C33]/70 text-sm">{t('loginPage.subtext')}</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-start gap-3 text-red-700">
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#071C33] mb-1.5" htmlFor="email">
                  {t('loginPage.emailLabel')}
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-[#AAB5C2]" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full ps-10 pe-4 py-3.5 bg-[#f8f9fc] border border-[#EEF2F6] rounded-lg text-sm !outline-none focus:border-purple-500 focus:!ring-0 focus:!shadow-none focus:bg-white transition-all"
                    placeholder={t('loginPage.emailPlaceholder')}
                    autoComplete="off"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#071C33] mb-1.5" htmlFor="password">
                  {t('loginPage.passwordLabel')}
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute start-3 top-1/2 -translate-y-1/2 text-[#AAB5C2]" />
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full ps-10 pe-4 py-3.5 bg-[#f8f9fc] border border-[#EEF2F6] rounded-lg text-sm !outline-none focus:border-purple-500 focus:!ring-0 focus:!shadow-none focus:bg-white transition-all"
                    placeholder={t('loginPage.passwordPlaceholder')}
                    autoComplete="new-password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {t('loginPage.signingIn')}
                  </>
                ) : (
                  t('loginPage.signIn')
                )}
              </button>
            </form>
            </div>
          </GlowCard>
        </div>
      </main>
    </>
  );
}

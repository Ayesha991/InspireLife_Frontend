import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Settings, Package, Activity, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductFormModal from '../components/admin/ProductFormModal';
import { useLanguage } from '../context/LanguageContext';
import { dynamicTranslations } from '../data/dynamicTranslations';

const translateDynamic = (type, text, lang) => {
  if (!text) return text;
  if (lang === 'ar' && dynamicTranslations[type] && dynamicTranslations[type][text]) {
    return dynamicTranslations[type][text];
  }
  return text;
};

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products?limit=1000`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm(t('dashboard.confirmDelete'))) return;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await res.json();
      if (res.ok) {
        setProducts(prev => prev.filter(p => p._id !== id));
      } else {
        alert(`Failed to delete: ${data.message}`);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleModalSuccess = (savedProduct) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => p._id === savedProduct._id ? savedProduct : p));
    } else {
      setProducts(prev => [savedProduct, ...prev]);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('dashboard.pageTitle')}</title>
      </Helmet>

      <main className="bg-[#f8f9fc] min-h-screen p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#071C33] font-heading mb-1">{t('dashboard.heading')}</h1>
              <p className="text-sm sm:text-base text-[#071C33]/70">{t('dashboard.welcome')} {user?.name || 'Admin'}!</p>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-700 hover:bg-purple-600 text-white text-sm font-semibold rounded shadow-sm transition-all whitespace-nowrap shrink-0 self-start sm:self-auto"
            >
              <LogOut size={18} className="shrink-0" />
              <span>{t('dashboard.signOut')}</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { title: t('dashboard.totalProducts'), value: products.length || '...', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
              { title: t('dashboard.categories'), value: new Set(products.map(p => p.category)).size || '...', icon: Settings, color: 'text-purple-600', bg: 'bg-purple-50' },
              { title: t('dashboard.systemStatus'), value: t('dashboard.healthy'), icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-[#EEF2F6] shadow-sm flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={stat.color} size={24} />
                </div>
                <div>
                  <p className="text-sm text-[#071C33]/60 font-medium mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-[#071C33]">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Product Management Section */}
          <div className="bg-white rounded-xl border border-[#EEF2F6] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#EEF2F6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#071C33]">{t('dashboard.productManagement')}</h2>
                <p className="text-sm text-[#071C33]/70">{t('dashboard.productManagementDesc')}</p>
              </div>
              <button 
                onClick={handleAddProduct}
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded shadow-sm transition-all"
              >
                <Plus size={18} />
                {t('dashboard.addNewProduct')}
              </button>
            </div>

            {loading ? (
              <div className="p-12 flex justify-center items-center">
                <Loader2 size={32} className="animate-spin text-purple-600" />
              </div>
            ) : error ? (
              <div className="p-12 text-center text-red-500 font-medium">
                {error}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f8f9fc] border-b border-[#EEF2F6] text-sm text-[#071C33]/60 uppercase tracking-wider">
                      <th className="p-4 font-bold">{t('dashboard.colImage')}</th>
                      <th className="p-4 font-bold">{t('dashboard.colProductName')}</th>
                      <th className="p-4 font-bold">{t('dashboard.colCategory')}</th>
                      <th className="p-4 font-bold">{t('dashboard.colSpecifications')}</th>
                      <th className="p-4 font-bold text-right">{t('dashboard.colActions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EEF2F6]">
                    {products.map(product => (
                      <tr key={product._id} className="hover:bg-purple-50/30 transition-colors">
                        <td className="p-4">
                          <div className="w-12 h-12 rounded border border-[#EEF2F6] overflow-hidden bg-white flex items-center justify-center">
                            {product.image ? (
                              <img src={product.image} alt={translateDynamic('products', product.productName, lang)} className="w-full h-full object-cover" />
                            ) : (
                              <Package size={20} className="text-[#AAB5C2]" />
                            )}
                          </div>
                        </td>
                        <td className="p-4 font-medium text-[#071C33]">{translateDynamic('products', product.productName, lang)}</td>
                        <td className="p-4 text-[#071C33]/70">{translateDynamic('categories', product.category, lang)}</td>
                        <td className="p-4 text-sm text-[#071C33]/60 truncate max-w-xs">
                          {product.specifications || '—'}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => handleEditProduct(product)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button 
                              onClick={() => handleDeleteProduct(product._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan="5" className="p-12 text-center text-[#AAB5C2]">
                          {t('dashboard.noProducts')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </main>

      <ProductFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingProduct}
        onSuccess={handleModalSuccess}
      />
    </>
  );
}

import { useState, useEffect } from 'react';
import { X, Loader2, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export default function ProductFormModal({ isOpen, onClose, product, onSuccess }) {
  const { token } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    image: '',
    specifications: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        productName: product.productName || '',
        category: product.category || '',
        image: product.image || product.images?.[0] || '',
        specifications: product.specifications || '',
      });
    } else {
      setFormData({
        productName: '',
        category: '',
        image: '',
        specifications: '',
      });
    }
    setError(null);
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const isEditing = !!product;
    const url = isEditing 
      ? `${import.meta.env.VITE_API_URL}/products/${product._id}`
      : `${import.meta.env.VITE_API_URL}/products`;

    try {
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Operation failed');
      }

      onSuccess(data.data);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071C33]/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden mt-10">
        <div className="flex items-center justify-between p-6 border-b border-[#EEF2F6]">
          <h2 className="text-xl font-bold text-[#071C33] font-heading">
            {product ? t('productForm.editTitle') : t('productForm.addTitle')}
          </h2>
          <button 
            onClick={onClose}
            className="text-[#AAB5C2] hover:text-[#071C33] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#071C33] mb-2">{t('productForm.productName')}</label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded border border-[#EEF2F6] bg-[#f8f9fc] focus:bg-white focus:border-purple-500 transition-all text-[#071C33]"
                  style={{ boxShadow: 'none', outline: 'none' }}
                  placeholder={t('productForm.placeholderName')}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-[#071C33] mb-2">{t('productForm.category')}</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded border border-[#EEF2F6] bg-[#f8f9fc] focus:bg-white focus:border-purple-500 transition-all text-[#071C33]"
                  style={{ boxShadow: 'none', outline: 'none' }}
                  placeholder={t('productForm.placeholderCategory')}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#071C33] mb-2">{t('productForm.imageUrl')}</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded border border-[#EEF2F6] bg-[#f8f9fc] focus:bg-white focus:border-purple-500 transition-all text-[#071C33]"
                style={{ boxShadow: 'none', outline: 'none' }}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#071C33] mb-2">{t('productForm.specifications')}</label>
              <p className="text-xs text-[#071C33]/60 mb-2">{t('productForm.specificationsHint')}</p>
              <textarea
                name="specifications"
                value={formData.specifications}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded border border-[#EEF2F6] bg-[#f8f9fc] focus:bg-white focus:border-purple-500 transition-all text-[#071C33] resize-y"
                style={{ boxShadow: 'none', outline: 'none' }}
                placeholder={t('productForm.placeholderSpecs')}
              />
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t border-[#EEF2F6]">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-[#071C33] font-semibold hover:bg-gray-100 rounded transition-colors"
              >
                {t('productForm.cancel')}
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded shadow-sm transition-all disabled:opacity-70"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                {product ? t('productForm.saveChanges') : t('productForm.createProduct')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

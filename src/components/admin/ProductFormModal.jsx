import { useState, useEffect } from 'react';
import { X, Loader2, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useSaveProduct, useUploadImage } from '../../hooks/useMutations';

export default function ProductFormModal({ isOpen, onClose, product, onSuccess }) {
  const { token } = useAuth();
  const { t } = useLanguage();

  const uploadMutation = useUploadImage(token);
  const saveMutation = useSaveProduct(token);

  const uploading = uploadMutation.isPending;
  const loading = saveMutation.isPending;
  const error = uploadMutation.error?.message ?? saveMutation.error?.message ?? null;

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    uploadMutation.mutate(file, {
      onSuccess: (data) => setFormData((prev) => ({ ...prev, image: data.data.imageUrl })),
    });
  };

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
      setFormData({ productName: '', category: '', image: '', specifications: '' });
    }
    uploadMutation.reset();
    saveMutation.reset();
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEdit = !!product;
    saveMutation.mutate(
      { product: isEdit ? { ...formData, _id: product._id } : formData, isEdit },
      {
        onSuccess: (data) => {
          onSuccess(data.data);
          onClose();
        },
      }
    );
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
              <label className="block text-sm font-bold text-[#071C33] mb-2">Product Image (Cloudinary Upload / URL)</label>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="flex-1 w-full px-4 py-3 rounded border border-[#EEF2F6] bg-[#f8f9fc] focus:bg-white focus:border-purple-500 transition-all text-[#071C33]"
                  style={{ boxShadow: 'none', outline: 'none' }}
                  placeholder="https://res.cloudinary.com/... or paste URL"
                />
                <label className="cursor-pointer px-4 py-3 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold rounded border border-purple-200 text-sm whitespace-nowrap flex items-center gap-2 transition-all">
                  {uploading ? <Loader2 size={16} className="animate-spin" /> : null}
                  {uploading ? 'Uploading to Cloudinary...' : 'Upload Image File'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>
              {formData.image && (
                <div className="mt-3 flex items-center gap-3 p-2 bg-[#f8f9fc] rounded border border-[#EEF2F6] w-fit">
                  <img src={formData.image} alt="Preview" className="w-12 h-12 object-cover rounded" />
                  <span className="text-xs text-[#071C33]/70 truncate max-w-xs">{formData.image}</span>
                </div>
              )}
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

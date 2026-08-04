import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteProduct,
  saveProduct,
  uploadImage,
  submitQuote,
  submitContact,
  loginAdmin,
} from '../lib/api';
import { queryKeys } from './useProducts';

// ─── Delete Product ───────────────────────────────────────────────────────────

export function useDeleteProduct(token) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteProduct({ id, token }),
    onSuccess: () => {
      // Invalidate both admin and public product caches
      queryClient.invalidateQueries({ queryKey: queryKeys.adminProducts });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

// ─── Save Product (Create or Update) ──────────────────────────────────────────

export function useSaveProduct(token) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ product, isEdit }) => saveProduct({ product, token, isEdit }),
    onSuccess: (_data, { product }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.adminProducts });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      // Invalidate the specific product detail cache if editing
      if (product?.slug) {
        queryClient.invalidateQueries({ queryKey: queryKeys.productDetail(product.slug) });
      }
    },
  });
}

// ─── Upload Image ─────────────────────────────────────────────────────────────

export function useUploadImage(token) {
  return useMutation({
    mutationFn: (file) => uploadImage({ file, token }),
  });
}

// ─── Submit Quote ─────────────────────────────────────────────────────────────

export function useSubmitQuote() {
  return useMutation({
    mutationFn: submitQuote,
  });
}

// ─── Submit Contact ───────────────────────────────────────────────────────────

export function useSubmitContact() {
  return useMutation({
    mutationFn: submitContact,
  });
}

// ─── Admin Login ──────────────────────────────────────────────────────────────

export function useLogin() {
  return useMutation({
    mutationFn: loginAdmin,
  });
}

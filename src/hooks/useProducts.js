import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import {
  fetchCategories,
  fetchProducts,
  fetchAllProducts,
  fetchProductBySlug,
  fetchRelatedProducts,
} from '../lib/api';

// ─── Query Keys ──────────────────────────────────────────────────────────────
// Centralised so mutations can invalidate by key
export const queryKeys = {
  categories: ['categories'],
  products: (params) => ['products', params],
  productsInfinite: (params) => ['products', 'infinite', params],
  productDetail: (slug) => ['products', slug],
  relatedProducts: (slug) => ['products', 'related', slug],
  adminProducts: ['admin', 'products'],
};

// ─── Categories ──────────────────────────────────────────────────────────────

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: fetchCategories,
    select: (data) => data.data ?? [],
    staleTime: 10 * 60 * 1000, // categories rarely change
  });
}

// ─── Products (paginated, single page) ────────────────────────────────────────

export function useProducts({ page = 1, limit = 12, category = '', search = '' } = {}) {
  return useQuery({
    queryKey: queryKeys.products({ page, limit, category, search }),
    queryFn: () => fetchProducts({ page, limit, category, search }),
    select: (data) => ({ products: data.data ?? [], pagination: data.pagination ?? null }),
    placeholderData: (previousData) => previousData, // keeps old data visible while loading next page
  });
}

// ─── Products (infinite scroll) ───────────────────────────────────────────────

export function useInfiniteProducts({ category = '', search = '', limit = 12 } = {}) {
  const query = useInfiniteQuery({
    queryKey: queryKeys.productsInfinite({ category, search, limit }),
    queryFn: ({ pageParam = 1 }) =>
      fetchProducts({ page: pageParam, limit, category, search }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination ?? {};
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  // Flatten all pages into a single products array
  const allPages = query.data?.pages ?? [];
  const products = allPages.flatMap((p) => p.data ?? []);
  const pagination = allPages.length
    ? allPages[allPages.length - 1]?.pagination ?? null
    : null;

  return {
    ...query,
    products,
    pagination,
  };
}

// ─── Product Detail + Related ─────────────────────────────────────────────────

export function useProductDetail(slug) {
  const productQuery = useQuery({
    queryKey: queryKeys.productDetail(slug),
    queryFn: () => fetchProductBySlug(slug),
    select: (data) => data.data,
    enabled: !!slug,
  });

  const relatedQuery = useQuery({
    queryKey: queryKeys.relatedProducts(slug),
    queryFn: () => fetchRelatedProducts(slug),
    select: (data) => (data.data ?? []).slice(0, 4),
    enabled: !!slug,
  });

  return {
    product: productQuery.data,
    related: relatedQuery.data ?? [],
    isLoading: productQuery.isLoading,
    isError: productQuery.isError,
    error: productQuery.error,
  };
}

// ─── Admin: All Products ──────────────────────────────────────────────────────

export function useAdminProducts(token) {
  return useQuery({
    queryKey: queryKeys.adminProducts,
    queryFn: () => fetchAllProducts(token),
    select: (data) => data.data ?? [],
    enabled: !!token,
    staleTime: 0, // always fresh in admin context
  });
}

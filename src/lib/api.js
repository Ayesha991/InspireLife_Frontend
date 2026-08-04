/**
 * Central API module — all fetch functions live here.
 * Never import fetch directly in components/pages; use these instead.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok || data.success === false) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }
  return data;
}

function authHeaders(token) {
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  return handleResponse(res);
}

// ─── Products ────────────────────────────────────────────────────────────────

/**
 * @param {{ page?: number, limit?: number, category?: string, search?: string }} params
 */
export async function fetchProducts({ page = 1, limit = 12, category = '', search = '' } = {}) {
  let url = `${BASE_URL}/products?page=${page}&limit=${limit}`;
  if (category) url += `&category=${encodeURIComponent(category)}`;
  if (search)   url += `&search=${encodeURIComponent(search)}`;
  const res = await fetch(url);
  return handleResponse(res);
}

/** Fetch all products (admin use only) */
export async function fetchAllProducts(token) {
  const res = await fetch(`${BASE_URL}/products?limit=1000`, {
    headers: authHeaders(token),
  });
  return handleResponse(res);
}

export async function fetchProductBySlug(slug) {
  const res = await fetch(`${BASE_URL}/products/${slug}`);
  return handleResponse(res);
}

export async function fetchRelatedProducts(slug) {
  const res = await fetch(`${BASE_URL}/products/related/${slug}`);
  return handleResponse(res);
}

/** Create or update a product */
export async function saveProduct({ product, token, isEdit = false }) {
  const url = isEdit ? `${BASE_URL}/products/${product._id}` : `${BASE_URL}/products`;
  const res = await fetch(url, {
    method: isEdit ? 'PUT' : 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(product),
  });
  return handleResponse(res);
}

export async function deleteProduct({ id, token }) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  });
  return handleResponse(res);
}

// ─── Image Upload ─────────────────────────────────────────────────────────────

export async function uploadImage({ file, token }) {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(`${BASE_URL}/upload`, {
    method: 'POST',
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: formData,
  });
  return handleResponse(res);
}

// ─── Quote ───────────────────────────────────────────────────────────────────

export async function submitQuote(data) {
  const res = await fetch(`${BASE_URL}/quote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// ─── Contact ─────────────────────────────────────────────────────────────────

export async function submitContact(data) {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// ─── Auth ────────────────────────────────────────────────────────────────────

export async function loginAdmin({ email, password }) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

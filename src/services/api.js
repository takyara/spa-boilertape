/* =============================================
   API.JS — Couche de services HTTP
   Wrapper autour de fetch avec gestion d'erreurs
   ============================================= */
import store from '../store/store.js';

const BASE_URL = import.meta?.env?.VITE_API_URL ?? '';

/**
 * Requête HTTP générique
 */
async function request(endpoint, options = {}) {
  store.setState({ isLoading: true });

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  };

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(error.message ?? `HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error(`[API] ${options.method ?? 'GET'} ${endpoint}`, err);
    throw err;
  } finally {
    store.setState({ isLoading: false });
  }
}

// ─── Méthodes shorthand ───────────────────────
const api = {
  get:    (url)          => request(url, { method: 'GET' }),
  post:   (url, body)    => request(url, { method: 'POST',   body }),
  put:    (url, body)    => request(url, { method: 'PUT',    body }),
  patch:  (url, body)    => request(url, { method: 'PATCH',  body }),
  delete: (url)          => request(url, { method: 'DELETE' }),
};

export default api;

// ─── Exemple de service métier ────────────────
// src/services/PostService.js
// import api from './api.js';
// export const PostService = {
//   getAll: ()    => api.get('/posts'),
//   getById: (id) => api.get(`/posts/${id}`),
//   create: (data)=> api.post('/posts', data),
// };

import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({ baseURL: BASE_URL });

// Attach JWT on every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('cl_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// On 401, clear session and redirect
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('cl_token');
      localStorage.removeItem('cl_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

// ── Auth ──────────────────────────────────────────────────────────────────────
export const login = (data) => api.post('/auth/login', data).then(r => r.data);
export const register = (data) => api.post('/auth/register', data).then(r => r.data);
export const getMe = () => api.get('/auth/me').then(r => r.data);

// ── Components ────────────────────────────────────────────────────────────────
export const getComponents = (params) => api.get('/components', { params }).then(r => r.data);
export const getComponent = (id) => api.get(`/components/${id}`).then(r => r.data);
export const createComponent = (data) => api.post('/components', data).then(r => r.data);
export const updateComponent = (id, data) => api.put(`/components/${id}`, data).then(r => r.data);
export const deleteComponent = (id) => api.delete(`/components/${id}`).then(r => r.data);
export const getCategories = () => api.get('/components/meta/categories').then(r => r.data);
export const getTags = () => api.get('/components/meta/tags').then(r => r.data);

// ── Versions ──────────────────────────────────────────────────────────────────
export const getVersions = (componentId) =>
  api.get(`/components/${componentId}/versions`).then(r => r.data);
export const getVersion = (componentId, versionId) =>
  api.get(`/components/${componentId}/versions/${versionId}`).then(r => r.data);
export const restoreVersion = (componentId, versionId) =>
  api.post(`/components/${componentId}/versions/${versionId}/restore`).then(r => r.data);

// ── Users ─────────────────────────────────────────────────────────────────────
export const getUsers = () => api.get('/users').then(r => r.data);
export const createUser = (data) => api.post('/users', data).then(r => r.data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data).then(r => r.data);
export const deleteUser = (id) => api.delete(`/users/${id}`).then(r => r.data);

// ── Audit ─────────────────────────────────────────────────────────────────────
export const getAuditLog = (params) => api.get('/audit', { params }).then(r => r.data);

// ── Git ───────────────────────────────────────────────────────────────────────
export const getGitConfig = () => api.get('/git/config').then(r => r.data);
export const saveGitConfig = (data) => api.post('/git/config', data).then(r => r.data);
export const gitCommit = (data) => api.post('/git/commit', data).then(r => r.data);
export const gitLog = (n) => api.get('/git/log', { params: { n } }).then(r => r.data);
export const gitPush = () => api.post('/git/push').then(r => r.data);

export default api;

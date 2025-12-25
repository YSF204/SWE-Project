import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Automatically add JWT token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Simplify error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Extract custom error message from backend if it exists
    const message = error.response?.data?.error || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

class ApiService {
  // Auth
  async register(userData) {
    const data = await apiClient.post('/auth/register', userData);
    if (data.token) localStorage.setItem('token', data.token);
    return data;
  }

  async login(credentials) {
    const data = await apiClient.post('/auth/login', credentials);
    if (data.token) localStorage.setItem('token', data.token);
    return data;
  }

  async verifyToken() {
    return await apiClient.get('/auth/verify');
  }

  // Categories
  async getCategories() {
    return await apiClient.get('/categories');
  }

  async createCategory(category) {
    return await apiClient.post('/categories', category);
  }

  async updateCategory(id, category) {
    return await apiClient.put(`/categories/${id}`, category);
  }

  async deleteCategory(id) {
    return await apiClient.delete(`/categories/${id}`);
  }

  // Products
  async getProducts(params = {}) {
    return await apiClient.get('/products', { params });
  }
}

export default new ApiService();

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://app-barber-hmm9.onrender.com',
});

// Interceptor para adicionar o token de autenticação em cada requisição
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de autenticação globalmente
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Limpa o token e força o redirecionamento para a página de login
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
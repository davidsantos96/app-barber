import axios from 'axios';

// Configuração da URL base da API
const getBaseURL = () => {
  // Em desenvolvimento, verifica se o backend local está disponível
  const isDevelopment = import.meta.env.DEV;
  const localBackendURL = 'http://localhost:3001';
  const productionBackendURL = 'https://app-barber-hmm9.onrender.com';
  
  // Se estiver em desenvolvimento, use o backend local, senão use o de produção
  return isDevelopment ? localBackendURL : productionBackendURL;
};

const api = axios.create({
  baseURL: getBaseURL(),
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
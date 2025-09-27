import React, { createContext, useContext, useMemo } from 'react';
import axios, { type AxiosInstance } from 'axios';

type ApiContextType = {
  api: AxiosInstance;
};

const ApiContext = createContext<ApiContextType | null>(null);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const api = useMemo(() => {
    const isDevelopment = import.meta.env.DEV;
    const localBackendURL = 'http://localhost:3001';
    const productionBackendURL = 'https://app-barber-hmm9.onrender.com';
    const baseURL = isDevelopment ? localBackendURL : productionBackendURL;

    const instance = axios.create({
      baseURL,
      timeout: 15000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    // Interceptor de request adicionando token
    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Interceptor de resposta para tratar 401 globais
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem('authToken');
          // Evita loop se já estiver na página de login
          if (window.location.pathname !== '/') {
            window.location.href = '/';
          }
        }
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
    console.log('[API] BaseURL:', baseURL, 'DEV?', isDevelopment);
    return instance;
  }, []);

  return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>;
};

export function useApi() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi deve ser usado dentro de ApiProvider');
  }
  return context.api;
}
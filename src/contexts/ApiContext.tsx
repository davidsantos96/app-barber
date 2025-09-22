import React, { createContext, useContext, useMemo } from 'react';
import axios, { type AxiosInstance } from 'axios';

type ApiContextType = {
  api: AxiosInstance;
};

const ApiContext = createContext<ApiContextType | null>(null);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: 'https://app-barber-hmm9.onrender.com',
      timeout: 15000,
    });

    // Interceptor para tratamento de erros globais
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );

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
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApiProvider, DataProvider, AgendamentosProvider } from './contexts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider>
      <DataProvider>
        <AgendamentosProvider>
          <App />
        </AgendamentosProvider>
      </DataProvider>
    </ApiProvider>
  </React.StrictMode>
);

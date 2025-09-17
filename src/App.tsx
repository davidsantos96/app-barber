// TODO: Criar arquivo separado para Routes
// TODO: Criar login unico para cada barbeiro (admin)
// TODO: VErificar a criação de hoohks



import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
// Usar logo1.png da pasta public
import RoutesConfig from './routes/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './auth';






function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Router>
        <RoutesConfig />
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;

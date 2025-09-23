
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';
import { toast } from 'react-toastify';
import { USERS } from '../../data/userData';
import { LoginWrapper, LoginContainer, LoginTitle, LoginSubtitle, LoginForm, LoginField, LoginInput, LoginButton } from './LoginPage.style';



const LoginPage: React.FC = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(user, pass)) {
      toast.success('Login realizado!');
      navigate('/dashboard');
    } else {
      toast.error('Usuário ou senha inválidos');
    }
  };

  const handleQuickLogin = (username: string, password: string, userName: string) => {
    if (login(username, password)) {
      toast.success(`Login realizado como ${userName}!`);
      navigate('/dashboard');
    } else {
      toast.error('Erro no login');
    }
  };

  return (
    <LoginWrapper>
      <LoginContainer>
  <LoginTitle>Login</LoginTitle>
  <LoginSubtitle>App Barber</LoginSubtitle>
  
        {/* Lista de Usuários Disponíveis */}
        <div style={{ 
          background: 'rgba(102, 126, 234, 0.1)', 
          border: '1px solid rgba(102, 126, 234, 0.3)',
          borderRadius: '8px', 
          padding: '16px', 
          marginBottom: '20px',
          color: '#fff'
        }}>
          <strong>👥 Usuários Disponíveis:</strong>
          <div style={{ marginTop: '12px' }}>
            {USERS.map(user => (
              <div key={user.id} style={{ 
                marginBottom: '8px', 
                padding: '8px 12px', 
                background: 'rgba(255,255,255,0.1)', 
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>
                    {user.role}
                  </div>
                  {user.barbearia && (
                    <div style={{ fontSize: '11px', color: '#ffd700' }}>
                      🏪 {user.barbearia}
                    </div>
                  )}
                </div>
                <button
                  style={{
                    background: 'rgba(102, 126, 234, 0.8)',
                    border: 'none',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                  onClick={() => handleQuickLogin(user.username, user.password, user.name)}
                >
                  Login Rápido
                </button>
              </div>
            ))}
          </div>
        </div>

        <LoginForm onSubmit={handleSubmit}>
          <LoginField>
            <label htmlFor="usuario" style={{ display: 'none' }}>Usuário</label>
            <LoginInput
              id="usuario"
              type="text"
              placeholder="Usuário"
              value={user}
              onChange={e => setUser(e.target.value)}
              required
            />
          </LoginField>
          <LoginField>
            <label htmlFor="senha" style={{ display: 'none' }}>Senha</label>
            <LoginInput
              id="senha"
              type="password"
              placeholder="Senha"
              value={pass}
              onChange={e => setPass(e.target.value)}
              required
            />
          </LoginField>
          <LoginButton type="submit">Log in</LoginButton>
          
          {/* Botão de Demo Login */}
          <LoginButton 
            type="button" 
            onClick={() => handleQuickLogin('demo', 'demo', 'Usuário Demo')}
            style={{ 
              background: 'linear-gradient(45deg, #ff6b6b, #ffa500)', 
              marginTop: '10px' 
            }}
          >
            🎯 Demo Login (Click Here!)
          </LoginButton>
        </LoginForm>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default LoginPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';
import { toast } from 'react-toastify';
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

  const handleDemoLogin = () => {
    setUser('demo');
    setPass('demo');
    if (login('demo', 'demo')) {
      toast.success('Demo Login realizado!');
      navigate('/dashboard');
    }
  };

  return (
    <LoginWrapper>
      <LoginContainer>
  <LoginTitle>Login</LoginTitle>
  <LoginSubtitle>App Barber</LoginSubtitle>
  
        {/* Credenciais de Demo */}
        <div style={{ 
          background: 'rgba(102, 126, 234, 0.1)', 
          border: '1px solid rgba(102, 126, 234, 0.3)',
          borderRadius: '8px', 
          padding: '12px', 
          marginBottom: '20px',
          textAlign: 'center',
          color: '#fff'
        }}>
          <strong>🎯 Demo Credentials:</strong><br/>
          <div style={{ marginTop: '8px', fontSize: '14px' }}>
            <span style={{ fontFamily: 'monospace', background: 'rgba(0,0,0,0.3)', padding: '4px 12px', borderRadius: '4px' }}>
              demo / demo
            </span>
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
            onClick={() => handleDemoLogin()}
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

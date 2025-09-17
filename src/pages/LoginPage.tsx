
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth';
import { toast } from 'react-toastify';
import { LoginWrapper, LoginContainer, LoginTitle, LoginForm, LoginField, LoginInput, LoginButton } from './LoginPage.style';



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

  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginTitle>Login / Acesso rápido</LoginTitle>
        <LoginForm onSubmit={handleSubmit}>
          <LoginField>
            <label>Usuário</label>
            <LoginInput value={user} onChange={e => setUser(e.target.value)} required />
          </LoginField>
          <LoginField>
            <label>Senha</label>
            <LoginInput type="password" value={pass} onChange={e => setPass(e.target.value)} required />
          </LoginField>
          <LoginButton type="submit">Entrar</LoginButton>
        </LoginForm>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default LoginPage;

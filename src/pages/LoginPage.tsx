
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const LoginContainer = styled.div`
  max-width: 350px;
  margin: 5rem auto;
  background: rgba(30, 30, 30, 0.97);
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.25);
  padding: 2.5rem 2rem;
  color: #f5f5f5;
  @media (max-width: 600px) {
    max-width: 98vw;
    padding: 1rem 0.5rem;
    border-radius: 8px;
  }
`;

const LoginTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  text-align: center;
  color: #fff;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const LoginField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const LoginInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #444;
  background: #232526;
  color: #fff;
  font-size: 1rem;
`;

const LoginButton = styled.button`
  background: #434343;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 0.5rem;
  transition: background 0.2s;
  &:hover {
    background: #232526;
  }
`;

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
  );
};

export default LoginPage;

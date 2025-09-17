export const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const LoginField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export const LoginInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #444;
  background: #232526;
  color: #fff;
  font-size: 1rem;
`;

export const LoginButton = styled.button`
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
import styled from 'styled-components';

export const LoginContainer = styled.div`
  max-width: 350px;
  margin: 5rem auto;
  background: #232526;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 2rem;
  color: #fff;
`;

export const LoginTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  text-align: center;
`;

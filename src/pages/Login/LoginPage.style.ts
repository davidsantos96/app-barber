import styled from 'styled-components';

export const LoginWrapper = styled.div`
  min-height: 100vh;
  background: #121212;
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
export const LoginSubtitle = styled.p`
  color: #e5e7eb;
  text-align: center;
  font-size: 1.1rem;
  margin-top: 8px;
  margin-bottom: 32px;
`;

export const ForgotPassword = styled.a`
  display: block;
  text-align: center;
  color: #3b82f6;
  font-size: 1rem;
  margin-top: 24px;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    color: #60a5fa;
    text-decoration: underline;
  }
`;

export const LoginContainer = styled.div`
  max-width: 350px;
  margin: 5rem auto;
  background: #232526;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 2rem;
  color: #fff;
`;

export const LoginTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  text-align: center;
`;

export const TitleIcon = styled.img`
  width: 28px;
  height: 28px;
  display: inline-block;
  vertical-align: middle;
  margin: 0 8px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
`;

export const LoginLogo = styled.img`
  width: 128px;
  height: 128px;
  display: block;
  margin: 8px auto 20px auto;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.25);
  @media (max-width: 600px) {
    width: 96px;
    height: 96px;
    margin: 6px auto 16px auto;
  }
`;

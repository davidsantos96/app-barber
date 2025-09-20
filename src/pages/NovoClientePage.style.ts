import styled from 'styled-components';

export const PageBg = styled.div`
  min-height: 100vh;
  background: #121212;
  color: #e2e8f0;
  font-family: 'Manrope', sans-serif;
  display: flex;
  flex-direction: column;
`;

export const HeaderBar = styled.header`
  background: #121212;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #232526;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1rem 1.2rem 1rem;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;

export const HeaderTitle = styled.h1`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  flex: 1;
`;

export const MainContent = styled.main`
  flex-grow: 1;
  padding: 1.2rem;
  overflow-y: auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #94a3b8;
  margin-bottom: 0.5rem;
`;

export const Input = styled.input`
  width: 100%;
  border-radius: 0.5rem;
  border: none;
  padding: 0.9rem 1rem;
  background: #232526;
  color: #fff;
  font-size: 1.08rem;
  margin-bottom: 0.2rem;
  outline: none;
  &::placeholder {
    color: #9ca3af;
    font-size: 1.08rem;
  }
  &:focus {
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  border-radius: 0.5rem;
  border: none;
  padding: 0.9rem 1rem;
  background: #232526;
  color: #fff;
  font-size: 1.08rem;
  outline: none;
  resize: none;
  &::placeholder {
    color: #9ca3af;
    font-size: 1.08rem;
  }
  &:focus {
    box-shadow: 0 0 0 2px #3b82f6;
  }
`;

export const Footer = styled.footer`
  padding: 1.2rem;
  background: #121212;
  position: sticky;
  bottom: 0;
`;

export const SaveButton = styled.button`
  width: 100%;
  background: #FFD700;
  color: #232526;
  font-weight: 700;
  font-size: 1.15rem;
  padding: 1rem 0;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ffe066;
  }
`;

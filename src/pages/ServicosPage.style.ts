import styled from 'styled-components';

export const PageBg = styled.div`
  min-height: 100vh;
  background: #121212;
  color: #fff;
  font-family: 'Manrope', sans-serif;
  display: flex;
  flex-direction: column;
`;

export const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  padding: 2.2rem 0 1.2rem 0;
  position: relative;
`;

export const HeaderTitle = styled.h1`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin: 0;
  flex: 1;
`;

export const BackButton = styled.button`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;

export const MainContent = styled.main`
  flex-grow: 1;
  padding: 1.2rem;
`;

export const ServicoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const ServicoCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #181818;
  border-radius: 0.75rem;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
`;

export const ServicoInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ServicoNome = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.3rem 0;
  color: #fff;
`;

export const ServicoPreco = styled.p`
  font-size: 1.08rem;
  font-weight: 500;
  color: #FFD700;
  margin: 0;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.2s;
  &:hover {
    background: #232526;
  }
`;

export const Footer = styled.footer`
  padding: 1.2rem;
  background: #121212;
  position: sticky;
  bottom: 0;
`;

export const AddButton = styled.button`
  width: 100%;
  background: #2563eb;
  color: #fff;
  font-weight: 700;
  font-size: 1.15rem;
  padding: 1rem 0;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  box-shadow: 0 2px 8px rgba(37,99,235,0.18);
  transition: background 0.2s;
  &:hover {
    background: #1746a2;
  }
`;

import styled from 'styled-components';

export const PageBg = styled.div`
  min-height: 100vh;
  background: #111;
  color: #fff;
  font-family: 'Manrope', sans-serif;
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    font-size: 0.97rem;
  }
`;

export const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  padding: 2.2rem 0 1.2rem 0;
  position: relative;
  @media (max-width: 600px) {
    padding: 1.2rem 0 0.7rem 0;
  }
`;

export const HeaderTitle = styled.h1`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin: 0;
  flex: 1;
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
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
  @media (max-width: 600px) {
    font-size: 1.3rem;
    left: 0.7rem;
  }
`;

export const ClienteSection = styled.section`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 2rem 1.2rem 1.2rem 1.2rem;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.7rem;
    padding: 1.2rem 0.7rem 0.7rem 0.7rem;
  }
`;

export const Avatar = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  object-fit: cover;
  background: #232526;
  @media (max-width: 600px) {
    width: 54px;
    height: 54px;
  }
`;

export const ClienteNome = styled.h2`
  color: #fff;
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0;
  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
`;

export const ClienteSub = styled.p`
  color: #b0b3b8;
  font-size: 1.05rem;
  margin: 0.2rem 0 0 0;
`;

export const InfoSection = styled.section`
  padding: 1.2rem;
  border-top: 1px solid #232526;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  @media (max-width: 600px) {
    padding: 0.7rem;
    gap: 0.7rem;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  @media (max-width: 600px) {
    gap: 0.7rem;
  }
`;

export const InfoIcon = styled.div`
  width: 48px;
  height: 48px;
  background: #232526;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    width: 36px;
    height: 36px;
  }
`;

export const InfoLabel = styled.p`
  color: #b0b3b8;
  font-size: 1.05rem;
  margin: 0 0 0.2rem 0;
  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

export const InfoValue = styled.p`
  color: #fff;
  font-size: 1.18rem;
  font-weight: 600;
  margin: 0;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 1.2rem;
  padding: 2rem 1.2rem 0 1.2rem;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.7rem;
    padding: 1.2rem 0.7rem 0 0.7rem;
  }
`;

export const RemarcarButton = styled.button`
  flex: 1;
  background: #FFD700;
  color: #232526;
  font-weight: 700;
  font-size: 1.15rem;
  padding: 1rem 0;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(255,215,0,0.18);
  transition: background 0.2s;
  &:hover {
    background: #eab308;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0.7rem 0;
  }
`;

export const EditarButton = styled.button`
  flex: 1;
  background: #2563eb;
  color: #fff;
  font-weight: 700;
  font-size: 1.15rem;
  padding: 1rem 0;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(37,99,235,0.18);
  transition: background 0.2s;
  &:hover {
    background: #1746a2;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0.7rem 0;
  }
`;

export const CancelarButton = styled.button`
  width: 100%;
  background: none;
  color: #ff3b3b;
  font-weight: 700;
  font-size: 1.15rem;
  padding: 1.2rem 0 0.5rem 0;
  border: none;
  cursor: pointer;
  text-align: center;
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 0.7rem 0 0.3rem 0;
  }
`;

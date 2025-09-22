import styled from 'styled-components';

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #121212;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
  @media (max-width: 600px) {
    padding-bottom: 60px;
  }
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 16px 12px 16px;
  position: sticky;
  top: 0;
  background: #121212ee;
  z-index: 10;
  @media (max-width: 600px) {
    padding: 14px 8px 8px 8px;
  }
`;

export const Title = styled.h1`
  flex: 1;
  text-align: center;
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

export const AddButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #FBBF24;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s;
  &:hover {
    background: #F59E0B;
  }
  @media (max-width: 600px) {
    width: 32px;
    height: 32px;
    font-size: 1.2rem;
  }
`;

export const Section = styled.section`
  width: 100%;
  max-width: 500px;
  margin: 0 auto 32px auto;
  @media (max-width: 600px) {
    max-width: 100%;
    margin: 0 auto 18px auto;
    padding: 0 4px;
  }
`;

export const SectionTitle = styled.h2`
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 16px;
  @media (max-width: 600px) {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
`;

export const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 8px;
  @media (max-width: 600px) {
    gap: 10px;
  }
`;

export const Card = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  background: #181C23;
  border-radius: 16px;
  padding: 18px 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  @media (max-width: 600px) {
    gap: 8px;
    padding: 10px 8px;
    border-radius: 10px;
  }
`;

export const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  background: #232526;
  @media (max-width: 600px) {
    width: 38px;
    height: 38px;
  }
`;

export const CardInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 6px;
  align-items: flex-start;
`;

export const ServiceName = styled.p`
  color: #fff;
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 0;
  line-height: 1.2;
  text-align: left;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

export const ServiceTime = styled.p`
  color: #b0b3b8;
  font-size: 1rem;
  margin: 0;
  line-height: 1.2;
  text-align: left;
  @media (max-width: 600px) {
    font-size: 0.9rem;
  }
`;

export const FooterNav = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  background: #181C23ee;
  border-top: 1px solid #232526;
  padding: 8px 0 12px 0;
  z-index: 20;
  display: flex;
  justify-content: space-around;
  @media (max-width: 600px) {
    padding: 4px 0 7px 0;
  }
`;

export const NavItem = styled.a`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #b0b3b8;
  font-size: 1.1rem;
  text-decoration: none;
  &.active {
    color: #3B82F6;
  }
  @media (max-width: 600px) {
    font-size: 0.95rem;
  }
`;

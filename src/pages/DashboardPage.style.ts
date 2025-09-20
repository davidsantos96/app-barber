import styled from 'styled-components';

export const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #121212;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 80px;
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
`;

export const Title = styled.h1`
  flex: 1;
  text-align: center;
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
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
`;

export const Section = styled.section`
  width: 100%;
  max-width: 500px;
  margin: 0 auto 32px auto;
`;

export const SectionTitle = styled.h2`
  color: #fff;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 8px;
`;

export const Card = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  background: #181C23;
  border-radius: 16px;
  padding: 18px 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
`;

export const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  background: #232526;
`;

export const CardInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ServiceName = styled.p`
  color: #fff;
  font-size: 1.15rem;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const ServiceTime = styled.p`
  color: #b0b3b8;
  font-size: 1rem;
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
`;

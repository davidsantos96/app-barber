import styled from 'styled-components';

export const FooterNavContainer = styled.footer`
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
  backdrop-filter: blur(10px);
  
  @media (max-width: 600px) {
    padding: 4px 0 7px 0;
  }
`;

export const NavItem = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #b0b3b8;
  font-size: 1.1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 4px;
  transition: all 0.2s ease;
  text-decoration: none;

  span {
    font-size: 0.75rem;
    margin-top: 2px;
  }

  &:hover {
    color: #3B82F6;
    transform: translateY(-2px);
  }

  &.active {
    color: #3B82F6;
  }

  &.logout {
    color: #ff6b6b;
    
    &:hover {
      color: #ff5252;
      transform: translateY(-2px);
    }
  }
  
  @media (max-width: 600px) {
    font-size: 0.95rem;
    
    span {
      font-size: 0.7rem;
    }
  }
`;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import styled from 'styled-components';


const NavbarContainer = styled.nav`
  width: 100%;
  background: linear-gradient(90deg, #232526 0%, #434343 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  margin-bottom: 32px;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: background 0.2s;
  &:hover, &.active {
    background: rgba(255,255,255,0.08);
    text-decoration: none;
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  margin-left: 2rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #fff;
    color: #232526;
  }
`;

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <NavbarContainer>
      <NavLinks>
        <StyledLink to="/disponibilidade">Disponibilidade</StyledLink>
        <StyledLink to="/dashboard">Dashboard</StyledLink>
        <StyledLink to="/agenda">Agenda</StyledLink>
        <StyledLink to="/clientes">Clientes</StyledLink>
      </NavLinks>
      <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
    </NavbarContainer>
  );
};

export default Navbar;

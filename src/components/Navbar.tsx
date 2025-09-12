
import React, { useState } from 'react';
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
  gap: 2rem;
  min-height: 48px;
  padding: 0 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  margin-bottom: 32px;
  position: relative;
  z-index: 2;
  @media (max-width: 700px) {
    justify-content: space-between;
    padding: 0 1rem;
  }
`;

const Brand = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
`;

const HamburgerMenu = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  span {
    height: 3px;
    width: 25px;
    background: white;
    margin-bottom: 4px;
    border-radius: 2px;
  }

  @media (max-width: 700px) {
    display: flex;
  }
`;

const NavLinks = styled.div<{ open: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 700px) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 2rem;
    background: #2a2a2a;
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 250px;
    padding-top: 5rem;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s ease-in-out;
    box-shadow: -5px 0 15px rgba(0,0,0,0.2);
  }
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.08rem;
  padding: 0.5rem 1.1rem;
  border-radius: 6px;
  transition: background 0.2s;
  &:hover, &.active {
    background: rgba(255,255,255,0.08);
    text-decoration: none;
  }
  @media (max-width: 700px) {
    width: 80%;
    text-align: center;
    font-size: 1.2rem;
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  color: #fff;
  border: 1px solid #fff;
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  margin-left: 1.5rem;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.08rem;
  transition: background 0.2s, color 0.2s;
  &:hover {
    background: #fff;
    color: #232526;
  }
  @media (max-width: 700px) {
    margin-left: 0;
    margin-top: 1rem;
    width: 80%;
    font-size: 1.2rem;
  }
`;

const Navbar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <Brand to="/dashboard">AppBarber</Brand>
      <HamburgerMenu onClick={toggleMenu}>
        <span />
        <span />
        <span />
      </HamburgerMenu>
      <NavLinks open={isOpen}>
        <StyledLink to="/disponibilidade" onClick={() => setIsOpen(false)}>Disponibilidade</StyledLink>
        <StyledLink to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</StyledLink>
        <StyledLink to="/agenda" onClick={() => setIsOpen(false)}>Agenda</StyledLink>
        <StyledLink to="/clientes" onClick={() => setIsOpen(false)}>Clientes</StyledLink>
        <LogoutButton onClick={() => { handleLogout(); setIsOpen(false); }}>Sair</LogoutButton>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;

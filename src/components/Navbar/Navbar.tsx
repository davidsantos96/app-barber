
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';
import { NavbarContainer, Brand, HamburgerMenu, NavLinks, StyledLink, LogoutButton } from './Navbar.style';

const Navbar: React.FC = () => {
  const { logout, user } = useAuth();
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
      <Brand to="/dashboard">
        AppBarber
        {user && (
          <div style={{ 
            fontSize: '12px', 
            fontWeight: 'normal', 
            opacity: 0.8,
            marginTop: '2px' 
          }}>
            👤 {user.name} {user.barbearia ? `- ${user.barbearia}` : ''}
          </div>
        )}
      </Brand>
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
        <StyledLink to="/perfil" onClick={() => setIsOpen(false)}>👤 Perfil</StyledLink>
        <LogoutButton onClick={() => { handleLogout(); setIsOpen(false); }}>Sair</LogoutButton>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;

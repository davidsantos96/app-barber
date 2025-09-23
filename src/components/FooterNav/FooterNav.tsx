import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiCalendar, FiUser, FiScissors, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../auth';
import { FooterNavContainer, NavItem } from './FooterNav.style';

const FooterNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair?')) {
      logout();
      navigate('/');
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <FooterNavContainer>
      <NavItem 
        onClick={() => navigate('/dashboard')} 
        className={isActive('/dashboard') ? 'active' : ''}
      >
        <FiCalendar size={22}/> 
        <span>Agendamentos</span>
      </NavItem>
      
      <NavItem 
        onClick={() => navigate('/clientes')} 
        className={isActive('/clientes') ? 'active' : ''}
      >
        <FiUser size={22}/> 
        <span>Clientes</span>
      </NavItem>
      
      <NavItem 
        onClick={() => navigate('/servicos')} 
        className={isActive('/servicos') ? 'active' : ''}
      >
        <FiScissors size={22}/> 
        <span>Serviços</span>
      </NavItem>
      
      <NavItem onClick={handleLogout} className="logout">
        <FiLogOut size={22}/> 
        <span>Sair</span>
      </NavItem>
    </FooterNavContainer>
  );
};

export default FooterNav;
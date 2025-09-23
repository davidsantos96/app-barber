import React from 'react';
import styled from 'styled-components';

const DemoBanner = styled.div`
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  color: white;
  padding: 8px 16px;
  text-align: center;
  font-weight: 600;
  font-size: 14px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const DemoNotification: React.FC = () => {
  // Só mostrar em produção
  if (import.meta.env.VITE_ENV !== 'production') return null;
  
  return (
    <DemoBanner>
      🚀 Este é um projeto de demonstração - Explore à vontade! 
      <a 
        href="https://github.com/davidsantos96/app-barber" 
        style={{ color: 'white', marginLeft: '8px', textDecoration: 'underline' }}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver Código no GitHub
      </a>
    </DemoBanner>
  );
};

export default DemoNotification;
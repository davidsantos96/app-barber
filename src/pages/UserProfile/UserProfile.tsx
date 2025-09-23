import React from 'react';
import { useAuth } from '../../auth';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: white;
`;

const ProfileCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const UserAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #ffa500);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  margin: 0 auto 20px;
  border: 4px solid rgba(255, 255, 255, 0.3);
`;

const UserName = styled.h1`
  text-align: center;
  margin: 0 0 10px;
  font-size: 28px;
`;

const UserRole = styled.div`
  text-align: center;
  opacity: 0.9;
  font-size: 16px;
  text-transform: capitalize;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
`;

const InfoTitle = styled.h3`
  margin: 0 0 15px;
  color: #ffd700;
  font-size: 18px;
`;

const InfoItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoLabel = styled.span`
  opacity: 0.8;
`;

const InfoValue = styled.span`
  font-weight: bold;
`;

const RoleBadge = styled.span<{ role: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  background: ${props => 
    props.role === 'admin' ? '#ff6b6b' :
    props.role === 'demo' ? '#ffa500' :
    '#4ecdc4'
  };
  color: white;
`;

const UserProfile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <ProfileContainer>
        <ProfileCard>
          <div style={{ textAlign: 'center' }}>
            <h2>Usuário não encontrado</h2>
            <p>Faça login para ver seu perfil</p>
          </div>
        </ProfileCard>
      </ProfileContainer>
    );
  }

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador do sistema com acesso completo';
      case 'demo':
        return 'Usuário de demonstração com dados fictícios';
      case 'barbeiro':
        return 'Barbeiro profissional com sua própria cartela de clientes';
      default:
        return 'Usuário do sistema';
    }
  };

  const getRolePermissions = (role: string) => {
    switch (role) {
      case 'admin':
        return [
          'Gerenciar todos os usuários',
          'Acessar relatórios completos',
          'Configurações do sistema',
          'Backup e restauração'
        ];
      case 'demo':
        return [
          'Visualizar dados demo',
          'Testar funcionalidades',
          'Simular operações',
          'Acesso limitado'
        ];
      case 'barbeiro':
        return [
          'Gerenciar próprios clientes',
          'Agendar atendimentos',
          'Visualizar agenda pessoal',
          'Controle de serviços'
        ];
      default:
        return ['Acesso básico'];
    }
  };

  return (
    <ProfileContainer>
      <ProfileCard>
        <UserAvatar>
          {user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
        </UserAvatar>
        <UserName>{user.name}</UserName>
        <UserRole>
          <RoleBadge role={user.role}>{user.role}</RoleBadge>
        </UserRole>
        {user.barbearia && (
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
            🏪 {user.barbearia}
          </div>
        )}
      </ProfileCard>

      <InfoGrid>
        <InfoCard>
          <InfoTitle>📋 Informações Básicas</InfoTitle>
          <InfoItem>
            <InfoLabel>Nome de usuário:</InfoLabel>
            <InfoValue>{user.username}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>Tipo de conta:</InfoLabel>
            <InfoValue>{getRoleDescription(user.role)}</InfoValue>
          </InfoItem>
          <InfoItem>
            <InfoLabel>ID do usuário:</InfoLabel>
            <InfoValue style={{ fontFamily: 'monospace', fontSize: '12px' }}>{user.id}</InfoValue>
          </InfoItem>
          {user.barbearia && (
            <InfoItem>
              <InfoLabel>Estabelecimento:</InfoLabel>
              <InfoValue>{user.barbearia}</InfoValue>
            </InfoItem>
          )}
        </InfoCard>

        <InfoCard>
          <InfoTitle>🔑 Permissões e Acesso</InfoTitle>
          {getRolePermissions(user.role).map((permission, index) => (
            <InfoItem key={index}>
              <span>✅ {permission}</span>
            </InfoItem>
          ))}
        </InfoCard>
      </InfoGrid>

      {user.role === 'demo' && (
        <InfoCard style={{ marginTop: '20px', border: '2px solid #ffa500' }}>
          <InfoTitle>🎯 Modo Demonstração Ativo</InfoTitle>
          <p style={{ margin: '0', opacity: '0.9' }}>
            Você está usando uma conta de demonstração. Todos os dados são fictícios e 
            servem apenas para testar as funcionalidades do sistema. Nenhuma alteração 
            afetará dados reais de clientes.
          </p>
        </InfoCard>
      )}
    </ProfileContainer>
  );
};

export default UserProfile;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientForm from '../components/ClientForm';
import Navbar from '../components/Navbar';
import { ClientesContainer, ClientesTitle, SubTitle, ClientesList, ClienteItem, ModalBg, ModalBox, ModalTitle, ModalInput, ModalActions, ModalButton, ModalCancelButton } from './ClientesPage.style';
import styled from 'styled-components';
import { FiSearch, FiChevronRight, FiPlus } from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';

interface Cliente {
  id: string;
  nome: string;
  apelido?: string;
  telefone: string;
}

// Substitua <Container> por <ClientesContainer> e <Title> por <ClientesTitle> no JSX

// ...estilos globais já aplicados via ClientesPage.style.ts...


const ClientesPage: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [search, setSearch] = useState('');
  const [editCliente, setEditCliente] = useState<Cliente | null>(null);
  const [editNome, setEditNome] = useState('');
  const [editApelido, setEditApelido] = useState('');
  const [editTelefone, setEditTelefone] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const navigate = useNavigate();

  const fetchClientes = async () => {
    const res = await axios.get<Cliente[]>('https://app-barber-hmm9.onrender.com/clientes');
    setClientes(res.data);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleAgendar = (clienteId: string) => {
    navigate(`/agenda?cliente=${clienteId}`);
  };

  // Máscara telefone
  const telefoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/;
  function formatTelefone(value: string) {
    const nums = value.replace(/\D/g, '');
    if (nums.length <= 2) return `(${nums}`;
    if (nums.length <= 7) return `(${nums.slice(0,2)})${nums.slice(2)}`;
    if (nums.length <= 11) return `(${nums.slice(0,2)})${nums.slice(2,7)}-${nums.slice(7)}`;
    return `(${nums.slice(0,2)})${nums.slice(2,7)}-${nums.slice(7,11)}`;
  }

  // Abrir modal de edição
  const openEditModal = (cliente: Cliente) => {
    setEditCliente(cliente);
    setEditNome(cliente.nome);
    setEditApelido(cliente.apelido || '');
    setEditTelefone(cliente.telefone);
  };

  // Fechar modal
  const closeEditModal = () => {
    setEditCliente(null);
    setEditNome('');
    setEditApelido('');
    setEditTelefone('');
    setEditLoading(false);
  };

  // Salvar edição
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editNome.trim() || !editTelefone.trim()) {
      alert('Nome e telefone são obrigatórios');
      return;
    }
    if (!telefoneRegex.test(editTelefone)) {
      alert('Telefone deve estar no formato (11)91234-5678');
      return;
    }
    setEditLoading(true);
    try {
      await axios.put(`https://app-barber-hmm9.onrender.com/clientes/${editCliente?.id}`, {
        nome: editNome,
        apelido: editApelido,
        telefone: editTelefone
      });
      closeEditModal();
      fetchClientes();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao editar cliente');
    } finally {
      setEditLoading(false);
    }
  };

  // Filtro de clientes
  const filteredClientes = clientes.filter(cliente =>
    cliente.nome.toLowerCase().includes(search.toLowerCase()) ||
    cliente.telefone.includes(search)
  );

  return (
    <PageBg>
      <HeaderBar>
        <BackButton onClick={() => navigate(-1)}>
          &#8592;
        </BackButton>
        <HeaderTitle>Clientes</HeaderTitle>
      </HeaderBar>
      <ClientesContainer style={{ background: 'transparent', boxShadow: 'none', padding: 0, maxWidth: '100%' }}>
        <SearchBox>
          <FiSearch size={22} color="#888" style={{ marginRight: 8 }} />
          <SearchInput
            placeholder="Buscar clientes"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </SearchBox>
        <ClientesList>
          {filteredClientes.map(cliente => (
            <ClienteItemStyled key={cliente.id} onClick={() => openEditModal(cliente)}>
              <Avatar src={getAvatar(cliente.nome)} alt={cliente.nome} />
              <ClienteInfo>
                <ClienteNome>{cliente.nome}</ClienteNome>
                <ClienteTelefone>{cliente.telefone}</ClienteTelefone>
              </ClienteInfo>
              <Chevron onClick={e => { e.stopPropagation(); openEditModal(cliente); }}>
                <FiChevronRight size={26} color="#888" />
              </Chevron>
            </ClienteItemStyled>
          ))}
        </ClientesList>
        <FloatingButton onClick={() => navigate('/novo-cliente')}>
          <FiPlus size={32} color="#232526" />
        </FloatingButton>
      </ClientesContainer>

      {/* Modal de edição permanece igual */}
      {editCliente && (
        <ModalBg>
          <ModalBox onSubmit={handleEditSubmit}>
            <ModalTitle>Editar Cliente</ModalTitle>
            <div style={{ marginBottom: '1.2rem' }}>
              <label>Nome*</label>
              <ModalInput
                value={editNome}
                onChange={e => setEditNome(e.target.value)}
                required
              />
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <label>Apelido</label>
              <ModalInput
                value={editApelido}
                onChange={e => setEditApelido(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <label>Telefone*</label>
              <ModalInput
                type="tel"
                value={editTelefone}
                onChange={e => setEditTelefone(formatTelefone(e.target.value))}
                onPaste={e => {
                  e.preventDefault();
                  const pasted = e.clipboardData.getData('Text');
                  setEditTelefone(formatTelefone(pasted));
                }}
                placeholder="(11)91234-5678"
                maxLength={15}
                required
              />
            </div>
            <ModalActions>
              <ModalCancelButton type="button" onClick={closeEditModal}>Cancelar</ModalCancelButton>
              <ModalButton type="submit" disabled={editLoading}>{editLoading ? 'Salvando...' : 'Salvar'}</ModalButton>
            </ModalActions>
          </ModalBox>
        </ModalBg>
      )}
    </PageBg>
  );
};


// Styled Components extras para layout mobile
const PageBg = styled.div`
  min-height: 100vh;
  background: #000;
  position: relative;
`;

const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.2rem 0 1.2rem 0;
  position: relative;
`;

const HeaderTitle = styled.h1`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin: 0;
`;

const BackButton = styled.button`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #191919;
  border-radius: 16px;
  padding: 0.7rem 1.2rem;
  margin: 0 1.2rem 1.2rem 1.2rem;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.1rem;
  flex: 1;
  outline: none;
  &::placeholder {
    color: #888;
    font-size: 1.1rem;
  }
`;

const ClienteItemStyled = styled.li`
  display: flex;
  align-items: center;
  padding: 1.1rem 1.2rem;
  border-bottom: 1px solid #222;
  background: transparent;
  cursor: pointer;
  &:last-child {
    border-bottom: none;
  }
`;

const Avatar = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1.2rem;
  background: #222;
`;

const ClienteInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ClienteNome = styled.span`
  color: #fff;
  font-size: 1.18rem;
  font-weight: 700;
`;

const ClienteTelefone = styled.span`
  color: #888;
  font-size: 1.05rem;
  margin-top: 2px;
`;

const Chevron = styled.div`
  margin-left: 1.2rem;
  display: flex;
  align-items: center;
`;

const FloatingButton = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #FFD700;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  cursor: pointer;
  z-index: 2000;
`;

// Função para gerar avatar (pode ser ajustada para usar imagens reais)
function getAvatar(nome: string) {
  // Exemplo: retorna um avatar padrão por inicial
  // Substitua por imagens reais se desejar
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=222&color=fff&size=128`;
}

export default ClientesPage;

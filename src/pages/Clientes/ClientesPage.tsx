import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiChevronRight, FiPlus } from 'react-icons/fi';
import {
  PageBg, HeaderBar, HeaderTitle, BackButton, SearchBox, SearchInput, ClientesContainer, ClientesList, ClienteItemStyled, Avatar, ClienteInfo, ClienteNome, ClienteTelefone, Chevron, FloatingButton, ModalBg, ModalBox, ModalTitle, ModalInput, ModalActions, ModalButton, ModalCancelButton
} from './ClientesPage.style';
import { useData, type Cliente } from '../../contexts';

const ClientesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [editCliente, setEditCliente] = useState<Cliente | null>(null);
  const [editNome, setEditNome] = useState('');
  const [editApelido, setEditApelido] = useState('');
  const [editTelefone, setEditTelefone] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const navigate = useNavigate();
  const { clientes, updateCliente } = useData();

  // Função para abrir modal de edição
  const openEditModal = (cliente: Cliente) => {
    setEditCliente(cliente);
    setEditNome(cliente.nome);
    setEditApelido(cliente.apelido || '');
    setEditTelefone(cliente.telefone);
  };

  // Função para fechar modal
  const closeEditModal = () => {
    setEditCliente(null);
    setEditNome('');
    setEditApelido('');
    setEditTelefone('');
    setEditLoading(false);
  };

  // Função para salvar edição
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editNome.trim() || !editTelefone.trim()) {
      alert('Nome e telefone são obrigatórios');
      return;
    }
    const telefoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/;
    if (!telefoneRegex.test(editTelefone)) {
      alert('Telefone deve estar no formato (11)91234-5678');
      return;
    }
    setEditLoading(true);
    try {
      await updateCliente(editCliente!.id, {
        nome: editNome,
        apelido: editApelido,
        telefone: editTelefone
      });
      closeEditModal();
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

  // Função para gerar avatar
  function getAvatar(nome: string) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(nome)}&background=222&color=fff&size=128`;
  }

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
                {cliente.apelido && (
                  <span style={{ color: '#FFD700', fontSize: '0.98rem', fontWeight: 500 }}>{cliente.apelido}</span>
                )}
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

      {/* Modal de edição */}
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
                onChange={e => setEditTelefone(e.target.value)}
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

export default ClientesPage;

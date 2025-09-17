import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientForm from '../components/ClientForm';
import Navbar from '../components/Navbar';
import { ClientesContainer, ClientesTitle, SubTitle, ClientesList, ClienteItem, AgendarButton, EditButton, ModalBg, ModalBox, ModalTitle, ModalInput, ModalActions, ModalButton, ModalCancelButton } from './ClientesPage.style';

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

  return (
    <>
      <Navbar />
      <ClientesContainer>
        <ClientesTitle>Clientes</ClientesTitle>
        <p>Gerencie seus clientes cadastrados.</p>
        <ClientForm onSuccess={fetchClientes} />
        <SubTitle>Lista de Clientes</SubTitle>
        <ClientesList>
          {clientes.map(cliente => (
            <ClienteItem key={cliente.id}>
              <span>{cliente.nome} {cliente.apelido && `(${cliente.apelido})`} - {cliente.telefone}</span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <AgendarButton onClick={() => handleAgendar(cliente.id)}>Agendar</AgendarButton>
                <EditButton onClick={() => openEditModal(cliente)}>Editar</EditButton>
              </div>
            </ClienteItem>
          ))}
        </ClientesList>

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
      </ClientesContainer>
    </>
  );
};

export default ClientesPage;

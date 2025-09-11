

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientForm from '../components/ClientForm';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface Cliente {
  id: string;
  nome: string;
  apelido?: string;
  telefone: string;
}

const Container = styled.main`
  max-width: 800px;
  margin: 2rem auto;
  background: rgba(15, 15, 15, 0.97);
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.25);
  padding: 2.5rem 2rem;
  color: #f5f5f5;
  @media (max-width: 600px) {
    max-width: 98vw;
    padding: 1rem 0.5rem;
    border-radius: 8px;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1.2rem;
  font-weight: 700;
  color: #fff;
`;

const SubTitle = styled.h3`
  font-size: 1.2rem;
  margin-top: 2rem;
  color: #ccc;
`;

const ClientesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ClienteItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #333;
  color: #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 0.97rem;
  }
`;

const AgendarButton = styled.button`
  background: #1e90ff;
  color: #fff;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  margin-left: 1rem;
  transition: background 0.2s;
  &:hover {
    background: #1565c0;
  }
  @media (max-width: 600px) {
    margin-left: 0;
    margin-top: 0.5rem;
    width: 100%;
    font-size: 0.97rem;
    border-radius: 7px;
  }
`;


const ClientesPage: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
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

  return (
    <>
      <Navbar />
      <Container>
        <Title>Clientes</Title>
        <p>Gerencie seus clientes cadastrados.</p>
        <ClientForm onSuccess={fetchClientes} />
        <SubTitle>Lista de Clientes</SubTitle>
        <ClientesList>
          {clientes.map(cliente => (
            <ClienteItem key={cliente.id}>
              <span>{cliente.nome} {cliente.apelido && `(${cliente.apelido})`} - {cliente.telefone}</span>
              <AgendarButton onClick={() => handleAgendar(cliente.id)}>Agendar</AgendarButton>
            </ClienteItem>
          ))}
        </ClientesList>
      </Container>
    </>
  );
};

export default ClientesPage;

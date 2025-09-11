
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';

interface ClientFormProps {
  onSuccess?: () => void;
}

const Form = styled.form`
  background: rgba(40, 40, 40, 0.98);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  max-width: 400px;
  margin: 2rem auto 2rem auto;
  color: #f5f5f5;
  @media (max-width: 600px) {
    max-width: 98vw;
    padding: 1rem 0.5rem;
    border-radius: 8px;
  }
`;

const Field = styled.div`
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #444;
  background: #232526;
  color: #fff;
  font-size: 1rem;
`;

const Button = styled.button`
  background: #434343;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background 0.2s;
  &:hover {
    background: #232526;
  }
`;

const ClientForm: React.FC<ClientFormProps> = ({ onSuccess }) => {
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [telefone, setTelefone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !telefone.trim()) {
      toast.error('Nome e telefone são obrigatórios');
      return;
    }
    setLoading(true);
    try {
  await axios.post('https://app-barber-hmm9.onrender.com/clientes', { nome, apelido, telefone });
      toast.success('Cliente cadastrado com sucesso!');
      setNome('');
      setApelido('');
      setTelefone('');
      if (onSuccess) onSuccess();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Erro ao cadastrar cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label>Nome*</Label>
        <Input value={nome} onChange={e => setNome(e.target.value)} required />
      </Field>
      <Field>
        <Label>Apelido</Label>
        <Input value={apelido} onChange={e => setApelido(e.target.value)} />
      </Field>
      <Field>
        <Label>Telefone*</Label>
        <Input value={telefone} onChange={e => setTelefone(e.target.value)} required />
      </Field>
      <Button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Cadastrar'}</Button>
    </Form>
  );
};

export default ClientForm;

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ClientFormContainer, ClientFormLabel, ClientFormInput, ClientFormButton } from './ClientForm.style';

interface ClientFormProps {
  onSuccess?: () => void;
}



const ClientForm: React.FC<ClientFormProps> = ({ onSuccess }) => {
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [telefone, setTelefone] = useState('');
  const telefoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/;

  // Função para aplicar máscara ao digitar
  function formatTelefone(value: string) {
    // Remove tudo que não é número
    const nums = value.replace(/\D/g, '');
    if (nums.length <= 2) return `(${nums}`;
    if (nums.length <= 7) return `(${nums.slice(0,2)})${nums.slice(2)}`;
    if (nums.length <= 11) return `(${nums.slice(0,2)})${nums.slice(2,7)}-${nums.slice(7)}`;
    return `(${nums.slice(0,2)})${nums.slice(2,7)}-${nums.slice(7,11)}`;
  }
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !telefone.trim()) {
      toast.error('Nome e telefone são obrigatórios');
      return;
    }
    if (!telefoneRegex.test(telefone)) {
      toast.error('Telefone deve estar no formato (11)91234-5678');
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
    <ClientFormContainer onSubmit={handleSubmit}>
      <div style={{ marginBottom: '1.2rem' }}>
        <ClientFormLabel>Nome*</ClientFormLabel>
        <ClientFormInput value={nome} onChange={e => setNome(e.target.value)} required />
      </div>
      <div style={{ marginBottom: '1.2rem' }}>
        <ClientFormLabel>Apelido</ClientFormLabel>
        <ClientFormInput value={apelido} onChange={e => setApelido(e.target.value)} />
      </div>
      <div style={{ marginBottom: '1.2rem' }}>
        <ClientFormLabel>Telefone*</ClientFormLabel>
        <ClientFormInput
          type="tel"
          inputMode='numeric'
          value={telefone}
          onChange={e => setTelefone(formatTelefone(e.target.value))}
          onPaste={e => {
            e.preventDefault();
            const pasted = e.clipboardData.getData('Text');
            setTelefone(formatTelefone(pasted));
          }}
          placeholder="(11)91234-5678"
          maxLength={15}
          required
        />
      </div>
      <ClientFormButton type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Cadastrar'}</ClientFormButton>
    </ClientFormContainer>
  );
};

export default ClientForm;

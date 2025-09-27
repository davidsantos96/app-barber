import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageBg, HeaderBar, HeaderContent, BackButton, HeaderTitle, MainContent, Form, FormGroup, Label, Input, Footer, SaveButton } from './NovoClientePage.style';
import { useData } from '../../../contexts';

const NovoClientePage: React.FC = () => {
  const navigate = useNavigate();
  const { createCliente, refreshClientes } = useData();
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [telefone, setTelefone] = useState('');

  // Função para formatar telefone (formato (99)99999-9999)
  function formatTelefone(value: string) {
    const nums = value.replace(/\D/g, '');
    if (nums.length === 0) return '';
    if (nums.length < 3) return `(${nums}`; // (
    if (nums.length < 7) return `(${nums.slice(0,2)})${nums.slice(2)}`; // (11)9...
    if (nums.length < 11) { // pode ser fixo (4) ou celular (5) ainda digitando
      return `(${nums.slice(0,2)})${nums.slice(2, nums.length)}`;
    }
    // nums.length >= 11
    // Decide se é formato 4+4 ou 5+4 para separar
    const corpo = nums.slice(2);
    if (corpo.length === 9) { // 5 + 4 (celular)
      return `(${nums.slice(0,2)})${corpo.slice(0,5)}-${corpo.slice(5,9)}`;
    }
    // fallback para 4 + 4 (fixo) quando tem 8
    return `(${nums.slice(0,2)})${corpo.slice(0,4)}-${corpo.slice(4,8)}`;
  }
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !telefone.trim()) {
      alert('Nome e telefone são obrigatórios');
      return;
    }
    const telefoneRegex = /^\(\d{2}\)\d{4,5}-\d{4}$/;
    if (!telefoneRegex.test(telefone)) {
      alert('Telefone inválido. Use (11)91234-5678 ou (11)1234-5678');
      return;
    }
    setLoading(true);
    try {
      await createCliente({ nome, apelido, telefone });
      // Garante que lista será atualizada (caso outro estado dependa)
      await refreshClientes();
      navigate('/clientes');
    } catch (err: any) {
      console.error('[NOVO CLIENTE] Erro ao salvar:', err);
      alert(err.response?.data?.error || err.message || 'Erro ao salvar cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageBg>
      <HeaderBar>
        <HeaderContent>
          <BackButton onClick={() => navigate(-1)}>
            &#8592;
          </BackButton>
          <HeaderTitle>Novo Cliente</HeaderTitle>
          <div style={{ width: 32 }} />
        </HeaderContent>
      </HeaderBar>
      <MainContent>
  <Form id="novo-cliente-form" onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              name="nome"
              type="text"
              placeholder="Digite o nome completo"
              value={nome}
              onChange={e => setNome(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="apelido">Apelido</Label>
            <Input
              id="apelido"
              name="apelido"
              type="text"
              placeholder="Digite o apelido"
              value={apelido}
              onChange={e => setApelido(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              name="telefone"
              type="tel"
              inputMode="tel"
              placeholder="(11)91234-5678"
              value={telefone}
              maxLength={15}
              autoComplete="tel"
              onChange={e => setTelefone(formatTelefone(e.target.value))}
              onPaste={e => {
                e.preventDefault();
                const pasted = e.clipboardData.getData('Text');
                setTelefone(formatTelefone(pasted));
              }}
              required
            />
          </FormGroup>
        </Form>
      </MainContent>
      <Footer>
        <SaveButton type="submit" form="novo-cliente-form">
          {loading ? 'Salvando...' : 'Salvar Cliente'}
        </SaveButton>
      </Footer>
    </PageBg>
  );
};

export default NovoClientePage;

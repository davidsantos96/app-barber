import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  PageBg,
  HeaderBar,
  HeaderContent,
  BackButton,
  HeaderTitle,
  MainContent,
  Form,
  FormGroup,
  Label,
  Input,
  Footer,
  SaveButton
} from './NovoClientePage.style';

const NovoClientePage: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [telefone, setTelefone] = useState('');

  // Função para formatar telefone (formato (99)99999-9999)
  function formatTelefone(value: string) {
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
      alert('Nome e telefone são obrigatórios');
      return;
    }
    setLoading(true);
    try {
      await axios.post('https://app-barber-hmm9.onrender.com/clientes', {
        nome,
        apelido,
        telefone
      });
      navigate('/clientes');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao salvar cliente');
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
        <Form onSubmit={handleSubmit}>
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
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Digite o telefone"
              value={telefone}
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
        <SaveButton type="submit" form="">
          {loading ? 'Salvando...' : 'Salvar Cliente'}
        </SaveButton>
      </Footer>
    </PageBg>
  );
};

export default NovoClientePage;

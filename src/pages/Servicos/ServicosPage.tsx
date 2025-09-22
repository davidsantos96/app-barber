import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageBg,
  HeaderBar,
  HeaderTitle,
  BackButton,
  MainContent,
  ServicoList,
  ServicoCard,
  ServicoInfo,
  ServicoNome,
  ServicoPreco,
  EditButton,
  Footer,
  AddButton
} from './ServicosPage.style';
import { FiEdit2, FiPlus } from 'react-icons/fi';
import axios from 'axios';

const ServicosPage: React.FC = () => {
  const navigate = useNavigate();
  const [servicos, setServicos] = useState<Array<{ id: string, nome: string, preco: number }>>([
    { id: '1', nome: 'Corte de Cabelo', preco: 30 },
    { id: '2', nome: 'Barba', preco: 20 },
    { id: '3', nome: 'Corte e Barba', preco: 45 },
    { id: '4', nome: 'Pezinho', preco: 15 },
  ]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newNome, setNewNome] = useState('');
  const [newPreco, setNewPreco] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editNome, setEditNome] = useState<string>('');
  const [editPreco, setEditPreco] = useState<string>('');

  useEffect(() => {
    axios.get('https://app-barber-hmm9.onrender.com/servicos')
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setServicos(res.data);
        }
      })
      .catch(() => {
        // Mantém os serviços fixos se a API falhar
      });
  }, []);

  return (
    <PageBg>
      <HeaderBar>
        <BackButton onClick={() => navigate(-1)}>
          &#8592;
        </BackButton>
        <HeaderTitle>Serviços</HeaderTitle>
      </HeaderBar>
      <MainContent>
        <ServicoList>
          {servicos.map(servico => (
            <ServicoCard key={servico.id}>
              <ServicoInfo>
                {editId === servico.id ? (
                  <>
                    <input
                      type="text"
                      value={editNome}
                      onChange={e => setEditNome(e.target.value)}
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        marginBottom: '0.3rem',
                        borderRadius: '0.3rem',
                        border: '1px solid #333',
                        padding: '0.2rem 0.5rem',
                        background: '#181818',
                        color: '#fff',
                        width: '100%'
                      }}
                    />
                    <input
                      type="text"
                      value={editPreco}
                      onChange={e => {
                        // Permite apenas números e vírgula
                        const val = e.target.value.replace(/[^0-9,]/g, '');
                        setEditPreco(val);
                      }}
                      style={{
                        fontSize: '1.08rem',
                        fontWeight: 500,
                        color: '#FFD700',
                        borderRadius: '0.3rem',
                        border: '1px solid #333',
                        padding: '0.2rem 0.5rem',
                        background: '#181818',
                        width: '100%'
                      }}
                    />
                  </>
                ) : (
                  <>
                    <ServicoNome>{servico.nome}</ServicoNome>
                    <ServicoPreco>R$ {servico.preco.toFixed(2).replace('.', ',')}</ServicoPreco>
                  </>
                )}
              </ServicoInfo>
              {editId === servico.id ? (
                <EditButton
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const updated = { nome: editNome, preco: Number(editPreco.replace(',', '.')) };
                      await axios.put(`https://app-barber-hmm9.onrender.com/servicos/${servico.id}`, updated);
                      setServicos(servicos.map(s =>
                        s.id === servico.id
                          ? { ...s, ...updated }
                          : s
                      ));
                      setEditId(null);
                    } catch (err) {
                      alert('Erro ao salvar serviço.');
                    }
                    setLoading(false);
                  }}
                  title="Salvar"
                  disabled={loading}
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </EditButton>
              ) : (
                <EditButton
                  onClick={() => {
                    setEditId(servico.id);
                    setEditNome(servico.nome);
                    setEditPreco(servico.preco.toFixed(2).replace('.', ','));
                  }}
                  title="Editar"
                >
                  <FiEdit2 />
                </EditButton>
              )}
            </ServicoCard>
          ))}
        </ServicoList>
      </MainContent>
      <Footer>
        <AddButton onClick={() => setShowAddModal(true)}>
          <FiPlus size={24} /> Adicionar Serviço
        </AddButton>
      </Footer>
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              background: '#181818',
              borderRadius: '1rem',
              padding: '2rem',
              minWidth: '320px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.2rem'
            }}
          >
            <h2 style={{ color: '#fff', margin: 0, fontSize: '1.3rem', fontWeight: 700 }}>Novo Serviço</h2>
            <input
              type="text"
              placeholder="Nome do serviço"
              value={newNome}
              onChange={e => setNewNome(e.target.value)}
              style={{
                fontSize: '1.1rem',
                fontWeight: 500,
                borderRadius: '0.3rem',
                border: '1px solid #333',
                padding: '0.5rem',
                background: '#232526',
                color: '#fff',
                width: '100%'
              }}
            />
            <input
              type="text"
              placeholder="Preço (ex: 30,00)"
              value={newPreco}
              onChange={e => {
                const val = e.target.value.replace(/[^0-9,]/g, '');
                setNewPreco(val);
              }}
              style={{
                fontSize: '1.1rem',
                fontWeight: 500,
                borderRadius: '0.3rem',
                border: '1px solid #333',
                padding: '0.5rem',
                background: '#232526',
                color: '#FFD700',
                width: '100%'
              }}
            />
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'none',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 500,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.3rem'
                }}
                disabled={addLoading}
              >Cancelar</button>
              <button
                onClick={async () => {
                  if (!newNome.trim() || !newPreco.trim()) {
                    alert('Preencha todos os campos.');
                    return;
                  }
                  setAddLoading(true);
                  try {
                    const novo = { nome: newNome, preco: Number(newPreco.replace(',', '.')) };
                    const res = await axios.post('https://app-barber-hmm9.onrender.com/servicos', novo);
                    setServicos([...servicos, res.data]);
                    setShowAddModal(false);
                    setNewNome('');
                    setNewPreco('');
                  } catch (err) {
                    alert('Erro ao adicionar serviço.');
                  }
                  setAddLoading(false);
                }}
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1rem',
                  padding: '0.5rem 1.2rem',
                  borderRadius: '0.3rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(37,99,235,0.18)'
                }}
                disabled={addLoading}
              >{addLoading ? 'Adicionando...' : 'Adicionar'}</button>
            </div>
          </div>
        </div>
      )}
    </PageBg>
  );
};

export default ServicosPage;

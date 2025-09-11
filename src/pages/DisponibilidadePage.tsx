

import React from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';

const diasSemana = [
  'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
];
const getHojeIndex = () => {
  const hoje = new Date().getDay();
  // 1=Segunda, 6=Sábado (0=Domingo não usado)
  return hoje === 0 ? 0 : hoje - 1;
};
const horariosFixos = Array.from({ length: 13 }, (_, i) => {
  const h = 8 + i;
  return `${h.toString().padStart(2, '0')}:00`;
});

const Container = styled.main`
  max-width: 800px;
  margin: 2rem auto;
  background: rgba(30, 30, 30, 0.95);
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
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const ListItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #333;
  color: #eee;
  @media (max-width: 600px) {
    font-size: 0.97rem;
    padding: 0.4rem 0;
  }
`;


import axios from 'axios';

const DisponibilidadePage: React.FC = () => {
  const [diaSelecionado, setDiaSelecionado] = React.useState(getHojeIndex());
  const [agendados, setAgendados] = React.useState<string[]>([]);

  React.useEffect(() => {
    // Buscar horários agendados futuros para o dia da semana selecionado
    const buscarAgendados = async () => {
      const hoje = new Date();
      const res = await axios.get('http://localhost:3001/agendamentos');
      // Filtrar agendamentos futuros do dia da semana selecionado
      const ags = res.data.filter((a: any) => {
        const dataAg = new Date(a.data + 'T00:00:00');
        return (
          a.status === 'confirmado' &&
          dataAg >= new Date(hoje.toISOString().slice(0, 10) + 'T00:00:00') &&
          dataAg.getDay() === diaSelecionado + 1 // +1 pois diasSemana começa em segunda
        );
      });
      setAgendados(ags.map((a: any) => a.horario));
    };
    buscarAgendados();
  }, [diaSelecionado]);

  return (
    <>
      <Navbar />
      <Container>
        <Title>Horários Disponíveis</Title>
        <SubTitle>Selecione o dia da semana</SubTitle>
        <select
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: 8,
            border: '1px solid #444',
            background: '#232526',
            color: '#fff',
            fontSize: '1rem',
            marginBottom: '1.2rem',
          }}
          value={diaSelecionado}
          onChange={e => setDiaSelecionado(Number(e.target.value))}
        >
          {diasSemana.map((dia, idx) => (
            <option key={idx} value={idx}>{dia}</option>
          ))}
        </select>
        <List>
          <ListItem>
            {diasSemana[diaSelecionado]}:
            <select
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: 8,
                border: '1px solid #444',
                background: '#232526',
                color: '#fff',
                fontSize: '1rem',
                marginTop: '0.5rem',
              }}
              defaultValue=""
            >
              <option value="" disabled>Selecione um horário</option>
              {horariosFixos.map(h => (
                <option key={h} value={h} disabled={agendados.includes(h)}>
                  {h} {agendados.includes(h) ? '(Indisponível)' : ''}
                </option>
              ))}
            </select>
          </ListItem>
        </List>
      </Container>
    </>
  );
};

export default DisponibilidadePage;

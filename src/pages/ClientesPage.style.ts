
import styled from 'styled-components';


export const ModalBg = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.55);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBox = styled.form`
  background: #232526;
  border-radius: 12px;
  padding: 2rem;
  min-width: 320px;
  color: #fff;
  box-shadow: 0 2px 16px rgba(0,0,0,0.25);
`;

export const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1.2rem;
  font-size: 1.2rem;
`;

export const ModalInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #444;
  background: #232526;
  color: #fff;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

export const ModalButton = styled.button`
  background: #FFD700;
  color: #232526;
  border: 2px solid #1e90ff;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #ffe066;
  }
`;

export const ModalCancelButton = styled.button`
  background: #444;
  color: #fff;
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  border: none;
  cursor: pointer;
`;
export const EditButton = styled.button`
  background: #FFD700;
  color: #232526;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  transition: background 0.2s;
  width: 100px;
  &:hover {
    background: #ffe066;
  }
  @media (max-width: 600px) {
    width: 100%;
    margin-top: 0.5rem;
    margin-right: 0;
    font-size: 0.97rem;
    border-radius: 7px;
  }
`;
export const SubTitle = styled.h3`
  font-size: 1.2rem;
  margin-top: 2rem;
  color: #ccc;
`;

export const ClientesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ClienteItem = styled.li`
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

export const AgendarButton = styled.button`
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


export const ClientesContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  background: #232526;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 2rem;
  color: #fff;
`;

export const ClientesTitle = styled.h2`
  font-size: 1.7rem;
  margin-bottom: 1.2rem;
`;

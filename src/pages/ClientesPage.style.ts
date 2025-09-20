export const ClientesContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background: #191919;
  border-radius: 18px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  padding: 1.2rem;
  position: relative;
`;

export const ClientesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 1.2rem;
`;

export const ClienteItemStyled = styled.div`
  display: flex;
  align-items: center;
  background: #232526;
  border-radius: 14px;
  padding: 1.1rem 1.2rem;
  cursor: pointer;
  transition: background 0.18s;
  &:hover {
    background: #2c2c2c;
  }
`;
export const PageBg = styled.div`
  min-height: 100vh;
  background: #000;
  position: relative;
`;

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.2rem 0 1.2rem 0;
  position: relative;
`;

export const HeaderTitle = styled.h1`
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin: 0;
`;

export const BackButton = styled.button`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;

export const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #191919;
  border-radius: 16px;
  padding: 0.7rem 1.2rem;
  margin: 0 1.2rem 1.2rem 1.2rem;
`;

export const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.1rem;
  flex: 1;
  outline: none;
  &::placeholder {
    color: #888;
    font-size: 1.1rem;
  }
`;

export const Avatar = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 1.2rem;
  background: #222;
`;

export const ClienteInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ClienteNome = styled.span`
  color: #fff;
  font-size: 1.18rem;
  font-weight: 700;
`;

export const ClienteTelefone = styled.span`
  color: #888;
  font-size: 1.05rem;
  margin-top: 2px;
`;

export const Chevron = styled.div`
  margin-left: 1.2rem;
  display: flex;
  align-items: center;
`;

export const FloatingButton = styled.button`
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #FFD700;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  cursor: pointer;
  z-index: 2000;
`;

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

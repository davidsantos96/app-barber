import styled from 'styled-components';

export const ClientFormContainer = styled.form`
  background: #232526;
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  max-width: 400px;
  margin: 2rem auto;
`;

export const ClientFormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

export const ClientFormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: var(--border-radius);
  border: 1px solid #444;
  background: #232526;
  color: #fff;
`;

export const ClientFormSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: var(--border-radius);
  border: 1px solid #ccc;
`;

export const ClientFormButton = styled.button`
  background: rgba(8, 123, 231, 0.93);
  border: 2px solid #0362c0ff;
  color: rgba(255, 255, 255, 1);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 0.5rem;
  transition: background 0.2s;
  opacity: 1;
  &:hover {
    background: #1565c0;
    opacity: 1;
  }
  &:disabled {
    background: #444;
    color: #bbb;
    cursor: not-allowed;
    opacity: 1;
  }
`;

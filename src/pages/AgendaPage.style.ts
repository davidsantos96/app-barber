
export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
`;

export const Field = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1.2rem;
`;

export const Label = styled.label`
	color: #fff;
	font-size: 1rem;
	margin-bottom: 0.5rem;
`;

export const ErrorMsg = styled.span`
	color: #ef4444;
	font-size: 0.98rem;
	margin-top: 0.3rem;
`;

export const SuccessMsg = styled.span`
	color: #22c55e;
	font-size: 0.98rem;
	margin-top: 0.3rem;
`;

export const Footer = styled.footer`
	padding: 1.2rem;
	text-align: center;
	color: #aaa;
	font-size: 0.95rem;
`;
export const Button = styled.button`
	background: #434343;
	color: #fff;
	border: none;
	padding: 0.75rem 1.5rem;
	border-radius: 8px;
	cursor: pointer;
	font-weight: 600;
	font-size: 1rem;
	margin-top: 0.5rem;
`;
export const ClienteSuggestions = styled.ul`
	position: absolute;
	top: 110%;
	left: 0;
	right: 0;
	background: #232526;
	border-radius: 0.75rem;
	box-shadow: 0 2px 8px rgba(0,0,0,0.12);
	z-index: 10;
	max-height: 180px;
	overflow-y: auto;
	margin: 0;
	padding: 0.3rem 0;
	list-style: none;
`;

export const ClienteSuggestionItem = styled.li<{ $selected?: boolean }>`
	padding: 0.7rem 1.2rem;
	cursor: pointer;
	color: #fff;
	border-bottom: 1px solid #333;
	background: ${({ $selected }) => $selected ? '#3B82F6' : 'transparent'};
	transition: background 0.18s;
	&:hover {
		background: #2c2c2c;
	}
`;

export const ClienteSuggestionEmpty = styled.li`
	padding: 0.7rem 1.2rem;
	color: #aaa;
`;
import styled from 'styled-components';

export const FormCard = styled.div`
	background: #232526;
	border-radius: 24px;
	max-width: 420px;
	margin: 3.5rem auto 0 auto;
	padding: 2.2rem 1.2rem 6.5rem 1.2rem;
	box-shadow: 0 2px 16px rgba(0,0,0,0.18);
	display: flex;
	flex-direction: column;
	gap: 1.6rem;
`;

export const FieldGroup = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	margin-bottom: 1.6rem;
	background: #000;
	border: 2px solid #4B5563;
	border-radius: 16px;
	box-sizing: border-box;
	min-height: 56px;
`;

export const IconLeft = styled.span`
	display: flex;
	align-items: center;
	position: absolute;
	left: 18px;
	top: 50%;
	transform: translateY(-50%);
	color: #9CA3AF;
	font-size: 1.7rem;
`;

export const Input = styled.input`
	width: 100%;
	background: #000;
	border: none;
	color: #fff;
	font-size: 1.13rem;
	padding: 1.1rem 1.2rem 1.1rem 2.8rem;
	border-radius: 16px;
	outline: none;
	&::placeholder {
		color: #6c6c6c;
		font-size: 1.13rem;
	}
`;

export const Select = styled.select`
	width: 100%;
	background: #000;
	border: none;
	color: #fff;
	font-size: 1.13rem;
	padding: 1.1rem 1.2rem 1.1rem 2.8rem;
	border-radius: 16px;
	outline: none;
	appearance: none;
	&::placeholder {
		color: #6c6c6c;
		font-size: 1.13rem;
	}
`;

export const AgendarButton = styled.button`
	width: 100%;
	height: 48px;
	background: #3B82F6;
	color: #fff;
	border: none;
	border-radius: 12px;
	font-weight: 700;
	font-size: 1.18rem;
	margin-top: 2.2rem;
	margin-bottom: 1.2rem;
	box-shadow: 0 2px 8px rgba(0,0,0,0.12);
	transition: background 0.2s;
	&:hover {
		background: #357ae8;
	}
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;

export const PageBg = styled.div`
  min-height: 100vh;
  background: #000;
  color: #fff;
  font-family: 'Manrope', sans-serif;
  display: flex;
  flex-direction: column;
`;

export const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  padding: 1.2rem 1rem 1.2rem 1rem;
  border-bottom: 1px solid #232526;
`;

export const HeaderTitle = styled.h1`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  flex: 1;
`;

export const MainContent = styled.main`
  flex-grow: 1;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
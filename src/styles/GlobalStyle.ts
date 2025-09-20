import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: 'Manrope', Arial, sans-serif;
    background: #121212;
    color: #e5e7eb;
    position: relative;
    overflow-x: hidden;
  }
  /* Removido logo/background do body */
`;

export default GlobalStyle;

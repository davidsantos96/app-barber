import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(135deg, #232526 0%, #414345 100%);
    color: #f5f5f5;
    position: relative;
    overflow-x: hidden;
  }
  body::before {
    content: '';
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60vw;
    max-width: 500px;
    height: 60vw;
    max-height: 500px;
    background: url('/logo1.png') no-repeat center center;
    background-size: contain;
    opacity: 0.20;
    z-index: 0;
    pointer-events: none;
  }
`;

export default GlobalStyle;

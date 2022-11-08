import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Pretendard'; 
    font-weight: 400;
    -webkit-font-smoothing: antialiased;

    @font-face { 
      font-family: 'Pretendard'; 
      font-weight: 400; 
      src: local("fonts/Pretendard/Pretendard-Regular.woff2") 
    }
    @font-face { 
      font-family: 'Pretendard'; 
      font-weight: 500; 
      src: local("fonts/Pretendard/Pretendard-Medium.woff2") 
    }
    @font-face { 
      font-family: 'Pretendard'; 
      font-weight: 600; 
      src: local("fonts/Pretendard/Pretendard-SemiBold.woff2") 
    }
  }
  a, a:link, a:visited, a:hover, a:active {
    color: #000;
    text-decoration: none;
  }
`;

export default GlobalStyle;

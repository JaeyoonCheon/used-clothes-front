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
      font-weight: 300; 
      src: local("fonts/Pretendard/Pretendard-light.woff2") 
    }
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
    color: inherit;
    text-decoration: none;
  }
  ul{
    all: unset;
  }
  li {
    all:unset;
    display:inline-block
  }
  textarea {
    all:unset;
  }
  input {
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;

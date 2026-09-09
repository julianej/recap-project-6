import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #f2f2f2;
    font-family: Arial, sans-serif;
    background-repeat: repeat;
    background-size: 600px 300px;
  }
`;
export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
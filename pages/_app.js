import { createGlobalStyle } from "styled-components";
import { SWRConfig } from 'swr';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color: #f2f2f2;
    font-family: Arial, sans-serif;
    background-repeat: repeat;
    background-size: 600px 300px;
  }
`;

// ====================
// FETCHER FUNCTION for useSWR
// ====================

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
};


export default function App({ Component, pageProps }) {

     return (
    <SWRConfig 
      value={{
        fetcher: fetcher
      }}
    >
      <GlobalStyle />
      <Component {...pageProps} />
    </SWRConfig>
)}
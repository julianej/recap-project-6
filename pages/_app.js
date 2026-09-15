import { GlobalStyle } from "../styles";
import { SWRConfig } from 'swr';

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
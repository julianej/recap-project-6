import useSWR from "swr";
import styled from "styled-components";
import TransactionForm from "../components/TransactionForm/TransactionForm";
import TransactionList from "../components/TransactionList/TransactionList";



const Main = styled.main`
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 40px;
  text-transform: uppercase;
  margin-bottom: 30px;
`;


const fetcher = (url) =>
  fetch(url).then((response) => response.json());

  
export default function HomePage() {
  const { data, error, isLoading } = useSWR(
    "/api/transactions",
    fetcher
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load transactions.</p>;
  }

  return (
    <Main>
      <Title>Money Manager</Title>

      {/* "Create" new transaction */}
      <TransactionForm />

      {/* "Edit" existing transaction */}
      <TransactionList transactions={data} />
    </Main>
  );
}

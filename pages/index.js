import useSWR from "swr";
import { useState } from "react";
import styled from "styled-components";
import TransactionForm from "../components/TransactionForm/TransactionForm";
import TransactionList from "../components/TransactionList/TransactionList";

// ====================
// STYLES
// ====================

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

// ====================
// FETCHER in APP
// ====================

// const fetcher = (url) =>
//   fetch(url).then((response) => response.json());


// ====================
// COMPONENT
// ====================

export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, error, isLoading } = useSWR(
    "/api/transactions"
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load transactions.</p>;
  }

  return (
    <Main>
      <Title>Julianes Money Manager</Title>

      {/* "Create" new transaction */}
      <button onClick={() => setIsFormOpen(!isFormOpen)}>
        {isFormOpen ? "Close" : "Add transaction"}
      </button>

      {isFormOpen && (
        <TransactionForm
          onCancel={() => setIsFormOpen(false)}
        />
      )}


      {/* "Edit" existing transaction */}
      <TransactionList transactions={data} />
    </Main>
  );
}

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

const AddButton = styled.button`
  background: white;
  width: 100%;
  text-align: left;
  padding: 0.7rem 0.7rem 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid lightgray;
  color: #0d0d0d ;
  cursor: pointer;
  font-size: 16px;
  position: relative;

  svg {
    position: absolute;
    right: 1rem;
  }
`;


// ====================
// COMPONENT
// ====================

export default function HomePage() {
// CREATE TRANSACTIOn is closed by default
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, error, isLoading, mutate } = useSWR(
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
      <Title>Julis Money Manager</Title>

      {/* "Create" new transaction */}
      <AddButton onClick={() => setIsFormOpen(!isFormOpen)}>
      {isFormOpen ? (
        <>
          Close Transaction Form

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </>
      ) : (
        <>
          Add transaction

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19M5 12H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </>
      )}
    </AddButton>
      {isFormOpen && (
        <TransactionForm
          onCancel={() => setIsFormOpen(false)}
        />
      )}


      {/* "Edit" existing transaction */}
      <TransactionList
        transactions={data} 
        mutate={mutate}/>
    </Main>
  );
}

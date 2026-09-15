import useSWR from "swr";
import { useState } from "react";
import styled, { keyframes }  from "styled-components";
import Filter from "../components/Filter/Filter";
import AccountBalance from "../components/AccountBalance/AccountBalance";
import TransactionForm from "../components/TransactionForm/TransactionForm";
import TransactionList from "../components/TransactionList/TransactionList";

// ====================
// STYLES
// ====================


const slideUp = keyframes`
  from {
    transform: translate(-50%, 100%);
    opacity: 0;
  }

  to {
    transform: translate(-50%, 0);
    opacity: 1;
  }
`;

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
  margin-bottom: 2rem;

  svg {
    position: absolute;
    right: 1rem;
  }
`;


const Toast = styled.div`
  position: fixed;
  top: 2rem;
  left: 0;
  right: 0;

  width: fit-content;
  margin: 0 auto;

  z-index: 9999;

  padding: 0.75rem 1.5rem;
  border-radius: 8px;

  background: black;
  color: white;
`;



// ====================
// COMPONENT
// ====================

 export default function HomePage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState("");

  // FILTER STATE
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // SWR
  const { data, error, isLoading, mutate } = useSWR(
    "/api/transactions"
  );

  // FILTER BY YEAR + TYPE
  const transactionsForCategoryFilter = data?.filter((transaction) => {
    const matchesYear =
      selectedYear === "all" ||
      new Date(transaction.date).getFullYear() === Number(selectedYear);

    const matchesType =
      selectedType === "all" ||
      transaction.type === selectedType;

    return matchesYear && matchesType;
  });

  // AVAILABLE CATEGORIES
  const availableCategories = [
    ...new Set(
      transactionsForCategoryFilter?.map(
        (transaction) => transaction.category
      )
    ),
  ];

  // FILTER BY CATEGORY
  // const transactionsForCategoryFilter = data?.filter(...)
  const filteredTransactions = transactionsForCategoryFilter?.filter(
    (transaction) =>
      selectedCategory === "all" ||
      transaction.category === selectedCategory
  );

  // LOADING
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // ERROR
  if (error) {
    return (
      <div>
        <p>Failed to load transactions.</p>

        <PrimaryButton
          type="button"
          buttonText="Try again"
          onClick={mutate}
        />
      </div>
    );
  }

  // TOAST
  function showToast(message) {
    setMessage(message);

    setTimeout(() => {
      setMessage("");
    }, 2000);
  }

  return (
    <Main>

      {message && <Toast>{message}</Toast>}

      <Title>Money Manager</Title>

      <Filter
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        availableCategories={availableCategories}
      />

      <AccountBalance transactions={data} />

      <AddButton
        onClick={() => setIsFormOpen((isOpen) => !isOpen)}
      >
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
          showToast={showToast}
        />
      )}

      <TransactionList
        transactions={filteredTransactions}
        mutate={mutate}
        showToast={showToast}
      />

    </Main>
  );
}
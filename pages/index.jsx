import useSWR from "swr";
import { useState } from "react";
import { X, Plus } from "lucide-react";
import styled, { keyframes }  from "styled-components";
import { BankSidebar } from "../components/BankSidebar/BankSidebar";
import TransactionFilter from "../components/TransactionFilter/TransactionFilter";
import AccountBalance from "../components/AccountBalance/AccountBalance";
import TransactionForm from "../components/TransactionForm/TransactionForm";
import TransactionList from "../components/TransactionList/TransactionList";

// ====================
// STYLES
// ====================

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 740px) {
   grid-template-columns: 1fr 4fr;
  }
`;

const MainContent = styled.div`
  width: 100%;
  padding: 40px 20px;
  margin: 0 auto;
   @media (min-width: 740px) {
   width: 70%;
  }
`;

const SidebarWrapper = styled.aside`
  padding: 3rem 2rem;
  border-right: 2px solid black;
`;

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

const Title = styled.h1`
  font-size: 40px;
  text-transform: uppercase;
  margin-bottom: 30px;
`;


const PrimaryButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background: #000;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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


const BankAccountForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1.5rem;

  border: 2px solid #000;
  border-radius: 16px;
  background: #fff;
`;


// ====================
// COMPONENT
// ====================

  
export default function HomePage() {
  const [isBankFormOpen, setIsBankFormOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setSuccessMessage] = useState("");

  // SWR HOOK Destructoring
  const { data, error, isLoading, mutate } = useSWR(
    "/api/transactions"
  );

  // FILTER 
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredTransactions = data?.filter(matchesFilter);

  // FILTER YEAR & TYPE
  function matchesFilter(transaction) {
      //// checks SWR data "2025-08-20"
    const transactionYear = new Date(transaction.date)
    .getFullYear()
    .toString();

   const matchesYear =
          //true || anything → true
          selectedYear === "all" || 
          //// checks SWR data "2025-08-20"
           transactionYear === selectedYear;

  const matchesType =
        selectedType === "all" ||
        //// checks SWR data
        transaction.type === selectedType;

  const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(transaction.category);

  return matchesYear && matchesType && matchesCategory;
};

  // LOADING
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Failed to load transactions.</p>

        {/* ANONYME WRAPPER FUNCTION onClick={(e)*/}
        <PrimaryButton type="button" onClick={() => mutate()}> 
          Try again
        </PrimaryButton>
      </div>
    );
  }

  // TOAST 
    function showToast(message) {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  }

  return (
    <Main>

      {message && <Toast>{message}</Toast>}
        <SidebarWrapper>
         <BankSidebar
              onAddAccount={() => setIsBankFormOpen(true)}
            />

        </SidebarWrapper>

      <MainContent>
        <Title> Deutsche Bank <br></br>Girokonto</Title>
     {isBankFormOpen && (
        <BankAccountForm
            onCancel={() => setIsBankFormOpen(false)}
          />
        )}

      <TransactionFilter
        transactions={data ?? []}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      <AccountBalance transactions={data} />

      {/* "Create" new transaction */}
     <AddButton onClick={() => setIsFormOpen((isOpen) => !isOpen)}>
      
      {isFormOpen ? (
        <>
          Close Transaction Form
          <X />
        </>
      ) : (
        <>
          Add Transaction
          <Plus />
        </>
      )}
    </AddButton>

      {isFormOpen && (
        <TransactionForm
          onCancel={() => setIsFormOpen(false)}
          showToast={showToast}
        />
      )}

      {/* "Edit" and "Delete" existing transaction */}
      <TransactionList
           transactions={filteredTransactions}
          mutate={mutate}
          showToast={showToast}
        />
        </MainContent>

    </Main>
  );
}
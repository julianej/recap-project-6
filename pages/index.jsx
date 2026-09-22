import useSWR from "swr";
import { useState } from "react";
import { X, Plus } from "lucide-react";
import styled, { keyframes }  from "styled-components";
import { BankSidebar } from "../components/BankSidebar/BankSidebar";
import BankAccountForm from "../components/BankSidebar/BankAccountForm";
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

const BankAccountFormWrapper = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    left: 20%;
    top: 0%;
    z-index: 77;
    height: 100vh;
`;

// ====================
// COMPONENT
// ====================

 export default function HomePage() {
const [selectedAccount, setSelectedAccount] = useState(1);
const [isBankFormOpen, setIsBankFormOpen] = useState(false);

function handleAccountSelect(accountId) {
  setSelectedAccount(accountId);
  setIsBankFormOpen(false);
}

function handleAddAccount() {
  setIsBankFormOpen(true);
}

  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setSuccessMessage] = useState("");

  const { data, error, isLoading, mutate } = useSWR(
    selectedAccount
      ? `/api/transactions?account=${selectedAccount}`
      : null
  );

  const matchesFilter = (transaction) => {
    const transactionYear = new Date(transaction.date)
      .getFullYear()
      .toString();

    const matchesYear =
      selectedYear === "all" ||
      transactionYear === selectedYear;

    const matchesType =
      selectedType === "all" ||
      transaction.type === selectedType;

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(transaction.category);

    return (
      matchesYear &&
      matchesType &&
      matchesCategory
    );
  };

  const filteredTransactions =
    data?.filter(matchesFilter) ?? [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Failed to load transactions.</p>

        <PrimaryButton
          type="button"
          onClick={() => mutate()}
        >
          Try again
        </PrimaryButton>
      </div>
    );
  }

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
          selectedAccount={selectedAccount}
          setSelectedAccount={handleAccountSelect}
          onAddAccount={handleAddAccount}
          isBankFormOpen={isBankFormOpen}
        />
      </SidebarWrapper>


 <MainContent>
{/* BANK ACCOUNT FORM */}

  {isBankFormOpen && (
    <BankAccountFormWrapper>
          <BankAccountForm
            onCancel={() => setIsBankFormOpen(false)}
            mutate={mutate}
          />
    </BankAccountFormWrapper>
        )}



          <Title>
            Deutsche Bank <br />
            Girokonto
          </Title>

          <TransactionFilter
            transactions={data ?? []}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />

          <AccountBalance
            transactions={filteredTransactions}
          />

          <AddButton
            onClick={() =>
              setIsFormOpen((isOpen) => !isOpen)
            }
          >
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

          <TransactionList
            transactions={filteredTransactions}
            mutate={mutate}
            showToast={showToast}
          />

        </MainContent>

      {/* )} */}

    </Main>
  );
}
import useSWR from "swr";
import { useState } from "react";
import Link from "next/link";
// ...your existing imports

import { X, Plus, Menu } from "lucide-react";
import styled, { keyframes }  from "styled-components";
import { Loading, Spinner } from "@/styles/LoadingStyles";
import { MenuButton,} from "@/styles/ButtonStyles";
import FloatingNavigation from "@/components/FloatingNavigation/FloatingNavigation";


import BankSideBar from "@/components/BankSideBar/BankSideBar";
import BankAccountForm from "@/components/BankSideBar/BankAccountForm";
import AccountBalance from "@/components/AccountBalance/AccountBalance";
import TransactionForm from "@/components/TransactionForm/TransactionForm";
import TransactionList from "@/components/TransactionList/TransactionList";

import TransactionFilter from "@/components/TransactionFilter/TransactionFilter";

// ====================
// STYLES
// ====================


const Main = styled.main`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 740px) {
   flex-direction: row;
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

const MenuProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 250px;
    border: 2px solid black;
    background-color: white;
    margin-bottom: 2rem;
    border-radius: 1rem;
    /* position: fixed; */
    margin-bottom: 2rem;
    @media (min-width: 740px) {
   width: 100%;
   height: 63px;
  }
`;

const SidebarWrapper = styled.aside`
  padding: 1.5rem 2rem;
  width: 100%;
  border-right: 2px solid black;
`;

const Welcome = styled.div`
  max-width: 600px;
  padding: 4rem 0;

    background: white;
    border: 2px solid black;
    border-radius: 1rem;
    min-width: 100%;
    padding: 2rem;
    @media (min-width: 740px) {
    top: 4%;
    padding: 5rem;
    position: relative;}

  h1 {
     @media (min-width: 740px) {
    font-size: 40px;}
    font-size: 1rem;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 1rem;
  }
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


export default function Dashboard() {
  // ====================
  // STATE
  // ====================
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isBankFormOpen, setIsBankFormOpen] = useState(false);

  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setSuccessMessage] = useState("");

  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);


  // ====================
  // DATA
  // ====================

  const {
    data: accounts = [],
    mutate: mutateAccounts,
  } = useSWR("/api/bankaccounts");

  const { data, error, isLoading, mutate } = useSWR(
    selectedAccount
      ? `/api/transactions?account=${selectedAccount}`
      : null
  );


  // ====================
  // ACCOUNT
  // ====================

  function handleAccountSelect(accountId) {
    setSelectedAccount(accountId);
    setIsBankFormOpen(false);
    setIsFormOpen(false);
  }

  function handleAddAccount() {
    setIsBankFormOpen(true);
  }

  async function handleDeleteAccount() {
  if (!selectedAccount) return;

  setIsDeletingAccount(true);

  try {
    const response = await fetch(
      `/api/bankaccounts/${selectedAccount}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return;
    }

    await mutateAccounts();

    setSelectedAccount(null);
    setIsFormOpen(false);

    showToast("Bank account deleted successfully.");
  } catch (error) {
    console.error(error);
  } finally {
    setIsDeletingAccount(false);
  }
}

  // ====================
  // FILTER
  // ====================

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


  const selectedAccountData = accounts.find(
  (account) => account._id === selectedAccount
);


  return (
    <Main>

      {message && <Toast>{message}</Toast>}

      <SidebarWrapper>
       <BankSideBar
          accounts={accounts}
          selectedAccount={selectedAccount}
          setSelectedAccount={handleAccountSelect}
          onAddAccount={handleAddAccount}
          isBankFormOpen={isBankFormOpen}
          isMenuOpen={isMenuOpen}
        />
      </SidebarWrapper>


   <MainContent>
        <FloatingNavigation
        onAddTransaction={() => setIsFormOpen(true)}
      />
      <MenuProfileWrapper>
        <p>Hallo Juliane</p>
      <MenuButton
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        > 
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MenuButton>
        </MenuProfileWrapper>
    {isAddingAccount || isDeletingAccount ? (
        <div>
          <p>
            {isAddingAccount
              ? "Adding bank account..."
              : "Deleting bank account..."}
          </p>

          <Spinner />
        </div>
      ) : selectedAccount ? (
    <>
      <Title>
        {selectedAccountData?.bank} <br />
        {selectedAccountData?.name}
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
        onClick={() => setIsFormOpen((isOpen) => !isOpen)}
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
          selectedAccount={selectedAccount}
          onCancel={() => setIsFormOpen(false)}
          showToast={showToast}
          mutate={mutate}
        />
      )}

      <TransactionList
        transactions={filteredTransactions}
        selectedAccount={selectedAccount}
        onDeleteAccount={handleDeleteAccount}
        mutate={mutate}
        showToast={showToast}
      />
    </>
  ) : (
      <Welcome>
        <h1>Welcome to Money Manager<br></br>

          Keep track of your finances, manage your bank accounts,
          and stay informed about your transactions.
        </h1>
        <p>
          Select a bank account from the sidebar to get started.
        </p>
      </Welcome>
    )}
  </MainContent>
      {/* BANK ACCOUNT FORM */}
      {isBankFormOpen && (
        <BankAccountFormWrapper>
          <BankAccountForm
            onCancel={() => setIsBankFormOpen(false)}
            mutate={mutateAccounts}
            setIsAddingAccount={setIsAddingAccount}
          />
        </BankAccountFormWrapper>
        )}

      {/* )} */}

    </Main>
  );
}
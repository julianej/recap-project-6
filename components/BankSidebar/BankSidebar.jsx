import styled from "styled-components";
import BankAccountCard from "../BankSideBar/BankAccountCard";
import { Plus } from "lucide-react";
import { useState } from "react";


const accounts = [
  {
    id: 1,
    name: "Girokonto",
    bank: "Deutsche Bank",
  },
  {
    id: 2,
    name: "Tagesgeld",
    bank: "ING",
  },
    {
    id: 3,
    name: "Business",
    bank: "N26",
  },
];

const BankSidebarWrapper = styled.aside`
 width: 100%;
    min-height: auto;
    padding: 1.5rem;
    border-right: 2px solid #000;
    /* background: #fff; */
    position: sticky;
    top: 0;
    align-self: start;
    left: 0;
    @media (min-width: 740px) {
       min-height: 100vh;
  }
`;

const SidebarTitle = styled.h2`
  margin: 0 0 1.5rem;
  font-size: 1.2rem;
`;

const Title = styled.h1`
  font-size: 40px;
  text-transform: uppercase;
  margin-bottom: 30px;
`;

const AccountList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const AddAccountButton = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.75rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid #000;
  border-radius: 8px;
  background: #fff;

  cursor: pointer;
`;

export function BankSidebar(onAddAccount) {
  const [selectedAccount, setSelectedAccount] = useState("Girokonto");

  return (
    <BankSidebarWrapper>
        <Title>Money Manager</Title>
      <SidebarTitle>Bank Accounts</SidebarTitle>

      <AccountList>
        {accounts.map((account) => (
          <BankAccountCard
            key={account.id}
            account={account}
            selected={selectedAccount === account.name}
            onClick={() => setSelectedAccount(account.name)}
          />
        ))}
      </AccountList>
      <AddAccountButton
        type="button"
        onClick={onAddAccount}
      >
        Add Bank Account
        <Plus size={18} />
      </AddAccountButton>
    </BankSidebarWrapper>
  );
}
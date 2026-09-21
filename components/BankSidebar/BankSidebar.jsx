import styled from "styled-components";
import BankAccountCard from "../BankSideBar/BankAccountCard";
import { Plus } from "lucide-react";
import { useState } from "react";


const accounts = [
  {
    id: 1,
    name: "Girokonto",
    bank: "Deutsche Bank",
    iban: "DE89 3704 0044 0532 0130 00",
    bic: "COBADEFFXXX",
  },
  {
    id: 2,
    name: "Tagesgeld",
    bank: "ING",
    iban: "DE12 3456 7890 1234 5678 90",
    bic: "INGDDEFFXXX",
  },
  {
    id: 3,
    name: "Business",
    bank: "N26",
    iban: "DE98 7654 3210 9876 5432 10",
    bic: "NTSBDEB1XXX",
  },
];

const BankSidebarWrapper = styled.aside`
    width: 100%;
    min-height: auto;
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

export function BankSidebar({ onAddAccount }) {
const [selectedAccount, setSelectedAccount] = useState(1);
  return (
    <BankSidebarWrapper>
        <Title>Money Manager</Title>
      <SidebarTitle>Bank Accounts</SidebarTitle>

      <AccountList>
        {accounts.map((account) => (
            <BankAccountCard
            key={account.id}
            account={account}
            selected={selectedAccount === account.id}
            onClick={() => setSelectedAccount(account.id)}
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
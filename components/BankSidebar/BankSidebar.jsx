import styled from "styled-components";
import BankAccountCard from "../BankSideBar/BankAccountCard";
import { Plus } from "lucide-react";
import { RefreshCw } from "lucide-react";
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

const SidebarSection = styled.section`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    /* background: #fff; */
    position: sticky;
    top: 0;
    align-self: start;
    left: 0;
    @media (min-width: 740px) {
       min-height: 90vh;
  }
`;

const SyncSection = styled.div`
  margin-top: auto;

  display: flex;
  flex-direction: column;
  gap: 0.35rem; 
`;

const SyncButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border: none;
  /* border-radius: 8px;
  background: #000;
  color: #fff; */

  font: inherit;
  font-weight: 500;

  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }

  &:active {
    transform: translateY(1px);
  }
`;

const SyncStatus = styled.span`
  font-size: 0.75rem;
  color: #666;
  text-align: center;
`;


export function BankSidebar({ onAddAccount }) {
const [selectedAccount, setSelectedAccount] = useState(1);
const [lastSyncedAt, setLastSyncedAt] = useState(null);

  return (
    <SidebarSection>
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

      <SyncSection>
        <SyncButton
            type="button"
            onClick={() => setLastSyncedAt(new Date())}
            >
            Synchronisieren
              <RefreshCw size={16} />
            </SyncButton>

            <SyncStatus>
            Zuletzt synchronisiert:{" "}
            {lastSyncedAt
                ? lastSyncedAt.toLocaleString("de-DE")
                : "Noch nie"}
            </SyncStatus>
        </SyncSection>
    </SidebarSection>
  );
}
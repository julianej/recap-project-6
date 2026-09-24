import styled from "styled-components";
import { Plus, RefreshCw } from "lucide-react";
import { useState } from "react";

import BankAccountCard from "./BankAccountCard";

const SidebarTitle = styled.h2`
  margin: 0 0 1.5rem;
  font-size: 1.2rem;
`;

const Title = styled.h1`
  font-family: "Silkscreen", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 4rem;
  text-transform: uppercase;

  margin: 0 0 2rem;

  line-height: 3rem;
`;

const AccountList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const AddBankAccountButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  width: 100%;
  margin-top: 1.5rem;
  padding: 0.75rem;

  border: 1px solid #000;
  border-radius: 8px;

  background: ${({ $selected }) => ($selected ? "#000" : "#fff")};
  color: ${({ $selected }) => ($selected ? "#fff" : "#000")};

  cursor: pointer;
`;

const SidebarSection = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 90vh;

  position: sticky;
  top: 0;
  align-self: start;

  padding: 2rem;

  background: #000;
  color: #fff;

  border-radius: 1rem;

  @media (min-width: 740px) {
    background: transparent;
    color: #000;
  }
`;

const SyncSection = styled.div`
  margin-top: auto;

  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const SyncButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  width: 100%;
  padding: 0.75rem 1rem;

  border: none;

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

export default function BankSideBar({
  accounts = [],
  selectedAccount,
  setSelectedAccount,
  onAddAccount,
  isBankFormOpen,
}) {
  const [lastSyncedAt, setLastSyncedAt] = useState(null);

  return (
    <SidebarSection>
      <Title>Money Manager</Title>

      <SidebarTitle>Bank Accounts</SidebarTitle>

      <AccountList>
        {accounts.map((account) => (
          <BankAccountCard
            key={account._id}
            account={account}
            selected={selectedAccount === account._id}
            disabled={isBankFormOpen}
            onClick={() => setSelectedAccount(account._id)}
          />
        ))}
      </AccountList>

      <AddBankAccountButton
        type="button"
        $selected={isBankFormOpen}
        onClick={onAddAccount}
      >
        <span>Add Bank Account</span>
        <Plus size={18} />
      </AddBankAccountButton>

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
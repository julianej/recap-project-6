import { useState } from "react";
import styled from "styled-components";
import TransactionCard from "../TransactionCard/TransactionCard";
import TransactionForm from "../TransactionForm/TransactionForm";

// ====================
// STYLES
// ====================

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${({ $isEditing }) =>
    $isEditing &&
    `
      border: 2px solid black;
      border-radius: 16px;
      padding: 1rem;
      background-color: #f0f0f0;
    `}
`;

const List = styled.section`
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;


// ====================
// COMPONENT
// ====================


export default function TransactionList({ transactions }) {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);

  function handleEdit(transaction) {
    setEditingTransaction(transaction);
  }

  function handleSave(id) {
  setEditingTransaction(null);

  setHighlightedId(id);

    setTimeout(() => {
      setHighlightedId(null);
    }, 1500);
  }

  function handleCancel() {
    setEditingTransaction(null);
  }

  return (
    <List>
      <h2>Transaction List</h2>

      {transactions.map((transaction) => (
        <CardWrapper
          key={transaction._id}
          $isEditing={editingTransaction?._id === transaction._id}
        >
          <TransactionCard
            transaction={transaction}
            onEdit={() => handleEdit(transaction)}
            isSelected={
              editingTransaction?._id === transaction._id
            }
            isHighlighted={
              highlightedId === transaction._id
            }
          />

          {editingTransaction?._id === transaction._id && (
            <TransactionForm
              transaction={editingTransaction}
              onCancel={handleCancel}
              onSave={handleSave}
            />
          )}
        </CardWrapper>
      ))}
    </List>
  );
}


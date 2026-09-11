import { useState } from "react";
import styled from "styled-components";
import TransactionCard from "../TransactionCard/TransactionCard";
import TransactionForm from "../TransactionForm/TransactionForm";
import DialogPopup from "../DialogPopup/DialogPopup";

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
  max-height: 90vh;
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
  const [deletingTransaction, setDeletingTransaction] = useState(null);

  // handle EDIT
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

  // handle DELETE
    function handleDeleteClick(transaction) {
      setDeletingTransaction(transaction);
    }

    function handleCancelDelete() {
      setDeletingTransaction(null);
    }

    function handleDelete(id) {
    console.log("Delete transaction:", id);
  }

   return (
  <>
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
            isSelected={editingTransaction?._id === transaction._id}
            isHighlighted={highlightedId === transaction._id}
            onDelete={() => handleDeleteClick(transaction)}
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

    {deletingTransaction && (
      <DialogPopup
        transaction={deletingTransaction}
        onCancel={handleCancelDelete}
        onDelete={() => handleDelete(deletingTransaction._id)}
      />
    )}
  </>
  )};
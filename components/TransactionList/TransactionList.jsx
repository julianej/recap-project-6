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
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;

  border-radius: 1rem;
  padding: 0 0.7rem 2rem;
  border: ${({ $isEmpty }) =>
    $isEmpty ? "none" : "2px solid #000"};
`;

const EmptyState = styled.p`
  text-align: center;
  padding: 40px 20px;
`;




// ====================
// COMPONENT
// ====================


export default function TransactionList({ transactions, mutate, showToast }) {
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);
  const [deletingTransactionPopup, setDeletingTransaction] = useState(null);
  const [deletingId, setDeletingId] = useState(null);


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

  function handleDeleteClick(transaction) {
    setDeletingTransaction(transaction);
  }

  function handleCancelDelete() {
    setDeletingTransaction(null);
  }

  async function handleConfirmDelete(id) {
  // 1. Close edit form
  setEditingTransaction(null);

  // 2. Close confirmation popup
  setDeletingTransaction(null);

  // 3. Show spinner on the card
  setDeletingId(id);

  try {
    const response = await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete transaction");
    }

    // Keep spinner visible
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // 4. Hide spinner
    setDeletingId(null);

    // 5. Refresh transactions
    await mutate();
  } catch (error) {
    console.error(error);
    setDeletingId(null);
  }
}

  return (
  <>
    <List>
      <h2>Your Transaction List</h2>

      {/* Empty State */}
      {transactions.length === 0 ? (
        <EmptyState>
          No transactions yet.
        </EmptyState>
      ) : (
        transactions.map((transaction) => (
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
              isDeleting={deletingId === transaction._id}
            />

            {editingTransaction?._id === transaction._id && (
              <TransactionForm
                transaction={editingTransaction}
                 onDelete={() => handleDeleteClick(transaction)}
                onCancel={handleCancel}
                onSave={handleSave}
                showToast={showToast}
              />
            )}
          </CardWrapper>
        ))
      )}
    </List>

    {deletingTransactionPopup && (
      <DialogPopup
        transaction={deletingTransactionPopup}
        onCancel={handleCancelDelete}
        onDelete={() => handleConfirmDelete(deletingTransactionPopup._id)}
      />
    )}
  </>
)};
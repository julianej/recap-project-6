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
  const [deletingTransaction, setDeletingTransaction] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // handle EDIT
  function handleEdit(transaction) {
    setEditingTransaction(transaction);
  }

  // handle editSAVE
  function handleSave(id) {
    setEditingTransaction(null);
    setHighlightedId(id);

    setTimeout(() => {
      setHighlightedId(null);
    }, 1500);
  }

  // handle CANCEL EDIT
  function handleCancel() {
    setEditingTransaction(null);
  }

  // handle DELETE button on TransactionCard
  function handleDeleteClick(transaction) {
    setDeletingTransaction(transaction);
  }

  // handle CANCEL in DialogPopup
  function handleCancelDelete() {
    setDeletingTransaction(null);
  }

  // handle DELETE in DialogPopup
async function handleDelete(id) {
  setDeletingTransaction(null);
  setDeletingId(id);

  try {
    const response = await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete transaction");
    }

    // Wait 1.2 seconds to load spinner
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Stop spinner
    setDeletingId(null);

    // Update transaction list
    await mutate();

    showToast("Transaction deleted successfully.");

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
                onCancel={handleCancel}
                onSave={handleSave}
                showToast={showToast}
              />
            )}
          </CardWrapper>
        ))
      )}
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
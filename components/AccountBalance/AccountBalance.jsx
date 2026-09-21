import styled from "styled-components";

const BalanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 1rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  border: 2px solid black;

  ${({ $positive }) =>
    $positive
      ? `
        color: black;
      `
      : `
        background: #ffebee;
        color: #c62828;
      `}
`;

const TotalBalance = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
`;


// ====================
// COMPONENT
// ====================

export default function AccountBalance({ transactions }) {
  const total = transactions.reduce((total, transaction) => {
    return total + transaction.amount;
  }, 0);

  return (
    <BalanceWrapper $positive={total >= 0}>
      <span>Account Balance:</span>
      <TotalBalance>{total.toFixed(2)} €</TotalBalance>
    </BalanceWrapper>
  );
}
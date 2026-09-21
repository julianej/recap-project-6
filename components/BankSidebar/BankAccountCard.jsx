import styled from "styled-components";

const AccountCard = styled.button`
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.35rem;

  border: 2px solid #000;
  border-radius: 12px;

  background: ${({ $selected }) =>
    $selected ? "#000" : "#fff"};

  color: ${({ $selected }) =>
    $selected ? "#fff" : "#000"};

  cursor: pointer;
  text-align: left;

  &:hover {
    background: ${({ $selected }) =>
      $selected ? "#000" : "#f5f5f5"};
  }
`;

export default function BankAccountCard({
  account,
  selected,
  onClick,
}) {
  return (
    <AccountCard
      type="button"
      $selected={selected}
      onClick={onClick}
    >
      <strong>{account.name}</strong>
      <span>{account.bank}</span>
    </AccountCard>
  );
}
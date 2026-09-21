import styled from "styled-components";

const AccountCard = styled.div`
  width: 100%;
  padding: 1rem;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  border: 2px solid #000;
  border-radius: 12px;

  background: ${({ $selected }) =>
    $selected ? "#000" : "#fff"};

  color: ${({ $selected }) =>
    $selected ? "#fff" : "#000"};

  cursor: pointer;
`;

const CardHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;


const AccountDetails = styled.div`
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.15rem;

  font-size: 0.8rem;

  span {
    opacity: 0.6;
  }

  strong {
    font-weight: 500;
  }
`;

export default function BankAccountCard({
  account,
  selected,
  onClick,
}) {
  return (
    <AccountCard
      $selected={selected}
      onClick={onClick}
    >
      <CardHeader>
        <strong>{account.name}</strong>
             <span>{account.bank}</span>
      </CardHeader>


     {/* Show IBAN + BIC only when this card is selected */}
      {selected && (
        <AccountDetails>
          <Detail>
            <span>IBAN</span>
            <strong>{account.iban}</strong>
          </Detail>

          <Detail>
            <span>BIC</span>
            <strong>{account.bic}</strong>
          </Detail>
        </AccountDetails>
      )}

    </AccountCard>
  );
}
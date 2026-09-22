import styled from "styled-components";
import { Plus } from "lucide-react";
import { ArrowRight } from "lucide-react";

const AccountCard = styled.div`
  padding: 1rem;
  border: 2px solid #000;
  border-radius: 12px;

  background: ${({ $disabled, $selected }) =>
    $disabled
      ? "#ccc"
      : $selected
        ? "#000"
        : "#fff"};

  color: ${({ $disabled, $selected }) =>
    $disabled
      ? "#000"
      : $selected
        ? "#fff"
        : "#000"};

  cursor: ${({ $disabled }) =>
    $disabled ? "default" : "pointer"};
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  padding: 0;

  border: 1px solid currentColor;
  border-radius: 6px;

  background: transparent;
  color: inherit;

  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;

const CardHeader = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemBank = styled.div`
  /* bank */
`;

const ItemName = styled.div`
  /* account name */
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
  disabled,
  onClick,
  onEdit,
}) {
  return (
    <AccountCard
      $selected={selected}
      $disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >

     <CardHeader>
          <div className="accountInfo">
            <div className="itemBank">{account.bank}</div>
            <div className="itemName">{account.name}</div>
          </div>
        {/* <EditButton
          type="button"
          aria-label={`Edit ${account.name}`}
          onClick={(event) => {
            event.stopPropagation();
            onEdit(account);
          }}
        >
        </EditButton> */}
      </CardHeader>

      {selected && !disabled && (
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
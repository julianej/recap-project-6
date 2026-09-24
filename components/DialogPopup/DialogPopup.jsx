import styled from "styled-components";
import { CancelButton, DeleteButton } from "@/styles/ButtonStyles";

const Popup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  background: white;
  padding: 2rem;
  border-radius: 16px;
`;

const PopupWrapper = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  align-items: center;
`;


// ====================
// COMPONENT
// ====================


export default function DialogPopup({ 
  transaction,
  title,
  message,
  onCancel,
  onDelete,
}) {
  return (
    <PopupWrapper>
      <Popup>
        {transaction ? (
          <p>
            Are you sure you want to delete{" "}
            <strong>{transaction.title}</strong>{" "}
            (
            {transaction.amount.toLocaleString("de-DE", {
              style: "currency",
              currency: "EUR",
            })}
            )?
          </p>
        ) : (
          <p>
            <strong>{title}</strong>
            <br />
            {message}
          </p>
        )}

        <ButtonWrapper>
          <DeleteButton onClick={onDelete}>
            Delete
          </DeleteButton>

          <CancelButton onClick={onCancel}>
            Cancel
          </CancelButton>
        </ButtonWrapper>
      </Popup>
    </PopupWrapper>
  );
}
import styled from "styled-components";

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

const CancelButton = styled.button`
  text-align: center;
  background: transparent;
  border: 1px solid black;
  color: black;
  padding: 0.7rem 0;
  width: 20%;
  border-radius: 8px;
`;

const DeleteButton = styled.button`
 text-align: center;
  background: black;
  border: none;
  color: white;
  width: 80%;
  padding: 0.8rem 0;
  border-radius: 8px;
`;

// ====================
// COMPONENT
// ====================


export default function DialogPopup({ transaction, onCancel, onDelete }) {
  return (
    <PopupWrapper>
    <Popup>
      <p>
        Are you sure you want to delete{" "}
        <strong>{transaction.title}</strong> (
            {transaction.amount.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
            })}
        )?
        </p>
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
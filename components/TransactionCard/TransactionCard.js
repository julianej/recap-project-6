import styled from "styled-components";

// ====================
// STYLES
// ====================

const ButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  align-items: center;
`;

const EditButton = styled.div`
  background: transparent;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  padding: 0.7rem;
  color:grey;
`;

const DeleteButton = styled.div`
  background: lightgrey;
  padding: 0.7rem 0.7rem 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid lightgray;
  color: #0d0d0d ;
`;

const Transaction = styled.div`
  display: flex;
  gap: 20px;
  padding: 1rem;
  border-radius: 8px;
  align-items: center;

  border: ${({ $isSelected }) =>
    $isSelected ? "2px solid black" : "1px solid #ccc"};

  background-color: ${({ $isSelected }) =>
    $isSelected ? "#e0e0e0" : "white"};

  ${({ $isHighlighted }) =>
    $isHighlighted &&
    `
      animation: highlight 1.5s ease-out;

      @keyframes highlight {
        0% {
          background-color: pink;
        }

        100% {
          background-color: white;
        }
      }
    `}

  > div:first-child {
    flex: 1 0 0 ;
  }

  > div:nth-child(2) {
      flex: 1 0 0 ;
  }
  > div:nth-child(3) {
      flex: 2 0 0 ;
  }
`;

const TransactionTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 20px;
   flex: 2 0 0; 
`;

const Category = styled.p`
  margin: 4px 0;
`;

const DateText = styled.p`
  margin: 4px 0;
`;

const Time = styled.p`
  margin: 4px 0;
`;
const Amount = styled.p`
  font-weight: bold;
  font-size: 2rem;
  margin: 0;
  padding: 0 1rem;
  flex: 1 0 0; 
  text-align: right;

  color: ${({ $isIncome }) =>
    $isIncome ? "black" : "red"};
`;


// ====================
// COMPONENT
// ====================

export default function TransactionCard({
  transaction,
  onEdit,
  isSelected,
  isHighlighted,
  onDelete,
}) {
  const date = new Date(transaction.date);

  return (
    <Transaction $isSelected={isSelected} $isHighlighted={isHighlighted}>
      <div>
        <TransactionTitle>
          {transaction.title}
        </TransactionTitle>

        <Category>
          {transaction.category}
        </Category>
      </div>

      <div>
       <DateText>
          {date.toLocaleDateString("de-DE")}
        </DateText>

        <Time>
          {date.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Time>
      </div>

   <Amount $isIncome={transaction.amount >= 0}>
    {transaction.amount} €
  </Amount>
  <ButtonWrapper>
     <DeleteButton type="button" onClick={onDelete}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 6L18 18M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
    </DeleteButton>
    <EditButton type="button" onClick={onEdit}>
      Edit
    </EditButton>

  </ButtonWrapper>
    </Transaction>
  );
}


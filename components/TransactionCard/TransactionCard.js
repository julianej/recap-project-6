import styled from "styled-components";


const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
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
    flex: 2;
  }

  > div:nth-child(2) {
    flex: 1;
  }
`;

const TransactionTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 20px;
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
  font-size: 20px;
  margin: 0;
  padding: 0 1rem;
  flex: 0 0 auto;
  text-align: right;

  color: ${({ $isIncome }) =>
    $isIncome ? "black" : "red"};
`;


export default function TransactionCard({
  transaction,
  onEdit,
  isSelected,
  isHighlighted,
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
    <Button type="button" onClick={onEdit}>
        Edit
      </Button>
    </Transaction>
  );
}


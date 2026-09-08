import styled from "styled-components";

export default function TransactionCard({ transaction }) {
  const date = new Date(transaction.date);
  console.log("TYPE:", transaction.type);

  return (
    <Transaction>
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

    <Amount $isIncome={transaction.type === "income"}>
     {transaction.amount} €
    </Amount>
    </Transaction>
  );
}

const Transaction = styled.div`
  display: flex;
  gap: 20px;
  border: 1px solid #ccc;
  padding: 1rem;

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
  flex: 1;
  text-align: right;

  color: ${({ $isIncome }) =>
    $isIncome ? "green" : "red"};
`;
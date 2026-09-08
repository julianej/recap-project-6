import styled from "styled-components";

export default function TransactionList({ transactions }) {
  return (
    <List>
      {transactions.map((transaction) => {
        const date = new Date(transaction.date);

        return (
          <Transaction key={transaction._id}>
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
          </Transaction>
        );
      })}
    </List>
  );
}

const List = styled.section`
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Transaction = styled.div`
  display: flex;
  gap: 20px;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 1rem;

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

  color: ${(props) =>
    props.$isIncome ? "green" : "red"};
`;
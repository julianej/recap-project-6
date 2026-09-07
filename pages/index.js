import useSWR from "swr";
import styled from "styled-components";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function HomePage() {
  const { data, error, isLoading } = useSWR(
    "/api/transactions",
    fetcher
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load transactions.</p>;
  }

  return (
    <Main>
      <Title>Money Manager</Title>

      <TransactionList>
        {data.map((transaction) => {
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
      </TransactionList>
    </Main>
  );
}

    // <main>
    //   <h1>Money Manager</h1>

    //   <section>
    //     {data.map((transaction) => (
    //       <div key={transaction._id}>
    //         <h2>{transaction.title}</h2>
    //         <p className={transaction.amount >= 0 ? "income" : "expense"}> 
    //           {transaction.amount} €
    //         </p>
    //         <p>{transaction.category}</p>
    //         <p>{transaction.date}</p>
    //       </div>
    //     ))}
    //   </section>
    // </main>


const Main = styled.main`
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 40px;
  margin-bottom: 30px;
`;

const TransactionList = styled.section`
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

  > div:first-child {
    flex: 2;
  }

  > div:nth-child(2) {
    flex: 1;
  }

  > p {
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

const Time = styled.p`
  margin: 4px 0;
`;

const DateText = styled.p`
  margin: 4px 0;
`;

const DateTime = styled.div`
  display: flex;
  gap: 10px;
`;

const TransactionInfo = styled.div`
  flex: 1;
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

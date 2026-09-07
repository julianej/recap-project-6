import useSWR from "swr";
import styled from "styled-components";


const fetcher = (url) => fetch(url).then((response) => response.json());

export default function HomePage() {
  // Fetch transactions from the API
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
        {data.map((transaction) => (
          <Transaction key={transaction._id}>
            <div>
              <TransactionTitle>
                {transaction.title}
              </TransactionTitle>

              <Amount $isIncome={transaction.amount >= 0}>
                {transaction.amount} €
              </Amount>

              <Category>
                {transaction.category}
              </Category>

              <Date>
                {transaction.date}
              </Date>
            </div>
          </Transaction>
        ))}
      </TransactionList>
    </Main>
 );

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
}


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
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const TransactionTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 20px;
`;

const Category = styled.p`
  margin: 4px 0;
`;

const Date = styled.p`
  margin: 4px 0;
`;

const Amount = styled.p`
  font-weight: bold;
  font-size: 20px;

  color: ${(props) =>
    props.$isIncome ? "green" : "red"};
`;

const Income = styled.p`
  color: green;
`;

const Expense = styled.p`
  color: red;
`;
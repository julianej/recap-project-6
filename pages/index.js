import useSWR from "swr";
import styled from "styled-components";


const fetcher = (url) => fetch(url).then((response) => response.json());

const Income = styled.p`
  color: green;
`;

const Expense = styled.p`
  color: red;
`;

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
    <main>
      <h1>Money Manager</h1>

      <section>
        {data.map((transaction) => (
          <div key={transaction._id}>
            <h2>{transaction.title}</h2>
            <p className={transaction.amount >= 0 ? "income" : "expense"}> 
              {transaction.amount} €
            </p>
            <p>{transaction.category}</p>
            <p>{transaction.date}</p>
          </div>
        ))}
      </section>
    </main>
  );
}

// import useSWR from "swr";

// const fetcher = (url) => fetch(url).then((res) => res.json());

export default function HomePage() {

    return <h1>Hello!</h1>;

  // Use SWR to fetch transactions from the API
  // const { data, error, isLoading } = useSWR(
  //   "/api/transactions",
  //   fetcher
  // );

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Failed to load transactions.</p>;
  // }

  // return (
  //   <main>
  //     {data.map((transaction) => (
  //       <div key={transaction._id}>
  //         <h2>{transaction.title}</h2>
  //         <p>{transaction.amount}</p>
  //         <p>{transaction.category}</p>
  //       </div>
  //     ))}
  //   </main>
  // );
}
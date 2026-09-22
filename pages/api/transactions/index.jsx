import dbConnect from "@/db/connect";
import Transactions from "@/db/models/Transactions/Transactions";

export default async function handler(request, response) {
  try {
    await dbConnect();

    if (request.method === "GET") {
      const transactions = await Transactions.find().sort({
        date: -1,
      });

      return response.status(200).json(transactions);
    }

    return response.status(405).json({
      error: "Method not allowed",
    });
  } catch (error) {
    console.error(error);

    return response.status(500).json({
      error: "Internal server error",
    });
  }
}

// import dbConnect from "@/db/connect";
// import { getTransactionsModel } from "@/db/models/Transactions/Transactions";

// const databases = {
//   1: "deutsche-bank-db",
//   2: "n26-db",
//   3: "paypal-db",
// };

// export default async function handler(request, response) {
 
//   try {
//     const { account } = request.query;
//     const databaseName = databases[account];

//      if (!databaseName) {
//       return response.status(400).json({
//         error: "Invalid account",
//       });
//     }

//     const db = await dbConnect(databaseName);

//     const Transactions = getTransactionsModel(db);

//     if (request.method === "POST") {
//       const transaction = await Transactions.create(request.body);

//       return response.status(201).json(transaction);
//     }

//     if (request.method === "GET") {
//       const transactions = await Transactions.find().sort({ date: -1 });

//       return response.status(200).json(transactions);
//     }

//     return response.status(405).json({
//       error: "Method not allowed",
//     });

//   } catch (error) {
//     console.error(error);

//     return response.status(500).json({
//       error: "Internal server error",
//     });
//   }
// }
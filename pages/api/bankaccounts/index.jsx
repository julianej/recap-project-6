import dbConnect from "@/db/connect";
import BankAccounts from "@/db/models/Bankaccounts/Bankaccounts";
// import { mockAccounts } from "../../../data/mockAccounts"; // JS FILE

export default async function handler(request, response) {
 
  try {
    await dbConnect();

// CREATE
    if (request.method === "POST") {
      const accounts = await BankAccounts.create(request.body);

      return response.status(201).json(accounts);
    }

// READ
    if (request.method === "GET") {
      const accounts = await BankAccounts.find().sort({ date: -1 });

      return response.status(200).json(accounts);
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
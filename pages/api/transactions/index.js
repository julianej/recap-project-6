<<<<<<< HEAD
import dbConnect from "../../../db/connect";
import Project from "../../../db/models/Project";
=======
import dbConnect from "@/db/connect";
import Project from "@/db/models/Project";

>>>>>>> 8cd9469 (add form Title and add to Transaction List)

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const transactions = await Project.find().sort({ date: -1 });

    return response.status(200).json(transactions);
  }

  if (request.method === "POST") {
    try {
<<<<<<< HEAD
      await dbConnect();
=======
      const transaction = await Project.create(request.body);
>>>>>>> 8cd9469 (add form Title and add to Transaction List)

      return response.status(201).json(transaction);
    } catch (error) {
      return response.status(400).json({
        error: "Failed to create transaction",
      });
    }
  }

  return response.status(405).json({
    error: "Method not allowed",
  });
}
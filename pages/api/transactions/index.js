import dbConnect from "@/db/connect";
import Project from "@/db/models/Project";


export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const transactions = await Project.find().sort({ date: -1 });

    return response.status(200).json(transactions);
  }

  if (request.method === "POST") {
    try {
      const transaction = await Project.create(request.body);

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
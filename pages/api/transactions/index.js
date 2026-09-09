import dbConnect from "@/db/connect";
import Project from "@/db/models/Project";

export default async function handler(request, response) {
 
  try {
    await dbConnect();

    if (request.method === "GET") {
      const transactions = await Project.find().sort({ date: -1 });

      return response.status(200).json(transactions);
    }

    if (request.method === "POST") {
      const transaction = await Project.create(request.body);

      return response.status(201).json(transaction);
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
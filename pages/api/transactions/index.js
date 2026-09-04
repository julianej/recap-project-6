import connect from "../../../db/connect";
import Project from "../../../db/models/Project";

export default async function handler(request, response) {
  if (request.method === "GET") {
    try {
      await connect();

      const transactions = await Project.find();

      return response.status(200).json(transactions);
    } catch (error) {
      console.error("Database error:", error);

      return response.status(500).json({
        error: "Failed to fetch transactions",
      });
    }
  }

  return response.status(405).json({
    error: "Method not allowed",
  });
}
import connect from "../../../db/connect";
import Project from "../../../db/models/Project";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connect();

      const transactions = await Project.find();

      return res.status(200).json(transactions);
    } catch (error) {
      console.error("Database error:", error);

      return res.status(500).json({
        error: "Failed to fetch transactions",
      });
    }
  }

  return res.status(405).json({
    message: "Method not allowed",
  });
}
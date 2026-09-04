import connect from "../../../db/connect";
import Project from "../../../db/models/Project";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connect();

      const transactions = await Project.find();

      return res.status(200).json(transactions);
    } catch (error) {
      console.error("Database connection failed:", error);

      return res.status(500).json({
        error: "Failed to connect to the database",
      });
    }
  }

  return res.status(405).json({
    error: "Method not allowed",
  });
}
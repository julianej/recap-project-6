import connect from "../../../db/connect";
import Project from "../../../db/models/Project";

export default async function handler(req, res) {
  await connect();

  if (req.method === "GET") {
    const transactions = await Project.find();

    return res.status(200).json(transactions);
  }

  return res.status(405).json({ message: "Method not allowed" });
}
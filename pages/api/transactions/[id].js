import dbConnect from "@/db/connect";
import Project from "@/db/models/Projects/Project";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PATCH") {
    try {
      // Data sent by the frontend
      const transactionData = request.body;

      const transaction = await Project.findByIdAndUpdate(
        id,
        transactionData
      );

      if (!transaction) {
        return response.status(404).json({
          error: "Transaction not found",
        });
      }

      response.status(200).json({
        status: "Success",
      });
      return;

    } catch (error) {
      response.status(500).json({
        error: "Internal Server Error",
      });
      return;
    }
  }

  if (request.method === "DELETE") {
    try {
      const { id } = request.query;

      await Project.findByIdAndDelete(id);

      return response.status(200).json({
        message: "Transaction deleted",
      });
    } catch (error) {
      return response.status(500).json({
        error: "Failed to delete transaction",
      });
    }
  }


  response.status(405).json({
    status: "Method not allowed.",
  });
}
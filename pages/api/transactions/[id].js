import dbConnect from "@/db/connect";
import Projects from "@/db/models/Project";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === "PATCH") {
    try {
      const transaction = await Projects.findByIdAndUpdate(
        id,
        request.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!transaction) {
        return response.status(404).json({
          error: "Transaction not found",
        });
      }

      return response.status(200).json(transaction);
    } catch (error) {
      return response.status(500).json({
        error: "Failed to update transaction",
      });
    }
  }

  response.status(405).json({
    error: "Method not allowed",
  });
}
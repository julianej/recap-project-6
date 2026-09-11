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
      console.error(error);

    {/* Validate 400 = the request contains invalid data.*/}
      if (error.name === "ValidationError") {
        return response.status(400).json({
          error: error.message,
        });
      }

      return response.status(500).json({
        error: "Failed to update transaction",
      });
    }
  }
}
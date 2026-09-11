import dbConnect from "@/db/connect";
import Projects from "@/db/models/Project";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "PATCH") {
    try {
      // Data sent by the frontend
      const transactionData = request.body;

      await Projects.findByIdAndUpdate(
        id,
        transactionData
      );

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

  response.status(405).json({
    status: "Method not allowed.",
  });
}
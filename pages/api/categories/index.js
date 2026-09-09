import dbConnect from "@/db/connect";
import Categories from "@/db/models/Categories/Categories";

export default async function handler(request, response) {
  
  await dbConnect();

  if (request.method === "GET") {
    const categories = await Categories.find();

    return response.status(200).json(categories);
  }

  return response.status(405).json({
    error: "Method not allowed",
  });
}
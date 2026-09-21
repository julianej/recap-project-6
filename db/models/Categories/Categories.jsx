import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Categories =
  mongoose.models.Categories ||
  mongoose.model("Categories", categorySchema);

export default Categories;
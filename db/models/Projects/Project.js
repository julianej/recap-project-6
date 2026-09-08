import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
});

const Project =
  mongoose.models.Project ||
  mongoose.model("Project", projectSchema);

export default Project;
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  amount: {
    type: Number,
  },
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
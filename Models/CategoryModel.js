import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String, 
      required: true,
    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem", 
      required: false, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);

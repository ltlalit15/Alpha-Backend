import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    problem: {
      type: String,
      required: true,
    },
    image: {
      type: String, // Cloudinary URL store hoga
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Problem", problemSchema);

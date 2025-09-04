import mongoose from "mongoose";

const modelSchema = new mongoose.Schema(
  {
    modelName: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // Cloudinary URL
      required: true,
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory", // Relation with SubCategory
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Model", modelSchema);

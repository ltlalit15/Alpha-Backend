import mongoose from "mongoose";

const problemDetailsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: String,
        },
        warrenty: {
            type: String,
        },
        description: {
            type: String,
        },
        image: {
            type: String, // Cloudinary URL
            required: true,
        },
        problemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Model", // Relation with Model
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("ProblemDetails", problemDetailsSchema);

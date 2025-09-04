import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },

        date: {
            type: String,
        },
        time: {
            type: String,
        },
        phone: {
            type: String,
        },
        modelName: {
            type: String,
        },
        message: {
            type: String,
        },
        problemId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProblemDetails", // Relation with SubCategory
        }
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);

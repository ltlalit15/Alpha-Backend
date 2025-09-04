import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        day: {
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
            type: String,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);

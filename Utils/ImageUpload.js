import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// --- Cloudinary Config ---
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

// --- Upload Function (Multer use karega) ---
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "problems", // Folder name Cloudinary me
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

export const upload = multer({ storage });

// --- Delete Function ---
export const deleteFromCloudinary = async (imageUrl) => {
  try {
    const parts = imageUrl.split("/");
    const filename = parts[parts.length - 1]; // abc123.jpg
    const publicId = "problems/" + filename.split(".")[0]; // problems/abc123

    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    throw new Error("Cloudinary delete failed: " + error.message);
  }
};

export default cloudinary;

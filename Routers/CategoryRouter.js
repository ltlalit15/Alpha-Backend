import express from "express";
import { createCategory, getCategories, deleteCategory } from "../Controllers/CategoryCtrl.js";
import { upload } from "../Utils/ImageUpload.js";

const router = express.Router();

router.post("/categories", upload.single("image"), createCategory);
router.get("/categories", getCategories);
router.delete("/categories/:id", deleteCategory);

export default router;

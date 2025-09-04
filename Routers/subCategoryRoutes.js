import express from "express";
import { createSubCategory, getSubCategories, deleteSubCategory } from "../Controllers/SubCategoryCtrl.js";
import { upload } from "../Utils/ImageUpload.js";

const router = express.Router();

router.post("/subcategories", upload.single("image"), createSubCategory);
router.get("/subcategories", getSubCategories);
router.delete("/subcategories/:id", deleteSubCategory);

export default router;

import express from "express";
import { createModel, getModels, deleteModel } from "../Controllers/MobileModalCtrl.js";
import { upload } from "../Utils/ImageUpload.js";

const router = express.Router();

router.post("/models", upload.single("image"), createModel);
router.get("/models", getModels);
router.delete("/models/:id", deleteModel);

export default router;

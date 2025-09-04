import express from "express";
import { createProblem, getProblems, deleteProblem } from "../Controllers/ProblemCtrl.js";
import {upload} from "../Utils/ImageUpload.js";

const router = express.Router();

router.post("/problems", upload.single("image"), createProblem);
router.get("/problems", getProblems);
router.delete("/problems/:id", deleteProblem);

export default router;

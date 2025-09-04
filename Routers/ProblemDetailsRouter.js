import express from "express";
import { createProblemDetails, getProblemDetails, deleteProblemDetails ,editProblemDetails, getProblemDetailById} from "../Controllers/ProblemDetailsCtrl.js";
import { upload } from "../Utils/ImageUpload.js";

const router = express.Router();

router.post("/problem-details", upload.single("image"), createProblemDetails);

router.get("/problem-details", getProblemDetails);
router.get("/getProblemDetailById/:id",getProblemDetailById);
router.put("/problem-details/:id", upload.single("image"),editProblemDetails);
router.delete("/problem-details/:id", deleteProblemDetails);


export default router;

// routes/paymentRoutes.js
import express from "express";
import { logins ,getProfile,editProfile } from "../Controllers/AuthCtrl.js";

const router = express.Router();

router.post("/login", logins);
router.get("/profile/:id", getProfile);
router.put("/profile/:id", editProfile);

export default router;

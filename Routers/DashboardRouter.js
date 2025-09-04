import express from "express";
import {  getDashbaordData } from "../Controllers/DashboarCtrl.js";

const router = express.Router();

router.get("/dashbaord", getDashbaordData);

export default router;

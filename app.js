import { Router } from "express";

import AuthRouter from "./Routers/AuthRouter.js";
import ProblemRouter from "./Routers/ProblemRouter.js";
import CategoryRouter from "./Routers/CategoryRouter.js";
import subCategoryRoutes from "./Routers/subCategoryRoutes.js";
import MobileModalRouter from "./Routers/MobileModalRouter.js";
import ProblemDetailsRouter from "./Routers/ProblemDetailsRouter.js";
import BookingRouter from "./Routers/BookingRouter.js";
import ContactRouter from "./Routers/ContactRouter.js";
import DashboardRouter from "./Routers/DashboardRouter.js";

const router = Router();

router.use("/api", AuthRouter);
router.use("/api", ProblemRouter);
router.use("/api", CategoryRouter);
router.use("/api", subCategoryRoutes);
router.use("/api", MobileModalRouter);
router.use("/api", ProblemDetailsRouter);
router.use("/api", BookingRouter);
router.use("/api", ContactRouter);
router.use("/api", DashboardRouter);

export default router;

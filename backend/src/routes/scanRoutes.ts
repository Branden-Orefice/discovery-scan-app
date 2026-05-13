import express from "express";
import betterAuthMiddleware from "../middleware/betterAuthMiddleware";
import { launchWpScan } from "../controllers/wpScanController";
import attachContext from "../middleware/attachContext";

const router = express.Router();

router.use(betterAuthMiddleware);
router.use(attachContext);

router.post("/", launchWpScan);

export default router;

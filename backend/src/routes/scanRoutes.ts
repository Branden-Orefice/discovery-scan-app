import express from "express";
import betterAuthMiddleware from "../middleware/betterAuthMiddleware";
import { getAllFindings, launchWpScan } from "../controllers/wpScanController";
import attachContext from "../middleware/attachContext";

const router = express.Router();

router.use(betterAuthMiddleware);
router.use(attachContext);

router.post("/", launchWpScan);
router.get("/findings", getAllFindings);

export default router;

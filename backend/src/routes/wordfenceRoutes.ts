import express from "express";
import betterAuthMiddleware from "../middleware/betterAuthMiddleware";
import { getLatestWordfenceVulns } from "../controllers/wordfenceController";

const router = express.Router();

router.use(betterAuthMiddleware);

router.get("/latest", getLatestWordfenceVulns);

export default router;

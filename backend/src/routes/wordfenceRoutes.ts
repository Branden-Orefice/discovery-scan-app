import express from "express";
import betterAuthMiddleware from "../middleware/betterAuthMiddleware";
import {
  getAllWordfenceVulns,
  getLatestWordfenceVulns,
} from "../controllers/wordfenceController";

const router = express.Router();

router.use(betterAuthMiddleware);

router.get("/latest", getLatestWordfenceVulns);
router.get("/all", getAllWordfenceVulns);

export default router;

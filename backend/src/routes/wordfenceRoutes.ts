import express from "express";
import betterAuthMiddleware from "../middleware/betterAuthMiddleware";
import {
  getAllWordfenceVulns,
  getLatestWordfenceVulns,
  getWordfenceVulnById,
  getWordfenceVulnSeverityCounts,
} from "../controllers/wordfenceController";
import attachContext from "../middleware/attachContext";

const router = express.Router();

router.use(betterAuthMiddleware);
router.use(attachContext);

router.get("/latest", getLatestWordfenceVulns);
router.get("/all", getAllWordfenceVulns);
router.get("/severities", getWordfenceVulnSeverityCounts);
router.get("/vulnerabilities/:id", getWordfenceVulnById);

export default router;

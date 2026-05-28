import express from "express";
import betterAuthMiddleware from "../middleware/betterAuthMiddleware";
import {
  getAllWordfenceVulns,
  getLatestWordfenceVulns,
} from "../controllers/wordfenceController";
import attachContext from "../middleware/attachContext";

const router = express.Router();

router.use(betterAuthMiddleware);
router.use(attachContext);

router.get("/latest", getLatestWordfenceVulns);
router.get("/all", getAllWordfenceVulns);

export default router;

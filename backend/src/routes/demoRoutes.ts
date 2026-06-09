import express from "express";
import { demoSignInHandler } from "../controllers/demoHandlerController";

const router = express.Router();

router.post("/", demoSignInHandler);

export default router;

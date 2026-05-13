import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

const betterAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const sessionData = await auth.api.getSession({
      headers: req.headers as any,
    });

    if (!sessionData?.user || !sessionData?.session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    req.user = sessionData.user;
    req.session = sessionData.session;

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    next(error);
  }
};

export default betterAuthMiddleware;

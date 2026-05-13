import { Request, Response, NextFunction } from "express";
import { supabase } from "../lib/supabase";

const attachContext = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });

  req.context = {
    user: req.user,
    db: supabase,
  };

  next();
};

export default attachContext;

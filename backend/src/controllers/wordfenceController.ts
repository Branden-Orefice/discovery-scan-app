import { Request, Response } from "express";
import { redisQueue } from "../services/redis";

export const getLatestWordfenceVulns = async (req: Request, res: Response) => {
  const cached = await redisQueue.get("wordfence:vuln:latest");

  if (!cached) {
    return res.status(200).json({ data: [] });
  }

  return res.status(200).json({
    data: JSON.parse(cached),
  });
};

export const getAllWordfenceVulns = async (req: Request, res: Response) => {
  const cached = await redisQueue.get("wordfence:vuln:all");

  if (!cached) {
    return res.status(200).json({ data: [] });
  }

  return res.status(200).json({
    data: JSON.parse(cached),
  });
};

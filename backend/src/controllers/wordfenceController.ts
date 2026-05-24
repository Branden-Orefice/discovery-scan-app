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
  try {
    const { db, user } = req.context!;

    const { data, error } = await db
      .from("wordfence_vulnerabilities")
      .select("*")
      .eq("user_id", user.id)
      .order("published", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching all Wordfence vulns:", error);
  }
};

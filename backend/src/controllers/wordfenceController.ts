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
    const { db } = req.context!;

    const from = Number(req.query.from ?? 0);
    const to = Number(req.query.to ?? 29);

    const { data, error, count } = await db
      .from("wordfence_vulnerabilities")
      .select(
        "id, title, slug, software_type, software_name, affected_versions, patched, patched_versions, remediation, informational, description, reference, cvss, cve, cve_link, published, updated",
        { count: "exact" },
      )
      .order("published", { ascending: false })
      .range(from, to);

    if (error) return res.status(500).json({ error: error.message });

    res.status(200).json({ data, count, from, to });
  } catch (error) {
    console.error("Error fetching all Wordfence vulns:", error);
  }
};

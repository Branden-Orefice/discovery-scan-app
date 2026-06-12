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
      .select("id, severity, title, description, published", { count: "exact" })
      .order("published", { ascending: false })
      .range(from, to);

    if (error) return res.status(500).json({ error: error.message });

    res.status(200).json({ data, count, from, to });
  } catch (error) {
    console.error("Error fetching all Wordfence vulns:", error);
  }
};

export const getWordfenceVulnById = async (req: Request, res: Response) => {
  try {
    const { db } = req.context!;
    const { id } = req.params;

    const { data, error } = await db
      .from("wordfence_vulnerabilities")
      .select(
        "id, wordfence_id, title, slug, software_type, software_name, affected_versions, patched, patched_versions, remediation, informational, description, reference, severity, cvss_vector, cvss_score, cve, cve_link, published, updated, researchers",
      )
      .eq("id", id)
      .maybeSingle();

    if (error) return res.status(500).json({ error: error.message });

    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching Wordfence vuln by id:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getWordfenceVulnSeverityCounts = async (
  req: Request,
  res: Response,
) => {
  try {
    const { db } = req.context!;

    const { data, error } = await db.rpc("get_wordfence_vulnerability_stats");

    if (error) return res.status(500).json({ error: error.message });

    res.status(200).json({ data: data?.[0] ?? null });
  } catch (error) {
    console.error(
      "Error fetching all Wordfence vuln counts by severity",
      error,
    );
  }
};

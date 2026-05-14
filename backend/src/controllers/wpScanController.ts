import { Request, Response } from "express";
import { addWpScanJob } from "../services/queue";

export const launchWpScan = async (req: Request, res: Response) => {
  try {
    const { db, user } = req.context!;

    const {
      target,
      scanType,
      scanLabel,
      schedule,
      modules,
      alerts,
      scheduledAt,
      scheduledFrequency,
    } = req.body;

    if (!target) {
      return res.status(400).json({ error: "Url must be provided." });
    }

    const userId = user.id;

    const filterModules = modules
      .filter((module: any) => module.checked)
      .map((module: any) => module.id);

    const { data: scan, error } = await db
      .from("scans")
      .insert({
        user_id: userId,
        target_url: target,
        scan_type: scanType,
        scan_label: scanLabel,
        scan_schedule: schedule,
        scan_scheduled_at: scheduledAt,
        scan_scheduled_frequency: scheduledFrequency,
        scan_modules: filterModules,
        scan_alerts: alerts,
        status: "queued",
      })
      .select("*")
      .single();

    if (error) return res.status(500).json({ error: error.message });

    const launchWPscanWorker = await addWpScanJob({
      scanId: scan.id,
      targetUrl: target,
      userId,
      scanType,
    });
    res
      .status(200)
      .json({ message: "Scan launched successfully.", launchWPscanWorker });
  } catch (error) {
    console.error("Error launching WP scan:", error);
    res.status(500).json({ error: "Failed to launch WP scan" });
  }
};

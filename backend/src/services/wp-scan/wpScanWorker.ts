import { Worker } from "bullmq";
import { redisQueue } from "../redis";
import { supabase } from "../../lib/supabase";
import { runWpScan } from "./runWpScan";
import { getWordfenceVulnerabilityData } from "../../api/wordFenceApi";
import { getCachedWordfenceVulnerabilityData } from "../cache";

export const wpScanWorker = new Worker(
  "wp-scan",
  async (job) => {
    const { scanId, targetUrl, userId, scanType } = job.data;

    const startedAt = new Date();

    await supabase
      .from("scans")
      .update({
        status: "running",
        started_at: startedAt.toISOString(),
        progress: 0,
      })
      .eq("id", scanId);

    const context = {
      scanId,
      targetUrl,
      userId,
      scanType,
    };

    const onStage = async (percent: number) => {
      await supabase
        .from("scans")
        .update({ progress: percent })
        .eq("id", scanId);

      await job.updateProgress(percent);
    };

    try {
      await runWpScan({
        context,
        supabase,
        onStage,
      });

      const wordfenceData = await getCachedWordfenceVulnerabilityData();

      console.log("Hit from cache", wordfenceData);

      const finishedAt = new Date();
      const durationInSeconds = Math.round(
        (finishedAt.getTime() - startedAt.getTime()) / 1000,
      );

      const readableDuration = `${Math.floor(durationInSeconds / 60)}m ${
        durationInSeconds % 60
      }s`;

      await supabase
        .from("scans")
        .update({
          status: "finished",
          finished_at: finishedAt.toISOString(),
          duration: readableDuration,
          progress: 100,
        })
        .eq("id", scanId);
    } catch (error) {
      const errorFinishedAt = new Date();
      const durationInSeconds = Math.round(
        (errorFinishedAt.getTime() - startedAt.getTime()) / 1000,
      );

      const readableDuration = `${Math.floor(durationInSeconds / 60)}m ${
        durationInSeconds % 60
      }s`;

      await supabase
        .from("scans")
        .update({
          status: "failed",
          finished_at: errorFinishedAt.toISOString(),
          duration: readableDuration,
        })
        .eq("id", scanId);

      console.error(error);

      throw error;
    }
  },
  {
    connection: redisQueue,
    concurrency: 2,
  },
);

wpScanWorker.on("completed", (job) => {
  console.log(`WPScan job ${job.id} completed`);
});

wpScanWorker.on("failed", (job, error) => {
  console.error(`WPScan job ${job?.id} failed: ${error.message}`);
});

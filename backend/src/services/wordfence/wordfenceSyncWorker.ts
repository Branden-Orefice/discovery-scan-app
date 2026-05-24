import { Worker } from "bullmq";
import { getWordfenceVulnerabilityData } from "../../api/wordFenceApi";
import { cacheWordfenceVulnerabilityBySlug } from "./cache";
import { redisQueue } from "../redis";

export const wordfenceSyncWorker = new Worker(
  "wordfence-sync-vulns",
  async () => {
    console.log("[wordfence-sync-vulns] fetching Wordfence data feed");

    try {
      const rawData = await getWordfenceVulnerabilityData();

      console.log("[wordfence-sync-vulns] caching by slug");

      const bySlug = await cacheWordfenceVulnerabilityBySlug(rawData);

      console.log("[wordfence-sync-vulns] complete", {
        slugCount: Object.keys(bySlug).length,
      });
    } catch (error) {
      console.log("There was an error caching by slug", error);
      throw error;
    } finally {
      await redisQueue.del("wordfence:sync:lock");
    }
  },
  {
    connection: redisQueue,
    concurrency: 1,
  },
);

wordfenceSyncWorker.on("completed", (job) => {
  console.log(`WordfenceSync job ${job.id} completed`);
});

wordfenceSyncWorker.on("failed", (job, error) => {
  console.error(`WordfenceSync job ${job?.id} failed: ${error.message}`);
});

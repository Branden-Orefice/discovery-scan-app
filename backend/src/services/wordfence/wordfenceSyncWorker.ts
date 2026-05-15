import { Worker } from "bullmq";
import { getWordfenceVulnerabilityData } from "../../api/wordFenceApi";
import { cacheWordfenceVulnerabilityBySlug } from "./cache";
import { redisQueue } from "../redis";

export const wordfenceSyncWorker = new Worker(
  "wordfence-sync-vulns",
  async () => {
    console.log("[wordfence-sync-vulns] fetching Wordfence data feed");

    const rawData = await getWordfenceVulnerabilityData();

    console.log("[wordfence-sync-vulns] caching by slug");

    const bySlug = await cacheWordfenceVulnerabilityBySlug(rawData);

    console.log("[wordfence-sync-vulns] complete", {
      slugCount: Object.keys(bySlug).length,
    });

    return {
      slugCount: Object.keys(bySlug).length,
    };
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

import { Queue } from "bullmq";
import { redisQueue } from "./redis";
import { WpScanContext } from "./wp-scan/types";

export const wpScanQueue = new Queue("wp-scan", {
  connection: redisQueue,
});

export const addWpScanJob = async ({
  scanId,
  targetUrl,
  userId,
  scanType,
}: WpScanContext) => {
  await wpScanQueue.add("wp-scan", {
    scanId,
    targetUrl,
    userId,
    scanType,
  });
};

export const wordfenceSyncQueue = new Queue("wordfence-sync-vulns", {
  connection: redisQueue,
});

export const addWordfenceSyncJob = async () => {
  await wordfenceSyncQueue.add(
    "wordfence-sync-vulns",
    {},
    {
      jobId: "wordfence-sync",
    },
  );
};

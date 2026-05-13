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

import { Queue } from "bullmq";
import { redisQueue } from "./redis";

export const wpScanQueue = new Queue("wp-scan", {
  connection: redisQueue,
});

export const addWpScanJob = async (
  scanId: string,
  url: string,
  userId: string,
) => {
  await wpScanQueue.add("wp-scan", {
    scanId,
    url,
    userId,
  });
};


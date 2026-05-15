import { addWordfenceSyncJob, wordfenceSyncQueue } from "../queue";
import { redisQueue } from "../redis";
import { formatWordfenceDataBySlug } from "./wordfence";

const wordfenceCacheTTL = 60 * 60 * 24 * 7;

export const cacheWordfenceVulnerabilityBySlug = async (data: any) => {
  const getBySlug = formatWordfenceDataBySlug(data);
  const dataEntries = Object.entries(getBySlug);
  const batchSize = 250;

  for (let i = 0; i < dataEntries.length; i += batchSize) {
    const pipeline = redisQueue.pipeline();

    for (const [slug, vulns] of dataEntries.slice(i, i + batchSize)) {
      pipeline.set(
        `wordfence:vuln:slug:${slug}`,
        JSON.stringify(vulns),
        "EX",
        wordfenceCacheTTL,
      );
    }

    await pipeline.exec();
  }
  return getBySlug;
};

export const getCachedWordfenceVulnsForSlug = async (slug: string) => {
  const cacheKey = `wordfence:vuln:slug:${slug}`;
  const cached = await redisQueue.get(cacheKey);

  if (cached) return JSON.parse(cached);

  console.log(`[wordfence] cache miss for slug: ${slug}`);

  const existingJob = await wordfenceSyncQueue.getJob("wordfence-sync");

  if (!existingJob) {
    console.log("[wordfence] queueing sync job");
    await addWordfenceSyncJob();
  } else {
    const state = await existingJob.getState();

    console.log("[wordfence] existing sync job", {
      id: existingJob.id,
      state,
    });

    if (state === "failed" || state === "completed") {
      await existingJob.remove();
      await addWordfenceSyncJob();
    }
  }

  return [];
};

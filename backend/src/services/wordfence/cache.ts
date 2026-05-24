import { addWordfenceSyncJob } from "../queue";
import { redisQueue } from "../redis";
import {
  fetchLatestWordfenceVulnerabilities,
  formatWordfenceDataBySlug,
} from "./wordfence";

const wordfenceCacheTTL = 60 * 60 * 12;
const latestWordFenceCacheTTL = 60 * 60 * 6;

export const cacheWordfenceVulnerabilityBySlug = async (data: any) => {
  const getBySlug = formatWordfenceDataBySlug(data);

  // cache lastest vulnerabilities for globe ui component
  const latestVulnerabilities = fetchLatestWordfenceVulnerabilities(data);

  await redisQueue.set(
    "wordfence:vuln:latest",
    JSON.stringify(latestVulnerabilities),
    "EX",
    latestWordFenceCacheTTL,
  );

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

  const cooldown = await redisQueue.get("wordfence:sync:cooldown");

  if (cooldown) {
    console.log("[wordfence] cooldown active");
    return [];
  }

  const lockKey = "wordfence:sync:lock";

  const lockAcquired = await redisQueue.set(lockKey, "1", "EX", 60 * 10, "NX");

  if (lockAcquired) {
    await addWordfenceSyncJob();
  }

  return [];
};

import { getWordfenceVulnerabilityData } from "../api/wordFenceApi";
import { redisQueue } from "./redis";

const wordfenceCacheKey = "wordfence:vulns:prod";
const wordfenceCacheTTL = 60 * 60 * 24 * 7;

export const getCachedWordfenceVulnerabilityData = async () => {
  const cached = await redisQueue.get(wordfenceCacheKey);

  if (cached) {
    console.log("Wordfence cache hit");
    return JSON.parse(cached);
  }

  console.log("Wordfence cache miss → fetching API");

  const data = await getWordfenceVulnerabilityData();

  await redisQueue.set(
    wordfenceCacheKey,
    JSON.stringify(data),
    "EX",
    wordfenceCacheTTL,
  );

  return data;
};

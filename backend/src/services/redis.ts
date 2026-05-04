import "dotenv/config";
import Redis from "ioredis";

const REDIS_URL = process.env.UPSTASH_REDIS_URL;

if (!REDIS_URL) throw new Error("UPSTASH_REDIS_URL is missing.");

const baseOptions: Redis.RedisOptions = {
  tls: { rejectUnauthorized: false },
  maxRetriesPerRequest: null, // Import for the workers to not break per docs
  retryStrategy: (times) => Math.max(Math.min(Math.exp(times), 20000), 1000), // exponential backoff with a minimum 1s retry time and max of 20s per the docs
};

const createClient = (name: string) => {
  const client = new Redis(REDIS_URL, baseOptions);

  client.on("connect", () => console.log(`[redis:${name}] connected`));
  client.on("error", (error) => console.log(`[redis:${name}] error`, error));

  return client;
};

// BullMQ queues/workers
export const redisQueue = createClient("queue");

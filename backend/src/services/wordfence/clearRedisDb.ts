import { redisQueue } from "../redis";

const clearRedis = async () => {
  await redisQueue.flushdb();

  console.log("Redis database cleared");

  process.exit(0);
};

clearRedis();

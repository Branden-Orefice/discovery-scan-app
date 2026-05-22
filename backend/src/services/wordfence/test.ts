import "dotenv/config";
import { addWordfenceSyncJob } from "../queue";

const main = async () => {
  const job = await addWordfenceSyncJob();

  console.log("Queued Wordfence sync job:", {
    id: job?.id,
    name: job?.name,
  });

  process.exit(0);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

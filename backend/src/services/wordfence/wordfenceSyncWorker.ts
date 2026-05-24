import { Worker } from "bullmq";
import { getWordfenceVulnerabilityData } from "../../api/wordFenceApi";
import { cacheWordfenceVulnerabilityBySlug } from "./cache";
import { redisQueue } from "../redis";
import { fetchAllWordfenceVulnerabilities } from "./wordfence";
import { supabase } from "../../lib/supabase";

export const wordfenceSyncWorker = new Worker(
  "wordfence-sync-vulns",
  async () => {
    console.log("[wordfence-sync-vulns] fetching Wordfence data feed");

    try {
      const rawData = await getWordfenceVulnerabilityData();

      console.log("[wordfence-sync-vulns] caching by slug");

      const bySlug = await cacheWordfenceVulnerabilityBySlug(rawData);

      console.log("[wordfence-sync-vulns] complete", {
        slugCount: Object.keys(bySlug).length,
      });

      const allVulnerabilities = fetchAllWordfenceVulnerabilities(rawData);

      const vulnerabilities = allVulnerabilities.map((vuln) => ({
        id: `${vuln.id}:${vuln.slug}`,
        wordfence_id: vuln.id,
        title: vuln.title,
        slug: vuln.slug,
        software_type: vuln.softwareType,
        software_name: vuln.softwareName,
        affected_versions: vuln.affectedVersions,
        patched: vuln.patched,
        patched_versions: vuln.patchedVersions,
        remediation: vuln.remediation,
        informational: vuln.informational,
        description: vuln.description,
        references: vuln.references,
        cwe: vuln.cwe,
        cvss: vuln.cvss,
        cve: vuln.cve,
        cve_link: vuln.cve_link,
        published: vuln.published,
        updated: vuln.updated,
        raw: vuln,
        synced_at: new Date().toISOString(),
      }));

      const batchSize = 500;

      for (let i = 0; i < vulnerabilities.length; i += batchSize) {
        const batch = vulnerabilities.slice(i, i + batchSize);

        const { error } = await supabase
          .from("wordfence_vulnerabilities")
          .upsert(batch, {
            onConflict: "id",
          });

        if (error) throw error;
      }
    } catch (error) {
      console.log("There was an error caching by slug", error);
      throw error;
    } finally {
      await redisQueue.del("wordfence:sync:lock");
    }
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

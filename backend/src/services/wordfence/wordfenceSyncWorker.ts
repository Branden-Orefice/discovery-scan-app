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

      if (!rawData || Object.keys(rawData).length === 0) {
        throw new Error("Wordfence returned no vulnerability data");
      }

      const allVulnerabilities = fetchAllWordfenceVulnerabilities(rawData);

      const vulnMap = new Map<string, any>();

      for (const vuln of allVulnerabilities) {
        const id = JSON.stringify({
          vulnId: vuln.id,
          slug: vuln.slug,
          affectedVersions: vuln.affectedVersions,
        });

        vulnMap.set(id, {
          id: vuln.id,
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
          reference: vuln.references,
          cwe: vuln.cwe,
          cvss_score: vuln.cvssScore,
          cvss_vector: vuln.cvssVector,
          severity: vuln.severity,
          cvss: vuln.cvss,
          cve: vuln.cve,
          researchers: vuln.researchers,
          cve_link: vuln.cve_link,
          published: vuln.published,
          updated: vuln.updated,
          raw: vuln,
          synced_at: new Date().toISOString(),
        });
      }

      const vulnerabilities = [...vulnMap.values()];

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

      console.log("[wordfence-sync-vulns] caching by slug");

      const bySlug = await cacheWordfenceVulnerabilityBySlug(rawData);

      console.log("[wordfence-sync-vulns] complete", {
        slugCount: Object.keys(bySlug).length,
      });
    } catch (error: any) {
      console.log("There was an error in wordfenceSyncWorker", error);

      if (error?.response?.status === 429) {
        console.log("[wordfence-sync-vulns] entering cooldown mode");

        await redisQueue.set("wordfence:sync:cooldown", "1", "EX", 60 * 15);
      }
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

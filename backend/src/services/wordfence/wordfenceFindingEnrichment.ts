import type { WordfenceFinding, WpScanComponent } from "../wp-scan/types";
import { getCachedWordfenceVulnsForSlug } from "../wordfence/cache";
import { isInstalledVersionAffected } from "../wordfence/wordfenceVersionMatcher";

export const enrichComponentsWithWordfence = async (options: {
  scanId: string;
  components: WpScanComponent[];
}) => {
  const { scanId, components } = options;

  const duplicateCheck = new Set<string>();
  const findings: WordfenceFinding[] = [];

  for (const component of components) {
    if (!component.slug) continue;

    const candidates = await getCachedWordfenceVulnsForSlug(component.slug);

    const matches = candidates.filter((vuln: any) =>
      isInstalledVersionAffected(
        component.installedVersion ?? null,
        vuln.affectedVersions,
      ),
    );

    for (const vuln of matches) {
      const uniqueKey = `${scanId}:${component.slug}:${vuln.id}`;

      if (duplicateCheck.has(uniqueKey)) continue;
      duplicateCheck.add(uniqueKey);

      findings.push({
        scanId,
        targetUrl: component.targetUrl,
        componentType: component.type,
        componentName: component.name,
        componentSlug: component.slug,
        detectedVersion: component.installedVersion ?? null,
        wordfenceId: vuln.id,
        vulnId: vuln.id,
        title: vuln.title,
        severity: vuln.cvss?.rating?.toLowerCase() ?? "unknown",
        cvssScore: vuln.cvss?.score ?? null,
        cvssVector: vuln.cvss?.vector ?? null,
        cve: vuln.cve ?? null,
        cweName: vuln.cwe?.name ?? null,
        cweDescription: vuln.cwe?.description ?? null,
        informational: vuln.informational,
        reference: vuln.references ?? [],
        remediation: vuln.remediation ?? null,
        source: "wordfence" as const,
      });
    }
  }

  return findings;
};

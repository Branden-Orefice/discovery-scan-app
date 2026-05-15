type WordfenceVulnerabilityRecord = {
  id: string;
  title: string;
  slug: string;
  softwareType: string;
  softwareName: string;
  affectedVersions: Record<string, unknown>;
  patched: boolean;
  patchedVersions: string[];
  remediation: string | null;
  informational: boolean;
  description: string;
  references: string[];
  cwe: {
    id: number;
    name: string;
    description: string;
  } | null;
  cvss: {
    vector: string;
    score: number;
    rating: string;
  } | null;
  cve: string | null;
  cve_link: string | null;
  published: string | null;
  updated: string | null;
};

export const formatWordfenceDataBySlug = (data: any) => {
  const bySlug: Record<string, WordfenceVulnerabilityRecord[]> = {};

  for (const vulnerability of Object.values<any>(data ?? {})) {
    for (const software of vulnerability.software ?? []) {
      const slug = software.slug;

      if (!slug) continue;

      // If the slug does not exist yet, create an empty array.
      bySlug[slug] ??= [];

      bySlug[slug].push({
        id: vulnerability.id,
        title: vulnerability.title,
        slug,
        softwareType: software.type,
        softwareName: software.name,
        affectedVersions: software.affected_versions ?? {},
        patched: software.patched,
        patchedVersions: software.patched_versions ?? [],
        remediation: software.remediation ?? null,
        informational: vulnerability.informational,
        description: vulnerability.description ?? "",
        references: vulnerability.references ?? [],
        cwe: vulnerability.cwe ?? null,
        cvss: vulnerability.cvss ?? null,
        cve: vulnerability.cve ?? null,
        cve_link: vulnerability.cve_link ?? null,
        published: vulnerability.published ?? null,
        updated: vulnerability.updated ?? null,
      });
    }
  }

  return bySlug;
};

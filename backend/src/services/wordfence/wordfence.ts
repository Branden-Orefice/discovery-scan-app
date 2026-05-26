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

type LatestWordfenceVulnerability = {
  id: string;
  title: string;
  software: {
    type: string;
    name: string;
    slug: string;
  }[];
  severity: string;
  cvssScore: number | null;
  cve: string | null;
  published: string | null;
  updated: string | null;
  references: string[];
};

export const formatWordfenceDataBySlug = (data: any) => {
  const bySlug: Record<string, WordfenceVulnerabilityRecord[]> =
    Object.create(null);

  for (const vulnerability of Object.values<any>(data ?? {})) {
    for (const software of vulnerability.software ?? []) {
      const slug = software.slug;

      if (!slug) continue;

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

export const fetchLatestWordfenceVulnerabilities = (
  data: any,
): LatestWordfenceVulnerability[] => {
  return Object.values<any>(data ?? {})
    .sort(
      (a, b) =>
        new Date(b.published ?? 0).getTime() -
        new Date(a.published ?? 0).getTime(),
    )
    .slice(0, 20)
    .map((vulnerability) => ({
      id: vulnerability.id,
      title: vulnerability.title,
      software:
        vulnerability.software?.map((software: any) => ({
          type: software.type,
          name: software.name,
          slug: software.slug,
        })) ?? [],
      severity: vulnerability.cvss?.rating ?? "Unknown",
      cvssScore: vulnerability.cvss?.score ?? null,
      cve: vulnerability.cve ?? null,
      published: vulnerability.published ?? null,
      updated: vulnerability.updated ?? null,
      references: vulnerability.references ?? [],
    }));
};

export const fetchAllWordfenceVulnerabilities = (
  data: any,
): WordfenceVulnerabilityRecord[] => {
  return Object.values<any>(data ?? {}).map((vulnerability) => ({
    id: vulnerability.id,
    title: vulnerability.title,
    slug: vulnerability.software.slug,
    softwareType: vulnerability.software.type,
    softwareName: vulnerability.software.name,
    affectedVersions: vulnerability.software.affected_versions ?? {},
    patched: vulnerability.software.patched,
    patchedVersions: vulnerability.software.patched_versions ?? [],
    remediation: vulnerability.software.remediation ?? null,
    informational: vulnerability.informational,
    description: vulnerability.description ?? "",
    references: vulnerability.references ?? [],
    cwe: vulnerability.cwe ?? null,
    cvss: vulnerability.cvss ?? null,
    cve: vulnerability.cve ?? null,
    cve_link: vulnerability.cve_link ?? null,
    published: vulnerability.published ?? null,
    updated: vulnerability.updated ?? null,
  }));
};

export type WpScanContext = {
  targetUrl: string;
  userId: string;
  scanId: string;
  scanType: string;
};

export type WpScanSeverities =
  | "critical"
  | "high"
  | "medium"
  | "low"
  | "info"
  | "unknown";

export type WpScanComponent = {
  scanId: string;
  targetUrl: string;
  type: "core" | "plugin" | "theme";
  name: string;
  slug?: string | null;
  outdated?: boolean;
  friendlyName?: string | null;
  installedVersion?: string | null;
  latestVersion?: string | null;
  lastUpdated?: string | null;
  releaseDate?: string | null;
  changelogUrl?: string | null;
  popular?: boolean;
  status: "up_to_date" | "outdated" | "vulnerable" | "closed" | "unknown";
};

export type WpScanFinding = {
  scanId: string;
  wordfenceId: string;
  targetUrl: string;
  componentType: "core" | "plugin" | "theme";
  componentSlug: string;
  componentName: string;
  detectedVersion: string;
  vulnId: string;
  title: string;
  description?: string | null;
  cve?: string | null;
  cvssScore?: string | null;
  cvssRating?: string | null;
  cvssVector?: string | null;
  patchedVersions?: string | null;
  remediation: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  severity: WpScanSeverities;
  verified?: boolean | null;
  fixedIn?: string | null;
  introducedIn?: string | null;
  reference?: Record<string, unknown> | null;
  source: "wordfence";
};

export type WpScanInterestingFinding = {
  scanId: string;
  url: string;
  type: string;
  interestingEntries?: string[] | null;
  reference?: Record<string, unknown> | null;
  source: "wpscan";
};

export type WpScanResult = {
  raw: unknown;
  findings: WpScanFinding[];
  components: WpScanComponent[];
  interestingFindings: WpScanInterestingFinding[];
};

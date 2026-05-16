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
  status: "up_to_date" | "outdated" | "vulnerable" | "closed" | "unknown";
};

export type WordfenceFinding = {
  scanId: string;
  targetUrl: string;
  componentType: "core" | "plugin" | "theme";
  componentName: string;
  componentSlug: string;
  detectedVersion: string | null;
  wordfenceId: string;
  vulnId: string;
  title: string;
  severity: string;
  cve: string | null;
  cweName: string | null;
  cweDescription: string | null;
  cvssScore: number | null;
  cvssVector: string | null;
  informational: boolean;
  reference: string[];
  remediation: string | null;
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
  components: WpScanComponent[];
  findings: WordfenceFinding[];
  interestingFindings: WpScanInterestingFinding[];
};

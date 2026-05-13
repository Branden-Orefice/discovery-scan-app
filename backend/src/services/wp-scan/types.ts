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
  wpscanId: string;
  oldId?: number | null;
  targetUrl: string;
  componentType: "core" | "plugin" | "theme";
  componentName: string;
  componentFriendlyName?: string | null;
  title: string;
  description?: string | null;
  vulnType?: string | null;
  publishedDate?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  severity: WpScanSeverities;
  cvssScore?: string | null;
  cvssVector?: string | null;
  verified?: boolean | null;
  fixedIn?: string | null;
  introducedIn?: string | null;
  cve?: string | null;
  reference?: Record<string, unknown> | null;
  closed?: boolean | null;
  closedReason?: string | null;
  source: "wpscan";
};

export type WpScanResult = {
  raw: unknown;
  findings: WpScanFinding[];
  components: WpScanComponent[];
};

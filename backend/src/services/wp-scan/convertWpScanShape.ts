import type {
  WpScanFinding,
  WpScanResult,
  WpScanContext,
  WpScanSeverities,
  WpScanComponent,
} from "./types";

function normalizeSeverity(value: unknown): WpScanSeverities {
  const severity = String(value ?? "").toLowerCase();

  if (["critical", "high", "medium", "low", "info"].includes(severity)) {
    return severity as WpScanSeverities;
  }

  return "unknown";
}

function firstCve(vuln: any): string | null {
  const refs = vuln?.references;
  const cves = refs?.cve;

  if (Array.isArray(cves) && cves.length > 0) {
    return `CVE-${cves[0]}`;
  }

  return null;
}

export const convertWpScanShape = (
  raw: any,
  context: WpScanContext,
): WpScanResult => {
  const components: WpScanComponent[] = [];
  const findings: WpScanFinding[] = [];

  const targetUrl = context.targetUrl;

  const coreVersion = raw?.version?.number ?? null;

  if (coreVersion) {
    components.push({
      scanId: context.scanId,
      targetUrl,
      type: "core",
      name: "WordPress",
      version: coreVersion,
      status: Array.isArray(raw?.version?.vulnerabilities)
      && raw.version.vulnerabilities.length > 0
        ? "vulnerable"
        : "outdated",
    });

    for (const vuln of raw.version.vulnerabilities ?? []) {
      findings.push({
        scanId: context.scanId,
        id: vuln.id,
        targetUrl,
        componentType: "core",
        componentName: "WordPress",
        installedVersion: coreVersion,
        title: vuln?.title ?? "WordPress core vulnerability",
        severity: normalizeSeverity(vuln?.severity),
        cve: firstCve(vuln),
        references: vuln?.references ?? {},
        source: "wpscan",
      });
    }
  }

  for (const [pluginName, plugin] of Object.entries<any>(raw?.plugins ?? {})) {
    const vulnerabilities = plugin?.vulnerabilities ?? [];

    components.push({
      scanId: context.scanId,
      targetUrl,
      type: "plugin",
      name: pluginName,
      version: plugin?.version?.number ?? null,
      status: vulnerabilities.length > 0 ? "vulnerable" : "outdated",
    });

    for (const vuln of vulnerabilities) {
      findings.push({
        scanId: context.scanId,
        id: vuln.id,
        targetUrl,
        componentType: "plugin",
        componentName: pluginName,
        installedVersion: plugin?.version?.number ?? null,
        title: vuln?.title ?? `${pluginName} vulnerability`,
        severity: normalizeSeverity(vuln?.severity),
        cve: firstCve(vuln),
        references: vuln?.references ?? {},
        source: "wpscan",
      });
    }
  }

  for (const [themeName, theme] of Object.entries<any>(raw?.themes ?? {})) {
    const vulnerabilities = theme?.vulnerabilities ?? [];

    components.push({
      scanId: context.scanId,
      targetUrl,
      type: "theme",
      name: themeName,
      version: theme?.version?.number ?? null,
      status: vulnerabilities.length > 0 ? "vulnerable" : "outdated",
    });

    for (const vuln of vulnerabilities) {
      findings.push({
        scanId: context.scanId,
        id: vuln.id,
        targetUrl,
        componentType: "theme",
        componentName: themeName,
        installedVersion: theme?.version?.number ?? null,
        title: vuln?.title ?? `${themeName} vulnerability`,
        severity: normalizeSeverity(vuln?.severity),
        cve: firstCve(vuln),
        references: vuln?.references ?? {},
        source: "wpscan",
      });
    }
  }

  return {
    raw,
    components,
    findings,
  };
}
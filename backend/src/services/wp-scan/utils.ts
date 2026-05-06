import {WpScanComponent, type WpScanSeverities} from "./types";

export const withRetry = async <T>(
  fn: () => Promise<T>,
  {
    retries,
    baseDelayMs,
    label,
  }: {
    retries: number;
    baseDelayMs: number;
    label: string;
  }
): Promise<T> => {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === retries) break;

      const delay = baseDelayMs * 2 ** attempt;

      console.warn(
        `[${label}] attempt ${attempt + 1} failed → retrying in ${delay}ms`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
};

export const assertValidUrl = (value: string): string => {
  const url = new URL(value);

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Target must be HTTP or HTTPS");
  }

  return url.toString();
};

export const fixedIn = (vuln: any): string | null => {
  return typeof vuln?.fixed_in === "string" ? vuln.fixed_in : null;
};

export const getComponentStatus = (options: {
  vulnerabilitiesCount: number;
  closed?: unknown;
  installedVersion?: string | null;
  latestVersion?: string | null;
}): WpScanComponent["status"] => {
  if (options.closed) return "closed";
  if (options.vulnerabilitiesCount > 0) return "vulnerable";

  if (
    options.installedVersion &&
    options.latestVersion &&
    options.installedVersion === options.latestVersion
  ) {
    return "up_to_date";
  }

  if (
    options.installedVersion &&
    options.latestVersion &&
    options.installedVersion !== options.latestVersion
  ) {
    return "outdated";
  }

  return "unknown";
};

export const normalizeSeverity = (value: unknown): WpScanSeverities => {
  const severity = String(value ?? "").toLowerCase();

  if (["critical", "high", "medium", "low", "info"].includes(severity)) {
    return severity as WpScanSeverities;
  }

  return "unknown";
}

export const firstCve = (vuln: any): string | null => {
  const raw = vuln?.references?.cve;

  if (!raw) return null;

  const value = Array.isArray(raw) ? raw[0] : raw;
  const cve = String(value);

  return cve.startsWith("CVE-") ? cve : `CVE-${cve}`;
}

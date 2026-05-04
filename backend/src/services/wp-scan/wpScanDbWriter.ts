import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  WpScanComponent,
  WpScanFinding,
  WpScanResult,
  WpScanContext,
} from "./types";

export const wpScanDbWriter = (
  supabase: SupabaseClient,
  context: WpScanContext
) => {
  let rawScan: unknown | null = null;
  let components: WpScanComponent[] = [];
  let findings: WpScanFinding[] = [];

  const ingest = (scan: WpScanResult) => {
    rawScan = scan.raw;
    components.push(...scan.components);
    findings.push(...scan.findings);
  };

  const flushRawScan = async () => {
    if (!rawScan) return;

    const { error } = await supabase.from("wpscan_raw_results").upsert({
      scan_id: context.scanId,
      target_url: context.targetUrl,
      raw_json: rawScan,
    });

    if (error) throw error;
  };

  const flushComponents = async () => {
    if (components.length === 0) return;

    const rows = components.map((component) => ({
      scan_id: component.scanId,
      target_url: component.targetUrl,
      component_type: component.type,
      name: component.name,
      version: component.version,
      status: component.status,
    }));

    const { error } = await supabase
      .from("wordpress_components")
      .upsert(rows);

    if (error) throw error;

    components = [];
  };

  const flushFindings = async () => {
    if (findings.length === 0) return;

    const rows = findings.map((finding) => ({
      scan_id: finding.scanId,
      target_url: finding.targetUrl,
      component_type: finding.componentType,
      component_name: finding.componentName,
      installed_version: finding.installedVersion,
      title: finding.title,
      severity: finding.severity,
      cve: finding.cve,
      references: finding.references,
      source: finding.source,
    }));

    const { error } = await supabase
      .from("wordpress_vulnerabilities")
      .upsert(rows);

    if (error) throw error;

    findings = [];
  };

  const flush = async () => {
    await flushRawScan();
    await flushComponents();
    await flushFindings();
  };

  return {
    ingest,
    flush,
  };
};
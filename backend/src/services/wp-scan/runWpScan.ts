import type { WpScanContext } from "./types";
import path from "node:path";
import type { SupabaseClient } from "@supabase/supabase-js";
import { assertValidUrl, withRetry } from "./utils";
import { wpScanDbWriter } from "./wpScanDbWriter";
import { convertWpScanShape } from "./convertWpScanShape";
import { runWpScanCli } from "./runWpScanCli";
import { debugLogger } from "./debugLogger";

export const runWpScan = async (options: {
  context: WpScanContext;
  supabase: SupabaseClient;
  onStage?: (percent: number) => Promise<void>;
  signal?: AbortSignal;
}) => {
  const { context, supabase, onStage, signal } = options;

  const writer = wpScanDbWriter(supabase, context);

  const log = debugLogger({
    enabled: true,
    directory: path.resolve(process.cwd(), "logs", "wpscan"),
    scanId: context.scanId,
    label: "wp-scan",
  });

  const writeStage = async (percent: number) => {
    await onStage?.(percent);
  };

  await writeStage(5);

  const targetUrl = assertValidUrl(context.targetUrl);

  await writeStage(15);

  const { json } = await withRetry(
    () =>
      runWpScanCli({
        url: targetUrl,
        signal,
      }),
    {
      retries: 1,
      baseDelayMs: 1500,
      label: "wp-scan",
    },
  );

  await writeStage(65);

  await log.write(json);

  const converted = convertWpScanShape(json, {
    ...context,
    targetUrl,
  });

  await writeStage(80);

  await writer.ingest(converted);

  await writer.flush();

  await writeStage(100);

  return {
    scanId: context.scanId,
    findingsCount: converted.findings.length,
    componentsCount: converted.components.length,
    interestingFindingsCount: converted.interestingFindings.length,
  };
};

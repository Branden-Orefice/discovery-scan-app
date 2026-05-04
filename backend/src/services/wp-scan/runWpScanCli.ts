import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const execFileAsync = promisify(execFile);

function safeFileName(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/[^a-zA-Z0-9.-]/g, "_");
}

export const runWpScanCli = async (options: {
  url: string;
  apiToken: string;
  outputDir?: string;
  timeoutMs?: number;
  signal?: AbortSignal;
}) => {
  const {
    url,
    apiToken,
    outputDir = "/app/scans",
    timeoutMs = 1000 * 60 * 15,
    signal,
  } = options;

  await fs.mkdir(outputDir, { recursive: true });

  const id = crypto.randomBytes(6).toString("hex");
  const outputPath = path.join(outputDir, `${safeFileName(url)}-${id}.json`);

  await execFileAsync(
    "wpscan",
    [
      "--url",
      url,
      "--format",
      "json",
      "--output",
      outputPath,
      "--api-token",
      apiToken,
      "--random-user-agent",
      "--disable-tls-checks",
    ],
    {
      signal,
      timeout: timeoutMs,
      maxBuffer: 1024 * 1024 * 20,
    },
  );

  const raw = await fs.readFile(outputPath, "utf8");

  return {
    outputPath,
    json: JSON.parse(raw),
  };
}
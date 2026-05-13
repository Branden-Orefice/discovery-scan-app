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
    outputDir = path.resolve(process.cwd(), "scans"),
    timeoutMs = 1000 * 60 * 15,
    signal,
  } = options;

  await fs.mkdir(outputDir, { recursive: true });

  const id = crypto.randomBytes(6).toString("hex");
  const outputPath = path.join(outputDir, `${safeFileName(url)}-${id}.json`);

  const args = [
    "--url",
    url,
    "--format",
    "json",
    "--output",
    outputPath,
    "--random-user-agent",
    "--disable-tls-checks",
  ];

  if (apiToken) {
    args.push("--api-token", apiToken);
  }

  await execFileAsync("wpscan", args, {
    signal,
    timeout: timeoutMs,
    maxBuffer: 1024 * 1024 * 20,
  });

  let json: unknown;

  try {
    const raw = await fs.readFile(outputPath, "utf8");
    json = JSON.parse(raw);
  } catch (error) {
    throw new Error(`Failed to parse JSON output from wpscan: ${error}`);
  } finally {
    await fs.rm(outputPath, { force: true });
  }

  return {
    json,
  };
};

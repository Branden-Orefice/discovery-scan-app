import { promises as fs } from "node:fs";
import path from "node:path";

export const debugLogger = (options: {
  enabled: boolean;
  directory: string;
  scanId: string;
  label: string;
})=> {
  const { enabled, directory, scanId, label } = options;

  const write = async (data: unknown) => {
    if (!enabled) return;

    await fs.mkdir(directory, { recursive: true });

    const filePath = path.join(directory, `${scanId}-${label}.json`);

    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  }

  return { write };
}
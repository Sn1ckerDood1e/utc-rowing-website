import { readFileSync } from "node:fs";
import { join } from "node:path";

const CONTENT_DIR = join(process.cwd(), "content");

export function readMarkdown(filename: string): string {
  return readFileSync(join(CONTENT_DIR, filename), "utf8");
}

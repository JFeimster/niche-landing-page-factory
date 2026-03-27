import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const sourceDir =
  process.env.MOONSHINE_SOURCE_DIR ||
  "C:\\Users\\jason\\OneDrive\\Desktop\\Vercel Projects\\Moonshine - JSON";
const targetDir = path.join(repoRoot, "data", "moonshine");

if (!existsSync(sourceDir)) {
  console.error(`[content:import] Source directory not found: ${sourceDir}`);
  process.exit(1);
}

mkdirSync(targetDir, { recursive: true });

const sourceFiles = readdirSync(sourceDir).filter((file) => file.endsWith(".json"));
if (sourceFiles.length === 0) {
  console.error(`[content:import] No .json files found in: ${sourceDir}`);
  process.exit(1);
}

for (const filename of sourceFiles) {
  cpSync(path.join(sourceDir, filename), path.join(targetDir, filename));
}

console.log(`[content:import] Imported ${sourceFiles.length} file(s) from "${sourceDir}" to "${targetDir}".`);

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const checks = {};
let failed = false;

function record(name, ok, detail) {
  checks[name] = { status: ok ? "PASSED" : "FAILED", detail };
  if (!ok) failed = true;
}

// 1. vercel.json rewrite check & no crons
try {
  const vercelPath = path.join(root, "vercel.json");
  const cfg = JSON.parse(fs.readFileSync(vercelPath, "utf8"));
  const rewrites = Array.isArray(cfg.rewrites) ? cfg.rewrites : [];
  const hasApiProxy = rewrites.some(
    (r) =>
      r.source === "/api/:path*" &&
      r.destination === "https://gainsfromgeebs-site.vercel.app/api/:path*"
  );
  const hasCrons = Array.isArray(cfg.crons) && cfg.crons.length > 0;
  record(
    "vercel_rewrites",
    hasApiProxy && !hasCrons,
    hasApiProxy && !hasCrons
      ? "Proxy rewrite configured correctly and no crons present"
      : `Invalid vercel.json: hasApiProxy=${hasApiProxy}, hasCrons=${hasCrons}`
  );
} catch (err) {
  record("vercel_rewrites", false, `Failed reading vercel.json: ${err.message}`);
}

// 2. Forbidden backend/stack directories
const forbiddenDirs = ["api", "app/api", "app/dm-bot", "app/gonzalo-uat", "supabase", ".cortex", ".serena", ".ai"];
const foundDirs = forbiddenDirs.filter((d) => fs.existsSync(path.join(root, d)));
record(
  "forbidden_directories",
  foundDirs.length === 0,
  foundDirs.length === 0 ? "No forbidden directories found" : `Forbidden dirs present: ${foundDirs.join(", ")}`
);

// 3. Forbidden env files
const forbiddenEnv = [".env", ".env.local", ".env.production", ".env.development"];
const foundEnv = forbiddenEnv.filter((f) => fs.existsSync(path.join(root, f)));
record(
  "forbidden_env_files",
  foundEnv.length === 0,
  foundEnv.length === 0 ? "No forbidden env files found" : `Forbidden env files present: ${foundEnv.join(", ")}`
);

// 4. Required attribution, layout, apply route, and policy files
const requiredFiles = [
  "app/layout.tsx",
  "components/GoogleAnalytics.tsx",
  "app/apply/page.tsx",
  "CLAUDE.md",
  ".github/CODEOWNERS",
  ".github/workflows/platform-integrity-gate.yml",
];
const missingFiles = requiredFiles.filter((f) => !fs.existsSync(path.join(root, f)));
record(
  "required_files",
  missingFiles.length === 0,
  missingFiles.length === 0 ? "All required layout, attribution, apply, and policy files exist" : `Missing: ${missingFiles.join(", ")}`
);

console.log(JSON.stringify({ checks, passed: !failed }, null, 2));
if (failed) process.exit(1);

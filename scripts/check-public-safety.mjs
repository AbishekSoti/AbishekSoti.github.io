import { readdir, readFile } from "node:fs/promises";
import { extname, relative, resolve } from "node:path";

const root = resolve(process.cwd());
const ignoredDirectories = new Set([".git", "node_modules", "dist", "coverage"]);
const privateDirectories = new Set([
  ".aws",
  ".ssh",
  "checkpoints",
  "datasets",
  "mlruns",
  "models",
  "private",
  "wandb",
]);
const blockedExtensions = new Set([
  ".ckpt",
  ".crt",
  ".h5",
  ".joblib",
  ".key",
  ".onnx",
  ".p12",
  ".pem",
  ".pickle",
  ".pkl",
  ".pt",
  ".pth",
  ".tfstate",
  ".tfvars",
]);
const textExtensions = new Set([
  "",
  ".cjs",
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".svg",
  ".toml",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
  ".yaml",
  ".yml",
]);

const contentRules = [
  {
    name: "AWS access key",
    pattern: /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/,
  },
  {
    name: "GitHub token",
    pattern: /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,})\b/,
  },
  {
    name: "OpenAI API key",
    pattern: /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/,
  },
  {
    name: "Google API key",
    pattern: /\bAIza[0-9A-Za-z_-]{35}\b/,
  },
  {
    name: "Slack token",
    pattern: /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/,
  },
  {
    name: "private-key material",
    pattern: /-----BEGIN (?:EC |OPENSSH |PGP |RSA )?PRIVATE KEY-----/,
  },
  {
    name: "credential-like assignment",
    pattern:
      /\b(?:api[_-]?key|client[_-]?secret|access[_-]?token|auth[_-]?token|password)\b\s*[:=]\s*["'][^"'$\s][^"'\r\n]{7,}["']/i,
  },
  {
    name: "local absolute path",
    pattern: /\/(?:Users|home)\/[^/\s"']+\//,
  },
  {
    name: "Windows user path",
    pattern: /\b[A-Z]:\\Users\\[^\\\s"']+\\/i,
  },
  {
    name: "Australian mobile number",
    pattern: /(?:\+?61[ -]?4|04)(?:[ -]?\d){8}\b/,
  },
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;

    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(path)));
    } else if (entry.isFile()) {
      files.push(path);
    }
  }

  return files;
}

const files = await walk(root);
const findings = [];

for (const path of files) {
  const file = relative(root, path).split("\\").join("/");
  const segments = file.split("/");
  const name = segments.at(-1);
  const extension = extname(name).toLowerCase();

  if (name === ".env" || name.startsWith(".env.")) {
    findings.push({ file, reason: "environment file" });
  }

  if (name === ".npmrc") {
    findings.push({ file, reason: "npm credentials file" });
  }

  if (segments.some((segment) => privateDirectories.has(segment))) {
    findings.push({ file, reason: "private or generated artifact directory" });
  }

  if (blockedExtensions.has(extension)) {
    findings.push({ file, reason: "private key, model, or state artifact" });
  }

  if (!textExtensions.has(extension)) continue;

  const content = await readFile(path, "utf8");
  for (const rule of contentRules) {
    if (rule.pattern.test(content)) {
      findings.push({ file, reason: rule.name });
    }
  }
}

const uniqueFindings = Array.from(
  new Map(findings.map((finding) => [`${finding.file}:${finding.reason}`, finding])).values(),
);

if (uniqueFindings.length) {
  console.error("Public safety check failed:");
  for (const finding of uniqueFindings) {
    console.error(`- ${finding.file}: ${finding.reason}`);
  }
  process.exitCode = 1;
} else {
  console.log(`Public safety check passed (${files.length} repository files inspected).`);
}

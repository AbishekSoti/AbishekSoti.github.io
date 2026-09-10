import { mkdir, copyFile } from "node:fs/promises";
import { join } from "node:path";
import { projects } from "../src/data/projects.js";

const distDir = "dist";
const indexPath = join(distDir, "index.html");

const routes = [
  "about",
  "projects",
  "skills",
  "engineering",
  "resume",
  "contact",
  ...projects.map((project) => `projects/${project.slug}`),
];

await copyFile(indexPath, join(distDir, "404.html"));

await Promise.all(
  routes.map(async (route) => {
    const routeDir = join(distDir, route);
    await mkdir(routeDir, { recursive: true });
    await copyFile(indexPath, join(routeDir, "index.html"));
  }),
);

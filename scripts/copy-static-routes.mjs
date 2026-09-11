import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { projects } from "../src/data/projects.js";
import {
  defaultMetadata,
  getProjectMetadata,
  routeMetadata,
  siteUrl,
} from "../src/data/siteMetadata.js";

const distDir = "dist";
const indexPath = join(distDir, "index.html");

const routes = [
  ...Object.entries(routeMetadata)
    .filter(([path]) => path !== "/")
    .map(([path, metadata]) => ({
      route: path.slice(1),
      metadata,
    })),
  ...projects.map((project) => ({
    route: `projects/${project.slug}`,
    metadata: getProjectMetadata(project),
  })),
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function replaceMeta(html, attribute, key, value) {
  const pattern = new RegExp(
    `(<meta\\s+[^>]*${attribute}="${key}"[^>]*content=")[^"]*("[^>]*>)`,
  );
  return html.replace(pattern, (_, start, end) => start + escapeHtml(value) + end);
}

function renderMetadata(html, path, metadata) {
  const url = new URL(path, siteUrl).href;
  let rendered = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${escapeHtml(metadata.title)}</title>`,
  );

  rendered = replaceMeta(rendered, "name", "description", metadata.description);
  rendered = replaceMeta(rendered, "property", "og:title", metadata.title);
  rendered = replaceMeta(rendered, "property", "og:description", metadata.description);
  rendered = replaceMeta(rendered, "property", "og:url", url);
  rendered = replaceMeta(rendered, "name", "twitter:title", metadata.title);
  rendered = replaceMeta(rendered, "name", "twitter:description", metadata.description);
  rendered = rendered.replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*("[^>]*>)/,
    (_, start, end) => start + escapeHtml(url) + end,
  );

  return rendered;
}

const sourceHtml = await readFile(indexPath, "utf8");
await writeFile(indexPath, renderMetadata(sourceHtml, "/", defaultMetadata), "utf8");

await Promise.all(
  routes.map(async ({ route, metadata }) => {
    const routeDir = join(distDir, route);
    await mkdir(routeDir, { recursive: true });
    await writeFile(
      join(routeDir, "index.html"),
      renderMetadata(sourceHtml, `/${route}`, metadata),
      "utf8",
    );
  }),
);

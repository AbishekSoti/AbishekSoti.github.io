import { readFile, writeFile } from "node:fs/promises";
import { XMLParser } from "fast-xml-parser";

const outputPath = new URL("../src/data/radar.generated.json", import.meta.url);
const parser = new XMLParser({
  ignoreAttributes: false,
  parseTagValue: false,
  processEntities: true,
  trimValues: true,
});
const requestHeaders = {
  Accept: "application/json, application/rss+xml, application/xml, text/xml;q=0.9",
  "User-Agent": "AbishekSoti-portfolio-radar/1.0",
};
const relevanceTerms = [
  "acoustic",
  "audio",
  "computer vision",
  "deployment",
  "edge",
  "efficient",
  "embedded",
  "event camera",
  "inference",
  "machine learning",
  "pytorch",
  "signal",
  "vision",
];
const lowSignalTerms = [
  "community",
  "conference",
  "event",
  "meetup",
  "summit",
  "workshop",
];

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function cleanText(value) {
  return String(value ?? "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .replace(/^arXiv:\S+\s+Announce Type:\s+\w+\s+Abstract:\s*/i, "")
    .trim();
}

function clip(value, maximum = 190) {
  const text = cleanText(value);
  if (text.length <= maximum) return text;

  const candidate = text.slice(0, maximum + 1);
  const lastSpace = candidate.lastIndexOf(" ");
  return candidate.slice(0, lastSpace > maximum * 0.72 ? lastSpace : maximum).trim() + "...";
}

function normaliseDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
}

function normaliseUrl(value) {
  const text = cleanText(typeof value === "object" ? value?.["#text"] ?? value?.["@_href"] : value);
  if (!text) return null;

  try {
    const url = new URL(text);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

function relevanceScore(value) {
  const text = cleanText(value).toLowerCase();
  const relevantScore = relevanceTerms.reduce(
    (score, term) => score + (text.includes(term) ? 1 : 0),
    0,
  );
  const lowSignalPenalty = lowSignalTerms.reduce(
    (score, term) => score + (text.includes(term) ? 2 : 0),
    0,
  );

  return relevantScore - lowSignalPenalty;
}

async function request(url, accept = requestHeaders.Accept) {
  const response = await fetch(url, {
    headers: { ...requestHeaders, Accept: accept },
    signal: AbortSignal.timeout(20_000),
  });

  if (!response.ok) {
    throw new Error(`${response.status} from ${new URL(url).hostname}`);
  }

  return response;
}

async function fetchRssItems(url) {
  const response = await request(url, "application/rss+xml, application/xml, text/xml");
  const document = parser.parse(await response.text());
  return asArray(document?.rss?.channel?.item);
}

function rssLink(item) {
  return normaliseUrl(item?.link) || normaliseUrl(item?.guid);
}

function selectRelevant(items, limit = 12) {
  return items
    .slice(0, limit)
    .map((item, index) => ({
      item,
      index,
      score: relevanceScore(`${item?.title ?? ""} ${item?.description ?? ""}`),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)[0]?.item;
}

function selectTechnical(items, limit = 12) {
  const candidates = items
    .slice(0, limit)
    .filter((item) => !/(conference|community|contributors?|foundation|joins|meetup|member|sessions?|summit|workshop|welcomes)/i.test(cleanText(item?.title)));

  return selectRelevant(candidates.length ? candidates : items, limit);
}

function fromRss({ id, source, topic, item }) {
  const href = rssLink(item);
  const title = clip(item?.title, 110);
  if (!href || !title) throw new Error(`${source} returned an incomplete item`);

  return {
    id,
    source,
    topic,
    title,
    description: clip(
      item?.description ?? item?.["content:encoded"] ?? "Open the source for the full release.",
    ),
    href,
    publishedAt: normaliseDate(item?.pubDate ?? item?.["dc:date"]),
  };
}

async function loadHuggingFace() {
  const response = await request(
    "https://huggingface.co/api/daily_papers?limit=50",
    "application/json",
  );
  const entries = await response.json();
  const ranked = asArray(entries)
    .map((entry, index) => {
      const paper = entry?.paper ?? entry;
      return {
        entry,
        index,
        score: relevanceScore(
          `${paper?.title ?? entry?.title ?? ""} ${paper?.summary ?? entry?.summary ?? ""}`,
        ),
      };
    })
    .sort((a, b) => b.score - a.score || a.index - b.index);

  const entry = ranked[0]?.entry;
  const paper = entry?.paper ?? entry;
  const id = cleanText(paper?.id);
  const title = clip(paper?.title ?? entry?.title, 110);
  if (!id || !title) throw new Error("Hugging Face returned an incomplete paper");

  return {
    id: "hugging-face",
    source: "Hugging Face Papers",
    topic: "Machine-learning research",
    title,
    description: clip(paper?.ai_summary ?? paper?.summary ?? entry?.summary),
    href: `https://huggingface.co/papers/${encodeURIComponent(id)}`,
    publishedAt: normaliseDate(
      paper?.submittedOnDailyAt ?? entry?.publishedAt ?? paper?.publishedAt,
    ),
  };
}

async function loadPyTorch() {
  const items = await fetchRssItems("https://pytorch.org/feed/");
  return fromRss({
    id: "pytorch",
    source: "PyTorch Blog",
    topic: "ML systems practice",
    item: selectTechnical(items),
  });
}

async function loadGitHub() {
  const items = await fetchRssItems("https://github.blog/feed/");
  return fromRss({
    id: "github",
    source: "GitHub Blog",
    topic: "Software engineering",
    item: selectRelevant(items),
  });
}

async function loadArxiv() {
  const items = await fetchRssItems("https://rss.arxiv.org/rss/eess.AS");
  return fromRss({
    id: "arxiv",
    source: "arXiv eess.AS",
    topic: "Audio and acoustics",
    item: selectRelevant(items, 20),
  });
}

async function readPrevious() {
  try {
    return JSON.parse(await readFile(outputPath, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return { updatedAt: null, items: [] };
    throw error;
  }
}

const sourceLoaders = [
  ["hugging-face", loadHuggingFace],
  ["pytorch", loadPyTorch],
  ["github", loadGitHub],
  ["arxiv", loadArxiv],
];

const previous = await readPrevious();
const previousById = new Map(asArray(previous.items).map((item) => [item.id, item]));
const settled = await Promise.allSettled(sourceLoaders.map(([, load]) => load()));
const freshById = new Map();
const failures = [];

settled.forEach((result, index) => {
  const [id] = sourceLoaders[index];
  if (result.status === "fulfilled") {
    freshById.set(id, result.value);
  } else {
    failures.push(`${id}: ${result.reason?.message ?? "request failed"}`);
  }
});

if (freshById.size < 2) {
  throw new Error(`Research radar update stopped; too few public sources responded. ${failures.join(" | ")}`);
}

const items = sourceLoaders
  .map(([id]) => freshById.get(id) ?? previousById.get(id))
  .filter(Boolean);

if (items.length < 3) {
  throw new Error("Research radar update stopped; fewer than three safe entries are available.");
}

if (failures.length) {
  console.warn(`Using the previous entry for unavailable sources: ${failures.join(" | ")}`);
}

if (JSON.stringify(items) === JSON.stringify(previous.items)) {
  console.log("Research radar is already current.");
} else {
  const output = {
    updatedAt: new Date().toISOString(),
    items,
  };
  await writeFile(outputPath, JSON.stringify(output, null, 2) + "\n", "utf8");
  console.log(`Updated research radar from ${freshById.size} public sources.`);
}

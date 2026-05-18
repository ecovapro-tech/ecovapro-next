import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;        // ISO
  author: string;
  readTime: string;
  html: string;
  body: string;
}

export function listSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPost(slug: string): BlogPost | null {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const html = marked.parse(content, { async: false }) as string;
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? new Date().toISOString(),
    author: data.author ?? "EcovaPro",
    readTime: data.readTime ?? "5 min read",
    body: content,
    html,
  };
}

export function listPosts(): BlogPost[] {
  return listSlugs()
    .map((s) => getPost(s))
    .filter((p): p is BlogPost => !!p)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

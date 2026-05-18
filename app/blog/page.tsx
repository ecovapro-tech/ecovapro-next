import Link from "next/link";
import PageShell from "@/components/PageShell";
import { listPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cleaning advice & guides for London — EcovaPro Blog",
  description: "Practical cleaning guides for London tenants, landlords, and homeowners. Prices, checklists, and how-to articles from EcovaPro.",
  path: "/blog",
});

export default function BlogIndex() {
  const posts = listPosts();
  return (
    <PageShell>
      <section className="bg-white">
        <div className="max-w-wrap mx-auto px-5 md:px-8 py-20">
          <span className="block text-[11px] font-bold tracking-[3px] text-green uppercase mb-3.5">Blog</span>
          <h1 className="font-serif font-black text-charcoal text-[clamp(34px,5vw,56px)] leading-tight tracking-tight mb-4">
            Cleaning advice for London.
          </h1>
          <p className="text-gray-700 max-w-[640px] leading-[1.8] mb-12">
            Practical guides for tenants, landlords, hosts, and homeowners. Real numbers, real checklists, written by the team that does the work.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="block border border-gray-200 rounded-2xl p-7 hover:border-green hover:shadow transition">
                <div className="text-xs text-gray-500 mb-2">
                  {new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {p.readTime}
                </div>
                <h2 className="font-serif font-extrabold text-charcoal text-xl md:text-2xl mb-3 leading-tight">{p.title}</h2>
                <p className="text-gray-700 leading-[1.7] mb-4">{p.description}</p>
                <span className="text-green font-bold text-sm">Read article →</span>
              </Link>
            ))}
            {posts.length === 0 && (
              <div className="text-gray-500">No posts yet. Add markdown files to <code>content/blog</code>.</div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

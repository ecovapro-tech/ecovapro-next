import Link from "next/link";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import JsonLd from "@/components/JsonLd";
import { getPost, listSlugs } from "@/lib/blog";
import { buildMetadata, SITE_URL, breadcrumbJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  return listSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) return {};
  return buildMetadata({
    title: p.title,
    description: p.description,
    path: `/blog/${p.slug}`,
    type: "article",
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "EcovaPro", logo: { "@type": "ImageObject", url: `${SITE_URL}/og-default.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
  };

  return (
    <PageShell>
      <article className="bg-white">
        <div className="max-w-[760px] mx-auto px-5 md:px-8 py-14 md:py-20">
          <nav aria-label="Breadcrumb" className="text-xs text-gray-500 mb-6">
            <Link href="/" className="hover:text-green">Home</Link> / <Link href="/blog" className="hover:text-green">Blog</Link>
          </nav>
          <div className="text-xs text-gray-500 mb-3">
            {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {post.readTime} · {post.author}
          </div>
          <h1 className="font-serif font-black text-charcoal text-[clamp(30px,4.5vw,46px)] leading-tight tracking-tight mb-6">
            {post.title}
          </h1>
          <div className="prose-ecova" dangerouslySetInnerHTML={{ __html: post.html }} />
          <div className="mt-14 pt-8 border-t border-gray-200">
            <p className="text-gray-700 mb-4">Need a quote in 60 seconds?</p>
            <Link href="/" className="bg-green text-white rounded-lg px-6 py-3 font-bold hover:bg-green-deep">
              Get my price
            </Link>
          </div>
        </div>
      </article>

      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }])} />
    </PageShell>
  );
}

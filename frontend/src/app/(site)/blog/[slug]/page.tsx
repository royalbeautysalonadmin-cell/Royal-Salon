import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Clock, ChevronRight, ArrowUpRight } from "lucide-react";
import { FaqSection } from "@/components/shared/FaqSection";
import { CtaBand } from "@/components/shared/CtaBand";
import { JsonLd } from "@/components/shared/JsonLd";
import {
  blogPosts,
  blogPostBySlug,
  categoryBySlug,
} from "@/data/seo-data";
import { siteConfig } from "@/lib/site";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostBySlug(slug);
  if (!post) return {};
  const canonical = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.metaDescription,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description: post.metaDescription,
      publishedTime: post.date,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.heading }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostBySlug(slug);
  if (!post) notFound();

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const fallbackRelated =
    related.length < 3
      ? blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)
      : related;

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: post.title,
            description: post.metaDescription,
            slug: post.slug,
            image: post.image,
            date: post.date,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.heading, path: `/blog/${post.slug}` },
          ]),
          ...(post.faqs.length ? [faqJsonLd(post.faqs)] : []),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-luxury-black pt-32 pb-14 text-white sm:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-luxury-radial opacity-60" />
        <div className="container-luxury relative max-w-3xl">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-white/50">
            <Link href="/" className="hover:text-gold">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/blog" className="hover:text-gold">Blog</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gold">{post.category}</span>
          </nav>
          <div className="mt-5 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-gold-300">
            <span>{post.category}</span>
            <span className="h-1 w-1 rounded-full bg-gold/50" />
            <span className="flex items-center gap-1 text-white/50">
              <Clock className="h-3 w-3" /> {post.readMinutes} min read
            </span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight md:text-5xl text-balance">
            {post.heading}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
            {post.excerpt}
          </p>
          <p className="mt-5 text-sm text-white/50">
            Published {formatDate(post.date)} · Royal Beauty Salon, Warsaw
          </p>
        </div>
      </section>

      {/* Cover image */}
      <div className="bg-white">
        <div className="container-luxury max-w-4xl">
          <div className="relative -mt-10 aspect-[16/9] overflow-hidden rounded-3xl shadow-luxury">
            <Image
              src={post.image}
              alt={post.heading}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Article body */}
      <article className="bg-white py-14">
        <div className="container-luxury max-w-3xl">
          <div className="space-y-5">
            {post.intro.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-charcoal/80">{p}</p>
            ))}
          </div>

          <div className="mt-10 space-y-10">
            {post.sections.map((section, i) => (
              <div key={i}>
                <h2 className="font-serif text-2xl font-semibold text-luxury-black sm:text-[1.7rem]">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-4">
                  {section.body.map((p, j) => (
                    <p key={j} className="text-base leading-relaxed text-charcoal/75">{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Related services CTA inline */}
          {post.relatedCategories.length > 0 && (
            <div className="mt-12 rounded-3xl border border-brown/10 bg-cream p-7">
              <h2 className="font-serif text-xl font-semibold text-luxury-black">
                Related treatments at Royal Beauty Salon
              </h2>
              <p className="mt-2 text-sm text-charcoal/70">
                Ready to put these tips into practice? Explore our services in Warsaw.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.relatedCategories.map((catSlug) => {
                  const cat = categoryBySlug(catSlug);
                  if (!cat) return null;
                  return (
                    <Link
                      key={catSlug}
                      href={`/services/${catSlug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-brown shadow-sm transition-colors hover:bg-brown hover:text-white"
                    >
                      {cat.label}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </article>

      <FaqSection eyebrow="FAQ" faqs={post.faqs} />

      {/* Related posts */}
      {fallbackRelated.length > 0 && (
        <section className="bg-cream py-16 sm:py-20">
          <div className="container-luxury">
            <h2 className="mb-10 text-center font-serif text-3xl font-semibold text-luxury-black">
              Keep reading
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {fallbackRelated.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxury"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.heading}
                      fill
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-medium uppercase tracking-wider text-brown">
                      {p.category}
                    </span>
                    <h3 className="mt-2 font-serif text-base font-semibold leading-snug text-luxury-black group-hover:text-brown">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title="Book your appointment in Warsaw"
        description="Our team is ready to help you look and feel your best. Reserve your spot at Royal Beauty Salon today."
      />
    </>
  );
}

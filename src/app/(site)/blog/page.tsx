import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { CtaBand } from "@/components/shared/CtaBand";
import { JsonLd } from "@/components/shared/JsonLd";
import { blogPosts } from "@/data/seo-data";
import { siteConfig } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Beauty Blog — Expert Hair, Skin & Makeup Tips in Warsaw",
  description:
    "Beauty tips, guides and advice from the experts at Royal Beauty Salon in Warsaw — hair care, skincare, makeup, bridal prep, waxing and more.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    type: "website",
    url: `${siteConfig.url}/blog`,
    title: "Beauty Blog | Royal Beauty Salon Warsaw",
    description:
      "Expert beauty tips and guides from Royal Beauty Salon in Warsaw — hair, skin, makeup and bridal advice.",
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: "Royal Beauty Salon Blog" }],
  },
};

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const [featured, ...rest] = posts;

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Royal Beauty Salon Blog",
    url: `${siteConfig.url}/blog`,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${siteConfig.url}/blog/${p.slug}`,
      datePublished: p.date,
      image: p.image,
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          blogJsonLd,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Beauty Journal"
        title="Tips, Guides & Beauty Inspiration"
        description="Expert advice from our stylists, makeup artists and skin therapists in Warsaw — to help you look and feel your best between visits."
        breadcrumb="Blog"
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-luxury">
          {/* Featured post */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl border border-brown/10 bg-cream shadow-soft transition-shadow hover:shadow-luxury lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
                <Image
                  src={featured.image}
                  alt={featured.heading}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-brown">
                  <span>{featured.category}</span>
                  <span className="h-1 w-1 rounded-full bg-brown/40" />
                  <span className="flex items-center gap-1 text-charcoal/70">
                    <Clock className="h-3 w-3" /> {featured.readMinutes} min read
                  </span>
                </div>
                <h2 className="mt-3 font-serif text-2xl font-semibold leading-tight text-luxury-black group-hover:text-brown sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-charcoal/70">
                  {featured.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brown">
                  Read article
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          )}

          {/* Post grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-brown/10 bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-luxury"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.heading}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-brown">
                    {post.category}
                    <span className="h-1 w-1 rounded-full bg-brown/40" />
                    <span className="flex items-center gap-1 text-charcoal/70">
                      <Clock className="h-3 w-3" /> {post.readMinutes} min
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-luxury-black group-hover:text-brown">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-charcoal/70">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto pt-4 text-xs text-charcoal/70">
                    {formatDate(post.date)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Inspired to treat yourself?"
        description="Turn beauty tips into results. Book your appointment at Royal Beauty Salon in central Warsaw."
      />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { articles, articlesByNewest, getArticle } from "@/content/articles";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { ArticleBody } from "@/components/ui/Prose";
import { ArrowRight, Button, TextLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/articles/${article.id}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      url: `/articles/${article.id}`,
      publishedTime: article.date,
      authors: [article.author],
      tags: [...article.tags],
    },
  };
}

const dateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const index = articlesByNewest.findIndex((a) => a.id === article.id);
  const newer = articlesByNewest[index - 1];
  const older = articlesByNewest[index + 1];

  /** schema.org Article, per the SEO items in §2 of the audit. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Person", name: site.legalName },
    mainEntityOfPage: `${site.url}/articles/${article.id}`,
    keywords: article.tags.join(", "),
  };

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden border-b border-line bg-canvas pt-14 pb-12 sm:pt-16 lg:pt-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="pattern-khatim absolute inset-0 text-teal-900/[0.04]" />
          </div>

          <Container>
            <div className="max-w-[42rem]">
              <Eyebrow>{article.tags[0] ?? "Article"}</Eyebrow>
              <h1 className="mt-5 text-h1 font-bold text-ink">
                {article.title}
              </h1>
              <p className="mt-5 max-w-[36rem] text-lead text-body">
                {article.excerpt}
              </p>
              <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted">
                <span className="font-semibold text-ink">{article.author}</span>
                <span aria-hidden="true">&middot;</span>
                <time dateTime={article.date}>
                  {dateFormat.format(new Date(article.date))}
                </time>
                <span aria-hidden="true">&middot;</span>
                <span>{article.readingMinutes} min read</span>
              </p>
            </div>
          </Container>
        </header>

        <Section tone="canvas">
          <ArticleBody blocks={article.content} />

          <div className="mt-12 flex max-w-[36rem] flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8">
            <p className="text-sm text-muted">
              Found this useful? It is free because people give.
            </p>
            <TextLink href="/donate">Support the work</TextLink>
          </div>
        </Section>
      </article>

      <Section tone="surface" labelledBy="more-articles" className="py-14 lg:py-20">
        <h2 id="more-articles" className="text-h2 font-bold">
          Keep reading
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {[newer, older].filter(Boolean).map((other) => (
            <Link
              key={other.id}
              href={`/articles/${other.id}`}
              className="glass-surface-light glass-rim-light group/btn flex h-full flex-col rounded-card p-7 transition-[box-shadow,transform] duration-500 ease-ios hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span className="font-sans text-eyebrow font-semibold text-muted uppercase">
                {other === newer ? "Newer" : "Older"}
              </span>
              <span className="mt-3 font-display text-h3 font-bold text-ink">
                {other.title}
              </span>
              <span className="mt-3 grow text-[0.9375rem]/relaxed text-body">
                {other.excerpt}
              </span>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700">
                Read this
                <ArrowRight />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Button href="/articles" variant="secondary">
            All articles
          </Button>
        </div>
      </Section>

      <script
        type="application/ld+json"
        // Author-controlled content from the local content module.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

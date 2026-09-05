import type { Metadata } from "next";
import Link from "next/link";
import { articlesByNewest } from "@/content/articles";
import { site } from "@/content/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { ArrowRight } from "@/components/ui/Button";

const lead =
  "Writing on Qur'anic study, family life, and the practical business of holding onto faith in a demanding week.";

export const metadata: Metadata = {
  title: "Articles",
  description: lead,
  alternates: { canonical: "/articles" },
  openGraph: {
    title: `Articles — ${site.name}`,
    description: lead,
    url: "/articles",
  },
};

const dateFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

export default function ArticlesPage() {
  const [lead0, ...rest] = articlesByNewest;

  return (
    <>
      <PageHeader eyebrow="Articles" title="Reading and reflection" lead={lead} />

      <Section tone="canvas" aura labelledBy="article-list">
        <h2 id="article-list" className="sr-only">
          All articles
        </h2>

        {/* The newest piece gets a wider treatment. A uniform grid of equal
            cards reads as an archive; one lead item reads as an editor having
            made a choice. */}
        <article className="glass-surface-light glass-rim-light rounded-card p-8 sm:p-10">
          <ArticleMeta article={lead0} />
          <h3 className="mt-5 max-w-[24ch] text-h2 font-bold">
            <Link href={`/articles/${lead0.id}`} className="hover:text-teal-700">
              {lead0.title}
            </Link>
          </h3>
          <p className="mt-4 max-w-[38rem] text-lead text-body">
            {lead0.excerpt}
          </p>
          <Link
            href={`/articles/${lead0.id}`}
            className="group/link mt-7 inline-flex items-center gap-1.5 font-semibold text-teal-700 underline-offset-4 hover:underline"
          >
            Read this
            <ArrowRight />
          </Link>
        </article>

        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {rest.map((article) => (
            <li key={article.id}>
              <Link
                href={`/articles/${article.id}`}
                className="glass-surface-light glass-rim-light group/btn flex h-full flex-col rounded-card p-7 transition-[box-shadow,transform] duration-500 ease-ios hover:-translate-y-1 hover:shadow-card-hover"
              >
                <ArticleMeta article={article} />
                <h3 className="mt-4 text-h3 font-bold">{article.title}</h3>
                <p className="mt-3 grow text-[0.9375rem]/relaxed text-body">
                  {article.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700">
                  Read this
                  <ArrowRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

function ArticleMeta({
  article,
}: {
  article: (typeof articlesByNewest)[number];
}) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-eyebrow font-semibold text-muted uppercase">
      {article.tags.map((tag) => (
        <span
          key={tag}
          className="rounded-pill bg-teal-50 px-2.5 py-1 text-teal-700"
        >
          {tag}
        </span>
      ))}
      <time dateTime={article.date}>
        {dateFormat.format(new Date(article.date))}
      </time>
      <span aria-hidden="true">&middot;</span>
      <span>{article.readingMinutes} min read</span>
    </p>
  );
}

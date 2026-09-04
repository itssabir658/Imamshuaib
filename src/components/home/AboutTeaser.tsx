import Image from "next/image";
import { stats } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TextLink } from "@/components/ui/Button";

export function AboutTeaser() {
  return (
    <Section id="about" labelledBy="about-title" tone="canvas">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="relative mx-auto w-full max-w-md lg:mx-0">
          {/* Offset gold rule behind the photo — the same arch language as the hero. */}
          <div
            aria-hidden="true"
            className="absolute -top-4 -left-4 h-full w-full rounded-[2rem] border border-gold-500/45"
          />
          <div className="relative overflow-hidden rounded-[2rem] bg-teal-100 shadow-card">
            <Image
              src="/images/imam-shuaib-reading-quran.webp"
              alt="Imam Shuaib seated with an open Qur'an in his study, bookshelves behind him"
              width={1707}
              height={2560}
              sizes="(max-width: 1024px) 90vw, 28rem"
              className="h-full w-full object-cover"
            />
          </div>

          <figure className="relative z-10 -mt-12 ml-auto w-[85%] rounded-r-2xl border border-l-[3px] border-line border-l-gold-500 bg-surface px-7 py-6 shadow-card sm:-mt-14">
            <blockquote className="font-display text-quote font-medium text-ink">
              &ldquo;I want the person at the back of the hall to walk out
              understanding the ayah as well as the person at the front.&rdquo;
            </blockquote>
            <figcaption className="mt-4 font-sans text-sm font-medium text-muted">
              Imam Shuaib
            </figcaption>
          </figure>
        </div>

        <div>
          <Eyebrow>Get to know Imam Shuaib</Eyebrow>
          <h2 id="about-title" className="mt-5 text-h2 font-bold">
            A global life, brought back to one classroom
          </h2>

          <div className="mt-6 flex max-w-[35rem] flex-col gap-5 text-lead">
            <p>
              Imam Shuaib is an educator and community leader with a passion for
              clear, heartfelt Islamic teaching. Born in India, raised in
              Nigeria, and educated in America, he brings a global perspective
              to his guidance.
            </p>
            <p>
              Through personal stories and prophetic wisdom, he helps Muslims
              &mdash; men and women, teenagers and grandparents &mdash; find
              purpose and clarity in the life they are actually living.
            </p>
          </div>

          <div className="mt-8">
            <TextLink href="/about">Read my full story</TextLink>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-9 sm:grid-cols-4">
            {stats.map((s) => (
              // Reversed visually so the number reads first; the DOM keeps
              // term-then-definition order for assistive tech.
              <div key={s.label} className="flex flex-col-reverse gap-2">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="font-display text-[2rem] leading-[1.05] font-bold tabular-nums text-teal-700 sm:text-[2.25rem]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

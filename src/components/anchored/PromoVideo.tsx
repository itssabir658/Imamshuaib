import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { Label, Rule } from "./Type";

/**
 * "Promo video goes directly under the hero section." — the brief.
 *
 * The supplied cut is 464×832 — vertical, 9:16, 66 seconds — not the
 * widescreen film this slot was first built for. That is the right shape for
 * where the traffic comes from: a brief that says WhatsApp and Instagram is a
 * brief that says people are holding a phone.
 *
 * So the player is phone-shaped, capped at the footage's own 464px, and
 * centred between two rules, which turns a lone vertical video on a wide
 * desktop from an orphan into a deliberate plate in the document. Beyond
 * 464px the footage visibly softens, so it is never allowed to scale past it.
 *
 * Captions: a promo carrying its pitch in speech needs them (WCAG 1.2.2), and
 * this page's audience arrives from feeds they scroll with the sound off — so
 * a missing track is called out on the page rather than noted in a file
 * nobody reads.
 */
export function PromoVideo() {
  const video = anchored.video;

  return (
    <section aria-labelledby="promo-video" className="bg-ivory pb-20 sm:pb-24">
      <h2 id="promo-video" className="sr-only">
        Promo video
      </h2>

      <Container>
        <Rule fleuron={false} />

        <div className="flex flex-col items-center py-14 sm:py-16">
          {video ? (
            <>
              <video
                controls
                playsInline
                preload="metadata"
                poster={video.poster ?? undefined}
                width={video.width}
                height={video.height}
                className="w-full max-w-[29rem] rounded-[2px] bg-charcoal ring-1 ring-sand-400"
              >
                <source src={video.src} type="video/mp4" />
                {video.captions ? (
                  <track
                    kind="captions"
                    src={video.captions}
                    srcLang="en"
                    label="English"
                    default
                  />
                ) : null}
              </video>

              {video.captions ? null : (
                <p className="mt-6 max-w-sm text-center font-sans text-sm text-sand-700">
                  <span aria-hidden="true">⚠️ </span>
                  No captions track yet. If anyone speaks in this video it fails
                  WCAG 1.2.2 — and most of this page&rsquo;s traffic arrives
                  from feeds people scroll with the sound off.
                </p>
              )}
            </>
          ) : (
            <div className="flex aspect-[464/832] w-full max-w-[29rem] flex-col items-center justify-center gap-5 rounded-[2px] bg-sand-50 px-6 text-center ring-1 ring-sand-400">
              <PlayGlyph />
              <Label>Promo video</Label>
              <p className="max-w-xs font-sans text-sm text-sand-700">
                <span aria-hidden="true">⚠️ </span>
                Not supplied. The brief places it here, directly under the hero.
              </p>
            </div>
          )}
        </div>

        <Rule fleuron={false} />
      </Container>
    </section>
  );
}

function PlayGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className="size-14 text-sand-500"
    >
      <circle cx="24" cy="24" r="23" />
      <path d="M19.5 15.8v16.4L33 24Z" strokeLinejoin="round" />
    </svg>
  );
}

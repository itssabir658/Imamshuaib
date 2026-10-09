import { anchored } from "@/content/anchored";
import { Container } from "@/components/ui/Container";
import { PromoPlayer } from "./PromoPlayer";
import { QuoteFigure } from "./Quote";
import { Label } from "./Type";

/**
 * "Promo video goes directly under the hero section." — the brief.
 *
 * The supplied cut is 464×832: vertical, 66 seconds, phone footage. That is
 * the right shape for where the traffic comes from — a brief naming WhatsApp
 * and Instagram is a brief saying people are holding a phone — so the player
 * is phone-shaped and capped at the footage's own 464px, because past that it
 * visibly softens.
 *
 * It sits on charcoal, continuing the dark mass down from the masthead's
 * right-hand panel rather than starting a new stripe, and it is paired with
 * the first pull quote instead of being centred alone in a wide band. A
 * vertical video on a desktop page is an orphan unless something is set
 * against it; the quote is what the copy document already offers for exactly
 * this job.
 *
 * Captions are OPEN — burned into the picture for the video's whole length,
 * which is what this page's audience needs anyway, since they arrive from
 * feeds they scroll with the sound off. WCAG 1.2.2 accepts open captions, so
 * the `<track>` in PromoPlayer is optional rather than missing; it renders
 * only if a .vtt is ever supplied, and would add the things burned-in text
 * cannot — captions you can switch off, resize, or send to a braille display.
 */
export function PromoVideo() {
  const video = anchored.video;

  return (
    <section
      aria-labelledby="promo-video"
      className="bg-charcoal pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28"
    >
      <h2 id="promo-video" className="sr-only">
        Promo video
      </h2>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[29rem_minmax(0,1fr)] lg:gap-24">
          <div className="flex flex-col items-center lg:items-start">
            {video ? (
              <PromoPlayer
                src={video.src}
                width={video.width}
                height={video.height}
                duration={video.duration}
                poster={video.poster}
                captions={video.captions}
              />
            ) : (
              <div className="flex aspect-[9/16] w-full max-w-[29rem] flex-col items-center justify-center gap-5 rounded-[2px] bg-charcoal-800 px-6 text-center ring-1 ring-sand-500/40">
                <PlayGlyph />
                <Label tone="paper">Promo video</Label>
                <p className="max-w-xs font-sans text-sm text-sand-300">
                  <span aria-hidden="true">⚠️ </span>
                  Not supplied. The brief places it here, directly under the
                  hero.
                </p>
              </div>
            )}
          </div>

          <QuoteFigure
            index={0}
            align="start"
            className="anchored-rise max-w-xl"
          />
        </div>
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

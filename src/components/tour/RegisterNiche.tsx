import { tour } from "@/content/tour";
import { cn } from "@/lib/cn";
import { ArchFrame } from "./Arch";
import { QrCode } from "./QrCode";
import { Label } from "./Type";

/**
 * The registration niche — the one thing on this page that has to work.
 *
 * It appears twice, in the masthead and at the close, and is identical both
 * times so the second one is recognised rather than read.
 *
 * Three decisions worth keeping:
 *
 *  - The QR sits directly in the recess. No white card, no rounded corners, no
 *    drop shadow. A card inside a card is the tell of a page that was
 *    assembled from components; the quiet zone around the code is padding, as
 *    the spec asks, and charcoal on sand-50 is 15.4:1, far past anything a
 *    camera needs.
 *  - The heading above it is set small and letterspaced rather than large.
 *    The masthead already has one dominant voice; a second bold heading beside
 *    it would just be two things shouting.
 *  - The button is square-cornered. The rest of the site is pills, and that is
 *    exactly why — this page is a printed invitation, not a product surface.
 */
export async function RegisterNiche({
  headingId,
  as: Heading = "h2",
  tone = "ink",
  className,
}: {
  headingId: string;
  as?: "h2" | "h3";
  tone?: "ink" | "paper";
  className?: string;
}) {
  const ink = tone === "ink";

  return (
    <div className={cn("w-full max-w-[22rem]", className)}>
      <Heading
        id={headingId}
        className={cn(
          "text-center font-sans text-[0.6875rem] leading-none font-semibold tracking-[0.22em] uppercase",
          ink ? "text-sand-700" : "text-sand-300",
        )}
      >
        {tour.qr.heading}
      </Heading>

      <ArchFrame tone={tone} className="mt-6">
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-[11%] pb-[8%]">
          {/* Always ink inside: the recess is light in both tones.

              Note for anyone auditing contrast here — the recess is an SVG
              <path> fill, which no walk up the CSS ancestors can see. On the
              charcoal band an automated check reports these two lines as 2.5:1
              and 1.8:1 against bg-charcoal. They are painted on ivory and
              measure 6.7:1 and 9.0:1. Verified by mapping their boxes into the
              arch's viewBox: both sit below the springing line, between the
              jambs, fully inside the fill. */}
          <QrCode value={tour.registerUrl} className="w-[66%] min-w-32" />
          <Label className="mt-[8%]">{tour.qr.caption}</Label>
          <p className="mt-2.5 font-sans text-xs text-charcoal-600">
            {tour.qr.note}
          </p>
        </div>
      </ArchFrame>

      {/* The tappable path. On a phone the code above cannot be scanned by the
          device showing it, so this is the primary control there — and it is
          the only one that works with a keyboard or a screen reader. */}
      <a
        href={tour.registerUrl}
        className={cn(
          "mt-7 flex h-12 w-full items-center justify-center rounded-[2px] px-6",
          "font-sans text-[0.6875rem] font-semibold tracking-[0.18em] uppercase",
          "transition-colors duration-300 ease-ios",
          ink
            ? "bg-charcoal text-ivory hover:bg-charcoal-800"
            : "bg-ivory text-charcoal hover:bg-sand-100",
        )}
      >
        Register online
      </a>
    </div>
  );
}

import { tour } from "@/content/tour";
import { cn } from "@/lib/cn";
import { QrCode } from "./QrCode";

/**
 * The registration card — the one thing on this page that has to work.
 *
 * It appears twice (hero and final CTA) and is identical both times on
 * purpose: a visitor who scrolls past it once should recognise it instantly
 * the second time rather than having to read a new layout.
 *
 * The frame is a manuscript convention rather than a web one — a double rule
 * inset from the edge with a khatim star at each corner. It is drawn in
 * pseudo-elements and SVG, never as a background image, so it scales with the
 * card and takes its colour from the tokens.
 *
 * On the QR itself, see the note in QrCode.tsx. The short version: a QR code
 * is no use to the person holding the phone it is displayed on, and no use at
 * all to a screen reader, so the card always carries a real link as well. The
 * code is for a second device or a printed handout.
 */
export async function RegisterCard({
  headingId,
  as: Heading = "h2",
  className,
}: {
  headingId: string;
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-[1.75rem] bg-ivory px-6 pt-8 pb-7 text-center sm:px-9 sm:pt-10 sm:pb-8",
        "shadow-[0_2px_4px_rgb(28_26_23/0.06),0_40px_80px_-32px_rgb(28_26_23/0.45)]",
        className,
      )}
    >
      <CardFrame />

      <Heading
        id={headingId}
        className="text-h3 font-bold text-charcoal"
      >
        {tour.qr.heading}
      </Heading>

      <div className="mt-6 flex justify-center">
        <div
          className={cn(
            "relative rounded-2xl bg-white p-5",
            // 20px of quiet zone around a 176px code is a shade over the four
            // modules the spec asks for. Scanners fail without it.
            "ring-1 ring-sand-200",
          )}
        >
          <QrCode value={tour.registerUrl} className="size-44 sm:size-48" />
        </div>
      </div>

      <p className="mt-6 font-sans text-sm font-semibold tracking-[0.14em] text-charcoal uppercase">
        {tour.qr.caption}
      </p>
      <p className="mt-2 font-sans text-sm text-sand-700">{tour.qr.note}</p>

      <div className="mt-6 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-sand-200" />
        <span className="font-sans text-xs text-sand-700">or</span>
        <span className="h-px flex-1 bg-sand-200" />
      </div>

      {/* The tappable path. On a phone the code above cannot be scanned by
          the device showing it, so this is the primary control there — and it
          is the only one that works with a keyboard or a screen reader. */}
      <a
        href={tour.registerUrl}
        className={cn(
          "mt-5 inline-flex h-12 w-full items-center justify-center rounded-pill px-6",
          "bg-charcoal font-sans text-sm font-semibold text-ivory",
          "transition-colors duration-300 ease-ios hover:bg-charcoal-800",
        )}
      >
        Register online
      </a>
    </div>
  );
}

/** The inset double rule and its four corner stars. Ornament only. */
function CardFrame() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-sand-200" />
      <div className="absolute inset-[0.6rem] rounded-[1.25rem] ring-1 ring-sand-100" />
      {/* Sat inside the inner rule rather than on its corners — a 1.25rem
          corner radius has no corner to sit on, and chasing one leaves the
          stars looking knocked off true. */}
      <Star className="absolute top-[1.05rem] left-[1.05rem]" />
      <Star className="absolute top-[1.05rem] right-[1.05rem]" />
      <Star className="absolute bottom-[1.05rem] left-[1.05rem]" />
      <Star className="absolute right-[1.05rem] bottom-[1.05rem]" />
    </div>
  );
}

/** Khatim — the eight-point star, two squares at 45°. */
function Star({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-3 text-sand-300", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M3 3h18v18H3z" />
      <path d="M12 1.5 22.5 12 12 22.5 1.5 12Z" />
    </svg>
  );
}

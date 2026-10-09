"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The promo player.
 *
 * Native `controls` are hidden until the video is actually running, because
 * the resting state of a video on a landing page is a poster, not a grey
 * browser chrome bar pinned across the bottom of it. In their place is one
 * large target that says what it is and how long it takes — "1:06" matters:
 * the difference between a 30-second trailer and a five-minute talk changes
 * whether somebody starts it at all, and making them find out by committing
 * is a small hostility.
 *
 * Once it is playing the native controls take over and stay. Building scrub,
 * volume, fullscreen and captions UI from scratch means rebuilding four
 * things the browser already does properly, including the keyboard and
 * screen-reader behaviour.
 *
 * The overlay is a real <button>, so it is reachable by keyboard and
 * announced. Focus moves to the video on play, which is where the controls
 * the viewer now needs have appeared.
 */
export function PromoPlayer({
  src,
  width,
  height,
  duration,
  poster,
  captions,
}: {
  src: string;
  width: number;
  height: number;
  duration: number;
  poster: string | null;
  captions: string | null;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  // Focus moves to the video once it is actually focusable, which is only
  // after React has re-rendered it WITH the controls attribute. Calling
  // focus() inside the click handler runs a render too early and silently
  // lands on <body>, leaving a keyboard user nowhere near the controls that
  // just appeared.
  useEffect(() => {
    if (started) video.current?.focus();
  }, [started]);

  function start() {
    const el = video.current;
    if (!el) return;
    setStarted(true);
    void el.play().catch(() => {
      // Autoplay policy or a decode error. The native controls are showing by
      // now, so there is still a way to start it — better than trapping the
      // viewer behind an overlay that silently did nothing.
    });
  }

  const mins = Math.floor(duration / 60);
  const rawSecs = Math.round(duration % 60);
  const secs = String(rawSecs).padStart(2, "0");
  const spoken = [
    mins ? `${mins} minute${mins === 1 ? "" : "s"}` : null,
    rawSecs ? `${rawSecs} second${rawSecs === 1 ? "" : "s"}` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="relative w-full max-w-[29rem]">
      <video
        ref={video}
        controls={started}
        playsInline
        preload="metadata"
        poster={poster ?? undefined}
        width={width}
        height={height}
        onPlay={() => setStarted(true)}
        className="block w-full rounded-[2px] bg-charcoal ring-1 ring-sand-400"
      >
        <source src={src} type="video/mp4" />
        {captions ? (
          <track
            kind="captions"
            src={captions}
            srcLang="en"
            label="English"
            default
          />
        ) : null}
      </video>

      {started ? null : (
        <button
          type="button"
          onClick={start}
          aria-label={`Play the promo video, ${spoken}`}
          className="group absolute inset-0 flex cursor-pointer flex-col items-center justify-center rounded-[2px] bg-charcoal/20 transition-colors duration-500 ease-ios hover:bg-charcoal/5"
        >
          <span
            aria-hidden="true"
            className="flex size-20 items-center justify-center rounded-full bg-charcoal/45 ring-1 ring-ivory/70 backdrop-blur-sm transition-[transform,background-color] duration-500 ease-ios group-hover:bg-charcoal/65 motion-safe:group-hover:scale-105 motion-safe:group-active:scale-95"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="ml-1 size-7 text-ivory"
            >
              <path d="M7.5 4.6v14.8L19.2 12Z" />
            </svg>
          </span>

          <span
            aria-hidden="true"
            className="mt-5 font-sans text-[0.6875rem] font-semibold tracking-[0.22em] text-ivory uppercase drop-shadow-[0_1px_6px_rgb(28_26_23/0.9)]"
          >
            {mins}:{secs}
          </span>
        </button>
      )}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  href = "/",
  onDark = false,
}: {
  href?: string;
  /** Flips the mark to solid white. The wordmark is teal and gold, which is
   *  unreadable on a dark band — and the mark is the only teal left on the
   *  site now that everything else runs on warm stone. */
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center rounded-md"
      aria-label="Imam Shuaib — home"
    >
      <Image
        src="/images/logo-imam-shuaib.png"
        // Asked for on 18 October. Note the empty alt was not an oversight:
        // the <Link> above carries aria-label="Imam Shuaib — home", which
        // overrides anything inside it, so a screen reader still announces
        // the destination and never this string. What it does buy is a
        // sighted reader seeing the name if the image fails to load.
        alt="Imam Shuaib logo"
        width={169}
        height={72}
        priority
        className={cn(
          "h-9 w-auto transition-[filter] duration-300 sm:h-10",
          onDark && "brightness-0 invert",
        )}
      />
    </Link>
  );
}

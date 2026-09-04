import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  href = "/",
  onDark = false,
}: {
  href?: string;
  /** Flips the mark to solid white — the teal wordmark is unreadable on the
   *  deep-teal hero. */
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
        alt=""
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

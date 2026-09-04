import type { ServiceIconName } from "@/lib/types";
import { cn } from "@/lib/cn";

/**
 * One consistent line-icon set: 24px grid, 1.5 stroke, round caps, no fills.
 * Decorative by definition — every icon sits beside its own visible label, so
 * they are hidden from assistive tech.
 */
const paths: Record<ServiceIconName, React.ReactNode> = {
  quran: (
    <>
      <path d="M12 7.4C10.6 6.2 8.9 5.6 6.6 5.6H4v11.2h2.6c2.3 0 4 .6 5.4 1.8 1.4-1.2 3.1-1.8 5.4-1.8H20V5.6h-2.6c-2.3 0-4 .6-5.4 1.8Z" />
      <path d="M12 7.4v11.2" />
    </>
  ),
  coaching: (
    <>
      <circle cx="9" cy="8" r="2.6" />
      <path d="M4 19.2c0-2.6 2.2-4.4 5-4.4s5 1.8 5 4.4" />
      <path d="M16.2 6.2a2.6 2.6 0 0 1 0 5" />
      <path d="M17.4 14.9c1.6.6 2.6 2 2.6 4.3" />
    </>
  ),
  counseling: (
    <>
      <path d="M4 7.6A2.6 2.6 0 0 1 6.6 5h5.6a2.6 2.6 0 0 1 2.6 2.6v3.2a2.6 2.6 0 0 1-2.6 2.6H8.4L5 16.4v-3a2.6 2.6 0 0 1-1-2Z" />
      <path d="M17 9.2h.4A2.6 2.6 0 0 1 20 11.8v3.4a2.6 2.6 0 0 1-2.6 2.6h-.6L14 20.4v-2.6" />
    </>
  ),
  dua: (
    <>
      <path d="M8.4 20c-1.6-1.3-2.6-3.3-2.6-5.6V8.2a1.4 1.4 0 0 1 2.8 0v3.4" />
      <path d="M15.6 20c1.6-1.3 2.6-3.3 2.6-5.6V8.2a1.4 1.4 0 0 0-2.8 0v3.4" />
      <path d="M8.6 11.6V5.8a1.4 1.4 0 0 1 2.8 0v5.4" />
      <path d="M15.4 11.6V5.8a1.4 1.4 0 0 0-2.8 0v5.4" />
    </>
  ),
  minbar: (
    <>
      <path d="M9 20v-8.6a3 3 0 0 1 6 0V20" />
      <path d="M4 20h16" />
      <path d="M6.4 20v-3.2h3M17.6 20v-3.2h-3" />
      <path d="M12 5V3.4" />
    </>
  ),
  nikah: (
    <>
      <circle cx="9.4" cy="14" r="4.4" />
      <circle cx="14.6" cy="14" r="4.4" />
      <path d="M12 5.4 13.4 8h-2.8L12 5.4Z" />
    </>
  ),
  children: (
    <>
      <circle cx="12" cy="7.4" r="2.4" />
      <path d="M8.2 20v-4.2A3.8 3.8 0 0 1 12 12a3.8 3.8 0 0 1 3.8 3.8V20" />
      <path d="M5 12.2 6 10l1 2.2 2.2 1-2.2 1-1 2.2-1-2.2-2.2-1 2.2-1Z" />
    </>
  ),
  speaking: (
    <>
      <rect x="9.4" y="3.4" width="5.2" height="9.2" rx="2.6" />
      <path d="M6 11.2a6 6 0 0 0 12 0" />
      <path d="M12 17.2V21M9 21h6" />
    </>
  ),
};

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-6", className)}
    >
      {paths[name]}
    </svg>
  );
}

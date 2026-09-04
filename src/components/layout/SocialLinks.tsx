import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const links = [
  {
    label: "YouTube",
    href: site.social.youtube,
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10.2 14.8V9.2L14.9 12l-4.7 2.8Z",
  },
  {
    label: "Instagram",
    href: site.social.instagram,
    path: "M12 2.9c3 0 3.3 0 4.5.07 1.1.05 1.7.24 2.1.4.5.2.9.45 1.3.85.4.4.65.8.85 1.3.16.4.35 1 .4 2.1.07 1.2.07 1.5.07 4.5s0 3.3-.07 4.5c-.05 1.1-.24 1.7-.4 2.1-.2.5-.45.9-.85 1.3-.4.4-.8.65-1.3.85-.4.16-1 .35-2.1.4-1.2.07-1.5.07-4.5.07s-3.3 0-4.5-.07c-1.1-.05-1.7-.24-2.1-.4a3.5 3.5 0 0 1-1.3-.85 3.5 3.5 0 0 1-.85-1.3c-.16-.4-.35-1-.4-2.1C2.9 15.3 2.9 15 2.9 12s0-3.3.07-4.5c.05-1.1.24-1.7.4-2.1.2-.5.45-.9.85-1.3.4-.4.8-.65 1.3-.85.4-.16 1-.35 2.1-.4C8.7 2.9 9 2.9 12 2.9Zm0 5.2a3.9 3.9 0 1 0 0 7.8 3.9 3.9 0 0 0 0-7.8Zm0 6.4a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm5-6.6a.92.92 0 1 1-1.84 0 .92.92 0 0 1 1.84 0Z",
  },
  {
    label: "TikTok",
    href: site.social.tiktok,
    path: "M16.5 3h-2.6v11.4a2.3 2.3 0 1 1-2.3-2.3c.24 0 .47.04.68.11V9.5a5 5 0 1 0 4.22 4.94V9.05a6.1 6.1 0 0 0 3.5 1.1V7.5a3.6 3.6 0 0 1-3.5-3.6V3Z",
  },
];

export function SocialLinks({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex size-11 items-center justify-center rounded-pill transition-colors",
              tone === "dark"
                ? "text-teal-100/80 hover:bg-white/10 hover:text-white"
                : "text-muted hover:bg-teal-50 hover:text-teal-700",
            )}
          >
            <span className="sr-only">
              {l.label} (opens in a new tab)
            </span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5"
            >
              <path d={l.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

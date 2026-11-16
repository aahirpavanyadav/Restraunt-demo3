import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function Sun(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function Moon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 10c0 5.5-8 11-8 11S4 15.5 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.8 3.5h2.4l1.4 4-2 1.3a12 12 0 0 0 6.6 6.6l1.3-2 4 1.4v2.4a2.3 2.3 0 0 1-2.5 2.3A17.5 17.5 0 0 1 4.5 6a2.3 2.3 0 0 1 2.3-2.5Z" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m4 6.5 8 6 8-6" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 2" />
    </svg>
  );
}

export function Flame(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21c4 0 6.5-2.6 6.5-6 0-4.4-4.2-6.2-4.4-11-2.4 1.5-3.4 3.7-3.4 5.8 0 1.4.6 2.4.6 2.4-1.2-.3-2.3-1.4-2.3-3.2C7.2 11.2 5.5 13 5.5 15c0 3.4 2.5 6 6.5 6Z" />
    </svg>
  );
}

export function Leaf(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 4c-8.5 0-14 4-14 10a5 5 0 0 0 5 5c6 0 9-5.5 9-15Z" />
      <path d="M4 21c2.5-5.5 6-9 11-12" />
    </svg>
  );
}

export function Calendar(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function Info(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M15 5 8 12l7 7" />
    </svg>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m5 9 7 7 7-7" />
    </svg>
  );
}

export function QuoteMark(props: IconProps) {
  return (
    <svg viewBox="0 0 32 24" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M0 24V13.8C0 6.3 4.4 1.4 12 0l1.4 3.7C9 5.1 6.6 7.5 6.3 10.2h4.9V24H0Zm18.2 0V13.8C18.2 6.3 22.6 1.4 30.2 0l1.4 3.7c-4.4 1.4-6.8 3.8-7.1 6.5h4.9V24h-11.2Z" />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M17.4 6.7h.01" />
    </svg>
  );
}

export function Facebook(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M14.5 21v-7h2.6l.5-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6h1.5V4.9c-.3 0-1.4-.1-2.6-.1-2.6 0-4.3 1.5-4.3 4.3V11H8v3h2.8v7" />
    </svg>
  );
}

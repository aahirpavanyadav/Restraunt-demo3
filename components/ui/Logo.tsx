import Link from "next/link";
import styles from "./Logo.module.css";

interface LogoProps {
  variant?: "header" | "footer";
  className?: string;
}

export function Logo({ variant = "header", className = "" }: LogoProps) {
  return (
    <Link
      href="#top"
      className={`${styles.logo} ${styles[variant]} ${className}`}
    >
      <svg
        className={styles.mark}
        viewBox="0 0 34 34"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M3.5 31h27" />
        <path d="M7 27V18a10 10 0 0 1 20 0v9" />
        <path d="M17 2.5v4.2M7.4 7.8l3 3M26.6 7.8l-3 3" />
        <circle cx="17" cy="18" r="2.1" fill="currentColor" stroke="none" />
      </svg>
      <span className={styles.type}>
        <span className={styles.wordmark}>Aurelia</span>
        <span className={styles.place}>Mayfair · London</span>
      </span>
    </Link>
  );
}

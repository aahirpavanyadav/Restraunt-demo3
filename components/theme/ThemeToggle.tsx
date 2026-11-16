"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "../ui/Icons";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

const STORAGE_KEY = "aurelia-theme";
const TRANSITION_TIME = 420;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function applyTheme(theme: Theme, persist: boolean) {
  const root = document.documentElement;

  if (!prefersReducedMotion()) {
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), TRANSITION_TIME);
  } else {
    root.classList.remove("theme-transition");
  }

  root.dataset.theme = theme;

  if (persist) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* Storage can be unavailable in private browsing; the theme still applies. */
    }
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current: Theme =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(current);

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = (event: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch {
        stored = null;
      }
      if (stored === "light" || stored === "dark") return;

      const next: Theme = event.matches ? "dark" : "light";
      setTheme(next);
      applyTheme(next, false);
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      if (event.newValue !== "light" && event.newValue !== "dark") return;
      const next = event.newValue;
      setTheme(next);
      applyTheme(next, false);
    };

    media.addEventListener("change", handleSystemChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      media.removeEventListener("change", handleSystemChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleToggle = () => {
    const current: Theme =
      document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const next: Theme = current === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next, true);
  };

  const actionLabel = theme
    ? `Switch to ${theme === "dark" ? "light" : "dark"} theme`
    : "Toggle colour theme";

  return (
    <button
      type="button"
      className={`${styles.toggle} ${className}`.trim()}
      onClick={handleToggle}
      aria-label={actionLabel}
      aria-pressed={theme === "dark"}
      title={actionLabel}
    >
      <Sun className={`theme-icon theme-icon--sun ${styles.icon}`} />
      <Moon className={`theme-icon theme-icon--moon ${styles.icon}`} />
    </button>
  );
}

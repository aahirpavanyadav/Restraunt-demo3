"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "../ui/Logo";
import { ThemeToggle } from "../theme/ThemeToggle";
import { ArrowUpRight, Close, MenuIcon } from "../ui/Icons";
import { navLinks, site } from "@/lib/site";
import styles from "./Header.module.css";

const allLinks = [{ href: "#top", label: "Home", id: "top" }, ...navLinks];
const sectionIds = ["top", "about", "menu", "gallery", "contact"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      setScrolled(window.scrollY > 8);

      let current = "top";
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;
        if (section.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (menuOpen && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!menuOpen && dialog.open) {
      dialog.close();
    }
  }, [menuOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setMenuOpen(false);
      document.body.style.overflow = "";
    };

    dialog.addEventListener("close", handleClose);
    return () => {
      dialog.removeEventListener("close", handleClose);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    desktop.addEventListener("change", handleChange);
    return () => desktop.removeEventListener("change", handleChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={styles.header} data-scrolled={scrolled}>
        <div className={`container ${styles.inner}`}>
          <Logo />

          <nav className={styles.nav} aria-label="Primary">
            <ul className={styles.navList}>
              {allLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className={styles.navLink}
                    data-active={active === link.id}
                    aria-current={active === link.id ? "location" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.actions}>
            <ThemeToggle />
            <a
              className={`btn btn--primary btn--sm ${styles.reserve}`}
              href="#reserve"
            >
              Book a table
              <ArrowUpRight />
            </a>
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-haspopup="dialog"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        className={styles.mobileMenu}
        aria-label="Site menu"
        onClick={(event) => {
          if (event.target === dialogRef.current) closeMenu();
        }}
      >
        <div className={styles.mobileInner}>
          <div className={styles.mobileTop}>
            <div onClick={closeMenu}>
              <Logo />
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <Close />
            </button>
          </div>

          <nav className={styles.mobileNav} aria-label="Mobile primary">
            <ul>
              {allLinks.map((link, index) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active === link.id ? "location" : undefined}
                  >
                    <span aria-hidden="true">0{index + 1}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.mobileFoot}>
            <a
              href="#reserve"
              className="btn btn--primary btn--wide"
              onClick={closeMenu}
            >
              Reserve a table
              <ArrowUpRight />
            </a>
            <div className={styles.mobileContact}>
              <p>
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
              <a href={site.phoneHref}>{site.phone}</a>
              <p className={styles.mobileNote}>
                Dinner Tuesday – Sunday · from 5.30pm
              </p>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

import { Logo } from "../ui/Logo";
import { Facebook, Instagram, ArrowUpRight } from "../ui/Icons";
import { navLinks, site } from "@/lib/site";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <Logo variant="footer" />
            <p className={styles.brandText}>
              Seasonal European cooking over open fire, a considered cellar and
              a warm welcome in Mayfair.
            </p>
            <ul className={styles.social} aria-label="Aurelia on social media">
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Aurelia on Instagram (opens in a new tab)"
                >
                  <Instagram />
                </a>
              </li>
              <li>
                <a
                  href={site.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Aurelia on Facebook (opens in a new tab)"
                >
                  <Facebook />
                </a>
              </li>
            </ul>
          </div>

          <nav className={styles.column} aria-label="Footer">
            <h2 className={styles.columnTitle}>Explore</h2>
            <ul className={styles.linkList}>
              <li>
                <a href="#top">Home</a>
              </li>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
              <li>
                <a href="#reserve" className={styles.reserveLink}>
                  Reserve a table
                  <ArrowUpRight />
                </a>
              </li>
            </ul>
          </nav>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Find us</h2>
            <address className={styles.address}>
              <span>{site.address.line1}</span>
              <span>{site.address.line2}</span>
            </address>
            <ul className={styles.linkList}>
              <li>
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                <a href={site.emailHref}>{site.email}</a>
              </li>
              <li>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.reserveLink}
                >
                  Get directions
                  <ArrowUpRight />
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h2 className={styles.columnTitle}>Opening hours</h2>
            <dl className={styles.hours}>
              {site.shortHours.map((row) => (
                <div key={row.days} className={styles.hoursRow}>
                  <dt>{row.days}</dt>
                  <dd>{row.time}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.footnote}>
              Lunch &amp; dinner · Kitchen closes 30 minutes before the room.
            </p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {year} Aurelia. All rights reserved.
          </p>
          <p className={styles.credit}>Modern European dining · Mayfair, London</p>
          <a href="#top" className={styles.backToTop}>
            Back to top
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

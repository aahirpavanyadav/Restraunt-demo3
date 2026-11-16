import { site } from "@/lib/site";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import {
  ArrowUpRight,
  Clock,
  Mail,
  MapPin,
  Phone,
} from "../ui/Icons";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section
      id="contact"
      className={`section ${styles.contact}`}
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <SectionHeading
              id="contact-title"
              eyebrow="Visit"
              title={
                <>
                  A quiet corner
                  <br />
                  <em>of Mayfair.</em>
                </>
              }
              description="Tucked between the gallery roofs and the Grosvenor gardens. Five minutes from Green Park, and a world away from the rush."
            />
          </Reveal>
          <Reveal delay={120} className={styles.headNote}>
            <p>
              For same-day tables, call us after 10am. For parties of nine or
              more, ask about our private dining room.
            </p>
            <a href={site.phoneHref} className="text-link">
              {site.phone}
            </a>
          </Reveal>
        </div>

        <div className={styles.grid}>
          <Reveal className={styles.details}>
            <div className={styles.block}>
              <span className={styles.label}>
                <MapPin />
                Address
              </span>
              <address className={styles.address}>
                {site.address.line1}
                <br />
                {site.address.line2}
              </address>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.inlineLink}
              >
                Get directions
                <ArrowUpRight />
              </a>
            </div>

            <div className={styles.block}>
              <span className={styles.label}>
                <Phone />
                Reservations
              </span>
              <a href={site.phoneHref} className={styles.phone}>
                {site.phone}
              </a>
              <a href={site.emailHref} className={styles.inlineLink}>
                <Mail />
                {site.email}
              </a>
            </div>

            <div className={styles.hoursBlock}>
              <span className={styles.label}>
                <Clock />
                Opening hours
              </span>
              <dl className={styles.hours}>
                {site.hours.map((row) => (
                  <div key={row.days} className={styles.hoursRow}>
                    <dt>{row.days}</dt>
                    <dd>{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className={styles.actions}>
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                Get directions
                <ArrowUpRight />
              </a>
              <a href={site.phoneHref} className="btn btn--outline">
                <Phone />
                Call the restaurant
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className={styles.mapWrap}>
            <div className={styles.mapFrame}>
              <svg
                className={styles.mapArt}
                viewBox="0 0 800 640"
                role="img"
                aria-label="Illustrative map showing Aurelia on Marlowe Lane in Mayfair, London"
                preserveAspectRatio="xMidYMid slice"
              >
                <rect width="800" height="640" className={styles.mapBg} />
                <g className={styles.mapBlocks}>
                  <rect x="36" y="38" width="142" height="118" />
                  <rect x="202" y="38" width="166" height="118" />
                  <rect x="442" y="38" width="128" height="118" />
                  <rect x="594" y="38" width="170" height="118" />
                  <rect x="36" y="186" width="142" height="152" />
                  <rect x="202" y="186" width="166" height="152" />
                  <rect x="442" y="186" width="128" height="152" />
                  <rect x="594" y="186" width="170" height="152" />
                  <rect x="36" y="368" width="142" height="106" />
                  <rect x="202" y="368" width="166" height="106" />
                  <rect x="442" y="368" width="128" height="106" />
                  <rect x="594" y="368" width="170" height="106" />
                  <rect x="36" y="504" width="142" height="100" />
                  <rect x="202" y="504" width="166" height="100" />
                  <rect x="442" y="504" width="128" height="100" />
                  <rect x="594" y="504" width="170" height="100" />
                </g>
                <g className={styles.mapStreets}>
                  <path d="M0 168h800M0 350h800M0 486h800" />
                  <path d="M190 0v640M390 0v640M582 0v640" />
                  <path d="M0 560h800" className={styles.mapMinor} />
                  <path d="M292 0v640" className={styles.mapMinor} />
                  <path d="M700 0v640" className={styles.mapMinor} />
                </g>
                <path
                  className={styles.mapLane}
                  d="M390 640V350c0-52 36-84 92-84h118"
                />
                <text x="62" y="326" className={styles.mapLabel}>
                  MAYFAIR
                </text>
                <text x="410" y="402" className={styles.mapLabelSmall}>
                  MARLOWE LANE
                </text>
                <text x="606" y="274" className={styles.mapLabelSmall}>
                  MOUNT STREET
                </text>
                <g className={styles.pin}>
                  <circle cx="482" cy="266" r="34" className={styles.pinHalo} />
                  <circle cx="482" cy="266" r="13" className={styles.pinDot} />
                  <circle cx="482" cy="266" r="4.5" className={styles.pinCore} />
                </g>
                <text x="506" y="248" className={styles.pinLabel}>
                  AURELIA
                </text>
              </svg>

              <div className={styles.mapTop}>
                <span>W1K · Mayfair</span>
                <span>Illustrative map</span>
              </div>

              <div className={styles.mapCard}>
                <div>
                  <span className={styles.mapEyebrow}>Find us</span>
                  <p className={styles.mapAddress}>
                    18 Marlowe Lane, Mayfair
                    <br />
                    London W1K 4QF
                  </p>
                </div>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapLink}
                  aria-label="Open in Google Maps — Aurelia, 18 Marlowe Lane (opens in a new tab)"
                >
                  <span>Open in Google Maps</span>
                  <ArrowUpRight />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowUpRight, Calendar } from "../ui/Icons";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p
            className={`eyebrow ${styles.rise}`}
            style={{ "--d": "60ms" } as CSSProperties}
          >
            Mayfair · London
          </p>

          <h1
            id="hero-title"
            className={`${styles.title} ${styles.rise}`}
            style={{ "--d": "150ms" } as CSSProperties}
          >
            A table for the <em>golden hour.</em>
          </h1>

          <p
            className={`${styles.lead} ${styles.rise}`}
            style={{ "--d": "240ms" } as CSSProperties}
          >
            Seasonal European cooking over open fire, served in a quiet corner
            of Mayfair. Come for a glass; stay for the evening.
          </p>

          <div
            className={`${styles.ctas} ${styles.rise}`}
            style={{ "--d": "330ms" } as CSSProperties}
          >
            <a className="btn btn--primary" href="#menu">
              Explore the menu
              <ArrowUpRight />
            </a>
            <a className={`btn btn--outline ${styles.secondary}`} href="#reserve">
              <Calendar />
              Book a table
            </a>
          </div>

          <dl
            className={`${styles.meta} ${styles.rise}`}
            style={{ "--d": "420ms" } as CSSProperties}
          >
            <div>
              <dt>Dinner</dt>
              <dd>Tuesday – Sunday · from 5.30pm</dd>
            </div>
            <div>
              <dt>Find us</dt>
              <dd>18 Marlowe Lane, Mayfair</dd>
            </div>
          </dl>
        </div>

        <div className={styles.visual}>
          <div className={styles.frame}>
            <div className={styles.imageWrap}>
              <Image
                src="/images/hero.jpg"
                alt="Guests sharing plates and wine at a candlelit table in the Aurelia dining room"
                fill
                preload
                quality={82}
                sizes="(max-width: 900px) 92vw, 52vw"
                className={styles.heroImage}
              />
            </div>
            <div className={styles.note}>
              <div className={styles.noteThumb}>
                <Image
                  src="/images/dish-salmon.jpg"
                  alt=""
                  fill
                  quality={75}
                  sizes="64px"
                />
              </div>
              <div className={styles.noteText}>
                <span>From the open fire</span>
                <strong>Wild salmon, fennel &amp; brown butter</strong>
              </div>
              <a
                href="#menu"
                className={styles.noteLink}
                aria-label="See the salmon on our menu"
              >
                <ArrowUpRight />
              </a>
            </div>
          </div>
          <p className={styles.caption}>
            The dining room <span aria-hidden="true">—</span> 7.42pm
          </p>
        </div>
      </div>

      <div className={styles.strip}>
        <div className={`container ${styles.stripInner}`}>
          <span>Seasonal European cooking</span>
          <span>Open fire</span>
          <span>Grower-led wine</span>
          <span>Private dining</span>
        </div>
      </div>
    </section>
  );
}

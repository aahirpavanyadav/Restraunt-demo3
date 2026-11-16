"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import {
  dietLabels,
  dishes,
  menuCategories,
  type MenuCategory,
} from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { ArrowUpRight } from "../ui/Icons";
import styles from "./Menu.module.css";

type Filter = MenuCategory | "all";

export function Menu() {
  const [category, setCategory] = useState<Filter>("all");

  const filtered =
    category === "all"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  const currentLabel =
    menuCategories.find((item) => item.id === category)?.label ?? "All";

  return (
    <section
      id="menu"
      className={`section ${styles.menu}`}
      aria-labelledby="menu-title"
    >
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <SectionHeading
              id="menu-title"
              eyebrow="The menu"
              title={
                <>
                  A menu that follows
                  <br />
                  <em>the market.</em>
                </>
              }
              description="Small plates for the table, generous mains from the fire, and puddings worth staying for."
            />
          </Reveal>

          <Reveal delay={120} className={styles.seasonNote}>
            <span className={styles.season}>Autumn 2026</span>
            <p>
              The kitchen writes the menu each morning. Dishes may vary slightly
              with what arrives from our growers.
            </p>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className={styles.toolbar}>
            <div
              className={styles.filters}
              role="group"
              aria-label="Filter the menu by course"
            >
              {menuCategories.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={styles.filter}
                  aria-pressed={category === item.id}
                  onClick={() => setCategory(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className={styles.count} aria-hidden="true">
              {String(filtered.length).padStart(2, "0")} items
            </p>
          </div>
        </Reveal>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Showing {filtered.length} {currentLabel.toLowerCase()} items.
        </p>

        <ul className={styles.grid} key={category}>
          {filtered.map((dish, index) => (
            <li
              key={dish.id}
              className={styles.item}
              style={{ "--i": index } as CSSProperties}
            >
              <article className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image
                    src={dish.image}
                    alt={dish.imageAlt}
                    fill
                    quality={75}
                    sizes="(max-width: 640px) 28vw, (max-width: 1023px) 45vw, (max-width: 1300px) 30vw, 25vw"
                  />
                  {dish.featured ? (
                    <span className={styles.featured}>Signature</span>
                  ) : null}
                </div>

                <div className={styles.body}>
                  <div className={styles.titleRow}>
                    <h3>{dish.name}</h3>
                    <span className={styles.price}>{dish.price}</span>
                  </div>
                  <p className={styles.description}>{dish.description}</p>

                  {dish.tags.length > 0 ? (
                    <ul className={styles.tags}>
                      {dish.tags.map((tag) => (
                        <li key={tag} className={styles.tag}>
                          <span aria-hidden="true">{tag}</span>
                          <span className="sr-only">{dietLabels[tag]}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.noTags}>Ask us about allergens</p>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className={styles.footer}>
          <p>
            Please tell your host about any allergies or dietary needs. A
            discretionary 12.5% service charge applies to tables of six or more.
          </p>
          <a href="#reserve" className="text-link">
            Reserve a table
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import { dishes, dietLabels, signatureDishes } from "@/lib/content";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { ArrowUpRight } from "../ui/Icons";
import styles from "./Specialities.module.css";

export function Specialities() {
  return (
    <section
      className={`section ${styles.section}`}
      aria-labelledby="signatures-title"
    >
      <div className="container">
        <div className={styles.head}>
          <Reveal>
            <SectionHeading
              id="signatures-title"
              eyebrow="Signatures"
              title={
                <>
                  Three plates worth
                  <br />
                  <em>the detour.</em>
                </>
              }
            />
          </Reveal>

          <Reveal delay={120} className={styles.aside}>
            <p>
              A short list that rarely leaves the menu. Each is shaped by the
              fire, the season and a stubborn belief in doing a few things
              properly.
            </p>
            <a href="#menu" className="text-link">
              See the full menu
              <ArrowUpRight />
            </a>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {signatureDishes.map((signature, index) => {
            const dish = dishes.find((item) => item.id === signature.dishId);
            if (!dish) return null;

            return (
              <Reveal
                key={signature.dishId}
                delay={index * 110}
                className={`${styles.card} ${index === 1 ? styles.offset : ""}`}
              >
                <article>
                  <div className={styles.imageWrap}>
                    <Image
                      src={dish.image}
                      alt={dish.imageAlt}
                      fill
                      quality={82}
                      sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 30vw"
                    />
                    <span className={styles.index} aria-hidden="true">
                      {signature.index}
                    </span>
                    <span className={styles.label}>{signature.label}</span>
                  </div>

                  <div className={styles.body}>
                    <div className={styles.titleRow}>
                      <h3>{dish.name}</h3>
                      <span className={styles.price}>{dish.price}</span>
                    </div>
                    <p>{dish.description}</p>
                    <div className={styles.meta}>
                      <ul className={styles.tags} aria-label="Dietary information">
                        {dish.tags.map((tag) => (
                          <li key={tag}>
                            <span aria-hidden="true">{tag}</span>
                            <span className="sr-only">{dietLabels[tag]}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href="#menu"
                        className={styles.cardLink}
                        aria-label={`Find ${dish.name} on the menu`}
                      >
                        <ArrowUpRight />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

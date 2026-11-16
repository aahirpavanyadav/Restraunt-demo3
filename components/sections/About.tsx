import Image from "next/image";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import styles from "./About.module.css";

const pillars = [
  {
    index: "01",
    title: "Market-led menus",
    text: "Written each morning around what the growers bring to the door.",
  },
  {
    index: "02",
    title: "An open-fire kitchen",
    text: "Embers, cast iron and a little patience. Smoke as a seasoning.",
  },
  {
    index: "03",
    title: "Grower-led wine",
    text: "Small growers, low intervention, and a list built to be explored.",
  },
];

export function About() {
  return (
    <section id="about" className={`section ${styles.about}`} aria-labelledby="about-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.media}>
          <Reveal className={styles.chefWrap}>
            <div className={styles.chef}>
              <Image
                src="/images/chef.jpg"
                alt="A chef carefully plating a dish at the pass under warm pendant lights"
                fill
                quality={82}
                sizes="(max-width: 1023px) 70vw, 34vw"
              />
            </div>
          </Reveal>

          <Reveal delay={140} className={styles.interiorWrap}>
            <div className={styles.interior}>
              <Image
                src="/images/interior-slat.jpg"
                alt="The Aurelia dining room with timber screens and softly lit tables"
                fill
                quality={82}
                sizes="(max-width: 1023px) 48vw, 24vw"
              />
            </div>
          </Reveal>

          <div className={styles.plaque} aria-hidden="true">
            <span>Est.</span>
            <strong>2016</strong>
            <span>Mayfair</span>
          </div>

          <p className={styles.mediaCaption}>The pass, before the first sitting</p>
        </div>

        <Reveal delay={100} className={styles.copy}>
          <SectionHeading
            id="about-title"
            eyebrow="Our philosophy"
            title={
              <>
                Rooted in season.
                <br />
                <em>Shaped by fire.</em>
              </>
            }
          />

          <div className={styles.prose}>
            <p>
              Aurelia began with a simple idea: that the best meals are the ones
              you remember by the light they were eaten in. A room that feels
              generous rather than grand, and food that lets good ingredients
              speak plainly.
            </p>
            <p>
              Our kitchen works with a handful of small farms and day-boat
              fishermen. Vegetables arrive in the morning and meet the embers by
              evening. Bread is baked daily, butter is cultured in-house, and the
              wine list leans toward growers who farm with care. Nothing is
              fussy. Everything is considered.
            </p>
          </div>

          <blockquote className={styles.quote}>
            “The best kind of luxury is a table that feels entirely yours.”
          </blockquote>

          <ul className={styles.pillars}>
            {pillars.map((pillar) => (
              <li key={pillar.index}>
                <span className={styles.pillarIndex} aria-hidden="true">
                  {pillar.index}
                </span>
                <div>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className={styles.signature}>
            <span>Elena Rossi</span>
            <span className={styles.signatureRole}>Chef–patron</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
